import React from "react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Cancellation & Refund Policy",
  description: "Terms governing shop visit cancellations and custom jewellery orders.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0a2a1d] border border-[#d4af37]/50 flex items-center justify-center p-2.5 shrink-0 shadow-xl">
            <Image
              src="/images/brand/element-lotus-transparent.png"
              alt="Sacred Lotus"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-1">
              Shop Policies &bull; Fair &amp; Clear Terms
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="text-xs text-[#a8b6af] mt-1 font-mono">Applicable to Shop Visits, Consultations &amp; Custom Orders</p>
          </div>
        </div>

        <Card className="p-8 sm:p-10 bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl shadow-2xl space-y-6 text-xs sm:text-sm text-[#e2ece7] leading-relaxed backdrop-blur-md">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#f6e7b4] font-normal">1. Shop Visit Appointments</h2>
            <p className="text-[#a8b6af]">
              Shop visit appointments are completely free of charge. If you need to reschedule or cancel your visit, we kindly request at least 4 hours notice via WhatsApp or phone call so we can adjust our schedule.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">2. Astrology Consultations</h2>
            <p className="text-[#626A65]">
              Appointments may be rescheduled or cancelled up to 24 hours prior to the scheduled time without penalty. As consultations involve dedicated Kundali preparation by our senior astrologer, same-day cancellations may be subject to a nominal rescheduling fee if mutually agreed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">3. Custom Jewellery Orders (Karigari)</h2>
            <p className="text-[#626A65]">
              Once a custom jewellery order is approved and our karigars begin work (melting gold, handcrafting, or sourcing specific gemstones), the advance deposit covers actual artisan labour and gold working costs. If cancelled after work has started:
            </p>
            <ul className="list-disc pl-5 text-[#626A65] space-y-1">
              <li>The precious metal value will be calculated based on the net weight at current market rate.</li>
              <li>Actual making charges and stone setting costs incurred up to the date of cancellation will be deducted from the refund.</li>
            </ul>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

