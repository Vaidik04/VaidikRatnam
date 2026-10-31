"use server";

import { z } from "zod";
import { repo } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

const updateEnquirySchema = z.object({
  id: z.string().min(2).max(100),
  status: z.enum([
    "new",
    "contacted",
    "in_discussion",
    "appointment_booked",
    "closed_won",
    "closed_lost",
  ]),
  internalNotes: z.string().max(2000).optional(),
  followUpDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
});

export async function updateEnquiryAdminAction(
  id: string,
  status: string,
  internalNotes?: string,
  followUpDate?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageEnquiries")) {
      return { success: false, message: "Unauthorized: Insufficient staff permissions." };
    }

    const parsed = updateEnquirySchema.safeParse({ id, status, internalNotes, followUpDate });
    if (!parsed.success) {
      return { success: false, message: "Invalid enquiry parameters." };
    }

    await repo.updateEnquiryStatus(
      parsed.data.id,
      parsed.data.status,
      parsed.data.internalNotes,
      parsed.data.followUpDate || undefined
    );

    await repo.addAuditLog({
      staff_email: session.email,
      action: "enquiry_updated",
      entity_type: "enquiry",
      entity_id: parsed.data.id,
      details: `Updated enquiry status to ${parsed.data.status}`,
    });

    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (err: unknown) {
    console.error("Enquiry update error:", err);
    return { success: false, message: "Server error updating enquiry." };
  }
}
