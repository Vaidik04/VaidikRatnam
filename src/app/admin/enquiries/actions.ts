"use server";

import { repo } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function updateEnquiryAdminAction(
  id: string,
  status: string,
  internalNotes?: string,
  followUpDate?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageEnquiries")) {
      return { success: false, message: "Unauthorized staff role" };
    }

    await repo.updateEnquiryStatus(id, status, internalNotes, followUpDate);

    await repo.addAuditLog({
      staff_email: session.email,
      action: "enquiry_updated",
      entity_type: "enquiry",
      entity_id: id,
      details: `Updated enquiry status to ${status}`,
    });

    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (err: unknown) {
    console.error("Enquiry update error:", err);
    return { success: false, message: "Server error updating enquiry." };
  }
}

