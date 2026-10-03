import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Baskify | Authentication Error",
  description: "There was a problem verifying your authentication code.",
};

export default function AuthCodeErrorPage() {
  return (
    <div className="relative overflow-hidden border bg-card shadow-md w-full mx-4 my-8 max-w-md rounded-xl p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" aria-hidden="true" />
      </div>

      <h1 className="text-2xl font-bold mb-2 text-foreground">
        Authentication Error
      </h1>

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        The authentication link may be invalid, expired, or has already been used.
        Please try requesting a new link or sign in again.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "default" }), "w-full cursor-default")}
        >
          Return to Sign In
        </Link>
        <Link
          href="/register"
          className={cn(buttonVariants({ variant: "outline" }), "w-full cursor-default")}
        >
          Create New Account
        </Link>
      </div>
    </div>
  );
}