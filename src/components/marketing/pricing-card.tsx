"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Plan } from "@/types/config";

interface PricingCardProps {
  plan: Plan;
  billingCycle: "monthly" | "yearly";
}

export function PricingCard({ plan, billingCycle }: PricingCardProps) {
  const price = plan.price[billingCycle];
  return (
    <Card className={cn("relative flex flex-col", plan.highlighted && "border-primary shadow-lg")}>
      {plan.highlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">${price}</span>
          {price > 0 && (
            <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature.name} className="flex items-center gap-2 text-sm">
              {feature.included ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground/40" />
              )}
              <span className={cn(!feature.included && "text-muted-foreground/60")}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
          {plan.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
