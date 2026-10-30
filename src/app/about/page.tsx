import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Compass, HeartHandshake, Sparkles, Scale, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Our Family Shop — Vaidik Ratnam",
  description:
    "Learn about Vaidik Ratnam — an Indian family jewellery shop rooted in generational goldsmithing and honest, transparent Vedic astrology guidance.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173B32]/10 border border-[#B08D57]/40 text-[#173B32] text-xs uppercase tracking-[0.22em] font-medium animate-float">
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Generational Goldsmithing &amp; Vedic Wisdom</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#182522] font-normal tracking-tight leading-tight">
            The Story of <span className="italic">Vaidik Ratnam</span>
          </h1>

          <p className="text-base sm:text-lg text-[#626A65] leading-relaxed font-light">
            An independent Indian family jewellery and gemstone shop. We combine the honest purity of traditional goldsmithing with genuine, caring Vedic astrology guidance.
          </p>
        </div>

        {/* Dual Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1 */}
          <Card className="p-8 sm:p-10 bg-white border border-[#E2D7C5] rounded-xs shadow-md space-y-5 relative overflow-hidden group hover:border-[#B08D57] transition-all">
            <div className="w-12 h-12 rounded-full bg-[#173B32]/10 flex items-center justify-center text-[#173B32]">
              <Scale className="w-6 h-6 text-[#173B32]" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#B08D57] uppercase tracking-[0.22em] font-semibold block mb-1">
                Pillar I &bull; Goldsmithing Discipline
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
                Absolute Assaying Transparency
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#626A65] leading-relaxed">
              In fine jewellery, true luxury begins with unwavering honesty. Every single article crafted or curated in our studio is certified with <strong>100% Bureau of Indian Standards (BIS) hallmarking</strong>, bearing a microscopic 6-digit laser-inscribed HUID code verifiable in seconds on the official BIS Care app.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-[#182522] border-t border-[#F0ECE2]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#173B32] shrink-0" />
                <span>Net-weight-only billing (Stones and lac weight are always deducted).</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#173B32] shrink-0" />
                <span>Transparent making charges without arbitrary hidden wastage.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#173B32] shrink-0" />
                <span>Full GST tax invoice with statutory 3% tax breakdown.</span>
              </li>
            </ul>
          </Card>

          {/* Pillar 2 */}
          <Card className="p-8 sm:p-10 bg-white border border-[#E2D7C5] rounded-xs shadow-md space-y-5 relative overflow-hidden group hover:border-[#B08D57] transition-all">
            <div className="w-12 h-12 rounded-full bg-[#B08D57]/10 flex items-center justify-center text-[#B08D57]">
              <Compass className="w-6 h-6 text-[#B08D57]" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#B08D57] uppercase tracking-[0.22em] font-semibold block mb-1">
                Pillar II &bull; Astrological Ethics
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
                The Father&apos;s Jyotish Practice
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#626A65] leading-relaxed">
              Our elder father has spent decades studying classical Parashari Jyotish and planetary mechanics. In an industry too often tainted by commercial fear-tactics and artificial gemstone claims, our studio holds a sacred line: <strong>Astrology is an intellectual and spiritual guide, never an aggressive sales funnel.</strong>
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-[#182522] border-t border-[#F0ECE2]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57] shrink-0" />
                <span>Zero sales pressure: A consultation never obligates you to purchase a gemstone.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57] shrink-0" />
                <span>Full disclosure of unheated vs heat-enhanced gemstone status.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B08D57] shrink-0" />
                <span>Open-back Chhidra settings engineered for optical light transmission.</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Father's Sanskrit Callout */}
        <div className="p-8 sm:p-12 bg-[#173B32] text-white rounded-xs shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F3E5AB] block">
              Our Sacred Principle
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl text-white font-normal italic leading-relaxed">
              &ldquo;रत्नं संधारयेन्विद्वान् शुद्धं दोषविवर्जितम्&rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm text-[#DDE5DC] max-w-xl mx-auto leading-relaxed">
              &ldquo;The wise should only ever wear a gemstone that is pure, untreated, and free from structural flaws.&rdquo; — Classical Ratna Shastra.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#B08D57] font-semibold">
                Traditional Vedic Astrology &bull; Vaidik Ratnam Family Shop
              </span>
            </div>
          </div>
        </div>

        {/* Brand Identity & The Sacred Monogram */}
        <div className="bg-white border border-[#E8DFC8] rounded-xs p-8 sm:p-12 shadow-md space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              Sacred Heritage &bull; Visual Identity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#182522] font-normal">
              The Meaning of Our Monogram &amp; Symbols
            </h2>
            <p className="text-xs sm:text-sm text-[#4B3F36] leading-relaxed">
              Every detail of the Vaidik Ratnam emblem is rooted in ancient Indian iconology, goldsmithing devotion, and planetary astrology.
            </p>
          </div>

          {/* Full Brand Board Showcase Card */}
          <div className="relative rounded-xs overflow-hidden border border-[#D4AF37]/40 shadow-xl bg-[#08241B]">
            <Image
              src="/images/brand/brand-identity-board.jpg"
              alt="Vaidik Ratnam Complete Brand Identity Sheet"
              width={1024}
              height={682}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* The 4 Elements Detailed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[#F0ECE2]">
            <div className="space-y-2 text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-[#0F3D2E]/5 border border-[#D4AF37]/40 flex items-center justify-center p-2">
                <Image
                  src="/images/brand/element-lotus-transparent.png"
                  alt="Lotus"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <strong className="font-serif text-base text-[#182522] block">The Sacred Lotus</strong>
              <p className="text-xs text-[#4B3F36] leading-relaxed">
                Represents spiritual purity and reverence for Indian karigari. Rising unstained through water, it inspires unblemished honesty in our gold trade.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-[#0F3D2E]/5 border border-[#D4AF37]/40 flex items-center justify-center p-2">
                <Image
                  src="/images/brand/element-sun-transparent.png"
                  alt="Sun & Nakshatra"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <strong className="font-serif text-base text-[#182522] block">Sun &bull; Nakshatra</strong>
              <p className="text-xs text-[#4B3F36] leading-relaxed">
                Represents wisdom, cosmic light, and guidance. Symbolizes our elder father&apos;s classical Parashari Jyotish consultations.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-[#0F3D2E]/5 border border-[#D4AF37]/40 flex items-center justify-center p-2">
                <Image
                  src="/images/brand/element-gemstone-transparent.png"
                  alt="Ratna Gemstone"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <strong className="font-serif text-base text-[#182522] block">Natural Ratna</strong>
              <p className="text-xs text-[#4B3F36] leading-relaxed">
                Represents rarity, value, and truth. Certified untreated earth-mined stones with accredited independent gemological laboratory reports.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-12 h-12 mx-auto sm:mx-0 rounded-full bg-[#0F3D2E]/5 border border-[#D4AF37]/40 flex items-center justify-center p-2">
                <Image
                  src="/images/brand/element-astrology-circle-transparent.png"
                  alt="Astrology Circle"
                  width={40}
                  height={40}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <strong className="font-serif text-base text-[#182522] block">The Astrology Circle</strong>
              <p className="text-xs text-[#4B3F36] leading-relaxed">
                Represents the 12 Bhavas and 9 Grahas. Connecting cosmic energy with fine goldsmithing through traditional open-back ring settings.
              </p>
            </div>
          </div>
        </div>

        {/* Why Visiting Our Shop in Person Matters */}
        <div className="bg-white border border-[#E2D7C5] p-8 sm:p-10 rounded-xs shadow-xs space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
              Our Shop Promise
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
              Why We Welcome You to Visit Our Shop in Person
            </h3>
            <p className="text-xs sm:text-sm text-[#626A65] leading-relaxed">
              Gold jewellery and natural gemstones are precious milestones for your family. We never treat fine jewellery like cheap parcel packages sent in the mail. We warmly invite you to visit our shop, weigh every piece on our certified digital scales, check purity hallmarks, examine gemstones under magnification, and discuss custom designs directly with our family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F0ECE2]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-serif font-medium text-[#182522]">
                <ShieldCheck className="w-4 h-4 text-[#173B32]" />
                <span>100% BIS Hallmarked</span>
              </div>
              <p className="text-xs text-[#626A65] leading-relaxed">
                6-digit alphanumeric HUID laser inscribed and registered in the national BIS database.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-serif font-medium text-[#182522]">
                <Sparkles className="w-4 h-4 text-[#B08D57]" />
                <span>Accredited Lab Certificates</span>
              </div>
              <p className="text-xs text-[#626A65] leading-relaxed">
                Every natural Ratna is verified for origin, species, and unheated treatment status.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-serif font-medium text-[#182522]">
                <HeartHandshake className="w-4 h-4 text-[#173B32]" />
                <span>Direct Family Relationship</span>
              </div>
              <p className="text-xs text-[#626A65] leading-relaxed">
                You speak directly with our family and master karigars (goldsmiths), not commission salesmen.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link href="/jewellery">
              <Button variant="gold" size="md" className="text-xs uppercase tracking-wider font-semibold btn-gold-shimmer">
                Explore Available Designs
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="md" className="text-xs uppercase tracking-wider border-[#173B32] text-[#173B32] hover:bg-[#173B32] hover:text-white">
                Visit Our Shop
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
