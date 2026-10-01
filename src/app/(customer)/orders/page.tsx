import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { orderType } from "@/lib/validation/types";
import { ShoppingBag, Package } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Orders",
  description: "View and track your previous purchases on Baskify.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders }: { data: orderType[] | null } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!orders || orders.length === 0 ? (
        <div className="bg-sidebar border border-dashed border-border p-8 rounded-2xl text-center space-y-2">
          <Package className="w-8 h-8 mx-auto text-muted-foreground/60" />
          <h4 className="font-heading font-bold text-sm text-foreground">
            No Orders Placed Yet
          </h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            You haven&apos;t placed any orders yet. Once you complete checkout,
            your order history and tracking details will appear here.
          </p>
          <div className="pt-2">
            <Link href="/products" className="cursor-default">
              <Button
                size="sm"
                variant="outline"
                className="gap-2 rounded-full cursor-default"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Products</span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const shortId = order.id.substring(0, 8).toUpperCase();
            return (
              <div
                key={order.id}
                className="bg-sidebar border border-border rounded-2xl p-5 space-y-4 shadow-sm"
              >
                {/* Header info bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 text-xs">
                  <div>
                    <span className="font-bold text-foreground block">
                      Order #{shortId}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Placed on {formatDate(new Date(order.created_at))}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        order.status === "paid"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : order.status === "shipped"
                            ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                            : order.status === "delivered"
                              ? "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20"
                              : order.status === "cancelled"
                                ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                                : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="font-heading font-extrabold text-foreground text-sm">
                      {formatCurrency(order.total_amount)}
                    </span>
                  </div>
                </div>

                {/* Delivery Location Summary */}
                {order.shipping_address && (
                  <div className="text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Shipped to:{" "}
                    </span>
                    {[
                      order.shipping_address.fullName,
                      order.shipping_address.addressLine1,
                      order.shipping_address.city,
                      order.shipping_address.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                )}

                {/* Line Items List */}
                {order.order_items && order.order_items.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                      Purchased Items ({order.order_items.length})
                    </span>
                    <div className="bg-background/60 border border-border/50 rounded-xl p-3 divide-y divide-border/40 text-xs">
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="py-1.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="font-medium text-foreground block line-clamp-1">
                              {item.product_name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              Qty: {item.quantity} ×{" "}
                              {formatCurrency(item.product_price)}
                            </span>
                          </div>
                          <span className="font-bold text-foreground shrink-0">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
