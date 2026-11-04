"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, MessageCircle, ArrowRight, ShieldCheck, Scale } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface VisitShowcaseProps {
  whatsappPhone?: string;
  shopAddress?: string;
}

export function VisitShowcase({
  whatsappPhone = "919876543210",
  shopAddress = "Sarafa Bazaar, Varanasi, Uttar Pradesh 221001",
}: VisitShowcaseProps) {
  return (
    <section className="relative py-28 bg-[#04170f] text-white overflow-hidden border-t border-[#d4af37]/25">
      {/* Giant Outlined Headline Watermark Behind */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 text-[10vw] font-serif font-black tracking-widest text-transparent uppercase select-none pointer-events-none opacity-5 whitespace-nowrap z-0"
        style={{
          WebkitTextStroke: "2px #d4af37",
        }}
      >
        WEIGH GOLD IN FRONT OF YOU
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#0a2a1d] via-[#04170f] to-[#04170f] border-2 border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#d4af37]/15 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 cols: Sanctuary Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f1d98a] text-xs font-mono uppercase tracking-widest">
                <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Zero-Compromise In-Store Experience</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                Come, Weigh Gold in{" "}
                <span className="italic text-gold-gradient block mt-1">
                  Front of Your Eyes
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#a8b6af] leading-relaxed font-light">
                Jewellery and genuine gemstones are lifelong family investments. Step into our family sanctuary, sit over warm tea, inspect gemstones under true daylight with 10x magnification loupes, and watch every milligram verified on certified digital scales.
              </p>

              {/* Hours & Address Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-mono">
                <div className="p-4 rounded-xl bg-[#04170f]/80 border border-white/10 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white mb-0.5">Sanctuary Address:</strong>
                    <span className="text-[#a8b6af]">{shopAddress}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#04170f]/80 border border-white/10 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <strong className="text-white">Sanctuary Hours:</strong>
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                        Open Today
                      </span>
                    </div>
                    <span className="text-[#a8b6af]">Mon &ndash; Sat: 10:30 AM &ndash; 8:30 PM<br />Sun: 11:00 AM &ndash; 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-[#a8b6af]">
                <div className="flex items-center gap-1.5 text-[#f1d98a]">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Govt. Approved Assay Scale</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#f1d98a]">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Natural Daylight Viewing Area</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Actions & Concierge Booking */}
            <div className="lg:col-span-5 flex flex-col gap-4 p-6 sm:p-8 rounded-2xl bg-[#04170f]/90 border border-[#d4af37]/30 shadow-xl">
              <h3 className="font-serif text-xl text-white">
                Plan a Private Family Visit
              </h3>
              <p className="text-xs text-[#a8b6af] leading-relaxed">
                Reserve an appointment with our master karigar or Vedic astrologer for undivided personal attention.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                    "Namaste VaidikRatnam, I would like to schedule a personal visit to your shop to inspect jewellery and gemstones."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <MagneticButton
                    variant="gold"
                    className="w-full py-3.5 px-6 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reserve via WhatsApp Concierge</span>
                  </MagneticButton>
                </a>

                <Link href="/consultation/request" className="w-full block">
                  <MagneticButton
                    variant="outline"
                    className="w-full py-3.5 px-6 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <span>Request Kundali Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>

                <Link href="/contact" className="w-full block text-center">
                  <span className="text-xs font-mono text-[#d4af37] hover:text-[#f6e7b4] transition-colors">
                    View Google Map & Driving Directions &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
