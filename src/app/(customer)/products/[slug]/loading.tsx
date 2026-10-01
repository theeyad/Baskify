import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Top Grid: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-2xl" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-xl shrink-0" />
            ))}
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-10 w-3/4 rounded-lg" />
          </div>

          {/* Pricing Skeleton */}
          <div className="flex items-baseline gap-3">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>

          {/* Stock Badge Skeleton */}
          <Skeleton className="h-6 w-36 rounded-full" />

          {/* Description Skeleton */}
          <div className="border-t border-b border-border py-6 space-y-3">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/6 rounded-md" />
          </div>

          {/* Button Skeleton */}
          <Skeleton className="h-12 w-48 rounded-2xl" />
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="pt-12 border-t border-border space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <Skeleton className="w-full h-48 rounded-none" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
