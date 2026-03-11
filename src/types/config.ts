// Type definitions for all config files

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  domain: string;
  url: string;
  logo: {
    text: string;
    icon: string | null;
  };
  ogImage: string;
  links: {
    twitter: string | null;
    github: string | null;
    discord: string | null;
  };
  support: {
    email: string;
    docs: string | null;
  };
  legal: {
    companyName: string;
    companyAddress: string | null;
    jurisdiction: string;
  };
}

export interface ThemeConfig {
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    muted: string;
    mutedForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    border: string;
    ring: string;
  };
  fonts: {
    sans: string;
    mono: string;
  };
  radius: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  badge?: string;
  featureFlag?: string;
  children?: NavItem[];
}

export interface NavigationConfig {
  header: NavItem[];
  sidebar: NavItem[];
  footer: {
    product: NavItem[];
    company: NavItem[];
  };
}

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: { monthly: number; yearly: number };
  stripePriceId: { monthly: string | null; yearly: string | null };
  features: PlanFeature[];
  limits: Record<string, number | string>;
  cta: string;
  highlighted: boolean;
}

export interface PlansConfig {
  currency: string;
  plans: Plan[];
}

export interface FeaturesConfig {
  [key: string]: boolean;
}

// ─── ChatKit Configuration ────────────────────────────────────
// Flat structure aligned with the builder's ChatContainerConfig
// (builder.rocketing.ai/chatkit/ui). The builder is the source of
// truth for widget configuration fields. Extra fields (archetype,
// model, reasoning, tone, registry refs) are added for cascade/runtime.

export type ChatKitArchetype =
  | "role-coach"
  | "document-builder"
  | "marketing-analyst"
  | "industry-advisor"
  | "personal-companion";

export type ChatKitContainerType = "embedded" | "modal" | "side-panel" | "fab";
export type ChatKitAgentSelectorVariant = "none" | "dropdown" | "avatars" | "strip";
export type ChatKitThemeOption = "light" | "dark" | "auto";
export type ChatKitPosition = "left" | "right" | "bottom-right" | "bottom-left" | "top-right" | "top-left";
export type ChatKitSizeUnit = "px" | "%";
export type ChatKitFontFamily = "system" | "inter" | "roboto" | "opensans" | "lato" | "poppins" | "mono";
export type ChatKitFontWeight = "normal" | "medium" | "semibold" | "bold";
export type ChatKitFabIcon = "chat" | "message" | "help" | "support";

export interface ChatKitConfig {
  // ── Cascade / Runtime fields (not in builder widget config) ──
  archetype: ChatKitArchetype;
  model: string;
  reasoning: { effort: "minimal" | "low" | "medium" | "high" };
  tone: {
    personality: string;
    formality: "casual" | "casual-professional" | "professional" | "formal";
    readingLevel: string;
    emojiUsage: "none" | "minimal" | "moderate";
    traits: string[];
    antiTraits: string[];
  };
  errorText: string;
  loadingText: string;
  successText: string | null;
  registryAgent: string | null;
  registryPrompt: string | null;
  registryTools: string[];
  registrySkills: string[];

  // ── Container settings (from builder ChatContainerConfig) ────
  containerType: ChatKitContainerType;
  width: number;
  widthUnit: ChatKitSizeUnit;
  height: number;
  heightUnit: ChatKitSizeUnit;
  maxWidth?: number;
  maxHeight?: number;
  borderRadius: number;
  borderRadiusTL: number;
  borderRadiusTR: number;
  borderRadiusBL: number;
  borderRadiusBR: number;
  useIndividualCorners: boolean;
  showBorder: boolean;
  showShadow: boolean;
  position: ChatKitPosition;

  // ── Spacing ──────────────────────────────────────────────────
  useIndividualPadding: boolean;
  padding: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  useIndividualMargin: boolean;
  margin: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;

  // ── Header ───────────────────────────────────────────────────
  showHeader: boolean;
  headerText: string;
  headerAlignment: "left" | "center" | "right";

  // ── Theme & appearance ───────────────────────────────────────
  theme: ChatKitThemeOption;
  backgroundColor: string;
  accentColor: string;
  useCustomBackground: boolean;

  // ── Typography ───────────────────────────────────────────────
  fontFamily: ChatKitFontFamily;
  headerFontSize: number;
  headerFontWeight: ChatKitFontWeight;
  bodyFontSize: number;
  bodyLineHeight: number;
  inputFontSize: number;
  messageSpacing: number;

  // ── Agent settings ───────────────────────────────────────────
  profileId: string;
  agentName: string;
  agentSelectorVariant: ChatKitAgentSelectorVariant;
  systemPrompt: string;

  // ── Widgets ──────────────────────────────────────────────────
  widgetsEnabled: boolean;
  widgets: string[];

  // ── Guardrails ───────────────────────────────────────────────
  guardrailsEnabled: boolean;
  maxTokens: number;
  contentFiltering: boolean;
  piiFiltering: boolean;
  topicRestrictions: string[];

  // ── Workflows ────────────────────────────────────────────────
  workflowsEnabled: boolean;
  workflows: string[];

  // ── Chat settings ────────────────────────────────────────────
  greeting: string;
  placeholder: string;
  emptyStateText: string;
  attachmentsEnabled: boolean;
  autoFocus: boolean;

  // ── FAB-specific ─────────────────────────────────────────────
  fabSize: number;
  fabTooltip: string;
  showBadge: boolean;
  fabIcon: ChatKitFabIcon;

  // ── Modal/SidePanel-specific ─────────────────────────────────
  showCloseButton: boolean;
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
  showOverlay: boolean;
  overlayOpacity: number;
}
