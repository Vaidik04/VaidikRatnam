import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Compass, HeartHandshake, Sparkles, Scale, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Our Family Shop — Vaidik Ratnam",
  description:
    "Learn about Vaidik Ratnam — an Indian family jewellery shop rooted in generational goldsmithing and honest, transparent Vedic astrology guidance.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a2a1d] border border-[#d4af37]/40 text-[#f1d98a] text-xs uppercase tracking-[0.22em] font-mono shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Generational Goldsmithing &amp; Vedic Wisdom</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight leading-tight">
            The Story of <span className="text-gold-gradient italic">Vaidik Ratnam</span>
          </h1>

          <p className="text-base sm:text-lg text-[#a8b6af] leading-relaxed font-light">
            An independent Indian family jewellery and gemstone shop. We combine the honest purity of traditional goldsmithing with genuine, caring Vedic astrology guidance.
          </p>
        </div>

        {/* Dual Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 sm:p-10 bg-[#0a2a1d]/70 border border-[#d4af37]/30 rounded-2xl shadow-xl space-y-5 relative overflow-hidden group hover:border-[#d4af37] transition-all backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Scale className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.22em] font-semibold block mb-1">
                Pillar I &bull; Goldsmithing Discipline
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Absolute Assaying Transparency
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#a8b6af] leading-relaxed font-light">
              In fine jewellery, true luxury begins with unwavering honesty. Every single article crafted or curated in our studio is certified with <strong>100% Bureau of Indian Standards (BIS) hallmarking</strong>, bearing a microscopic 6-digit laser-inscribed HUID code verifiable in seconds on the official BIS Care app.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-[#e2ece7] border-t border-white/10 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Net-weight-only billing (Stones and lac weight are always deducted).</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Transparent making charges without arbitrary hidden wastage.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Full GST tax invoice with statutory 3% tax breakdown.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 sm:p-10 bg-[#0a2a1d]/70 border border-[#d4af37]/30 rounded-2xl shadow-xl space-y-5 relative overflow-hidden group hover:border-[#d4af37] transition-all backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Compass className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.22em] font-semibold block mb-1">
                Pillar II &bull; Astrological Ethics
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                The Father&apos;s Jyotish Practice
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#a8b6af] leading-relaxed font-light">
              Our elder father has spent decades studying classical Parashari Jyotish and planetary mechanics. In an industry too often tainted by commercial fear-tactics and artificial gemstone claims, our studio holds a sacred line: <strong>Astrology is an intellectual and spiritual guide, never an aggressive sales funnel.</strong>
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-[#e2ece7] border-t border-white/10 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Zero sales pressure: A consultation never obligates you to purchase a gemstone.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Full disclosure of unheated vs heat-enhanced gemstone status.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Open-back Chhidra settings engineered for optical light transmission.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Father's Sanskrit Callout */}
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#0a2a1d] via-[#0f3a28] to-[#0a2a1d] text-white rounded-2xl border border-[#d4af37]/40 shadow-2xl relative overflow-hidden text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block">
            Our Guiding Principle
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl text-[#f1d98a] font-normal italic leading-relaxed">
            &ldquo;रत्नं संधारयेन्विद्वान् शुद्धं दोषविवर्जितम्&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-[#a8b6af] max-w-xl mx-auto leading-relaxed">
            &ldquo;The wise should only ever wear a gemstone that is pure, untreated, and free from structural flaws.&rdquo; &mdash; Classical Ratna Shastra.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">
              Traditional Vedic Astrology &bull; Vaidik Ratnam Family Shop
            </span>
          </div>
        </div>

        {/* Brand Identity & The Sacred Monogram */}
        <div className="bg-[#0a2a1d]/70 border border-[#d4af37]/30 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] font-semibold block">
              Brand Heritage &bull; Visual Identity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              The Meaning of Our Monogram &amp; Symbols
            </h2>
            <p className="text-xs sm:text-sm text-[#a8b6af] leading-relaxed">
              Every detail of the Vaidik Ratnam emblem is rooted in ancient Indian iconology, goldsmithing devotion, and planetary astrology.
            </p>
          </div>

          {/* Full Brand Board Showcase Card */}
          <div className="relative rounded-xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#04170f]">
            <Image
              src="/images/brand/brand-identity-board.jpg"
              alt="Vaidik Ratnam Complete Brand Identity Sheet"
              width={1024}
              height={682}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* The 4 Elements Detailed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-2 text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center p-2">
                <Image
                  src="/images/brand/element-lotus-transparent.png"
                  alt="Lotus"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <strong className="font-serif text-base text-white block">The Sacred Lotus</strong>
              <p className="text-xs text-[#a8b6af] leading-relaxed">
                Represents spiritual purity and reverence for Indian karigari. Rising unstained through water, it inspires unblemished honesty in our gold trade.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center p-2">
                <Image
                  src="/images/brand/element-sun-transparent.png"
                  alt="Sun & Nakshatra"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <strong className="font-serif text-base text-white block">Sun &bull; Nakshatra</strong>
              <p className="text-xs text-[#a8b6af] leading-relaxed">
                Represents wisdom, cosmic light, and guidance. Symbolizes our elder father&apos;s classical Parashari Jyotish consultations.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center p-2">
                <Image
                  src="/images/brand/element-gemstone-transparent.png"
                  alt="Ratna Gemstone"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <strong className="font-serif text-base text-white block">Natural Ratna</strong>
              <p className="text-xs text-[#a8b6af] leading-relaxed">
                Represents rarity, value, and truth. Certified untreated earth-mined stones with accredited independent gemological laboratory reports.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center p-2">
                <Image
                  src="/images/brand/element-astrology-circle-transparent.png"
                  alt="Astrology Circle"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <strong className="font-serif text-base text-white block">The Astrology Circle</strong>
              <p className="text-xs text-[#a8b6af] leading-relaxed">
                Represents the 12 Bhavas and 9 Grahas. Connecting cosmic energy with fine goldsmithing through traditional open-back ring settings.
              </p>
            </div>
          </div>
        </div>

        {/* Why Visiting Our Shop in Person Matters */}
        <div className="bg-[#0a2a1d]/70 border border-[#d4af37]/30 p-8 sm:p-10 rounded-2xl shadow-2xl space-y-6 backdrop-blur-md">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold block">
              Our Shop Promise
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Why We Welcome You to Visit Our Shop in Person
            </h3>
            <p className="text-xs sm:text-sm text-[#a8b6af] leading-relaxed">
              Gold jewellery and natural gemstones are precious milestones for your family. We never treat fine jewellery like cheap parcel packages sent in the mail. We warmly invite you to visit our shop, weigh every piece on our certified digital scales, check purity hallmarks, examine gemstones under magnification, and discuss custom designs directly with our family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-serif font-medium text-[#f1d98a]">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                <span>100% BIS Hallmarked</span>
              </div>
              <p className="text-xs text-[#a8b6af] leading-relaxed">
                6-digit alphanumeric HUID laser inscribed and registered in the national BIS database.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-serif font-medium text-[#f1d98a]">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Accredited Lab Certificates</span>
              </div>
              <p className="text-xs text-[#a8b6af] leading-relaxed">
                Every natural Ratna is verified for origin, species, and unheated treatment status.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-serif font-medium text-[#f1d98a]">
                <HeartHandshake className="w-4 h-4 text-[#d4af37]" />
                <span>Direct Family Relationship</span>
              </div>
              <p className="text-xs text-[#a8b6af] leading-relaxed">
                You speak directly with our family and master karigars (goldsmiths), not commission salesmen.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link href="/jewellery">
              <button
                type="button"
                className="bg-gold-gradient text-[#04170f] font-mono px-6 py-3 text-xs uppercase tracking-wider font-bold rounded-full shadow-lg hover:brightness-105 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Available Designs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <Link href="/contact">
              <button
                type="button"
                className="px-6 py-3 text-xs font-mono uppercase tracking-wider border border-[#d4af37]/40 text-[#f1d98a] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                Visit Our Shop
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
