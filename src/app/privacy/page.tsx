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
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0a2a1d] border border-[#d4af37]/50 flex items-center justify-center p-2.5 shrink-0 shadow-xl">
            <Image
              src="/images/brand/element-astrology-circle-transparent.png"
              alt="Astrology Circle"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-1">
              Legal &amp; Privacy &bull; Client Data Confidentiality
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#a8b6af] mt-1 font-mono">Last meaningfully updated: October 2026</p>
          </div>
        </div>

        <Card className="p-8 sm:p-10 bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl shadow-2xl space-y-6 text-xs sm:text-sm text-[#e2ece7] leading-relaxed backdrop-blur-md">
          <div className="p-4 bg-[#04170f] border border-[#d4af37]/40 rounded-xl text-xs text-[#f1d98a] font-mono">
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
            <h2 className="font-serif text-lg text-[#182522] font-medium">3. Compliance with India&apos;s Digital Personal Data Protection Act (DPDPA), 2023</h2>
            <p className="text-[#626A65]">
              Under the Digital Personal Data Protection Act (DPDPA), 2023, you have the following rights as a Data Principal:
            </p>
            <ul className="list-disc pl-5 text-[#626A65] space-y-1">
              <li><strong>Right to Access:</strong> You may request a summary of the personal data you provided for quotes, consultations, and orders.</li>
              <li><strong>Right to Correction &amp; Erasure:</strong> You may request immediate correction of inaccurate contact details or complete erasure of your design briefs and birth details from our database.</li>
              <li><strong>Right of Grievance Redressal:</strong> You may contact our designated Grievance Officer regarding any data processing inquiries.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-[#182522] font-medium">4. Data Erasure Requests &amp; Grievance Redressal</h2>
            <p className="text-[#626A65]">
              To exercise your right to erasure, simply write to our Data Grievance Officer at <strong className="text-[#182522]">privacy@vaidikratnam.com</strong> or WhatsApp our shop desk. Erasure requests are processed within 7 business days across all database records and audit trails.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

