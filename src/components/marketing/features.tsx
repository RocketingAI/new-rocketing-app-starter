import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, BarChart3 } from "lucide-react";

// CUSTOMIZE: Replace features with app-specific features
const features = [
  {
    title: "Fast & Intuitive",
    description: "Built for speed with a modern, clean interface that gets out of your way.",
    icon: Zap,
  },
  {
    title: "Secure by Default",
    description: "Enterprise-grade security with end-to-end encryption and role-based access.",
    icon: Shield,
  },
  {
    title: "Powerful Analytics",
    description: "Gain insights with real-time dashboards and comprehensive reporting.",
    icon: BarChart3,
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Powerful features to help you work smarter, not harder.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="border-border/40">
            <CardHeader>
              <feature.icon className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
