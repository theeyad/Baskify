import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="bg-card border border-border p-8 sm:p-12 rounded-3xl space-y-6 shadow-sm">
        {/* Visual 404 Badge */}
        <div className="relative inline-flex items-center justify-center">
          <span className="text-7xl sm:text-8xl font-heading font-black text-primary/15 select-none tracking-tighter">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">
            Admin Resource Not Found
          </h1>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            The requested admin page, product, or category record does not exist
            or was deleted from the database.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/admin" className="w-full sm:w-auto cursor-default">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 rounded-2xl cursor-default"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>

          <Link
            href="/admin/products"
            className="w-full sm:w-auto cursor-default"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 rounded-2xl cursor-default"
            >
              <Package className="w-4 h-4" />
              <span>Manage Products</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
