/**
 * Push `config/agents.config.ts` to mastra.rocketing.ai.
 *
 * The config file is the source of truth; the service is the runtime. This script makes
 * the two match, and is safe to run as many times as you like.
 *
 *   pnpm sync:agents              plan, then apply
 *   pnpm sync:agents --dry-run    plan only, change nothing
 *   pnpm sync:agents --prune      also delete agents that exist remotely but not here
 *
 * Env:
 *   MASTRA_API_KEY   required — this app's key, `write` scope (`admin` for --prune)
 *   MASTRA_URL       default https://mastra.rocketing.ai
 *
 * ## Why it can be this simple
 *
 * `PUT /api/v1/agents/:agentId` is an idempotent upsert that *replaces* the definition,
 * so applying the file is one call per agent with no create-or-update branching and no
 * ordering requirement. It also means a field deleted from this file is deleted remotely
 * — which is the point, and the reason the plan is printed before anything is written.
 *
 * ## Why it still reads before it writes
 *
 * PUT alone would work, but its response only says whether the agent was *created* — not
 * whether anything actually changed. A deploy log that says "3 agents updated" every time
 * teaches people to ignore it. So each agent is fetched and compared first, and unchanged
 * ones are skipped entirely.
 */
import type { MastraAgent } from "../src/types/config";
import { agentsConfig } from "../config/agents.config";

const BASE = (process.env.MASTRA_URL ?? "https://mastra.rocketing.ai").replace(/\/+$/, "");
const KEY = process.env.MASTRA_API_KEY;
const DRY_RUN = process.argv.includes("--dry-run");
const PRUNE = process.argv.includes("--prune");

const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

const AGENT_ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;

type Envelope<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string; details?: unknown } };

/** Fields this script manages. Anything else the service stores is left alone. */
const MANAGED = [
  "name",
  "model",
  "instructions",
  "description",
  "memory",
  "rag",
  "mcpServers",
  "agents",
  "delegation",
  "maxSteps",
  "metadata",
] as const;

/**
 * Normalise both sides to the same shape before comparing.
 *
 * The service presents absent optionals as `null` / `[]` / `false` rather than omitting
 * them, so a raw comparison against this file would report every agent as changed on
 * every run. `mcpServers` needs its own pass because the service never echoes a token —
 * only `authSecret`, the name — so the local and remote shapes differ by construction.
 */
function canonical(a: Record<string, unknown>): string {
  const out: Record<string, unknown> = {};
  for (const key of MANAGED) {
    const v = a[key];
    if (key === "mcpServers") {
      const list = Array.isArray(v) ? v : [];
      out[key] = list.map((m) => {
        const s = m as Record<string, unknown>;
        return {
          name: s.name ?? null,
          url: s.url ?? null,
          authSecret: s.authSecret ?? null,
          requireApproval: s.requireApproval ?? false,
        };
      });
      continue;
    }
    if (key === "agents") {
      out[key] = Array.isArray(v) ? v : [];
      continue;
    }
    out[key] = v === undefined ? null : v;
  }
  return JSON.stringify(out, Object.keys(out).sort());
}

async function api<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<{ status: number; env: Envelope<T> | null }> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${KEY}`,
      ...(body === undefined ? {} : { "content-type": "application/json" }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  let env: Envelope<T> | null = null;
  try {
    env = (await res.json()) as Envelope<T>;
  } catch {
    // A non-JSON body means something in front of the service answered — a 502 from the
    // load balancer, or an HTML 404 from an unmatched path. Surfaced via `status`.
  }
  return { status: res.status, env };
}

function fail(message: string): never {
  console.error(`${RED}✗${RESET} ${message}`);
  process.exit(1);
}

/**
 * Catch locally what would otherwise fail mid-apply, one agent at a time.
 *
 * A partial apply is the failure mode worth avoiding: five agents in, the sixth is
 * rejected, and the deployment is left in a state matching neither the old file nor the
 * new one. Everything checkable without the network is checked before the first write.
 */
function validateLocally(agents: MastraAgent[]): void {
  if (!Array.isArray(agents)) fail("config/agents.config.ts must export an array");

  const problems: string[] = [];
  const seen = new Set<string>();
  const ids = new Set(agents.map((a) => a.agentId));

  for (const [i, a] of agents.entries()) {
    const at = `agents[${i}]${a.agentId ? ` (${a.agentId})` : ""}`;
    if (!a.agentId) problems.push(`${at}: agentId is required`);
    else if (!AGENT_ID.test(a.agentId)) {
      problems.push(`${at}: agentId must be alphanumerics, dashes or underscores`);
    } else if (seen.has(a.agentId)) {
      // Two entries with one id means the later silently wins. Nothing downstream would
      // report it, because each PUT succeeds on its own.
      problems.push(`${at}: duplicate agentId — an earlier entry already uses it`);
    }
    seen.add(a.agentId);

    if (!a.name) problems.push(`${at}: name is required`);
    if (!a.model) problems.push(`${at}: model is required`);
    else if (!a.model.includes("/")) {
      problems.push(`${at}: model must be provider/model, e.g. openai/gpt-4.1-mini`);
    }
    if (!a.instructions) problems.push(`${at}: instructions is required`);

    for (const sub of a.agents ?? []) {
      // The service resolves subagents at run time, within this app only — so a typo
      // here produces an agent that deploys cleanly and fails on first use.
      if (sub === a.agentId) problems.push(`${at}: lists itself as a subagent`);
      else if (!ids.has(sub)) {
        problems.push(`${at}: subagent "${sub}" is not defined in this file`);
      }
    }

    for (const m of a.mcpServers ?? []) {
      if ("authToken" in (m as Record<string, unknown>)) {
        // The service refuses this too, but saying so here keeps a live token out of a
        // request body and out of any log that records one.
        problems.push(`${at}: mcpServers.${m.name} has authToken — use authSecret (a name)`);
      }
    }
  }

  if (problems.length) {
    console.error(`${RED}✗ ${problems.length} problem(s) in config/agents.config.ts${RESET}`);
    for (const p of problems) console.error(`    ${p}`);
    process.exit(1);
  }
}

async function main(): Promise<void> {
  if (!KEY) {
    fail(
      "MASTRA_API_KEY is not set.\n" +
        "    Local:  export MASTRA_API_KEY=rk_live_...\n" +
        "    CI:     add it as a repository secret and pass it to this step.",
    );
  }

  const agents = agentsConfig as MastraAgent[];
  validateLocally(agents);

  console.log(`${BOLD}Syncing ${agents.length} agent(s) to ${BASE}${RESET}`);
  if (DRY_RUN) console.log(`${DIM}--dry-run: nothing will be written${RESET}`);

  // Remote inventory, used only for orphan detection.
  //
  // `GET /api/v1/agents` takes `limit` (clamped to 200) and reports `hasMore`, but exposes
  // no cursor to follow — so one page is all there is. That only limits orphan detection:
  // creates and updates are driven by this file, not by the listing. An incomplete list
  // under-reports orphans, which is the safe direction, but it is said out loud rather
  // than left to look like a clean run.
  const remoteIds = new Set<string>();
  const { status: listStatus, env: listEnv } = await api<Array<{ agentId: string }>>(
    "GET",
    "/api/v1/agents?limit=200",
  );
  if (listStatus === 401) fail("401 from mastra — the API key is invalid or revoked.");
  if (listStatus === 403) fail("403 from mastra — the key lacks `read` scope.");
  if (!listEnv || listEnv.success !== true) {
    fail(
      `Could not list agents (HTTP ${listStatus}): ${
        listEnv && !listEnv.success ? listEnv.error.message : "no response body"
      }`,
    );
  }
  for (const a of listEnv.data) remoteIds.add(a.agentId);

  const truncated =
    (listEnv as unknown as { pagination?: { hasMore?: boolean } }).pagination?.hasMore === true;

  const plan: Array<{ agent: MastraAgent; action: "create" | "update" }> = [];
  let unchanged = 0;

  for (const agent of agents) {
    const { status, env } = await api<{ agent: Record<string, unknown> }>(
      "GET",
      `/api/v1/agents/${encodeURIComponent(agent.agentId)}`,
    );

    if (status === 404) {
      plan.push({ agent, action: "create" });
      continue;
    }
    if (!env || env.success !== true) {
      fail(
        `Could not read agent "${agent.agentId}" (HTTP ${status}): ${
          env && !env.success ? env.error.message : "no response body"
        }`,
      );
    }

    if (canonical(env.data.agent) === canonical(agent as unknown as Record<string, unknown>)) {
      unchanged++;
    } else {
      plan.push({ agent, action: "update" });
    }
  }

  const orphans = [...remoteIds].filter((id) => !agents.some((a) => a.agentId === id));

  if (truncated) {
    console.log(
      `${YELLOW}!${RESET} More than 200 agents exist remotely and the listing has no cursor, ` +
        `so orphan detection below is incomplete. Creates and updates are unaffected.`,
    );
  }

  // ── Plan ────────────────────────────────────────────────────
  console.log("");
  for (const { agent, action } of plan) {
    const label = action === "create" ? `${GREEN}create${RESET}` : `${YELLOW}update${RESET}`;
    console.log(`  ${label}  ${agent.agentId}  ${DIM}${agent.model}${RESET}`);
  }
  if (unchanged) console.log(`  ${DIM}unchanged  ${unchanged} agent(s)${RESET}`);
  for (const id of orphans) {
    console.log(
      PRUNE
        ? `  ${RED}delete${RESET}  ${id}  ${DIM}(not in config, --prune)${RESET}`
        : `  ${YELLOW}orphan${RESET}  ${id}  ${DIM}(exists remotely, not in config — run --prune to remove)${RESET}`,
    );
  }
  if (!plan.length && !unchanged && !orphans.length) console.log(`  ${DIM}nothing to do${RESET}`);
  console.log("");

  if (DRY_RUN) {
    console.log(`${DIM}Dry run complete. Re-run without --dry-run to apply.${RESET}`);
    return;
  }

  // ── Apply ───────────────────────────────────────────────────
  let created = 0;
  let updated = 0;

  for (const { agent, action } of plan) {
    const { agentId, ...body } = agent;
    const { status, env } = await api<{ created: boolean }>(
      "PUT",
      `/api/v1/agents/${encodeURIComponent(agentId)}`,
      body,
    );
    if (!env || env.success !== true) {
      const detail = env && !env.success ? `${env.error.code}: ${env.error.message}` : `HTTP ${status}`;
      fail(
        `Failed to ${action} "${agentId}" — ${detail}\n` +
          `    ${created + updated} agent(s) were already applied. Fix the cause and re-run;\n` +
          `    the sync is idempotent, so re-applying the successful ones is harmless.`,
      );
    }
    if (env.data.created) created++;
    else updated++;
    console.log(`${GREEN}✓${RESET} ${env.data.created ? "created" : "updated"} ${agentId}`);
  }

  if (PRUNE) {
    for (const id of orphans) {
      const { status, env } = await api("DELETE", `/api/v1/agents/${encodeURIComponent(id)}`);
      if (!env || env.success !== true) {
        // Deleting needs `admin`, which a normal deploy key should not have. Called out
        // rather than swallowed, because the alternative is a prune that silently no-ops.
        const hint = status === 403 ? " — the key lacks `admin` scope" : "";
        fail(`Failed to delete "${id}" (HTTP ${status})${hint}`);
      }
      console.log(`${GREEN}✓${RESET} deleted ${id}`);
    }
  }

  const summary = [
    created ? `${created} created` : null,
    updated ? `${updated} updated` : null,
    unchanged ? `${unchanged} unchanged` : null,
    PRUNE && orphans.length ? `${orphans.length} deleted` : null,
  ]
    .filter(Boolean)
    .join(", ");
  console.log(`\n${BOLD}${summary || "nothing changed"}${RESET}`);

  if (!PRUNE && orphans.length) {
    console.log(
      `${YELLOW}!${RESET} ${orphans.length} agent(s) exist on the service but not in this file. ` +
        `They still run. Remove them with --prune, or add them here.`,
    );
  }
}

main().catch((err) => {
  console.error(`${RED}✗${RESET} ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
