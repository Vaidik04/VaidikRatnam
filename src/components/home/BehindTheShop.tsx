"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, Scale, ShieldCheck, Compass } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const TIMELINE_EVENTS = [
  {
    year: "1968",
    title: "The Sarafa Workshop",
    desc: "Our grandfather begins refining gold and crafting classical nakshi ornaments by hand in the traditional Sarafa Bazaar.",
  },
  {
    year: "1994",
    title: "Vedic Gemology & Chhidra Settings",
    desc: "Our father introduces certified unheated Ratnas, integrating classical Parashari Jyotish and open-back sun-aperture ring settings.",
  },
  {
    year: "Present",
    title: "100% Digital Metrology & 6-Digit HUID",
    desc: "Third generation brings precision digital scales, instant BIS laser verification, and transparent net-weight billing.",
  },
];

export function BehindTheShop() {
  return (
    <section className="relative py-28 bg-[#04170f] text-white overflow-hidden border-t border-[#d4af37]/25">
      {/* Background Rotating Mandala */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-5 pointer-events-none animate-spin-slow">
        <Image
          src="/images/brand/element-astrology-circle-transparent.png"
          alt="Mandala"
          width={700}
          height={700}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Serif Italic Pull Quote */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] mb-4">
            <HeartHandshake className="w-4 h-4" />
            <span>Three Generations of Trust</span>
          </div>
          <blockquote className="font-serif italic text-2xl sm:text-4xl text-[#f1d98a] leading-relaxed">
            &ldquo;Gold purity is a matter of sacred honor. We weigh every piece before your eyes on certified digital scales, with zero hidden deductions.&rdquo;
          </blockquote>
          <cite className="block mt-4 text-xs font-mono uppercase tracking-widest text-[#a8b6af] not-italic">
            &mdash; The VaidikRatnam Family Goldsmith Code
          </cite>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Parallax Sanctuary Photo Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#d4af37]/50 shadow-2xl bg-black">
              <Image
                src="/images/father-sanctuary.jpg"
                alt="Vaidik Ratnam Multi-Generational Family Shop Sanctuary"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04170f] via-transparent to-transparent pointer-events-none" />

              {/* Velvet Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0a2a1d]/90 border border-[#d4af37]/40 backdrop-blur-md">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] block mb-1">
                  Family Sanctuary &bull; Varanasi
                </span>
                <p className="font-serif text-sm text-white">
                  Where heirloom jewellery is weighed in front of you and natural Ratnas are inspected under true daylight.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Drawn Timeline & Heritage Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                An Authentic Traditional Shop,{" "}
                <span className="italic text-gold-gradient block mt-1">
                  Never a Corporate Showroom
                </span>
              </h3>
              <p className="text-sm text-[#a8b6af] leading-relaxed font-light">
                When you step into our shop, you sit with our family. We pour you warm tea, lay out raw velvet trays, and explain the exact breakdown of bullion weight, stone carats, and making charges.
              </p>
            </div>

            {/* Vertical Timeline */}
            <div className="relative border-l border-[#d4af37]/40 pl-6 ml-2 space-y-8">
              {TIMELINE_EVENTS.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node on Timeline */}
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#04170f] border-2 border-[#d4af37] group-hover:bg-[#d4af37] transition-colors" />

                  <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-1">
                    {item.year}
                  </div>
                  <h4 className="font-serif text-lg text-white font-medium">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#a8b6af] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 3 Family Pillars Micro-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0a2a1d]/60 border border-[#d4af37]/20">
                <Scale className="w-5 h-5 text-[#d4af37] mb-2" />
                <h5 className="font-serif text-sm text-white">Digital Metrology</h5>
                <p className="text-[11px] text-[#a8b6af] mt-1 font-light">
                  Exact net weight verification on zero-error balances.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a2a1d]/60 border border-[#d4af37]/20">
                <ShieldCheck className="w-5 h-5 text-[#d4af37] mb-2" />
                <h5 className="font-serif text-sm text-white">6-Digit HUID</h5>
                <p className="text-[11px] text-[#a8b6af] mt-1 font-light">
                  Direct BIS Care verification for every gram of gold.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a2a1d]/60 border border-[#d4af37]/20">
                <Compass className="w-5 h-5 text-[#d4af37] mb-2" />
                <h5 className="font-serif text-sm text-white">Parashari Ethics</h5>
                <p className="text-[11px] text-[#a8b6af] mt-1 font-light">
                  Non-fear guidance. Never buy a stone if not indicated.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/about">
                <MagneticButton variant="gold" className="px-6 py-3 text-xs font-mono uppercase tracking-wider">
                  Read Our Shop Heritage &rarr;
                </MagneticButton>
              </Link>
              <Link href="/contact">
                <MagneticButton variant="outline" className="px-6 py-3 text-xs font-mono uppercase tracking-wider">
                  Plan Your Shop Visit
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
