"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Menu } from "@base-ui/react";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
  variant?: "dropdown" | "group";
}

export function ThemeToggle({
  className,
  variant = "dropdown",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (variant === "group") {
    return (
      <div
        role="group"
        aria-label="Theme switcher"
        className={cn(
          "inline-flex items-center rounded-lg border border-border bg-muted/50 p-1 text-muted-foreground",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
            mounted && theme === "light"
              ? "bg-background text-foreground shadow-sm"
              : "hover:text-foreground"
          )}
          aria-pressed={mounted && theme === "light"}
        >
          <Sun className="h-3.5 w-3.5" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
            mounted && theme === "dark"
              ? "bg-background text-foreground shadow-sm"
              : "hover:text-foreground"
          )}
          aria-pressed={mounted && theme === "dark"}
        >
          <Moon className="h-3.5 w-3.5" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
            mounted && theme === "system"
              ? "bg-background text-foreground shadow-sm"
              : "hover:text-foreground"
          )}
          aria-pressed={mounted && theme === "system"}
        >
          <Monitor className="h-3.5 w-3.5" />
          <span>System</span>
        </button>
      </div>
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Select theme"
            className={cn("relative cursor-pointer", className)}
          />
        }
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          side="bottom"
          align="end"
          sideOffset={6}
          className="z-50"
        >
          <Menu.Popup className="z-50 min-w-[9rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none">
            <Menu.Item
              onClick={() => setTheme("light")}
              className="relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </div>
              {mounted && theme === "light" && (
                <Check className="h-4 w-4 text-foreground" />
              )}
            </Menu.Item>

            <Menu.Item
              onClick={() => setTheme("dark")}
              className="relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </div>
              {mounted && theme === "dark" && (
                <Check className="h-4 w-4 text-foreground" />
              )}
            </Menu.Item>

            <Menu.Item
              onClick={() => setTheme("system")}
              className="relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>System</span>
              </div>
              {mounted && theme === "system" && (
                <Check className="h-4 w-4 text-foreground" />
              )}
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
