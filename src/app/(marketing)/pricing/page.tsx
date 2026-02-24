"use client";

import { useState } from "react";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Button } from "@/components/ui/button";
import { plansConfig } from "@/../config/plans.config";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that fits your needs. Upgrade or downgrade at any time.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border/40 p-1">
          <Button
            variant={billingCycle === "monthly" ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === "yearly" ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly
          </Button>
        </div>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plansConfig.plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} billingCycle={billingCycle} />
        ))}
      </div>
    </div>
  );
}
