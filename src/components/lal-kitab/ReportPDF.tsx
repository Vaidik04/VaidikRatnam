"use client";

import React from "react";
import { Printer, ShieldCheck } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

interface ReportPDFProps {
  personName?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  ayanamsa?: string;
  timezone?: string;
  edition?: string;
}

export function ReportPDF({
  personName = "Honoured Seeker",
  birthDate = "1994-08-15",
  birthTime = "14:30:00",
  birthPlace = "Varanasi, Uttar Pradesh, India",
  ayanamsa = "Chitrapaksha / Lahiri (23° 46' 58\")",
  timezone = "Asia/Kolkata (UTC+05:30)",
  edition = "1952 Gutka Edition (Pt. Roop Chand Joshi)",
}: ReportPDFProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 rounded-2xl border border-[#d4af37]/40 bg-[#04170f] text-white shadow-2xl space-y-6 print:border-none print:p-0 print:bg-white print:text-black">
      {/* Printable Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#d4af37]/30 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37] block">
            Sacred Astrological Record • लाल किताब कुण्डली
          </span>
          <h2 className="font-serif text-3xl text-white font-normal print:text-black">
            VaidikRatnam Lal Kitab Teva
          </h2>
        </div>

        <div className="print:hidden">
          <MagneticButton
            variant="gold"
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4 mr-1" />
            <span>Print / Save PDF Report</span>
          </MagneticButton>
        </div>
      </div>

      {/* Seeker Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#0a2a1d]/60 border border-white/10 text-xs font-mono print:bg-transparent print:border-black/20">
        <div>
          <span className="text-[#a8b6af] block text-[10px] uppercase">Seeker</span>
          <span className="text-[#f1d98a] font-bold print:text-black">{personName}</span>
        </div>
        <div>
          <span className="text-[#a8b6af] block text-[10px] uppercase">Date & Time</span>
          <span className="text-white print:text-black">{birthDate} at {birthTime}</span>
        </div>
        <div>
          <span className="text-[#a8b6af] block text-[10px] uppercase">Birth Place</span>
          <span className="text-white print:text-black truncate">{birthPlace}</span>
        </div>
        <div>
          <span className="text-[#a8b6af] block text-[10px] uppercase">Timezone Offset</span>
          <span className="text-white print:text-black">{timezone}</span>
        </div>
      </div>

      {/* Ephemeris & Authenticity Block */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#a8b6af] pt-4 border-t border-white/10 gap-2">
        <div className="flex items-center gap-1.5 text-[#d4af37]">
          <ShieldCheck className="w-4 h-4" />
          <span>Ayanamsa: {ayanamsa}</span>
        </div>
        <div>
          <span>Reference: {edition}</span>
        </div>
      </div>
    </div>
  );
}
