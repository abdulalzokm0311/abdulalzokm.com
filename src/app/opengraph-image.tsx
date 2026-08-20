import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social share card, generated rather than maintained as a file.
 * Uses system fonts on purpose: loading Instrument Serif here would mean
 * fetching a font binary on every build for a 1200x630 image.
 *
 * TODO (optional): if you want this art directed, delete this file and drop a
 * real opengraph-image.jpg into src/app/ instead.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf7f2",
          color: "#141312",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#8a8378",
          }}
        >
          <span>{site.role}</span>
          <span>{site.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 148,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Abdul</span>
            <span>Alzokm</span>
          </div>
          <div
            style={{
              height: 6,
              width: 180,
              backgroundColor: "#9a4a2f",
              marginTop: 40,
            }}
          />
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#4a453e" }}>
          Blending creativity and strategy to design products people love.
        </div>
      </div>
    ),
    { ...size },
  );
}
