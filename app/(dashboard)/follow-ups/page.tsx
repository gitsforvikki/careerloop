import * as React from "react";
import { Clock, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FollowupsPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Follow-ups
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Stay on top of recruiter follow-ups, post-interview thank yous, and reminders.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer">
            <Filter className="size-3.5" />
            Filter
          </Button>
          <Button size="sm" className="gap-1.5 cursor-pointer shadow-xs">
            <Plus className="size-4" />
            Schedule Follow-up
          </Button>
        </div>
      </div>

      {/* Placeholder / Empty State */}
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center text-card-foreground flex flex-col items-center justify-center min-h-[360px]">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
          <Clock className="size-6" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Follow-up Reminders & Schedule
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mt-1 mb-6">
          Never miss an important message. Manage automated reminders and track when recruiters reply.
        </p>
        <Button size="sm" className="gap-1.5 cursor-pointer">
          <Plus className="size-4" />
          Schedule Follow-up
        </Button>
      </div>
    </div>
  );
}
