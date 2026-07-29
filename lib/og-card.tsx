import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
 * The one social card used by every route's opengraph-image. Rendered at build
 * time, so link previews stay in the DC34 palette without shipping a static
 * PNG per page. No custom font is loaded — ImageResponse's built-in face keeps
 * these routes cheap, and the card is type-light by design.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const NAVY = "#0d294a";
const NAVY_DEEP = "#071829";
const TEAL_BRIGHT = "#3fb3d6";
const MINT = "#6ccdb8";
const FOG = "#d4dbe3";
const MIST = "#94a7ba";

let logoCache: string | undefined;

/** Inlined as a data URI: ImageResponse can't fetch relative asset URLs. */
async function logoDataUri(): Promise<string> {
  if (!logoCache) {
    const file = await readFile(join(process.cwd(), "public/btv-logo.png"));
    logoCache = `data:image/png;base64,${file.toString("base64")}`;
  }
  return logoCache;
}

export async function renderOgCard({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  const logo = await logoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
          borderBottom: `12px solid ${TEAL_BRIGHT}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: MINT,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: title.length > 42 ? 68 : 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#ffffff",
            }}
          >
            {title}
          </div>
          {sub && (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 32,
                lineHeight: 1.35,
                color: MIST,
              }}
            >
              {sub.length > 120 ? `${sub.slice(0, 117)}…` : sub}
            </div>
          )}
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              paddingTop: 40,
              fontSize: 26,
              letterSpacing: 2,
              color: FOG,
            }}
          >
            blueteamvillage.org
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders its own raster, next/image doesn't apply */}
        <img src={logo} alt="" width={300} height={341} />
      </div>
    ),
    OG_SIZE,
  );
}
