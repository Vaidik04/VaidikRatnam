import React from "react";
import { repo } from "@/lib/db/repo";
import { ProductEditorForm } from "@/components/admin/ProductEditorForm";

export const metadata = {
  title: "New Product — Vaidik Ratnam Admin",
};

export default async function NewProductPage() {
  const [categories, mediaAssets] = await Promise.all([
    repo.getCategories(),
    repo.getMediaAssets(),
  ]);

  return (
    <ProductEditorForm
      categories={categories}
      mediaAssets={mediaAssets}
    />
  );
}

