import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FourPillars } from "@/components/home/FourPillars";
import { HorizontalShowcase, ShowcaseProduct } from "@/components/home/HorizontalShowcase";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { HomeGoldEstimator } from "@/components/home/HomeGoldEstimator";
import { LagnaRatnaExplorer } from "@/components/astrology/LagnaRatnaExplorer";
import { BehindTheShop } from "@/components/home/BehindTheShop";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { VisitShowcase } from "@/components/home/VisitShowcase";
import { fetchLiveBullionRates } from "@/lib/services/gold-rates";
import { repo } from "@/lib/db/repo";
import { Sparkles, ArrowRight } from "lucide-react";

export const revalidate = 900; // 15 minutes ISR

export default async function Page() {
  // Fetch live market bullion rates with fallback
  let rates = { gold24k: 8150, gold22k: 7470, silver: 98 };
  try {
    const live = await fetchLiveBullionRates();
    if (live?.success && live?.rates) {
      rates = {
        gold24k: live.rates.gold24kPerGram,
        gold22k: live.rates.gold22kPerGram,
        silver: live.rates.silverPerGram,
      };
    }
  } catch (err) {
    console.error("Failed to fetch live rates on homepage:", err);
  }

  // Fetch business settings for contact details
  const settings: Record<string, string> = await repo.getSettings().catch(() => ({}));
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || settings.whatsapp_phone || "919876543210";
  const shopAddress = settings.shop_address || settings.showroom_address || "Sarafa Bazaar, Varanasi, Uttar Pradesh 221001";

  // Featured curated showcase products with authentic 3D viewer metadata
  const featuredProducts: ShowcaseProduct[] = [
    {
      id: "nakshi-choker",
      title: "Handcrafted 22K Nakshi Temple Choker",
      category: "Heritage Gold Jewellery",
      purity: "22K BIS Hallmarked (916)",
      huid: "6-Digit HUID Laser Verified",
      weight: "48.50g Net Gold",
      priceDesc: "Calculated live by daily gram rate + karigari",
      image: "/images/products/necklace-nakshi.jpg",
      href: "/jewellery/heritage-nakshi-choker",
      tag: "Bridal Signature",
      product3DType: "nakshi-choker",
      badge: "Bridal Signature",
    },
    {
      id: "fluted-kada",
      title: "Solid 22K Fluted Traditional Kada",
      category: "Handcrafted Bangles & Kada",
      purity: "22K Yellow Gold (916)",
      huid: "Govt. Hallmarked Certificate",
      weight: "32.40g Net Gold",
      priceDesc: "Weighed on digital scale before you",
      image: "/images/products/kada-fluted.jpg",
      href: "/jewellery/fluted-gold-kada",
      tag: "Heirloom Classic",
      product3DType: "kada",
      badge: "Heirloom Classic",
    },
    {
      id: "emerald-pendant",
      title: "Natural Untreated Zambian Emerald Pendant",
      category: "Vedic Astrological Ratna",
      purity: "Open-Back 18K Gold Chhidra Setting",
      huid: "Lab Certified Natural Panna",
      weight: "5.25 Carats / 6.20g Gold",
      priceDesc: "Traditional gemstone setting for Mercury (Budha)",
      image: "/images/products/emerald-pendant.jpg",
      href: "/jewellery/emerald-chhidra-pendant",
      tag: "Jyotish Certified",
      product3DType: "emerald-pendant",
      badge: "Jyotish Certified",
    },
    {
      id: "sapphire-ring",
      title: "Untreated Ceylon Royal Blue Sapphire Ring",
      category: "Rare Astrological Ratna",
      purity: "Custom Panchdhatu / 18K Gold",
      huid: "Govt. Recognized Lab Certificate",
      weight: "4.80 Carats / 8.10g Gold",
      priceDesc: "Selected strictly for Saturn (Shani) alignment",
      image: "/images/products/sapphire-ring.jpg",
      href: "/jewellery/ceylon-sapphire-ring",
      tag: "Rare Natural Gem",
      product3DType: "sapphire-ring",
      badge: "Rare Natural Gem",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      {/* Global Experience Header */}
      <Header rates={rates} />

      <main className="flex-1">
        {/* Section 1: Hero (100vh Real-time 3D Scene with Refractive Emerald & Gold Dust) */}
        <Hero rates={rates} />

        {/* Section 2: Trust Strip (Counters, 3D Gold Coins & Infinite Marquee) */}
        <TrustStrip />

        {/* Section 3: Four Sacred Pillars (Expanding Accordion with Waking 3D Objects) */}
        <FourPillars />

        {/* Section 4: Signature Vault Catalogue (Pinned Horizontal Scroll with 3D 360 Viewer) */}
        <HorizontalShowcase
          products={featuredProducts}
          whatsappPhone={whatsappPhone}
        />

        {/* Section 5: The Karigar's Path: Sketch to Solid Gold (5-Step 3D Transformation) */}
        <ProcessTimeline />

        {/* Section 6: Interactive 3D Gold & Karigari Estimator */}
        <section className="py-24 bg-[#0a2a1d]/60 border-t border-[#d4af37]/25 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transparent Metrology</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
                Live Gold Budget &amp; Karigari Estimator
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-[#a8b6af]">
                We calculate bullion valuation live to the exact rupee—itemizing pure gold, karigari craftsmanship, and statutory GST with zero hidden markups.
              </p>
            </div>
            <HomeGoldEstimator initialRates={rates} />
          </div>
        </section>

        {/* Section 7: Classical Lal Kitab 1952 Gutka Showcase Banner */}
        <section className="py-14 bg-gradient-to-r from-[#04170f] via-[#59101c] to-[#04170f] text-[#faf7f0] border-y-2 border-[#d4af37]/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-[#8e1b2e]/25 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8e1b2e]/40 border border-[#d4af37]/50 text-[#f6e7b4] text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#f1d98a]" />
                <span>Classical Lal Kitab 1952 Gutka System</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Discover Your Fixed Kal Purush Kundali &amp; Ethical Upay
              </h3>
              <p className="text-xs sm:text-sm text-[#a8b6af] font-light">
                Calculate your planetary age-cycles, sleeping houses, karmic debt (Rin) analysis, and gentle 43-day non-fear remedies.
              </p>
            </div>
            <Link href="/jyotish/lal-kitab">
              <button
                type="button"
                className="bg-gold-gradient text-[#04170f] font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap gold-shimmer-sweep flex items-center gap-2 font-mono"
              >
                <span>Calculate Lal Kitab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </section>

        {/* Section 8: Interactive Vedic Lagna & 3D Armillary Zodiac Sphere */}
        <section className="py-24 bg-[#04170f] border-t border-[#d4af37]/25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LagnaRatnaExplorer />
          </div>
        </section>

        {/* Section 9: Behind the Shop: Three Generations of Sacred Goldsmithing */}
        <BehindTheShop />

        {/* Section 10: Verified Patron Testimonials */}
        <TestimonialsCarousel />

        {/* Section 11: Visit Sanctuary & Final "Weigh Gold Before You" Invitation */}
        <VisitShowcase whatsappPhone={whatsappPhone} shopAddress={shopAddress} />
      </main>

      {/* Global Architectural Luxury Footer */}
      <Footer />
    </div>
  );
}
