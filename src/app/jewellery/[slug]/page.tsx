import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailView } from "@/components/jewellery/ProductDetailView";
import { repo } from "@/lib/db/repo";
import { seedDemoDataIfEmpty } from "@/lib/db/seed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await repo.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} (${product.sku}) — Vaidik Ratnam`,
    description: product.short_description || "Fine handcrafted jewellery from Vaidik Ratnam studio.",
    openGraph: {
      title: `${product.name} | Vaidik Ratnam`,
      description: product.short_description || undefined,
      images: product.primary_media_url ? [{ url: product.primary_media_url }] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await seedDemoDataIfEmpty();
  const { slug } = await params;
  const product = await repo.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Google Structured Data for Product SEO (Rich Snippets)
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.primary_media_url
      ? [product.primary_media_url.startsWith("http") ? product.primary_media_url : `https://vaidikratnam.com${product.primary_media_url}`]
      : ["https://vaidikratnam.com/images/hero-jewellery.jpg"],
    description: product.short_description || product.long_description || "Handcrafted 22K/18K fine jewellery by Vaidik Ratnam.",
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Vaidik Ratnam — The Jewellery & Ratna Studio",
    },
    material: product.metal_purity || "22K Gold (916)",
    weight: product.gross_weight_grams ? `${product.gross_weight_grams} g` : undefined,
    offers: {
      "@type": "Offer",
      url: `https://vaidikratnam.com/jewellery/${product.slug}`,
      priceCurrency: "INR",
      price: product.fixed_price_amount ? String(product.fixed_price_amount) : "0",
      priceValidUntil: "2027-12-31",
      availability: product.status === "published" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "JewelryStore",
        name: "Vaidik Ratnam",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Product JSON-LD Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ProductDetailView product={product} />
      </main>

      <Footer />
    </div>
  );
}
