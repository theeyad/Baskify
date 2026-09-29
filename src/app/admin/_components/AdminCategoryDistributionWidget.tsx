import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export interface CategoryDistributionItem {
  id: string;
  name: string;
  productCount: number;
}

interface AdminCategoryDistributionWidgetProps {
  categories: CategoryDistributionItem[];
  totalProducts: number;
}

export default function AdminCategoryDistributionWidget({
  categories,
  totalProducts,
}: AdminCategoryDistributionWidgetProps) {
  return (
    <div className="bg-sidebar border border-border rounded-xl p-5 space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-foreground">
              Categories
            </h3>
            <p className="text-xs text-muted-foreground">
              Product catalog distribution
            </p>
          </div>
        </div>
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:tracking-[0.5px] transition-tracking duration-150 cursor-default"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Category List with Progress Bar */}
      {categories.length === 0 ? (
        <div className="py-6 text-center text-xs text-muted-foreground border border-dashed border-border rounded-lg">
          No categories found.
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((category) => {
            const percentage =
              totalProducts > 0
                ? Math.round((category.productCount / totalProducts) * 100)
                : 0;

            return (
              <div key={category.id} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {category.name}
                  </span>
                  <span className="font-mono text-[11px]">
                    {category.productCount}{" "}
                    {category.productCount === 1 ? "item" : "items"} (
                    {percentage}%)
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${Math.max(percentage, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
