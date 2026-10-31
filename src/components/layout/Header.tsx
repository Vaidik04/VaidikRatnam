"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Scale,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/jewellery", label: "Jewellery" },
  { href: "/gemstones", label: "Gemstones" },
  { href: "/custom-design", label: "Custom Karigari" },
  { href: "/astrology", label: "Jyotish Guidance" },
  { href: "/tools/gold-budget-estimator", label: "Gold Calculator" },
  { href: "/about", label: "Our Shop" },
  { href: "/contact", label: "Visit Us" },
];

interface HeaderProps {
  rates?: {
    gold24k?: number;
    gold22k?: number;
    silver?: number;
  };
}

export function Header({ rates }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  const gold24k = rates?.gold24k || 8150;
  const gold22k = rates?.gold22k || 7470;
  const silver = rates?.silver || 98;

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* 1. Shop Top Marquee: Live Rates, Purity Promise & Brand Tagline */}
      <div className="bg-[#08241B] text-[#F3E5AB] text-[11px] py-1.5 px-4 overflow-hidden border-b border-[#D4AF37]/30 tracking-wider font-sans select-none">
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
          {[1, 2].map((loop) => (
            <div key={loop} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-1.5 font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B6442] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#48BB78]"></span>
                </span>
                <strong className="text-white uppercase tracking-wider font-sans font-semibold">Today&apos;s Rates:</strong>
                <span>24K ₹{gold24k.toLocaleString("en-IN")}/g</span>
                <span className="text-[#D4AF37]">&bull;</span>
                <span>22K (916) ₹{gold22k.toLocaleString("en-IN")}/g</span>
                <span className="text-[#D4AF37]">&bull;</span>
                <span>925 Silver ₹{silver.toLocaleString("en-IN")}/g</span>
              </span>
              <span className="text-[#D4AF37]">&bull;</span>
              <span className="flex items-center gap-1.5 text-[#FDF9EE]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                100% BIS Hallmarked Gold with 6-Digit HUID Code
              </span>
              <span className="text-[#D4AF37]">&bull;</span>
              <span className="flex items-center gap-1.5 text-[#FDF9EE]">
                <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
                Weigh Gold In Front of You on Certified Digital Scales
              </span>
              <span className="text-[#D4AF37]">&bull;</span>
              <span className="text-[#F3E5AB] font-serif italic">
                Timeless Jewellery &bull; Guided by Wisdom
              </span>
              <span className="text-[#D4AF37]">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Natural Certified Gemstones &bull; Honest Jyotish Guidance
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Glassmorphic Luxury Navigation Bar */}
      <div className="luxury-glass border-b border-[#E8DFC8]/90 transition-all duration-300 bg-[#F9F5EB]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* Official Brand Logo */}
            <Link href="/" className="flex items-center group py-1 shrink-0 mr-4 lg:mr-8">
              <div className="relative h-14 sm:h-16 lg:h-18 w-auto flex items-center">
                <Image
                  src="/images/brand/logo-horizontal-header-cream.png"
                  alt="Vaidik Ratnam — Jewellery • Gemstones • Astrology"
                  width={909}
                  height={319}
                  priority
                  className="h-13 sm:h-15 lg:h-17 w-auto object-contain mix-blend-multiply group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-xs"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[11px] xl:text-[12px] uppercase tracking-[0.14em] font-medium transition-all py-1 relative group whitespace-nowrap ${
                      isActive
                        ? "text-[#0F3D2E] font-semibold"
                        : "text-[#4B3F36] hover:text-[#B59328]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Action Group */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {/* WhatsApp Shop Direct Concierge */}
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about your jewellery and gemstone collections."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#0F3D2E] hover:text-[#B59328] transition-colors whitespace-nowrap"
                title="Chat with our shop on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#1B6442]" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">Shop WhatsApp</span>
              </a>

              {/* Custom Design CTA Button */}
              <Link href="/custom-design" className="shrink-0">
                <button
                  type="button"
                  className="btn-gold-shimmer text-white px-4 py-2.5 rounded-xs text-[11px] uppercase tracking-[0.16em] font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-[#F3E5AB]" />
                  <span>Custom Karigari</span>
                </button>
              </Link>
            </div>

            {/* Mobile menu hamburger */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#4B3F36] hover:text-[#0F3D2E] focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#0F3D2E]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#0F3D2E]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8DFC8] bg-[#F9F5EB] px-5 pt-4 pb-8 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Drawer Brand Identification */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8DFC8]">
            <div className="w-9 h-9 rounded-full bg-[#0F3D2E] border border-[#D4AF37]/60 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-xs">
              <Image
                src="/images/brand/app-icon-emerald-256.png"
                alt="VR Crest"
                width={36}
                height={36}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-serif text-sm tracking-wider font-semibold text-[#0F3D2E] block leading-tight">
                VAIDIK RATNAM
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#B59328] font-mono block">
                Jewellery &bull; Gemstones &bull; Astrology
              </span>
            </div>
          </div>

          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-[0.18em] py-2.5 px-3 text-[#4B3F36] hover:bg-[#F3E5AB]/30 rounded-xs font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8DFC8] space-y-2">
            <Link
              href="/custom-design"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <button
                type="button"
                className="btn-gold-pure w-full py-2.5 text-xs uppercase tracking-widest font-semibold rounded-xs"
              >
                Order Custom Karigari
              </button>
            </Link>

            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about your jewellery and gemstone collections."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 text-xs text-[#0F3D2E] font-semibold uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-[#1B6442]" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
