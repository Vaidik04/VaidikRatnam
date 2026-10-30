"use server";

import { repo } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatusAction(
  id: string,
  newStatus: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageAppointments")) {
      return { success: false, message: "Unauthorized staff role" };
    }

    await repo.updateAppointmentStatus(id, newStatus);

    await repo.addAuditLog({
      staff_email: session.email,
      action: "appointment_status_changed",
      entity_type: "appointment",
      entity_id: id,
      details: `Updated appointment status to ${newStatus}`,
    });

    revalidatePath("/admin/appointments");
    return { success: true };
  } catch (err: unknown) {
    console.error("Appointment update error:", err);
    return { success: false, message: "Server error updating appointment." };
  }
}

export async function getConfidentialNotesAction(
  appointmentId: string
): Promise<{ success: boolean; data?: Record<string, unknown>; message?: string }> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canViewConfidentialNotes")) {
      return { success: false, message: "Unauthorized: Protected birth details." };
    }

    const data = await repo.getAppointmentConfidentialNotes(appointmentId);
    return { success: true, data: data || undefined };
  } catch (err: unknown) {
    console.error("Confidential notes error:", err);
    return { success: false, message: "Could not fetch confidential notes." };
  }
}

