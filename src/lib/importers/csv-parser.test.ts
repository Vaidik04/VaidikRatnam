import { describe, it, expect } from "vitest";
import { parseCsvRows } from "./csv-parser";

describe("parseCsvRows", () => {
  it("parses valid CSV rows and validates fields correctly", () => {
    const csv = `sku,name,category_slug,product_type,metal_purity,gross_weight_grams,net_gold_weight_grams,price_mode,fixed_price_amount,status
VR-G-01,Handcrafted Bangle,bangles,single_piece,22K Gold,25.4,25.4,quote_first,,published
VR-R-02,Diamond Solitaire,rings,single_piece,18K Gold,4.2,4.0,fixed_price,45000,draft`;

    const results = parseCsvRows(csv);
    expect(results.length).toBe(2);
    expect(results[0].isValid).toBe(true);
    expect(results[0].data.sku).toBe("VR-G-01");
    expect(results[1].isValid).toBe(true);
    expect(results[1].data.fixed_price_amount).toBe(45000);
  });

  it("detects missing SKU and duplicate SKU in the file", () => {
    const csv = `sku,name,category_slug,product_type,metal_purity,gross_weight_grams,net_gold_weight_grams,price_mode,fixed_price_amount,status
,Missing SKU Product,rings,single_piece,22K,10,10,quote_first,,draft
VR-DUP-01,First Piece,rings,single_piece,22K,10,10,quote_first,,draft
VR-DUP-01,Duplicate Piece,rings,single_piece,22K,10,10,quote_first,,draft`;

    const results = parseCsvRows(csv);
    expect(results[0].isValid).toBe(false);
    expect(results[0].errors).toContain("Missing required SKU");
    expect(results[1].isValid).toBe(true);
    expect(results[2].isValid).toBe(false);
    expect(results[2].errors[0]).toContain("Duplicate SKU");
  });

  it("detects invalid weight where net weight exceeds gross weight", () => {
    const csv = `sku,name,category_slug,product_type,metal_purity,gross_weight_grams,net_gold_weight_grams,price_mode,fixed_price_amount,status
VR-WT-01,Invalid Weight Item,rings,single_piece,22K,10.0,15.0,quote_first,,draft`;

    const results = parseCsvRows(csv);
    expect(results[0].isValid).toBe(false);
    expect(results[0].errors).toContain("Net gold weight cannot exceed gross weight");
  });
});

