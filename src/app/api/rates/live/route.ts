import { NextRequest, NextResponse } from "next/server";
import { fetchLiveBullionRates } from "@/lib/services/gold-rates";
import { rateLimiter, getClientIp } from "@/lib/security/rate-limiter";

export const dynamic = "force-dynamic";
export const revalidate = 900; // 15-minute ISR cache

export async function GET(req: NextRequest) {
  try {
    const clientIp = getClientIp(req.headers);

    // Rate limit: max 60 rate queries per 10 minutes per IP
    const rateCheck = rateLimiter.check(`rates-live:${clientIp}`, 60, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many rate requests. Please utilize cached values." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds),
          },
        }
      );
    }

    const { searchParams } = new URL(req.url);
    const spreadParam = searchParams.get("spread");
    const citySpread = spreadParam ? parseInt(spreadParam, 10) : 0;

    const safeSpread = !isNaN(citySpread) && Math.abs(citySpread) <= 500 ? citySpread : 0;

    const data = await fetchLiveBullionRates(safeSpread);

    return NextResponse.json(
      {
        success: data.success,
        data,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
        },
      }
    );
  } catch (err: unknown) {
    console.error("Live rates API error:", err);
    return NextResponse.json(
      { success: false, message: "Could not fetch bullion rates." },
      { status: 500 }
    );
  }
}
