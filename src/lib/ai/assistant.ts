import { askStudioAdvisor } from "./gemini";

export interface AiKnowledgeQueryInput {
  question: string;
}

export interface AiKnowledgeQueryResponse {
  answer: string;
  isAiGenerated: boolean;
  citedArticles: Array<{ title: string; slug: string }>;
  suggestedContactAction: string;
}

export async function askKnowledgeAssistant(
  input: AiKnowledgeQueryInput
): Promise<AiKnowledgeQueryResponse> {
  const result = await askStudioAdvisor(input.question);

  return {
    answer: result.reply,
    isAiGenerated: result.isAiGenerated,
    citedArticles: result.relevantLinks.map((l) => ({
      title: l.label,
      slug: l.url.replace(/^\/learn\//, ""),
    })),
    suggestedContactAction:
      "For personal guidance or price quotes, visit our shop or contact us on WhatsApp.",
  };
}
