import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
import { repo } from "@/lib/db/repo";
import { seedDemoDataIfEmpty } from "@/lib/db/seed";
import { Search, Sparkles, ShieldCheck, Scale, Award } from "lucide-react";

export const metadata = {
  title: "Gold Jewellery Collection — Hallmarked 22K & 18K Pieces",
  description:
    "Explore our authentic 22K & 18K BIS hallmarked gold jewellery in our shop. Check weights on digital scales and inspect 6-digit HUID hallmarks.",
};

export default async function JewelleryCataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; priceMode?: string }>;
}) {
  await seedDemoDataIfEmpty();

  const params = await searchParams;
  const currentCategory = params.category || "";
  const currentSearch = params.search || "";
  const currentPriceMode = params.priceMode || "";

  const [categories, { products, total }] = await Promise.all([
    repo.getCategories(),
    repo.getPublishedProducts({
      categorySlug: currentCategory || undefined,
      search: currentSearch || undefined,
      priceMode: currentPriceMode || undefined,
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        {/* Editorial Header Banner */}
        <div className="relative rounded-xs overflow-hidden bg-[#061410] text-white border border-[#B08D57]/40 shadow-xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/salon-jewellery.jpg"
              alt="Gold Jewellery Collection"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061410] via-[#061410]/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F3D2E]/90 border border-[#D4AF37]/60 text-[#F3E5AB] text-xs uppercase tracking-[0.22em] font-medium shadow-md">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-[#D4AF37]/80 shrink-0">
                <Image
                  src="/images/brand/app-icon-emerald-256.png"
                  alt="VR"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>Ready in Our Shop &bull; 100% BIS Hallmarked</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight">
              Gold Jewellery &amp; <span className="text-gold-gradient italic">Bridal Collection</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#DDE5DC] leading-relaxed max-w-xl font-light">
              Fine 22K (916) and 18K (750) antique temple jewellery, nakshi chokers, and solid kadas. Every gold piece is 100% BIS hallmarked with verifiable 6-digit laser HUID and weighed on certified digital scales.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#F3E5AB]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                100% BIS HUID Hallmarked
              </span>
              <span className="text-white/40">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#B08D57]" />
                Net Gold Weight Billing
              </span>
              <span className="text-white/40">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#F3E5AB]" />
                Visit Our Shop to Try &amp; Weigh
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Navigation Bar */}
        <div className="bg-white border border-[#E2D7C5] rounded-xs p-5 shadow-2xs space-y-4">
          {/* Categories Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <Link
              href="/jewellery"
              className={`text-xs px-4 py-2 rounded-xs uppercase tracking-[0.16em] font-medium whitespace-nowrap transition-all cursor-pointer ${
                !currentCategory
                  ? "bg-[#173B32] text-white shadow-xs border border-[#173B32]"
                  : "bg-[#FAF8F5] text-[#182522] border border-[#E5DFD5] hover:border-[#B08D57] hover:bg-[#F0ECE2]"
              }`}
            >
              All Pieces ({total})
            </Link>
            {categories.map((cat) => {
              const isSelected = currentCategory === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/jewellery?category=${cat.slug}${
                    currentSearch ? `&search=${encodeURIComponent(currentSearch)}` : ""
                  }`}
                  className={`text-xs px-4 py-2 rounded-xs uppercase tracking-[0.16em] font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#173B32] text-white shadow-xs border border-[#173B32]"
                      : "bg-[#FAF8F5] text-[#182522] border border-[#E5DFD5] hover:border-[#B08D57] hover:bg-[#F0ECE2]"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Search and Secondary Filter */}
          <form
            method="GET"
            action="/jewellery"
            className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#F0ECE2]"
          >
            {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8F9691] absolute left-3.5 top-3" />
              <input
                type="text"
                name="search"
                defaultValue={currentSearch}
                placeholder="Search by design name, SKU (e.g. VR-G-NK-001), or stone..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#D4CCC0] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#173B32] text-[#182522]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                name="priceMode"
                defaultValue={currentPriceMode}
                className="text-xs px-3 py-2.5 bg-[#FAF8F5] border border-[#D4CCC0] rounded-xs text-[#182522] focus:outline-none focus:ring-1 focus:ring-[#173B32] cursor-pointer"
              >
                <option value="">All Pricing Modes</option>
                <option value="fixed_price">Fixed Shop Price</option>
                <option value="quote_first">Quote on Request</option>
                <option value="indicative_estimate">Indicative Bullion Estimate</option>
              </select>

              <button
                type="submit"
                className="btn-gold-pure text-xs px-5 py-2.5 rounded-xs font-semibold uppercase tracking-wider cursor-pointer shadow-xs"
              >
                Filter
              </button>

              {(currentSearch || currentCategory || currentPriceMode) && (
                <Link
                  href="/jewellery"
                  className="text-xs text-[#626A65] hover:text-[#182522] px-2 py-2 underline"
                >
                  Reset
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Product Grid / Empty State */}
        {products.length === 0 ? (
          <Card className="bg-white p-12 text-center border border-[#E2D7C5]">
            <EmptyState
              title="No Pieces Match Your Search"
              description="No physical stock records match your current criteria. We publish only verified studio inventory with official hallmarks."
              actionText="Commission a Custom Bespoke Design"
              actionHref="/custom-design"
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Custom Design Banner */}
        <div className="mt-16 bg-[#173B32] text-white border border-[#B08D57]/40 rounded-xs p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#B08D57]/20 to-transparent pointer-events-none -z-0" />

          <div className="max-w-xl text-center md:text-left relative z-10 space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F3E5AB]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Looking for a custom design?</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium">
              Get Custom Jewellery Made by Our Karigars
            </h3>
            <p className="text-xs text-[#DDE5DC] leading-relaxed">
              If your desired piece is not in our ready inventory, our traditional goldsmiths can handcraft it to your exact photo, gold weight, and budget.
            </p>
          </div>

          <Link href="/custom-design" className="shrink-0 relative z-10">
            <button
              type="button"
              className="btn-gold-pure px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md"
            >
              Order Custom Jewellery &rarr;
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
