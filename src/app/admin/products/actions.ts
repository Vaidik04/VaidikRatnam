"use server";

import { z } from "zod";
import { repo, Product } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

const productFormSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(2, "SKU is required"),
  name: z.string().min(2, "Product name is required"),
  product_type: z.enum(["single_piece", "multi_quantity", "loose_gemstone", "custom_example"]),
  category_id: z.string().optional().nullable(),
  short_description: z.string().optional().nullable(),
  long_description: z.string().optional().nullable(),
  metal_purity: z.string().optional().nullable(),
  metal_color: z.string().optional().nullable(),
  gross_weight_grams: z.number().optional().nullable(),
  net_gold_weight_grams: z.number().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  size_variant: z.string().optional().nullable(),
  gemstone_details: z.string().optional().nullable(),
  price_mode: z.enum(["fixed_price", "quote_first", "indicative_estimate"]),
  fixed_price_amount: z.number().optional().nullable(),
  price_assumptions: z.string().optional().nullable(),
  status: z.enum(["draft", "incomplete", "published", "reserved", "sold", "archived"]),
  primary_media_id: z.string().optional().nullable(),
  care_instructions: z.string().optional().nullable(),
  private_admin_notes: z.string().optional().nullable(),
});

export async function saveProductAction(data: unknown): Promise<{
  success: boolean;
  productId?: string;
  message?: string;
  errors?: Record<string, string[]>;
}> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageProducts")) {
      return { success: false, message: "Unauthorized: Insufficient staff permissions." };
    }

    const parsed = productFormSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: "Please correct the highlighted specification errors.",
      };
    }

    const val = parsed.data;
    const productId = await repo.saveProduct({
      id: val.id,
      sku: val.sku,
      name: val.name,
      product_type: val.product_type,
      category_id: val.category_id || null,
      short_description: val.short_description || null,
      long_description: val.long_description || null,
      metal_purity: val.metal_purity || null,
      metal_color: val.metal_color || null,
      gross_weight_grams: val.gross_weight_grams || null,
      net_gold_weight_grams: val.net_gold_weight_grams || null,
      dimensions: val.dimensions || null,
      size_variant: val.size_variant || null,
      gemstone_details: val.gemstone_details || null,
      price_mode: val.price_mode,
      fixed_price_amount: val.fixed_price_amount || null,
      price_assumptions: val.price_assumptions || null,
      status: val.status,
      primary_media_id: val.primary_media_id || null,
      care_instructions: val.care_instructions || null,
      private_admin_notes: val.private_admin_notes || null,
      is_demo: 0, // Admin created products are never demo
    });

    await repo.addAuditLog({
      staff_email: session.email,
      action: val.id ? "product_updated" : "product_created",
      entity_type: "product",
      entity_id: productId,
      details: `Saved product ${val.name} (${val.sku}) with status ${val.status}`,
    });

    revalidatePath("/jewellery");
    revalidatePath("/admin/products");

    return { success: true, productId };
  } catch (err: unknown) {
    console.error("Save product error:", err);
    return { success: false, message: "Server error while saving product." };
  }
}

export async function updateProductStatusAction(productId: string, newStatus: Product["status"]): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageProducts")) {
      return { success: false, message: "Unauthorized" };
    }

    const product = await repo.getProductById(productId);
    if (!product) return { success: false, message: "Product not found" };

    await repo.saveProduct({
      ...product,
      status: newStatus,
      last_availability_confirmed_at: new Date().toISOString(),
    });

    await repo.addAuditLog({
      staff_email: session.email,
      action: "product_status_changed",
      entity_type: "product",
      entity_id: productId,
      details: `Changed status of ${product.sku} to ${newStatus}`,
    });

    revalidatePath("/jewellery");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err) {
    console.error("Status update error:", err);
    return { success: false, message: "Failed to update product status." };
  }
}

