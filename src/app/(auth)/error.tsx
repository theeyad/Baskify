"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RotateCcw, LogIn } from "lucide-react";

export default function AuthErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md w-full mx-auto p-4 py-12 text-center">
      <div className="bg-card border border-border p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-xl font-heading font-extrabold text-foreground tracking-tight">
            Authentication Error
          </h1>
          <p className="text-xs text-muted-foreground">
            An unexpected error occurred during authentication processing. Please try again or return to the sign-in page.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-muted-foreground/60 pt-1">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Button
            onClick={() => reset()}
            size="lg"
            className="w-full gap-2 rounded-xl cursor-default"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>

          <Link href="/login" className="w-full cursor-default">
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 rounded-xl cursor-default"
            >
              <LogIn className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
