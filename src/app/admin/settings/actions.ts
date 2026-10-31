"use server";

import { repo } from "@/lib/db/repo";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { revalidatePath } from "next/cache";
import { fetchLiveBullionRates, BullionRatesData } from "@/lib/services/gold-rates";

const ALLOWED_SETTING_KEYS = new Set([
  "business_name",
  "tagline",
  "phone_display",
  "whatsapp_phone",
  "whatsapp_number",
  "email_contact",
  "shop_address",
  "showroom_address",
  "shop_hours",
  "showroom_hours",
  "father_consultant_name",
  "father_consultant_bio",
  "currency_symbol",
  "currency_code",
  "gold_indicative_rate_24k",
  "gold_indicative_rate_22k",
  "rates_source",
  "rates_last_synced_at",
  "city_spread_per_gram",
  "shop_upi_id",
]);

export async function updateBusinessSettingsAction(settingsMap: Record<string, string>): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageSettings")) {
      return { success: false, message: "Unauthorized: Insufficient staff permissions." };
    }

    if (!settingsMap || typeof settingsMap !== "object") {
      return { success: false, message: "Invalid settings payload." };
    }

    let updatedCount = 0;
    for (const [key, value] of Object.entries(settingsMap)) {
      if (ALLOWED_SETTING_KEYS.has(key) && typeof value === "string") {
        await repo.updateSetting(key, value.slice(0, 1000));
        updatedCount++;
      }
    }

    await repo.addAuditLog({
      staff_email: session.email,
      action: "settings_updated",
      entity_type: "business_settings",
      details: `Updated ${updatedCount} verified business configuration settings`,
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");
    revalidatePath("/tools/gold-budget-estimator");

    return { success: true };
  } catch (err: unknown) {
    console.error("Settings update error:", err);
    return { success: false, message: "Server error saving settings." };
  }
}

export async function fetchAndSyncBullionRatesAction(citySpread = 0): Promise<{
  success: boolean;
  message?: string;
  source?: string;
  timestamp?: string;
  rates?: BullionRatesData;
}> {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "canManageSettings")) {
      return { success: false, message: "Unauthorized staff role" };
    }

    const result = await fetchLiveBullionRates(citySpread);
    if (!result.success) {
      return { success: false, message: result.message || "Could not fetch bullion rates." };
    }

    const { rates, source, timestamp } = result;

    await Promise.all([
      repo.updateSetting("gold_indicative_rate_24k", rates.gold24kPer10g.toString()),
      repo.updateSetting("gold_indicative_rate_22k", rates.gold22kPer10g.toString()),
      repo.updateSetting("gold_rate_24k_per_gram", rates.gold24kPerGram.toString()),
      repo.updateSetting("gold_rate_22k_per_gram", rates.gold22kPerGram.toString()),
      repo.updateSetting("gold_rate_18k_per_gram", rates.gold18kPerGram.toString()),
      repo.updateSetting("gold_rate_14k_per_gram", rates.gold14kPerGram.toString()),
      repo.updateSetting("silver_rate_per_gram", rates.silverPerGram.toString()),
      repo.updateSetting("rates_last_synced_at", timestamp),
      repo.updateSetting("rates_source", source),
      repo.updateSetting("gold_city_spread_per_gram", citySpread.toString()),
    ]);

    await repo.addAuditLog({
      staff_email: session.email,
      action: "bullion_rates_synced",
      entity_type: "business_settings",
      details: `Synced live rates: 24K ₹${rates.gold24kPerGram}/g, 22K ₹${rates.gold22kPerGram}/g, Silver ₹${rates.silverPerGram}/g from ${source}`,
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    revalidatePath("/tools/gold-budget-estimator");
    revalidatePath("/jewellery");

    return {
      success: true,
      source,
      timestamp,
      rates,
    };
  } catch (err: unknown) {
    console.error("Bullion rate sync error:", err);
    return { success: false, message: "Failed to sync bullion rates." };
  }
}

