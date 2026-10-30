import React from "react";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy and personal data protection policy for Vaidik Ratnam studio visitors and clients.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0F3D2E]/5 border border-[#D4AF37]/50 flex items-center justify-center p-2.5 shrink-0 shadow-2xs">
            <Image
              src="/images/brand/element-astrology-circle-transparent.png"
              alt="Astrology Circle"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block mb-1">
              Legal &amp; Privacy &bull; Client Data Confidentiality
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#182522] font-normal">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#626A65] mt-1">Last meaningfully updated: October 2026</p>
          </div>
        </div>

        <Card className="p-8 sm:p-10 bg-white border border-[#E2D7C5] rounded-xs shadow-xs space-y-6 text-xs sm:text-sm text-[#182522] leading-relaxed">
          <div className="p-4 bg-[#FFF8E7] border border-[#FFE5A3] rounded-xs text-xs text-[#925700]">
            <strong>Important Notice:</strong> This privacy policy reflects the initial operational model of Vaidik Ratnam (shop visits, quotation requests, and custom jewellery orders). Final legal policies must be reviewed by the owner&apos;s legal counsel.
          </div>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">1. Information We Collect</h2>
            <p className="text-[#626A65]">
              We collect information provided directly by you when you:
            </p>
            <ul className="list-disc pl-5 text-[#626A65] space-y-1">
              <li>Submit a custom jewellery design brief or reference sketch.</li>
              <li>Request an availability check or quotation for a jewellery piece.</li>
              <li>Book a visit to our shop or request jewellery consultation.</li>
              <li>Request an astrology consultation (including birth date, time, and birthplace strictly for horoscopic calculation).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">2. How Your Data Is Protected</h2>
            <p className="text-[#626A65]">
              &bull; <strong>Confidential Birth Details:</strong> Birth chart records and personal life notes provided for astrology consultations are isolated in restricted database entities and are accessible only to the consultant.
            </p>
            <p className="text-[#626A65]">
              &bull; <strong>Private Custom Sketches:</strong> Your custom inspiration images and private design briefs are never posted to public showcases or galleries without your explicit permission.
            </p>
            <p className="text-[#626A65]">
              &bull; <strong>No Data Brokers:</strong> We never sell, rent, or lease your telephone number, email, or private brief information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">3. Data Retention and Deletion Requests</h2>
            <p className="text-[#626A65]">
              You have the right to request access to, correction of, or deletion of your personal records from our enquiry and appointment systems at any time. Simply write to us at <strong className="text-[#182522]">privacy@vaidikratnam.com</strong> or inform our family during your shop visit.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

