import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { repo } from "@/lib/db/repo";
import { seedDemoDataIfEmpty } from "@/lib/db/seed";
import { MapPin, Phone, Mail, Clock, ShieldCheck, MessageCircle, Scale, Sparkles, CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact & Visit Our Shop — Vaidik Ratnam",
  description:
    "Visit our family jewellery shop. Weigh pieces on digital scales, order custom jewellery, or consult our family astrologer.",
};

export default async function ContactPage() {
  await seedDemoDataIfEmpty();
  const settings = await repo.getSettings();

  const showroomHours = settings["shop_hours"] || settings["showroom_hours"] || "Mon - Sat: 10:30 AM - 8:30 PM | Sun: 11:00 AM - 6:00 PM";
  const showroomPhone = settings["phone_display"] || "+91 98765 43210";
  const showroomEmail = settings["email_contact"] || "shop@vaidikratnam.com";
  const showroomAddress = settings["shop_address"] || settings["showroom_address"] || "Vaidik Ratnam Traditional Jewellery Shop, Johari Bazar, Jaipur, Rajasthan 302003";

  const rawPhone = showroomPhone.replace(/[^0-9]/g, "");

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173B32]/10 border border-[#B08D57]/40 text-[#173B32] text-xs uppercase tracking-[0.22em] font-medium animate-float">
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Visit Our Shop &bull; Personal Family Service</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#182522] font-normal tracking-tight">
            Contact &amp; Visit Our Shop
          </h1>

          <p className="text-sm sm:text-base text-[#626A65] leading-relaxed">
            We welcome you to visit our shop, weigh gold pieces on digital scales, discuss custom designs with our goldsmiths, or meet with our family elder for astrology advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Shop Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-8 bg-white border border-[#E2D7C5] rounded-xs shadow-md space-y-6">
              <div className="border-b border-[#F0ECE2] pb-4">
                <span className="text-[10px] font-mono text-[#B08D57] uppercase tracking-[0.22em] font-semibold block mb-1">
                  Shop Address &bull; In-Person Visit
                </span>
                <h2 className="font-serif text-2xl text-[#182522] font-normal">
                  Our Shop &amp; Counter
                </h2>
              </div>

              <div className="space-y-4 text-xs text-[#626A65]">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#173B32]/10 flex items-center justify-center text-[#173B32] shrink-0">
                    <MapPin className="w-4 h-4 text-[#173B32]" />
                  </div>
                  <div>
                    <strong className="text-[#182522] block mb-0.5">Shop Location:</strong>
                    <p className="leading-relaxed">{showroomAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#173B32]/10 flex items-center justify-center text-[#173B32] shrink-0">
                    <Clock className="w-4 h-4 text-[#173B32]" />
                  </div>
                  <div>
                    <strong className="text-[#182522] block mb-0.5">Shop Timings:</strong>
                    <p className="leading-relaxed">{showroomHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#173B32]/10 flex items-center justify-center text-[#173B32] shrink-0">
                    <Phone className="w-4 h-4 text-[#173B32]" />
                  </div>
                  <div>
                    <strong className="text-[#182522] block mb-0.5">Shop Phone / WhatsApp:</strong>
                    <p className="font-mono text-[#182522]">{showroomPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#B08D57]/10 flex items-center justify-center text-[#B08D57] shrink-0">
                    <Mail className="w-4 h-4 text-[#B08D57]" />
                  </div>
                  <div>
                    <strong className="text-[#182522] block mb-0.5">Email Address:</strong>
                    <p className="text-[#182522]">{showroomEmail}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${rawPhone}?text=Namaste%20Vaidik%20Ratnam%2C%20I%20would%20like%20to%20visit%20your%20shop.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20BA59] text-white rounded-xs text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>

              {/* In-Person Verification Guarantee */}
              <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E5DFD5] text-xs text-[#626A65] space-y-2">
                <strong className="text-[#182522] block font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#173B32]" />
                  Weigh &amp; Check in Our Shop
                </strong>
                <p className="leading-relaxed">
                  During your visit, every piece is placed on our certified digital scales in front of you. You are invited to inspect 6-digit laser HUID markings and gemstone details with a 10x magnifying loupe before buying.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-[#173B32] font-medium">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Scale Weight &bull; 10x Magnification &bull; BIS Care App</span>
                </div>
              </div>
            </Card>

            {/* Visit Expectations Checklist */}
            <div className="p-6 bg-white border border-[#E2D7C5] rounded-xs text-xs text-[#626A65] space-y-3">
              <h3 className="font-serif text-sm font-semibold text-[#182522] uppercase tracking-wider">
                Helpful Things to Bring When Visiting
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#173B32] shrink-0 mt-0.5" />
                  <span>For Custom Orders: Any photo references, old jewellery to remodel, or budget preference.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B08D57] shrink-0 mt-0.5" />
                  <span>For Astrology Consultations: Birth date, exact birth time, and birth city.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#173B32] shrink-0 mt-0.5" />
                  <span>For Gold Exchange: Existing gold jewellery to test and weigh.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Contact & Viewing Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <Card className="p-8 sm:p-10 bg-white border border-[#E2D7C5] rounded-xs shadow-md space-y-6">
              <div className="border-b border-[#F0ECE2] pb-4">
                <span className="text-[10px] font-mono text-[#B08D57] uppercase tracking-[0.22em] font-semibold block mb-1">
                  Direct Inquiries
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
                  Send a Message or Plan a Visit
                </h2>
                <p className="text-xs text-[#626A65] mt-1 leading-relaxed">
                  Fill in your details below. Our shop team will respond promptly via WhatsApp, phone, or email.
                </p>
              </div>

              <ContactForm />
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
