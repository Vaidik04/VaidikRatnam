import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { repo } from "@/lib/db/repo";
import { LagnaRatnaExplorer } from "@/components/astrology/LagnaRatnaExplorer";
import { KundaliVisual } from "@/components/astrology/KundaliVisual";
import { NavagrahaGrid } from "@/components/astrology/NavagrahaGrid";
import {
  Calendar,
  ShieldCheck,
  HelpCircle,
  AlertTriangle,
  UserCheck,
} from "lucide-react";

export const metadata = {
  title: "Traditional Vedic Astrology & Ratna Consultation — Parashari Jyotish",
  description:
    "Authentic Vedic horoscope evaluation, Janma Kundali casting, and ethical gemstone guidance by our family studio elder. Classical principles with zero fear-based sales.",
};

const SERVICES_OFFERED = [
  {
    id: "ratna-selection",
    title: "Vedic Gemstone (Ratna) Suitability Analysis",
    description:
      "Meticulous evaluation of your Janma Kundali and Navamsha (D9) to verify functional benefic planets (Trikona lords), degrees of combustion, auspicious metals, and exact Shukla Paksha wearing muhurats.",
    duration: "45 Minutes",
    fee: "Configured upon booking confirmation",
    suitableFor:
      "Individuals seeking definitive clarity on whether a natural gemstone is traditionally prescribed for their birth chart.",
  },
  {
    id: "kundali-overview",
    title: "Comprehensive Janma Kundali Consultation",
    description:
      "Traditional examination of planetary positions (graha sthiti), Vimshottari Dasha cycles, Saturn transits (Sade Sati/Dhaiya), and major life periods for perspective and self-awareness.",
    duration: "60 Minutes",
    fee: "Configured upon booking confirmation",
    suitableFor:
      "Personal life reflection, career and business transitions, marriage compatibility, and traditional karmic remedies.",
  },
  {
    id: "muhurat-selection",
    title: "Auspicious Timing (Shubh Muhurat) Selection",
    description:
      "Calculation of auspicious Vedic time windows (Choghadiya, Abhijit Muhurta, Tithi) for weddings, griha pravesh, gemstone setting, or commencing significant family ventures.",
    duration: "30 Minutes",
    fee: "Configured upon booking confirmation",
    suitableFor:
      "Families planning milestones, new business undertakings, or auspicious purchases.",
  },
];

const CONSULTATION_STEPS = [
  {
    step: "01",
    title: "Kundali & Navamsha (D9) Casting",
    description:
      "Using your exact birth coordinates (date, minute, latitude/longitude), the practitioner casts your Janma Rashi, Lagna, and divisional charts using Lahiri Ayanamsha.",
  },
  {
    step: "02",
    title: "Vimshottari Dasha & Gochara Analysis",
    description:
      "We examine your current Mahadasha, Antardasha, and major planetary transits (such as Shani and Guru Gochara) to understand your present karmic cycle.",
  },
  {
    step: "03",
    title: "Remedial Discernment: Stone vs Satvik Upaya",
    description:
      "We determine whether a gemstone is truly indicated. If a planet is a functional enemy or Dusthana lord, gemstones are forbidden, and gentle remedies (Daan, Stotra, Japa) are prescribed instead.",
  },
  {
    step: "04",
    title: "Muhurta & Prana Pratishtha Guidance",
    description:
      "If a gemstone is prescribed, you receive the exact auspicious day, Shukla Paksha muhurta, seed Beej Mantra, and purification vidhi for energization.",
  },
];

const ASTROLOGY_FAQS = [
  {
    q: "Can I wear Blue Sapphire (Neelam) during Sade Sati to reduce Saturn's hardships?",
    a: "Classical Parashari Jyotish strictly warns AGAINST blindly wearing Blue Sapphire during Sade Sati. Gemstones are cosmic amplifiers, not shields. If Saturn is a functional malefic (ruler of the 6th, 8th, or 12th houses for your Lagna, such as for Aries, Cancer, or Leo), wearing Neelam will intensify conflicts and physical ailments rather than relieve them. Saturn is appeased through humble service, discipline, and Shani Stotra—not expensive stones.",
  },
  {
    q: "Do I have to buy the gemstone from your studio after the consultation?",
    a: "Absolutely not. Our code of ethics strictly separates astrological guidance from jewellery sales. You receive an objective, written prescription detailing the mineral family, carat range, metal, and wearing finger. You are entirely free to source your gemstone from any certified jeweller or lab of your choice.",
  },
  {
    q: "Why does the gemstone need to touch the skin in Vedic jewellery?",
    a: "In traditional Ratna Shastra, gemstones function as crystalline prisms that absorb solar-cosmic rays and transmit their vibration into the human bio-field (Pranamaya Kosha). Therefore, genuine astrological rings and pendants are handcrafted with an open-back setting (Chhidra) allowing unobstructed direct skin contact.",
  },
  {
    q: "Are lab-created or synthetic gemstones astrologically effective?",
    a: "No. While lab-created gems share chemical composition and visual brilliance, they lack the millions of years of subterranean geological crystallization and telluric energy that give natural untreated gemstones their specific vibrational frequency. Traditional texts specify unheated, natural earth-mined gems with verifiable purity.",
  },
  {
    q: "What if my exact time of birth is unknown?",
    a: "If your birth minute is uncertain within 15–30 minutes, our elder uses birth rectification techniques through past milestone events. If the time is completely unknown, we utilize Prashna Kundali (Horary Astrology based on the exact moment your query is received) or Chandra Kundali (Moon chart) for guidance.",
  },
];

export default async function AstrologyConsultationPage() {
  const settings = await repo.getSettings();
  const practitionerBio =
    settings["father_consultant_bio"] ||
    "Traditional Vedic astrology and gemstone selection guidance based on generational family study. Consultations focus on balanced classical Parashari principles without fear-based marketing.";

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        {/* Editorial Parashari Sanctuary Banner */}
        <div className="relative rounded-xs overflow-hidden bg-[#061410] text-white border border-[#B08D57]/40 shadow-xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/father-sanctuary.jpg"
              alt="Vaidik Ratnam Astrology Consultation"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061410] via-[#061410]/85 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F3D2E]/90 border border-[#D4AF37]/60 text-[#F3E5AB] text-xs uppercase tracking-[0.22em] font-medium shadow-md">
              <Image
                src="/images/brand/element-sun-transparent.png"
                alt="Sun &amp; Nakshatra"
                width={20}
                height={20}
                className="w-4 h-4 object-contain"
              />
              <span>Traditional Vedic Astrology Guidance</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight">
              Traditional Astrology &amp; <span className="text-gold-gradient italic">Gemstone Advice</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#DDE5DC] leading-relaxed max-w-xl font-light">
              Clear, personal horoscope reading grounded in traditional Kundali analysis. We examine your birth chart to provide honest guidance—strictly separated from jewellery sales, with zero fear tactics.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/consultation/request">
                <Button variant="gold" size="lg" className="text-xs uppercase tracking-wider font-semibold btn-gold-shimmer shadow-md">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  Book Astrology Consultation
                </Button>
              </Link>
              <a href="#lagna-explorer">
                <Button variant="outline" size="lg" className="text-xs uppercase tracking-wider text-[#F3E5AB] border-[#B08D57]/60 hover:bg-white/10 backdrop-blur-xs">
                  Find Your Rashi Gemstones &rarr;
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Ethical Boundaries Banner */}
        <div className="bg-[#173B32] text-white rounded-sm p-6 sm:p-8 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Our Code of Ethics</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal mb-3 text-white">
              Vedic Guidance Without Commercial Pressure or Superstition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#DDE5DC] mt-4 pt-4 border-t border-[#2A5248]">
              <div>
                <strong className="text-white block mb-1">Zero Jewellery Obligation:</strong>
                A consultation never obligates you to purchase a gemstone from our studio. We provide objective guidance, and you may source your stone wherever you choose.
              </div>
              <div>
                <strong className="text-white block mb-1">No Fear-Driven Marketing:</strong>
                We reject fear tactics, manufactured Kaal Sarp threats, and false promises of overnight wealth, miraculous marriage, or medical cures.
              </div>
              <div>
                <strong className="text-white block mb-1">Strict Confidentiality:</strong>
                Your birth coordinates, private concerns, and consultation recordings are kept strictly confidential between you and the practitioner.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Lagna & Ratna Explorer */}
        <section id="lagna-explorer">
          <LagnaRatnaExplorer />
        </section>

        {/* The 4-Step Consultation Journey */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
              Methodology &amp; Care
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
              The 4-Step Consultation Journey
            </h2>
            <p className="text-xs text-[#626A65] mt-1">
              How our studio elder prepares, examines, and conducts your private astrological session.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONSULTATION_STEPS.map((s) => (
              <Card key={s.step} className="p-5 bg-white border border-[#E5DFD5] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xl font-bold text-[#B08D57] block mb-2">
                    {s.step}
                  </span>
                  <h3 className="font-serif text-base font-medium text-[#182522] mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#626A65] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Classical Kundali Visual & Trikona Explanation */}
        <section>
          <KundaliVisual />
        </section>

        {/* Navagraha Matrix */}
        <section>
          <NavagrahaGrid />
        </section>

        {/* Practitioner Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#E5DFD5] rounded-sm p-8">
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="w-32 h-32 mx-auto lg:mx-0 rounded-full bg-[#EAE4D7] border-2 border-[#B08D57] flex items-center justify-center text-[#173B32] mb-4">
              <UserCheck className="w-12 h-12" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B08D57] block mb-1">
              Senior Family Astrologer
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#182522]">
              {settings["father_consultant_name"] || "Family Senior Astrologer"}
            </h3>
            <p className="text-xs text-[#626A65] mt-1">
              Practitioner of Classical Vedic Astrology &amp; Kundali Analysis
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-[#626A65] leading-relaxed border-t lg:border-t-0 lg:border-l border-[#E5DFD5] pt-6 lg:pt-0 lg:pl-8">
            <h4 className="font-serif text-base font-semibold text-[#182522]">
              About the Practitioner &amp; Tradition
            </h4>
            <p>{practitionerBio}</p>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#182522]">
              <div className="bg-[#FAF8F5] p-2.5 rounded-xs border border-[#E5DFD5]">
                <span className="text-[#626A65] block text-[10px] uppercase font-mono">Languages:</span>
                <strong>Hindi, English &amp; Gujarati</strong>
              </div>
              <div className="bg-[#FAF8F5] p-2.5 rounded-xs border border-[#E5DFD5]">
                <span className="text-[#626A65] block text-[10px] uppercase font-mono">Available Modes:</span>
                <strong>In-Shop, Phone &amp; Video</strong>
              </div>
              <div className="bg-[#FAF8F5] p-2.5 rounded-xs border border-[#E5DFD5]">
                <span className="text-[#626A65] block text-[10px] uppercase font-mono">Session Format:</span>
                <strong>One-on-One Private</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
              Consultation Services
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
              Select Your Consultation Format
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES_OFFERED.map((svc) => (
              <Card
                key={svc.id}
                className="p-6 bg-white flex flex-col justify-between hover:border-[#B08D57] transition-colors"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#B08D57] uppercase tracking-wider block mb-2">
                    {svc.duration}
                  </span>
                  <h3 className="font-serif text-lg text-[#182522] font-medium mb-2.5 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-[#626A65] leading-relaxed mb-4">
                    {svc.description}
                  </p>
                  <div className="p-3 bg-[#FAF8F5] rounded-xs text-[11px] text-[#626A65] mb-4 border border-[#E5DFD5]">
                    <strong className="text-[#182522] block mb-0.5">Best For:</strong>
                    {svc.suitableFor}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5DFD5]">
                  <Link
                    href={`/consultation/request?service=${encodeURIComponent(
                      svc.title
                    )}`}
                  >
                    <Button variant="primary" size="sm" className="w-full text-xs uppercase tracking-wider">
                      Request Appointment Slot &rarr;
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white border border-[#E5DFD5] rounded-sm p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Questions &amp; Clarifications</span>
            </div>
            <h3 className="font-serif text-2xl text-[#182522] font-normal">
              Frequently Asked Astrological Questions
            </h3>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {ASTROLOGY_FAQS.map((faq, idx) => (
              <div key={idx} className="p-4 bg-[#FAF8F5] rounded-xs border border-[#E5DFD5] space-y-1.5">
                <h4 className="font-serif text-base font-medium text-[#182522]">
                  {faq.q}
                </h4>
                <p className="text-xs text-[#626A65] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Disclaimer */}
        <div className="bg-[#FFF8E7] border border-[#FFE5A3] rounded-sm p-5 text-xs text-[#925700] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <p className="leading-relaxed">
            <strong>Legal, Ethical &amp; Medical Notice:</strong> Traditional Jyotish consultations are symbolic, philosophical interpretations of cosmic cycles intended solely for self-reflection and spiritual guidance. Under the <em>Drugs and Magic Remedies (Objectionable Advertisements) Act</em> and ethical standards, astrological readings must never replace qualified medical diagnoses, mental health treatment, legal representation, or certified financial advice.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
