import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { config } from "@/lib/config";
import { Building2 } from "lucide-react";

export const metadata = {
  title: "Wholesale Partner Portal (Restricted)",
  description: "Restricted wholesale inquiry and verified B2B partner section for established retail jewelers.",
};

export default function WholesalePortalPage() {
  const isEnabled = config.enableWholesalePortal;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {!isEnabled ? (
          <Card className="p-8 sm:p-12 bg-white border border-[#E2D7C5] rounded-xs shadow-md text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#0F3D2E]/5 border border-[#D4AF37]/50 flex items-center justify-center p-3 shadow-2xs">
              <Image
                src="/images/brand/icon-full-color-transparent.png"
                alt="Vaidik Ratnam"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                B2B Trade &bull; Restricted Access
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
                Wholesale Portal Currently Private
              </h1>
              <p className="text-xs sm:text-sm text-[#626A65] mt-2 max-w-md mx-auto leading-relaxed">
                Our wholesale catalogue is restricted to vetted trade partners with valid GSTIN jewellery registration. The public portal is currently restricted in accordance with studio v1 release guidelines.
              </p>
            </div>

            <div className="p-4 bg-[#F7F4ED] rounded-xs border border-[#E5DFD5] text-xs text-[#626A65] text-left space-y-1">
              <strong className="text-[#182522] block font-semibold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#173B32]" />
                Existing B2B / Wholesale Partners:
              </strong>
              <p>
                Existing wholesale buyers and retail shop partners are invited to contact our shop directly via telephone or visit our shop to view manufacturing lots.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="md" className="text-xs uppercase tracking-wider">
                  Contact Shop B2B Desk &rarr;
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="p-8 bg-white space-y-6">
            <h1 className="font-serif text-2xl text-[#182522]">Verified Wholesale Inquiries</h1>
            <p className="text-xs text-[#626A65]">
              Please submit your GSTIN and business details for B2B catalog access.
            </p>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
