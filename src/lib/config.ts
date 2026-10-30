export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vaidikratnam.com",
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Vaidik Ratnam",
  businessTagline: process.env.NEXT_PUBLIC_BUSINESS_TAGLINE || "The Jewellery & Ratna Studio",
  currencySymbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹",
  currencyCode: process.env.NEXT_PUBLIC_CURRENCY_CODE || "INR",
  whatsAppPhone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "",
  enableDemoSeed: process.env.ENABLE_DEMO_SEED === "true",
  enableConsultationBooking: process.env.ENABLE_CONSULTATION_BOOKING !== "false",
  enableWholesalePortal: process.env.ENABLE_WHOLESALE_PORTAL === "true",
  enableAiAssistant: process.env.ENABLE_AI_ASSISTANT === "true",
};

