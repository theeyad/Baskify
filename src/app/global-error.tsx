"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 shadow-lg text-center space-y-6">
          <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Critical System Error
            </h1>
            <p className="text-xs text-muted-foreground">
              An unexpected application error occurred. You can attempt to reload the application.
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-muted-foreground/60 pt-1">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <button
            onClick={() => reset()}
            className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold text-xs rounded-xl hover:bg-primary/90 transition-colors cursor-default"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
