import { getDb, initDb, generateReference } from "./index";
import type { InValue } from "@libsql/client";

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  display_order: number;
  is_active: number;
}

export interface MediaAsset {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  file_size: number;
  storage_path: string;
  url: string;
  alt_text: string | null;
  caption: string | null;
  asset_type: "stock_photo" | "customer_inspiration" | "concept_image" | "cert_document";
  is_archived: number;
  uploaded_by: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  product_type: "single_piece" | "multi_quantity" | "loose_gemstone" | "custom_example";
  category_id: string | null;
  category_name?: string;
  short_description: string | null;
  long_description: string | null;
  metal_purity: string | null;
  metal_color: string | null;
  gross_weight_grams: number | null;
  net_gold_weight_grams: number | null;
  dimensions: string | null;
  size_variant: string | null;
  gemstone_details: string | null;
  price_mode: "fixed_price" | "quote_first" | "indicative_estimate";
  fixed_price_amount: number | null;
  currency: string;
  price_assumptions: string | null;
  status: "draft" | "incomplete" | "published" | "reserved" | "sold" | "archived";
  is_demo: number;
  primary_media_id: string | null;
  primary_media_url?: string;
  gallery_media_ids: string | null;
  gallery_media_urls?: string[];
  last_availability_confirmed_at: string | null;
  care_instructions: string | null;
  private_admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomDesignRequest {
  id: string;
  reference_code: string;
  piece_type: string;
  intended_wearer: string | null;
  occasion: string | null;
  style_notes: string;
  must_have_details: string | null;
  exclusions: string | null;
  preferred_metal: string | null;
  preferred_gemstone: string | null;
  ring_or_wrist_size: string | null;
  budget_range: string;
  need_astrology_consultation: number;
  target_date: string | null;
  customer_name: string;
  customer_contact_method: string;
  customer_contact_value: string;
  preferred_contact_time: string | null;
  city: string | null;
  marketing_opt_in: number;
  attachments_json: string | null;
  status: string;
  private_notes: string | null;
  estimated_budget_draft: number | null;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  reference_code: string;
  enquiry_type: "quote_request" | "availability_check" | "showroom_viewing" | "general_question";
  product_id: string | null;
  product_name?: string;
  product_sku?: string;
  customer_name: string;
  customer_contact_method: string;
  customer_contact_value: string;
  preferred_viewing_date: string | null;
  message: string;
  status: string;
  assigned_staff_id: string | null;
  follow_up_due_date: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  reference_code: string;
  appointment_type: "astrology_ratna_consultation" | "showroom_jewellery_viewing";
  service_title: string;
  requested_date: string;
  requested_time_slot: string;
  mode: "in_person_showroom" | "phone" | "video";
  customer_name: string;
  customer_contact_method: string;
  customer_contact_value: string;
  preferred_language: string;
  status: string;
  fee_mode: string;
  fee_amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content_markdown: string;
  category: "jewellery_guide" | "pricing_explanation" | "gemstones_ratna" | "astrology_preparation" | "faqs";
  tags: string | null;
  author_name: string;
  reviewer_name: string | null;
  sources_json: string | null;
  status: "draft" | "in_review" | "published" | "archived";
  is_featured: number;
  published_at: string | null;
  updated_at: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  is_published: number;
}

export interface Quote {
  id: string;
  quote_number: string;
  version: number;
  enquiry_id: string | null;
  custom_design_id: string | null;
  customer_name: string;
  customer_contact: string;
  status: string;
  gold_rate_per_gram_applied: number | null;
  gold_rate_timestamp: string | null;
  total_gold_value: number | null;
  making_charges: number | null;
  stone_charges: number | null;
  other_charges: number | null;
  tax_charges: number | null;
  final_total: number;
  valid_until_date: string;
  terms_and_exclusions: string | null;
  collection_arrangement_notes: string | null;
  created_by_staff_id: string | null;
  created_at: string;
  updated_at: string;
  items?: QuoteItem[];
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  description: string;
  purity: string | null;
  weight_grams: number | null;
  unit_rate: number | null;
  amount: number;
}

// Ensure DB is initialized before queries (single-flight mutex)
let initPromise: Promise<void> | null = null;
async function ensureDb() {
  if (!initPromise) {
    initPromise = initDb();
  }
  await initPromise;
}

/**
 * Strips non-plain LibSQL Row properties (numeric indexes, length, null prototypes)
 * so objects can be serialized across Next.js Server-to-Client component boundaries.
 */
export function toPlainRow<T>(row: unknown): T {
  if (!row || typeof row !== "object") return row as T;
  const obj: Record<string, unknown> = {};
  for (const k of Object.keys(row)) {
    if (!/^\d+$/.test(k) && k !== "length") {
      obj[k] = (row as Record<string, unknown>)[k];
    }
  }
  return obj as T;
}

export function toPlainRows<T>(rows: unknown[]): T[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((r) => toPlainRow<T>(r));
}

// -----------------------------------------------------------------------------
// REPOSITORY METHODS
// -----------------------------------------------------------------------------

export const repo = {
  // --- Categories ---
  async getCategories(): Promise<ProductCategory[]> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute("SELECT * FROM product_categories WHERE is_active = 1 ORDER BY display_order ASC");
    return toPlainRows<ProductCategory>(res.rows);
  },

  // --- Products ---
  async getPublishedProducts(options?: {
    categorySlug?: string;
    search?: string;
    priceMode?: string;
    productType?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ products: Product[]; total: number }> {
    await ensureDb();
    const db = getDb();
    const isDemoAllowed = process.env.ENABLE_DEMO_SEED === "true";

    let sql = `
      SELECT p.*, c.name as category_name, m.url as primary_media_url
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      LEFT JOIN media_assets m ON p.primary_media_id = m.id
      WHERE p.status = 'published'
    `;
    const params: InValue[] = [];

    if (!isDemoAllowed) {
      sql += ` AND p.is_demo = 0`;
    }

    if (options?.categorySlug) {
      sql += ` AND c.slug = ?`;
      params.push(options.categorySlug);
    }

    if (options?.search) {
      sql += ` AND (p.name LIKE ? OR p.sku LIKE ? OR p.short_description LIKE ?)`;
      const term = `%${options.search}%`;
      params.push(term, term, term);
    }

    if (options?.priceMode) {
      sql += ` AND p.price_mode = ?`;
      params.push(options.priceMode);
    }

    if (options?.productType) {
      sql += ` AND p.product_type = ?`;
      params.push(options.productType);
    }

    const countSql = sql.replace(/SELECT[\s\S]*?FROM/, "SELECT COUNT(*) as total FROM");
    const countRes = await db.execute({ sql: countSql, args: params });
    const total = Number(countRes.rows[0]?.total || 0);

    sql += ` ORDER BY p.created_at DESC`;

    if (options?.limit) {
      sql += ` LIMIT ? OFFSET ?`;
      params.push(options.limit, options.offset || 0);
    }

    const res = await db.execute({ sql, args: params });
    const products = toPlainRows<Product>(res.rows);
    return { products, total };
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute({
      sql: `SELECT p.*, c.name as category_name, m.url as primary_media_url
            FROM products p
            LEFT JOIN product_categories c ON p.category_id = c.id
            LEFT JOIN media_assets m ON p.primary_media_id = m.id
            WHERE p.slug = ? AND p.status = 'published'`,
      args: [slug],
    });
    if (res.rows.length === 0) return null;
    return toPlainRow<Product>(res.rows[0]);
  },

  async getAdminProducts(): Promise<Product[]> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute(`
      SELECT p.*, c.name as category_name, m.url as primary_media_url
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      LEFT JOIN media_assets m ON p.primary_media_id = m.id
      ORDER BY p.updated_at DESC
    `);
    return toPlainRows<Product>(res.rows);
  },

  async getProductById(id: string): Promise<Product | null> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute({
      sql: `SELECT p.*, c.name as category_name, m.url as primary_media_url
            FROM products p
            LEFT JOIN product_categories c ON p.category_id = c.id
            LEFT JOIN media_assets m ON p.primary_media_id = m.id
            WHERE p.id = ?`,
      args: [id],
    });
    if (res.rows.length === 0) return null;
    return toPlainRow<Product>(res.rows[0]);
  },

  async saveProduct(product: Partial<Product> & { name: string; sku: string }): Promise<string> {
    await ensureDb();
    const db = getDb();
    const id = product.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const existing = product.id ? await this.getProductById(product.id) : null;

    if (existing) {
      await db.execute({
        sql: `UPDATE products SET
          sku = ?, slug = ?, name = ?, product_type = ?, category_id = ?,
          short_description = ?, long_description = ?, metal_purity = ?, metal_color = ?,
          gross_weight_grams = ?, net_gold_weight_grams = ?, dimensions = ?, size_variant = ?,
          gemstone_details = ?, price_mode = ?, fixed_price_amount = ?, currency = ?,
          price_assumptions = ?, status = ?, primary_media_id = ?, gallery_media_ids = ?,
          last_availability_confirmed_at = ?, care_instructions = ?, private_admin_notes = ?,
          updated_at = ?
          WHERE id = ?`,
        args: [
          product.sku,
          slug,
          product.name,
          product.product_type || "single_piece",
          product.category_id || null,
          product.short_description || null,
          product.long_description || null,
          product.metal_purity || null,
          product.metal_color || null,
          product.gross_weight_grams || null,
          product.net_gold_weight_grams || null,
          product.dimensions || null,
          product.size_variant || null,
          product.gemstone_details || null,
          product.price_mode || "quote_first",
          product.fixed_price_amount || null,
          product.currency || "INR",
          product.price_assumptions || null,
          product.status || "draft",
          product.primary_media_id || null,
          product.gallery_media_ids || null,
          product.last_availability_confirmed_at || null,
          product.care_instructions || null,
          product.private_admin_notes || null,
          now,
          id,
        ],
      });
    } else {
      await db.execute({
        sql: `INSERT INTO products (
          id, sku, slug, name, product_type, category_id,
          short_description, long_description, metal_purity, metal_color,
          gross_weight_grams, net_gold_weight_grams, dimensions, size_variant,
          gemstone_details, price_mode, fixed_price_amount, currency,
          price_assumptions, status, is_demo, primary_media_id, gallery_media_ids,
          last_availability_confirmed_at, care_instructions, private_admin_notes,
          created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?
        )`,
        args: [
          id,
          product.sku,
          slug,
          product.name,
          product.product_type || "single_piece",
          product.category_id || null,
          product.short_description || null,
          product.long_description || null,
          product.metal_purity || null,
          product.metal_color || null,
          product.gross_weight_grams || null,
          product.net_gold_weight_grams || null,
          product.dimensions || null,
          product.size_variant || null,
          product.gemstone_details || null,
          product.price_mode || "quote_first",
          product.fixed_price_amount || null,
          product.currency || "INR",
          product.price_assumptions || null,
          product.status || "draft",
          product.is_demo ? 1 : 0,
          product.primary_media_id || null,
          product.gallery_media_ids || null,
          product.last_availability_confirmed_at || now,
          product.care_instructions || null,
          product.private_admin_notes || null,
          now,
          now,
        ],
      });
    }
    return id;
  },

  // --- Media Assets ---
  async getMediaAssets(options?: { assetType?: string; unlinkedOnly?: boolean }): Promise<MediaAsset[]> {
    await ensureDb();
    const db = getDb();
    let sql = `SELECT * FROM media_assets WHERE is_archived = 0`;
    const params: InValue[] = [];

    if (options?.assetType) {
      sql += ` AND asset_type = ?`;
      params.push(options.assetType);
    }

    if (options?.unlinkedOnly) {
      sql += ` AND id NOT IN (SELECT primary_media_id FROM products WHERE primary_media_id IS NOT NULL)`;
    }

    sql += ` ORDER BY created_at DESC`;
    const res = await db.execute({ sql, args: params });
    return toPlainRows<MediaAsset>(res.rows);
  },

  async addMediaAsset(asset: Omit<MediaAsset, "created_at">): Promise<void> {
    await ensureDb();
    const db = getDb();
    const now = new Date().toISOString();
    await db.execute({
      sql: `INSERT INTO media_assets (
        id, filename, original_name, mime_type, file_size, storage_path, url, alt_text, caption, asset_type, is_archived, uploaded_by, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        asset.id,
        asset.filename,
        asset.original_name,
        asset.mime_type,
        asset.file_size,
        asset.storage_path,
        asset.url,
        asset.alt_text || null,
        asset.caption || null,
        asset.asset_type || "stock_photo",
        asset.is_archived || 0,
        asset.uploaded_by || null,
        now,
      ],
    });
  },

  // --- Custom Design Requests ---
  async createCustomDesignRequest(data: {
    piece_type: string;
    intended_wearer?: string;
    occasion?: string;
    style_notes: string;
    must_have_details?: string;
    exclusions?: string;
    preferred_metal?: string;
    preferred_gemstone?: string;
    ring_or_wrist_size?: string;
    budget_range: string;
    need_astrology_consultation?: boolean;
    target_date?: string;
    customer_name: string;
    customer_contact_method: string;
    customer_contact_value: string;
    preferred_contact_time?: string;
    city?: string;
    marketing_opt_in?: boolean;
    attachments_json?: string;
  }): Promise<{ id: string; reference_code: string }> {
    await ensureDb();
    const db = getDb();
    const id = `cd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const reference_code = generateReference("CD");
    const now = new Date().toISOString();

    await db.execute({
      sql: `INSERT INTO custom_design_requests (
        id, reference_code, piece_type, intended_wearer, occasion, style_notes,
        must_have_details, exclusions, preferred_metal, preferred_gemstone, ring_or_wrist_size,
        budget_range, need_astrology_consultation, target_date, customer_name,
        customer_contact_method, customer_contact_value, preferred_contact_time,
        city, marketing_opt_in, attachments_json, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`,
      args: [
        id,
        reference_code,
        data.piece_type,
        data.intended_wearer || null,
        data.occasion || null,
        data.style_notes,
        data.must_have_details || null,
        data.exclusions || null,
        data.preferred_metal || null,
        data.preferred_gemstone || null,
        data.ring_or_wrist_size || null,
        data.budget_range,
        data.need_astrology_consultation ? 1 : 0,
        data.target_date || null,
        data.customer_name,
        data.customer_contact_method,
        data.customer_contact_value,
        data.preferred_contact_time || null,
        data.city || null,
        data.marketing_opt_in ? 1 : 0,
        data.attachments_json || "[]",
        now,
        now,
      ],
    });

    return { id, reference_code };
  },

  async getCustomDesignByReference(ref: string): Promise<{ reference_code: string; status: string; created_at: string; piece_type: string } | null> {
    await ensureDb();
    const db = getDb();
    // SAFE PUBLIC PROJECTION: Never expose private attachments or personal contact details to reference query
    const res = await db.execute({
      sql: `SELECT reference_code, status, created_at, piece_type FROM custom_design_requests WHERE reference_code = ?`,
      args: [ref],
    });
    if (res.rows.length === 0) return null;
    return toPlainRow<{ reference_code: string; status: string; created_at: string; piece_type: string }>(res.rows[0]);
  },

  async getAdminCustomDesigns(): Promise<CustomDesignRequest[]> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute(`SELECT * FROM custom_design_requests ORDER BY created_at DESC`);
    return toPlainRows<CustomDesignRequest>(res.rows);
  },

  async updateCustomDesignStatus(id: string, status: string, notes?: string): Promise<void> {
    await ensureDb();
    const db = getDb();
    const now = new Date().toISOString();
    if (notes !== undefined) {
      await db.execute({
        sql: `UPDATE custom_design_requests SET status = ?, private_notes = ?, updated_at = ? WHERE id = ?`,
        args: [status, notes, now, id],
      });
    } else {
      await db.execute({
        sql: `UPDATE custom_design_requests SET status = ?, updated_at = ? WHERE id = ?`,
        args: [status, now, id],
      });
    }
  },

  // --- Enquiries ---
  async createEnquiry(data: {
    enquiry_type: "quote_request" | "availability_check" | "showroom_viewing" | "general_question";
    product_id?: string;
    customer_name: string;
    customer_contact_method: string;
    customer_contact_value: string;
    preferred_viewing_date?: string;
    message: string;
  }): Promise<{ id: string; reference_code: string }> {
    await ensureDb();
    const db = getDb();
    const id = `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const reference_code = generateReference("ENQ");
    const now = new Date().toISOString();

    await db.execute({
      sql: `INSERT INTO enquiries (
        id, reference_code, enquiry_type, product_id, customer_name,
        customer_contact_method, customer_contact_value, preferred_viewing_date,
        message, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`,
      args: [
        id,
        reference_code,
        data.enquiry_type,
        data.product_id || null,
        data.customer_name,
        data.customer_contact_method,
        data.customer_contact_value,
        data.preferred_viewing_date || null,
        data.message,
        now,
        now,
      ],
    });

    return { id, reference_code };
  },

  async getAdminEnquiries(): Promise<Enquiry[]> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute(`
      SELECT e.*, p.name as product_name, p.sku as product_sku
      FROM enquiries e
      LEFT JOIN products p ON e.product_id = p.id
      ORDER BY e.created_at DESC
    `);
    return toPlainRows<Enquiry>(res.rows);
  },

  async updateEnquiryStatus(id: string, status: string, notes?: string, followUpDate?: string): Promise<void> {
    await ensureDb();
    const db = getDb();
    const now = new Date().toISOString();
    await db.execute({
      sql: `UPDATE enquiries SET
        status = ?,
        internal_notes = COALESCE(?, internal_notes),
        follow_up_due_date = COALESCE(?, follow_up_due_date),
        updated_at = ?
        WHERE id = ?`,
      args: [status, notes || null, followUpDate || null, now, id],
    });
  },

  // --- Appointments & Astrology Consultation ---
  async createAppointment(data: {
    appointment_type: "astrology_ratna_consultation" | "showroom_jewellery_viewing";
    service_title: string;
    requested_date: string;
    requested_time_slot: string;
    mode: "in_person_showroom" | "phone" | "video";
    customer_name: string;
    customer_contact_method: string;
    customer_contact_value: string;
    preferred_language?: string;
    birth_date?: string;
    birth_time?: string;
    birth_place?: string;
    gender?: string;
    specific_questions?: string;
  }): Promise<{ id: string; reference_code: string }> {
    await ensureDb();
    const db = getDb();
    const id = `apt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const reference_code = generateReference("APT");
    const now = new Date().toISOString();

    // 1. Insert appointment record (pending_confirmation)
    await db.execute({
      sql: `INSERT INTO appointments (
        id, reference_code, appointment_type, service_title, requested_date,
        requested_time_slot, mode, customer_name, customer_contact_method,
        customer_contact_value, preferred_language, status, fee_mode, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_confirmation', 'confirm_with_studio', ?, ?)`,
      args: [
        id,
        reference_code,
        data.appointment_type,
        data.service_title,
        data.requested_date,
        data.requested_time_slot,
        data.mode,
        data.customer_name,
        data.customer_contact_method,
        data.customer_contact_value,
        data.preferred_language || "Hindi / English",
        now,
        now,
      ],
    });

    // 2. Insert protected birth details and confidential notes into isolated table
    if (data.birth_date || data.birth_time || data.birth_place || data.specific_questions) {
      await db.execute({
        sql: `INSERT INTO appointment_confidential_notes (
          appointment_id, birth_date, birth_time, birth_place, gender, specific_questions, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          data.birth_date || null,
          data.birth_time || null,
          data.birth_place || null,
          data.gender || null,
          data.specific_questions || null,
          now,
        ],
      });
    }

    return { id, reference_code };
  },

  async getAdminAppointments(): Promise<Appointment[]> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute(`SELECT * FROM appointments ORDER BY requested_date DESC, requested_time_slot ASC`);
    return toPlainRows<Appointment>(res.rows);
  },

  async getAppointmentConfidentialNotes(appointmentId: string): Promise<Record<string, unknown> | null> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute({
      sql: `SELECT * FROM appointment_confidential_notes WHERE appointment_id = ?`,
      args: [appointmentId],
    });
    if (res.rows.length === 0) return null;
    return toPlainRow<Record<string, unknown>>(res.rows[0]);
  },

  async updateAppointmentStatus(id: string, status: string): Promise<void> {
    await ensureDb();
    const db = getDb();
    const now = new Date().toISOString();
    await db.execute({
      sql: `UPDATE appointments SET status = ?, updated_at = ? WHERE id = ?`,
      args: [status, now, id],
    });
  },

  // --- Articles & FAQs ---
  async getPublishedArticles(): Promise<Article[]> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute(`
      SELECT * FROM articles
      WHERE status = 'published'
      ORDER BY is_featured DESC, published_at DESC
    `);
    return toPlainRows<Article>(res.rows);
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute({
      sql: `SELECT * FROM articles WHERE slug = ? AND status = 'published'`,
      args: [slug],
    });
    if (res.rows.length === 0) return null;
    return toPlainRow<Article>(res.rows[0]);
  },

  async getAdminArticles(): Promise<Article[]> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute(`SELECT * FROM articles ORDER BY updated_at DESC`);
    return toPlainRows<Article>(res.rows);
  },

  async getPublishedFaqs(): Promise<FAQ[]> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute(`SELECT * FROM faqs WHERE is_published = 1 ORDER BY display_order ASC`);
    return toPlainRows<FAQ>(res.rows);
  },

  // --- Business Settings ---
  async getSettings(): Promise<Record<string, string>> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute(`SELECT key, value FROM business_settings`);
    const map: Record<string, string> = {};
    for (const row of res.rows) {
      map[row.key as string] = row.value as string;
    }
    return map;
  },

  async updateSetting(key: string, value: string): Promise<void> {
    await ensureDb();
    const db = getDb();
    const now = new Date().toISOString();
    await db.execute({
      sql: `INSERT INTO business_settings (key, value, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
      args: [key, value, now],
    });
  },

  // --- Audit Logs ---
  async addAuditLog(entry: {
    staff_email?: string;
    action: string;
    entity_type: string;
    entity_id?: string;
    details?: string;
  }): Promise<void> {
    await ensureDb();
    const db = getDb();
    const id = `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();
    await db.execute({
      sql: `INSERT INTO audit_logs (id, staff_email, action, entity_type, entity_id, details, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        entry.staff_email || "system",
        entry.action,
        entry.entity_type,
        entry.entity_id || null,
        entry.details || null,
        now,
      ],
    });
  },

  async getAuditLogs(limit = 50): Promise<Array<Record<string, unknown>>> {
    await ensureDb();
    const db = getDb();
    const res = await db.execute({
      sql: `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?`,
      args: [limit],
    });
    return toPlainRows<Record<string, unknown>>(res.rows);
  },

  // --- Dashboard KPI Metrics ---
  async getDashboardMetrics(): Promise<{
    newEnquiries: number;
    pendingCustomDesigns: number;
    pendingAppointments: number;
    totalProducts: number;
    publishedProducts: number;
    unlinkedMediaCount: number;
  }> {
    await ensureDb();
    const db = getDb();
    const [enq, cd, apt, prods, pubProds, unlinkedMedia] = await Promise.all([
      db.execute("SELECT COUNT(*) as c FROM enquiries WHERE status = 'new'"),
      db.execute("SELECT COUNT(*) as c FROM custom_design_requests WHERE status IN ('new', 'reviewing')"),
      db.execute("SELECT COUNT(*) as c FROM appointments WHERE status = 'pending_confirmation'"),
      db.execute("SELECT COUNT(*) as c FROM products"),
      db.execute("SELECT COUNT(*) as c FROM products WHERE status = 'published'"),
      db.execute("SELECT COUNT(*) as c FROM media_assets WHERE is_archived = 0 AND id NOT IN (SELECT primary_media_id FROM products WHERE primary_media_id IS NOT NULL)"),
    ]);

    return {
      newEnquiries: Number(enq.rows[0]?.c || 0),
      pendingCustomDesigns: Number(cd.rows[0]?.c || 0),
      pendingAppointments: Number(apt.rows[0]?.c || 0),
      totalProducts: Number(prods.rows[0]?.c || 0),
      publishedProducts: Number(pubProds.rows[0]?.c || 0),
      unlinkedMediaCount: Number(unlinkedMedia.rows[0]?.c || 0),
    };
  },
};
