// ─── INFRASTRUCTURE: Platform DB client ──────────────────────────
// Connects to the Rocketing platform MongoDB cluster to read cascade
// data. This is separate from the app's own Mongoose connection.
// Optional — only used when PLATFORM_MONGODB_URI is set.
// ─────────────────────────────────────────────────────────────────

import { MongoClient, Db } from "mongodb";

const PLATFORM_DB_NAME = "platform-rocketing-ai";

let client: MongoClient | null = null;

export async function getPlatformDb(): Promise<Db | null> {
  const uri = process.env.PLATFORM_MONGODB_URI;
  if (!uri) return null;

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(PLATFORM_DB_NAME);
}
