import React from "react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing quotation requests, shop visits, and custom jewellery orders.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0a2a1d] border border-[#d4af37]/50 flex items-center justify-center p-2.5 shrink-0 shadow-xl">
            <Image
              src="/images/brand/element-sun-transparent.png"
              alt="Sun Nakshatra"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-1">
              Shop Policies &bull; Operating Terms
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Terms of Service
            </h1>
            <p className="text-xs text-[#a8b6af] mt-1 font-mono">Operating Version: v1 (Shop Enquiry &amp; In-Person Collection Model)</p>
          </div>
        </div>

        <Card className="p-8 sm:p-10 bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl shadow-2xl space-y-6 text-xs sm:text-sm text-[#e2ece7] leading-relaxed backdrop-blur-md">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#f6e7b4] font-normal">1. Nature of the Website</h2>
            <p className="text-[#626A65]">
              VaidikRatnam.com operates as a digital shop catalogue, educational guide, and quotation/enquiry website for an established Indian family jewellery business.
            </p>
            <p className="text-[#626A65]">
              <strong>Operating Constraint:</strong> The website does not provide automated remote commerce checkout, debit/credit card processing, or nationwide courier dispatch. All product purchases, physical weight verifications on digital scales, and collections take place in person at our family jewellery shop.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">2. Quotations &amp; Gold Rate Validity</h2>
            <p className="text-[#626A65]">
              Because fine gold prices fluctuate daily in national and international markets:
            </p>
            <ul className="list-disc pl-5 text-[#626A65] space-y-1">
              <li>Preliminary estimates produced via our online tools or preliminary quote requests are indicative only.</li>
              <li>Official written quotations issued by our shop specify an explicit validity period (typically 24 to 48 hours) tied to the current gold market rate.</li>
              <li>The final transaction price is confirmed upon shop invoice issuance based on assayed net gold weight.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">3. Hallmarking &amp; Assaying</h2>
            <p className="text-[#626A65]">
              All precious gold articles sold by Vaidik Ratnam conform strictly to Bureau of Indian Standards (BIS) hallmarking regulations, stamped with the purity designation (22K916 / 18K750) and official 6-digit HUID code.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

