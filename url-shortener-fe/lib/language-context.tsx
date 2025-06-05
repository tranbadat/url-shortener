"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define available languages
type Language = "en" | "vi"

// Define translation dictionary type
type TranslationDict = {
  [key: string]: string | ((params: any) => string)
}

// Define translations
const translations: Record<Language, TranslationDict> = {
  en: {
    // Home page translations
    urlShortener: "URL Shortener",
    transformUrls: "Transform your long URLs into short links",
    note: "Note",
    firstVersionNote: "This is the first version. All shortened URLs expire after 7 days.",
    firstVersionNoteShort: "URLs expire in 7 days",
    expirationInfo: "Expiration Information",
    today: "Today",
    day7: "Day 7",
    pasteLongUrl: "Paste your long URL here...",
    pleaseEnterUrl: "Please enter a URL",
    pleaseEnterValidUrl: "Please enter a valid URL",
    failedToShortenUrl: "Failed to shorten URL. Please try again.",
    connectionError: "Failed to connect to the server. Please try again later.",
    shortenUrl: "Shorten URL",
    shortening: "Shortening...",
    yourShortenedUrl: "Your shortened URL",
    copyToClipboard: "Copy to clipboard",
    linkWillExpire: ({ days }: { days: number }) => `Expires in ${days} days`,
    footer: "Made with ❤️ by dattb.com",
    switchLanguage: "Switch language",

    // Terms related translations
    termsAndConditions: "Terms and Conditions",
    backToHome: "Back to Home",
    termsLastUpdated: "Last Updated",
    termsLastUpdatedDate: "April 16, 2024",
    termsIntroTitle: "Introduction",
    termsIntroText:
      "Welcome to URL Shortener. By using our service, you agree to these Terms and Conditions, which outline how we handle your data and the URLs you submit.",

    dataStorageTitle: "Data Storage",
    dataStorageText1: "When you use our URL shortening service, we collect and store the following information:",
    dataStorageItem1: "The original URL you submit for shortening",
    dataStorageItem2: "The shortened URL we generate",
    dataStorageItem3: "Creation timestamp",
    dataStorageItem4: "IP address and basic browser information for security purposes",
    dataStorageText2: "This information is necessary to provide our service and ensure its proper functioning.",

    dataRetentionTitle: "Data Retention",
    dataRetentionText:
      "As mentioned on our homepage, this is the first version of our service with limited functionality:",
    dataRetentionHighlight:
      "All shortened URLs and associated data will be automatically deleted after 7 days from creation.",

    userResponsibilityTitle: "User Responsibility",
    userResponsibilityText: "By using our service, you agree to the following:",
    userResponsibilityItem1:
      "You will not use our service to shorten URLs that lead to illegal, harmful, or inappropriate content",
    userResponsibilityItem2: "You understand that we may monitor shortened URLs to prevent abuse",
    userResponsibilityItem3: "You acknowledge that we may disable any shortened URL that violates these terms",

    limitationsTitle: "Service Limitations",
    limitationsText:
      "Our service is provided on an 'as is' basis. We do not guarantee 100% uptime or availability of shortened URLs. The 7-day expiration period is strictly enforced in this version.",

    contactTitle: "Contact Information",
    contactText:
      "If you have any questions about these Terms and Conditions or our data practices, please contact us at support@shorturl.tranbadat.vn.",

    termsAgreement:
      "I have read and agree to the Terms and Conditions, including the storage of my submitted URLs and associated data for the purpose of providing this service.",
    acceptTerms: "Accept Terms",
    termsAccepted: "Terms Accepted",

    // Terms link on home page
    viewTerms: "View Terms and Conditions",
    readAndAcceptTerms: "Read and Accept Terms",
    termsRequiredNotice: "You must accept Terms to use this service",
    pleaseAcceptTerms: "Please accept Terms before shortening URLs",
  },
  vi: {
    // Home page translations
    urlShortener: "Rút Gọn URL",
    transformUrls: "Chuyển đổi URL dài thành liên kết ngắn",
    note: "Lưu ý",
    firstVersionNote: "Đây là phiên bản đầu tiên. URL rút gọn sẽ hết hạn sau 7 ngày.",
    firstVersionNoteShort: "URL hết hạn sau 7 ngày",
    expirationInfo: "Thông Tin Hết Hạn",
    today: "Hôm nay",
    day7: "Ngày 7",
    pasteLongUrl: "Dán URL dài của bạn vào đây...",
    pleaseEnterUrl: "Vui lòng nhập URL",
    pleaseEnterValidUrl: "Vui lòng nhập URL hợp lệ",
    failedToShortenUrl: "Không thể rút gọn URL. Vui lòng thử lại.",
    connectionError: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
    shortenUrl: "Rút Gọn URL",
    shortening: "Đang rút gọn...",
    yourShortenedUrl: "URL rút gọn của bạn",
    copyToClipboard: "Sao chép vào clipboard",
    linkWillExpire: ({ days }: { days: number }) => `Hết hạn sau ${days} ngày`,
    footer: "Được tạo với ❤️ bởi dattb.com",
    switchLanguage: "Đổi ngôn ngữ",

    // Terms related translations
    termsAndConditions: "Điều Khoản và Điều Kiện",
    backToHome: "Quay Lại Trang Chủ",
    termsLastUpdated: "Cập Nhật Lần Cuối",
    termsLastUpdatedDate: "16 Tháng 4, 2024",
    termsIntroTitle: "Giới Thiệu",
    termsIntroText:
      "Chào mừng đến với Rút Gọn URL. Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý với các Điều Khoản và Điều Kiện này, trong đó nêu rõ cách chúng tôi xử lý dữ liệu của bạn và các URL bạn gửi.",

    dataStorageTitle: "Lưu Trữ Dữ Liệu",
    dataStorageText1:
      "Khi bạn sử dụng dịch vụ rút gọn URL của chúng tôi, chúng tôi thu thập và lưu trữ các thông tin sau:",
    dataStorageItem1: "URL gốc bạn gửi để rút gọn",
    dataStorageItem2: "URL rút gọn chúng tôi tạo ra",
    dataStorageItem3: "Thời gian tạo",
    dataStorageItem4: "Địa chỉ IP và thông tin cơ bản về trình duyệt cho mục đích bảo mật",
    dataStorageText2:
      "Những thông tin này là cần thiết để cung cấp dịch vụ của chúng tôi và đảm bảo hoạt động đúng cách.",

    dataRetentionTitle: "Thời Gian Lưu Trữ",
    dataRetentionText:
      "Như đã đề cập trên trang chủ của chúng tôi, đây là phiên bản đầu tiên của dịch vụ với chức năng hạn chế:",
    dataRetentionHighlight: "Tất cả các URL rút gọn và dữ liệu liên quan sẽ tự động bị xóa sau 7 ngày kể từ khi tạo.",

    userResponsibilityTitle: "Trách Nhiệm của Người Dùng",
    userResponsibilityText: "Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý với những điều sau:",
    userResponsibilityItem1:
      "Bạn sẽ không sử dụng dịch vụ của chúng tôi để rút gọn các URL dẫn đến nội dung bất hợp pháp, có hại hoặc không phù hợp",
    userResponsibilityItem2: "Bạn hiểu rằng chúng tôi có thể giám sát các URL rút gọn để ngăn chặn lạm dụng",
    userResponsibilityItem3:
      "Bạn thừa nhận rằng chúng tôi có thể vô hiệu hóa bất kỳ URL rút gọn nào vi phạm các điều khoản này",

    limitationsTitle: "Giới Hạn Dịch Vụ",
    limitationsText:
      "Dịch vụ của chúng tôi được cung cấp trên cơ sở 'nguyên trạng'. Chúng tôi không đảm bảo thời gian hoạt động 100% hoặc tính khả dụng của các URL rút gọn. Thời hạn 7 ngày được áp dụng nghiêm ngặt trong phiên bản này.",

    contactTitle: "Thông Tin Liên Hệ",
    contactText:
      "Nếu bạn có bất kỳ câu hỏi nào về các Điều Khoản và Điều Kiện này hoặc cách thức xử lý dữ liệu của chúng tôi, vui lòng liên hệ với chúng tôi tại support@shorturl.tranbadat.vn.",

    termsAgreement:
      "Tôi đã đọc và đồng ý với Điều Khoản và Điều Kiện, bao gồm việc lưu trữ các URL tôi gửi và dữ liệu liên quan nhằm mục đích cung cấp dịch vụ này.",
    acceptTerms: "Chấp Nhận Điều Khoản",
    termsAccepted: "Đã Chấp Nhận Điều Khoản",

    // Terms link on home page
    viewTerms: "Xem Điều Khoản",
    readAndAcceptTerms: "Đọc và Chấp Nhận Điều Khoản",
    termsRequiredNotice: "Bạn phải chấp nhận Điều Khoản để sử dụng dịch vụ này",
    pleaseAcceptTerms: "Vui lòng chấp nhận Điều Khoản trước khi rút gọn URL",
  },
}

// Create context
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string, params?: any) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => key,
})

// Create provider
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Try to get language from localStorage, default to English
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language preference on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedLanguage = localStorage.getItem("language") as Language
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "vi")) {
          setLanguage(savedLanguage)
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Save language preference when it changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("language", language)
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }, [language])

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "vi" : "en")
  }

  // Translation function
  const t = (key: string, params?: any): string => {
    const translation = translations[language][key]
    if (!translation) {
      return key
    }

    if (typeof translation === "function") {
      return translation(params)
    }

    return translation
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
