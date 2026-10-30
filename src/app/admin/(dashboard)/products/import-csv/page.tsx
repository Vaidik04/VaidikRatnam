"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { parseCsvRows, CsvValidationResult, CsvProductRow } from "@/lib/importers/csv-parser";
import { importVerifiedCsvRows } from "@/app/admin/products/import-actions";
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const SAMPLE_CSV = `sku,name,category_slug,product_type,metal_purity,gross_weight_grams,net_gold_weight_grams,price_mode,fixed_price_amount,status
VR-G-NK-101,Antique 22K Gold Temple Necklace,necklaces,single_piece,22K Gold (916),54.20,54.20,quote_first,,published
VR-G-KD-102,Solid Gold Fluted Kada,bangles-bracelets,single_piece,22K Gold (916),38.50,38.50,indicative_estimate,,draft
VR-R-SL-103,Diamond Solitaire Band,rings,single_piece,18K Gold (750),4.20,4.00,fixed_price,68000,draft`;

export default function CsvImportPage() {
  const router = useRouter();
  const [validationResults, setValidationResults] = useState<CsvValidationResult[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<string | null>(null);

  const downloadSampleTemplate = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vaidik_ratnam_stock_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const results = parseCsvRows(content);
      setValidationResults(results);
    };
    reader.readAsText(file);
  };

  const validRows = validationResults.filter((r) => r.isValid);
  const invalidRows = validationResults.filter((r) => !r.isValid);

  const handleConfirmImport = async () => {
    if (validRows.length === 0) return;
    setIsImporting(true);

    try {
      const rowsToImport = validRows.map((r) => r.data as CsvProductRow);
      const res = await importVerifiedCsvRows(rowsToImport);

      if (res.success) {
        setImportSummary(`Successfully imported ${res.importedCount} product records into inventory.`);
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1200);
      } else {
        alert(res.message || "Failed to import rows.");
      }
    } catch {
      alert("Network error during batch import.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs text-[#626A65] hover:text-[#182522] mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            CSV Inventory Batch Import
          </h1>
          <p className="text-xs text-[#626A65] mt-0.5">
            Bulk import stock records with instant validation preview and duplicate SKU checks.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={downloadSampleTemplate}
          className="text-xs uppercase tracking-wider"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Download Sample Template
        </Button>
      </div>

      {importSummary && (
        <div className="p-4 bg-[#EEF3EE] border border-[#C5D5C4] rounded-sm text-xs text-[#173B32] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{importSummary}</span>
        </div>
      )}

      {/* Upload Box */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
          Select CSV File
        </h2>

        <div className="border-2 border-dashed border-[#D4CCC0] rounded-sm p-8 text-center bg-[#F7F4ED]/50 hover:bg-[#F7F4ED] transition-colors">
          <FileSpreadsheet className="w-8 h-8 text-[#173B32] mx-auto mb-2" />
          <p className="text-xs text-[#182522] font-medium mb-1">
            Upload your completed stock CSV spreadsheet
          </p>
          <p className="text-[11px] text-[#626A65] mb-4">
            Supports UTF-8 CSV with columns: sku, name, category_slug, product_type, metal_purity, gross_weight_grams, net_gold_weight_grams, price_mode, fixed_price_amount, status
          </p>
          <label className="cursor-pointer inline-block">
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="px-4 py-2 bg-[#173B32] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#122e27] transition-colors">
              Browse CSV File
            </span>
          </label>
        </div>
      </Card>

      {/* Validation Preview */}
      {validationResults.length > 0 && (
        <Card className="p-6 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-[#E5DFD5] pb-3">
            <div>
              <h2 className="font-serif text-base text-[#182522] font-medium">
                Batch Validation Results
              </h2>
              <span className="text-xs text-[#626A65]">
                Found {validationResults.length} rows: <strong className="text-[#173B32]">{validRows.length} valid</strong>, <strong className="text-[#A61C1C]">{invalidRows.length} with issues</strong>.
              </span>
            </div>

            {validRows.length > 0 && (
              <Button
                type="button"
                variant="primary"
                size="md"
                isLoading={isImporting}
                onClick={handleConfirmImport}
                className="text-xs uppercase tracking-wider font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Confirm &amp; Import {validRows.length} Valid Rows
              </Button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4ED] border-b border-[#E5DFD5] text-[#626A65] font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Row</th>
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Purity</th>
                  <th className="py-2.5 px-3">Weights</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Validation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE2]">
                {validationResults.map((r) => (
                  <tr key={r.rowNumber} className={r.isValid ? "hover:bg-[#EEF3EE]/30" : "bg-[#FFF0F0]/50"}>
                    <td className="py-2 px-3 font-mono text-[11px]">{r.rowNumber}</td>
                    <td className="py-2 px-3 font-mono font-bold text-[#182522]">{r.data.sku || "—"}</td>
                    <td className="py-2 px-3 font-medium text-[#182522]">{r.data.name || "—"}</td>
                    <td className="py-2 px-3 text-[#626A65]">{r.data.metal_purity || "—"}</td>
                    <td className="py-2 px-3 font-mono text-[11px] text-[#626A65]">
                      {r.data.net_gold_weight_grams ? `${r.data.net_gold_weight_grams}g` : "—"} / {r.data.gross_weight_grams ? `${r.data.gross_weight_grams}g` : "—"}
                    </td>
                    <td className="py-2 px-3 capitalize">{r.data.status}</td>
                    <td className="py-2 px-3">
                      {r.isValid ? (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#EEF3EE] text-[#173B32] font-semibold">
                          Valid
                        </span>
                      ) : (
                        <div className="space-y-0.5">
                          {r.errors.map((err, idx) => (
                            <span key={idx} className="block text-[11px] text-[#A61C1C]">
                              &bull; {err}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
