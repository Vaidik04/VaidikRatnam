"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { repo } from "@/lib/db/repo";
import { revalidatePath } from "next/cache";
import { rateLimiter, getClientIp } from "@/lib/security/rate-limiter";
import { fetchLiveBullionRates } from "@/lib/services/gold-rates";

const rateLockSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),
  customerPhone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone format"),
  karat: z.enum(["22K", "24K", "18K"]),
  weightGrams: z.number().min(1, "Minimum weight is 1 gram").max(500, "Maximum weight is 500 grams"),
  ratePerGram: z.number().positive(),
  tokenAmount: z.number().min(1000, "Minimum token deposit is ₹1,000").max(100000, "Token deposit limit exceeded"),
  paymentMode: z.enum(["upi", "shop_counter"]),
});

export type RateLockRequest = z.infer<typeof rateLockSchema>;

export interface RateLockResult {
  success: boolean;
  referenceCode?: string;
  upiUrl?: string;
  message?: string;
}

export async function submitRateLockAction(formData: unknown): Promise<RateLockResult> {
  try {
    const reqHeaders = await headers();
    const clientIp = getClientIp(reqHeaders);

    // Rate limit: max 5 rate lock submissions per 15 minutes per IP
    const rateCheck = rateLimiter.check(`rate-lock:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return {
        success: false,
        message: "Too many reservation requests from this connection. Please wait a few minutes before trying again.",
      };
    }

    const parsed = rateLockSchema.safeParse(formData);
    if (!parsed.success) {
      const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      return {
        success: false,
        message: firstError || "Invalid rate lock reservation data.",
      };
    }

    const data = parsed.data;

    // Verify rate on the server rather than blindly trusting client value
    const live = await fetchLiveBullionRates();
    const serverRates: Record<string, number> = {
      "24K": live.rates.gold24kPerGram,
      "22K": live.rates.gold22kPerGram,
      "18K": live.rates.gold18kPerGram,
    };
    const verifiedRate = serverRates[data.karat] || data.ratePerGram;

    const settings = await repo.getSettings().catch(() => ({} as Record<string, string>));
    const shopUpiId = settings.shop_upi_id || process.env.SHOP_UPI_ID || "vaidikratnam@upi";

    const notes = [
      `RATE LOCK BOOKING RESERVATION`,
      `Gold Karat: ${data.karat}`,
      `Locked Weight: ${data.weightGrams} grams`,
      `Verified Locked Rate: ₹${verifiedRate.toLocaleString("en-IN")}/g`,
      `Total Estimated Gold Value: ₹${(data.weightGrams * verifiedRate).toLocaleString("en-IN")}`,
      `Token Advance: ₹${data.tokenAmount.toLocaleString("en-IN")}`,
      `Preferred Payment Mode: ${data.paymentMode === "upi" ? "Instant UPI" : "Pay at Shop Counter"}`,
      `IP Address: ${clientIp}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join(" | ");

    const { reference_code } = await repo.createEnquiry({
      enquiry_type: "quote_request",
      customer_name: data.customerName,
      customer_contact_method: "phone",
      customer_contact_value: data.customerPhone,
      message: notes,
    });

    // Generate secure standard UPI Intent link
    const upiUrl = `upi://pay?pa=${encodeURIComponent(shopUpiId)}&pn=${encodeURIComponent(
      "Vaidik Ratnam Jewellery"
    )}&am=${data.tokenAmount}&tn=${encodeURIComponent(`RateLock_${reference_code}`)}&cu=INR`;

    await repo.addAuditLog({
      staff_email: "system",
      action: "rate_lock_created",
      entity_type: "enquiries",
      entity_id: reference_code,
      details: `Rate lock reserved for ${data.weightGrams}g ${data.karat} by ${data.customerName} (IP: ${clientIp})`,
    });

    revalidatePath("/admin/enquiries");
    revalidatePath("/admin");

    return {
      success: true,
      referenceCode: reference_code,
      upiUrl,
    };
  } catch (err: unknown) {
    console.error("submitRateLockAction error:", err);
    return {
      success: false,
      message: "An unexpected error occurred while processing your rate lock booking.",
    };
  }
}
