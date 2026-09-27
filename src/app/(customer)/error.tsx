"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function CustomerErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="bg-card border border-border p-8 sm:p-12 rounded-3xl space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-3xl flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
          <AlertTriangle className="w-8 h-8 shrink-0" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            An unexpected error occurred while rendering this page. You can try recovering by clicking below or returning to the storefront.
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
            <span>Try Again</span>
          </Button>

          <Link href="/" className="w-full sm:w-auto cursor-default">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 rounded-2xl cursor-default"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
