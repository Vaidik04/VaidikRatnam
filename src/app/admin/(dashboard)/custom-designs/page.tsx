import React from "react";
import Link from "next/link";
import { repo } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Custom Design Requests — Vaidik Ratnam Admin",
};

export default async function AdminCustomDesignsPage() {
  const briefs = await repo.getAdminCustomDesigns();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#E5DFD5] pb-4">
        <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
          Bespoke Workshop Pipeline
        </span>
        <h1 className="font-serif text-2xl text-[#182522] font-normal">
          Custom Jewellery Design Briefs
        </h1>
        <p className="text-xs text-[#626A65] mt-0.5">
          Review client inspiration, evaluate feasibility, add private artisan notes, and issue quotations.
        </p>
      </div>

      {briefs.length === 0 ? (
        <Card className="p-12 text-center bg-white text-xs text-[#626A65]">
          No custom design briefs received yet.
        </Card>
      ) : (
        <div className="space-y-3">
          {briefs.map((b) => (
            <Link key={b.id} href={`/admin/custom-designs/${b.id}`} className="block">
              <Card className="p-5 bg-white hover:border-[#173B32] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-sm font-bold text-[#173B32]">
                      {b.reference_code}
                    </span>
                    <Badge variant={b.status === "new" ? "warning" : "available"}>
                      {b.status.replace(/_/g, " ")}
                    </Badge>
                    <span className="text-xs text-[#626A65]">
                      {new Date(b.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  <h3 className="font-serif text-base text-[#182522] font-medium capitalize">
                    {b.piece_type} Commission for {b.customer_name}
                  </h3>

                  <p className="text-xs text-[#626A65] line-clamp-1">
                    {b.style_notes}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-[#626A65] pt-1">
                    <span>Budget: <strong className="text-[#182522]">{b.budget_range.replace(/_/g, " ")}</strong></span>
                    <span>Metal: <strong className="text-[#182522]">{b.preferred_metal || "Undecided"}</strong></span>
                    <span>Contact: <strong className="text-[#182522] capitalize">{b.customer_contact_method}</strong> ({b.customer_contact_value})</span>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#173B32] flex items-center gap-1">
                    Review Brief <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
