import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-72 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
        {/* Left Column: Form Skeleton */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6">
          <Skeleton className="h-6 w-44 rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full rounded-xl mt-4" />
        </div>

        {/* Right Column: Order Summary Skeleton */}
        <div className="bg-sidebar border border-border rounded-3xl p-6 sm:p-8 space-y-6">
          <Skeleton className="h-6 w-36 rounded-md" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border/40">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
