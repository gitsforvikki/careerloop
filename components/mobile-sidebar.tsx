"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react";
import { Menu, X, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";

/**
 * MobileSidebar:
 *
 * Provides a mobile top navigation header (< md screens) with a menu button
 * that triggers an accessible slide-over drawer containing the full AppSidebar.
 */
export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden flex items-center justify-between px-4 h-15 border-b border-border bg-sidebar text-sidebar-foreground sticky top-0 z-40 shrink-0">
      {/* Brand mark on mobile */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
          <Workflow className="size-4" />
        </div>
        <span className="font-bold text-sm tracking-tight">CareerLoop</span>
      </div>

      {/* Menu Drawer Trigger */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Open mobile navigation menu"
              className="cursor-pointer"
            />
          }
        >
          <Menu className="size-4" />
        </Dialog.Trigger>

        <Dialog.Portal>
          {/* Backdrop */}
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200" />

          {/* Drawer Popup */}
          <Dialog.Popup className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-2xl flex flex-col focus:outline-none transition-transform duration-200">
            <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
            <Dialog.Description className="sr-only">
              CareerLoop primary navigation menu
            </Dialog.Description>

            {/* Close button at top right of drawer */}
            <div className="absolute right-3 top-3.5 z-10">
              <Dialog.Close
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Close navigation menu"
                    className="cursor-pointer rounded-md text-muted-foreground hover:text-foreground"
                  />
                }
              >
                <X className="size-4" />
              </Dialog.Close>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 min-h-0">
              <AppSidebar onNavigate={() => setOpen(false)} />
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
