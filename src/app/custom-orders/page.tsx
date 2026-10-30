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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B08D57] font-semibold block mb-1">
            Studio Craftsmanship &bull; Hand Fabrication Protocol
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#182522] font-normal">
            Custom Orders &amp; Bespoke Policy
          </h1>
          <p className="text-xs text-[#626A65] mt-1">Our standard handcrafting workflow, assay tolerances, and client agreements</p>
        </div>

        <Card className="p-8 sm:p-10 bg-white border border-[#E2D7C5] rounded-xs shadow-xs space-y-6 text-xs sm:text-sm text-[#182522] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">1. Handcrafted Weight Tolerances</h2>
            <p className="text-[#626A65]">
              Fine traditional goldsmithing involves manual chasing, filing, soldering, and hand-polishing. Because each article is crafted individually by karigars rather than stamped on an automated industrial line, the final finished net gold weight may vary slightly from the preliminary estimate (typically within a ±5% to ±8% tolerance margin).
            </p>
            <p className="text-[#626A65]">
              <strong>Fair Billing Standard:</strong> The final invoice is calculated strictly on the actual scale net weight upon completion, never on estimated theoretical weight.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">2. Production Milestones &amp; Timelines</h2>
            <p className="text-[#626A65]">
              Standard bespoke jewellery requires between 2 to 4 weeks depending on the complexity of stone settings, filigree, and hallmarking queue. Clients receive update notifications at key milestones: preliminary design approval, stone setting inspection, and post-hallmark completion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">3. Remodelling Heirloom Gold</h2>
            <p className="text-[#626A65]">
              When clients provide family gold for repurposing or melting into new ornaments, the gold is weighed and assayed in the client&apos;s presence. An official assay melting receipt is issued confirming gross weight, expected purity, and deduction for solder/enamel before casting.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

