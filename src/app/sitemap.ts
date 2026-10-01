import type { MetadataRoute } from "next";
import { createStaticClient } from "@/lib/supabase/static";

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://baskify.com";
  const supabase = createStaticClient();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Fetch active products
  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at, created_at")
    .eq("is_active", true);

  const productRoutes: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: product.updated_at
      ? new Date(product.updated_at)
      : new Date(product.created_at || Date.now()),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("slug, created_at");

  const categoryRoutes: MetadataRoute.Sitemap = (categories || []).map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    lastModified: category.created_at ? new Date(category.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
