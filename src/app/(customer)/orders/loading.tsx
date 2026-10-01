import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Orders List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-sidebar border border-border rounded-2xl p-5 space-y-4 shadow-sm"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="space-y-1">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-36 rounded-md" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
            </div>

            {/* Address skeleton */}
            <Skeleton className="h-3 w-48 rounded-md" />

            {/* Items list skeleton */}
            <div className="space-y-2 pt-1">
              <Skeleton className="h-3 w-32 rounded-md" />
              <div className="bg-background/60 border border-border/50 rounded-xl p-3 space-y-3">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-40 rounded-md" />
                      <Skeleton className="h-3 w-24 rounded-md" />
                    </div>
                    <Skeleton className="h-4 w-16 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
