"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 select-none">
      {/* Interactive Tooltip Callout */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#04170F]/95 border border-[#D4AF37]/50 text-[#FAF7F0] px-3.5 py-2 rounded-xs shadow-xl backdrop-blur-md animate-fade-in text-xs max-w-xs">
          <div className="flex flex-col">
            <span className="font-serif font-semibold text-[#F1D98A] text-[11px] leading-tight">
              Sarafa Concierge Online
            </span>
            <span className="text-[10px] text-[#A8B6AF]">
              Instant jewellery quotes &bull; Ratna consultation
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-[#A8B6AF] hover:text-white ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Emerald & Gold Action Orb */}
      <a
        href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
          "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about certified gold jewellery and gemstones."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-13 h-13 rounded-full bg-[#0A2A1D] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp with Vaidik Ratnam"
      >
        {/* Ambient Pulsing Ring */}
        <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/40 animate-ping-slow pointer-events-none" />

        {/* Online Status Micro-Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#48BB78] border-2 border-[#04170F] shadow-xs" />

        <MessageCircle className="w-6 h-6 text-[#48BB78] group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
}

