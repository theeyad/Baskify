"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CoolThemeToggle } from "@/components/lightswind/cool-theme-toggle";
import { ShoppingBag, User, Shield, Search, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import NavSearch from "@/components/shared/NavSearch";

import { useProductsStore } from "@/lib/store/productsStore";

export default function CustomerNavbar() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const totalItems = useProductsStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    const fetchUserAndRole = async (authUser: SupabaseUser | null) => {
      setUser(authUser);
      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authUser.id)
          .maybeSingle();
        setIsAdmin(profile?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    };

    supabase.auth.getUser().then(({ data }) => {
      fetchUserAndRole(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchUserAndRole(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Main Nav */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              if (mobileSearchOpen) setMobileSearchOpen(false);
            }}
            className="md:hidden p-2 -ml-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-default"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2 cursor-default">
            <span className="text-xl font-heading font-bold text-foreground tracking-tight">
              Baskify
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="/products"
              className="hover:text-foreground transition-colors cursor-default"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="hover:text-foreground transition-colors cursor-default"
            >
              Categories
            </Link>
          </nav>
        </div>

        {/* Live Search Bar (Desktop / Tablet) */}
        <div className="hidden sm:flex flex-1 max-w-sm justify-center">
          <NavSearch />
        </div>

        {/* User & Cart Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen((prev) => !prev);
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
            className="sm:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-default"
            aria-label="Toggle search"
          >
            {mobileSearchOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          {/* Admin Link (Only if logged in & Admin) */}
          {isAdmin && (
            <Link
              href="/admin"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-default"
              title="Admin Dashboard"
            >
              <Shield className="w-5 h-5" />
            </Link>
          )}

          {/* Cart Icon for customers only (admins should not buy) */}
          {!isAdmin && (
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-default"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
              {!mounted && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              )}
            </Link>
          )}

          {/* Auth Button / Profile */}
          {user ? (
            <Link
              href={isAdmin ? "/admin/profile" : "/profile"}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-default"
              title="Your Account"
            >
              <User className="w-5 h-5" />
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-default"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-xs font-medium px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-default"
              >
                Register
              </Link>
            </div>
          )}

          {/* Theme Toggle */}
          <CoolThemeToggle />
        </div>
      </div>

      {/* Mobile Search Expandable Drawer */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-4 pb-4 pt-1 border-t border-border/60 bg-background/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
          <NavSearch />
        </div>
      )}

      {/* Mobile Menu Expandable Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 border-t border-border/60 bg-background/95 backdrop-blur-md space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted/50 transition-colors cursor-default"
            >
              All Products
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted/50 transition-colors cursor-default"
            >
              All Categories
            </Link>
          </div>

          {/* Auth options inside Burger menu on mobile */}
          {!user ? (
            <div className="pt-2 border-t border-border/60 flex items-center gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center text-sm font-medium px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-default"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-default"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-border/60">
              <Link
                href={isAdmin ? "/admin/profile" : "/profile"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted/50 transition-colors cursor-default"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{isAdmin ? "Admin Profile" : "Your Account"}</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
