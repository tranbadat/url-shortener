"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Globe, Check, Info, Shield, Clock, AlertTriangle, HelpCircle, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export default function TermsAndConditionsClient() {
  const { t, toggleLanguage, language } = useLanguage()
  const [accepted, setAccepted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Only run client-side code after mounting
  useEffect(() => {
    setMounted(true)
    try {
      const termsAccepted = localStorage.getItem("termsAccepted") === "true"
      setAccepted(termsAccepted)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Save acceptance to localStorage
  const handleAcceptTerms = () => {
    setAccepted(true)
    try {
      localStorage.setItem("termsAccepted", "true")
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90"
        style={{
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
      />

      {/* Language switcher */}
      <button
        onClick={toggleLanguage}
        className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
        aria-label={t("switchLanguage")}
      >
        <Globe className="h-5 w-5" />
        <span className="sr-only">{t("switchLanguage")}</span>
        <span className="absolute top-0 right-0 bg-white text-purple-700 rounded-full text-xs font-bold h-5 w-5 flex items-center justify-center">
          {language === "en" ? "VI" : "EN"}
        </span>
      </button>

      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 border border-white/20 my-8">
        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="mr-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            aria-label={t("backToHome")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{t("termsAndConditions")}</h1>
        </div>

        <div className="space-y-4">
          {/* Introduction */}
          <div
            className={cn(
              "bg-white/20 rounded-lg border border-white/30 overflow-hidden transition-all duration-300",
              expandedSection === "intro" ? "max-h-96" : "max-h-16",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("intro")}>
              <Info
                className={cn(
                  "h-6 w-6 mr-3 text-white transition-transform duration-300",
                  expandedSection === "intro" ? "rotate-180" : "",
                )}
              />
              <h2 className="text-xl font-bold text-white">{t("termsIntroTitle")}</h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 text-white/90 transition-opacity duration-300",
                expandedSection === "intro" ? "opacity-100" : "opacity-0",
              )}
            >
              <p>{t("termsIntroText")}</p>
            </div>
          </div>

          {/* Data Storage */}
          <div
            className={cn(
              "bg-white/20 rounded-lg border border-white/30 overflow-hidden transition-all duration-300",
              expandedSection === "storage" ? "max-h-96" : "max-h-16",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("storage")}>
              <Shield
                className={cn(
                  "h-6 w-6 mr-3 text-white transition-transform duration-300",
                  expandedSection === "storage" ? "rotate-180" : "",
                )}
              />
              <h2 className="text-xl font-bold text-white">{t("dataStorageTitle")}</h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 text-white/90 transition-opacity duration-300",
                expandedSection === "storage" ? "opacity-100" : "opacity-0",
              )}
            >
              <p className="mb-2">{t("dataStorageText1")}</p>
              <ul className="list-disc pl-6 space-y-1 mb-2">
                <li>{t("dataStorageItem1")}</li>
                <li>{t("dataStorageItem2")}</li>
                <li>{t("dataStorageItem3")}</li>
                <li>{t("dataStorageItem4")}</li>
              </ul>
            </div>
          </div>

          {/* Data Retention - Always expanded and highlighted */}
          <div className="bg-white/30 rounded-lg border-2 border-white/50 p-4 animate-pulse-subtle">
            <div className="flex items-center">
              <Clock className="h-6 w-6 mr-3 text-white animate-spin-slow" />
              <h2 className="text-xl font-bold text-white">{t("dataRetentionTitle")}</h2>
            </div>
            <div className="mt-2 bg-white/20 p-3 rounded-lg border border-white/30">
              <p className="text-white font-medium">{t("dataRetentionHighlight")}</p>
            </div>
          </div>

          {/* User Responsibility */}
          <div
            className={cn(
              "bg-white/20 rounded-lg border border-white/30 overflow-hidden transition-all duration-300",
              expandedSection === "responsibility" ? "max-h-96" : "max-h-16",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("responsibility")}>
              <AlertTriangle
                className={cn(
                  "h-6 w-6 mr-3 text-white transition-transform duration-300",
                  expandedSection === "responsibility" ? "rotate-180" : "",
                )}
              />
              <h2 className="text-xl font-bold text-white">{t("userResponsibilityTitle")}</h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 text-white/90 transition-opacity duration-300",
                expandedSection === "responsibility" ? "opacity-100" : "opacity-0",
              )}
            >
              <p className="mb-2">{t("userResponsibilityText")}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t("userResponsibilityItem1")}</li>
                <li>{t("userResponsibilityItem2")}</li>
                <li>{t("userResponsibilityItem3")}</li>
              </ul>
            </div>
          </div>

          {/* Limitations */}
          <div
            className={cn(
              "bg-white/20 rounded-lg border border-white/30 overflow-hidden transition-all duration-300",
              expandedSection === "limitations" ? "max-h-96" : "max-h-16",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("limitations")}>
              <HelpCircle
                className={cn(
                  "h-6 w-6 mr-3 text-white transition-transform duration-300",
                  expandedSection === "limitations" ? "rotate-180" : "",
                )}
              />
              <h2 className="text-xl font-bold text-white">{t("limitationsTitle")}</h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 text-white/90 transition-opacity duration-300",
                expandedSection === "limitations" ? "opacity-100" : "opacity-0",
              )}
            >
              <p>{t("limitationsText")}</p>
            </div>
          </div>

          {/* Contact */}
          <div
            className={cn(
              "bg-white/20 rounded-lg border border-white/30 overflow-hidden transition-all duration-300",
              expandedSection === "contact" ? "max-h-96" : "max-h-16",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("contact")}>
              <Mail
                className={cn(
                  "h-6 w-6 mr-3 text-white transition-transform duration-300",
                  expandedSection === "contact" ? "rotate-180" : "",
                )}
              />
              <h2 className="text-xl font-bold text-white">{t("contactTitle")}</h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 text-white/90 transition-opacity duration-300",
                expandedSection === "contact" ? "opacity-100" : "opacity-0",
              )}
            >
              <p>{t("contactText")}</p>
            </div>
          </div>

          {/* Agreement */}
          <div className="bg-white/20 p-4 rounded-lg border border-white/30 mt-6">
            <div className="flex items-start space-x-3">
              <div
                onClick={() => mounted && handleAcceptTerms()}
                className={cn(
                  "w-5 h-5 rounded-sm border border-white/50 flex items-center justify-center cursor-pointer transition-all duration-300",
                  accepted ? "bg-green-500 border-green-500 scale-110" : "bg-white/20 hover:bg-white/30",
                )}
              >
                {accepted && <Check className="h-3.5 w-3.5 text-white" />}
              </div>
              <label onClick={() => mounted && handleAcceptTerms()} className="text-white cursor-pointer">
                {t("termsAgreement")}
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Link href="/">
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                {t("backToHome")}
              </Button>
            </Link>

            <Button
              onClick={handleAcceptTerms}
              disabled={accepted}
              className={cn(
                "bg-white text-purple-700 hover:bg-white/90 transition-all duration-300",
                accepted ? "bg-green-500 hover:bg-green-500 text-white" : "hover:scale-105",
              )}
            >
              {accepted ? (
                <span className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  {t("termsAccepted")}
                </span>
              ) : (
                t("acceptTerms")
              )}
            </Button>
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-4 mb-8 text-white/70 text-sm text-center">{t("footer")}</footer>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-subtle {
          0% { opacity: 0.9; }
          50% { opacity: 1; }
          100% { opacity: 0.9; }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </main>
  )
}
