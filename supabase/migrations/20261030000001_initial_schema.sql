-- ==============================================================================
-- SUPABASE MIGRATION: 20261030000001_initial_schema.sql
-- ==============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Copy of core schema tables with Postgres-native types
CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  asset_type TEXT DEFAULT 'stock_photo',
  is_archived BOOLEAN DEFAULT FALSE,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  category_id TEXT REFERENCES product_categories(id),
  short_description TEXT,
  long_description TEXT,
  metal_purity TEXT,
  metal_color TEXT,
  gross_weight_grams NUMERIC(10,3),
  net_gold_weight_grams NUMERIC(10,3),
  dimensions TEXT,
  size_variant TEXT,
  gemstone_details TEXT,
  price_mode TEXT NOT NULL DEFAULT 'quote_first',
  fixed_price_amount NUMERIC(12,2),
  currency TEXT DEFAULT 'INR',
  price_assumptions TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  is_demo BOOLEAN DEFAULT FALSE,
  primary_media_id TEXT REFERENCES media_assets(id),
  gallery_media_ids JSONB,
  last_availability_confirmed_at TIMESTAMPTZ,
  care_instructions TEXT,
  private_admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
  need_astrology_consultation BOOLEAN DEFAULT FALSE,
  target_date TEXT,
  customer_name TEXT NOT NULL,
  customer_contact_method TEXT NOT NULL,
  customer_contact_value TEXT NOT NULL,
  preferred_contact_time TEXT,
  city TEXT,
  marketing_opt_in BOOLEAN DEFAULT FALSE,
  attachments_json JSONB,
  status TEXT NOT NULL DEFAULT 'new',
  private_notes TEXT,
  estimated_budget_draft NUMERIC(12,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  enquiry_type TEXT NOT NULL,
  product_id TEXT REFERENCES products(id),
  customer_name TEXT NOT NULL,
  customer_contact_method TEXT NOT NULL,
  customer_contact_value TEXT NOT NULL,
  preferred_viewing_date TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  assigned_staff_id TEXT,
  follow_up_due_date TIMESTAMPTZ,
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  appointment_type TEXT NOT NULL,
  service_title TEXT NOT NULL,
  requested_date TEXT NOT NULL,
  requested_time_slot TEXT NOT NULL,
  mode TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_contact_method TEXT NOT NULL,
  customer_contact_value TEXT NOT NULL,
  preferred_language TEXT DEFAULT 'Hindi / English',
  status TEXT NOT NULL DEFAULT 'pending_confirmation',
  fee_mode TEXT DEFAULT 'confirm_with_studio',
  fee_amount NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB,
  author_name TEXT NOT NULL,
  reviewer_name TEXT,
  sources_json JSONB,
  status TEXT NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

