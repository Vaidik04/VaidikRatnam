"use server";

import { customDesignSchema } from "@/lib/validations/custom-design";
import { repo } from "@/lib/db/repo";

export async function submitCustomDesignBrief(formData: unknown): Promise<{
  success: boolean;
  referenceCode?: string;
  errors?: Record<string, string[]>;
  message?: string;
}> {
  try {
    const parsed = customDesignSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return {
        success: false,
        errors: fieldErrors,
        message: "Please complete the required fields.",
      };
    }

    const data = parsed.data;

    const result = await repo.createCustomDesignRequest({
      piece_type: data.pieceType,
      intended_wearer: data.intendedWearer,
      occasion: data.occasion,
      style_notes: data.styleNotes,
      must_have_details: data.mustHaveDetails,
      exclusions: data.exclusions,
      preferred_metal: data.preferredMetal,
      preferred_gemstone: data.preferredGemstone,
      ring_or_wrist_size: data.ringOrWristSize,
      budget_range: data.budgetRange,
      need_astrology_consultation: data.needAstrologyConsultation,
      target_date: data.targetDate,
      customer_name: data.customerName,
      customer_contact_method: data.customerContactMethod,
      customer_contact_value: data.customerContactValue,
      preferred_contact_time: data.preferredContactTime,
      city: data.city,
      marketing_opt_in: data.marketingOptIn,
      attachments_json: "[]",
    });

    await repo.addAuditLog({
      action: "custom_design_submitted",
      entity_type: "custom_design_request",
      entity_id: result.id,
      details: `New design brief for ${data.pieceType} submitted by ${data.customerName} (${data.customerContactMethod})`,
    });

    return {
      success: true,
      referenceCode: result.reference_code,
    };
  } catch (error: unknown) {
    console.error("Custom design submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while saving your brief. Please try again or contact our studio directly.",
    };
  }
}

