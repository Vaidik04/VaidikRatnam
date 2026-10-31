import React from "react";
import { repo } from "@/lib/db/repo";
import { MediaLibraryView } from "@/components/admin/MediaLibraryView";

export const metadata = {
  title: "Existing Stock Image Library — Vaidik Ratnam Admin",
};

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ unlinked?: string }>;
}) {
  const params = await searchParams;
  const unlinkedOnly = params.unlinked === "true";

  const [assets, unlinkedAssets] = await Promise.all([
    repo.getMediaAssets({ unlinkedOnly }),
    repo.getMediaAssets({ unlinkedOnly: true }),
  ]);

  return (
    <MediaLibraryView
      initialAssets={JSON.parse(JSON.stringify(assets))}
      unlinkedCount={unlinkedAssets.length}
    />
  );
}

