import { PackageCheck, Package, DollarSign, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface AdminOrdersMetricsProps{
  ordersLength: number;
  totalRevenue: number;
  pendingCount: number;
  deliveredCount: number;
}

export default function AdminOrdersMetrics({
  ordersLength,
  totalRevenue,
  pendingCount,
  deliveredCount,
}: AdminOrdersMetricsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Orders
            </p>
            <p className="text-xl font-bold font-heading text-foreground">
              {ordersLength}
            </p>
          </div>
        </div>

        <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Revenue
            </p>
            <p className="text-xl font-bold font-heading text-foreground">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </div>

        <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Pending Orders
            </p>
            <p className="text-xl font-bold font-heading text-foreground">
              {pendingCount}
            </p>
          </div>
        </div>

        <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Delivered Orders
            </p>
            <p className="text-xl font-bold font-heading text-foreground">
              {deliveredCount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
