import { ShoppingBag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { orderType } from "@/lib/validation/types";

export default function ProfileOrdersHistory({
  orders,
}: {
  orders: orderType[];
}) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            <h3 className="font-heading font-bold text-sm text-foreground">
              Order History {orders.length > 0 && `(${orders.length})`}
            </h3>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-sidebar border border-dashed border-border p-8 rounded-2xl text-center space-y-2">
            <Package className="w-8 h-8 mx-auto text-muted-foreground/60" />
            <h4 className="font-heading font-bold text-sm text-foreground">
              No Orders Placed Yet
            </h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              You haven&apos;t placed any orders yet. Once you complete
              checkout, your order history and tracking details will appear
              here.
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
            <Link href="/orders">
              <Button className="w-full cursor-default">View All Orders</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
