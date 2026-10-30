import React from "react";
import { notFound } from "next/navigation";
import { repo } from "@/lib/db/repo";
import { CustomDesignDetailView } from "@/components/admin/CustomDesignDetailView";

export const metadata = {
  title: "Custom Design Brief Review — Vaidik Ratnam Admin",
};

export default async function AdminCustomDesignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const briefs = await repo.getAdminCustomDesigns();
  const brief = briefs.find((b) => b.id === id);

  if (!brief) {
    notFound();
  }

  return <CustomDesignDetailView brief={brief} />;
}

