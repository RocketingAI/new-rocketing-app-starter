"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Logo } from "@/components/shared/logo";
import { useNavigationConfig, useFeaturesConfig } from "@/lib/config/config-context";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const navigationConfig = useNavigationConfig();
  const featuresConfig = useFeaturesConfig();
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border/40 bg-background">
      <div className="flex h-16 items-center border-b border-border/40 px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationConfig.sidebar
          .filter((item) => !item.featureFlag || featuresConfig[item.featureFlag])
          .map((item) => {
          const Icon = item.icon ? iconMap[item.icon] : null;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
