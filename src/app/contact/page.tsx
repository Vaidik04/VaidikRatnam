import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a2a1d] border border-[#d4af37]/40 text-[#f1d98a] text-xs uppercase tracking-[0.22em] font-mono shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Visit Our Sanctuary &bull; Personal Family Attention</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal tracking-tight">
            Contact &amp; Visit Our Shop
          </h1>

          <p className="text-sm sm:text-base text-[#a8b6af] leading-relaxed font-light">
            We welcome you to visit our shop, weigh gold pieces on digital scales, discuss custom designs with our goldsmiths, or meet with our family elder for astrology advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Shop Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#0a2a1d]/70 border border-[#d4af37]/30 rounded-2xl shadow-2xl space-y-6 backdrop-blur-md">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.22em] font-semibold block mb-1">
                  Shop Address &bull; In-Person Visit
                </span>
                <h2 className="font-serif text-2xl text-white font-normal">
                  Our Sanctuary &amp; Counter
                </h2>
              </div>

              <div className="space-y-4 text-xs font-mono text-[#a8b6af]">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#04170f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 font-sans">Shop Location:</strong>
                    <p className="leading-relaxed font-sans">{showroomAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#04170f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 font-sans">Shop Timings:</strong>
                    <p className="leading-relaxed">{showroomHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#04170f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 font-sans">Shop Phone / WhatsApp:</strong>
                    <p className="font-mono text-[#f1d98a]">{showroomPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#04170f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5 font-sans">Email Address:</strong>
                    <p className="text-white">{showroomEmail}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${rawPhone}?text=Namaste%20Vaidik%20Ratnam%2C%20I%20would%20like%20to%20visit%20your%20shop.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#25D366] hover:bg-[#20BA59] text-black font-bold rounded-full text-xs font-mono uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>

              {/* In-Person Verification Guarantee */}
              <div className="p-4 bg-[#04170f]/80 rounded-xl border border-white/10 text-xs text-[#a8b6af] space-y-2">
                <strong className="text-white block font-semibold flex items-center gap-1.5 font-serif">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  Weigh &amp; Check in Our Shop
                </strong>
                <p className="leading-relaxed font-light">
                  During your visit, every piece is placed on our certified digital scales in front of you. You are invited to inspect 6-digit laser HUID markings and gemstone details with a 10x magnifying loupe before buying.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-[#f1d98a]">
                  <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Scale Weight &bull; 10x Magnification &bull; BIS Care App</span>
                </div>
              </div>
            </div>

            {/* Visit Expectations Checklist */}
            <div className="p-6 bg-[#0a2a1d]/70 border border-[#d4af37]/25 rounded-2xl text-xs text-[#a8b6af] space-y-3 backdrop-blur-md">
              <h3 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
                Helpful Things to Bring When Visiting
              </h3>
              <ul className="space-y-2 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                  <span>For Custom Orders: Any photo references, old jewellery to remodel, or budget preference.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>For Astrology Consultations: Birth date, exact birth time, and birth city.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                  <span>For Gold Exchange: Existing gold jewellery to test and weigh.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Contact & Viewing Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#0a2a1d]/70 border border-[#d4af37]/30 rounded-2xl shadow-2xl space-y-6 backdrop-blur-md">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.22em] font-semibold block mb-1">
                  Direct Inquiries
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  Send a Message or Plan a Visit
                </h2>
                <p className="text-xs text-[#a8b6af] mt-1 leading-relaxed font-light">
                  Fill in your details below. Our shop team will respond promptly via WhatsApp, phone, or email.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
