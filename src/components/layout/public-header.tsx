"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { useNavigationConfig } from "@/lib/config/config-context";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function PublicHeader() {
  const { isSignedIn } = useAuth();
  const navigationConfig = useNavigationConfig();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navigationConfig.header.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {isSignedIn ? (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {mobileOpen && (
        <div className="border-t border-border/40 bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-4">
            {navigationConfig.header.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {isSignedIn ? (
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
