import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag } from "lucide-react";
import CustomerNavbar from "@/components/shared/CustomerNavbar";
import CustomerFooter from "@/components/shared/CustomerFooter";

export default function NotFound() {
  return (
    <>
      <CustomerNavbar />
      <div className="mt-20 bg-background text-foreground">
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="max-w-md w-full bg-card border border-border p-8 sm:p-10 rounded-3xl space-y-6 shadow-sm text-center">
            {/* Visual 404 Badge */}
            <div className="relative inline-flex items-center justify-center">
              <span className="text-7xl sm:text-8xl font-heading font-black text-primary/15 select-none tracking-tighter">
                404
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">
                Page Not Found
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We couldn&apos;t find the page or product you were looking for.
                It may have been moved, renamed, or is temporarily unavailable.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/" className="w-full sm:w-auto cursor-default">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 rounded-2xl cursor-default"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>

              <Link
                href="/products"
                className="w-full sm:w-auto cursor-default"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 rounded-2xl cursor-default"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Products</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </>
  );
}
