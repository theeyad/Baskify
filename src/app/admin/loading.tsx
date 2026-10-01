import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOverviewLoading() {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-8 w-44 rounded-lg" />
        <Skeleton className="h-4 w-72 rounded-md" />
      </div>

      {/* KPI Cards Skeleton */}
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

      {/* Main Widgets Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Orders Mini Table Skeleton */}
        <div className="lg:col-span-2 bg-sidebar border border-border rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-3 w-40 rounded-md" />
            </div>
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>

          <div className="border border-border rounded-lg overflow-hidden space-y-2 p-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-14 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Low Stock & Categories Skeleton */}
        <div className="space-y-6">
          <div className="bg-sidebar border border-border rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3 w-44 rounded-md" />
              </div>
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-2.5 rounded-lg border border-border flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-3 w-16 rounded-md" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
