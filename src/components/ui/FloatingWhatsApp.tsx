"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none print:hidden">
      {/* Discreet Luxury WhatsApp Concierge Orb (Collision-Free) */}
      <a
        href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
          "Namaste Vaidik Ratnam, I am reaching out from your website to enquire about certified gold jewellery and gemstones."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 rounded-full bg-[#04170f]/95 border-2 border-[#25D366] shadow-[0_0_24px_rgba(37,211,102,0.35)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
        title="WhatsApp Studio Concierge"
        aria-label="Chat on WhatsApp with Vaidik Ratnam Concierge"
      >
        {/* Ambient Pulsing Ring */}
        <span className="absolute -inset-1 rounded-full border border-[#25D366]/40 animate-ping-slow pointer-events-none" />

        {/* Online Status Micro-Badge */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366] border-2 border-[#04170f]"></span>
        </span>

        <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />

        {/* Elegant Micro Hover Label */}
        <span className="absolute right-14 px-3 py-1 bg-[#04170f]/95 border border-[#25D366]/40 text-[#25D366] text-[10px] font-mono uppercase tracking-wider rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          WhatsApp Concierge
        </span>
      </a>
    </div>
  );
}
