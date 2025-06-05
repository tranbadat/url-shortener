"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

export function LanguageInitializer({ language }: { language: "en" | "vi" }) {
  const { setLanguage } = useLanguage()

  // Set language when component mounts
  useEffect(() => {
    console.log(`[DEBUG] LanguageInitializer: Setting language to ${language}`)
    setLanguage(language)
  }, [language, setLanguage])

  // This component doesn't render anything
  return null
}
