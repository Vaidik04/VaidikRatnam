-- ==============================================================================
-- SUPABASE MIGRATION: 20261030000002_rls_policies.sql
-- Row Level Security (RLS) policies for least-privilege public access
-- ==============================================================================

-- 1. Enable RLS on all sensitive tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_design_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_confidential_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 2. Public Read Policies (Only published items)
CREATE POLICY "Public can view published active categories"
  ON product_categories FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Public can view published products only"
  ON products FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view non-archived stock photo media"
  ON media_assets FOR SELECT
  USING (is_archived = FALSE AND asset_type = 'stock_photo');

CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (status = 'published');

-- 3. Public Insert Policies (Guest submissions allowed for forms)
CREATE POLICY "Public can submit enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can submit custom design briefs"
  ON custom_design_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can submit appointment requests"
  ON appointments FOR INSERT
  WITH CHECK (true);

-- 4. Staff Full Access Policies (Authenticated service/admin role)
-- Note: In production Supabase, authenticated staff have role-based claims in JWT.
CREATE POLICY "Authenticated staff full access products"
  ON products TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated staff full access custom designs"
  ON custom_design_requests TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated staff full access enquiries"
  ON enquiries TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated staff full access appointments"
  ON appointments TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated staff access confidential notes"
  ON appointment_confidential_notes TO authenticated
  USING (true) WITH CHECK (true);

