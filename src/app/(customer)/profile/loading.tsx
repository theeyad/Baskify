import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Card Skeleton */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Skeleton className="w-24 h-24 rounded-full shrink-0" />
          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-44 rounded-md" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-36 rounded-md" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-28 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
            <div className="pt-2 flex gap-4">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-sidebar border border-border p-6 rounded-2xl space-y-4">
          <Skeleton className="h-4 w-28 rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-full rounded-lg" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        </div>

        <div className="bg-sidebar border border-border p-6 rounded-2xl space-y-4">
          <Skeleton className="h-4 w-40 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
          </div>
        </div>
      </div>

      {/* Past Orders Skeleton */}
      <div className="space-y-4 pt-4">
        <Skeleton className="h-6 w-36 rounded-md" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-sidebar border border-border rounded-2xl p-5 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
