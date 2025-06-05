"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Copy, ArrowRight, CheckCircle2, Globe, FileText, Clock, AlertCircle, LinkIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"

// Define types for API responses
interface ShortenResponse {
  success: boolean
  shortId?: string
  shortUrl?: string
  error?: string
  expiresAt?: string
}

export default function Home() {
  const { t, toggleLanguage, language, setLanguage } = useLanguage()
  const [url, setUrl] = useState("")
  const [shortenedUrl, setShortenedUrl] = useState("")
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showExpiryInfo, setShowExpiryInfo] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // Set language based on URL path
  useEffect(() => {
    if (pathname?.startsWith("/vi")) {
      setLanguage("vi")
    } else {
      setLanguage("en")
    }
  }, [pathname, setLanguage])

  // Check if terms were previously accepted, but only after component mounts
  useEffect(() => {
    setMounted(true)
    try {
      const accepted = localStorage.getItem("termsAccepted") === "true"
      setTermsAccepted(accepted)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check if terms are accepted
    if (!termsAccepted) {
      setError(t("pleaseAcceptTerms"))
      return
    }

    // Basic URL validation
    if (!url) {
      setError(t("pleaseEnterUrl"))
      return
    }

    try {
      // Validate URL format
      new URL(url)
    } catch (err) {
      setError(t("pleaseEnterValidUrl"))
      return
    }

    setIsLoading(true)

    try {
      // Call the API endpoint
      const response = await fetch("http://localhost:8080/v1/short-url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      // Handle HTTP errors
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API error: ${response.status} - ${errorText || response.statusText}`)
      }

      const data: ShortenResponse = await response.json()

      if (!data.success) {
        setError(data.error || t("failedToShortenUrl"))
        setIsLoading(false)
        return
      }

      setShortenedUrl(data.shortUrl || "")
      if (data.expiresAt) {
        setExpiresAt(data.expiresAt)
      }
    } catch (err) {
      console.error("API error:", err)
      // Show the actual error to the user
      setError(err instanceof Error ? err.message : t("connectionError"))
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Calculate days remaining if we have an expiration date
  const getDaysRemaining = () => {
    if (!expiresAt) return 7 // Default to 7 days if no expiration date

    const now = new Date()
    const expiry = new Date(expiresAt)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? diffDays : 0
  }

  // Handle tooltip visibility
  const toggleExpiryInfo = () => {
    setShowExpiryInfo(!showExpiryInfo)
  }

  // Handle hover for expiry info on desktop
  const handleExpiryMouseEnter = () => {
    if (isMobile) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setShowExpiryInfo(true)
  }

  const handleExpiryMouseLeave = () => {
    if (isMobile) return
    timerRef.current = setTimeout(() => {
      setShowExpiryInfo(false)
    }, 300)
  }

  // Get the correct terms page URL based on language
  const getTermsUrl = () => {
    return language === "en" ? "/terms" : "/vi/terms"
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
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

      <div className="relative z-10 w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{t("urlShortener")}</h1>
          <p className="text-white/80">{t("transformUrls")}</p>

          {/* Expiration note with animation - works on both mobile and desktop */}
          <div
            className="mt-3 relative"
            onMouseEnter={handleExpiryMouseEnter}
            onMouseLeave={handleExpiryMouseLeave}
            onClick={isMobile ? toggleExpiryInfo : undefined}
          >
            <div className="bg-white/20 rounded-lg border border-white/30 p-2 flex items-center justify-center cursor-pointer">
              <Clock className="h-5 w-5 mr-2 text-white animate-spin-slow" />
              <span className="text-white/90 text-sm font-medium">{t("firstVersionNoteShort")}</span>
            </div>

            {/* Enhanced tooltip that works on mobile and stands out more */}
            {showExpiryInfo && (
              <div
                className={cn(
                  "absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-md",
                  "rounded-lg p-4 border-2 border-white/60 text-white text-sm z-30 shadow-glow",
                  "transition-all duration-300 transform scale-in-center",
                )}
                role="tooltip"
                aria-label={t("firstVersionNote")}
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/40 rotate-45 border-t border-l border-white/60"></div>

                {/* Close button for mobile */}
                {isMobile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowExpiryInfo(false)
                    }}
                    className="absolute top-1 right-1 p-1 bg-white/30 rounded-full hover:bg-white/40 transition-colors"
                    aria-label="Close tooltip"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                <div className="flex items-center mb-1">
                  <Clock className="h-5 w-5 mr-2 text-white" />
                  <span className="font-bold">{t("expirationInfo")}</span>
                </div>
                <p>{t("firstVersionNote")}</p>

                {/* Visual indicator for 7 days */}
                <div className="mt-2 bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-yellow-400 h-full w-full animate-progress"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>{t("today")}</span>
                  <span>{t("day7")}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("pasteLongUrl")}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={cn(
                  "bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12 pr-4 transition-all duration-200",
                  "focus:ring-2 focus:ring-white/50 focus:border-transparent",
                  error ? "border-red-400 focus:ring-red-400/50" : "",
                )}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                <LinkIcon className="h-4 w-4" />
              </div>
            </div>
            {error && (
              <div className="flex items-center text-red-300 text-sm">
                <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className={cn(
              "w-full h-12 bg-white text-purple-700 hover:bg-white/90 transition-all duration-200",
              "font-medium rounded-lg flex items-center justify-center gap-2",
              "hover:scale-[1.02] active:scale-[0.98]",
              isLoading && "opacity-80",
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 rounded-full border-2 border-purple-700/20 border-t-purple-700 animate-spin" />
                <span>{t("shortening")}</span>
              </>
            ) : (
              <>
                <span>{t("shortenUrl")}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {shortenedUrl && (
          <div className="mt-6 bg-white/20 rounded-lg p-4 border border-white/30 animate-fade-in">
            <p className="text-white text-sm mb-2">{t("yourShortenedUrl")}:</p>
            <div className="flex items-center">
              <div className="bg-white/30 rounded-l-lg py-2.5 px-4 flex-1 truncate text-white">{shortenedUrl}</div>
              <button
                onClick={copyToClipboard}
                className="bg-white/20 hover:bg-white/30 transition-colors rounded-r-lg p-2.5 text-white"
                aria-label={t("copyToClipboard")}
              >
                {copied ? (
                  <CheckCircle2 className="h-5 w-5 text-green-300 animate-success" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Expiration info with animation */}
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 text-white/70 mr-1 animate-pulse-subtle" />
              <p className="text-white/70 text-xs italic">{t("linkWillExpire", { days: getDaysRemaining() })}</p>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href={getTermsUrl()}
            className="inline-flex items-center text-white/80 hover:text-white text-sm transition-colors"
          >
            <FileText className="h-4 w-4 mr-1" />
            {mounted && termsAccepted ? t("viewTerms") : t("readAndAcceptTerms")}
          </Link>
          {mounted && !termsAccepted && (
            <p className="text-amber-300 text-xs mt-1 animate-pulse-subtle">{t("termsRequiredNotice")}</p>
          )}
        </div>
      </div>

      <footer className="relative z-10 mt-8 text-white/70 text-sm">{t("footer")}</footer>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        @keyframes pulse-subtle {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
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
        
        @keyframes success {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        .animate-success {
          animation: success 0.5s ease-out;
        }
        
        @keyframes scale-in-center {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .scale-in-center {
          animation: scale-in-center 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
        
        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </main>
  )
}
