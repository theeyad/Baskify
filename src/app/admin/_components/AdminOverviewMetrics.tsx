import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface AdminOverviewMetricsProps {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

export default function AdminOverviewMetrics({
  totalRevenue,
  totalOrders,
  totalProducts,
  totalCustomers,
}: AdminOverviewMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Revenue */}
      <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">Total Revenue</p>
          <p className="text-xl font-bold font-heading text-foreground">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">Total Orders</p>
          <p className="text-xl font-bold font-heading text-foreground">
            {totalOrders}
          </p>
        </div>
      </div>

      {/* Total Products */}
      <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">Active Products</p>
          <p className="text-xl font-bold font-heading text-foreground">
            {totalProducts}
          </p>
        </div>
      </div>

      {/* Total Customers */}
      <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">Total Customers</p>
          <p className="text-xl font-bold font-heading text-foreground">
            {totalCustomers}
          </p>
        </div>
      </div>
    </div>
  );
}
