export interface CsvProductRow {
  sku: string;
  name: string;
  category_slug?: string;
  product_type: string;
  metal_purity?: string;
  gross_weight_grams?: number;
  net_gold_weight_grams?: number;
  price_mode: string;
  fixed_price_amount?: number;
  status: string;
}

export interface CsvValidationResult {
  rowNumber: number;
  data: Partial<CsvProductRow>;
  isValid: boolean;
  errors: string[];
}

export function parseCsvRows(csvContent: string): CsvValidationResult[] {
  const lines = csvContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length <= 1) {
    return [];
  }

  const headerLine = lines[0];
  const headers = headerLine.split(",").map((h) => h.trim().toLowerCase());

  const results: CsvValidationResult[] = [];
  const seenSkus = new Set<string>();

  for (let i = 1; i < lines.length; i++) {
    const rowValues = lines[i].split(",").map((v) => v.trim());
    const rowData: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowData[h] = rowValues[idx] || "";
    });

    const errors: string[] = [];
    const sku = rowData["sku"] || "";
    const name = rowData["name"] || "";
    const productType = rowData["product_type"] || "single_piece";
    const priceMode = rowData["price_mode"] || "quote_first";
    const status = rowData["status"] || "draft";

    if (!sku) {
      errors.push("Missing required SKU");
    } else if (seenSkus.has(sku.toUpperCase())) {
      errors.push(`Duplicate SKU '${sku}' in this file`);
    } else {
      seenSkus.add(sku.toUpperCase());
    }

    if (!name) {
      errors.push("Missing product Name");
    }

    const grossWeight = rowData["gross_weight_grams"] ? parseFloat(rowData["gross_weight_grams"]) : undefined;
    const netWeight = rowData["net_gold_weight_grams"] ? parseFloat(rowData["net_gold_weight_grams"]) : undefined;

    if (grossWeight !== undefined && isNaN(grossWeight)) {
      errors.push("Gross weight must be a valid number");
    }
    if (netWeight !== undefined && isNaN(netWeight)) {
      errors.push("Net gold weight must be a valid number");
    }
    if (grossWeight !== undefined && netWeight !== undefined && netWeight > grossWeight) {
      errors.push("Net gold weight cannot exceed gross weight");
    }

    const fixedPrice = rowData["fixed_price_amount"] ? parseFloat(rowData["fixed_price_amount"]) : undefined;
    if (priceMode === "fixed_price" && (!fixedPrice || isNaN(fixedPrice))) {
      errors.push("Fixed price amount is required when price_mode is fixed_price");
    }

    results.push({
      rowNumber: i + 1,
      data: {
        sku,
        name,
        category_slug: rowData["category_slug"] || undefined,
        product_type: productType,
        metal_purity: rowData["metal_purity"] || undefined,
        gross_weight_grams: grossWeight,
        net_gold_weight_grams: netWeight,
        price_mode: priceMode,
        fixed_price_amount: fixedPrice,
        status: status,
      },
      isValid: errors.length === 0,
      errors,
    });
  }

  return results;
}

