import React from "react";
import { repo } from "@/lib/db/repo";
import { EnquiriesListView } from "@/components/admin/EnquiriesListView";

export const metadata = {
  title: "Customer Enquiries — Vaidik Ratnam Admin",
};

export default async function AdminEnquiriesPage() {
  const enquiries = await repo.getAdminEnquiries();
  return <EnquiriesListView initialEnquiries={enquiries} />;
}

