import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://baskify.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/checkout",
          "/checkout/*",
          "/orders",
          "/orders/*",
          "/profile",
          "/profile/*",
          "/cart",
          "/forgot-password",
          "/reset-password",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
