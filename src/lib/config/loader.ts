import { cache } from "react";
import { connectDB } from "@/lib/db/client";
import type {
  SiteConfig,
  ThemeConfig,
  NavigationConfig,
  PlansConfig,
  FeaturesConfig,
  ChatKitConfig,
} from "@/types/config";

// ─── Runtime Config Loader ───────────────────────────────────────
// Reads config documents from the MongoDB `app-configs` collection.
// No static-file fallback — MongoDB is the source of truth.
// Wrapped in React.cache() for per-request deduplication.
// ─────────────────────────────────────────────────────────────────

type ConfigType = "site" | "theme" | "navigation" | "plans" | "features" | "chatkit";

type ConfigTypeMap = {
  site: SiteConfig;
  theme: ThemeConfig;
  navigation: NavigationConfig;
  plans: PlansConfig;
  features: FeaturesConfig;
  chatkit: ChatKitConfig;
};

/**
 * Fetch a single config document from the `app-configs` collection.
 * Accepts documents with status: validated, customized, or seeded.
 */
export const getConfig = cache(async <T extends ConfigType>(
  configType: T,
): Promise<ConfigTypeMap[T]> => {
  const mongoose = await connectDB();
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection has no database");

  const doc = await db.collection("app-configs").findOne(
    {
      configType,
      status: { $in: ["validated", "customized", "seeded"] },
    },
    { sort: { updatedAt: -1 } },
  );

  if (!doc || !doc.data) {
    throw new Error(
      `Config "${configType}" not found in app-configs collection. ` +
      `Run the cascade seeder or ensure configs are seeded in MongoDB.`,
    );
  }

  return doc.data as ConfigTypeMap[T];
});

/**
 * Fetch all 6 configs in parallel. Used by root layout to hydrate ConfigProvider.
 */
export async function getAllConfigs() {
  const [site, theme, navigation, plans, features, chatkit] = await Promise.all([
    getConfig("site"),
    getConfig("theme"),
    getConfig("navigation"),
    getConfig("plans"),
    getConfig("features"),
    getConfig("chatkit"),
  ]);
  return { site, theme, navigation, plans, features, chatkit };
}

export type AllConfigs = Awaited<ReturnType<typeof getAllConfigs>>;

// ─── Convenience wrappers ────────────────────────────────────────
export const getSiteConfig = cache(() => getConfig("site"));
export const getThemeConfig = cache(() => getConfig("theme"));
export const getNavigationConfig = cache(() => getConfig("navigation"));
export const getPlansConfig = cache(() => getConfig("plans"));
export const getFeaturesConfig = cache(() => getConfig("features"));
export const getChatKitConfig = cache(() => getConfig("chatkit"));
