import React from "react";
import Link from "next/link";
import { getDb, initDb } from "@/lib/db";
import { Quote } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { Plus, Printer } from "lucide-react";

export const metadata = {
  title: "Quotations Builder — Vaidik Ratnam Admin",
};

export default async function AdminQuotesPage() {
  await initDb();
  const db = getDb();
  const res = await db.execute(`SELECT * FROM quotes ORDER BY created_at DESC`);
  const quotes = res.rows as unknown as Quote[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
            Commercial Studio Estimates
          </span>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            Quotations &amp; Workmanship Rates
          </h1>
          <p className="text-xs text-[#626A65] mt-0.5">
            Issue formal quotes with explicit bullion rate timestamps, validity dates, and collection arrangements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportCsvButton
            data={quotes as unknown as Record<string, unknown>[]}
            filename="vaidik_ratnam_quotes_ledger"
            label="Export Quotes CSV"
          />
          <Link href="/admin/quotes/new">
            <Button variant="primary" size="sm" className="text-xs uppercase tracking-wider font-semibold">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Create Quotation
            </Button>
          </Link>
        </div>
      </div>

      {quotes.length === 0 ? (
        <Card className="p-12 text-center bg-white text-xs text-[#626A65]">
          No formal quotations created yet. Click &ldquo;Create Quotation&rdquo; to build one.
        </Card>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => {
            const isExpired = new Date(q.valid_until_date) < new Date();
            return (
              <Card key={q.id} className="p-5 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-sm font-bold text-[#173B32]">
                      {q.quote_number}
                    </span>
                    <Badge variant={isExpired ? "warning" : "available"}>
                      {isExpired ? "Expired" : q.status}
                    </Badge>
                    <span className="text-xs text-[#626A65]">
                      Valid until: <strong className="text-[#182522]">{q.valid_until_date}</strong>
                    </span>
                  </div>

                  <h3 className="font-serif text-base text-[#182522] font-medium">
                    {q.customer_name} ({q.customer_contact})
                  </h3>

                  <div className="flex flex-wrap gap-4 text-xs text-[#626A65]">
                    {q.gold_rate_per_gram_applied && (
                      <span>Applied Rate: <strong className="font-mono text-[#182522]">₹{q.gold_rate_per_gram_applied}/g</strong></span>
                    )}
                    <span>Total Amount: <strong className="font-mono text-base text-[#182522]">₹{q.final_total.toLocaleString("en-IN")}</strong></span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Link href={`/admin/quotes/${q.id}`}>
                    <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                      <Printer className="w-3.5 h-3.5 mr-1" />
                      View &amp; Print
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
