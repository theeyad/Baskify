import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://baskify.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Baskify — Modern E-Commerce Platform",
    template: "%s | Baskify",
  },
  description:
    "Discover a curated selection of premium electronics, fashion, and lifestyle products with lightning-fast delivery and secure checkout.",
  keywords: [
    "e-commerce",
    "online store",
    "Baskify",
    "electronics",
    "fashion",
    "shopping",
    "deals",
  ],
  authors: [{ name: "Eyad Othman" }],
  creator: "Eyad Othman",
  publisher: "Eyad Othman",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Baskify",
    title: "Baskify — Modern E-Commerce Platform",
    description:
      "Discover a curated selection of premium electronics, fashion, and lifestyle products with lightning-fast delivery and secure checkout.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baskify — Modern E-Commerce Platform",
    description:
      "Discover a curated selection of premium electronics, fashion, and lifestyle products with lightning-fast delivery and secure checkout.",
    creator: "@baskify",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "@id": `${siteUrl}/#organization`,
  name: "Baskify",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description:
    "Discover a curated selection of premium electronics, fashion, and lifestyle products with lightning-fast delivery and secure checkout.",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit Card, Stripe",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Baskify",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
