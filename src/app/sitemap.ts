import { MetadataRoute } from "next";
import { repo } from "@/lib/db/repo";

const STABLE_BUILD_DATE = new Date("2026-10-30T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vaidikratnam.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: STABLE_BUILD_DATE, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/jewellery`, lastModified: STABLE_BUILD_DATE, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/custom-design`, lastModified: STABLE_BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/gemstones`, lastModified: STABLE_BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/astrology`, lastModified: STABLE_BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/learn`, lastModified: STABLE_BUILD_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/tools/gold-budget-estimator`, lastModified: STABLE_BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tools/jewellery-buying-checklist`, lastModified: STABLE_BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tools/gemstone-comparison`, lastModified: STABLE_BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: STABLE_BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: STABLE_BUILD_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: STABLE_BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: STABLE_BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cancellation`, lastModified: STABLE_BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/custom-orders`, lastModified: STABLE_BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/gemstone-disclosure`, lastModified: STABLE_BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const [{ products }, articles] = await Promise.all([
      repo.getPublishedProducts({ limit: 100 }),
      repo.getPublishedArticles(),
    ]);

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${baseUrl}/jewellery/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : STABLE_BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${baseUrl}/learn/${a.slug}`,
      lastModified: a.updated_at ? new Date(a.updated_at) : STABLE_BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes, ...articleRoutes];
  } catch {
    return staticRoutes;
  }
}
