import React from "react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Gemstone & Ratna Disclosure Policy",
  description: "Transparency guidelines on gemstone species, thermal and clarity enhancements, and laboratory reporting standards.",
};

export default function GemstoneDisclosurePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0F3D2E]/5 border border-[#D4AF37]/50 flex items-center justify-center p-2.5 shrink-0 shadow-2xs">
            <Image
              src="/images/brand/element-gemstone-transparent.png"
              alt="Ratna Gemstone"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block mb-1">
              Gemological Standards &bull; CIBJO &amp; GIA Compliance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#182522] font-normal">
              Gemstone Disclosure Policy
            </h1>
            <p className="text-xs text-[#626A65] mt-1">Full disclosure standard for natural, treated, and certified stones</p>
          </div>
        </div>

        <Card className="p-8 sm:p-10 bg-white border border-[#E2D7C5] rounded-xs shadow-xs space-y-6 text-xs sm:text-sm text-[#182522] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">1. Absolute Classification Transparency</h2>
            <p className="text-[#626A65]">
              Vaidik Ratnam adheres to international gemological reporting standards (as established by CIBJO, GIA, and recognized testing authorities). We categorize every colored stone and diamond under one of three clear classifications:
            </p>
            <ul className="list-disc pl-5 text-[#626A65] space-y-1">
              <li><strong>Natural Untreated:</strong> Mined from the earth with no enhancement other than physical cutting and polishing.</li>
              <li><strong>Natural with Disclosed Treatment:</strong> Natural stones subjected to traditional thermal heat or minor oiling. The exact nature of treatment is explicitly documented on quotes and invoices.</li>
              <li><strong>Synthetic / Lab-Grown:</strong> Stones crystallized in laboratory environments. These are never sold as natural gemstones or traditional astrological Ratna.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">2. The Rule on Lead-Glass and Composite Stones</h2>
            <p className="text-[#626A65]">
              We strictly <strong>do not sell</strong> lead-glass filled composite rubies, fracture-filled sapphires, or dyed imitation beryls under the guise of natural gemstones. Such composite materials are fragile, unstable, and have minimal intrinsic value.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">3. Astrological Suitability Disclaimers</h2>
            <p className="text-[#626A65]">
              Astrological gemstone guidance is shared from traditional Vedic knowledge. While we provide genuine natural stones with clarity and certified origin, wearing a gemstone does not guarantee supernatural, financial, or medical miracles.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

