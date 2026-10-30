import React from "react";
import { repo } from "@/lib/db/repo";
import { KnowledgeManagerView } from "@/components/admin/KnowledgeManagerView";

export const metadata = {
  title: "Knowledge CMS & FAQs — Vaidik Ratnam Admin",
};

export default async function AdminKnowledgePage() {
  const [articles, faqs] = await Promise.all([
    repo.getAdminArticles(),
    repo.getPublishedFaqs(),
  ]);

  return <KnowledgeManagerView initialArticles={articles} initialFaqs={faqs} />;
}

