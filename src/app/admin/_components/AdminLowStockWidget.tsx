import Link from "next/link";
import { productsType } from "@/lib/validation/types";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

interface AdminLowStockWidgetProps {
  products: productsType[];
}

export default function AdminLowStockWidget({ products }: AdminLowStockWidgetProps) {
  const lowStockProducts = products
    .filter((p) => p.stock_quantity <= 5)
    .sort((a, b) => a.stock_quantity - b.stock_quantity)
    .slice(0, 5);

  return (
    <div className="bg-sidebar border border-border rounded-xl p-5 space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-foreground">
              Low Stock Alerts
            </h3>
            <p className="text-xs text-muted-foreground">
              Products requiring inventory restock
            </p>
          </div>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:tracking-[0.5px] transition-tracking duration-150 cursor-default"
        >
          <span>Manage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      {lowStockProducts.length === 0 ? (
        <div className="py-6 text-center text-xs text-muted-foreground border border-dashed border-border rounded-lg flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>All catalog inventory levels are healthy!</span>
        </div>
      ) : (
        <div className="space-y-2">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="p-2.5 rounded-lg border border-border bg-background/50 flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">
                  {product.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {formatCurrency(product.price)}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className={`inline-block font-mono font-bold text-[11px] px-2 py-0.5 rounded-full ${
                    product.stock_quantity === 0
                      ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                      : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                  }`}
                >
                  {product.stock_quantity === 0
                    ? "Out of Stock"
                    : `${product.stock_quantity} left`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
