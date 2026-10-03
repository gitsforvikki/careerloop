import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  CalendarClock,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

/**
 * Summary metrics data structure (static UI placeholder ready for backend binding).
 */
const summaryMetrics = [
  {
    title: "Total Applications",
    value: "24",
    change: "+4 this week",
    changeType: "positive",
    icon: Briefcase,
    description: "Active pipeline candidates",
  },
  {
    title: "Interviews",
    value: "3",
    change: "1 scheduled today",
    changeType: "neutral",
    icon: Calendar,
    description: "Technical & HR rounds",
  },
  {
    title: "Follow-ups Due",
    value: "5",
    change: "2 overdue",
    changeType: "warning",
    icon: Clock,
    description: "Pending recruiter touchpoints",
  },
  {
    title: "Active Offers",
    value: "1",
    change: "Decision in 4 days",
    changeType: "success",
    icon: CheckCircle2,
    description: "Under active review",
  },
];

/**
 * Placeholder follow-up tasks.
 */
const pendingFollowups = [
  {
    id: "f1",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    type: "Post-Interview Note",
    dueDate: "Today",
    isUrgent: true,
  },
  {
    id: "f2",
    company: "Linear",
    role: "Fullstack Engineer",
    type: "Application Follow-up",
    dueDate: "Tomorrow",
    isUrgent: false,
  },
  {
    id: "f3",
    company: "Vercel",
    role: "Solutions Architect",
    type: "HR DM Check-in",
    dueDate: "Overdue",
    isUrgent: true,
  },
  {
    id: "f4",
    company: "Figma",
    role: "Design Technologist",
    type: "Technical Round Thanks",
    dueDate: "Oct 6",
    isUrgent: false,
  },
];

/**
 * Placeholder recent applications.
 */
const recentApplications = [
  {
    id: "a1",
    company: "Stripe",
    initial: "S",
    role: "Senior Frontend Engineer",
    location: "Remote, US / APAC",
    source: "Referral",
    status: "Interview",
    appliedDate: "Sep 28, 2026",
  },
  {
    id: "a2",
    company: "Linear",
    initial: "L",
    role: "Fullstack Engineer",
    location: "Remote, Global",
    source: "LinkedIn",
    status: "HR Contacted",
    appliedDate: "Sep 30, 2026",
  },
  {
    id: "a3",
    company: "Vercel",
    initial: "V",
    role: "Solutions Architect",
    location: "San Francisco, CA",
    source: "Career Page",
    status: "Applied",
    appliedDate: "Oct 1, 2026",
  },
  {
    id: "a4",
    company: "Supabase",
    initial: "S",
    role: "Developer Advocate",
    location: "Remote",
    source: "Twitter / X",
    status: "Offer",
    appliedDate: "Sep 15, 2026",
  },
  {
    id: "a5",
    company: "Notion",
    initial: "N",
    role: "Product Infrastructure Engineer",
    location: "New York, NY",
    source: "LinkedIn",
    status: "Saved",
    appliedDate: "Oct 2, 2026",
  },
];

/**
 * Status badge styling helper using semantic CSS colors.
 */
function getStatusBadgeClass(status: string) {
  switch (status) {
    case "Offer":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "Interview":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    case "HR Contacted":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "Applied":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-6 md:p-8 max-w-7xl w-full mx-auto">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track, organize, and accelerate your job search lifecycle in one clean workspace.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/analytics"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View Analytics
            <ArrowUpRight className="size-3.5 ml-1" />
          </Link>
          <Link
            href="/applications"
            className={buttonVariants({
              size: "sm",
              className: "gap-1.5 shadow-xs",
            })}
          >
            <Plus className="size-4" />
            New Application
          </Link>
        </div>
      </div>

      {/* 2. Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-xs transition-shadow hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {metric.title}
                </span>
                <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-foreground shrink-0">
                  <Icon className="size-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-foreground">
                  {metric.value}
                </span>
                <span
                  className={`text-xs font-medium ${
                    metric.changeType === "warning"
                      ? "text-amber-600 dark:text-amber-400"
                      : metric.changeType === "success" || metric.changeType === "positive"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* 3. Two-Column Dashboard Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Recent Applications (2 Columns) */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Recent Applications
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest job applications tracked in your pipeline.
              </p>
            </div>
            <Link
              href="/applications"
              className={buttonVariants({
                variant: "ghost",
                size: "xs",
                className: "gap-1 text-xs",
              })}
            >
              View all
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-xs font-medium text-muted-foreground border-b border-border">
                <tr>
                  <th scope="col" className="px-5 py-3">Company & Role</th>
                  <th scope="col" className="px-4 py-3 hidden sm:table-cell">Source</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3 hidden md:table-cell">Applied</th>
                  <th scope="col" className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/15">
                          {app.initial}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground leading-snug truncate">
                            {app.company}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {app.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground hidden sm:table-cell">
                      {app.source}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground hidden md:table-cell whitespace-nowrap">
                      {app.appliedDate}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Link
                        href="/applications"
                        aria-label={`View details for ${app.company}`}
                        className={buttonVariants({
                          variant: "ghost",
                          size: "icon-xs",
                          className:
                            "text-muted-foreground hover:text-foreground",
                        })}
                      >
                        <ExternalLink className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Follow-ups Due (1 Column) */}
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-xs overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Follow-ups Due
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pending touchpoints to keep deals warm.
              </p>
            </div>
            <Link
              href="/follow-ups"
              className={buttonVariants({
                variant: "ghost",
                size: "xs",
                className: "gap-1 text-xs",
              })}
            >
              View all
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="p-4 space-y-3">
            {pendingFollowups.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border/70 bg-background hover:border-border transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="mt-0.5 size-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <CalendarClock className="size-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {item.company}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.role}
                    </p>
                    <span className="text-[10px] text-muted-foreground/80 mt-1 block">
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      item.isUrgent
                        ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {item.dueDate}
                  </span>
                  <Button
                    variant="outline"
                    size="xs"
                    className="text-[11px] h-6 px-2 cursor-pointer"
                  >
                    Done
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
