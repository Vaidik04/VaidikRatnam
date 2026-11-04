"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Scale,
  TrendingUp,
} from "lucide-react";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";

const NAV_LINKS = [
  { href: "/jewellery", label: "Jewellery", desc: "22K & 18K Hallmarked Gold Artistry" },
  { href: "/gemstones", label: "Gemstones", desc: "Untreated Vedic Ratna with Lab Certs" },
  { href: "/custom-design", label: "Custom Karigari", desc: "Handcrafted by Master Karigars" },
  { href: "/astrology", label: "Jyotish Guidance", desc: "Honest, Non-Fear Based Parashari Jyotish" },
  { href: "/jyotish/lal-kitab", label: "Lal Kitab", desc: "1952 Gutka Kundali & Safe Upay" },
  { href: "/tools/gold-budget-estimator", label: "Gold Calculator", desc: "Live Transparent Studio Breakdown" },
  { href: "/about", label: "Our Heritage", desc: "Three Generations of Craftsmanship" },
  { href: "/contact", label: "Visit Shop", desc: "Weigh Gold In Front of You on Digital Scales" },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";
  const gold24k = rates?.gold24k || 8150;
  const gold22k = rates?.gold22k || 7470;
  const silver = rates?.silver || 98;

  // Scroll listener for sticky show/hide & frosted glass transformation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled past 50px activates frosted glass
      setIsScrolled(currentScrollY > 50);

      // Scroll direction: hide on scroll down, show on scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8 || currentScrollY <= 80) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* 1. Live Bullion Rate & Authenticity Marquee */}
      <div className="bg-[#04170F] text-[#F1D98A] text-[10px] sm:text-[11px] py-1.5 px-4 overflow-hidden border-b border-[#D4AF37]/25 tracking-widest font-mono select-none">
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
          {[1, 2].map((loop) => (
            <div key={loop} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#48BB78] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38A169]"></span>
                </span>
                <strong className="text-white uppercase font-sans tracking-wider font-semibold">
                  LIVE BENCHMARK:
                </strong>
                <span>
                  24K Gold ₹{gold24k.toLocaleString("en-IN")}/g <TrendingUp className="inline w-3 h-3 text-[#48BB78] ml-0.5" />
                </span>
                <span className="text-[#D4AF37]">&bull;</span>
                <span>22K (916) ₹{gold22k.toLocaleString("en-IN")}/g</span>
                <span className="text-[#D4AF37]">&bull;</span>
                <span>925 Silver ₹{silver.toLocaleString("en-IN")}/g</span>
              </span>

              <span className="text-[#D4AF37]">&bull;</span>
              <span className="flex items-center gap-1.5 text-[#FAF7F0] font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                100% BIS Hallmarked 22K/18K Gold with 6-Digit HUID
              </span>

              <span className="text-[#D4AF37]">&bull;</span>
              <span className="flex items-center gap-1.5 text-[#FAF7F0] font-sans">
                <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
                Weighed In Front of You on Certified Digital Scales
              </span>

              <span className="text-[#D4AF37]">&bull;</span>
              <span className="text-[#F6E7B4] font-serif italic">
                Timeless Jewellery &bull; Guided by Wisdom
              </span>

              <span className="text-[#D4AF37]">&bull;</span>
              <span className="flex items-center gap-1.5 text-[#FAF7F0] font-sans">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Untreated Certified Gemstones &bull; Honest Jyotish Advice
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Glassmorphic Navigation Bar */}
      <div
        className={`w-full transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#04170F]/90 backdrop-blur-md border-[#D4AF37]/30 shadow-md py-3"
            : "bg-[#0A2A1D]/80 backdrop-blur-sm border-[#D4AF37]/20 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Animated Transparent SVG Logo Lockup */}
            <Link
              href="/"
              className="group flex items-center shrink-0 cursor-pointer outline-none focus:outline-none"
            >
              <AnimatedLogo
                variant="gold-on-dark"
                size={isScrolled ? "sm" : "md"}
                showLockup
              />
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
                    className={`text-[10px] xl:text-[11px] uppercase tracking-[0.2em] font-mono py-1.5 relative group whitespace-nowrap transition-colors ${
                      isActive
                        ? "text-[#F6E7B4] font-bold"
                        : "text-[#FAF7F0]/80 hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#F1D98A] to-[#D4AF37] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Action Group */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {/* WhatsApp Shop Pill Button */}
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about your jewellery and gemstone collections."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/35 text-[#F6E7B4] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all duration-300 group"
                title="Direct Concierge on WhatsApp"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#48BB78] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38A169]"></span>
                </span>
                <MessageCircle className="w-3.5 h-3.5 text-[#48BB78] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">
                  Shop WhatsApp
                </span>
              </a>

              {/* Custom Karigari CTA */}
              <Link href="/custom-design" className="shrink-0">
                <button
                  type="button"
                  className="bg-gold-gradient text-[#04170F] px-4 py-2 rounded-xs text-[11px] uppercase tracking-[0.16em] font-semibold flex items-center gap-1.5 shadow-sm hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap gold-shimmer-sweep"
                >
                  <Sparkles className="w-3 h-3 text-[#04170F]" />
                  <span>Custom Karigari</span>
                </button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#FAF7F0] hover:text-[#D4AF37] focus:outline-none cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#D4AF37]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#F6E7B4]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Full-Screen Emerald Overlay Menu for Mobile & Tablet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-50 bg-[#04170F]/98 backdrop-blur-xl border-t border-[#D4AF37]/30 px-6 py-8 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#D4AF37]/70 block border-b border-[#D4AF37]/20 pb-2">
              Explore Vaidik Ratnam Collections
            </span>

            <div className="space-y-3 pt-2">
              {NAV_LINKS.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div>
                    <span className="font-serif text-2xl text-[#FAF7F0] group-hover:text-[#D4AF37] transition-colors block">
                      {link.label}
                    </span>
                    <span className="text-[11px] text-[#F1D98A]/60 font-sans block mt-0.5">
                      {link.desc}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all">
                    0{idx + 1} &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#D4AF37]/25 space-y-3">
            <Link
              href="/custom-design"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <button
                type="button"
                className="w-full bg-gold-gradient text-[#04170F] py-3 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-sm"
              >
                Order Custom Karigari &bull; Bespoke Jewellery
              </button>
            </Link>

            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about your jewellery and gemstone collections."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xs border border-[#D4AF37]/40 text-[#F6E7B4] text-xs font-mono uppercase tracking-wider hover:bg-white/5 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#48BB78]" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
