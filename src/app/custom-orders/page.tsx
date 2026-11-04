import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Custom Orders & Bespoke Commission Policy",
  description: "Standard artisan procedures, weight tolerance allowances, and hallmarking for bespoke fine jewellery.",
};

export default function CustomOrdersPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-1">
            Studio Craftsmanship &bull; Hand Fabrication Protocol
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Custom Orders &amp; Bespoke Policy
          </h1>
          <p className="text-xs text-[#a8b6af] mt-1 font-mono">Our standard handcrafting workflow, assay tolerances, and client agreements</p>
        </div>

        <Card className="p-8 sm:p-10 bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl shadow-2xl space-y-6 text-xs sm:text-sm text-[#e2ece7] leading-relaxed backdrop-blur-md">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#f6e7b4] font-normal">1. Handcrafted Weight Tolerances</h2>
            <p className="text-[#a8b6af]">
              Fine traditional goldsmithing involves manual chasing, filing, soldering, and hand-polishing. Because each article is crafted individually by karigars rather than stamped on an automated industrial line, the final finished net gold weight may vary slightly from the preliminary estimate (typically within a ±5% to ±8% tolerance margin).
            </p>
            <p className="text-[#f1d98a] font-mono text-xs">
              <strong>Fair Billing Standard:</strong> The final invoice is calculated strictly on the actual scale net weight upon completion, never on estimated theoretical weight.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#f6e7b4] font-normal">2. Production Milestones &amp; Timelines</h2>
            <p className="text-[#a8b6af]">
              Standard bespoke jewellery requires between 2 to 4 weeks depending on the complexity of stone settings, filigree, and hallmarking queue. Clients receive update notifications at key milestones: preliminary design approval, stone setting inspection, and post-hallmark completion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#f6e7b4] font-normal">3. Remodelling Heirloom Gold</h2>
            <p className="text-[#a8b6af]">
              When clients provide family gold for repurposing or melting into new ornaments, the gold is weighed and assayed in the client&apos;s presence. An official assay melting receipt is issued confirming gross weight, expected purity, and deduction for solder/enamel before casting.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

