"use server";

import { repo } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function updateCustomDesignAdminAction(
  id: string,
  status: string,
  privateNotes?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageCustomDesigns")) {
      return { success: false, message: "Unauthorized staff role" };
    }

    await repo.updateCustomDesignStatus(id, status, privateNotes);

    await repo.addAuditLog({
      staff_email: session.email,
      action: "custom_design_updated",
      entity_type: "custom_design_request",
      entity_id: id,
      details: `Updated brief status to ${status}`,
    });

    revalidatePath("/admin/custom-designs");
    revalidatePath(`/admin/custom-designs/${id}`);

    return { success: true };
  } catch (err: unknown) {
    console.error("Custom design admin update error:", err);
    return { success: false, message: "Server error updating brief." };
  }
}

