"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { repo } from "@/lib/db/repo";
import { rateLimiter, getClientIp } from "@/lib/security/rate-limiter";

const consultationRequestSchema = z.object({
  serviceTitle: z.string().min(1, "Please select a consultation service"),
  requestedDate: z.string().min(1, "Please select your preferred date"),
  requestedTimeSlot: z.string().min(1, "Please select a preferred time slot"),
  mode: z.enum(["in_person_showroom", "phone", "video"]),
  customerName: z.string().min(2, "Please enter your name"),
  customerContactMethod: z.enum(["phone", "whatsapp", "email"]),
  customerContactValue: z.string().min(5, "Please enter your phone number or email"),
  preferredLanguage: z.string().default("Hindi / English"),
  birthDate: z.string().optional(),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  gender: z.string().optional(),
  birthTimeAccuracy: z.enum(["exact", "within_15_mins", "approximate_1h", "unknown_prashna"]).optional(),
  focusAreas: z.array(z.string()).optional(),
  currentGemstones: z.string().optional(),
  specificQuestions: z.string().optional(),
  privacyAcknowledged: z.literal(true, {
    message: "You must acknowledge the privacy notice to submit a request.",
  }),
});

export async function submitConsultationRequest(formData: unknown): Promise<{
  success: boolean;
  referenceCode?: string;
  errors?: Record<string, string[]>;
  message?: string;
}> {
  try {
    const reqHeaders = await headers();
    const clientIp = getClientIp(reqHeaders);
    const rateCheck = rateLimiter.check(`consultation:${clientIp}`, 10, 60 * 60 * 1000);
    if (!rateCheck.allowed) {
      return {
        success: false,
        message: "Appointment request limit reached for this session. Please try again later.",
      };
    }

    const parsed = consultationRequestSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: "Please fill in all required appointment fields.",
      };
    }

    const data = parsed.data;

    // Compile comprehensive confidential preparation notes for the consultant
    const structuredNotes = [
      data.birthTimeAccuracy
        ? `[Birth Time Accuracy: ${data.birthTimeAccuracy.replace(/_/g, " ").toUpperCase()}]`
        : null,
      data.focusAreas && data.focusAreas.length > 0
        ? `[Primary Focus Areas: ${data.focusAreas.join(", ")}]`
        : null,
      data.currentGemstones && data.currentGemstones.trim()
        ? `[Currently Worn Gemstones: ${data.currentGemstones.trim()}]`
        : null,
      data.specificQuestions && data.specificQuestions.trim()
        ? `Client Questions & Life Context:\n${data.specificQuestions.trim()}`
        : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const result = await repo.createAppointment({
      appointment_type: "astrology_ratna_consultation",
      service_title: data.serviceTitle,
      requested_date: data.requestedDate,
      requested_time_slot: data.requestedTimeSlot,
      mode: data.mode,
      customer_name: data.customerName,
      customer_contact_method: data.customerContactMethod,
      customer_contact_value: data.customerContactValue,
      preferred_language: data.preferredLanguage,
      birth_date: data.birthDate,
      birth_time: data.birthTime,
      birth_place: data.birthPlace,
      gender: data.gender,
      specific_questions: structuredNotes || undefined,
    });

    await repo.addAuditLog({
      action: "appointment_requested",
      entity_type: "appointment",
      entity_id: result.id,
      details: `Astrology consultation requested by ${data.customerName} for ${data.requestedDate} (${data.mode}) - Ref: ${result.reference_code}`,
    });

    return {
      success: true,
      referenceCode: result.reference_code,
    };
  } catch (error: unknown) {
    console.error("Consultation request error:", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while scheduling your request. Please try again or reach out directly to the studio.",
    };
  }
}
