"use client";

import { createContext, useContext } from "react";
import type {
  SiteConfig,
  ThemeConfig,
  NavigationConfig,
  PlansConfig,
  FeaturesConfig,
  ChatKitConfig,
} from "@/types/config";
import type { AllConfigs } from "./loader";

// ─── Config Context ──────────────────────────────────────────────
// Hydrated by the root layout with configs fetched from MongoDB.
// Client components consume via typed hooks below.
// ─────────────────────────────────────────────────────────────────

const ConfigContext = createContext<AllConfigs | null>(null);

export function ConfigProvider({
  configs,
  children,
}: {
  configs: AllConfigs;
  children: React.ReactNode;
}) {
  return (
    <ConfigContext.Provider value={configs}>{children}</ConfigContext.Provider>
  );
}

function useConfigs(): AllConfigs {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error("useConfigs must be used within <ConfigProvider>");
  }
  return ctx;
}

export function useSiteConfig(): SiteConfig {
  return useConfigs().site;
}

export function useThemeConfig(): ThemeConfig {
  return useConfigs().theme;
}

export function useNavigationConfig(): NavigationConfig {
  return useConfigs().navigation;
}

export function usePlansConfig(): PlansConfig {
  return useConfigs().plans;
}

export function useFeaturesConfig(): FeaturesConfig {
  return useConfigs().features;
}

export function useChatKitConfig(): ChatKitConfig {
  return useConfigs().chatkit;
}
