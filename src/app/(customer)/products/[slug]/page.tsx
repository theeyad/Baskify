import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createStaticClient } from "@/lib/supabase/static";
import { notFound } from "next/navigation";
import { productsType } from "@/lib/validation/types";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { ProductImageGallery } from "./ProductImageGallery";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: products } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);
  return (products || []).map((prod) => ({ slug: prod.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createStaticClient();
  const { data: product } = await supabase
    .from("products")
    .select(`
      name,
      description,
      product_images ( url, is_primary )
    `)
    .eq("slug", slug)
    .single();

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const primaryImage =
    product.product_images?.find(
      (img: { is_primary: boolean; url: string }) => img.is_primary
    )?.url || product.product_images?.[0]?.url;

  return {
    title: product.name,
    description:
      product.description ||
      `Buy ${product.name} at Baskify. High quality, great deals, and fast shipping.`,
    openGraph: {
      title: product.name,
      description:
        product.description ||
        `Buy ${product.name} at Baskify. High quality, great deals, and fast shipping.`,
      images: primaryImage ? [{ url: primaryImage, alt: product.name }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description:
        product.description ||
        `Buy ${product.name} at Baskify. High quality, great deals, and fast shipping.`,
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const supabase = createStaticClient();

  // Fetch Product with images & category
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      categories ( id, name, slug ),
      product_images ( id, url, position, is_primary )
    `)
    .eq("slug", slug)
    .single();

  if (!product) {
    notFound();
  }

  // Fetch Related Products in same category
  const { data: relatedProducts } = await supabase
    .from("products")
    .select(`
      *,
      categories ( name ),
      product_images ( id, url, position, is_primary )
    `)
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .eq("is_active", true)
    .limit(4);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://baskify.com";
  const productImages = (product.product_images || []).map(
    (img: { url: string }) => img.url
  );
  const primaryImage =
    product.product_images?.find(
      (img: { is_primary: boolean; url: string }) => img.is_primary
    )?.url || productImages[0];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `Buy ${product.name} on Baskify.`,
    image: productImages.length > 0 ? productImages : primaryImage ? [primaryImage] : [],
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: "Baskify",
    },
    category: product.categories?.name,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: "USD",
      price: Number(product.price).toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Baskify",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: Number(product.price) >= 100 ? "0.00" : "15.00",
          currency: "USD",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...(product.categories
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: product.categories.name,
              item: `${siteUrl}/categories/${product.categories.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: product.name,
              item: `${siteUrl}/products/${product.slug}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: product.name,
              item: `${siteUrl}/products/${product.slug}`,
            },
          ]),
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* Product Top Grid (Gallery + Information) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Gallery */}
        <ProductImageGallery
          images={product.product_images || []}
          productName={product.name}
        />

        {/* Right: Details & Purchase Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            {product.categories && (
              <Link
                href={`/categories/${product.categories.slug}`}
                className="text-xs font-semibold uppercase tracking-wider text-primary inline-flex items-center gap-1 cursor-default hover:border-2 hover:border-t-0 hover:p-0.5 hover:border-primary hover:rounded-xs transition-all duration-100"
              >
                {product.categories.name}
              </Link>
            )}
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing & Compare At Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-foreground">
              {formatCurrency(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.compare_at_price)}
              </span>
            )}
            {product.compare_at_price && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Save {formatCurrency(product.compare_at_price - product.price)}
              </span>
            )}
          </div>

          {/* Stock Status Indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            {product.stock_quantity > 0 ? (
              <div className="inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <span>In Stock ({product.stock_quantity} available)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-red-600 bg-red-500/10 px-3 py-1 rounded-full">
                <XCircle className="w-4 h-4" />
                <span>Currently Out of Stock</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-b border-border py-6 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Description
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Action CTA */}
          <div className="space-y-3 pt-2">
            <AddToCartButton
              product={product}
              size="lg"
              className="w-full sm:w-auto px-10 rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-border space-y-8">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground tracking-tight">
              Related Products
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              More items from {product.categories?.name}
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-6">
            {relatedProducts.map((relProduct: productsType) => {
              const relPrimaryImg =
                relProduct.product_images?.find((img) => img.is_primary)?.url ||
                relProduct.product_images?.[0]?.url;

              return (
                <Link
                  key={relProduct.id}
                  href={`/products/${relProduct.slug}`}
                  className="cursor-default"
                >
                  <div className="group relative flex flex-col justify-between bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <div className="relative w-full h-48 bg-muted overflow-hidden">
                        {relPrimaryImg ? (
                          <Image
                            src={relPrimaryImg}
                            alt={relProduct.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="300px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-1.5">
                        <h3 className="font-heading font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                          {relProduct.name}
                        </h3>
                        <p className="text-base font-bold text-foreground">
                          {formatCurrency(relProduct.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
