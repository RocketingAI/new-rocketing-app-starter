"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";
import { useSiteConfig } from "@/lib/config/config-context";

export function Logo({ className }: { className?: string }) {
  const siteConfig = useSiteConfig();
  return (
    <Link href="/" className={`flex items-center gap-2 ${className || ""}`}>
      {siteConfig.logo.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={siteConfig.logo.icon} alt={siteConfig.name} className="h-6 w-6" />
      ) : (
        <Rocket className="h-5 w-5 text-primary" />
      )}
      <span className="text-lg font-bold">{siteConfig.logo.text}</span>
    </Link>
  );
}
