"use client";

import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  onMenuToggle?: () => void;
}

export function AppHeader({ onMenuToggle }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/40 bg-background/80 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
