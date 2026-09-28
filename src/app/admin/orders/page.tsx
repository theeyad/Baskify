import { createClient } from "@/lib/supabase/server";
import AdminOrdersComponent from "@/app/admin/orders/AdminOrdersComponent";
import { AdminOrder, ProfileMap } from "@/lib/validation/types";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  // Fetch all orders with order_items
  const { data: rawOrders } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*)
    `
    )
    .order("created_at", { ascending: false });

  const orders: AdminOrder[] = rawOrders || [];

  // Fetch profiles for customer names
  const userIds = Array.from(
    new Set(orders.map((o) => o.user_id).filter(Boolean) as string[])
  );

  const { data: profilesData } =
    userIds.length > 0
      ? await supabase.from("profiles").select("id, full_name").in("id", userIds)
      : { data: [] };

  const profilesMap: ProfileMap = (profilesData || []).reduce(
    (acc, p) => ({ ...acc, [p.id]: { full_name: p.full_name } }),
    {}
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground tracking-tight">
            Orders Management
          </h2>
          <p className="text-xs text-muted-foreground pt-1">
            View, filter, track, and update customer order fulfillment statuses.
          </p>
        </div>
      </div>

      <AdminOrdersComponent orders={orders} profiles={profilesMap} />
    </div>
  );
}
