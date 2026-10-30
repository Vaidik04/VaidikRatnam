import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { repo } from "@/lib/db/repo";
import { seedDemoDataIfEmpty } from "@/lib/db/seed";
import { BookOpen, ExternalLink, Calendar, UserCheck, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await repo.getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} — Vaidik Ratnam Knowledge Hub`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await seedDemoDataIfEmpty();
  const { slug } = await params;
  const article = await repo.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  let sources: Array<{ title: string; url: string }> = [];
  try {
    if (article.sources_json) {
      sources = JSON.parse(article.sources_json);
    }
  } catch {
    sources = [];
  }

  const paragraphs = article.content_markdown.split("\n\n");

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-[#626A65] border-b border-[#F0ECE2] pb-4">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 hover:text-[#173B32] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Knowledge Hub</span>
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B08D57]">
            {article.category.replace(/_/g, " ")}
          </span>
        </div>

        {/* Article Header */}
        <div className="space-y-6">
          <h1 className="font-serif text-3xl sm:text-5xl text-[#182522] font-normal leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#626A65] leading-relaxed font-light italic border-l-2 border-[#B08D57] pl-4">
            {article.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#626A65] bg-white p-4 rounded-xs border border-[#E2D7C5] shadow-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#173B32]" />
              <span>Authored by: <strong className="text-[#182522]">{article.author_name}</strong></span>
            </div>

            {article.reviewer_name && (
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B08D57]" />
                <span>Editorial Review: <strong className="text-[#182522]">{article.reviewer_name}</strong></span>
              </div>
            )}

            {article.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8F9691]" />
                <span>Published: {new Date(article.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>

        {/* Article Body Content */}
        <article className="prose prose-stone max-w-none text-sm sm:text-base text-[#182522] leading-relaxed space-y-6 bg-white p-8 sm:p-12 rounded-xs border border-[#E2D7C5] shadow-xs">
          {paragraphs.map((para, idx) => {
            if (para.startsWith("### ")) {
              return (
                <h3 key={idx} className="font-serif text-2xl font-normal text-[#182522] pt-6 pb-2 border-b border-[#F0ECE2] mt-6">
                  {para.replace("### ", "")}
                </h3>
              );
            }
            if (para.startsWith("#### ")) {
              return (
                <h4 key={idx} className="font-serif text-lg font-medium text-[#182522] pt-4 pb-1">
                  {para.replace("#### ", "")}
                </h4>
              );
            }
            if (para.startsWith("```")) {
              return (
                <pre key={idx} className="bg-[#182522] text-[#DDE5DC] p-5 rounded-xs font-mono text-xs overflow-x-auto my-4 border border-[#0F2922]">
                  {para.replace(/```/g, "")}
                </pre>
              );
            }
            // First paragraph styling with drop cap
            if (idx === 0) {
              return (
                <p key={idx} className="first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-[#173B32] first-letter:font-bold leading-relaxed text-[#182522]">
                  {para}
                </p>
              );
            }
            return <p key={idx} className="leading-relaxed text-[#182522]">{para}</p>;
          })}
        </article>

        {/* Sources & Citations */}
        {sources.length > 0 && (
          <Card className="p-6 bg-white border border-[#E2D7C5] rounded-xs shadow-xs space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#B08D57] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B08D57]" />
              Official Citations &amp; Legal Metrology Standards
            </h4>
            <ul className="space-y-2 text-xs">
              {sources.map((src, idx) => (
                <li key={idx}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#173B32] hover:text-[#B08D57] font-medium transition-colors"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Bottom Shop CTA Banner */}
        <div className="bg-[#173B32] text-white p-8 sm:p-10 rounded-xs shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3E5AB]">
                In-Person Verification
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                Have Questions About a Piece You Own?
              </h3>
              <p className="text-xs sm:text-sm text-[#DDE5DC] max-w-lg leading-relaxed">
                Bring your jewellery to our shop. We will help you weigh it on our digital scales, check the 6-digit laser HUID on the BIS Care App, and inspect gemstones under magnification.
              </p>
            </div>
            <Link href="/contact">
              <Button variant="gold" size="md" className="text-xs uppercase tracking-wider font-semibold whitespace-nowrap btn-gold-shimmer">
                Visit Our Shop
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
