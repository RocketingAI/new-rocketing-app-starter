"use client";

import { useEffect } from "react";
import { themeConfig } from "@/../config/theme.config";

// Injects theme.config.ts values as CSS custom properties at runtime.
// This ensures that changing theme.config.ts actually updates the UI
// without needing to manually sync globals.css.

export function ThemeInjector() {
  useEffect(() => {
    const root = document.documentElement;
    const { colors, radius } = themeConfig;
    // Apply dark mode colors (our default theme)
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
    root.style.setProperty("--radius", radius);
  }, []);
  return null;
}
