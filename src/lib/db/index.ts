import { createClient, Client } from "@libsql/client";
import fs from "fs";
import path from "path";
import crypto from "crypto";

let dbInstance: Client | null = null;

export function getDb(): Client {
  if (!dbInstance) {
    const url = process.env.DATABASE_URL || "file:vaidikratnam.db";
    dbInstance = createClient({
      url,
    });
  }
  return dbInstance;
}

// Password hashing using native crypto pbkdf2
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(":");
    if (!salt || !originalHash) return false;
    const testHash = crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
    return crypto.timingSafeEqual(
      Buffer.from(testHash, "hex"),
      Buffer.from(originalHash, "hex")
    );
  } catch {
    return false;
  }
}

// Generates non-guessable, human-readable references
export function generateReference(prefix: string): string {
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `VR-${prefix}-${timestamp}${randomPart}`;
}

// Run schema initialization and initial seed if needed
export async function initDb(): Promise<void> {
  const db = getDb();
  const schemaPath = path.join(process.cwd(), "src/lib/db/schema.sql");
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    // Strip line comments first, then split by semicolon
    const cleanSql = schemaSql.replace(/--.*$/gm, "").trim();
    const statements = cleanSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      try {
        await db.execute(stmt);
      } catch (err: unknown) {
        // Libsql might throw if index/table already exists
        const error = err as { message?: string };
        if (!error?.message?.includes("already exists")) {
          console.warn("Schema init statement warning:", error?.message);
        }
      }
    }
  }

  // Ensure default categories exist
  const catCountRes = await db.execute("SELECT COUNT(*) as count FROM product_categories");
  const catCount = Number(catCountRes.rows[0]?.count || 0);

  if (catCount === 0) {
    const now = new Date().toISOString();
    const defaultCategories = [
      { id: "cat-gold-jewellery", slug: "gold-jewellery", name: "Gold Jewellery", desc: "Hallmarked 22K & 18K handcrafted yellow, white, and rose gold pieces", order: 1 },
      { id: "cat-silver-jewellery", slug: "silver-jewellery", name: "Silver Jewellery", desc: "Fine 925 sterling silver daily wear, vintage, and occasion jewellery", order: 2 },
      { id: "cat-rings", slug: "rings", name: "Rings & Bands", desc: "Bespoke engagement bands, daily wear rings, and astrological Ratna settings", order: 3 },
      { id: "cat-necklaces", slug: "necklaces", name: "Necklaces & Pendants", desc: "Hand-finished chains, bridal haar, and sacred gemstone pendants", order: 4 },
      { id: "cat-earrings", slug: "earrings", name: "Earrings & Jhumkas", desc: "Timeless traditional jhumkas, modern studs, and delicate drops", order: 5 },
      { id: "cat-bangles", slug: "bangles-bracelets", name: "Bangles & Bracelets", desc: "Solid gold kadas, flexible bracelets, and everyday bangles", order: 6 },
      { id: "cat-loose-gemstones", slug: "loose-gemstones", name: "Loose Gemstones & Ratna", desc: "Carefully sourced natural Vedic gemstones with transparent documentation", order: 7 },
    ];

    for (const c of defaultCategories) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO product_categories (id, slug, name, description, display_order, is_active, created_at)
              VALUES (?, ?, ?, ?, ?, 1, ?)`,
        args: [c.id, c.slug, c.name, c.desc, c.order, now],
      });
    }
  }

  // Ensure default business settings exist
  const settingsCountRes = await db.execute("SELECT COUNT(*) as count FROM business_settings");
  const settingsCount = Number(settingsCountRes.rows[0]?.count || 0);

  if (settingsCount === 0) {
    const now = new Date().toISOString();
    const defaults = [
      { key: "business_name", value: "Vaidik Ratnam", desc: "Public Brand Name" },
      { key: "tagline", value: "Timeless Jewellery • Guided by Wisdom", desc: "Official Brand Tagline" },
      { key: "phone_display", value: "+91 98765 43210", desc: "Shop Phone (Editable)" },
      { key: "whatsapp_number", value: "", desc: "WhatsApp Number (Leave blank until verified)" },
      { key: "email_contact", value: "shop@vaidikratnam.com", desc: "Official Contact Email" },
      { key: "showroom_address", value: "Shop address to be updated in Admin Settings", desc: "Physical Shop Address" },
      { key: "showroom_hours", value: "Mon - Sat: 11:00 AM - 8:00 PM | Sun: By Appointment", desc: "Operating Shop Hours" },
      { key: "father_consultant_name", value: "Consultant details to be configured in Settings", desc: "Father's Verified Name" },
      { key: "father_consultant_bio", value: "Traditional Vedic astrology and gemstone selection guidance based on generational family study.", desc: "Father's Bio" },
      { key: "currency_symbol", value: "₹", desc: "Currency Symbol" },
      { key: "currency_code", value: "INR", desc: "Currency ISO Code" },
      { key: "gold_indicative_rate_24k", value: "78500", desc: "Indicative gold rate reference (per 10g) for estimator" },
      { key: "gold_indicative_rate_22k", value: "72000", desc: "Indicative 22K gold rate reference (per 10g)" },
    ];

    for (const s of defaults) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO business_settings (key, value, description, updated_at) VALUES (?, ?, ?, ?)`,
        args: [s.key, s.value, s.desc, now],
      });
    }
  }

  // Ensure initial admin user exists if no staff user exists
  const staffCountRes = await db.execute("SELECT COUNT(*) as count FROM staff_users");
  const staffCount = Number(staffCountRes.rows[0]?.count || 0);

  if (staffCount === 0) {
    const now = new Date().toISOString();
    const defaultPasswordHash = hashPassword("AdminVaidik2026!");
    await db.execute({
      sql: `INSERT OR IGNORE INTO staff_users (id, email, full_name, role, password_hash, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        "staff-owner-1",
        "admin@vaidikratnam.com",
        "Vaidik Ratnam Owner",
        "owner",
        defaultPasswordHash,
        now,
        now,
      ],
    });
  }
}
