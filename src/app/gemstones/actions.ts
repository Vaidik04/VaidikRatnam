"use server";

import { z } from "zod";
import { repo } from "@/lib/db/repo";

const gemstoneSourcingSchema = z.object({
  gemstoneType: z.string().min(1, "Please select or enter the gemstone type"),
  budgetRange: z.string().min(1, "Please enter your budget range"),
  purpose: z.string().optional(),
  weightCaratsPreferred: z.string().optional(),
  treatmentPreference: z.string().optional(),
  labReportRequired: z.boolean().default(true),
  customerName: z.string().min(2, "Please enter your name"),
  customerContactMethod: z.enum(["whatsapp", "phone", "email"]),
  customerContactValue: z.string().min(5, "Please enter your phone number or email"),
});

export async function submitGemstoneSourcingRequest(formData: unknown): Promise<{
  success: boolean;
  referenceCode?: string;
  errors?: Record<string, string[]>;
  message?: string;
}> {
  try {
    const parsed = gemstoneSourcingSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: "Please fill in the required sourcing request fields.",
      };
    }

    const data = parsed.data;

    const db = repo;
    const { getDb, initDb, generateReference } = await import("@/lib/db");
    await initDb();
    const dbClient = getDb();
    const id = `gs-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const reference_code = generateReference("RATNA");
    const now = new Date().toISOString();

    await dbClient.execute({
      sql: `INSERT INTO gemstone_sourcing_requests (
        id, reference_code, gemstone_type, budget_range, purpose,
        weight_carats_preferred, treatment_preference, lab_report_required,
        customer_name, customer_contact_method, customer_contact_value,
        status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`,
      args: [
        id,
        reference_code,
        data.gemstoneType,
        data.budgetRange,
        data.purpose || null,
        data.weightCaratsPreferred || null,
        data.treatmentPreference || null,
        data.labReportRequired ? 1 : 0,
        data.customerName,
        data.customerContactMethod,
        data.customerContactValue,
        now,
        now,
      ],
    });

    await db.addAuditLog({
      action: "gemstone_sourcing_created",
      entity_type: "gemstone_sourcing_request",
      entity_id: id,
      details: `Sourcing request for ${data.gemstoneType} by ${data.customerName}`,
    });

    return {
      success: true,
      referenceCode: reference_code,
    };
  } catch (error: unknown) {
    console.error("Gemstone sourcing error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while submitting your request.",
    };
  }
}

