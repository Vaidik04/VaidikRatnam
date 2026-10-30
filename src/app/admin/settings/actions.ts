"use server";

import { repo } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";

export async function updateBusinessSettingsAction(settingsMap: Record<string, string>): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageSettings")) {
      return { success: false, message: "Unauthorized staff role" };
    }

    for (const [key, value] of Object.entries(settingsMap)) {
      await repo.updateSetting(key, value);
    }

    await repo.addAuditLog({
      staff_email: session.email,
      action: "settings_updated",
      entity_type: "business_settings",
      details: `Updated ${Object.keys(settingsMap).length} business configuration settings`,
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");

    return { success: true };
  } catch (err: unknown) {
    console.error("Settings update error:", err);
    return { success: false, message: "Server error saving settings." };
  }
}

