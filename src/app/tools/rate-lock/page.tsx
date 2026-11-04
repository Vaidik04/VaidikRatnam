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
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header rates={rates} />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a2a1d] border border-[#d4af37]/40 text-[#f1d98a] text-xs uppercase tracking-[0.2em] font-mono font-semibold shadow-md">
            <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Protect Against Market Spikes</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Lock Today&apos;s Gold Rate
          </h1>

          <p className="text-xs sm:text-sm text-[#a8b6af] leading-relaxed font-light">
            Gold prices fluctuate daily. If you have an upcoming wedding, anniversary, or auspicious occasion, lock in today&apos;s benchmark rate with a small token advance. Your rate remains fixed for up to 30 days.
          </p>
        </div>

        {/* 3 Step Benefits Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#0a2a1d]/85 border border-[#d4af37]/30 space-y-2 shadow-xl backdrop-blur-md">
            <div className="w-9 h-9 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Lock className="w-4 h-4" />
            </div>
            <strong className="text-sm font-serif text-[#f6e7b4] block">
              1. Fixed Rate Guarantee
            </strong>
            <p className="text-xs text-[#a8b6af] font-light leading-snug">
              If market rates rise, you still pay your locked rate. If rates drop significantly, we discuss fair market adjustments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a2a1d]/85 border border-[#d4af37]/30 space-y-2 shadow-xl backdrop-blur-md">
            <div className="w-9 h-9 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Scale className="w-4 h-4" />
            </div>
            <strong className="text-sm font-serif text-[#f6e7b4] block">
              2. 100% Adjustable
            </strong>
            <p className="text-xs text-[#a8b6af] font-light leading-snug">
              Every rupee of your token advance is adjusted against the final jewellery invoice when you visit our shop.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a2a1d]/85 border border-[#d4af37]/30 space-y-2 shadow-xl backdrop-blur-md">
            <div className="w-9 h-9 rounded-full bg-[#04170f] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <strong className="text-sm font-serif text-[#f6e7b4] block">
              3. Certified 6-Digit HUID
            </strong>
            <p className="text-xs text-[#a8b6af] font-light leading-snug">
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
