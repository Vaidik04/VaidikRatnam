/**
 * VAIDIK RATNAM — STUDIO AI CONCIERGE (Vaidik Margdarshak)
 * Connects to Google Gemini API (with OpenAI fallback) and grounded semantic knowledge.
 */

import { retrieveGroundedKnowledge } from "./semantic-retriever";

export interface AiChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AiChatResponse {
  reply: string;
  isAiGenerated: boolean;
  provider: "gemini" | "openai" | "studio_knowledge_engine";
  relevantLinks: Array<{ label: string; url: string }>;
}

const SYSTEM_PROMPT = `You are "Vaidik Margdarshak" (वैदिक मार्गदर्शक), the knowledgeable, warm, and honest family AI guide for Vaidik Ratnam — Traditional Gold Jewellery & Gemstone Shop (vaidikratnam.com). Always speak in simple, clear, respectful English that any Indian family can easily understand. Avoid difficult or pretentious foreign words.

CORE ETHICAL & FACTUAL RULES:
1. TONE & MANNER: Respectful, warm, and grounded Indian family shop perspective. Calm, polite, clear, and reassuring. Never pushy, manipulative, or sensational.
2. VEDIC ASTROLOGY LAW:
   - Follow classical Parashari Jyotish. Gemstones are cosmic energetic amplifiers, NOT magical shields.
   - Prescribe gemstones ONLY for the Dharma Trikona (1st, 5th, 9th houses).
   - NEVER recommend wearing gemstones of Dusthana lords (6th, 8th, 12th houses).
   - Explicitly warn against blindly wearing Blue Sapphire (Neelam) during Sade Sati without examining if Saturn is a functional benefic.
   - Clarify that an astrological consultation never obligates someone to buy a stone from our shop.
3. LEGAL & JEWELLERY COMPLIANCE:
   - Mandatory BIS Hallmarking: 3 marks (BIS triangle logo, purity like 22K916, and 6-digit alphanumeric HUID).
   - Price calculation: Price = [(Net Gold Weight × Rate) + Making Charges + Stones] + 3% GST.
   - Indian Legal Metrology: Always separate Gross Weight from Net Gold Weight.
   - Gemstones: Distinguish natural unheated stones from heated/glass-filled or synthetic stones.
4. SHOP OPERATING CONSTRAINTS:
   - In v1, there is strictly NO courier shipping or nationwide delivery. Customers visit our shop in person or collect by agreed in-person visit.
   - We do not have impulse checkout ("Buy Now"). We operate on custom jewellery making, quotes, and shop visits.
5. NO FABRICATION: Never invent business awards, fake customer reviews, or unverified claims.

Always refer to the Grounded Shop Context provided below to answer the user's inquiry accurately. Keep responses concise, well-structured, simple to understand, and helpful.`;

export async function askStudioAdvisor(
  userQuery: string,
  history: AiChatMessage[] = []
): Promise<AiChatResponse> {
  const { combinedContext, recommendedLinks, bestDirectMatch } =
    await retrieveGroundedKnowledge(userQuery);

  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  // 1. If Gemini API Key is present, call Gemini 1.5 Flash
  if (geminiApiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

      const contents = [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\n[AUTHENTIC STUDIO KNOWLEDGE CONTEXT]:\n${
                combinedContext || "No specific document matched; answer using general Vaidik Ratnam studio standards."
              }\n\nUser Question: ${userQuery}`,
            },
          ],
        },
      ];

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.2, // Low temperature for high factual adherence
            maxOutputTokens: 600,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const candidateText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (candidateText) {
          return {
            reply: candidateText,
            isAiGenerated: true,
            provider: "gemini",
            relevantLinks: recommendedLinks,
          };
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to knowledge engine:", err);
    }
  }

  // 2. If OpenAI API Key is present, call OpenAI
  if (openaiApiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.2,
          max_tokens: 500,
          messages: [
            {
              role: "system",
              content: `${SYSTEM_PROMPT}\n\n[AUTHENTIC STUDIO KNOWLEDGE CONTEXT]:\n${
                combinedContext || "No specific document matched."
              }`,
            },
            ...history.slice(-4),
            { role: "user", content: userQuery },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return {
            reply,
            isAiGenerated: true,
            provider: "openai",
            relevantLinks: recommendedLinks,
          };
        }
      }
    } catch (err) {
      console.warn("OpenAI API call failed, falling back to knowledge engine:", err);
    }
  }

  // 3. Grounded Studio Knowledge Engine (Deterministic & Instant)
  // Provides high-quality answers synthesized directly from our database, astrology profiles, and formulas.
  let synthesizedReply = "";

  if (bestDirectMatch) {
    synthesizedReply = `Namaste. Here is verified information from our shop records regarding your question:

${bestDirectMatch}

Our family and senior astrologer advise that jewellery and gemstones should always be evaluated with factual specifications and exact birth details rather than generalizations.`;
  } else {
    synthesizedReply = `Our automated knowledge assistant did not find a direct match in our shop records. We prefer not to guess on jewellery specifications, prices, or claims without verified facts.

Please explore our interactive tools below or connect directly with our shop on WhatsApp for personal assistance.`;
  }

  return {
    reply: synthesizedReply,
    isAiGenerated: false,
    provider: "studio_knowledge_engine",
    relevantLinks: bestDirectMatch ? recommendedLinks : [],
  };
}
