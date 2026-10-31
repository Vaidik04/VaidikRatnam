-- ==============================================================================
-- VAIDIKRATNAM.COM — CORE DATABASE SCHEMA
-- Compatible with LibSQL / SQLite and PostgreSQL / Supabase
-- ==============================================================================

CREATE TABLE IF NOT EXISTS staff_users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('owner', 'inventory_staff', 'consultant', 'content_editor', 'viewer')),
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  asset_type TEXT DEFAULT 'stock_photo' CHECK(asset_type IN ('stock_photo', 'customer_inspiration', 'concept_image', 'cert_document')),
  is_archived INTEGER DEFAULT 0,
  uploaded_by TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK(product_type IN ('single_piece', 'multi_quantity', 'loose_gemstone', 'custom_example')),
  category_id TEXT REFERENCES product_categories(id),
  short_description TEXT,
  long_description TEXT,
  metal_purity TEXT,
  metal_color TEXT,
  gross_weight_grams REAL,
  net_gold_weight_grams REAL,
  dimensions TEXT,
  size_variant TEXT,
  gemstone_details TEXT,
  price_mode TEXT NOT NULL DEFAULT 'quote_first' CHECK(price_mode IN ('fixed_price', 'quote_first', 'indicative_estimate')),
  fixed_price_amount REAL,
  currency TEXT DEFAULT 'INR',
  price_assumptions TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'incomplete', 'published', 'reserved', 'sold', 'archived')),
  is_demo INTEGER DEFAULT 0,
  primary_media_id TEXT REFERENCES media_assets(id),
  gallery_media_ids TEXT,
  last_availability_confirmed_at TEXT,
  care_instructions TEXT,
  private_admin_notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS custom_design_requests (
  id TEXT PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  piece_type TEXT NOT NULL,
  intended_wearer TEXT,
  occasion TEXT,
  style_notes TEXT NOT NULL,
  must_have_details TEXT,
  exclusions TEXT,
  preferred_metal TEXT,
  preferred_gemstone TEXT,
  ring_or_wrist_size TEXT,
  budget_range TEXT NOT NULL,
  need_astrology_consultation INTEGER DEFAULT 0,
  target_date TEXT,
  customer_name TEXT NOT NULL,
  customer_contact_method TEXT NOT NULL,
  customer_contact_value TEXT NOT NULL,
  preferred_contact_time TEXT,
  city TEXT,
  marketing_opt_in INTEGER DEFAULT 0,
  attachments_json TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'reviewing', 'needs_information', 'consultation_requested', 'quote_draft', 'quote_sent', 'customer_review', 'approved', 'in_progress_manual', 'ready_for_viewing', 'completed', 'declined', 'closed')),
  private_notes TEXT,
  estimated_budget_draft REAL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  enquiry_type TEXT NOT NULL CHECK(enquiry_type IN ('quote_request', 'availability_check', 'showroom_viewing', 'general_question')),
  product_id TEXT REFERENCES products(id),
  customer_name TEXT NOT NULL,
  customer_contact_method TEXT NOT NULL,
  customer_contact_value TEXT NOT NULL,
  preferred_viewing_date TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'reviewing', 'needs_information', 'viewing_scheduled', 'quote_sent', 'confirmed', 'closed', 'lost')),
  assigned_staff_id TEXT,
  follow_up_due_date TEXT,
  internal_notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gemstone_sourcing_requests (
  id TEXT PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  gemstone_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  purpose TEXT,
  weight_carats_preferred TEXT,
  treatment_preference TEXT,
  lab_report_required INTEGER DEFAULT 1,
  customer_name TEXT NOT NULL,
  customer_contact_method TEXT NOT NULL,
  customer_contact_value TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'reviewing', 'options_to_share', 'quote_sent', 'customer_decision', 'fulfilled_by_agreed_method', 'closed')),
  internal_notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  appointment_type TEXT NOT NULL CHECK(appointment_type IN ('astrology_ratna_consultation', 'showroom_jewellery_viewing')),
  service_title TEXT NOT NULL,
  requested_date TEXT NOT NULL,
  requested_time_slot TEXT NOT NULL,
  mode TEXT NOT NULL CHECK(mode IN ('in_person_showroom', 'phone', 'video')),
  customer_name TEXT NOT NULL,
  customer_contact_method TEXT NOT NULL,
  customer_contact_value TEXT NOT NULL,
  preferred_language TEXT DEFAULT 'Hindi / English',
  status TEXT NOT NULL DEFAULT 'pending_confirmation' CHECK(status IN ('pending_confirmation', 'confirmed', 'reschedule_requested', 'completed', 'cancelled', 'no_show')),
  fee_mode TEXT DEFAULT 'confirm_with_studio',
  fee_amount REAL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appointment_confidential_notes (
  appointment_id TEXT PRIMARY KEY REFERENCES appointments(id) ON DELETE CASCADE,
  birth_date TEXT,
  birth_time TEXT,
  birth_place TEXT,
  gender TEXT,
  specific_questions TEXT,
  practitioner_reading_notes TEXT,
  recommended_ratna TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quotes (
  id TEXT PRIMARY KEY,
  quote_number TEXT UNIQUE NOT NULL,
  version INTEGER DEFAULT 1,
  enquiry_id TEXT,
  custom_design_id TEXT,
  customer_name TEXT NOT NULL,
  customer_contact TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'review', 'sent', 'revised', 'accepted', 'expired', 'declined')),
  gold_rate_per_gram_applied REAL,
  gold_rate_timestamp TEXT,
  total_gold_value REAL,
  making_charges REAL,
  stone_charges REAL,
  other_charges REAL,
  tax_charges REAL,
  final_total REAL NOT NULL,
  valid_until_date TEXT NOT NULL,
  terms_and_exclusions TEXT,
  collection_arrangement_notes TEXT,
  created_by_staff_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quote_items (
  id TEXT PRIMARY KEY,
  quote_id TEXT NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  purity TEXT,
  weight_grams REAL,
  unit_rate REAL,
  amount REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('jewellery_guide', 'pricing_explanation', 'gemstones_ratna', 'astrology_preparation', 'faqs')),
  tags TEXT,
  author_name TEXT NOT NULL,
  reviewer_name TEXT,
  sources_json TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'in_review', 'published', 'archived')),
  is_featured INTEGER DEFAULT 0,
  published_at TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS business_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  staff_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_media_type ON media_assets(asset_type);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_custom_design_status ON custom_design_requests(status);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

-- ==============================================================================
-- POSTGRESQL / SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Default Deny on ALL tables; explicit minimal privilege policies.
-- ==============================================================================

-- 1. Products (Public read published, authenticated staff write)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published products" ON products FOR SELECT USING (status = 'published');
CREATE POLICY "Staff manage products" ON products FOR ALL TO authenticated USING (true);

-- 2. Product Categories (Public read active, authenticated staff write)
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active categories" ON product_categories FOR SELECT USING (is_active = 1);
CREATE POLICY "Staff manage categories" ON product_categories FOR ALL TO authenticated USING (true);

-- 3. Media Assets (Public read unarchived, authenticated staff write)
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read unarchived media" ON media_assets FOR SELECT USING (is_archived = 0);
CREATE POLICY "Staff manage media" ON media_assets FOR ALL TO authenticated USING (true);

-- 4. Articles / Learn (Public read published, authenticated staff write)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Staff manage articles" ON articles FOR ALL TO authenticated USING (true);

-- 5. FAQs (Public read published, authenticated staff write)
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published faqs" ON faqs FOR SELECT USING (is_published = 1);
CREATE POLICY "Staff manage faqs" ON faqs FOR ALL TO authenticated USING (true);

-- 6. Business Settings (Public read non-sensitive, authenticated staff write)
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read public settings" ON business_settings FOR SELECT USING (key NOT LIKE 'mfa_secret_%');
CREATE POLICY "Staff manage settings" ON business_settings FOR ALL TO authenticated USING (true);

-- 7. Customer Inquiries (Public insert, staff view/manage)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff manage enquiries" ON enquiries FOR ALL TO authenticated USING (true);

-- 8. Custom Design Requests (Public insert, staff view/manage)
ALTER TABLE custom_design_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert custom designs" ON custom_design_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff manage custom designs" ON custom_design_requests FOR ALL TO authenticated USING (true);

-- 9. Appointments (Public insert, staff view/manage)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff manage appointments" ON appointments FOR ALL TO authenticated USING (true);

-- 10. Confidential Notes (Strictly authenticated staff only)
ALTER TABLE appointment_confidential_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff only confidential notes" ON appointment_confidential_notes FOR ALL TO authenticated USING (true);

-- 11. Quotes & Items (Strictly authenticated staff only)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff only quotes" ON quotes FOR ALL TO authenticated USING (true);

ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff only quote items" ON quote_items FOR ALL TO authenticated USING (true);

-- 12. Staff Users (Strictly authenticated staff only)
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff only users" ON staff_users FOR ALL TO authenticated USING (true);

-- 13. Audit Logs (System insert, authenticated staff select)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff view audit logs" ON audit_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "System insert audit logs" ON audit_logs FOR INSERT WITH CHECK (true);


