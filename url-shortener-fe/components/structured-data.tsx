// This is now a server component
export default function StructuredData({ language, isHomePage }: { language: "en" | "vi"; isHomePage: boolean }) {
  const baseUrl = "https://shorturl.vn"

  // Always use the same URL regardless of language
  const currentUrl = baseUrl

  // Create structured data based on the current page
  const structuredData = isHomePage
    ? {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: language === "en" ? "URL Shortener" : "Rút Gọn URL",
        url: currentUrl,
        description:
          language === "en"
            ? "Transform your long URLs into short, easy-to-share links. Free URL shortener with 7-day link expiration."
            : "Chuyển đổi URL dài của bạn thành liên kết ngắn, dễ chia sẻ. Dịch vụ rút gọn URL miễn phí với thời hạn liên kết 7 ngày.",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: language === "en" ? "URL Shortener Team" : "Đội ngũ Rút Gọn URL",
          url: baseUrl,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: language === "en" ? "Terms and Conditions" : "Điều Khoản và Điều Kiện",
        url: `${currentUrl}/terms`,
        description:
          language === "en"
            ? "Terms and Conditions for using the URL Shortener service"
            : "Điều Khoản và Điều Kiện sử dụng dịch vụ Rút Gọn URL",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: language === "en" ? "Home" : "Trang chủ",
              item: currentUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: language === "en" ? "Terms and Conditions" : "Điều Khoản và Điều Kiện",
              item: `${currentUrl}/terms`,
            },
          ],
        },
      }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
