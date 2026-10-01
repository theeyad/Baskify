import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOrdersLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <Skeleton className="h-8 w-48 rounded-lg" />

      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs"
          >
            <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-20 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar Skeleton */}
      <div className="bg-sidebar border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Skeleton className="h-8 w-full sm:w-72 rounded-lg" />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-7 w-16 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Orders Table Skeleton */}
      <div className="bg-sidebar border border-border rounded-xl overflow-hidden shadow-xs p-4 space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
