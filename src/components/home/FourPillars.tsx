"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PillarItemType } from "@/components/3d/components/Pillars3D";

const ViewPortal = dynamic(
  () => import("@/components/3d/canvas/ViewPortal").then((m) => m.ViewPortal),
  { ssr: false }
);
const PillarItem3D = dynamic(
  () => import("@/components/3d/components/Pillars3D").then((m) => m.PillarItem3D),
  { ssr: false }
);

interface PillarData {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  devanagari: string;
  description: string;
  linkText: string;
  href: string;
  type3D: PillarItemType;
  accentColor: string;
}

const PILLARS: PillarData[] = [
  {
    id: "purity",
    num: "01",
    title: "Spiritual Purity",
    subtitle: "In-House Hereditary Karigari",
    devanagari: "कमल • पवित्रता",
    description:
      "Crafted with temple sanctum discipline in Varanasi and Jaipur. We do not source mass-produced commercial gold. Every ornament is molten and chased in front of digital scales.",
    linkText: "Discover Master Karigari",
    href: "/about",
    type3D: "kalash",
    accentColor: "#d4af37",
  },
  {
    id: "illumination",
    num: "02",
    title: "Vedic Illumination",
    subtitle: "Parashari Jyotish Principles",
    devanagari: "सूर्य • नक्षत्र",
    description:
      "Authentic astrological guidance rooted in Brihat Parashara Hora Shastra. If a Kundali does not genuinely need a gemstone, our family astrologer will plainly advise against buying one.",
    linkText: "Explore Jyotish Guidance",
    href: "/astrology",
    type3D: "medallion",
    accentColor: "#f1d98a",
  },
  {
    id: "gemstones",
    num: "03",
    title: "Certified Untreated Stones",
    subtitle: "Natural Earth-Mined Ratnas",
    devanagari: "रत्न • सत्य",
    description:
      "Zero beryllium treatment, zero glass-filling, zero synthetic lab stimulants. We offer only pure, unheated Ceylon Sapphires, Zambian Emeralds, and Burmese Rubies with govt-approved lab reports.",
    linkText: "View Genuine Gemstones",
    href: "/gemstones",
    type3D: "gemstone",
    accentColor: "#0f7a4a",
  },
  {
    id: "hallmarking",
    num: "04",
    title: "Janma Kundali & 6-Digit HUID",
    subtitle: "100% BIS Hallmarked Purity",
    devanagari: "कुण्डली • मानक",
    description:
      "Government 6-digit laser HUID (Hallmark Unique Identification) traceable instantly on the official BIS Care App. Net gold weight strictly separated from gems and lac.",
    linkText: "Verify Hallmarking Standards",
    href: "/tools/jewellery-buying-checklist",
    type3D: "hallmark",
    accentColor: "#d4af37",
  },
];

export function FourPillars() {
  const [activePillar, setActivePillar] = useState<string>("purity");

  return (
    <section className="relative py-24 bg-[#04170f] text-white overflow-hidden border-b border-[#d4af37]/25">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-[#0a2a1d] via-[#04170f] to-[#04170f] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Four Sacred Pillars</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Grounded in Sacred Tradition,{" "}
            <span className="italic text-gold-gradient block mt-1">
              Guaranteed by Metrology
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#a8b6af] max-w-lg mx-auto">
            Our three-generation family code: spiritual truth in astrology, uncompromising purity in gold, and zero hidden weight deductions.
          </p>
        </div>

        {/* Expanding Accordion Desktop & Stacked Mobile */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[480px]">
          {PILLARS.map((p) => {
            const isActive = activePillar === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={`relative rounded-2xl overflow-hidden border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "lg:flex-[3] bg-[#0a2a1d] border-[#d4af37] shadow-2xl shadow-[#d4af37]/15 p-8"
                    : "lg:flex-[1] bg-[#04170f]/80 border-[#d4af37]/25 hover:border-[#d4af37]/50 p-6"
                }`}
              >
                {/* Top Number & Devanagari */}
                <div className="flex items-center justify-between z-10">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#d4af37]/60 group-hover:text-[#d4af37]">
                    {p.num}
                  </span>
                  <span className="font-serif text-xs text-[#a8b6af] tracking-wider">
                    {p.devanagari}
                  </span>
                </div>

                {/* Inactive Vertical Title (Desktop Only) */}
                {!isActive && (
                  <div className="hidden lg:flex flex-1 items-center justify-center my-6">
                    <span className="font-serif text-xl text-white/90 tracking-wide rotate-[-90deg] whitespace-nowrap">
                      {p.title}
                    </span>
                  </div>
                )}

                {/* Active Expanded Content & 3D Object */}
                {isActive && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-10">
                    <div className="md:col-span-7 space-y-4">
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d4af37]">
                        {p.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#e2ece7] leading-relaxed">
                        {p.description}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={p.href}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#d4af37] hover:text-[#f6e7b4] transition-colors"
                        >
                          <span>{p.linkText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Waking 3D Object Viewport */}
                    <div className="md:col-span-5 h-48 md:h-64 relative">
                      <ViewPortal
                        className="w-full h-full"
                        cameraPosition={[0, 0, 3.2]}
                        fallback={
                          <div className="w-full h-full flex items-center justify-center">
                            <Sparkles className="w-10 h-10 text-[#d4af37] animate-pulse" />
                          </div>
                        }
                      >
                        <PillarItem3D type={p.type3D} isHovered={true} />
                      </ViewPortal>
                    </div>
                  </div>
                )}

                {/* Bottom Hairline */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#a8b6af] z-10">
                  <span>Pillar {p.num} of 04</span>
                  <span className="text-[#d4af37]">{isActive ? "Inspecting" : "Tap to Expand"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
