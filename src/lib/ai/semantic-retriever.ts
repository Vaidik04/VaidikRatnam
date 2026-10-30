/**
 * VAIDIK RATNAM — GROUNDED KNOWLEDGE RETRIEVER
 * Indexes authentic studio data for factual, non-hallucinated AI responses.
 */

import { repo } from "@/lib/db/repo";
import { LAGNA_PROFILES, NAVAGRAHA_DATA } from "@/lib/astrology/data";

export interface RetrievedContext {
  topic: string;
  content: string;
  relevantLinks: Array<{ label: string; url: string }>;
  relevanceScore: number;
}

export async function retrieveGroundedKnowledge(query: string): Promise<{
  combinedContext: string;
  recommendedLinks: Array<{ label: string; url: string }>;
  bestDirectMatch?: string;
}> {
  const cleanQ = query.toLowerCase().trim();
  const STOP_WORDS = new Set([
    "the", "and", "for", "with", "you", "have", "are", "can", "this", "that", "from",
    "what", "when", "where", "how", "right", "now", "stock", "coins", "coins", "rupees",
  ]);

  const tokens = cleanQ
    .split(/\s+/)
    .map((t) => t.replace(/[^a-z0-9]/g, ""))
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));

  const [articles, faqs] = await Promise.all([
    repo.getPublishedArticles(),
    repo.getPublishedFaqs(),
  ]);

  const candidates: RetrievedContext[] = [];

  // 1. Check Articles
  for (const art of articles) {
    let score = 0;
    const titleLower = art.title.toLowerCase();
    const summaryLower = art.summary.toLowerCase();

    let matchedTokensCount = 0;
    tokens.forEach((t) => {
      if (titleLower.includes(t)) {
        score += 5;
        matchedTokensCount++;
      } else if (summaryLower.includes(t)) {
        score += 2;
      }
    });

    const isStrongMatch = tokens.length <= 2 ? matchedTokensCount >= 1 : matchedTokensCount >= 2;

    if (score >= 6 && isStrongMatch) {
      candidates.push({
        topic: `Article: ${art.title}`,
        content: `${art.summary}\nKey points: ${art.content_markdown.substring(0, 450)}...`,
        relevantLinks: [{ label: `Read Article: ${art.title}`, url: `/learn/${art.slug}` }],
        relevanceScore: score,
      });
    }
  }

  // 2. Check Studio FAQs
  for (const faq of faqs) {
    let score = 0;
    const qLower = faq.question.toLowerCase();
    const aLower = faq.answer.toLowerCase();

    let matchedTokensCount = 0;
    tokens.forEach((t) => {
      if (qLower.includes(t)) {
        score += 6;
        matchedTokensCount++;
      } else if (aLower.includes(t)) {
        score += 2;
      }
    });

    const isStrongMatch = tokens.length <= 2 ? matchedTokensCount >= 1 : matchedTokensCount >= 2;

    if (score >= 8 && isStrongMatch) {
      candidates.push({
        topic: `FAQ: ${faq.question}`,
        content: `Q: ${faq.question}\nA: ${faq.answer}`,
        relevantLinks: [{ label: "Studio FAQs", url: "/learn" }],
        relevanceScore: score,
      });
    }
  }

  // 3. Check Vedic Lagna Knowledge
  for (const lagna of LAGNA_PROFILES) {
    const sName = lagna.sanskritName.toLowerCase();
    const eName = lagna.englishName.toLowerCase();

    if (cleanQ.includes(sName.split(" ")[0]) || cleanQ.includes(eName) || cleanQ.includes(lagna.slug)) {
      candidates.push({
        topic: `Vedic Lagna: ${lagna.sanskritName} (${lagna.englishName})`,
        content: `Ruler: ${lagna.rulingPlanet}. Benefic Gemstones (Dharma Trikona): 1st house=${lagna.lagneshRatna.stone}, 5th house=${lagna.panchameshRatna.stone}, 9th house=${lagna.bhagyeshRatna.stone}. Prohibited Gemstones (Dusthana/Enemy): ${lagna.prohibitedGemstones.map((p) => `${p.stone} (${p.reason})`).join("; ")}. Recommended Metal: ${lagna.primaryMetal}.`,
        relevantLinks: [
          { label: `Explore ${lagna.sanskritName} Lagna`, url: "/astrology#lagna-explorer" },
          { label: "Book Astrological Verification", url: `/consultation/request?sign=${encodeURIComponent(lagna.sanskritName)}` },
        ],
        relevanceScore: 10,
      });
    }
  }

  // 4. Check Navagraha Knowledge
  for (const [key, graha] of Object.entries(NAVAGRAHA_DATA)) {
    const pName = graha.planet.toLowerCase();
    const sPlanet = graha.sanskritPlanet.toLowerCase();
    const rName = graha.primaryRatna.toLowerCase();
    const sRatna = graha.sanskritRatna.toLowerCase();

    if (cleanQ.includes(pName) || cleanQ.includes(sPlanet) || cleanQ.includes(rName) || cleanQ.includes(sRatna.split(" ")[0]) || cleanQ.includes(key)) {
      candidates.push({
        topic: `Navagraha: ${graha.sanskritPlanet} (${graha.planet})`,
        content: `Primary Ratna: ${graha.primaryRatna} (${graha.sanskritRatna}). Mineral: ${graha.mineralFamily}. Cosmic Ray: ${graha.cosmicRay}. Auspicious Metal: ${graha.auspiciousMetal}. Wearing Finger: ${graha.wearingFinger}. Day/Muhurta: ${graha.wearingDay}. Beej Mantra: ${graha.beejMantra}. Upa-ratnas: ${graha.upaRatnas.join(", ")}.`,
        relevantLinks: [
          { label: "Navagraha Ratna Matrix", url: "/astrology" },
          { label: "Gemstone Knowledge", url: "/gemstones" },
        ],
        relevanceScore: 8,
      });
    }
  }

  // 5. Check Gold Pricing & Hallmarking Specifics
  if (
    cleanQ.includes("making charge") ||
    cleanQ.includes("gold price") ||
    cleanQ.includes("calculate gold") ||
    cleanQ.includes("gold budget") ||
    cleanQ.includes("price formula") ||
    cleanQ.includes("huid") ||
    cleanQ.includes("hallmark")
  ) {
    candidates.push({
      topic: "Gold Jewellery Pricing Formula & BIS Standards",
      content: "Official Formula: Total Price = [(Gross Gold Weight × Gold Rate for purity) + Making Charges + Stone Value] + 3% GST. BIS Hallmarking requires 3 marks: BIS Logo, Purity Mark (22K916 / 18K750), and 6-digit alphanumeric HUID (Hallmark Unique Identification). We provide an interactive Gold Budget Estimator tool.",
      relevantLinks: [
        { label: "Launch Gold Budget Estimator", url: "/tools/gold-budget-estimator" },
        { label: "Printable Jewellery Buying Checklist", url: "/tools/jewellery-buying-checklist" },
      ],
      relevanceScore: 9,
    });
  }

  // 6. Check Sade Sati & Saturn Myth
  if (cleanQ.includes("sade sati") || cleanQ.includes("shani") || cleanQ.includes("neelam") || cleanQ.includes("blue sapphire")) {
    candidates.push({
      topic: "Sade Sati & Blue Sapphire Rule",
      content: "CRITICAL PARASHARI RULE: Blue Sapphire (Neelam) must NEVER be worn blindly during Sade Sati. Gemstones are cosmic amplifiers, not shields. If Saturn is a functional malefic (ruler of 6th, 8th, or 12th houses for signs like Aries, Cancer, or Leo), wearing Neelam intensifies affliction. Saturn is appeased through humble service, discipline, and Hanuman/Shani Stotra, not stones.",
      relevantLinks: [
        { label: "Astrological Code of Ethics", url: "/astrology" },
        { label: "Book Chart Analysis with Elder", url: "/consultation/request" },
      ],
      relevanceScore: 10,
    });
  }

  // 7. Check Custom Design & Shipping Policy
  if (cleanQ.includes("custom") || cleanQ.includes("bespoke") || cleanQ.includes("order") || cleanQ.includes("shipping") || cleanQ.includes("courier") || cleanQ.includes("delivery")) {
    candidates.push({
      topic: "Custom Orders & Shop Visit Policy",
      content: "Vaidik Ratnam operates as a traditional in-person family jewellery shop. We do NOT offer nationwide courier or delivery in v1 due to courier risk. Pieces are handcrafted upon order and collected or viewed in-person at our shop where they are weighed on digital scales. Custom requests can be submitted online with reference photos and budget preferences.",
      relevantLinks: [
        { label: "Order Custom Jewellery", url: "/custom-design" },
        { label: "Shop Location & Contact", url: "/contact" },
      ],
      relevanceScore: 9,
    });
  }

  // Sort candidates by relevance
  candidates.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topCandidates = candidates.slice(0, 3);

  const combinedContext = topCandidates
    .map((c) => `[Source: ${c.topic}]\n${c.content}`)
    .join("\n\n");

  const recommendedLinks: Array<{ label: string; url: string }> = [];
  const seenUrls = new Set<string>();

  topCandidates.forEach((c) => {
    c.relevantLinks.forEach((l) => {
      if (!seenUrls.has(l.url)) {
        seenUrls.add(l.url);
        recommendedLinks.push(l);
      }
    });
  });

  return {
    combinedContext,
    recommendedLinks: recommendedLinks.slice(0, 3),
    bestDirectMatch: topCandidates.length > 0 ? topCandidates[0].content : undefined,
  };
}
