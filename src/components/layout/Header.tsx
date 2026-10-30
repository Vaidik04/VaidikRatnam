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
} from "lucide-react";

const NAV_LINKS = [
  { href: "/jewellery", label: "Gold Jewellery" },
  { href: "/custom-design", label: "Custom Jewellery" },
  { href: "/gemstones", label: "Real Gemstones" },
  { href: "/astrology", label: "Astrology Advice" },
  { href: "/learn", label: "Guides & Tools" },
  { href: "/about", label: "About Our Shop" },
  { href: "/contact", label: "Visit Our Shop" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* 1. Shop Top Marquee: Live Rates, Purity Promise & Brand Tagline */}
      <div className="bg-[#08241B] text-[#F3E5AB] text-[11px] py-1.5 px-4 overflow-hidden border-b border-[#D4AF37]/30 tracking-wider font-sans select-none shadow-xs">
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
          {/* Loop items x2 for seamless infinite marquee */}
          {[1, 2].map((loop) => (
            <div key={loop} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B6442] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#48BB78]"></span>
                </span>
                <strong className="text-white">Today&apos;s Gold Rate:</strong> 24K Gold ₹8,150/g &bull; 22K (916) ₹7,470/g &bull; 925 Silver ₹98/g
              </span>
              <span className="text-[#D4AF37]">&bull;</span>
              <span className="flex items-center gap-1.5 text-[#FDF9EE]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                100% BIS Hallmarked Gold with 6-Digit HUID Code
              </span>
              <span className="text-[#D4AF37]">&bull;</span>
              <span className="text-[#F3E5AB] font-serif italic">
                Timeless Jewellery &bull; Guided by Wisdom
              </span>
              <span className="text-[#D4AF37]">&bull;</span>
              <span>Visit Our Shop &bull; Weigh Gold in Front of You on Digital Scales</span>
              <span className="text-[#D4AF37]">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Natural Certified Gemstones &bull; Parashari Jyotish Guidance
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
            <Link href="/" className="flex items-center group py-1 shrink-0 mr-6 lg:mr-10">
              <div className="relative h-14 sm:h-16 w-auto flex items-center">
                <Image
                  src="/images/brand/logo-horizontal-transparent.png"
                  alt="Vaidik Ratnam — Jewellery • Gemstones • Astrology"
                  width={909}
                  height={319}
                  priority
                  className="h-13 sm:h-15 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-7">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[11px] uppercase tracking-[0.16em] font-medium transition-all py-1 relative group ${
                      isActive
                        ? "text-[#173B32] font-semibold"
                        : "text-[#182522] hover:text-[#B08D57]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B08D57] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Action Group */}
            <div className="hidden sm:flex items-center gap-3">
              {/* WhatsApp Shop Direct Concierge */}
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about your jewellery and gemstone collections."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#173B32] hover:text-[#B08D57] transition-colors"
                title="Chat with our shop on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#1B6442]" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">Shop WhatsApp</span>
              </a>

              {/* Custom Design CTA Button */}
              <Link href="/custom-design">
                <button
                  type="button"
                  className="btn-gold-shimmer text-white px-4 py-2.5 rounded-xs text-[11px] uppercase tracking-[0.18em] font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-[#F3E5AB]" />
                  <span>Custom Jewellery</span>
                </button>
              </Link>
            </div>

            {/* Mobile menu hamburger */}
            <div className="flex xl:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#182522] hover:text-[#173B32] focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#173B32]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#173B32]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#E2D7C5] bg-[#FAF8F5] px-5 pt-4 pb-8 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Drawer Brand Identification */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E8DFC8]">
            <div className="w-8 h-8 rounded-full bg-[#0F3D2E]/10 border border-[#D4AF37]/40 flex items-center justify-center p-1.5 shrink-0">
              <Image
                src="/images/brand/icon-full-color-transparent.png"
                alt="VR"
                width={28}
                height={28}
                className="w-full h-full object-contain"
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
                className="block text-xs uppercase tracking-[0.2em] py-2.5 px-3 text-[#182522] hover:bg-[#F0ECE2] rounded-xs font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E5DFD5] space-y-2">
            <Link
              href="/custom-design"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <button
                type="button"
                className="btn-gold-pure w-full py-2.5 text-xs uppercase tracking-widest font-semibold rounded-xs"
              >
                Order Custom Jewellery
              </button>
            </Link>

            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about your jewellery and gemstone collections."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 text-xs text-[#173B32] font-semibold uppercase tracking-wider"
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
