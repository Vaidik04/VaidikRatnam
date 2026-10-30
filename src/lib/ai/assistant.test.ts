import { describe, it, expect } from "vitest";
import { askKnowledgeAssistant } from "./assistant";
import { askStudioAdvisor } from "./gemini";

describe("askKnowledgeAssistant & askStudioAdvisor", () => {
  it("returns safe deterministic fallback when AI is unconfigured", async () => {
    const res = await askKnowledgeAssistant({ question: "Tell me about BIS hallmarking and HUID verification" });
    expect(res.isAiGenerated).toBe(false);
    expect(typeof res.answer).toBe("string");
    expect(res.suggestedContactAction).toBeDefined();
  });

  it("handles unknown questions gracefully without inventing facts", async () => {
    const res = await askKnowledgeAssistant({ question: "Do you have 500 gold coins in stock right now for 10 rupees?" });
    expect(res.isAiGenerated).toBe(false);
    expect(res.answer).toContain("did not find a direct match");
    expect(res.citedArticles.length).toBe(0);
  });

  it("answers Vedic astrology questions accurately regarding Sade Sati and Blue Sapphire", async () => {
    const res = await askStudioAdvisor("Can I wear Blue Sapphire during Sade Sati?");
    expect(res.reply).toContain("PARASHARI RULE");
    expect(res.reply).toContain("NEVER be worn blindly");
    expect(res.relevantLinks.length).toBeGreaterThan(0);
  });

  it("recommends correct Trikona gemstones for Mesha (Aries) Lagna", async () => {
    const res = await askStudioAdvisor("What gemstones are prescribed for Mesha Lagna?");
    expect(res.reply).toContain("Mesha");
    expect(res.reply).toContain("1st house=Red Coral");
    expect(res.relevantLinks.length).toBeGreaterThan(0);
  });
});

