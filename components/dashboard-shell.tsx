import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

/**
 * DashboardShell:
 *
 * Provides the overarching responsive layout shell for all authenticated/dashboard routes:
 * - Desktop: Fixed/sticky left sidebar (260px width)
 * - Mobile/Tablet: Slide-out drawer with mobile header bar
 * - Main: Content area with automatic overflow scrolling and responsive padding
 */
export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Mobile top navigation (< md) */}
      <MobileSidebar />

      {/* Desktop left sidebar (>= md) */}
      <div className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        <AppSidebar />
      </div>

      {/* Main content viewport */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
