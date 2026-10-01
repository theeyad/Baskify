import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-48 rounded-lg" />
        <Skeleton className="h-4 w-80 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Skeleton */}
        <aside className="space-y-6 lg:col-span-1 bg-sidebar border border-border p-6 rounded-2xl h-fit">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-5 w-32 rounded-md" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-3 w-20 rounded-md" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-full rounded-lg" />
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <Skeleton className="h-3 w-16 rounded-md" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid Skeleton */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Image skeleton */}
                  <Skeleton className="w-full h-56 rounded-none" />

                  {/* Content skeleton */}
                  <div className="px-5 py-3 space-y-2">
                    <Skeleton className="h-3 w-16 rounded-md" />
                    <Skeleton className="h-5 w-3/4 rounded-md" />
                    <Skeleton className="h-3 w-full rounded-md" />
                    <Skeleton className="h-3 w-2/3 rounded-md" />
                  </div>
                </div>

                {/* Footer skeleton */}
                <div className="px-5 py-4 flex items-center justify-between gap-2 border-t border-border/40 mt-2">
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
