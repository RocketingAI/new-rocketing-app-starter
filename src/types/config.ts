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

export interface ChatKitConfig {
  archetype: string;

  agent: {
    name: string;
    greeting: string;
    placeholder: string;
    systemPrompt: string;
    model: string;
    reasoning: { effort: string };
  };

  registry: {
    agent: string;
    prompt: string;
    tools: string[];
    skills: string[];
    widgets: string[];
    workflows: string[];
  };

  tone: {
    personality: string;
    formality: string;
    readingLevel: string;
    emojiUsage: string;
    traits: string[];
    antiTraits: string[];
  };

  microcopy: {
    emptyState: string;
    loading: string;
    success: string | null;
    error: string;
  };

  guardrails: {
    enabled: boolean;
    contentFiltering: boolean;
    piiFiltering: boolean;
    topicRestrictions: string[];
    maxTokens: number;
  };
}
