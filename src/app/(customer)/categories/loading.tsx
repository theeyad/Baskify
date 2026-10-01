import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-48 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded-md" />
      </div>

      {/* Categories Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="relative h-72 rounded-2xl overflow-hidden border border-border bg-card shadow-sm"
          >
            <Skeleton className="w-full h-full rounded-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 bg-linear-to-t from-background/90 via-background/40 to-transparent">
              <Skeleton className="h-6 w-36 rounded-md" />
              <Skeleton className="h-3 w-48 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
