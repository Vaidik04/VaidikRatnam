"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

interface ExportCsvButtonProps {
  data: Record<string, unknown>[];
  filename: string;
  label?: string;
}

export function ExportCsvButton({ data, filename, label = "Export CSV (Tally/Excel)" }: ExportCsvButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No records to export.");
      return;
    }

    // Extract headers
    const headers = Object.keys(data[0]);

    // Format rows
    const rows = data.map((item) =>
      headers
        .map((h) => {
          let val = item[h];
          if (val === null || val === undefined) return "";
          if (typeof val === "object") val = JSON.stringify(val);
          val = String(val).replace(/"/g, '""');
          return `"${val}"`;
        })
        .join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="text-xs uppercase tracking-wider text-[#173B32] border-[#D4CCC0] hover:border-[#173B32] hover:bg-white"
    >
      <Download className="w-3.5 h-3.5 mr-1 text-[#B08D57]" />
      <span>{label}</span>
    </Button>
  );
}

