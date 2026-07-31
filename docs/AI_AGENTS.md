# AI agents

This app's AI agents run on **mastra.rocketing.ai**. The app holds no AI libraries and no
provider keys — it makes HTTP calls, and the service does the rest.

Definitions live in [`config/agents.config.ts`](../config/agents.config.ts). That file is
the source of truth; the service is the runtime.

## The loop

```
edit config/agents.config.ts  →  PR (CI posts the plan)  →  merge  →  CI applies  →  live
```

`git revert` is the rollback. There is no separate UI to keep in step, and no state that
exists only on the server.

## Editing

Ask your coding agent to change the file, or edit it yourself. Then:

```bash
npm run sync:agents -- --dry-run    # show what would change
npm run sync:agents              # apply it
```

Requires `MASTRA_API_KEY` in your environment — this app's key with `write` scope.

The plan looks like this:

```
Syncing 2 agent(s) to https://mastra.rocketing.ai

  create  research-bot  openai/gpt-4.1-mini
  update  assistant     openai/gpt-4.1-mini
  unchanged  1 agent(s)

✓ created research-bot
✓ updated assistant
```

## Two behaviours worth knowing before you edit

**The sync replaces, it does not merge.** Delete `maxSteps` from an agent here and it is
deleted on the service. That is deliberate — it is the only way this file can be trusted to
describe what is actually deployed. The consequence is that a partial edit is not a thing:
each entry is the complete definition.

**An agent on the service that is not in this file keeps running.** The sync reports it as
an `orphan` and leaves it alone, because deleting things nobody asked to delete is worse
than mentioning them. Remove it deliberately:

```bash
npm run sync:agents -- --prune      # needs an admin-scope key
```

## What the sync checks before touching anything

A partial apply is the failure worth avoiding — five agents in, the sixth rejected, and the
deployment matching neither the old file nor the new one. So everything checkable offline is
checked first, and nothing is written if any of it fails:

- duplicate `agentId` (the later entry would silently win)
- `agentId` shape, and required `name` / `model` / `instructions`
- `model` is `provider/model`, not a bare model name
- a subagent id that isn't defined in this file, or an agent listing itself
- an inline `authToken` on an MCP server — use `authSecret`, which is a *name*

## Calling an agent from app code

```ts
const res = await fetch(`${process.env.MASTRA_URL}/api/v1/agents/assistant/execute`, {
  method: "POST",
  headers: {
    authorization: `Bearer ${process.env.MASTRA_API_KEY}`,
    "content-type": "application/json",
  },
  body: JSON.stringify({
    prompt: userMessage,
    // Optional: gives the agent conversation history and per-user memory.
    memory: { resourceId: userId, threadId },
  }),
});

const { data } = await res.json();
data.output;    // the answer
data.costUsd;   // what it cost
```

Use `/stream` instead of `/execute` for token-by-token output over SSE.

Send **exactly one** of `prompt` or `messages` — both is rejected, so you are never left
guessing which one won.

## Memory

`memory: { enabled: true }` on a definition gives an agent two things automatically:

- **Conversation history** — the last 50 messages of the thread, injected on every run
- **Working memory** — per-user facts that persist across conversations, via
  `PUT /api/v1/memory/working/:resourceId`

Create a thread once per conversation with `POST /api/v1/memory/threads`, then pass
`{ resourceId, threadId }` on each run. Both fields are required together.

**Not currently available:** recall from *beyond* those 50 messages, and RAG document search.
Both need the vector store, which is not provisioned yet — `/rag/*` and `/memory/recall`
return `503` with a message naming the cause. Everything else works.

## Getting a key

Keys are minted per app, by hand, against the mastra service — see that repo's
`docs/DEPLOY-KEYS.md`. The `appSlug` on the key **is** the tenancy boundary: every query is
scoped to it, and a typo silently creates a separate, empty tenant rather than erroring.

Store the key as the `MASTRA_API_KEY` repository secret so CI can sync, and in your Vercel
project env so the app can call agents at runtime.
