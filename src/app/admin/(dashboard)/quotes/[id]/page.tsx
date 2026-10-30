import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getDb, initDb } from "@/lib/db";
import { Quote, QuoteItem } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { PrintQuoteButton } from "@/components/admin/PrintQuoteButton";

export const metadata = {
  title: "Formal Studio Quotation — Vaidik Ratnam Admin",
};

export default async function QuoteViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await initDb();
  const db = getDb();

  const [quoteRes, itemsRes, settingsRes] = await Promise.all([
    db.execute({ sql: "SELECT * FROM quotes WHERE id = ?", args: [id] }),
    db.execute({ sql: "SELECT * FROM quote_items WHERE quote_id = ?", args: [id] }),
    db.execute("SELECT key, value FROM business_settings"),
  ]);

  if (quoteRes.rows.length === 0) {
    notFound();
  }

  const quote = quoteRes.rows[0] as unknown as Quote;
  const items = itemsRes.rows as unknown as QuoteItem[];
  const settings: Record<string, string> = {};
  for (const r of settingsRes.rows) {
    settings[r.key as string] = r.value as string;
  }

  const isExpired = new Date(quote.valid_until_date) < new Date();

  const itemSummaryText = items
    .map(
      (it) =>
        `• ${it.description}${it.weight_grams ? ` (${it.purity || ""} ${it.weight_grams}g)` : ""} — ₹${it.amount.toLocaleString("en-IN")}`
    )
    .join("\n");

  const whatsappMessage = `Namaste ${quote.customer_name},\n\nPlease find your jewellery quotation (${quote.quote_number}) from Vaidik Ratnam — Traditional Gold Jewellery & Gemstone Shop.\n\nItem Breakdown:\n${itemSummaryText}\n\nTotal Estimated Amount: ₹${quote.final_total.toLocaleString("en-IN")}\nValidity: Valid until ${quote.valid_until_date} (based on current gold market rate)\n\nWe warmly welcome you to visit our shop to inspect and weigh this piece.`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Action Header (hidden in print) */}
      <div className="no-print flex items-center justify-between border-b border-[#E5DFD5] pb-4">
        <Link
          href="/admin/quotes"
          className="inline-flex items-center gap-1 text-xs text-[#626A65] hover:text-[#182522]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Quotes</span>
        </Link>

        <div className="flex items-center gap-2">
          {quote.customer_contact && (
            <a
              href={`https://wa.me/${(quote.customer_contact || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1B6442] hover:bg-[#134931] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </a>
          )}
          <PrintQuoteButton />
        </div>
      </div>

      {/* Printable Quotation Document */}
      <Card className="p-8 sm:p-12 bg-white border border-[#E5DFD5] shadow-xs space-y-8">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-[#0F3D2E] pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-auto shrink-0">
              <Image
                src="/images/brand/logo-horizontal-transparent.png"
                alt="Vaidik Ratnam"
                width={200}
                height={65}
                priority
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                Traditional Jewellery &amp; Gemstone Shop
              </span>
              <p className="text-xs text-[#626A65] mt-0.5">
                {settings["showroom_address"] || "Shop Address"} &bull; {settings["phone_display"] || "+91 98765 43210"}
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#173B32] block">
              Formal Quotation
            </span>
            <span className="font-mono text-base font-bold text-[#182522] block mt-0.5">
              {quote.quote_number}
            </span>
            <span className="text-xs text-[#626A65] block mt-0.5">
              Issued: {new Date(quote.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Client & Validity Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F7F4ED] p-4 rounded-xs border border-[#E5DFD5] text-xs">
          <div>
            <span className="text-[#626A65] uppercase font-mono text-[10px] block mb-1">
              Quotation Prepared For:
            </span>
            <strong className="text-sm font-serif text-[#182522] block">{quote.customer_name}</strong>
            <span className="text-[#626A65]">{quote.customer_contact}</span>
          </div>

          <div className="sm:text-right space-y-1">
            <span className="text-[#626A65] uppercase font-mono text-[10px] block">
              Rate Validity Notice:
            </span>
            <span className="font-semibold text-[#182522]">
              Valid Until: {quote.valid_until_date}
            </span>
            {isExpired && (
              <span className="block text-[#A61C1C] font-semibold">
                (This quote has expired. Rate must be re-confirmed).
              </span>
            )}
            {quote.gold_rate_per_gram_applied && (
              <span className="block text-[11px] text-[#626A65]">
                Applied 22K Reference Rate: ₹{quote.gold_rate_per_gram_applied}/g
              </span>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#182522] text-[#182522] font-semibold uppercase text-[10px] font-mono">
              <tr>
                <th className="py-2.5 px-2">Description</th>
                <th className="py-2.5 px-2">Purity</th>
                <th className="py-2.5 px-2 text-right">Weight (g)</th>
                <th className="py-2.5 px-2 text-right">Rate (₹/g)</th>
                <th className="py-2.5 px-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD5]">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="py-2.5 px-2 font-medium text-[#182522]">{item.description}</td>
                  <td className="py-2.5 px-2 text-[#626A65]">{item.purity || "—"}</td>
                  <td className="py-2.5 px-2 text-right font-mono">{item.weight_grams ? item.weight_grams.toFixed(2) : "—"}</td>
                  <td className="py-2.5 px-2 text-right font-mono">{item.unit_rate ? `₹${item.unit_rate}` : "—"}</td>
                  <td className="py-2.5 px-2 text-right font-mono font-medium text-[#182522]">₹{item.amount.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charges Breakdown & Total */}
        <div className="pt-4 border-t border-[#E5DFD5] flex flex-col sm:flex-row justify-between gap-6 text-xs">
          <div className="sm:max-w-xs text-[#626A65] text-[11px] leading-relaxed">
            <strong className="text-[#182522] block mb-1">Commercial Terms &amp; Policies:</strong>
            <p>{quote.terms_and_exclusions || "Shop collection only. Final invoice issued upon digital scale weighing."}</p>
          </div>

          <div className="sm:w-64 space-y-2">
            <div className="flex justify-between text-[#626A65]">
              <span>Gold Metal Value:</span>
              <span className="font-mono text-[#182522]">₹{quote.total_gold_value ? quote.total_gold_value.toLocaleString("en-IN") : 0}</span>
            </div>

            {quote.making_charges ? (
              <div className="flex justify-between text-[#626A65]">
                <span>Workmanship / Making:</span>
                <span className="font-mono text-[#182522]">₹{quote.making_charges.toLocaleString("en-IN")}</span>
              </div>
            ) : null}

            {quote.stone_charges ? (
              <div className="flex justify-between text-[#626A65]">
                <span>Gemstones / Pearls:</span>
                <span className="font-mono text-[#182522]">₹{quote.stone_charges.toLocaleString("en-IN")}</span>
              </div>
            ) : null}

            {quote.tax_charges ? (
              <div className="flex justify-between text-[#626A65]">
                <span>Applicable GST (3%):</span>
                <span className="font-mono text-[#182522]">₹{quote.tax_charges.toLocaleString("en-IN")}</span>
              </div>
            ) : null}

            <div className="pt-2 border-t border-[#182522] flex justify-between items-baseline font-bold text-sm text-[#182522]">
              <span>Grand Total:</span>
              <span className="font-serif text-xl text-[#173B32]">
                ₹{quote.final_total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Document Footer Signature Line */}
        <div className="pt-8 border-t border-[#E5DFD5] flex items-center justify-between text-[11px] text-[#626A65]">
          <span>100% BIS Hallmarking &bull; Non-transferable quote &bull; Valid for in-person shop collection</span>
          <div className="text-right">
            <span className="block border-t border-[#182522] w-36 pt-1 text-center font-mono">
              Authorized Signature
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
