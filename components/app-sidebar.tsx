"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "@base-ui/react";
import {
  LayoutDashboard,
  Briefcase,
  Clock,
  Calendar,
  Users,
  BarChart3,
  Workflow,
  Sparkles,
  LogOut,
  ChevronsUpDown,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";

export interface AuthUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

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

function getInitials(name?: string | null, email?: string | null): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email?.trim()) {
    return email.slice(0, 2).toUpperCase();
  }
  return "U";
}

interface AppSidebarProps {
  className?: string;
  onNavigate?: () => void;
  user?: AuthUser;
}

/**
 * AppSidebar:
 *
 * Primary application navigation sidebar containing:
 * - Brand identity with icon mark
 * - Primary navigation links with active state highlighting
 * - Footer with theme switcher and authenticated user profile with Sign Out
 */
export function AppSidebar({ className, onNavigate, user }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const displayName = user?.name || "CareerLoop User";
  const displayEmail = user?.email || "Workspace User";
  const initials = getInitials(user?.name, user?.email);

  async function handleSignOut() {
    if (isSigningOut) return;
    setIsSigningOut(true);

    try {
      await authClient.signOut();
      if (onNavigate) {
        onNavigate();
      }
      router.push("/login");
      router.refresh();
    } catch {
      setIsSigningOut(false);
    }
  }

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
      <div className="p-3 border-t border-sidebar-border mt-auto space-y-2 shrink-0">
        {/* Theme row */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-sidebar-accent/40 text-xs font-medium text-muted-foreground">
          <span>Theme</span>
          <ThemeToggle />
        </div>

        {/* Authenticated User Menu */}
        <Menu.Root>
          <Menu.Trigger
            render={
              <button
                type="button"
                aria-label="User profile and session options"
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-sidebar-accent/60 transition-colors cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              />
            }
          >
            <div className="relative size-8 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center border border-primary/20 shrink-0 overflow-hidden">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={displayName}
                  className="size-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
              <span
                className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-500 ring-2 ring-sidebar"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-sidebar-foreground truncate">
                {displayName}
              </span>
              <span className="text-[11px] text-muted-foreground truncate">
                {displayEmail}
              </span>
            </div>
            <ChevronsUpDown className="size-3.5 text-muted-foreground shrink-0" />
          </Menu.Trigger>

          <Menu.Portal>
            <Menu.Positioner
              side="top"
              align="start"
              sideOffset={8}
              className="z-50 w-58"
            >
              <Menu.Popup className="z-50 w-full overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none">
                <div className="px-2.5 py-2 border-b border-border mb-1">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {displayEmail}
                  </p>
                </div>

                <Menu.Item
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-destructive outline-none transition-colors hover:bg-destructive/10 data-[highlighted]:bg-destructive/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  {isSigningOut ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <LogOut className="size-3.5" />
                  )}
                  <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </aside>
  );
}
