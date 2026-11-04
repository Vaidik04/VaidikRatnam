# VaidikRatnam.com — Traditional Gold Jewellery & Genuine Gemstone Shop

**Tagline:** *"Timeless Jewellery • Guided by Wisdom"*  
A full-stack digital shop, custom goldsmithing studio, transparent gemstone knowledge hub, and traditional Vedic consultation platform built for a family-owned Indian jewellery shop.

---

## 1. Product Positioning & Official Brand Identity

- **Brand:** Vaidik Ratnam (Traditional Gold Jewellery & Genuine Gemstone Shop)
- **Domain:** [vaidikratnam.com](https://vaidikratnam.com)
- **Tagline:** *"Timeless Jewellery • Guided by Wisdom"*
- **Sub-header:** *Jewellery • Gemstones • Astrology*
- **Official Brand Colors:**
  - **Royal Emerald:** `#0F3D2E` (Trust, Prosperity, Growth)
  - **Divine Gold:** `#D4AF37` (Wealth, Quality, Tradition)
  - **Royal Maroon:** `#6B1F23` (Strength, Energy, Prestige)
  - **Sacred Cream:** `#F9F5EB` (Purity, Knowledge, Calmness)
  - **Earth Brown:** `#4B3F36` (Stability, Earth, Reliability)
- **The 4 Sacred Brand Symbols:**
  - **The Lotus:** Spirituality, unblemished purity, devotion to Indian goldsmithing
  - **Sun / Nakshatra:** Wisdom, illumination, classical Parashari Jyotish guidance
  - **Ratna Gemstone:** Certified truth, natural rarity, unheated earth-mined stones
  - **The Astrology Circle:** Cosmic connection, Janma Kundali harmony, Chhidra open-back settings
- **Typography:**
  - Primary: `Playfair Display`
  - Secondary: `Cormorant Garamond`
  - UI & Body: `Geist Sans`
- **Brand Promise:** Helping families buy 100% BIS hallmarked gold jewellery and genuine certified Ratna with transparent net-weight billing, digital scale verification in our shop, and personal family attention.
- **Tone:** Respectful, warm, knowledgeable, calm, and grounded in Indian traditions—never pushy, fear-based, or falsely authoritative.

---

## 2. Core Operating Constraints (Strict v1 Invariants)

1. **Strictly NO Shipping or Delivery Fulfilment in v1:**
   - No courier APIs, shipping calculators, tracking numbers, or nationwide dispatch promises.
   - Initial customer actions are quote requests, showroom availability checks, studio viewing appointments, custom design briefs, and agreed in-person collection.
2. **Strictly NO Fake Ecommerce Checkout:**
   - No "Buy Now" impulse buttons, card inputs, fake order processing, or false payment success pages.
   - Every product enquiry or custom commission is routed to a structured studio quote workflow.
3. **No Invented Business Claims:**
   - Zero fabricated awards, years of experience, fake customer counts, or false guarantees.
   - Clear editable placeholders for unconfirmed family history and father's credentials (`/admin/settings`).
4. **Honest Inventory & Tagged Seed Data:**
   - Demo products are explicitly tagged with `is_demo = 1` and loaded strictly when `ENABLE_DEMO_SEED=true`.
   - In production or when empty, the catalogue displays honest empty states guiding visitors to custom commissions.
5. **Data Protection & Privacy by Design:**
   - Birth data (date, exact time, place of birth) and astrological notes are strictly isolated from public APIs.
   - Custom design inspiration uploads are held in secure storage; public confirmation pages never leak private URLs.
   - Non-guessable public reference tokens (`VR-CD-XXXX`, `VR-ENQ-XXXX`, `VR-APT-XXXX`, `VR-Q-XXXX`) prevent enumeration.

---

## 3. Technology Stack

- **Framework:** [Next.js 16.4.3](https://nextjs.org) (App Router, Turbopack, Server Actions, Route Handlers)
- **UI & Runtime:** React 19.3.0, TypeScript 5, Tailwind CSS v4, Lucide React icons
- **Validation:** [Zod 4.6.7](https://zod.dev) for strict server-side request verification
- **Persistence Layer:**
  - **Embedded SQLite / LibSQL:** `@libsql/client` (Transactional file database `vaidikratnam.db`) for rapid local development and automated CI/CD testing with zero external dependencies.
  - **Production PostgreSQL / Supabase:** Production-ready migration files located in `supabase/migrations/` featuring Row-Level Security (RLS) policies, indexes, and constraint triggers.
- **Authentication:** HMAC-SHA256 signed HTTP-only cookies with PBKDF2 password hashing (100,000 iterations, 64-byte salt) and a 5-role permission matrix (`owner`, `inventory_staff`, `consultant`, `content_editor`, `viewer`).
- **Media Ingestion:** Multi-file upload route (`/api/admin/media/upload`) with server-side magic-byte signature validation (JPEG, PNG, WebP) and sanitized unique UUID filenames.
- **Testing:** [Vitest 5.0.5](https://vitest.dev) for unit and integration testing.

---

## 4. Quick Start & Local Setup

### Prerequisites
- Node.js 20+ (Node.js 22 or 24 recommended)
- npm 10+

### Installation & Execution
```bash
# 1. Clone repository
git clone https://github.com/your-org/vaidikratnam.git
cd vaidikratnam

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local

# 4. Start development server (Turbopack)
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Verification Suites
```bash
# Run unit & integration tests
npm test

# Run ESLint check
npm run lint

# Run production build (Turbopack)
npm run build
```

---

## 5. Test & Quality Verification Evidence

- **Unit & Integration Tests (`npm test`):**
  - `src/lib/auth/auth.test.ts` (8 tests): Password hashing, PBKDF2 verification, session token signing, tamper rejection, role authorization.
  - `src/lib/tools/gold-calculator.test.ts` (3 tests): Bullion valuation, 22K/18K/14K purities, making charge percentages, 3% statutory GST.
  - `src/lib/importers/csv-parser.test.ts` (3 tests): Batch CSV stock parsing, row validation, header mapping, duplicate SKU alerts.
  - `src/lib/astrology/astrology.test.ts` (4 tests): Birth chart data verification, Parashari planetary rule checking, ethical disclaimer enforcement.
  - `src/lib/ai/assistant.test.ts` (4 tests): Grounded retrieval, ethical fallback rules, no supernatural claims, Parashari Jyotish guidance.
  - `src/lib/lal-kitab/lal-kitab.test.ts` (6 tests): Astronomical ephemeris calculation, Lahiri ayanamsa, historical Indian War Time (UTC+06:30) offset, Kal Purush fixed-house chart builder, rule engine (sleeping houses, chart classification, Rin karmic debts, and safe remedies).
  - `src/lib/3d/materials.test.ts` (5 tests): Antique gold PBR, gemstone refraction IORs, shader uniforms, capability fallback tiering.
  - **Result: 33 / 33 tests passing cleanly.**
- **Lint Check (`npm run lint`):**
  - **Result: 0 errors, 0 warnings.**
- **Production Build (`npm run build`):**
  - **Result: 48 routes compiled cleanly with Next.js 16.4.3 Turbopack.**

---

## 6. Default Bootstrap Admin Account

On initial launch, a seed owner account is automatically provisioned if no staff accounts exist:
- **Email:** `admin@vaidikratnam.com`
- **Default Password:** `AdminVaidik2026!`
- **Role:** `owner` (Full permissions)

> [!IMPORTANT]
> The family owner must change this temporary password immediately after logging in at `/admin/login`. Additional accounts with restricted roles (`inventory_staff`, `consultant`, `content_editor`) should be created for family members or assistants.

---

## 7. Complete Route Matrix

### 7.1 Public Brand Showcase
| Route | Description |
|---|---|
| `/` | Homepage with 10 editorial sections (Hero, 3 pathways, showroom stock, bespoke studio banner, gemstone trust, father's profile, knowledge tools, showroom visiting block). |
| `/jewellery` | Jewellery catalogue with category filter tabs, search, price modes (Fixed, Quote, Indicative), and studio availability badges. |
| `/jewellery/[slug]` | Product details with high-resolution image gallery, verified weights, making charge explanation, and enquiry dialog. |
| `/custom-design` | 10-step guided bespoke commission brief with reference photo uploads, metal/gemstone choices, and budget sliders. |
| `/custom-design/received/[reference]` | Safe confirmation screen with reference code (`VR-CD-XXXX`) and next steps; hides private uploads. |
| `/gemstones` | Navratna guide, mineral truth disclosures, natural vs synthetic differences, lab report limits, and sourcing request modal. |
| `/astrology` | The owner's father's astrology & gemstone consultation practice, code of ethics, consultation modes, and fee placeholders. |
| `/consultation/request` | Consultation appointment booking flow with isolated birth chart inputs (date, exact time, place of birth). |
| `/tools/gold-budget-estimator` | Interactive calculator breaking down gold rate, gross/net weight, making charges, and 3% GST. |
| `/tools/jewellery-buying-checklist` | Printable 10-point inspection guide with direct link to official BIS Care HUID verification. |
| `/tools/gemstone-comparison` | Side-by-side scientific mineral facts vs traditional planetary beliefs. |
| `/learn` | Knowledge Hub with categorized studio articles and frequently asked questions. |
| `/learn/[slug]` | Educational articles with author, reviewer, last reviewed date, and official source links. |
| `/about` | Verified studio history, craftsmanship values, and ethical sourcing standards. |
| `/contact` | Showroom address, verified opening hours, visit booking, and map directions. |
| `/privacy`, `/terms`, `/cancellation`, `/custom-orders`, `/gemstone-disclosure` | Comprehensive legal and consumer policy pages. |
| `/wholesale` | Protected wholesale portal enquiry placeholder. |

### 7.2 Admin Operations Dashboard (`/admin/*`)
| Route | Purpose & Key Features |
|---|---|
| `/admin/login` | Secure login for family members and studio staff. |
| `/admin` | Operations dashboard with real database KPI counters, open enquiries, and action queues. |
| `/admin/media` | Stock Image Library with multi-file upload, thumbnail gallery, SKU tag association, and unlinked image cleanup. |
| `/admin/products` | Inventory management with status transitions (`draft`, `published`, `reserved`, `sold`, `archived`). |
| `/admin/products/new` | Product creation with verified metal purity, gross/net weight, and hallmark/HUID fields. |
| `/admin/products/[id]/edit` | Edit existing product specifications, pricing modes, and image gallery mappings. |
| `/admin/products/import-csv` | CSV bulk importer with sample template download, row validation preview, and duplicate SKU detection. |
| `/admin/custom-designs` | Custom design enquiry pipeline (`new` &rarr; `reviewing` &rarr; `quoted` &rarr; `in_production` &rarr; `ready_for_collection`). |
| `/admin/custom-designs/[id]` | Custom brief review with client inspiration notes, budget, and private internal studio remarks. |
| `/admin/enquiries` | General and product enquiries pipeline with follow-up scheduler and outcome tracking. |
| `/admin/appointments` | Consultation booking pipeline (`requested` &rarr; `confirmed` &rarr; `completed`) with confidential birth chart view. |
| `/admin/quotes` | Studio quotation history with versioning, validity periods, and customer reference codes. |
| `/admin/quotes/new` | Itemized quotation builder with bullion assumptions, making charges, gemstones, and printable view. |
| `/admin/quotes/[id]` | Printable studio quotation sheet ready for client presentation or PDF export. |
| `/admin/knowledge` | Editorial article and FAQ publisher with draft/published status and reviewer attribution. |
| `/admin/settings` | Business profile editor (Showroom address, opening hours, WhatsApp, reference bullion rates, consultant bio). |
| `/admin/audit-logs` | Tamper-evident administrative audit log recording key actions and IP records. |

---

## 8. Operational Guide: How the Family Uses It

### Workflow 1: Organizing Stock Photos & Publishing Inventory
1. Log in to the Admin Centre at `/admin/login`.
2. Navigate to **Stock Image Library** (`/admin/media`).
3. Click **Browse Images** and select multiple high-resolution photos of your showroom jewellery. The system checks magic bytes, renames files safely, and stores them in `public/uploads/`.
4. Navigate to **Catalogue & Stock** (`/admin/products`) and click **Add New Piece** (or use **CSV Batch Import** if you have a spreadsheet from your billing software).
5. Enter the piece's SKU, verified gross weight, net gold weight, BIS hallmark status, and select uploaded photos from your library.
6. Set the price mode:
   - **Fixed Showroom Price:** For tagged retail pieces with clear prices.
   - **Quote on Request:** For heavy bridal necklaces or exclusive high-value gemstones.
   - **Indicative Estimate:** For pieces where final price fluctuates with daily gold rates.
7. Click **Publish Piece**. The piece is instantly visible on the public website.

### Workflow 2: Handling Custom Design Commissions
1. When a client submits a brief via `/custom-design`, it arrives in **Custom Commissions** (`/admin/custom-designs`).
2. An alert appears on the Operations Dashboard.
3. Open the commission to review the client's concept, preferred metal, budget range, and uploaded inspiration images.
4. Add private studio notes (e.g., *"Spoke to artisan; requires 45g 22K gold, 12 days casting"*).
5. Click **Draft Studio Quotation** to create an itemized quote with metal rate, making charges, and stones.
6. Print or share the quote reference (`VR-Q-XXXX`) with the client.
7. Update the pipeline status as the piece moves from `in_production` to `ready_for_collection`.

### Workflow 3: Managing Astrology & Gemstone Consultations
1. When a client requests an appointment at `/consultation/request`, it appears in **Consultations** (`/admin/appointments`).
2. Only users with the `owner` or `consultant` role can access the client's confidential birth details (birth date, exact time, and birth city).
3. The consultant reviews the request, contacts the client to confirm the scheduled time slot, and updates the status to `confirmed`.
4. Private astrological findings or gemstone recommendations are recorded in the confidential internal notes section—never visible to the public or leaked to client devices.

### Workflow 4: Updating Daily Reference Bullion Rates & Showroom Info
1. Navigate to **Studio Settings** (`/admin/settings`).
2. Update the **24K Reference Gold Rate** and **22K Standard Rate** (in ₹/gram).
3. Update showroom hours or holiday notices.
4. Click **Save Business Profile**. The updated reference rates instantly sync to the public **Gold Budget Estimator** and jewellery enquiry tools.

---

## 9. Legal, Metrology & Compliance Framework

The application is architected around applicable Indian retail, gemstone, and consumer protection regulations:

- **Bureau of Indian Standards (BIS) Hallmarking Regulations, 2021:**
  - Mandatory 6-digit alphanumeric HUID (Hallmark Unique Identification) disclosure fields for 22K (916), 18K (750), and 14K (585) gold jewellery.
  - Public buying checklist integrates official [BIS Care App verification guidance](https://www.bis.gov.in).
- **Legal Metrology (Packaged Commodities) & Jewellery Rules:**
  - Strict separation of **Gross Weight** (total piece) and **Net Weight** (metal only, excluding wax, stones, or lac) across all product displays and quotes.
- **Consumer Protection (E-Commerce) Rules, 2020:**
  - Clear showroom address, grievance contact details, country of origin, and transparent fee disclosures.
- **Gemstone Treatment Disclosures (CIBJO / GII Guidelines):**
  - Explicit educational disclosures stating whether gemstones are natural, heated, glass-filled, or synthetic.
  - Transparent guidance on what independent lab reports (GII, IGI, GIA) actually certify (mineral species & treatments, NOT market value or planetary power).
- **Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954:**
  - Rigorous astrological ethics policy explicitly disclaiming supernatural cures, medical guarantees, or fear-based gemstone selling.
- **Digital Personal Data Protection Act (DPDPA), 2023:**
  - Strict purpose-limitation consent checkboxes on enquiry and consultation forms.
  - Isolation of sensitive personal data (birth charts and private notes) behind authenticated role boundaries.

---

## 10. Deployment to Production

### Recommended Architecture:
1. **Frontend / Server Actions:** Deploy Next.js to [Vercel](https://vercel.com) or a Node.js VPS.
2. **Database:** Create a [Supabase](https://supabase.com) PostgreSQL project and run migrations in `supabase/migrations/`:
   ```bash
   # Apply schema & RLS policies
   supabase db push
   ```
3. **Environment Variables:** Set all production values defined in `.env.example`:
   - `DATABASE_URL`: Production Supabase/Turso connection string
   - `ADMIN_SESSION_SECRET`: 64-character cryptographically random secret
   - `ENABLE_DEMO_SEED`: `false` (Production mode)
   - `NEXT_PUBLIC_WHATSAPP_PHONE`: The studio's official WhatsApp Business number
4. **Media Storage:** In high-volume production, configure Supabase Storage or an S3-compatible bucket for user-uploaded media assets.
