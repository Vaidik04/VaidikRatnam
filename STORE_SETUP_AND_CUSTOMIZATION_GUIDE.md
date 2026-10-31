# 🏛️ Vaidik Ratnam — Complete Shop Setup & Customization Guide
> **Everything you need to configure and operate your real family jewellery and gemstone shop online.**

---

## 📋 Quick Setup Summary Table

| Category | Where to Change | What to Put | Time Needed |
| :--- | :--- | :--- | :--- |
| **1. Admin Login & Security** | Browser (`/admin/login`) | Change default password from `AdminVaidik2026!` | 2 mins |
| **2. Shop Contact & Address** | Admin Panel (`/admin/settings`) | Real shop address, phone, email, opening hours, UPI ID | 5 mins |
| **3. WhatsApp Number** | `.env.local` / Admin Panel | Real 10-digit WhatsApp number (with country code `91`) | 2 mins |
| **4. Daily Bullion Rates** | Admin Panel (`/admin/settings`) | 1-Click "Sync Market Rates via API" or enter manually | 1 min |
| **5. UPI & Token Rate Lock** | Admin Panel (`/admin/settings`) | Shop UPI VPA (`shop_upi_id`) for advance rate locks | 2 mins |
| **6. Father / Astrologer Profile** | Admin Panel (`/admin/settings`) | Father's/Elder's verified name, bio, and consultation days | 5 mins |
| **7. Real Products & Photos** | `/admin/products/import-csv` | Use our ready-made CSV template with 10 real sample items | 15 mins |
| **8. Production Deployment & DB** | `.env.local` & Turso / Vercel | Set `DATABASE_URL` (Turso), `DATABASE_AUTH_TOKEN`, and domain | 10 mins |

---

## 1. 🔑 Admin Portal Login (Do This First)

Your website comes with a private, password-protected **Admin Operations Centre** to manage products, quotes, appointments, custom designs, rate locks, and business settings.

* **Admin URL:** `http://localhost:3000/admin/login` (or `https://yourdomain.com/admin/login`)
* **Default Email:** `admin@vaidikratnam.com`
* **Default Password:** `AdminVaidik2026!`

---

## 2. 📍 Shop Contact, Address, Hours & UPI Payments (`/admin/settings`)

Go to **Admin Dashboard → Business Settings** (`/admin/settings`). You can change these details directly in your browser:

### A. Brand Identity
* **Brand Name:** `Vaidik Ratnam`
* **Brand Tagline:** `Timeless Jewellery • Guided by Wisdom`

### B. Shop Contact, Hours & Payments
* **Shop Phone Display:** e.g. `+91 98290 XXXXX`
* **WhatsApp Business Phone:** e.g. `9198290XXXXX`
* **Official Contact Email:** e.g. `shop@vaidikratnam.com`
* **Shop UPI ID:** e.g. `vaidikratnam@upi` (Enables instant UPI QR codes for customer rate locks)
* **Physical Shop Address:** e.g. `42, Johari Bazar, Jaipur, Rajasthan 302003`
* **Operating Hours:** e.g. `Mon - Sat: 10:30 AM - 8:30 PM | Sun: 11:00 AM - 6:00 PM`

---

## 3. ⚡ Live Market Bullion Rates & 1-Click Sync (`/admin/settings`)

Under **Section 4: Live Bullion Rates & Market API Sync**:
* Click the **"Sync Market Rates via API"** button to automatically pull current prices for:
  * 24K Pure Gold (₹/g and ₹/10g)
  * 22K (916 BIS Hallmark) Gold
  * 18K Fine Gold
  * 14K Daily Wear Gold
  * 925 Sterling Silver
* **City Spread (₹/g):** If your local association rate differs slightly from national benchmarks (e.g. Jaipur Sarafa $\pm$₹20/g), enter the spread and click sync.

---

## 4. 🔒 Rate Lock & Token Advance Booking (`/tools/rate-lock`)

Customers can lock in today's gold rate online before visiting the shop:
* Accessible on the homepage Gold Estimator and at [http://localhost:3000/tools/rate-lock](http://localhost:3000/tools/rate-lock).
* Allows customers to choose their gold karat (22K or 24K), weight (grams), and token deposit (₹2,500 / ₹5,000 / ₹10,000).
* Generates an instant **UPI payment link** and unique reference code (`VR-ENQ-XXXX`).
* 1-Click **"Confirm on Shop WhatsApp"** button sends the receipt and screenshot directly to your shop.
* View all customer rate locks in **Admin $\rightarrow$ Enquiries** (`/admin/enquiries`).

---

## 5. 📦 Real Inventory & CSV Bulk Import (`/admin/products/import-csv`)

To add your real stock in bulk:
1. Download our comprehensive inventory template from [public/templates/vaidikratnam_inventory_template.csv](file:///d:/VaidikRatnam/public/templates/vaidikratnam_inventory_template.csv).
2. It includes 10 pre-formatted rows covering Nakshi chokers, solid kadas, unheated emeralds, blue sapphires, rubies, jhumkas, and mangalsutras.
3. Edit the weights, purity, and SKUs to match your inventory.
4. Upload the `.csv` file in `/admin/products/import-csv` and click **"Confirm & Import Products"**.

---

## 6. 🌐 Dynamic Social Sharing Cards (`/api/og`)

Whenever a client shares a product, jewellery guide, or link on WhatsApp, Facebook, or iMessage:
* Next.js automatically generates a dynamic 1200×630 high-definition luxury card with Royal Emerald background, Divine Gold typography, 100% BIS Hallmarked badge, and certified digital scale guarantee.
* Test any title live at: [http://localhost:3000/api/og?title=Handcrafted%2022K%20Nakshi%20Choker&purity=22K%20(916)%20BIS%20HUID](http://localhost:3000/api/og?title=Handcrafted%2022K%20Nakshi%20Choker&purity=22K%20(916)%20BIS%20HUID).

---

## 7. 🚀 Cloud Production Deployment (Vercel & Turso)

When you are ready to publish the website live:
1. **Database:** Create a free database on [Turso.tech](https://turso.tech) and copy your database URL and token into `.env.local`:
   ```bash
   DATABASE_URL=libsql://your-database-name.turso.io
   DATABASE_AUTH_TOKEN=your-turso-jwt-token
   ```
2. **Deploy on Vercel:** Push your repository to GitHub, import it into Vercel, and paste your `.env.local` environment variables into the Vercel project settings.
3. **Domain:** Connect your custom domain `vaidikratnam.com` in Vercel settings.
