"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Clock,
  Calendar,
  Users,
  BarChart3,
  Workflow,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Primary navigation item definitions for CareerLoop.
 */
export const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    href: "/applications",
    icon: Briefcase,
  },
  {
    name: "Follow-ups",
    href: "/follow-ups",
    icon: Clock,
  },
  {
    name: "Interviews",
    href: "/interviews",
    icon: Calendar,
  },
  {
    name: "Recruiters",
    href: "/recruiters",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

interface AppSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

/**
 * AppSidebar:
 *
 * Primary application navigation sidebar containing:
 * - Brand identity with icon mark
 * - Primary navigation links with active state highlighting
 * - Footer with theme switcher and user profile placeholder
 */
export function AppSidebar({ className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-sidebar-border shrink-0">
        <div className="flex items-center justify-center size-9 rounded-lg bg-primary text-primary-foreground shadow-xs">
          <Workflow className="size-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-base tracking-tight leading-tight">
            CareerLoop
          </span>
          <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
            <Sparkles className="size-3 text-amber-500 shrink-0" />
            Career Tracker
          </span>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
          Platform
        </div>
        <nav className="space-y-1" aria-label="Main Navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                )}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-primary"
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className={cn(
                    "size-4.5 shrink-0 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-sidebar-foreground"
                  )}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Account / Theme */}
      <div className="p-3 border-t border-sidebar-border mt-auto space-y-3 shrink-0">
        {/* Theme row */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-sidebar-accent/40 text-xs font-medium text-muted-foreground">
          <span>Theme</span>
          <ThemeToggle />
        </div>

        {/* Profile / Account Placeholder */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
          <div className="relative size-8 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center border border-primary/20 shrink-0">
            VK
            <span
              className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-500 ring-2 ring-sidebar"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-medium text-sidebar-foreground truncate">
              Vikash Kumar
            </span>
            <span className="text-[11px] text-muted-foreground truncate">
              Career Workspace
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
