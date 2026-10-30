"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article, FAQ } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toggleArticlePublishAction } from "@/app/admin/knowledge/actions";
import { BookOpen, HelpCircle, Eye } from "lucide-react";

export function KnowledgeManagerView({
  initialArticles,
  initialFaqs,
}: {
  initialArticles: Article[];
  initialFaqs: FAQ[];
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [activeTab, setActiveTab] = useState<"articles" | "faqs">("articles");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleTogglePublish = async (id: string, currentStatus: string) => {
    setIsUpdating(id);
    const willPublish = currentStatus !== "published";
    const res = await toggleArticlePublishAction(id, willPublish);
    if (res.success) {
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: willPublish ? "published" : "draft" } : a))
      );
    } else {
      alert(res.message || "Failed to update article.");
    }
    setIsUpdating(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
            Content Management
          </span>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            Knowledge Hub CMS &amp; FAQs
          </h1>
          <p className="text-xs text-[#626A65] mt-0.5">
            Review and publish factual educational articles and verified studio FAQs.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "articles" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("articles")}
            className="text-xs uppercase tracking-wider"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            Articles ({articles.length})
          </Button>
          <Button
            variant={activeTab === "faqs" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("faqs")}
            className="text-xs uppercase tracking-wider"
          >
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            Studio FAQs ({initialFaqs.length})
          </Button>
        </div>
      </div>

      {activeTab === "articles" ? (
        /* Articles List */
        <div className="space-y-3">
          {articles.map((art) => (
            <Card key={art.id} className="p-5 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant={art.status === "published" ? "available" : "draft"}>
                    {art.status}
                  </Badge>
                  <span className="text-[10px] font-mono uppercase bg-[#F7F4ED] px-2 py-0.5 rounded-xs text-[#626A65]">
                    {art.category.replace(/_/g, " ")}
                  </span>
                </div>

                <h3 className="font-serif text-base text-[#182522] font-medium">
                  {art.title}
                </h3>

                <p className="text-xs text-[#626A65] line-clamp-1">
                  {art.summary}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#626A65] pt-1">
                  <span>Author: <strong className="text-[#182522]">{art.author_name}</strong></span>
                  {art.reviewer_name && (
                    <span>Reviewer: <strong className="text-[#182522]">{art.reviewer_name}</strong></span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant={art.status === "published" ? "outline" : "primary"}
                  size="sm"
                  isLoading={isUpdating === art.id}
                  onClick={() => handleTogglePublish(art.id, art.status)}
                  className="text-xs uppercase tracking-wider"
                >
                  {art.status === "published" ? "Unpublish to Draft" : "Publish Article"}
                </Button>

                {art.status === "published" && (
                  <Link href={`/learn/${art.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider">
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View Public
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* FAQs List */
        <div className="space-y-3">
          {initialFaqs.map((faq) => (
            <Card key={faq.id} className="p-5 bg-white space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-[#B08D57] block">
                {faq.category.replace(/_/g, " ")}
              </span>
              <h3 className="font-serif text-base text-[#182522] font-medium">
                {faq.question}
              </h3>
              <p className="text-xs text-[#626A65] leading-relaxed pt-1">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
