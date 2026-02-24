import type { PlansConfig } from "@/types/config";

// ─── AGENT CUSTOMIZATION POINT ─────────────────────────────────
// Agents update plan names, pricing, features, and limits
// to match the product's subscription model.
// stripePriceId values are set after Stripe products are created.
// ────────────────────────────────────────────────────────────────

export const plansConfig: PlansConfig = {
  currency: "usd",
  plans: [
    {
      id: "free",
      name: "Free",
      description: "Get started with basic features",
      price: { monthly: 0, yearly: 0 },
      stripePriceId: { monthly: null, yearly: null },
      features: [
        { name: "Up to 3 projects", included: true },       // CUSTOMIZE
        { name: "Basic features", included: true },
        { name: "Community support", included: true },
        { name: "API access", included: false },
        { name: "Priority support", included: false },
      ],
      limits: {
        projects: 3,                                         // CUSTOMIZE
        storage: "100MB",
        apiCalls: 100,
      },
      cta: "Get Started",
      highlighted: false,
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professionals and growing teams",
      price: { monthly: 29, yearly: 290 },                  // CUSTOMIZE
      stripePriceId: { monthly: null, yearly: null },        // Set after Stripe sync
      features: [
        { name: "Unlimited projects", included: true },      // CUSTOMIZE
        { name: "Advanced features", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
        { name: "Custom integrations", included: false },
      ],
      limits: {
        projects: -1,
        storage: "10GB",
        apiCalls: 10000,
      },
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      id: "max",
      name: "Max",
      description: "For teams that need everything",
      price: { monthly: 49, yearly: 490 },                  // CUSTOMIZE
      stripePriceId: { monthly: null, yearly: null },        // Set after Stripe sync
      features: [
        { name: "Unlimited everything", included: true },    // CUSTOMIZE
        { name: "Advanced features", included: true },
        { name: "Dedicated support", included: true },
        { name: "API access", included: true },
        { name: "Custom integrations", included: true },
      ],
      limits: {
        projects: -1,
        storage: "100GB",
        apiCalls: -1,
      },
      cta: "Contact Sales",
      highlighted: false,
    },
  ],
};
