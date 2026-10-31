"use server";

import { z } from "zod";
import { repo } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

const updateCustomDesignSchema = z.object({
  id: z.string().min(2).max(100),
  status: z.enum([
    "new",
    "reviewing",
    "cad_in_progress",
    "awaiting_customer",
    "in_production",
    "ready_for_collection",
    "completed",
    "cancelled",
  ]),
  privateNotes: z.string().max(2000).optional(),
});

export async function updateCustomDesignAdminAction(
  id: string,
  status: string,
  privateNotes?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageCustomDesigns")) {
      return { success: false, message: "Unauthorized: Insufficient staff permissions." };
    }

    const parsed = updateCustomDesignSchema.safeParse({ id, status, privateNotes });
    if (!parsed.success) {
      return { success: false, message: "Invalid custom design status parameter." };
    }

    await repo.updateCustomDesignStatus(parsed.data.id, parsed.data.status, parsed.data.privateNotes);

    await repo.addAuditLog({
      staff_email: session.email,
      action: "custom_design_updated",
      entity_type: "custom_design_request",
      entity_id: parsed.data.id,
      details: `Updated brief status to ${parsed.data.status}`,
    });

    revalidatePath("/admin/custom-designs");
    revalidatePath(`/admin/custom-designs/${parsed.data.id}`);

    return { success: true };
  } catch (err: unknown) {
    console.error("Custom design admin update error:", err);
    return { success: false, message: "Server error updating brief." };
  }
}
