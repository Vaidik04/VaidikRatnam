import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { HomeGoldEstimator } from "@/components/home/HomeGoldEstimator";
import { LagnaRatnaExplorer } from "@/components/astrology/LagnaRatnaExplorer";
import { fetchLiveBullionRates } from "@/lib/services/gold-rates";
import { repo } from "@/lib/db/repo";
import {
  ShieldCheck,
  Sparkles,
  Scale,
  ArrowRight,
  MessageCircle,
  Clock,
  MapPin,
  HeartHandshake,
  Compass,
} from "lucide-react";

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
  const shopAddress = settings.shop_address || settings.showroom_address || "Vaidik Ratnam Jewellery, Traditional Sarafa Bazaar, Jaipur, Rajasthan 302003";

  // Featured curated collections
  const featuredItems = [
    {
      title: "Handcrafted 22K Nakshi Temple Choker",
      category: "Heritage Gold Jewellery",
      purity: "22K BIS Hallmarked (916)",
      huid: "6-Digit HUID Laser Verified",
      priceDesc: "Calculated live by daily gram rate + karigari",
      image: "/images/products/necklace-nakshi.jpg",
      href: "/jewellery/heritage-nakshi-choker",
      tag: "Bridal Signature",
    },
    {
      title: "Solid 22K Fluted Traditional Kada",
      category: "Handcrafted Bangles & Kada",
      purity: "22K Yellow Gold (916)",
      huid: "Govt. Hallmarked with Hallmark Certificate",
      priceDesc: "Weighed on digital scale before you",
      image: "/images/products/kada-fluted.jpg",
      href: "/jewellery/fluted-gold-kada",
      tag: "Heirloom Classic",
    },
    {
      title: "Natural Untreated Zambian Emerald Pendant",
      category: "Vedic Astrological Ratna",
      purity: "Open-Back 18K Gold Chhidra Setting",
      huid: "Lab Certified Natural Panna",
      priceDesc: "Traditional gemstone setting for Mercury (Budha)",
      image: "/images/products/emerald-pendant.jpg",
      href: "/jewellery/emerald-chhidra-pendant",
      tag: "Jyotish Certified",
    },
    {
      title: "Untreated Ceylon Royal Blue Sapphire Ring",
      category: "Rare Astrological Ratna",
      purity: "Custom Panchdhatu / 18K Gold",
      huid: "Govt. Recognized Gemological Certificate",
      priceDesc: "Selected strictly for Saturn (Shani) alignment",
      image: "/images/products/sapphire-ring.jpg",
      href: "/jewellery/ceylon-sapphire-ring",
      tag: "Rare Natural Gem",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F5EB] text-[#4B3F36] selection:bg-[#D4AF37]/25 selection:text-[#0F3D2E]">
      <Header rates={rates} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero rates={rates} />

        {/* 2. Brand Values & Heritage Bar */}
        <section className="bg-[#FAF8F5] border-b border-[#E8DFC8] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              
              {/* Glyph 1: Lotus */}
              <div className="flex flex-col items-center p-3 rounded-xs border border-[#E8DFC8]/60 bg-white hover:border-[#D4AF37] transition-all group">
                <div className="w-12 h-12 relative flex items-center justify-center mb-2">
                  <Image
                    src="/images/brand/element-lotus-transparent.png"
                    alt="Lotus — Spirituality"
                    width={48}
                    height={48}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#0F3D2E] tracking-wide">
                  Kamala &bull; Lotus
                </h4>
                <p className="text-[11px] text-[#4B3F36] font-light mt-0.5">
                  Spiritual purity &bull; In-house master karigari
                </p>
              </div>

              {/* Glyph 2: Sun / Nakshatra */}
              <div className="flex flex-col items-center p-3 rounded-xs border border-[#E8DFC8]/60 bg-white hover:border-[#D4AF37] transition-all group">
                <div className="w-12 h-12 relative flex items-center justify-center mb-2">
                  <Image
                    src="/images/brand/element-sun-transparent.png"
                    alt="Sun & Nakshatra — Wisdom"
                    width={48}
                    height={48}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#0F3D2E] tracking-wide">
                  Surya &bull; Nakshatra
                </h4>
                <p className="text-[11px] text-[#4B3F36] font-light mt-0.5">
                  Vedic illumination &bull; Parashari Jyotish
                </p>
              </div>

              {/* Glyph 3: Gemstone */}
              <div className="flex flex-col items-center p-3 rounded-xs border border-[#E8DFC8]/60 bg-white hover:border-[#D4AF37] transition-all group">
                <div className="w-12 h-12 relative flex items-center justify-center mb-2">
                  <Image
                    src="/images/brand/element-gemstone-transparent.png"
                    alt="Ratna — Gemstone"
                    width={48}
                    height={48}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#0F3D2E] tracking-wide">
                  Ratna &bull; Gemstone
                </h4>
                <p className="text-[11px] text-[#4B3F36] font-light mt-0.5">
                  Certified untreated stones &bull; Planetary power
                </p>
              </div>

              {/* Glyph 4: Astrology Circle */}
              <div className="flex flex-col items-center p-3 rounded-xs border border-[#E8DFC8]/60 bg-white hover:border-[#D4AF37] transition-all group">
                <div className="w-12 h-12 relative flex items-center justify-center mb-2">
                  <Image
                    src="/images/brand/element-astrology-circle-transparent.png"
                    alt="Astrology Circle — Cosmic Harmony"
                    width={48}
                    height={48}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#0F3D2E] tracking-wide">
                  Jyotish Chakra
                </h4>
                <p className="text-[11px] text-[#4B3F36] font-light mt-0.5">
                  Janma Kundali &bull; Exact planetary alignment
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Curated Masterpiece Showcase */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E8DFC8] pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B59328] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handmade Jewellery &amp; Certified Gemstones</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0F3D2E] font-normal">
                Featured Gold Jewellery &amp; Natural Gemstones
              </h2>
              <p className="text-xs sm:text-sm text-[#4B3F36] mt-1 font-light">
                Every piece is handcrafted by our in-house goldsmiths, weighed before you, and certified by BIS & recognized gem labs.
              </p>
            </div>
            <Link
              href="/jewellery"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F3D2E] hover:text-[#B59328] transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.title}
                className="group bg-white border border-[#E8DFC8] rounded-xs flex flex-col overflow-hidden luxury-card-hover relative shadow-xs"
              >
                {/* Image */}
                <div className="relative aspect-square bg-[#FAF8F5] block overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#0F3D2E]/95 text-[#F3E5AB] px-2.5 py-1 rounded-xs border border-[#D4AF37]/40 shadow-xs">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 z-10 opacity-90">
                    <span className="text-[9px] font-sans uppercase tracking-widest bg-white/95 text-[#0F3D2E] px-2 py-0.5 rounded-xs font-semibold flex items-center gap-1 shadow-xs border border-[#E8DFC8]">
                      <ShieldCheck className="w-3 h-3 text-[#1B6442]" />
                      BIS HUID
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
                  <div>
                    <span className="text-[10px] font-mono text-[#B59328] uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base font-normal text-[#0F3D2E] leading-snug group-hover:text-[#B59328] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#4B3F36] mt-1 font-light">
                      {item.purity} &bull; {item.huid}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8DFC8] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#A8B6AF] block">
                        Pricing Formula
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#0F3D2E]">
                        Weight &times; Daily Rate + Craft
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                        `Namaste Vaidik Ratnam, I am interested in viewing "${item.title}" at your shop. Please share availability and today's final estimate.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xs bg-[#0F3D2E]/10 hover:bg-[#0F3D2E] text-[#0F3D2E] hover:text-[#F3E5AB] transition-colors"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Live Transparent Gold Budget & Karigari Estimator */}
        <section className="py-12 bg-[#F5EFE0] border-y border-[#E8DFC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HomeGoldEstimator initialRates={rates} />
          </div>
        </section>

        {/* 5. The Family Shop Story & Sanctuary */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/5 rounded-xs overflow-hidden border-2 border-[#D4AF37]/60 shadow-xl bg-black/30">
                <Image
                  src="/images/father-sanctuary.jpg"
                  alt="Vaidik Ratnam Multi-Generational Family Shop Sanctuary"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08241B]/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xs bg-[#08241B]/90 border border-[#D4AF37]/50 backdrop-blur-md text-[#F9F5EB]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#F3E5AB] block mb-0.5">
                    Our Family Commitment
                  </span>
                  <p className="font-serif italic text-sm text-white">
                    &ldquo;Gold purity is a matter of trust. We weigh every piece before your eyes on certified digital scales.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F3D2E]/10 border border-[#D4AF37]/40 text-[#0F3D2E] text-xs font-semibold uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5 text-[#B59328]" />
                <span>Our Multi-Generational Family Heritage</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#0F3D2E] font-normal leading-tight">
                An Authentic Traditional Shop,{" "}
                <span className="italic text-gold-gradient block">
                  Not a Faceless Retail Chain
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#4B3F36] leading-relaxed font-light">
                When you step into <strong>Vaidik Ratnam</strong>, you sit with our family. We pour you warm chai, take out raw velvet trays, and show you gemstones under natural daylight and 10x magnification loupes.
              </p>

              {/* The 3 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xs bg-white border border-[#E8DFC8]">
                  <Scale className="w-5 h-5 text-[#0F3D2E] mb-2" />
                  <h4 className="font-serif text-sm font-semibold text-[#0F3D2E]">
                    Digital Scale Honesty
                  </h4>
                  <p className="text-[11px] text-[#4B3F36] mt-1 font-light leading-snug">
                    Zero hidden deduction. Net gold weight and stone weight are billed separately.
                  </p>
                </div>

                <div className="p-4 rounded-xs bg-white border border-[#E8DFC8]">
                  <ShieldCheck className="w-5 h-5 text-[#0F3D2E] mb-2" />
                  <h4 className="font-serif text-sm font-semibold text-[#0F3D2E]">
                    6-Digit HUID Laser
                  </h4>
                  <p className="text-[11px] text-[#4B3F36] mt-1 font-light leading-snug">
                    Every piece is laser-engraved with government BIS HUID verifiable on the BIS Care App.
                  </p>
                </div>

                <div className="p-4 rounded-xs bg-white border border-[#E8DFC8]">
                  <Compass className="w-5 h-5 text-[#0F3D2E] mb-2" />
                  <h4 className="font-serif text-sm font-semibold text-[#0F3D2E]">
                    Honest Parashari Advice
                  </h4>
                  <p className="text-[11px] text-[#4B3F36] mt-1 font-light leading-snug">
                    If your Janma Kundali does not need a stone, our Jyotishi will clearly tell you not to buy one.
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-wrap gap-4">
                <Link href="/about">
                  <button
                    type="button"
                    className="px-6 py-3 rounded-xs bg-[#0F3D2E] text-[#F3E5AB] text-xs uppercase tracking-widest font-semibold hover:bg-[#08241B] transition-colors cursor-pointer"
                  >
                    Read Our Shop Story
                  </button>
                </Link>
                <Link href="/contact">
                  <button
                    type="button"
                    className="px-6 py-3 rounded-xs border border-[#0F3D2E] text-[#0F3D2E] text-xs uppercase tracking-widest font-semibold hover:bg-[#0F3D2E]/10 transition-colors cursor-pointer"
                  >
                    Plan Your Visit
                  </button>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* 6. Interactive Vedic Lagna & Ratna Explorer */}
        <section className="py-16 bg-[#F9F5EB] border-t border-[#E8DFC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LagnaRatnaExplorer />
          </div>
        </section>

        {/* 7. Bespoke Custom Karigari Process */}
        <section className="py-16 sm:py-24 bg-[#08241B] text-[#F9F5EB] border-t border-[#D4AF37]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F3D2E] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Jaipur Karigari Studio</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                Bring Your Dream Design to Life in{" "}
                <span className="text-gold-gradient font-serif italic">
                  Pure 22K Gold
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#DDE5DC] font-light leading-relaxed">
                Have a family heirloom you want remade, or a design saved on your phone? Our Jaipur master karigars craft custom pieces with 100% purity certification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="p-6 rounded-xs bg-[#0F3D2E]/70 border border-[#D4AF37]/30 backdrop-blur-xs space-y-3">
                <span className="text-3xl font-serif text-[#D4AF37] font-bold block">
                  01
                </span>
                <h3 className="font-serif text-lg text-white font-medium">
                  Share Your Inspiration or Old Gold
                </h3>
                <p className="text-xs text-[#DDE5DC] font-light leading-relaxed">
                  Upload photos, sketches, or bring old gold ornaments to our shop. We test purity right in front of you.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-xs bg-[#0F3D2E]/70 border border-[#D4AF37]/30 backdrop-blur-xs space-y-3">
                <span className="text-3xl font-serif text-[#D4AF37] font-bold block">
                  02
                </span>
                <h3 className="font-serif text-lg text-white font-medium">
                  3D CAD & Exact Weight Estimate
                </h3>
                <p className="text-xs text-[#DDE5DC] font-light leading-relaxed">
                  We generate precision 3D CAD blueprints and provide transparent weight and making charges before starting.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-xs bg-[#0F3D2E]/70 border border-[#D4AF37]/30 backdrop-blur-xs space-y-3">
                <span className="text-3xl font-serif text-[#D4AF37] font-bold block">
                  03
                </span>
                <h3 className="font-serif text-lg text-white font-medium">
                  Handcrafted & BIS Hallmarked
                </h3>
                <p className="text-xs text-[#DDE5DC] font-light leading-relaxed">
                  Handcrafted by master karigars, laser-tested with 6-digit HUID, and delivered in our signature velvet box.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/custom-design">
                <button
                  type="button"
                  className="btn-gold-pure px-8 py-3.5 rounded-xs text-xs uppercase tracking-[0.2em] font-bold shadow-lg cursor-pointer"
                >
                  Start Custom Order Online
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Visit Our Shop & Welcoming Invitation */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-[#D4AF37]/50 rounded-xs p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B59328] font-semibold">
                  Personal Shop Consultation
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#0F3D2E] font-normal">
                  You Are Always Welcome at Our Family Shop
                </h2>
                <p className="text-xs sm:text-sm text-[#4B3F36] leading-relaxed font-light">
                  Jewellery and genuine gemstones are lifetime family investments. Come sit with us, view gemstones under natural sunlight, and discuss your custom designs over warm tea.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#4B3F36]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#0F3D2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#0F3D2E]">Our Shop Location:</strong>
                      <span>{shopAddress}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#0F3D2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#0F3D2E]">Shop Timings:</strong>
                      <span>Mon &ndash; Sat: 10:30 AM &ndash; 8:30 PM<br />Sunday: 11:00 AM &ndash; 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                    "Namaste Vaidik Ratnam, I would like to book a time to visit your shop and view jewellery/gemstones."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-pure py-3.5 px-6 rounded-xs text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 text-center text-[#0F3D2E] shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#0F3D2E]" />
                  <span>Connect on WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="py-3 px-6 rounded-xs border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#0F3D2E]/10 text-xs uppercase tracking-widest font-semibold text-center transition-colors"
                >
                  View Map & Directions
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
