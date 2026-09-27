"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, LayoutDashboard } from "lucide-react";

export default function AdminErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="bg-card border border-border p-8 sm:p-12 rounded-3xl space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-3xl flex items-center justify-center mx-auto border border-amber-500/20">
          <AlertCircle className="w-8 h-8 shrink-0" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">
            Admin Dashboard Error
          </h1>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            An unexpected error occurred while loading this admin view. Attempt to retry the operation or return to the main dashboard.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-muted-foreground/60 pt-1">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            size="lg"
            className="w-full sm:w-auto gap-2 rounded-2xl cursor-default"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Action</span>
          </Button>

          <Link href="/admin" className="w-full sm:w-auto cursor-default">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 rounded-2xl cursor-default"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
