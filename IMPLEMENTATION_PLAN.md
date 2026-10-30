# VAIDIKRATNAM.COM — MASTER IMPLEMENTATION PLAN
**Project:** VaidikRatnam.com — The Jewellery & Ratna Studio  
**Review Date:** October 30, 2026  
**Primary Operating Constraint:** Strictly NO shipping, courier, delivery-tracking, or nationwide fulfilment in v1. In-person showroom viewing, quote requests, availability enquiries, consultation requests, custom briefs, and agreed showroom collection only. No fake checkout or payment buttons. No invented business history or credentials.

---

## 1. Technical Baseline & Architecture

- **Framework:** Next.js 16.4.3 (App Router with Server Actions & Route Handlers) + React 19.3.0 + TypeScript 5
- **Styling:** Tailwind CSS v4 with the Official Vaidik Ratnam Brand Identity Palette:
  - **Royal Emerald:** `#0F3D2E` (Trust, Prosperity, Growth — brand primary, dark accent surfaces)
  - **Divine Gold:** `#D4AF37` (Wealth, Quality, Tradition — primary metallic accents, borders, emblems)
  - **Royal Maroon:** `#6B1F23` (Strength, Energy, Prestige — royal secondary highlights, badges)
  - **Sacred Cream:** `#F9F5EB` (Purity, Knowledge, Calmness — main background canvas)
  - **Earth Brown:** `#4B3F36` (Stability, Earth, Reliability — warm body typography & secondary text)
  - **Dark Ink:** `#182522` (primary headings, high contrast text)
  - **Clean White:** `#FFFFFF` (cards, dialogs, inputs)
  - **Accessible Status:** Success `#1B6442`, Warning `#925700`, Error `#A61C1C`
- **Official Brand Symbols:**
  - **The Lotus:** Spirituality, unblemished purity, devotion to Indian goldsmithing
  - **Sun / Nakshatra:** Wisdom, illumination, classical Parashari Jyotish guidance
  - **Ratna Gemstone:** Certified truth, natural rarity, unheated subterranean crystallization
  - **The Astrology Circle:** Cosmic connection, 12 Bhavas & 9 Grahas, skin-touching Chhidra settings
- **Brand Tagline:** *"Timeless Jewellery • Guided by Wisdom"*
- **Typography:**
  - Primary: `Playfair Display` (Brand name, display headlines, editorial titles)
  - Secondary: `Cormorant Garamond` (Subtitles, categories, poetic statements)
  - Body & UI: `Geist Sans` (High legibility metadata, inputs, and functional controls)
- **Persistence Layer:**
  - Production Engine: PostgreSQL / Supabase ready (`supabase/migrations/*.sql` with full RLS policies and indexes).
  - Embedded/Local Engine: Transactional SQLite database using `@libsql/client` (`file:vaidikratnam.db`) for instant local development, zero-dependency testing, and reliable offline evaluation.
  - Unified DB client (`src/lib/db/`): Typed repository interface that runs transparently in both local dev and production Supabase environments.
- **Security & Authorization:**
  - Role-based server-side session authentication (Owner/Admin, Inventory Staff, Consultant, Content Editor).
  - Private data protection: birth date/time/place and astrological notes stored in restricted table isolated from public APIs; custom design uploads protected with private storage tokens.
  - Zod server-side schemas for all mutations, file upload MIME/size verification, sanitization, and non-guessable public reference tokens (e.g. `VR-CD-XXXXX` for custom design, `VR-CR-XXXXX` for consultations).
- **Testing:** Vitest suite covering budget calculation engine, schema validators, appointment slot logic, and auth boundary checks.

---

## 2. Route Matrix

### 2.1 Public Experience
- `/` — Homepage: Editorial introduction, 3 core pathways, real published stock highlights, custom studio feature, gemstone trust guide, father's profile, knowledge hub tools preview, showroom visiting block.
- `/jewellery` — Jewellery catalogue: searchable by name/SKU, filterable by category/metal/budget, honest price modes (fixed approved, manual quote, indicative estimate), availability badges.
- `/jewellery/[slug]` — Product detail: gallery with touch/keyboard navigation, verified attributes, indicative calculations/quote requests, availability last confirmed date, viewing booker.
- `/custom-design` — Custom Jewellery Studio: 10-step guided brief with private reference uploads, metal/stone choices, budget range, guest submission, explicit consent.
- `/custom-design/received/[reference]` — Safe confirmation page displaying non-guessable reference and next steps without exposing private attachments.
- `/gemstones` — Gemstone & Ratna Centre: educational catalogue, natural vs lab-grown truth, lab report limitations, traditional Ratna associations clearly marked as traditional beliefs.
- `/gemstones/[slug]` — Individual gemstone details & sourcing request.
- `/astrology` — Father's consultation practice: verified biography placeholder, topics offered, consultation modes (in-person/phone/video), ethics disclaimer.
- `/consultation/request` — Multi-step consultation booking flow with birth chart input explanation, pending status notice, and privacy consent.
- `/learn` — Knowledge Hub: searchable articles and categorized FAQs (Jewellery Care, Pricing Breakdown, Gemstones, Traditional Ratna).
- `/learn/[slug]` — Article detail with author, reviewer, last updated date, and source links.
- `/tools/gold-budget-estimator` — Interactive gold jewellery estimator with breakdown formula and user-entered gold rate disclaimer.
- `/tools/jewellery-buying-checklist` — Printable, downloadable buying checklist with official BIS Care/HUID links.
- `/tools/gemstone-comparison` — Educational gemstone comparison explainer (distinguishing unknown from untreated).
- `/about` — Verified family studio story, ethical sourcing principles, craftsmanship philosophy.
- `/contact` — Showroom location, verified opening hours, visit booking, contact instructions.
- `/privacy`, `/terms`, `/cancellation`, `/custom-orders`, `/gemstone-disclosure` — Configurable legal policy pages.
- `/wholesale` — Feature-flagged wholesale enquiry page.

### 2.2 Admin Operations (`/admin/*`)
- `/admin/login` — Secure staff login with role detection and session cookie.
- `/admin` — Operations Dashboard: KPIs from real data, pending enquiries, follow-ups due today, custom briefs, appointments needing confirmation, stock image queue.
- `/admin/media` — Stock Image Library: multi-file uploader, thumbnails, tagging, SKU mapping, unlinked image detector, bulk archive.
- `/admin/products` — Product Management: status transitions (draft, incomplete, published, reserved, sold, archived), price mode configuration, gallery order.
- `/admin/products/new` & `/admin/products/[id]/edit` — Product editor with verified attribute fields.
- `/admin/products/import-csv` — CSV import with row-by-row validation preview, error reporting, and duplicate SKU detection.
- `/admin/custom-designs` & `[id]` — Custom design brief reviews, private internal notes, quote drafting, status pipeline.
- `/admin/enquiries` & `[id]` — Enquiry pipeline, follow-up scheduler, outcome tracking.
- `/admin/quotes` & `[id]` — Quote builder with line items, validity period, gold rate assumptions, printable view.
- `/admin/appointments` & `[id]` — Astrology & viewing appointment manager (request -> confirmed -> completed/cancelled).
- `/admin/knowledge` & `[id]` — Knowledge CMS for articles and FAQs with draft/review/publish workflows.
- `/admin/settings` — Business profile, showroom hours, contact details, consultation fees/topics, feature flags.
- `/admin/audit-logs` — Security audit trail of key administrative events.

---

## 3. Ordered Implementation Workstreams

- **Workstream A: Repository Foundation**
  - Brand theme tokens in Tailwind CSS v4 (`globals.css`).
  - Database schema (`schema.sql` for PostgreSQL/Supabase and LibSQL/SQLite).
  - Persistence repository (`src/lib/db/index.ts` and `src/lib/db/repo.ts`).
  - Auth, session token management, and role-based middleware (`src/lib/auth/`).
  - Environment variable configuration & validation (`src/lib/config.ts`).
  - Vitest test setup and initial unit tests.

- **Workstream B: Shared UI Design System & Public Layout**
  - Navigation Header with mobile drawer and responsive links.
  - Footer with policies, showroom details, contact, and category links.
  - UI Primitives: Button, Card, Badge, Modal/Dialog, Input, Select, Textarea, Toast/Alert, Skeleton, EmptyState.
  - Layout shell with metadata, OpenGraph, JSON-LD schemas, and accessibility landmarks.

- **Workstream C: Public Brand Experience & Catalogue**
  - Homepage (`/`) with 10 editorial sections.
  - Jewellery Catalogue (`/jewellery`) with search, filter, and sort.
  - Product Detail (`/jewellery/[slug]`) with gallery and quote/viewing actions.
  - Gemstones & Ratna Centre (`/gemstones` and `/gemstones/[slug]`).
  - Astrology Practice & Consultation Request (`/astrology` and `/consultation/request`).
  - About (`/about`) and Contact/Visit (`/contact`).
  - Legal Policy Pages (`/privacy`, `/terms`, `/cancellation`, etc.).

- **Workstream D: Interactive Tools & Knowledge Hub**
  - Gold Jewellery Budget Estimator (`/tools/gold-budget-estimator`).
  - Jewellery Buying Checklist (`/tools/jewellery-buying-checklist`) with printable stylesheet.
  - Gemstone Comparison Tool (`/tools/gemstone-comparison`).
  - Knowledge Hub (`/learn` and `/learn/[slug]`) with verified articles and FAQs.

- **Workstream E: Custom Jewellery Studio Workflow**
  - 10-step guided brief form with client-side validation and draft saving.
  - Secure server action with file upload validation and non-guessable reference generation.
  - Submission confirmation page (`/custom-design/received/[reference]`).

- **Workstream F: Admin Operations Centre**
  - Staff login and session authorization.
  - Operations Dashboard with real counts and alerts.
  - Media Library with upload, thumbnail preview, SKU association, and bulk actions.
  - Product Editor & CSV Importer with validation preview.
  - Enquiry & Custom Design pipeline with status transitions and private notes.
  - Quote Builder with versioning and print view.
  - Appointment manager with slot confirmation.
  - Business Settings and feature flags manager.

- **Workstream G: Testing, Validation & Verification**
  - Vitest test suite for core calculations, schemas, and permissions.
  - `npm run lint` and `npm run build` verification.
  - Production readiness checklist and "How the Family Uses It" documentation.

