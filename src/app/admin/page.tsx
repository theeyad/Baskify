import { createClient } from "@/lib/supabase/server";
import { AdminOrder, ProfileMap, productsType } from "@/lib/validation/types";
import AdminOverviewMetrics from "./_components/AdminOverviewMetrics";
import AdminRecentOrdersWidget from "./_components/AdminRecentOrdersWidget";
import AdminLowStockWidget from "./_components/AdminLowStockWidget";
import AdminCategoryDistributionWidget, {
  CategoryDistributionItem,
} from "./_components/AdminCategoryDistributionWidget";

export default async function AdminPage() {
  const supabase = await createClient();

  // Perform parallel server queries for maximum performance
  const [
    { data: rawOrders },
    { data: rawProducts },
    { data: rawCategories },
    { data: rawProfiles },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false }),

    supabase
      .from("products")
      .select("*, product_images(*)")
      .order("created_at", { ascending: false }),

    supabase.from("categories").select("*").order("name"),

    supabase.from("profiles").select("id, full_name, role"),
  ]);

  const orders: AdminOrder[] = rawOrders || [];
  const products: productsType[] = rawProducts || [];
  const categories = rawCategories || [];
  const profiles = rawProfiles || [];

  // 1. Calculate Metrics
  const totalRevenue = orders.reduce(
    (acc, o) => (o.status !== "cancelled" ? acc + Number(o.total_amount) : acc),
    0
  );
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = profiles.filter((p) => p.role === "customer").length || profiles.length;

  // 2. Map Customer Profiles
  const profilesMap: ProfileMap = profiles.reduce(
    (acc, p) => ({ ...acc, [p.id]: { full_name: p.full_name } }),
    {}
  );

  // 3. Category Distribution Data
  const categoryDistribution: CategoryDistributionItem[] = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    productCount: products.filter((p) => p.category_id === cat.id).length,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground tracking-tight">
            Admin Overview
          </h2>
          <p className="text-xs text-muted-foreground pt-1">
            Store performance metrics, recent customer activity, and inventory alerts.
          </p>
        </div>
      </div>

      {/* KPI Metrics */}
      <AdminOverviewMetrics
        totalRevenue={totalRevenue}
        totalOrders={totalOrders}
        totalProducts={totalProducts}
        totalCustomers={totalCustomers}
      />

      {/* Main Widgets Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Orders Mini-Table */}
        <div className="lg:col-span-2">
          <AdminRecentOrdersWidget orders={orders} profiles={profilesMap} />
        </div>

        {/* Right Column: Low Stock Alerts & Category Distribution */}
        <div className="space-y-6">
          <AdminLowStockWidget products={products} />
          <AdminCategoryDistributionWidget
            categories={categoryDistribution}
            totalProducts={totalProducts}
          />
        </div>
      </div>
    </div>
  );
}
