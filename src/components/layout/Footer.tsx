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
} from "lucide-react";
import { LiteModeToggle } from "@/components/3d/components/LiteModeToggle";

export function Footer() {
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  return (
    <footer className="bg-[#08241B] text-[#DDE5DC] border-t-2 border-[#D4AF37] mt-auto font-sans relative overflow-hidden">
      {/* Subtle Ambient Radial Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-radial from-[#D4AF37]/12 to-transparent pointer-events-none -z-0" />

      {/* 0. Brand Elements Row: Lotus, Sun/Nakshatra, Gemstone, Astrology Circle */}
      <div className="border-b border-[#18523F] py-8 bg-[#051A13]/60 relative z-10">
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
              <strong className="text-xs font-serif text-[#F3E5AB] tracking-wider uppercase block">
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
              <strong className="text-xs font-serif text-[#F3E5AB] tracking-wider uppercase block">
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
              <strong className="text-xs font-serif text-[#F3E5AB] tracking-wider uppercase block">
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
              <strong className="text-xs font-serif text-[#F3E5AB] tracking-wider uppercase block">
                Astrology Circle
              </strong>
              <span className="text-[10px] text-[#A8B6AF] font-light">Cosmic Harmony &bull; Janma Kundali</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Core Trust Pillars */}
      <div className="border-b border-[#18523F] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start p-4 rounded-xs bg-white/5 border border-white/5 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-full bg-[#0F3D2E] border border-[#D4AF37] flex items-center justify-center text-[#F3E5AB] mb-4 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-[#48BB78]" />
            </div>
            <h4 className="font-serif text-white text-lg font-medium mb-1.5">
              100% BIS Hallmarked Purity
            </h4>
            <p className="text-xs text-[#A8B6AF] leading-relaxed">
              Every gold creation is certified with the official Bureau of Indian Standards hallmark and a verifiable 6-digit laser HUID code.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start p-4 rounded-xs bg-white/5 border border-white/5 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-full bg-[#0F3D2E] border border-[#D4AF37] flex items-center justify-center text-[#F3E5AB] mb-4 shadow-sm">
              <Compass className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="font-serif text-white text-lg font-medium mb-1.5">
              Classical Parashari Jyotish
            </h4>
            <p className="text-xs text-[#A8B6AF] leading-relaxed">
              Strictly ethical trinal gemstone analysis by our family elder. We reject fear tactics, manufactured threats, and false cure claims.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start p-4 rounded-xs bg-white/5 border border-white/5 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-full bg-[#0F3D2E] border border-[#D4AF37] flex items-center justify-center text-[#F3E5AB] mb-4 shadow-sm">
              <HeartHandshake className="w-6 h-6 text-[#F3E5AB]" />
            </div>
            <h4 className="font-serif text-white text-lg font-medium mb-1.5">
              Visit Our Shop &amp; Counter
            </h4>
            <p className="text-xs text-[#A8B6AF] leading-relaxed">
              Inspect pieces personally on certified digital scales in our shop. Safe in-person collection ensures complete trust and peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
        {/* Brand & Crest Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/60 shadow-lg flex items-center justify-center shrink-0 bg-[#0F3D2E] p-0.5">
              <Image
                src="/images/brand/app-icon-emerald-256.png"
                alt="VR Monogram Crest"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-serif text-2xl tracking-[0.08em] text-white font-medium block">
                VAIDIK RATNAM
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-sans -mt-0.5">
                Jewellery &bull; Gemstones &bull; Astrology
              </span>
            </div>
          </div>

          <p className="text-xs text-[#F3E5AB] italic font-serif tracking-wider">
            &ldquo;Timeless Jewellery &bull; Guided by Wisdom&rdquo;
          </p>

          <p className="text-xs text-[#A8B6AF] leading-relaxed max-w-sm">
            A trusted family-owned jewellery and gemstone shop in India. Combining 100% BIS hallmarked 22K gold, custom handmade designs by skilled karigars, certified natural gemstones, and honest astrology advice from our family elders.
          </p>

          <div className="p-3.5 bg-black/25 border border-[#D4AF37]/30 rounded-xs text-[11px] text-[#DDE5DC] space-y-1">
            <strong className="text-[#F3E5AB] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#48BB78]" />
              In-Person Shop Collection
            </strong>
            <p className="text-[#A8B6AF]">
              To guarantee 100% safety and purity, we sell directly in our shop. Every piece is weighed and tested in front of you. Zero courier risk.
            </p>
          </div>
        </div>

        {/* Column 1: Shop Collections */}
        <div>
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F3E5AB] font-semibold mb-4">
            Shop Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-[#A8B6AF]">
            <li>
              <Link href="/jewellery" className="hover:text-white transition-colors">
                All Gold Jewellery
              </Link>
            </li>
            <li>
              <Link href="/jewellery?category=necklaces" className="hover:text-white transition-colors">
                Necklaces &amp; Bridal Sets
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
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F3E5AB] font-semibold mb-4">
            Astrology &amp; Calculators
          </h4>
          <ul className="space-y-2.5 text-xs text-[#A8B6AF]">
            <li>
              <Link href="/astrology" className="hover:text-white transition-colors">
                Family Astrology Advice
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
          <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F3E5AB] font-semibold mb-4">
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
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0F3D2E] hover:bg-[#1B6442] text-white rounded-xs border border-[#D4AF37]/50 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#48BB78]" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">Shop WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Consumer Compliance Bar */}
      <div className="border-t border-[#18523F] py-6 bg-black/40">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
