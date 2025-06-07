import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "URL Shortener - Create Short Links Instantly"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom right, #6366f1, #a855f7, #ec4899)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "72px", fontWeight: "bold", marginBottom: "20px" }}>URL Shortener</div>
      <div style={{ fontSize: "36px", opacity: 0.9, maxWidth: "80%" }}>
        Transform your long URLs into short, easy-to-share links
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}
