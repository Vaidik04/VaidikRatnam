"use server";

import { repo, Product } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";
import { CsvProductRow } from "@/lib/importers/csv-parser";

export async function importVerifiedCsvRows(rows: CsvProductRow[]): Promise<{
  success: boolean;
  importedCount: number;
  message?: string;
}> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageProducts")) {
      return { success: false, importedCount: 0, message: "Unauthorized staff role" };
    }

    let importedCount = 0;
    const categories = await repo.getCategories();
    const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

    for (const row of rows) {
      const categoryId = row.category_slug ? categoryMap.get(row.category_slug) || null : null;

      await repo.saveProduct({
        sku: row.sku,
        name: row.name,
        product_type: row.product_type as Product["product_type"],
        category_id: categoryId,
        metal_purity: row.metal_purity || null,
        gross_weight_grams: row.gross_weight_grams || null,
        net_gold_weight_grams: row.net_gold_weight_grams || null,
        price_mode: row.price_mode as Product["price_mode"],
        fixed_price_amount: row.fixed_price_amount || null,
        status: (row.status as Product["status"]) || "draft",
        is_demo: 0,
      });
      importedCount++;
    }

    await repo.addAuditLog({
      staff_email: session.email,
      action: "csv_products_imported",
      entity_type: "product",
      details: `Imported ${importedCount} stock rows via CSV batch upload`,
    });

    revalidatePath("/jewellery");
    revalidatePath("/admin/products");

    return { success: true, importedCount };
  } catch (err: unknown) {
    console.error("CSV import error:", err);
    return { success: false, importedCount: 0, message: "Failed to persist imported rows." };
  }
}

