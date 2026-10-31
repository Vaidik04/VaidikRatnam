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
    <div className="min-h-screen flex flex-col bg-[#F7F4ED]">
      <Header />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        <Card className="p-8 sm:p-10 bg-white border border-[#E5DFD5] text-center space-y-6">
          {/* Brand Emblem & Success Badge */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#0F3D2E]/5 border border-[#D4AF37]/50 flex items-center justify-center p-3 shadow-xs">
              <Image
                src="/images/brand/icon-full-color-transparent.png"
                alt="Vaidik Ratnam"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF3EE] border border-[#C5D5C4] text-[#1B6442] text-xs font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Brief Successfully Received</span>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
              Custom Karigari Order
            </span>
            <h1 className="font-serif text-3xl text-[#182522] font-medium">
              Thank You for Sharing Your Vision
            </h1>
            <p className="text-sm text-[#626A65] mt-2 leading-relaxed">
              Your custom jewellery request has been safely received by our family shop master karigars.
            </p>
          </div>

          {/* Reference Token Box */}
          <div className="p-4 bg-[#F7F4ED] border border-[#E5DFD5] rounded-sm max-w-sm mx-auto">
            <span className="text-[11px] uppercase tracking-wider text-[#626A65] block mb-1 font-mono">
              Your Tracking Reference
            </span>
            <span className="font-mono text-xl font-bold tracking-widest text-[#173B32] select-all">
              {reference}
            </span>
            {design && (
              <span className="block text-[11px] text-[#626A65] mt-1">
                Status: <strong className="text-[#182522] capitalize">{design.status}</strong>
              </span>
            )}
          </div>

          {/* Next Steps Timeline */}
          <div className="text-left bg-[#FCFAF6] border border-[#EFECE5] rounded-sm p-5 space-y-4 text-xs">
            <h3 className="font-serif text-sm font-semibold text-[#182522] border-b border-[#E5DFD5] pb-2">
              What Happens Next?
            </h3>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#182522] block">1. Artisan Feasibility Review (Within 24–48 Hours)</strong>
                <p className="text-[#626A65] leading-relaxed">
                  Our family master jeweler reviews structural feasibility, metal requirements, and setting techniques.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#173B32] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#182522] block">2. Personal Consultation &amp; Initial Quote</strong>
                <p className="text-[#626A65] leading-relaxed">
                  We will contact you via your chosen channel to discuss preliminary sketches, stone options, and budget breakdown.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#182522] block">3. Inspect &amp; Collect at Our Shop</strong>
                <p className="text-[#626A65] leading-relaxed">
                  Once handcrafted and 100% BIS hallmarked, you inspect the piece and weigh it on digital scales at our shop before taking it home. (Zero courier risk).
                </p>
              </div>
            </div>
          </div>

          {/* Safe Privacy Disclaimer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#626A65] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#173B32]" />
            <span>Private &amp; Secure &bull; No personal attachment files are publicly exposed</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210"}?text=${encodeURIComponent(
                `Namaste Vaidik Ratnam, I have submitted a custom design request on your website (Reference: ${reference}). I would like to discuss the next steps and visit your shop.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-pure py-2.5 px-5 rounded-xs text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 text-[#0F3D2E] w-full sm:w-auto shadow-xs"
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

