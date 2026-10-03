import * as React from "react";
import Link from "next/link";
import { Workflow, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground px-4 py-8 sm:px-6 lg:px-8">
      {/* Top bar with logo and theme toggle */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1 transition-opacity hover:opacity-90"
        >
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Workflow className="size-4.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight leading-none">
              CareerLoop
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden sm:inline-block">
              Loop
            </span>
          </div>
        </Link>

        {/* Subtle Theme Toggle in top-right */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Centered Auth Container */}
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-[420px] space-y-6">
          {/* Card Container */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            {/* Header info */}
            <div className="space-y-1.5 text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground mb-1">
                <Sparkles className="size-3 text-amber-500" />
                <span>Job Search Tracker</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-card-foreground">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Form Slot */}
            {children}

            {/* Footer switcher link */}
            <div className="mt-6 pt-5 border-t border-border text-center text-xs text-muted-foreground">
              <span>{footerText} </span>
              <Link
                href={footerLinkHref}
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded-sm outline-none"
              >
                {footerLinkText}
              </Link>
            </div>
          </div>

          {/* Micro trust disclaimer */}
          <p className="text-center text-[11px] text-muted-foreground">
            By continuing, you agree to CareerLoop’s standard Terms and Privacy policy.
          </p>
        </div>
      </main>

      {/* Subtle Footer note */}
      <footer className="w-full max-w-6xl mx-auto text-center text-xs text-muted-foreground/80 py-2">
        © {new Date().getFullYear()} CareerLoop. Keep your career momentum going.
      </footer>
    </div>
  );
}
