"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Compass,
  HeartHandshake,
  Lock,
  MapPin,
  Clock,
  MessageCircle,
  Rotate3D,
  ArrowUp,
} from "lucide-react";
import dynamic from "next/dynamic";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";

const LiteModeToggle = dynamic(
  () => import("@/components/3d/components/LiteModeToggle").then((m) => m.LiteModeToggle),
  { ssr: false }
);

export function Footer() {
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#04170F] text-[#FAF7F0] border-t-2 border-[#D4AF37]/50 mt-auto font-sans relative overflow-hidden">
      {/* Subtle Ambient Radial Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-radial from-[#D4AF37]/10 to-transparent pointer-events-none -z-0" />

      {/* 0. Brand Elements Row: Lotus, Sun/Nakshatra, Gemstone, Astrology Circle */}
      <div className="border-b border-[#14502F]/40 py-8 bg-[#04170F]/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Element 1: Lotus */}
            <div className="flex flex-col items-center space-y-2 p-3 rounded-xs border border-white/5 bg-white/2 hover:border-[#D4AF37]/40 transition-colors">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image
                  src="/images/brand/element-lotus-transparent.png"
                  alt="Lotus — Spirituality"
                  width={56}
                  height={56}
                  className="w-10 h-10 object-contain drop-shadow"
                />
              </div>
              <strong className="text-xs font-serif text-[#F1D98A] tracking-wider uppercase block">
                Lotus
              </strong>
              <span className="text-[10px] text-[#A8B6AF] font-light">Spirituality &bull; Pure Craft</span>
            </div>

            {/* Element 2: Sun / Nakshatra */}
            <div className="flex flex-col items-center space-y-2 p-3 rounded-xs border border-white/5 bg-white/2 hover:border-[#D4AF37]/40 transition-colors">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image
                  src="/images/brand/element-sun-transparent.png"
                  alt="Sun / Nakshatra — Wisdom & Guidance"
                  width={56}
                  height={56}
                  className="w-10 h-10 object-contain drop-shadow"
                />
              </div>
              <strong className="text-xs font-serif text-[#F1D98A] tracking-wider uppercase block">
                Sun &bull; Nakshatra
              </strong>
              <span className="text-[10px] text-[#A8B6AF] font-light">Wisdom &bull; Vedic Guidance</span>
            </div>

            {/* Element 3: Gemstone */}
            <div className="flex flex-col items-center space-y-2 p-3 rounded-xs border border-white/5 bg-white/2 hover:border-[#D4AF37]/40 transition-colors">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image
                  src="/images/brand/element-gemstone-transparent.png"
                  alt="Gemstone — Value & Rarity"
                  width={56}
                  height={56}
                  className="w-10 h-10 object-contain drop-shadow"
                />
              </div>
              <strong className="text-xs font-serif text-[#F1D98A] tracking-wider uppercase block">
                Ratna &bull; Gemstone
              </strong>
              <span className="text-[10px] text-[#A8B6AF] font-light">Certified Truth &bull; Natural Rarity</span>
            </div>

            {/* Element 4: Astrology Circle */}
            <div className="flex flex-col items-center space-y-2 p-3 rounded-xs border border-white/5 bg-white/2 hover:border-[#D4AF37]/40 transition-colors">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image
                  src="/images/brand/element-astrology-circle-transparent.png"
                  alt="Astrology Circle — Cosmic Connection"
                  width={56}
                  height={56}
                  className="w-10 h-10 object-contain drop-shadow"
                />
              </div>
              <strong className="text-xs font-serif text-[#F1D98A] tracking-wider uppercase block">
                Astrology Circle
              </strong>
              <span className="text-[10px] text-[#A8B6AF] font-light">Cosmic Harmony &bull; Janma Kundali</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Core Trust Pillars */}
      <div className="border-b border-[#14502F]/40 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#14502F]/30 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#F1D98A] font-semibold">
                  100% BIS Hallmarked Gold
                </h4>
                <p className="text-xs text-[#A8B6AF] mt-1 leading-relaxed">
                  Every 22K and 18K piece carries the Government of India 6-digit alphanumeric HUID laser stamp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#14502F]/30 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#F1D98A] font-semibold">
                  Natural Certified Gemstones
                </h4>
                <p className="text-xs text-[#A8B6AF] mt-1 leading-relaxed">
                  Strictly untreated, unheated gemstones with authentic third-party gemological certificates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#14502F]/30 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#F1D98A] font-semibold">
                  Three Generations of Trust
                </h4>
                <p className="text-xs text-[#A8B6AF] mt-1 leading-relaxed">
                  Traditional family jewellery shop. Honest rates, transparent weights, and no fear-based Jyotish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
        {/* Brand Lockup & WhatsApp Alert Column */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatedLogo variant="gold-on-dark" size="md" showLockup />

          <p className="text-xs text-[#A8B6AF] leading-relaxed max-w-sm pt-2">
            Traditional Indian Gold Jewellery, Bespoke Karigari &amp; Genuine Astrological Ratna. Crafted with Vedic integrity and weighed in front of you on certified digital scales.
          </p>

          {/* Daily Gold Rate Alert via WhatsApp */}
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F1D98A] block mb-2">
              Daily Gold Rate Updates
            </span>
            <div className="flex items-center gap-2 max-w-sm">
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  "Namaste Vaidik Ratnam, please subscribe me to your daily certified 22K/24K gold rate broadcast."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs bg-[#14502F]/40 hover:bg-[#14502F] border border-[#D4AF37]/40 text-[#F1D98A] text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#48BB78]" />
                <span>Join Daily Rate Alerts</span>
              </a>
            </div>
          </div>
        </div>

        {/* Column 1: Jewellery Collections */}
        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F1D98A] font-semibold mb-4">
            Gold Jewellery
          </h4>
          <ul className="space-y-2.5 text-xs text-[#A8B6AF]">
            <li>
              <Link href="/jewellery" className="hover:text-white transition-colors">
                All Jewellery
              </Link>
            </li>
            <li>
              <Link href="/jewellery?category=necklaces" className="hover:text-white transition-colors">
                Necklaces &amp; Chokers
              </Link>
            </li>
            <li>
              <Link href="/jewellery?category=rings" className="hover:text-white transition-colors">
                Gold &amp; Gemstone Rings
              </Link>
            </li>
            <li>
              <Link href="/jewellery?category=bangles-bracelets" className="hover:text-white transition-colors">
                Bangles &amp; Traditional Kadas
              </Link>
            </li>
            <li>
              <Link href="/custom-design" className="hover:text-white transition-colors">
                Custom Jewellery (Karigari)
              </Link>
            </li>
            <li>
              <Link href="/gemstones" className="hover:text-white transition-colors">
                Certified Natural Gemstones
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Astrology & Tools */}
        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F1D98A] font-semibold mb-4">
            Astrology &amp; Calculators
          </h4>
          <ul className="space-y-2.5 text-xs text-[#A8B6AF]">
            <li>
              <Link href="/astrology" className="hover:text-white transition-colors">
                Vedic Astrology Guidance
              </Link>
            </li>
            <li>
              <Link href="/jyotish/lal-kitab" className="hover:text-[#F1D98A] transition-colors font-medium">
                Lal Kitab Kundali &amp; Upay
              </Link>
            </li>
            <li>
              <Link href="/consultation/request" className="hover:text-white transition-colors">
                Book Consultation
              </Link>
            </li>
            <li>
              <Link href="/astrology#lagna-explorer" className="hover:text-white transition-colors">
                Find Your Rashi Gemstone
              </Link>
            </li>
            <li>
              <Link href="/tools/gold-budget-estimator" className="hover:text-white transition-colors">
                Gold &amp; Silver Rate Calculator
              </Link>
            </li>
            <li>
              <Link href="/tools/jewellery-buying-checklist" className="hover:text-white transition-colors">
                Jewellery Buying Checklist
              </Link>
            </li>
            <li>
              <Link href="/tools/gemstone-comparison" className="hover:text-white transition-colors">
                Gemstone Guide &amp; Care
              </Link>
            </li>
            <li>
              <Link href="/learn" className="hover:text-white transition-colors">
                Jewellery Guides &amp; FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Shop & Contact */}
        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F1D98A] font-semibold mb-4">
            Our Shop
          </h4>
          <div className="space-y-3 text-xs text-[#A8B6AF]">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Vaidik Ratnam Jewellery Shop, India</span>
            </p>
            <p className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Mon – Sat: 11:00 AM – 8:00 PM<br />Sun: By Appointment</span>
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about your jewellery and gemstones."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0A2A1D] hover:bg-[#14502F] text-white rounded-xs border border-[#D4AF37]/50 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#48BB78]" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">Shop WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Center Hairline Gold Divider with Diamond Ornament */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="gold-divider-diamond text-[#D4AF37]">
          <span className="text-xs">&diams;</span>
        </div>
      </div>

      {/* 3. Huge Reflective Gold Architectural Wordmark */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center select-none overflow-hidden">
        <span className="font-serif text-5xl sm:text-7xl lg:text-9xl tracking-[0.2em] uppercase font-light text-gold-gradient opacity-20 block hover:opacity-40 transition-opacity duration-700">
          VAIDIKRATNAM
        </span>
      </div>

      {/* 4. Bottom Legal & Consumer Compliance Bar */}
      <div className="border-t border-[#14502F]/40 py-6 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#82928A]">
          <p>
            &copy; 2026 Vaidik Ratnam &bull; Traditional Gold Jewellery &amp; Gemstone Shop. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Notice
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Policies
            </Link>
            <span>&bull;</span>
            <Link href="/gemstone-disclosure" className="hover:text-white transition-colors">
              Gemstone Purity Notice
            </Link>
            <span>&bull;</span>
            <Link href="/cancellation" className="hover:text-white transition-colors">
              Shop Visit Policy
            </Link>
            <span>&bull;</span>
            <LiteModeToggle />
            <span>&bull;</span>
            <Link href="/dev/3d" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-mono text-[10px]">
              <Rotate3D className="w-3 h-3 text-[#D4AF37]" />
              3D Studio
            </Link>
            <span>&bull;</span>
            <Link href="/admin/login" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-mono">
              <Lock className="w-3 h-3" />
              Staff Login
            </Link>
            <span>&bull;</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#F1D98A] hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
