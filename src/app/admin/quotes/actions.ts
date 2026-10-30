"use server";

import { z } from "zod";
import { getDb, initDb } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

const quoteSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerContact: z.string().min(5, "Contact is required"),
  enquiryId: z.string().optional().nullable(),
  customDesignId: z.string().optional().nullable(),
  goldRatePerGramApplied: z.number().optional().nullable(),
  totalGoldValue: z.number().default(0),
  makingCharges: z.number().default(0),
  stoneCharges: z.number().default(0),
  otherCharges: z.number().default(0),
  taxCharges: z.number().default(0),
  finalTotal: z.number().min(0, "Final total is required"),
  validUntilDate: z.string().min(1, "Validity date is required"),
  termsAndExclusions: z.string().optional().nullable(),
  collectionArrangementNotes: z.string().optional().nullable(),
  items: z.array(
    z.object({
      description: z.string().min(1, "Item description required"),
      purity: z.string().optional().nullable(),
      weightGrams: z.number().optional().nullable(),
      unitRate: z.number().optional().nullable(),
      amount: z.number(),
    })
  ).min(1, "At least one line item is required"),
});

export async function createQuoteAction(formData: unknown): Promise<{
  success: boolean;
  quoteId?: string;
  quoteNumber?: string;
  message?: string;
}> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageQuotes")) {
      return { success: false, message: "Unauthorized staff role" };
    }

    const parsed = quoteSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        success: false,
        message: "Please complete all required quote fields and at least one line item.",
      };
    }

    const data = parsed.data;
    await initDb();
    const db = getDb();

    const quoteId = `quote-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quoteNumber = `VR-Q-${new Date().getFullYear()}-${randomSuffix}`;
    const now = new Date().toISOString();

    await db.execute({
      sql: `INSERT INTO quotes (
        id, quote_number, version, enquiry_id, custom_design_id, customer_name,
        customer_contact, status, gold_rate_per_gram_applied, gold_rate_timestamp,
        total_gold_value, making_charges, stone_charges, other_charges, tax_charges,
        final_total, valid_until_date, terms_and_exclusions, collection_arrangement_notes,
        created_by_staff_id, created_at, updated_at
      ) VALUES (
        ?, ?, 1, ?, ?, ?,
        ?, 'sent', ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?
      )`,
      args: [
        quoteId,
        quoteNumber,
        data.enquiryId || null,
        data.customDesignId || null,
        data.customerName,
        data.customerContact,
        data.goldRatePerGramApplied || null,
        now,
        data.totalGoldValue,
        data.makingCharges,
        data.stoneCharges,
        data.otherCharges,
        data.taxCharges,
        data.finalTotal,
        data.validUntilDate,
        data.termsAndExclusions || null,
        data.collectionArrangementNotes || null,
        session.staffId,
        now,
        now,
      ],
    });

    for (const item of data.items) {
      const itemId = `qi-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      await db.execute({
        sql: `INSERT INTO quote_items (id, quote_id, description, purity, weight_grams, unit_rate, amount)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          itemId,
          quoteId,
          item.description,
          item.purity || null,
          item.weightGrams || null,
          item.unitRate || null,
          item.amount,
        ],
      });
    }

    const { repo } = await import("@/lib/db/repo");
    await repo.addAuditLog({
      staff_email: session.email,
      action: "quote_created",
      entity_type: "quote",
      entity_id: quoteId,
      details: `Created quotation ${quoteNumber} for ${data.customerName} (₹${data.finalTotal})`,
    });

    revalidatePath("/admin/quotes");
    return { success: true, quoteId, quoteNumber };
  } catch (err: unknown) {
    console.error("Create quote error:", err);
    return { success: false, message: "Server error while saving quotation." };
  }
}
