import React from "react";
import { repo } from "@/lib/db/repo";
import { BusinessSettingsForm } from "@/components/admin/BusinessSettingsForm";

export const metadata = {
  title: "Business Settings — Vaidik Ratnam Admin",
};

export default async function AdminSettingsPage() {
  const settings = await repo.getSettings();
  return <BusinessSettingsForm initialSettings={settings} />;
}

