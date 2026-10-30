"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Printer } from "lucide-react";

export function PrintQuoteButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
      className="text-xs uppercase tracking-wider font-medium"
    >
      <Printer className="w-3.5 h-3.5 mr-1.5" />
      Print Quotation Certificate
    </Button>
  );
}

