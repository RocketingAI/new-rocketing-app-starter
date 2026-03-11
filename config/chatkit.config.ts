import type { ChatKitConfig } from "@/types/config";

// ─── AGENT CUSTOMIZATION POINT ─────────────────────────────────
// ChatKit configuration — flat structure aligned with the builder's
// ChatContainerConfig (builder.rocketing.ai/chatkit/ui).
//
// This file is a static fallback. In production, configs are read
// from the MongoDB app-configs collection via the config loader.
// ────────────────────────────────────────────────────────────────

export const chatkitConfig: ChatKitConfig = {
  // ── Cascade / Runtime fields ────────────────────────────────
  archetype: "personal-companion",
  model: "gpt-5-mini",
  reasoning: { effort: "low" },
  tone: {
    personality: "Friendly and professional",
    formality: "casual-professional",
    readingLevel: "8th grade",
    emojiUsage: "none",
    traits: [],
    antiTraits: [],
  },
  errorText: "Something went wrong. Please try again.",
  loadingText: "Thinking...",
  successText: null,
  registryAgent: null,
  registryPrompt: null,
  registryTools: [],
  registrySkills: [],

  // ── Container settings ──────────────────────────────────────
  containerType: "embedded",
  width: 400,
  widthUnit: "px",
  height: 500,
  heightUnit: "px",
  maxWidth: 800,
  maxHeight: 700,
  borderRadius: 16,
  borderRadiusTL: 16,
  borderRadiusTR: 16,
  borderRadiusBL: 16,
  borderRadiusBR: 16,
  useIndividualCorners: false,
  showBorder: true,
  showShadow: true,
  position: "right",

  // ── Spacing ─────────────────────────────────────────────────
  useIndividualPadding: false,
  padding: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  useIndividualMargin: false,
  margin: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,

  // ── Header ──────────────────────────────────────────────────
  showHeader: true,
  headerText: "Chat Assistant",
  headerAlignment: "left",

  // ── Theme & appearance ──────────────────────────────────────
  theme: "auto",
  backgroundColor: "",
  accentColor: "#3b82f6",
  useCustomBackground: false,

  // ── Typography ──────────────────────────────────────────────
  fontFamily: "system",
  headerFontSize: 14,
  headerFontWeight: "semibold",
  bodyFontSize: 14,
  bodyLineHeight: 1.5,
  inputFontSize: 14,
  messageSpacing: 12,

  // ── Agent settings ──────────────────────────────────────────
  profileId: "default",
  agentName: "AI Assistant",
  agentSelectorVariant: "none",
  systemPrompt: "You are a helpful AI assistant. You help users with their questions and tasks. Be concise, friendly, and professional.",

  // ── Widgets ─────────────────────────────────────────────────
  widgetsEnabled: false,
  widgets: [],

  // ── Guardrails ──────────────────────────────────────────────
  guardrailsEnabled: false,
  maxTokens: 4096,
  contentFiltering: false,
  piiFiltering: false,
  topicRestrictions: [],

  // ── Workflows ───────────────────────────────────────────────
  workflowsEnabled: false,
  workflows: [],

  // ── Chat settings ───────────────────────────────────────────
  greeting: "Hi! How can I help you today?",
  placeholder: "Ask anything...",
  emptyStateText: "Ask me anything. I'm here to help.",
  attachmentsEnabled: false,
  autoFocus: true,

  // ── FAB-specific ────────────────────────────────────────────
  fabSize: 56,
  fabTooltip: "Chat with us",
  showBadge: false,
  fabIcon: "chat",

  // ── Modal/SidePanel-specific ────────────────────────────────
  showCloseButton: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showOverlay: true,
  overlayOpacity: 50,
};
