"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { repo } from "@/lib/db/repo";
import { rateLimiter, getClientIp } from "@/lib/security/rate-limiter";

const productEnquirySchema = z.object({
  productId: z.string().optional(),
  enquiryType: z.enum(["quote_request", "availability_check", "showroom_viewing", "general_question"]),
  customerName: z.string().min(2, "Please enter your name"),
  customerContactMethod: z.enum(["whatsapp", "phone", "email"]),
  customerContactValue: z.string().min(5, "Please enter your contact details"),
  preferredViewingDate: z.string().optional(),
  message: z.string().min(5, "Please enter your question or request details"),
});

export async function submitProductEnquiry(formData: unknown): Promise<{
  success: boolean;
  referenceCode?: string;
  errors?: Record<string, string[]>;
  message?: string;
}> {
  try {
    const reqHeaders = await headers();
    const clientIp = getClientIp(reqHeaders);
    const rateCheck = rateLimiter.check(`enquiry:${clientIp}`, 10, 60 * 60 * 1000);
    if (!rateCheck.allowed) {
      return {
        success: false,
        message: "Too many enquiries submitted from this network. Please wait a while before submitting again.",
      };
    }

    const parsed = productEnquirySchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        message: "Please fill in all required enquiry fields.",
      };
    }

    const data = parsed.data;

    const result = await repo.createEnquiry({
      enquiry_type: data.enquiryType,
      product_id: data.productId,
      customer_name: data.customerName,
      customer_contact_method: data.customerContactMethod,
      customer_contact_value: data.customerContactValue,
      preferred_viewing_date: data.preferredViewingDate,
      message: data.message,
    });

    await repo.addAuditLog({
      action: "enquiry_created",
      entity_type: "enquiry",
      entity_id: result.id,
      details: `${data.enquiryType} from ${data.customerName} (${data.customerContactMethod})`,
    });

    return {
      success: true,
      referenceCode: result.reference_code,
    };
  } catch (error: unknown) {
    console.error("Enquiry submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while submitting your enquiry. Please reach out via our contact phone.",
    };
  }
}

