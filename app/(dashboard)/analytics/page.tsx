import * as React from "react";
import { BarChart3, TrendingUp, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 max-w-7xl w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze your application response rates, funnel conversions, and search efficiency.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer">
            <Calendar className="size-3.5" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer">
            <Download className="size-3.5" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Placeholder / Empty State */}
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center text-card-foreground flex flex-col items-center justify-center min-h-[360px]">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
          <BarChart3 className="size-6" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Application Funnel & Metrics
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mt-1 mb-6">
          Visual graphs of response ratios, interview conversion rates by source, and average response times.
        </p>
        <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer">
          <TrendingUp className="size-4" />
          Generate Sample Report
        </Button>
      </div>
    </div>
  );
}
