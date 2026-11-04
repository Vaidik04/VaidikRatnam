import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculatePlanetaryPositions } from "@/lib/lal-kitab/astronomy";
import { buildLalKitabChart } from "@/lib/lal-kitab/chart-builder";
import { evaluateLalKitabRules } from "@/lib/lal-kitab/rule-engine";
import { resolveHistoricalIndianOffset } from "@/lib/lal-kitab/timezone";

const birthInputSchema = z.object({
  name: z.string().max(80).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  cityName: z.string().max(100).optional(),
  currentAge: z.number().int().min(1).max(120).optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: "DPDP Act 2023 consent required for astrological processing.",
  }),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = birthInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid birth details input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { year, month, day, hour, minute, lat, lon, currentAge } = parsed.data;

    // Resolve accurate historical timezone offset
    const tzMeta = resolveHistoricalIndianOffset(year, month, day);

    // Run astronomical computation
    const astronomy = calculatePlanetaryPositions(
      year,
      month,
      day,
      hour,
      minute,
      lat,
      lon,
      tzMeta.offsetHours
    );

    // Build fixed-house Lal Kitab chart
    const chart = buildLalKitabChart(astronomy.planets);

    // Evaluate rules
    const evaluation = evaluateLalKitabRules(chart, currentAge || 32);

    return NextResponse.json({
      success: true,
      data: {
        astronomy,
        chart,
        evaluation,
        timezone: tzMeta,
        disclaimer:
          "Traditional Lal Kitab astrological guidance according to reviewed 1952 Gutka reference texts. Not a guarantee of life events or a substitute for medical, legal, or financial consultation.",
      },
    });
  } catch (err: unknown) {
    console.error("Lal Kitab calculation API error:", err);
    return NextResponse.json(
      { error: "Failed to compute Lal Kitab chart." },
      { status: 500 }
    );
  }
}

