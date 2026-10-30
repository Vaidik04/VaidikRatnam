import { getDb, initDb } from "./index";

export async function seedDemoDataIfEmpty(): Promise<void> {
  if (process.env.ENABLE_DEMO_SEED !== "true") {
    return;
  }

  await initDb();
  const db = getDb();

  const prodCountRes = await db.execute("SELECT COUNT(*) as count FROM products");
  const count = Number(prodCountRes.rows[0]?.count || 0);
  if (count > 0) return;

  const now = new Date().toISOString();

  // 1. Demo Media Assets
  const demoMedia = [
    {
      id: "demo-media-1",
      filename: "necklace-nakshi.jpg",
      original_name: "heritage_nakshi_choker.jpg",
      mime_type: "image/jpeg",
      file_size: 769991,
      storage_path: "/images/products/necklace-nakshi.jpg",
      url: "/images/products/necklace-nakshi.jpg",
      alt_text: "Handcrafted 22K gold nakshi choker with drop emerald",
      caption: "Signature Shop Collection",
      asset_type: "stock_photo",
    },
    {
      id: "demo-media-2",
      filename: "kada-fluted.jpg",
      original_name: "gold_kada_fluted.jpg",
      mime_type: "image/jpeg",
      file_size: 724184,
      storage_path: "/images/products/kada-fluted.jpg",
      url: "/images/products/kada-fluted.jpg",
      alt_text: "Handcrafted solid 22K yellow gold fluted kada",
      caption: "Handcrafted Bangles & Kada Collection",
      asset_type: "stock_photo",
    },
    {
      id: "demo-media-3",
      filename: "sapphire-ring.jpg",
      original_name: "ceylon_sapphire_ring.jpg",
      mime_type: "image/jpeg",
      file_size: 723717,
      storage_path: "/images/products/sapphire-ring.jpg",
      url: "/images/products/sapphire-ring.jpg",
      alt_text: "Untreated royal blue Ceylon sapphire 18K gold ring",
      caption: "Sacred Ratna Selection",
      asset_type: "stock_photo",
    },
    {
      id: "demo-media-4",
      filename: "emerald-pendant.jpg",
      original_name: "emerald_chhidra_pendant.jpg",
      mime_type: "image/jpeg",
      file_size: 645845,
      storage_path: "/images/products/emerald-pendant.jpg",
      url: "/images/products/emerald-pendant.jpg",
      alt_text: "Untreated vibrant green Zambian emerald open-back chhidra pendant",
      caption: "Sacred Jyotish Talisman",
      asset_type: "stock_photo",
    },
  ];

  for (const m of demoMedia) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO media_assets (
        id, filename, original_name, mime_type, file_size, storage_path, url, alt_text, caption, asset_type, is_archived, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`,
      args: [m.id, m.filename, m.original_name, m.mime_type, m.file_size, m.storage_path, m.url, m.alt_text, m.caption, m.asset_type, now],
    });
  }

  // 2. Demo Products
  const demoProducts = [
    {
      id: "demo-prod-1",
      sku: "VR-G-NK-001",
      slug: "heritage-22k-nakshi-haar",
      name: "[Demo Sample] Heritage 22K Gold Nakshi Choker",
      product_type: "single_piece",
      category_id: "cat-necklaces",
      short_description: "Exquisite hand-carved floral motifs in hallmarked 22 Karat (916) yellow gold. One-of-a-kind physical studio piece.",
      long_description: "Created by senior traditional artisans, this heritage nakshi choker reflects generations of goldsmithing expertise. Each petal and floral scroll is hand-chased. Price is determined upon in-shop inspection and current gold weight confirmation.",
      metal_purity: "22K Gold (916 Hallmarked)",
      metal_color: "Warm Yellow Gold",
      gross_weight_grams: 48.65,
      net_gold_weight_grams: 48.65,
      dimensions: "16 inch length with adjustable silk dori",
      price_mode: "quote_first",
      fixed_price_amount: null,
      price_assumptions: "Quotation calculated based on exact net weight at time of enquiry plus workmanship charges.",
      status: "published",
      is_demo: 1,
      primary_media_id: "demo-media-1",
      care_instructions: "Store in soft cotton or velvet pouch away from moisture and perfumes. Inspect clasp every 6 months.",
    },
    {
      id: "demo-prod-2",
      sku: "VR-G-KD-002",
      slug: "fluted-solid-gold-kada",
      name: "[Demo Sample] Handcrafted Fluted Gold Kada (22K)",
      product_type: "single_piece",
      category_id: "cat-bangles",
      short_description: "Classic fluted solid gold bangle with screw lock clasp. Substantial feel and timeless daily wear comfort.",
      long_description: "Solid 22K gold construction with hand-turned flutes and a secure traditional screw hinge. Suitable for everyday elegance or auspicious occasions.",
      metal_purity: "22K Gold (916 Hallmarked)",
      metal_color: "Traditional Yellow Gold",
      gross_weight_grams: 32.4,
      net_gold_weight_grams: 32.4,
      dimensions: "Size 2.6 (Inside diameter ~60mm)",
      price_mode: "indicative_estimate",
      fixed_price_amount: null,
      price_assumptions: "Indicative estimate calculated with 22K base rate + 12% making charges + 3% GST. Final invoice issued upon shop purchase.",
      status: "published",
      is_demo: 1,
      primary_media_id: "demo-media-2",
      care_instructions: "Wipe with clean microfibre cloth after wearing. Professional cleaning available at our shop.",
    },
    {
      id: "demo-prod-3",
      sku: "VR-RATNA-BS-003",
      slug: "natural-ceylon-blue-sapphire-neelam",
      name: "[Demo Sample] Natural Ceylon Blue Sapphire (Neelam) 4.25 Carat",
      product_type: "loose_gemstone",
      category_id: "cat-loose-gemstones",
      short_description: "Vibrant royal cornflower blue with excellent clarity. Completely unheated natural corundum.",
      long_description: "Sourced from traditional alluvial gravels of Ratnapura, Sri Lanka. Displays brilliant internal reflections, silk inclusions confirming natural unheated origin, and crisp oval cut. Available for personal inspection at our studio.",
      metal_purity: "Loose Gemstone",
      metal_color: "Vivid Royal Blue",
      gross_weight_grams: 0.85, // 4.25 carats
      dimensions: "9.8 x 7.6 x 5.2 mm",
      gemstone_details: "Species: Natural Corundum. Variety: Natural Sapphire. Weight: 4.25 Carats. Treatment: None detected.",
      price_mode: "quote_first",
      fixed_price_amount: null,
      price_assumptions: "Available on request. Accompanied by recognized independent gemological laboratory report.",
      status: "published",
      is_demo: 1,
      primary_media_id: "demo-media-3",
      care_instructions: "Hardness 9 on Mohs scale. Clean with warm mild soapy water and soft brush. Avoid sudden extreme temperature shocks.",
    },
    {
      id: "demo-prod-4",
      sku: "VR-R-SL-004",
      slug: "solitaire-claw-ring-18k",
      name: "[Demo Sample] Bespoke Solitaire Ring in 18K Rose Gold",
      product_type: "custom_example",
      category_id: "cat-rings",
      short_description: "Custom design archive piece featuring a four-prong tulip basket in polished 18K rose gold.",
      long_description: "An example of our bespoke custom jewellery service. Handcrafted to order with client-selected central stone and tailored ring profile.",
      metal_purity: "18K Rose Gold (750)",
      metal_color: "Rose Gold",
      gross_weight_grams: 4.2,
      net_gold_weight_grams: 4.2,
      dimensions: "Band width 2.2mm tapering to 1.8mm",
      price_mode: "quote_first",
      fixed_price_amount: null,
      price_assumptions: "Custom bespoke piece. Price depends on chosen metal, diamond/gemstone grade, and finger size.",
      status: "published",
      is_demo: 1,
      primary_media_id: "demo-media-4",
      care_instructions: "Store separately to prevent scratches with harder stones. Annual prong inspection recommended.",
    },
  ];

  for (const p of demoProducts) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO products (
        id, sku, slug, name, product_type, category_id,
        short_description, long_description, metal_purity, metal_color,
        gross_weight_grams, net_gold_weight_grams, dimensions, gemstone_details,
        price_mode, fixed_price_amount, currency, price_assumptions, status, is_demo,
        primary_media_id, last_availability_confirmed_at, care_instructions, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, 'INR', ?, ?, ?,
        ?, ?, ?, ?, ?
      )`,
      args: [
        p.id,
        p.sku,
        p.slug,
        p.name,
        p.product_type,
        p.category_id ?? null,
        p.short_description ?? null,
        p.long_description ?? null,
        p.metal_purity ?? null,
        p.metal_color ?? null,
        p.gross_weight_grams ?? null,
        p.net_gold_weight_grams ?? null,
        p.dimensions ?? null,
        p.gemstone_details ?? null,
        p.price_mode,
        p.fixed_price_amount ?? null,
        p.price_assumptions ?? null,
        p.status,
        p.is_demo,
        p.primary_media_id ?? null,
        now,
        p.care_instructions ?? null,
        now,
        now,
      ],
    });
  }

  // 3. Factual Educational Articles
  const demoArticles = [
    {
      id: "art-1",
      slug: "understanding-bis-hallmark-gold-purity-in-india",
      title: "How to Read BIS Hallmark Symbols & Verify Gold Purity in India",
      summary: "A practical guide to understanding the 3 mandatory hallmarking marks on gold jewellery in India and verifying the HUID number on the BIS Care App.",
      content_markdown: `
### What Does a Genuine BIS Hallmark Look Like?

In India, mandatory hallmarking was instituted by the Bureau of Indian Standards (BIS) to protect jewellery consumers. As per current consumer regulations, every piece of hallmarked gold jewellery carries three distinct laser-etched symbols:

1. **The BIS Standard Logo:** The recognizable triangular mark indicating certification.
2. **Purity and Fineness Mark:**
   - **22K916:** 22 Karat gold containing 91.6% pure gold.
   - **18K750:** 18 Karat gold containing 75.0% pure gold.
   - **14K585:** 14 Karat gold containing 58.5% pure gold.
3. **6-Digit Alphanumeric HUID (Hallmark Unique Identification):** A unique laser-etched tracking code assigned to that specific physical piece during assaying.

### How to Verify Your Jewellery on the Official BIS Care App

You do not need to rely only on the jeweler's claim. You can verify the authentication independently:

1. Download the official **BIS Care App** from the Google Play Store or Apple App Store.
2. Open the app and navigate to **'Verify HUID'**.
3. Type the 6-digit alphanumeric code stamped on your piece.
4. The app displays:
   - Jeweller registration number
   - Assaying & Hallmarking Centre (AHC) details
   - Date of hallmarking
   - Declared article type and purity

*Always verify that the net gold weight billed matches the scale reading, and that stone weight is deducted before calculating gold cost.*
      `,
      category: "jewellery_guide",
      author_name: "Vaidik Ratnam Research Team",
      reviewer_name: "Senior Studio Gemologist",
      sources_json: JSON.stringify([
        { title: "Bureau of Indian Standards (BIS) Hallmarking Guidelines", url: "https://www.bis.gov.in" },
        { title: "Department of Consumer Affairs (Govt. of India)", url: "https://consumeraffairs.gov.in" },
      ]),
      status: "published",
      is_featured: 1,
      published_at: now,
    },
    {
      id: "art-2",
      slug: "decoding-the-gold-jewellery-invoice-making-charges-and-wastage",
      title: "Decoding Your Jewellery Bill: Gold Rate, Making Charges & Net Weight",
      summary: "Understand exactly how a transparent jewellery bill is calculated: gross weight, stone deduction, net gold weight, making charges, and GST.",
      content_markdown: `
### The 5 Standard Components of a Fine Jewellery Invoice

When you purchase fine gold jewellery from an honest family jeweler, the invoice must clearly break down each element:

\`\`\`
Total Bill = (Net Gold Weight × Current Gold Rate) + Workmanship/Making Charges + Cost of Studded Gems (if any) + Applicable GST (3%)
\`\`\`

#### 1. Gross Weight vs. Net Weight
- **Gross Weight:** Total weight of the piece including metal, pearls, enamelling (meenakari), lacquer (in traditional kundan), and studded stones.
- **Net Gold Weight:** The weight of the precious gold alloy *alone*. **You should only pay for gold at the gold rate on the net weight.**

#### 2. Making Charges (Workmanship)
Making charges compensate the karigars (craftsmen) for the hours of meticulous labour, setting, polishing, and wastage during hand manufacture.
- Plain machine chains generally have lower making charges (8% to 14%).
- Intricate hand-carved Nakshi, Temple jewellery, and filigree require days of hand engraving, reflected in fair making charges (16% to 25%).

#### 3. Gemstone & Diamond Pricing
Studded stones should never be billed at the gold rate. Diamonds are priced by carat weight and 4Cs grading; gemstones are priced per carat or piece based on quality.
      `,
      category: "pricing_explanation",
      author_name: "Vaidik Ratnam Technical Studio",
      reviewer_name: "Studio Principal",
      sources_json: JSON.stringify([
        { title: "World Gold Council Retail Buying Guide", url: "https://www.gold.org" },
      ]),
      status: "published",
      is_featured: 1,
      published_at: now,
    },
    {
      id: "art-3",
      slug: "gemstone-lab-reports-what-they-prove-and-what-they-cannot",
      title: "What Gemstone Lab Reports Prove — And What They Cannot",
      summary: "Learn what an authentic gemological testing report from GIA or recognized laboratories covers: species, natural origin, and treatments vs astrological suitability.",
      content_markdown: `
### The Purpose of an Independent Gemological Report

In the gemstone trade, transparency is paramount. Reputable laboratories (such as GIA, IGI, or premier national testing houses) evaluate physical, chemical, and optical properties using advanced spectroscopy, microscopic inclusion analysis, and refractometry.

#### What a Competent Lab Report CAN Prove:
1. **Natural vs. Synthetic (Lab-Grown):** Verifies whether the crystal grew in the earth over millions of years or was synthesized in a high-pressure flux/CVD chamber.
2. **Mineral Species & Variety:** Confirms whether a stone is Natural Corundum (Sapphire/Ruby), Beryl (Emerald), Chrysoberyl, etc.
3. **Presence of Enhancement or Treatment:**
   - Detects thermal treatment (heating).
   - Detects glass filling, lead-glass clarity enhancement, dye diffusion, or resin filling.
   - Accurately states: *No indications of heating* or *Indications of thermal enhancement present*.

#### What a Lab Report CANNOT Prove:
1. **Astrological Suitability:** Gem laboratories are scientific mineralogical institutions. A report does not determine your birth chart alignment or traditional planetary suitability.
2. **Commercial Value or Retail Price:** Labs do not appraise monetary worth; they certify gemological specifications.
3. **Internal Vaidik Product IDs are NOT Lab Reports:** Be cautious of retailers who print a plastic card with a barcode or internal SKU and call it a 'certificate of authenticity'. Always ask for recognized independent gemological laboratory documentation.
      `,
      category: "gemstones_ratna",
      author_name: "Vaidik Ratnam Gemological Desk",
      reviewer_name: "Senior Gemologist",
      sources_json: JSON.stringify([
        { title: "GIA Colored Stone Reports & Research", url: "https://www.gia.edu" },
      ]),
      status: "published",
      is_featured: 1,
      published_at: now,
    },
    {
      id: "art-4",
      slug: "navratna-and-vedic-gemstone-guidance-principles",
      title: "Traditional Vedic Gemstone (Ratna) Guidance: Ethics & Principles",
      summary: "Our philosophy on traditional astrology consultation: empowering personal discernment, avoiding fear-based sales, and understanding the role of natural untreated stones.",
      content_markdown: `
### Our Core Ethical Philosophy on Astrological Guidance

Traditional Vedic astrology (Jyotish) is an ancient symbolic discipline intended to provide perspective, self-reflection, and spiritual clarity. In our studio, we maintain strict ethical boundaries:

1. **No Fear-Based Marketing:** We never use dosha threats, fear of misfortune, or emotional manipulation to compel a consultation or gemstone purchase.
2. **Consultation and Jewellery are Independent:** Booking an astrology consultation with our father carries zero obligation to commission jewellery or acquire a gemstone from our studio.
3. **Astrology is Not Medical or Legal Counsel:** Traditional gemstone recommendations are spiritual practices. They should never replace professional medical care, psychiatric treatment, or legal and financial counsel.
4. **Natural vs. Treated Stones in Jyotish:** In traditional belief, stones used for astrological resonance are preferred in their unheated, natural state with natural inclusions and good transparency. We present the gemological facts with absolute clarity so you can choose knowingly.
      `,
      category: "astrology_preparation",
      author_name: "Vaidik Ratnam Consultation Practice",
      reviewer_name: "Studio Astrologer",
      sources_json: JSON.stringify([
        { title: "Brihat Samhita & Traditional Jyotish Texts (Referenced Context)", url: "https://vaidikratnam.com" },
      ]),
      status: "published",
      is_featured: 0,
      published_at: now,
    },
  ];

  for (const a of demoArticles) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO articles (
        id, slug, title, summary, content_markdown, category, tags, author_name, reviewer_name, sources_json, status, is_featured, published_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, '["jewellery", "education"]', ?, ?, ?, ?, ?, ?, ?)`,
      args: [a.id, a.slug, a.title, a.summary, a.content_markdown, a.category, a.author_name, a.reviewer_name, a.sources_json, a.status, a.is_featured, a.published_at, now],
    });
  }

  // 4. Studio FAQs
  const demoFaqs = [
    {
      id: "faq-1",
      category: "showroom_visiting",
      question: "How do I view jewellery pieces in person at your shop?",
      answer: "You can book a shop visit request directly through any product page or via our Contact page. We will confirm available physical pieces and welcome you to our shop.",
      order: 1,
    },
    {
      id: "faq-2",
      category: "custom_design",
      question: "What is the timeline for custom jewellery?",
      answer: "A custom jewellery piece typically takes 2 to 4 weeks depending on design intricacy, gemstone sourcing, and hallmarking. We provide detailed timeline estimates after reviewing your initial brief.",
      order: 2,
    },
    {
      id: "faq-3",
      category: "payment_and_collection",
      question: "Do you ship jewellery across India or internationally?",
      answer: "No. For safety and peace of mind, all purchases are done directly at our shop where gold is weighed in front of you on digital scales. We do not provide courier dispatch or remote cart checkout.",
      order: 3,
    },
    {
      id: "faq-4",
      category: "hallmarking",
      question: "Are all gold jewellery pieces 100% BIS hallmarked?",
      answer: "Yes, all our gold jewellery is stamped with the official Bureau of Indian Standards (BIS) mark, the fineness designation (such as 22K916 or 18K750), and the verifiable 6-digit HUID code.",
      order: 4,
    },
    {
      id: "faq-5",
      category: "astrology",
      question: "Is there any obligation to buy a gemstone if I take an astrology consultation?",
      answer: "None whatsoever. Our father's astrology consultation practice is completely independent. You receive honest traditional astrological analysis, and whether you choose to wear a gemstone or source it anywhere is entirely your prerogative.",
      order: 5,
    },
  ];

  for (const f of demoFaqs) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO faqs (id, category, question, answer, display_order, is_published, created_at)
            VALUES (?, ?, ?, ?, ?, 1, ?)`,
      args: [f.id, f.category, f.question, f.answer, f.order, now],
    });
  }
}
