import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { repo } from "@/lib/db/repo";
import { CheckCircle2, Clock, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default async function CustomDesignReceivedPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const design = await repo.getCustomDesignByReference(reference);

  return (
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        <Card className="p-8 sm:p-10 bg-[#0a2a1d]/90 border border-[#d4af37]/40 rounded-3xl text-center space-y-6 shadow-2xl backdrop-blur-md">
          {/* Brand Emblem & Success Badge */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#04170f] border-2 border-[#d4af37] flex items-center justify-center p-3 shadow-xl">
              <Image
                src="/images/brand/icon-full-color-transparent.png"
                alt="Vaidik Ratnam"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] text-xs font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Brief Successfully Received</span>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-mono block mb-1">
              Custom Karigari Order
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Thank You for Sharing Your Vision
            </h1>
            <p className="text-sm text-[#a8b6af] mt-2 leading-relaxed font-light">
              Your custom jewellery request has been safely received by our family shop master karigars.
            </p>
          </div>

          {/* Reference Token Box */}
          <div className="p-4 bg-[#04170f] border border-[#d4af37]/40 rounded-2xl max-w-sm mx-auto shadow-md">
            <span className="text-[11px] uppercase tracking-wider text-[#a8b6af] block mb-1 font-mono">
              Your Tracking Reference
            </span>
            <span className="font-mono text-2xl font-bold tracking-widest text-[#f1d98a] select-all">
              {reference}
            </span>
            {design && (
              <span className="block text-[11px] text-[#a8b6af] mt-1 font-mono">
                Status: <strong className="text-white capitalize">{design.status}</strong>
              </span>
            )}
          </div>

          {/* Next Steps Timeline */}
          <div className="text-left bg-[#04170f]/80 border border-white/10 rounded-2xl p-5 space-y-4 text-xs font-mono">
            <h3 className="font-serif text-base font-normal text-white border-b border-white/10 pb-2">
              What Happens Next?
            </h3>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-sans">1. Artisan Feasibility Review (Within 24–48 Hours)</strong>
                <p className="text-[#a8b6af] leading-relaxed font-sans text-xs">
                  Our family master jeweler reviews structural feasibility, metal requirements, and setting techniques.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-sans">2. Personal Consultation &amp; Initial Quote</strong>
                <p className="text-[#a8b6af] leading-relaxed font-sans text-xs">
                  We will contact you via your chosen channel to discuss preliminary sketches, stone options, and budget breakdown.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-sans">3. Inspect &amp; Collect at Our Shop</strong>
                <p className="text-[#a8b6af] leading-relaxed font-sans text-xs">
                  Once handcrafted and 100% BIS hallmarked, you inspect the piece and weigh it on digital scales at our shop before taking it home. (Zero courier risk).
                </p>
              </div>
            </div>
          </div>

          {/* Safe Privacy Disclaimer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#a8b6af] pt-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Private &amp; Secure &bull; No personal attachment files are publicly exposed</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210"}?text=${encodeURIComponent(
                `Namaste Vaidik Ratnam, I have submitted a custom design request on your website (Reference: ${reference}). I would like to discuss the next steps and visit your shop.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-gradient py-3 px-6 rounded-full text-xs uppercase tracking-wider font-mono font-bold inline-flex items-center justify-center gap-2 text-[#04170f] w-full sm:w-auto shadow-lg hover:brightness-105 transition-all"
            >
              <span>Share Reference on Shop WhatsApp</span>
            </a>
            <Link href="/jewellery" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="text-xs uppercase tracking-wider w-full">
                Explore Available Stock
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="text-xs uppercase tracking-wider w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

