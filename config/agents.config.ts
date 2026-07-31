import type { AgentsConfig } from "@/types/config";

// ─── AGENT CUSTOMIZATION POINT ─────────────────────────────────
// AI agent definitions for this app, running on mastra.rocketing.ai.
//
// This file is the source of truth. `pnpm sync:agents` pushes it to the service, and
// CI runs that on deploy — so editing here, opening a PR and merging is the whole
// workflow. `git revert` is the rollback.
//
// Agents omit nothing by accident: the sync replaces each definition wholesale, so a
// field you delete here is deleted there. Run `pnpm sync:agents --dry-run` to see
// exactly what would change before it does.
// ────────────────────────────────────────────────────────────────

export const agentsConfig: AgentsConfig = [
  {
    agentId: "assistant",
    name: "App Assistant",
    model: "openai/gpt-4.1-mini",
    // CUSTOMIZE: this is the agent's whole personality and remit. Be specific about
    // what it should refuse as well as what it should do — a vague instruction is the
    // most common cause of an agent that behaves inconsistently.
    instructions: [
      "You are the assistant for this application.",
      "Answer using only what the user has told you or what your tools return.",
      "If you do not know something, say so plainly rather than guessing.",
      "Keep answers short unless the user asks for detail.",
    ].join("\n"),
    description: "General-purpose assistant for app users.",
    // Remembers the conversation and per-user facts. Costs nothing extra.
    memory: { enabled: true },
    // Caps the tool-calling loop. Raise it only if the agent genuinely needs more
    // steps — a runaway loop is billed per turn.
    maxSteps: 10,
  },
];

export default agentsConfig;
