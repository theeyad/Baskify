import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCategoriesLoading() {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-40 rounded-lg" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>

      {/* Categories Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border border-border bg-card rounded-xl p-4 space-y-4 shadow-sm"
          >
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-3 w-full rounded-md" />
            </div>
            <Skeleton className="w-full h-40 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
