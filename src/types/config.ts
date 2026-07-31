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

// ─── Mastra agents (mastra.rocketing.ai) ───────────────────────
//
// Definitions for the app's AI agents, kept as code so they are reviewable and
// revertable. `pnpm sync:agents` pushes them to mastra.rocketing.ai; the service is
// the runtime, this file is the source of truth.
//
// The service validates the full shape on every write, so these types are a
// convenience for editing rather than the authority. Anything it rejects comes back as
// a VALIDATION_ERROR naming the field.

/** Ground an agent's answers in RAG collections the app has ingested. */
export interface MastraRagGrounding {
  collections: string[];
  topK?: number;
  minScore?: number;
}

/** An external MCP server whose tools the agent may call. */
export interface MastraMcpServer {
  name: string;
  url: string;
  /**
   * Name of a secret holding the bearer token — never the token itself. A stored
   * definition with an inline token would put a live credential in the database, so the
   * service refuses one.
   */
  authSecret?: string;
  /** Gate every tool from this server behind human approval. */
  requireApproval?: boolean;
}

/** Supervisor policy. Named settings only — never functions, since these cross HTTP. */
export interface MastraDelegationPolicy {
  maxDelegations?: number;
  allowedSubagents?: string[];
  promptSuffix?: string;
  subagentMaxSteps?: number;
  bailOnError?: boolean;
  messageFilter?: { lastN?: number; dropContaining?: string[] };
  includeSubAgentToolResults?: boolean;
  isTaskComplete?: { scorers: string[]; strategy?: "all" | "any" };
}

export interface MastraAgent {
  /** Stable id. Alphanumerics, dashes and underscores. Renaming means a new agent. */
  agentId: string;
  name: string;
  /** `provider/model`, e.g. `openai/gpt-4.1-mini` or `anthropic/claude-sonnet-4-5`. */
  model: string;
  instructions: string;
  /** Short capability summary. A supervisor routes on its subagents' descriptions. */
  description?: string;
  /**
   * Conversation history and working memory. Semantic recall beyond the last 50
   * messages additionally needs the vector store, which is not enabled today — see
   * the mastra service README.
   */
  memory?: { enabled: boolean };
  rag?: MastraRagGrounding;
  mcpServers?: MastraMcpServer[];
  /** Subagent ids, making this a supervisor. Resolved within this app only. */
  agents?: string[];
  delegation?: MastraDelegationPolicy;
  maxSteps?: number;
  metadata?: Record<string, unknown>;
}

export type AgentsConfig = MastraAgent[];
