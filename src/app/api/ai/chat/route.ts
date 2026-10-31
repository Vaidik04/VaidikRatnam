import { NextRequest, NextResponse } from "next/server";
import { askStudioAdvisor } from "@/lib/ai/gemini";
import { rateLimiter, getClientIp } from "@/lib/security/rate-limiter";

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req.headers);

    // Rate limit: max 20 AI queries per 10 minutes per IP
    const rateCheck = rateLimiter.check(`ai-chat:${clientIp}`, 20, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a few moments before asking another question.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds),
          },
        }
      );
    }

    const body = await req.json();
    const query = typeof body.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body.history) ? body.history : [];

    if (!query) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: "Query is too long. Please limit to 500 characters." },
        { status: 400 }
      );
    }

    // Limit history length to prevent excessive context injection / cost amplification
    const safeHistory = history.slice(-6).map((msg: { role?: string; content?: string }) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: String(msg.content || "").slice(0, 500),
    }));

    const response = await askStudioAdvisor(query, safeHistory);
    return NextResponse.json(response);
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      {
        error: "Failed to process question. Please try again or contact our shop.",
      },
      { status: 500 }
    );
  }
}
