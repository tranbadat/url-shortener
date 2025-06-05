import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({ subsets: ["latin"] })

// Define metadata for both languages
export const metadataByLanguage: Record<string, Metadata> = {
  en: {
    title: "URL Shortener - Create Short Links Instantly",
    description:
      "Transform your long URLs into short, easy-to-share links. Free URL shortener with 7-day link expiration.",
    keywords: ["URL shortener", "link shortener", "short URL", "URL redirect", "free URL shortener"],
    authors: [{ name: "URL Shortener Team" }],
    creator: "URL Shortener",
    publisher: "URL Shortener",
    openGraph: {
      type: "website",
      title: "URL Shortener - Create Short Links Instantly",
      description:
        "Transform your long URLs into short, easy-to-share links. Free URL shortener with 7-day link expiration.",
      siteName: "URL Shortener",
      images: [
        {
          url: "/og-image-en.png",
          width: 1200,
          height: 630,
          alt: "URL Shortener - Create Short Links Instantly",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "URL Shortener - Create Short Links Instantly",
      description:
        "Transform your long URLs into short, easy-to-share links. Free URL shortener with 7-day link expiration.",
      images: ["/og-image-en.png"],
    },
    alternates: {
      languages: {
        vi: "/",
        "x-default": "/",
      },
    },
  },
  vi: {
    title: "Rút Gọn URL - Tạo Liên Kết Ngắn Ngay Lập Tức",
    description:
      "Chuyển đổi URL dài của bạn thành liên kết ngắn, dễ chia sẻ. Dịch vụ rút gọn URL miễn phí với thời hạn liên kết 7 ngày.",
    keywords: ["Rút gọn URL", "rút gọn liên kết", "URL ngắn", "chuyển hướng URL", "rút gọn URL miễn phí"],
    authors: [{ name: "Đội ngũ Rút Gọn URL" }],
    creator: "Rút Gọn URL",
    publisher: "Rút Gọn URL",
    openGraph: {
      type: "website",
      title: "Rút Gọn URL - Tạo Liên Kết Ngắn Ngay Lập Tức",
      description:
        "Chuyển đổi URL dài của bạn thành liên kết ngắn, dễ chia sẻ. Dịch vụ rút gọn URL miễn phí với thời hạn liên kết 7 ngày.",
      siteName: "Rút Gọn URL",
      images: [
        {
          url: "/og-image-vi.png",
          width: 1200,
          height: 630,
          alt: "Rút Gọn URL - Tạo Liên Kết Ngắn Ngay Lập Tức",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rút Gọn URL - Tạo Liên Kết Ngắn Ngay Lập Tức",
      description:
        "Chuyển đổi URL dài của bạn thành liên kết ngắn, dễ chia sẻ. Dịch vụ rút gọn URL miễn phí với thời hạn liên kết 7 ngày.",
      images: ["/og-image-vi.png"],
    },
    alternates: {
      languages: {
        en: "/",
        "x-default": "/",
      },
    },
  },
}

// Default to English metadata
export const defaultMetadata: Metadata = metadataByLanguage.en

// Export the metadata for Next.js
export const metadata: Metadata = defaultMetadata

// Define viewport settings
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#6d28d9" },
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
  ],
}

// Make sure the LanguageProvider is properly set up in the root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log("[DEBUG] RootLayout: Rendering root layout")
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme={undefined}
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
