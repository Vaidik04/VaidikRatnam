# ⚡ Vaidik Ratnam — Complete Supabase Setup Guide
> **Step-by-step instructions to configure Supabase for persistent cloud media storage (jewellery photos, hallmark zooms) and PostgreSQL database.**

---

## 📌 Why Supabase for Vaidik Ratnam?
1. **Persistent Media Storage:** When deploying to Vercel/serverless, local file uploads (`/public/uploads`) get wiped when lambda containers restart. Supabase Storage gives you a permanent, fast Global CDN for all your high-res jewellery photos, certificates, and customer inspiration uploads.
2. **PostgreSQL Database:** Instant, scalable cloud database with automated backups, built-in SQL editor, and connection pooling.

---

## Part 1: Create Your Supabase Project (3 Minutes)

1. Go to [https://supabase.com](https://supabase.com) and click **"Start your project"** (Sign in with GitHub or Google).
2. Click **"New Project"**.
3. Fill in the project details:
   * **Name:** `vaidik-ratnam`
   * **Database Password:** Choose a strong password (save this securely).
   * **Region:** Choose **India (Mumbai) - `ap-south-1`** for the fastest local speeds in India.
   * **Pricing Plan:** **Free Plan** (Includes 500MB database + 1GB permanent storage, perfectly sufficient for thousands of jewellery items).
4. Click **"Create new project"** and wait ~2 minutes for provisioning.

---

## Part 2: Set Up Supabase Storage (For Jewellery Photos & Uploads)

### 1. Create a Public Storage Bucket
1. In your Supabase Dashboard, click on **Storage** (folder icon in the left sidebar).
2. Click **"New bucket"**.
3. Set the bucket name to:
   ```text
   jewellery-media
   ```
4. **Important:** Toggle **"Public bucket"** to **ON** (so product photos can be viewed publicly by website visitors).
5. Leave "File size limit" blank (default 50MB is ample) and click **"Save"**.

### 2. Set Up Storage Security Policies (Row Level Security)
To allow public visitors to view photos, but only allow admin uploads:
1. In the Storage section, click **"Policies"** on the left.
2. Under `jewellery-media`, click **"New policy"**.
3. Choose **"For full customization"** and enter:
   * **Policy name:** `Public Read Access`
   * **Allowed operation:** `SELECT`
   * **Target roles:** `anon`, `authenticated`
   * **Policy definition (USING expression):**
     ```sql
     true
     ```
4. Click **"Save policy"**.
5. Repeat for **INSERT** (Uploads):
   * **Policy name:** `Allow Service Role & Auth Uploads`
   * **Allowed operation:** `INSERT`
   * **Target roles:** `service_role`, `authenticated`
   * **Policy definition (WITH CHECK expression):**
     ```sql
     true
     ```

---

## Part 3: Set Up PostgreSQL Database Tables

Your project's schema is already written to be 100% compatible with Supabase PostgreSQL!

1. In the Supabase Dashboard, click on **SQL Editor** (`>_` icon on the left sidebar).
2. Click **"New query"**.
3. Copy and paste the contents of [`src/lib/db/schema.sql`](file:///d:/VaidikRatnam/src/lib/db/schema.sql) into the query editor.
4. Click **"Run"** (or `Ctrl + Enter`).
5. You will see:
   ```text
   Success. No rows returned.
   ```
6. Click **Table Editor** on the left to verify all 10 core tables are created:
   * `staff_users`
   * `product_categories`
   * `media_assets`
   * `products`
   * `custom_designs`
   * `appointments`
   * `enquiries`
   * `quotes`
   * `business_settings`
   * `audit_logs`

---

## Part 4: Connect Supabase to Your Project (`.env.local`)

1. In Supabase Dashboard, go to **Project Settings** (gear icon at the bottom left) $\rightarrow$ **API**.
2. Find the following keys:
   * **Project URL:** `https://xyzcompany.supabase.co`
   * **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   * **service_role secret key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (click "Reveal")

3. Open your project's [`.env.local`](file:///d:/VaidikRatnam/.env.local) file and add these variables:
   ```env
   # Supabase Cloud Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key-here
   SUPABASE_STORAGE_BUCKET=jewellery-media
   ```

---

## Part 5: Code Integration (Helper Functions)

We have created an automated Supabase client helper at [`src/lib/supabase/storage.ts`](file:///d:/VaidikRatnam/src/lib/supabase/storage.ts):

* **Automatic Fallback:**
  * When `NEXT_PUBLIC_SUPABASE_URL` is set, media uploads are automatically sent to your Supabase `jewellery-media` bucket and return permanent global CDN URLs.
  * When `NEXT_PUBLIC_SUPABASE_URL` is empty, uploads seamlessly fall back to local disk (`/public/uploads`) for zero-friction local development.

---

## Part 6: Deploying to Vercel with Supabase

When deploying your website to Vercel:
1. Go to your **Vercel Project Settings** $\rightarrow$ **Environment Variables**.
2. Add the same 4 Supabase variables:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `SUPABASE_SERVICE_ROLE_KEY`
   * `SUPABASE_STORAGE_BUCKET`
3. Trigger a redeploy. Your live site will now store all uploads permanently in Supabase with global CDN distribution!

