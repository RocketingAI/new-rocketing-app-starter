import type { NavigationConfig } from "@/types/config";

// ─── AGENT CUSTOMIZATION POINT ─────────────────────────────────
// Agents add/remove/reorder navigation items to match the app's
// page structure and entity types.
// ────────────────────────────────────────────────────────────────

export const navigationConfig: NavigationConfig = {
  header: [
    { title: "Features", href: "/#features" },
    { title: "Pricing", href: "/pricing" },
    { title: "Support", href: "/support" },
  ],
  sidebar: [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", featureFlag: "enableDashboard" },
    { title: "Chat", href: "/dashboard/chat", icon: "MessageSquare", featureFlag: "enableChat" },
    { title: "Projects", href: "/projects", icon: "FolderKanban", featureFlag: "enableProjects" },   // CUSTOMIZE: Replace with app entities
    { title: "Settings", href: "/settings", icon: "Settings" },
  ],
  footer: {
    product: [
      { title: "Features", href: "/#features" },
      { title: "Pricing", href: "/pricing" },
      { title: "Support", href: "/support" },
    ],
    company: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Data Policy", href: "/data-policy" },
      { title: "Contact", href: "/support" },
    ],
  },
};
