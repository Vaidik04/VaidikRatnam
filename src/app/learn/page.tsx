import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { repo } from "@/lib/db/repo";
import { seedDemoDataIfEmpty } from "@/lib/db/seed";
import {
  BookOpen,
  Calculator,
  CheckSquare,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Search,
} from "lucide-react";

export const metadata = {
  title: "The Knowledge Hub & Consumer Education — Vaidik Ratnam",
  description:
    "Expert-reviewed articles, honest pricing breakdowns, BIS hallmarking guides, gemstone lab report analysis, and studio FAQs.",
};

const CATEGORY_NAMES: Record<string, string> = {
  jewellery_guide: "Jewellery Buying & Care",
  pricing_explanation: "Price & Bill Breakdown",
  gemstones_ratna: "Gemstones & Lab Reports",
  astrology_preparation: "Vedic Astrology Preparation",
  faqs: "Studio FAQs",
};

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  await seedDemoDataIfEmpty();
  const params = await searchParams;
  const currentCategory = params.category || "";
  const searchQuery = params.q?.toLowerCase() || "";

  const [articles, faqs] = await Promise.all([
    repo.getPublishedArticles(),
    repo.getPublishedFaqs(),
  ]);

  const filteredArticles = articles.filter((art) => {
    if (currentCategory && art.category !== currentCategory) return false;
    if (searchQuery) {
      return (
        art.title.toLowerCase().includes(searchQuery) ||
        art.summary.toLowerCase().includes(searchQuery)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173B32]/10 border border-[#B08D57]/40 text-[#173B32] text-xs uppercase tracking-[0.22em] font-medium animate-float">
            <BookOpen className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Jewellery &amp; Gemstone Guides</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#182522] font-normal tracking-tight">
            The Knowledge Hub
          </h1>

          <p className="text-sm sm:text-base text-[#626A65] leading-relaxed">
            Written by our master goldsmiths, gemologists, and Jyotish scholars. We believe an educated customer makes confident, lifelong jewellery decisions.
          </p>
        </div>

        {/* Free Tools Showcase Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/tools/gold-budget-estimator" className="group">
            <Card className="p-6 bg-white border border-[#E2D7C5] hover:border-[#B08D57] rounded-xs shadow-xs transition-all h-full flex flex-col justify-between group-hover:shadow-md">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#173B32]/10 flex items-center justify-center text-[#173B32] group-hover:bg-[#173B32] group-hover:text-white transition-colors">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#182522] font-normal">
                  Gold Budget Estimator
                </h3>
                <p className="text-xs text-[#626A65] leading-relaxed">
                  Interactive calculator breaking down 24K gold rate, karat purity, making charges, and 3% statutory GST.
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#173B32] mt-5 flex items-center gap-1 group-hover:text-[#B08D57]">
                Launch Calculator &rarr;
              </span>
            </Card>
          </Link>

          <Link href="/tools/jewellery-buying-checklist" className="group">
            <Card className="p-6 bg-white border border-[#E2D7C5] hover:border-[#B08D57] rounded-xs shadow-xs transition-all h-full flex flex-col justify-between group-hover:shadow-md">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#173B32]/10 flex items-center justify-center text-[#173B32] group-hover:bg-[#173B32] group-hover:text-white transition-colors">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#182522] font-normal">
                  Inspection Checklist
                </h3>
                <p className="text-xs text-[#626A65] leading-relaxed">
                  Printable 10-step consumer verification protocol covering 6-digit laser HUID, net weight vs gross scale, and invoice clauses.
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#173B32] mt-5 flex items-center gap-1 group-hover:text-[#B08D57]">
                View Checklist &rarr;
              </span>
            </Card>
          </Link>

          <Link href="/tools/gemstone-comparison" className="group">
            <Card className="p-6 bg-white border border-[#E2D7C5] hover:border-[#B08D57] rounded-xs shadow-xs transition-all h-full flex flex-col justify-between group-hover:shadow-md">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#173B32]/10 flex items-center justify-center text-[#173B32] group-hover:bg-[#173B32] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#182522] font-normal">
                  Gemstone &amp; Ratna Matrix
                </h3>
                <p className="text-xs text-[#626A65] leading-relaxed">
                  Side-by-side scientific mineralogy, Mohs durability scale, laboratory mandates, and classical Parashari Jyotish associations.
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#173B32] mt-5 flex items-center gap-1 group-hover:text-[#B08D57]">
                Compare Gemstones &rarr;
              </span>
            </Card>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-[#E2D7C5] rounded-xs p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-thin pb-1 sm:pb-0">
            <Link
              href="/learn"
              className={`text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                !currentCategory
                  ? "bg-[#173B32] text-white shadow-xs"
                  : "bg-[#FAF8F5] text-[#626A65] hover:text-[#182522] border border-[#E5DFD5]"
              }`}
            >
              All Articles
            </Link>
            {Object.entries(CATEGORY_NAMES).map(([key, label]) => (
              <Link
                key={key}
                href={`/learn?category=${key}`}
                className={`text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                  currentCategory === key
                    ? "bg-[#173B32] text-white shadow-xs"
                    : "bg-[#FAF8F5] text-[#626A65] hover:text-[#182522] border border-[#E5DFD5]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Quick Search Form */}
          <form method="GET" action="/learn" className="w-full sm:w-64 relative">
            {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8F9691]" />
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search guides..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D4CCC0] rounded-xs text-xs text-[#182522] focus:bg-white focus:outline-none focus:border-[#173B32]"
            />
          </form>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#E2D7C5] rounded-xs p-8">
            <p className="text-sm text-[#626A65]">No articles found matching your criteria.</p>
            <Link href="/learn" className="text-xs uppercase tracking-wider text-[#173B32] font-semibold mt-2 inline-block">
              Clear Filters &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((art) => (
              <Link key={art.id} href={`/learn/${art.slug}`}>
                <Card className="p-8 bg-white border border-[#E2D7C5] hover:border-[#B08D57] rounded-xs shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#626A65]">
                      <span className="font-mono text-[10px] text-[#B08D57] uppercase tracking-[0.2em] font-semibold">
                        {CATEGORY_NAMES[art.category] || art.category}
                      </span>
                      {art.published_at && (
                        <span className="text-[11px] text-[#8F9691] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(art.published_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl text-[#182522] font-normal group-hover:text-[#173B32] transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#626A65] leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#F0ECE2] flex items-center justify-between text-xs">
                    <span className="text-[#626A65]">
                      Reviewed by: <strong className="text-[#182522] font-medium">{art.reviewer_name || art.author_name}</strong>
                    </span>
                    <span className="text-[#173B32] font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:text-[#B08D57] transition-colors">
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Studio FAQs Section */}
        {faqs.length > 0 && (
          <div className="bg-white border border-[#E2D7C5] rounded-xs p-8 sm:p-10 shadow-xs space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B08D57]">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="font-serif text-3xl text-[#182522] font-normal">
                Answers About Our Studio &amp; Process
              </h2>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-5 bg-[#FAF8F5] rounded-xs border border-[#E5DFD5] space-y-1.5">
                  <h4 className="font-serif text-base font-medium text-[#182522]">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#626A65] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
