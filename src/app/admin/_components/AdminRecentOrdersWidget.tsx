import Link from "next/link";
import { formatDate, formatCurrency } from "@/lib/utils";
import { AdminOrder, ProfileMap } from "@/lib/validation/types";
import { ArrowRight, CheckCircle2, Truck, PackageCheck, XCircle, Clock, ShoppingBag } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminRecentOrdersWidgetProps {
  orders: AdminOrder[];
  profiles: ProfileMap;
}

export default function AdminRecentOrdersWidget({
  orders,
  profiles,
}: AdminRecentOrdersWidgetProps) {
  const recentOrders = orders.slice(0, 5);

  function getStatusBadge(status: string) {
    const s = status.toLowerCase();
    switch (s) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Paid
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <Truck className="w-3 h-3" /> Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
            <PackageCheck className="w-3 h-3" /> Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  }

  return (
    <div className="bg-sidebar border border-border rounded-xl p-5 space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-sm text-foreground">
            Recent Orders
          </h3>
          <p className="text-xs text-muted-foreground">
            Latest 5 customer purchases
          </p>
        </div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:tracking-[0.5px] transition-tracking duration-150 cursor-default"
        >
          <span>View All Orders</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Orders Mini Table */}
      {recentOrders.length === 0 ? (
        <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-lg">
          <ShoppingBag className="w-6 h-6 mx-auto mb-2 opacity-50" />
          No recent orders found.
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Order ID</TableHead>
                <TableHead className="text-xs">Customer</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Total</TableHead>
                <TableHead className="text-xs text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => {
                const shortId = order.id.substring(0, 8).toUpperCase();
                const customerName =
                  (order.user_id && profiles[order.user_id]?.full_name) ||
                  order.shipping_address?.fullName ||
                  "Guest Customer";

                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs font-semibold">
                      #{shortId}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-foreground">
                      {customerName}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(new Date(order.created_at))}
                    </TableCell>
                    <TableCell className="text-xs font-bold text-foreground">
                      {formatCurrency(order.total_amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {getStatusBadge(order.status)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
