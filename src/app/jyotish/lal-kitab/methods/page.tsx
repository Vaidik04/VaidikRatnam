import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import editionsData from "@/lib/lal-kitab/data/editions.json";

export const metadata = {
  title: "Methods & Ephemeris Sources — Lal Kitab Jyotish | Vaidik Ratnam",
  description: "Complete transparency into our astronomical calculation engines, reference editions, ayanamsa, and scholarly review processes.",
};

export default function LalKitabMethodsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#04170F] text-[#FAF7F0] selection:bg-[#D4AF37]/30 selection:text-white">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-10">
        <Link
          href="/jyotish/lal-kitab"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#D4AF37] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Lal Kitab Calculator</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8E1B2E]/25 border border-[#8E1B2E]/60 text-[#F6E7B4] text-xs font-mono uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#F1D98A]" />
            <span>Calculation Transparency &amp; Scholarly Charter</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Methods, Sources &amp; Astrological Charter
          </h1>
          <p className="text-sm text-[#A8B6AF] font-light leading-relaxed">
            Astrological trust relies entirely on technical integrity, historical rigor, and ethical safety. We transparently disclose the exact formulas, editions, and scholars reviewing this system.
          </p>
        </div>

        {/* 1. Reference Editions */}
        <section className="bg-white/5 border border-[#D4AF37]/40 rounded-xs p-6 space-y-4">
          <h2 className="font-serif text-xl text-[#F6E7B4] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span>Reference Editions</span>
          </h2>
          <div className="space-y-4 text-xs text-[#FAF7F0]/90">
            {editionsData.editions.map((ed) => (
              <div key={ed.id} className="p-4 rounded-xs bg-[#04170F] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-serif text-white">{ed.name}</strong>
                  <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F1D98A] text-[10px] font-mono">
                    {ed.status}
                  </span>
                </div>
                <p className="text-xs text-[#A8B6AF]">{ed.description}</p>
                <div className="pt-2 border-t border-white/5 flex flex-wrap gap-4 text-[11px] font-mono text-[#D4AF37]">
                  <span>Reviewer: {ed.reviewer}</span>
                  <span>&bull;</span>
                  <span>Reviewed: {ed.lastReviewedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Technical Ephemeris Specification */}
        <section className="bg-white/5 border border-[#D4AF37]/40 rounded-xs p-6 space-y-4 text-xs text-[#FAF7F0]/90 leading-relaxed">
          <h2 className="font-serif text-xl text-[#F6E7B4]">
            Technical Astronomical Ephemeris
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#48BB78] shrink-0 mt-0.5" />
              <span><strong>Ayanamsa:</strong> Chitrapaksha / Lahiri sidereal standard (~23.85&deg; at J2000 with 50.29&quot;/year precession).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#48BB78] shrink-0 mt-0.5" />
              <span><strong>Calculation Precision:</strong> Truncated VSOP87 analytical planetary algorithms yielding sub-arcminute agreement with Drik Panchang and Swiss Ephemeris.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#48BB78] shrink-0 mt-0.5" />
              <span><strong>Historical Timezones:</strong> Automatic detection of India&apos;s WWII War Time (+06:30 from 1942 to 1945) and standard IST (+05:30).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#48BB78] shrink-0 mt-0.5" />
              <span><strong>Chart Paradigm:</strong> Fixed Kal Purush diamond kundali where Aries (Mesha) is eternally House 1.</span>
            </li>
          </ul>
        </section>

        {/* 3. Safety & DPDP Act 2023 Compliance */}
        <section className="caution-ruby-glass p-6 space-y-3 text-xs leading-relaxed">
          <h2 className="font-serif text-lg text-[#F6E7B4]">
            Privacy &amp; DPDP Act 2023 Compliance
          </h2>
          <p>
            Birth coordinates and timestamps entered on this website are classified as personal data under India&apos;s Digital Personal Data Protection (DPDP) Act 2023. Calculations are processed purely in-memory and are never stored in databases or shared with third parties without explicit affirmative consent.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
