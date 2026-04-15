# Finding: Agent MongoDB Access via GSM — Already Implemented

## Context

The user requested that builder agents have access to their scoped app's MongoDB connection URL (from GSM at secrets.rocketing.ai) so agents can edit data in their app's database.

## Finding

**This feature is already fully implemented in both agent execution routes.** No code changes are needed.

### Implementation (stream route)
**File:** `builder-rocketing-ai/app/api/claude-code/stream/route.ts` (lines 98-120)

```typescript
// Inject MongoDB connection URI if session has an app scope
if (session.appContext?.domain) {
  try {
    const appSlug = session.appContext.domain
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .toLowerCase()
      .replace(/^-+|-+$/g, "");
    const mongoUri = await readSecret(appSlug, "production", "MONGODB_URI");
    if (mongoUri) {
      appSystemPrompt += [
        ``,
        `# MongoDB Database Access`,
        `You have access to the app's MongoDB database.`,
        `- Connection URI: ${mongoUri}`,
        `- Use this URI to connect directly via mongosh or any MongoDB driver.`,
        `- Be careful with write operations — always confirm destructive changes with the user first.`,
        `- The database name is already included in the URI.`,
      ].join("\n");
    }
  } catch (err) {
    console.error("[stream] Failed to fetch MongoDB URI:", err);
  }
}
```

### Implementation (sync execute route)
**File:** `builder-rocketing-ai/app/api/claude-code/execute/route.ts` (lines 96-118)

Identical pattern — same GSM lookup and system prompt injection.

### How it works
1. When a session has `appContext.domain` set (via App Scope selector on agents page)
2. The `appSlug` is derived from the domain (dots→hyphens, lowercase)
3. `readSecret(appSlug, "production", "MONGODB_URI")` fetches the connection string from GSM
4. The URI is injected into the agent's system prompt with safety instructions
5. The agent can then use `mongosh` or any driver to connect

### Prerequisites for it to work
- The app must have been cascaded through Phase 2.5 (MongoDB provisioning) and Phase 6 (env var assembly) which writes `MONGODB_URI` to GSM
- The user must select the app in the "App Scope" selector on the agents page
- `PLATFORM_SECRETS_CF_URL` and `PLATFORM_SECRETS_API_KEY` must be set in builder's env

## No changes required
