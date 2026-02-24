import type { SiteConfig } from "@/types/config";

// ─── AGENT CUSTOMIZATION POINT ─────────────────────────────────
// This file defines the app's identity. Agents should update all
// fields marked CUSTOMIZE based on the product brief.
// ────────────────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  name: "App Name",                                   // CUSTOMIZE
  shortName: "App",                                   // CUSTOMIZE
  description: "A brief description of the app",     // CUSTOMIZE
  domain: "example.ai",                               // CUSTOMIZE
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  logo: {
    text: "App Name",                                 // CUSTOMIZE
    icon: null,                                       // CUSTOMIZE: "/logo.svg"
  },
  ogImage: "/og-default.png",                        // CUSTOMIZE
  links: {
    twitter: null,                                    // CUSTOMIZE
    github: null,                                     // CUSTOMIZE
    discord: null,                                    // CUSTOMIZE
  },
  support: {
    email: "support@example.ai",                     // CUSTOMIZE
    docs: null,                                       // CUSTOMIZE
  },
  legal: {
    companyName: "Rocketing AI, Inc.",               // CUSTOMIZE
    companyAddress: null,                             // CUSTOMIZE
    jurisdiction: "Delaware, USA",
  },
};
