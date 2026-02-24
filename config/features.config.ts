import type { FeaturesConfig } from "@/types/config";

// ─── AGENT CUSTOMIZATION POINT ─────────────────────────────────
// Feature flags control what's enabled in the app.
// Agents toggle these based on product requirements.
// ────────────────────────────────────────────────────────────────

export const featuresConfig: FeaturesConfig = {
  enableChat: true,                // Show ChatKit AI assistant
  enableBilling: true,             // Show billing/subscription features
  enableDashboard: true,           // Show dashboard page
  enableProjects: true,            // Show example entity (projects) — CUSTOMIZE: rename to app entity
  enableNewsletter: false,         // Show newsletter signup in footer
  enableSocialLogin: false,        // Enable social login providers in Clerk
};
