"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: number;
  author: string;
  location: string;
  jewelleryPiece: string;
  quote: string;
  stars: number;
  verifiedReview: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author: "Smt. Anuradha Trivedi & Family",
    location: "Varanasi",
    jewelleryPiece: "22K Traditional Nakshi Bridal Choker & Kada",
    quote:
      "For my daughter’s wedding, we wanted traditional nakshi work without the 25% making charge inflation of corporate brands. VaidikRatnam weighed every single piece in front of us on digital scales, showed the 6-digit HUID under a magnifying lens, and charged completely transparent making rates.",
    stars: 5,
    verifiedReview: true,
  },
  {
    id: 2,
    author: "Dr. Raghavendra Shukla",
    location: "Prayagraj",
    jewelleryPiece: "Untreated Ceylon Blue Sapphire (Neelam) Ring",
    quote:
      "Most gemstone dealers sell glass-filled heated stones under astrological pretext. The shop's father examined my Janma Kundali thoroughly and spent 45 minutes explaining why an unheated stone was essential. The govt laboratory report confirmed zero thermal treatment.",
    stars: 5,
    verifiedReview: true,
  },
  {
    id: 3,
    author: "Vikram & Meera Singhania",
    location: "Jaipur",
    jewelleryPiece: "Bespoke Antique Kalash Pendant (Old Gold Remake)",
    quote:
      "We brought grandmother’s antique gold necklace which had lost its clasp. Rather than melting it down at a heavy loss, their hereditary karigars restored the open-back prongs and gave us an itemized receipt with exact net gold weight down to the milligram.",
    stars: 5,
    verifiedReview: true,
  },
  {
    id: 4,
    author: "Pooja Bhasin",
    location: "Delhi",
    jewelleryPiece: "Zambian Emerald (Panna) in 18K Gold Chhidra Setting",
    quote:
      "The custom open-back Chhidra setting allows sunlight to touch the skin directly for planetary harmony. The craftsmanship is flawless, and the guidance was entirely honest—no fear tactics whatsoever.",
    stars: 5,
    verifiedReview: true,
  },
];

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="relative py-28 bg-[#04170f] text-white overflow-hidden border-t border-[#d4af37]/25">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#0a2a1d]/60 via-[#04170f] to-[#04170f] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Family Trust Across Generations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Voices of Families We Have Adorned
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#a8b6af]">
            Real patron experiences verified through in-person studio visits and bespoke commissions.
          </p>
        </div>

        {/* 3D Curved Central Presentation Card */}
        <div className="relative max-w-3xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0a2a1d] to-[#04170f] border-2 border-[#d4af37]/40 shadow-2xl backdrop-blur-xl relative transition-all duration-500">
            {/* Corner Filigree */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#d4af37]/50" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[#d4af37]/50" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[#d4af37]/50" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#d4af37]/50" />

            {/* Stars & Google Verified Tag */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-1 text-[#f5c518]">
                {Array.from({ length: current.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#a8b6af] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Verified Studio Patron</span>
              </div>
            </div>

            {/* Quote Body */}
            <blockquote className="font-serif italic text-lg sm:text-2xl text-[#f1d98a] leading-relaxed mb-6">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author & Piece metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-white/10 gap-2">
              <div>
                <h4 className="font-serif text-lg text-white font-medium">
                  {current.author}
                </h4>
                <span className="text-xs font-mono text-[#a8b6af]">
                  {current.location}
                </span>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block">
                  Commissioned Masterpiece:
                </span>
                <span className="text-xs text-[#e2ece7]">
                  {current.jewelleryPiece}
                </span>
              </div>
            </div>
          </div>

          {/* Controls: Left & Right navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#d4af37]/40 bg-[#0a2a1d] text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#04170f] transition-all cursor-pointer shadow-lg"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-8 bg-[#d4af37]"
                      : "w-2 bg-[#d4af37]/30 hover:bg-[#d4af37]/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#d4af37]/40 bg-[#0a2a1d] text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#04170f] transition-all cursor-pointer shadow-lg"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
