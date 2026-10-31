import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeGoldEstimator } from "@/components/home/HomeGoldEstimator";
import { fetchLiveBullionRates } from "@/lib/services/gold-rates";
import { Lock, ShieldCheck, Scale } from "lucide-react";

export const metadata = {
  title: "Rate Lock & Token Advance — Vaidik Ratnam",
  description:
    "Lock in today's live bullion market rate for 22K & 24K gold with an advance token deposit for upcoming family weddings or ceremonies.",
};

export default async function RateLockPage() {
  let rates = { gold24k: 8150, gold22k: 7470, silver: 98 };
  try {
    const live = await fetchLiveBullionRates();
    if (live?.success && live?.rates) {
      rates = {
        gold24k: live.rates.gold24kPerGram,
        gold22k: live.rates.gold22kPerGram,
        silver: live.rates.silverPerGram,
      };
    }
  } catch (e) {
    console.error("Live rates error on rate-lock page:", e);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F5EB] text-[#4B3F36]">
      <Header rates={rates} />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F3D2E]/10 border border-[#D4AF37]/40 text-[#0F3D2E] text-xs uppercase tracking-[0.2em] font-semibold">
            <Lock className="w-3.5 h-3.5 text-[#B59328]" />
            <span>Protect Against Market Spikes</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#0F3D2E] font-normal tracking-tight">
            Lock Today&apos;s Gold Rate
          </h1>

          <p className="text-xs sm:text-sm text-[#4B3F36] leading-relaxed font-light">
            Gold prices fluctuate daily. If you have an upcoming wedding, anniversary, or auspicious occasion, lock in today&apos;s benchmark rate with a small token advance. Your rate remains fixed for up to 30 days.
          </p>
        </div>

        {/* 3 Step Benefits Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xs bg-white border border-[#E8DFC8] space-y-1.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#0F3D2E]/10 flex items-center justify-center text-[#0F3D2E]">
              <Lock className="w-4 h-4 text-[#0F3D2E]" />
            </div>
            <strong className="text-xs font-serif text-[#0F3D2E] block">
              1. Fixed Rate Guarantee
            </strong>
            <p className="text-[11px] text-[#4B3F36] font-light leading-snug">
              If market rates rise, you still pay your locked rate. If rates drop significantly, we discuss fair market adjustments.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-white border border-[#E8DFC8] space-y-1.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#0F3D2E]/10 flex items-center justify-center text-[#0F3D2E]">
              <Scale className="w-4 h-4 text-[#0F3D2E]" />
            </div>
            <strong className="text-xs font-serif text-[#0F3D2E] block">
              2. 100% Adjustable
            </strong>
            <p className="text-[11px] text-[#4B3F36] font-light leading-snug">
              Every rupee of your token advance is adjusted against the final jewellery invoice when you visit our shop.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-white border border-[#E8DFC8] space-y-1.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#0F3D2E]/10 flex items-center justify-center text-[#0F3D2E]">
              <ShieldCheck className="w-4 h-4 text-[#0F3D2E]" />
            </div>
            <strong className="text-xs font-serif text-[#0F3D2E] block">
              3. Certified 6-Digit HUID
            </strong>
            <p className="text-[11px] text-[#4B3F36] font-light leading-snug">
              Delivered exclusively in 100% BIS hallmarked 22K (916) or 18K (750) with verified laser inscription.
            </p>
          </div>
        </div>

        {/* Live Rate Lock Calculator */}
        <HomeGoldEstimator initialRates={rates} />
      </main>

      <Footer />
    </div>
  );
}
