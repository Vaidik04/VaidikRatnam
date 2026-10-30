import { NextRequest, NextResponse } from "next/server";
import { askStudioAdvisor } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
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

    const response = await askStudioAdvisor(query, history);
    return NextResponse.json(response);
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      {
        error: "Failed to process question. Please try again or contact the studio.",
      },
      { status: 500 }
    );
  }
}

