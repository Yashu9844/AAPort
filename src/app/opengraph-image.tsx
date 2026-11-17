import { ImageResponse } from "next/og";

export const alt = "Yashavanth R Siddesh — Software Engineer & Team Lead";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background: "#000",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, letterSpacing: 6, color: "rgba(255,255,255,0.6)" }}>
          <div style={{ width: 64, height: 2, background: "rgba(255,255,255,0.6)" }} />
          SOFTWARE ENGINEER · TEAM LEAD · BENGALURU
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>YASHAVANTH</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>R SIDDESH</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.8)" }}>
          Satellite telemetry for 70+ satellites @ FalconX · Agentic AI systems
        </div>
      </div>
    ),
    size,
  );
}
