import React from "react";
import { notFound } from "next/navigation";
import { repo } from "@/lib/db/repo";
import { ProductEditorForm } from "@/components/admin/ProductEditorForm";

export const metadata = {
  title: "Edit Product — Vaidik Ratnam Admin",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories, mediaAssets] = await Promise.all([
    repo.getProductById(id),
    repo.getCategories(),
    repo.getMediaAssets(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <ProductEditorForm
      initialProduct={product}
      categories={categories}
      mediaAssets={mediaAssets}
    />
  );
}

