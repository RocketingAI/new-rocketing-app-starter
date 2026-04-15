/**
 * Platform SDK initialization.
 *
 * Connects this app to *.rocketing.ai centralized services via the Platform SDK.
 * Call initPlatform() once at startup (e.g., API route cold start).
 * Use platform() to get the initialized client anywhere else.
 *
 * Required env vars:
 *   ROCKETING_APP_SLUG        — App identifier (e.g., "graders-ai")
 *   ROCKETING_API_KEY         — Platform API key for hub handshake
 *   ROCKETING_SECRETS_API_KEY — Secrets service API key
 */
import { init, platform as getPlatform, type PlatformClient } from "@rocketingai/platform-sdk";

let initialized = false;

export async function initPlatform(): Promise<PlatformClient> {
  if (initialized) return getPlatform();

  const p = await init({
    services: ["secrets"],
  });
  initialized = true;
  return p;
}

export function platform(): PlatformClient {
  return getPlatform();
}
