import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/../config/site.config";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {/* CUSTOMIZE: Replace with compelling headline */}
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          {siteConfig.description}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button size="lg" asChild>
          <Link href="/sign-up">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/pricing">View Pricing</Link>
        </Button>
      </div>
    </section>
  );
}
