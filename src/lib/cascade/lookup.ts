// ─── Cascade Data Lookup ─────────────────────────────────────────
// Queries the platform cascades collection by domain to retrieve
// app data from a cascade run. Used by the coming soon page and
// other components that need cascade context.
// ─────────────────────────────────────────────────────────────────

import { getPlatformDb } from "@/lib/db/platform-client";

/** Normalized app data extracted from a cascade record */
export interface CascadeAppData {
  cascadeId: string;
  domain: string;
  subdomain: string;
  status: string;
  currentPhase: number;
  appName?: string;
  tagline?: string;
  description?: string;
  headline?: string;
  subheadline?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  supportEmail?: string;
}

/**
 * Look up cascade app data by domain slug.
 * Converts slug format (e.g., "yourdomain-ai") back to domain (e.g., "yourdomain.ai")
 * by replacing the last hyphen with a dot.
 */
export async function lookupCascadeByAppSlug(
  appSlug: string
): Promise<CascadeAppData | null> {
  const domain = slugToDomain(appSlug);
  if (!domain) return null;
  return lookupCascadeByDomain(domain);
}

/**
 * Look up cascade app data by raw domain name (e.g., "yourdomain.ai").
 * Returns the most recent cascade record for the domain.
 */
export async function lookupCascadeByDomain(
  domain: string
): Promise<CascadeAppData | null> {
  const db = await getPlatformDb();
  if (!db) return null;

  // Find the most recent cascade for this domain (any status)
  const record = await db
    .collection("cascades")
    .findOne(
      { "phases.trigger.domain": domain },
      { sort: { createdAt: -1 } }
    );

  if (!record) return null;

  // Extract normalized app data from the cascade record
  const trigger = record.phases?.trigger;
  const brandKernel = record.phases?.brandKernel?.brandKernel;
  const architecture = record.phases?.architecture;
  const appConfig = architecture?.appConfig;

  return {
    cascadeId: record.cascadeId,
    domain: trigger?.domain ?? domain,
    subdomain: trigger?.subdomain ?? "www",
    status: record.status,
    currentPhase: record.currentPhase ?? 0,
    appName: brandKernel?.appName ?? undefined,
    tagline: brandKernel?.tagline ?? undefined,
    description: brandKernel?.coreProduct?.description ?? undefined,
    headline: appConfig?.landingPage?.headline ?? undefined,
    subheadline: appConfig?.landingPage?.subheadline ?? undefined,
    colors: appConfig?.colorPalette ?? brandKernel?.colorPalette ?? undefined,
    supportEmail: undefined,
  };
}

/**
 * Convert a URL-safe app slug to a domain name.
 * "yourdomain-ai" → "yourdomain.ai"
 * "my-cool-app-io" → "my-cool-app.io"
 *
 * Strategy: replace the last hyphen with a dot (TLD separator).
 */
function slugToDomain(slug: string): string | null {
  if (!slug || typeof slug !== "string") return null;

  // Sanitize: only allow alphanumeric and hyphens
  const clean = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (!clean) return null;

  const lastHyphen = clean.lastIndexOf("-");
  if (lastHyphen <= 0) return null; // need at least "x-y"

  return clean.slice(0, lastHyphen) + "." + clean.slice(lastHyphen + 1);
}
