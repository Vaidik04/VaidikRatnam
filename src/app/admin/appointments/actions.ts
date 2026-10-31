"use server";

import { z } from "zod";
import { repo } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

const updateAppointmentSchema = z.object({
  id: z.string().min(2).max(100),
  newStatus: z.enum([
    "pending_confirmation",
    "confirmed",
    "reschedule_requested",
    "completed",
    "cancelled",
    "no_show",
  ]),
});

export async function updateAppointmentStatusAction(
  id: string,
  newStatus: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageAppointments")) {
      return { success: false, message: "Unauthorized: Access restricted to authorized personnel." };
    }

    const parsed = updateAppointmentSchema.safeParse({ id, newStatus });
    if (!parsed.success) {
      return { success: false, message: "Invalid appointment status parameter." };
    }

    await repo.updateAppointmentStatus(parsed.data.id, parsed.data.newStatus);

    await repo.addAuditLog({
      staff_email: session.email,
      action: "appointment_status_changed",
      entity_type: "appointment",
      entity_id: parsed.data.id,
      details: `Updated appointment status to ${parsed.data.newStatus}`,
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
      return { success: false, message: "Unauthorized: Access restricted to confidential notes viewer." };
    }

    if (!appointmentId || typeof appointmentId !== "string" || appointmentId.length > 100) {
      return { success: false, message: "Invalid appointment ID parameter." };
    }

    const data = await repo.getAppointmentConfidentialNotes(appointmentId);
    return { success: true, data: data || undefined };
  } catch (err: unknown) {
    console.error("Confidential notes error:", err);
    return { success: false, message: "Could not fetch confidential notes." };
  }
}
