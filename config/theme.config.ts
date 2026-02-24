import type { ThemeConfig } from "@/types/config";

// ─── AGENT CUSTOMIZATION POINT ─────────────────────────────────
// Agents modify these values to match the product's brand.
// These map to CSS custom properties in globals.css.
// ────────────────────────────────────────────────────────────────

export const themeConfig: ThemeConfig = {
  colors: {
    primary: "217 91% 60%",           // Blue — CUSTOMIZE
    primaryForeground: "210 40% 98%",
    secondary: "217 33% 17%",
    secondaryForeground: "210 40% 98%",
    accent: "217 33% 17%",
    accentForeground: "210 40% 98%",
    destructive: "0 63% 31%",
    muted: "217 33% 17%",
    mutedForeground: "215 20% 65%",
    background: "222 47% 11%",        // Dark slate
    foreground: "210 40% 98%",
    card: "222 47% 11%",
    cardForeground: "210 40% 98%",
    border: "217 33% 17%",
    ring: "224 76% 48%",
  },
  fonts: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },
  radius: "0.5rem",
};
