"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatDate, formatCurrency } from "@/lib/utils";
import { User, MapPin, CreditCard } from "lucide-react";
import { AdminOrdersDetailsSheetProps } from "@/lib/validation/types";

export default function AdminOrdersDetailsSheet({
  selectedOrder,
  setSelectedOrder,
  profiles,
  getStatusBadge,
}: AdminOrdersDetailsSheetProps) {
  return (
    <Sheet
      open={!!selectedOrder}
      onOpenChange={(open) => !open && setSelectedOrder(null)}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto p-6"
      >
        {selectedOrder && (
          <>
            <SheetHeader className="p-0 border-b border-border pb-4">
              <div className="flex items-center justify-between pr-6">
                <SheetTitle className="text-lg font-bold">
                  Order #{selectedOrder.id.substring(0, 8).toUpperCase()}
                </SheetTitle>
                {getStatusBadge(selectedOrder.status)}
              </div>
              <SheetDescription className="text-xs text-muted-foreground pt-1">
                Placed on {formatDate(new Date(selectedOrder.created_at))}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 pt-4 text-xs">
              {/* Customer & Shipping Details */}
              <div className="bg-sidebar border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  <span>Customer Information</span>
                </div>

                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">
                      Name:{" "}
                    </span>
                    {(selectedOrder.user_id &&
                      profiles[selectedOrder.user_id]?.full_name) ||
                      selectedOrder.shipping_address?.fullName ||
                      "N/A"}
                  </p>
                  {selectedOrder.user_id && (
                    <p className="font-mono text-[10px]">
                      User ID: {selectedOrder.user_id}
                    </p>
                  )}
                </div>

                {selectedOrder.shipping_address && (
                  <div className="pt-2 border-t border-border space-y-1 text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground pb-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>Shipping Address</span>
                    </div>
                    <p>{selectedOrder.shipping_address.fullName}</p>
                    <p>{selectedOrder.shipping_address.addressLine1}</p>
                    <p>
                      {[
                        selectedOrder.shipping_address.city,
                        selectedOrder.shipping_address.postalCode,
                        selectedOrder.shipping_address.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Stripe Payment Info */}
              {selectedOrder.stripe_payment_intent_id && (
                <div className="bg-sidebar border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-foreground">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>Payment Reference</span>
                  </div>
                  <p className="font-mono text-[11px] text-muted-foreground break-all">
                    {selectedOrder.stripe_payment_intent_id}
                  </p>
                </div>
              )}

              {/* Line Items Breakdown */}
              <div className="space-y-3">
                <span className="font-bold text-foreground block">
                  Order Items ({selectedOrder.order_items?.length || 0})
                </span>

                <div className="border border-border rounded-xl divide-y divide-border overflow-hidden">
                  {selectedOrder.order_items?.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 flex items-center justify-between gap-3 bg-sidebar"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-foreground line-clamp-1">
                          {item.product_name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {item.quantity} ×{" "}
                          {formatCurrency(item.product_price)}
                        </p>
                      </div>
                      <span className="font-bold text-foreground shrink-0">
                        {formatCurrency(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-sidebar border border-border rounded-xl p-4 flex items-center justify-between font-bold text-sm">
                <span>Total Amount Paid</span>
                <span className="text-base font-extrabold text-foreground">
                  {formatCurrency(selectedOrder.total_amount)}
                </span>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
