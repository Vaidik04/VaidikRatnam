import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Vaidik Ratnam";
    const subtitle =
      searchParams.get("subtitle") ||
      "Traditional Indian Gold Jewellery & Genuine Astrological Gemstone Shop";
    const purity = searchParams.get("purity") || "100% BIS Hallmarked 22K (916) • 6-Digit HUID";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#04170F",
            padding: "60px 80px",
            fontFamily: "serif",
            border: "8px solid #D4AF37",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              borderBottom: "1px solid rgba(212, 175, 55, 0.4)",
              paddingBottom: "30px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#D4AF37",
                  fontSize: 32,
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                VAIDIK RATNAM
              </span>
              <span
                style={{
                  color: "#F3E5AB",
                  fontSize: 14,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "sans-serif",
                }}
              >
                Jewellery &bull; Gemstones &bull; Astrology
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                border: "1px solid #D4AF37",
                padding: "8px 20px",
                borderRadius: "4px",
                color: "#F3E5AB",
                fontSize: 16,
                fontFamily: "sans-serif",
                fontWeight: 600,
              }}
            >
              EST. 3 GENERATIONS
            </div>
          </div>

          {/* Center Main Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                color: "#F9F5EB",
                fontSize: 54,
                lineHeight: 1.15,
                fontWeight: 600,
                maxWidth: "1000px",
              }}
            >
              {title}
            </div>

            <div
              style={{
                color: "#DDE5DC",
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1.4,
                maxWidth: "900px",
                fontFamily: "sans-serif",
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer Hallmark & Weighing Guarantee */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: "rgba(15, 61, 46, 0.8)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              padding: "20px 30px",
              borderRadius: "4px",
              fontFamily: "sans-serif",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", color: "#F3E5AB", fontSize: 18, fontWeight: 600 }}>
              {purity}
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "#DDE5DC", fontSize: 16 }}>
              Weigh Gold In Front of You on Digital Scales
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error("OG generation error:", e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
