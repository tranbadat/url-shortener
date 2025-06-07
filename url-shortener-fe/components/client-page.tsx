"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Copy,
  ArrowRight,
  CheckCircle2,
  Globe,
  FileText,
  Clock,
  AlertCircle,
  LinkIcon,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import { TermsModal } from "@/components/terms-modal"
import { useTheme } from "next-themes"

// Define types for API responses
interface ShortenResponse {
  success: boolean
  shortId?: string
  shortUrl?: string
  error?: string
  expiresAt?: string
}

export default function ClientPage() {
  const { t, toggleLanguage, language } = useLanguage()
  const [url, setUrl] = useState("")
  const [shortenedUrl, setShortenedUrl] = useState("")
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showExpiryInfo, setShowExpiryInfo] = useState(false)
  const isMobile = useIsMobile()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const sunRef = useRef<Sun | null>(null)
  const cloudsRef = useRef<Cloud[]>([])
  const transitioningRef = useRef(false)
  const prevThemeRef = useRef<string | null>(null)

  // Star class for galaxy background
  class Star {
    x: number
    y: number
    size: number
    opacity: number
    speed: number
    twinkleSpeed: number
    twinkleDirection: number
    color: string
    isDayStar: boolean

    constructor(canvasWidth: number, canvasHeight: number, isDayStar = false) {
      this.x = Math.random() * canvasWidth
      this.y = Math.random() * canvasHeight
      this.size = isDayStar ? Math.random() * 1.5 + 0.5 : Math.random() * 2
      this.opacity = isDayStar ? Math.random() * 0.5 + 0.1 : Math.random() * 0.8 + 0.2
      this.speed = Math.random() * 0.05
      this.twinkleSpeed = Math.random() * 0.01
      this.twinkleDirection = Math.random() > 0.5 ? 1 : -1
      this.isDayStar = isDayStar

      // Create a variety of star colors
      const nightColors = [
        "rgba(255, 255, 255, ", // White
        "rgba(173, 216, 230, ", // Light blue
        "rgba(255, 223, 186, ", // Light orange
        "rgba(200, 200, 255, ", // Light purple
        "rgba(240, 240, 255, ", // Light blue-white
      ]

      const dayColors = [
        "rgba(255, 255, 255, ", // White
        "rgba(230, 230, 250, ", // Lavender
        "rgba(255, 218, 233, ", // Pastel pink
        "rgba(200, 220, 255, ", // Light sky blue
        "rgba(220, 208, 255, ", // Light purple
      ]

      this.color = isDayStar
        ? dayColors[Math.floor(Math.random() * dayColors.length)]
        : nightColors[Math.floor(Math.random() * nightColors.length)]
    }

    update() {
      // Make stars twinkle by changing opacity
      this.opacity += this.twinkleSpeed * this.twinkleDirection
      if (this.opacity > (this.isDayStar ? 0.6 : 0.9)) {
        this.twinkleDirection = -1
      } else if (this.opacity < (this.isDayStar ? 0.1 : 0.2)) {
        this.twinkleDirection = 1
      }

      // Slow movement from top to bottom
      this.y += this.speed
    }

    draw(ctx: CanvasRenderingContext2D, canvasHeight: number) {
      if (this.y > canvasHeight) {
        this.y = 0
      }

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `${this.color}${this.opacity})`
      ctx.fill()
    }
  }

  // Sun class for daytime universe
  class Sun {
    x: number
    y: number
    radius: number
    glowRadius: number
    phase: number
    visible: boolean

    constructor(canvasWidth: number, canvasHeight: number) {
      this.x = canvasWidth * 0.8
      this.y = canvasHeight * 0.2
      this.radius = Math.min(canvasWidth, canvasHeight) * 0.08
      this.glowRadius = this.radius * 2.5
      this.phase = 0
      this.visible = false
    }

    update(isDayMode: boolean, isTransitioning: boolean) {
      if (isTransitioning) {
        // During transition, gradually show/hide the sun
        this.phase += isDayMode ? 0.02 : -0.02
        this.phase = Math.max(0, Math.min(1, this.phase))
      } else {
        this.phase = isDayMode ? 1 : 0
      }

      this.visible = this.phase > 0
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return

      // Draw sun glow
      const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.5, this.x, this.y, this.glowRadius)
      gradient.addColorStop(0, `rgba(255, 236, 179, ${0.8 * this.phase})`)
      gradient.addColorStop(0.3, `rgba(255, 200, 150, ${0.5 * this.phase})`)
      gradient.addColorStop(0.7, `rgba(255, 180, 180, ${0.2 * this.phase})`)
      gradient.addColorStop(1, `rgba(255, 180, 220, 0)`)

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.glowRadius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw sun
      const sunGradient = ctx.createRadialGradient(
        this.x - this.radius * 0.3,
        this.y - this.radius * 0.3,
        0,
        this.x,
        this.y,
        this.radius,
      )
      sunGradient.addColorStop(0, `rgba(255, 255, 220, ${this.phase})`)
      sunGradient.addColorStop(0.7, `rgba(255, 200, 100, ${this.phase})`)
      sunGradient.addColorStop(1, `rgba(255, 150, 80, ${this.phase})`)

      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = sunGradient
      ctx.fill()
    }
  }

  // Cloud class for daytime universe
  class Cloud {
    x: number
    y: number
    width: number
    height: number
    speed: number
    opacity: number
    segments: { x: number; y: number; radius: number }[]
    visible: boolean

    constructor(canvasWidth: number, canvasHeight: number) {
      this.width = Math.random() * (canvasWidth * 0.2) + canvasWidth * 0.1
      this.height = this.width * (Math.random() * 0.3 + 0.3)
      this.x = Math.random() * (canvasWidth + this.width * 2) - this.width
      this.y = Math.random() * (canvasHeight * 0.5)
      this.speed = Math.random() * 0.2 + 0.1
      this.opacity = 0
      this.visible = false

      // Create cloud segments (circles that form the cloud shape)
      this.segments = []
      const segmentCount = Math.floor(this.width / 30) + 3

      for (let i = 0; i < segmentCount; i++) {
        const segX = (i / (segmentCount - 1)) * this.width
        const segY = Math.sin((i / (segmentCount - 1)) * Math.PI) * (this.height * 0.5)
        const radius = (Math.random() * 0.5 + 0.5) * this.height * 0.7

        this.segments.push({
          x: segX,
          y: segY,
          radius: radius,
        })
      }
    }

    update(isDayMode: boolean, isTransitioning: boolean) {
      // Move cloud
      this.x += this.speed

      // Reset position when off screen
      if (this.x > window.innerWidth + this.width) {
        this.x = -this.width
        this.y = Math.random() * (window.innerHeight * 0.5)
      }

      // Update opacity based on mode
      if (isTransitioning) {
        this.opacity += isDayMode ? 0.01 : -0.01
        this.opacity = Math.max(0, Math.min(0.9, this.opacity))
      } else {
        this.opacity = isDayMode ? 0.9 : 0
      }

      this.visible = this.opacity > 0
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return

      ctx.save()
      ctx.translate(this.x, this.y)

      // Draw cloud segments
      for (const segment of this.segments) {
        ctx.beginPath()
        ctx.arc(segment.x, segment.y, segment.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }

      ctx.restore()
    }
  }

  // Initialize universe background
  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Create stars if not already created
      if (starsRef.current.length === 0) {
        // Night stars
        const nightStarCount = Math.min(window.innerWidth, window.innerHeight) * 0.3
        starsRef.current = Array.from({ length: nightStarCount }, () => new Star(canvas.width, canvas.height))

        // Day stars (fewer and more subtle)
        const dayStarCount = Math.min(window.innerWidth, window.innerHeight) * 0.15
        for (let i = 0; i < dayStarCount; i++) {
          starsRef.current.push(new Star(canvas.width, canvas.height, true))
        }
      }

      // Create sun
      if (!sunRef.current) {
        sunRef.current = new Sun(canvas.width, canvas.height)
      }

      // Create clouds
      if (cloudsRef.current.length === 0) {
        const cloudCount = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.01) + 3
        cloudsRef.current = Array.from({ length: cloudCount }, () => new Cloud(canvas.width, canvas.height))
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation loop
    let animationId: number
    const animate = () => {
      const isDayMode = theme === "light"
      const isTransitioning = transitioningRef.current

      // Create gradient background based on theme
      let gradient
      if (isDayMode) {
        // Day gradient: light blue to pastel colors
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(135, 206, 250, 1)") // Sky blue
        gradient.addColorStop(0.5, "rgba(200, 220, 255, 1)") // Light blue
        gradient.addColorStop(1, "rgba(230, 230, 250, 1)") // Lavender
      } else {
        // Night gradient: deep blue to purple
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(20, 24, 82, 1)") // Deep blue
        gradient.addColorStop(0.5, "rgba(48, 25, 82, 1)") // Deep purple
        gradient.addColorStop(1, "rgba(25, 22, 84, 1)") // Deep blue-purple
      }

      // Clear canvas and draw background
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw sun
      if (sunRef.current) {
        sunRef.current.update(isDayMode, isTransitioning)
        sunRef.current.draw(ctx)
      }

      // Update and draw clouds
      cloudsRef.current.forEach((cloud) => {
        cloud.update(isDayMode, isTransitioning)
        cloud.draw(ctx)
      })

      // Draw stars based on theme
      starsRef.current.forEach((star) => {
        // Only show day stars in day mode and night stars in night mode
        // During transition, show both with adjusted opacity
        if ((isDayMode && star.isDayStar) || (!isDayMode && !star.isDayStar) || isTransitioning) {
          star.update()
          star.draw(ctx, canvas.height)
        }
      })

      // If we're transitioning and it's been long enough, end the transition
      if (isTransitioning && prevThemeRef.current !== theme) {
        setTimeout(() => {
          transitioningRef.current = false
          prevThemeRef.current = theme
        }, 1500)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [mounted, theme])

  // Handle theme change transitions
  useEffect(() => {
    if (!mounted) return

    // If theme changed, start transition
    if (prevThemeRef.current !== null && prevThemeRef.current !== theme) {
      transitioningRef.current = true
    }

    // Update previous theme
    prevThemeRef.current = theme
  }, [theme, mounted])

  // Check if terms were previously accepted, but only after component mounts
  useEffect(() => {
    setMounted(true)
    try {
      const accepted = localStorage.getItem("termsAccepted") === "true"
      setTermsAccepted(accepted)
    } catch (error) {
      console.error("[DEBUG] Error accessing localStorage:", error)
    }
  }, [])

  // Handle language toggle
  const handleLanguageToggle = () => {
    toggleLanguage()
  }

  // Handle terms acceptance
  const handleAcceptTerms = () => {
    setTermsAccepted(true)
    try {
      localStorage.setItem("termsAccepted", "true")
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check if terms are accepted
    if (!termsAccepted) {
      setError(t("pleaseAcceptTerms"))
      setTermsModalOpen(true)
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

  // Toggle expiry info dropdown
  const toggleExpiryInfo = () => {
    setShowExpiryInfo(!showExpiryInfo)
  }

  // Determine text color based on theme
  const getTextColor = () => {
    return theme === "light" ? "text-gray-800" : "text-white"
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
      data-theme={mounted ? theme || "unknown" : "not-mounted"}
    >
      {/* Universe background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 transition-colors duration-1000" />

      {/* Header controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Language switcher */}
        <Button
          onClick={handleLanguageToggle}
          variant="ghost"
          size="icon"
          className={cn(
            "backdrop-blur-sm transition-colors w-10 h-10 p-0 rounded-full",
            theme === "light"
              ? "bg-white/40 hover:bg-white/60 text-gray-800"
              : "bg-white/20 hover:bg-white/30 text-white",
          )}
          aria-label={t("switchLanguage")}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("switchLanguage")}</span>
          <span
            className={cn(
              "absolute top-0 right-0 rounded-full text-xs font-bold h-5 w-5 flex items-center justify-center",
              theme === "light" ? "bg-indigo-100 text-indigo-700" : "bg-white text-purple-700",
            )}
          >
            {language === "en" ? "VI" : "EN"}
          </span>
        </Button>
      </div>

      <div
        className={cn(
          "relative z-10 w-full max-w-xl mx-auto backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 border transition-all duration-500",
          theme === "light"
            ? "bg-white/30 border-indigo-200/50 shadow-indigo-200/20"
            : "bg-gray-900/30 border-indigo-500/20 shadow-purple-900/20",
        )}
      >
        <div className="text-center mb-6">
          <h1
            className={cn(
              "text-3xl font-bold mb-2 transition-colors duration-500",
              theme === "light" ? "text-gray-800" : "text-white",
            )}
          >
            {t("urlShortener")}
          </h1>
          <p className={cn("transition-colors duration-500", theme === "light" ? "text-gray-700" : "text-white/70")}>
            {t("transformUrls")}
          </p>

          {/* Expiration note with dropdown */}
          <div className="mt-3 relative">
            <div
              className={cn(
                "rounded-lg border p-2 flex items-center justify-between cursor-pointer transition-all duration-500",
                theme === "light"
                  ? "bg-indigo-100/50 border-indigo-200 text-indigo-800"
                  : "bg-gray-800/40 border-indigo-500/30 text-white",
              )}
              onClick={toggleExpiryInfo}
            >
              <div className="flex items-center">
                <Clock
                  className={cn("h-5 w-5 mr-2 animate-spin-slow", theme === "light" ? "text-indigo-600" : "text-white")}
                />
                <span className={cn("text-sm font-medium", theme === "light" ? "text-indigo-800" : "text-white/80")}>
                  {t("firstVersionNoteShort")}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  theme === "light" ? "text-indigo-600" : "text-white/80",
                  showExpiryInfo ? "transform rotate-180" : "",
                )}
              />
            </div>

            {/* Expiry info dropdown */}
            {showExpiryInfo && (
              <div
                className={cn(
                  "mt-2 rounded-lg border p-4 animate-fade-in transition-all duration-500",
                  theme === "light" ? "bg-white/50 border-indigo-200" : "bg-gray-800/40 border-indigo-500/30",
                )}
              >
                <div className="flex items-center mb-2">
                  <Clock className={cn("h-5 w-5 mr-2", theme === "light" ? "text-indigo-700" : "text-white")} />
                  <span className={cn("font-bold", theme === "light" ? "text-indigo-900" : "text-white")}>
                    {t("expirationInfo")}
                  </span>
                </div>
                <p className={cn("mb-3", theme === "light" ? "text-gray-700" : "text-white/80")}>
                  {t("firstVersionNote")}
                </p>

                {/* Visual indicator for 7 days */}
                <div
                  className={cn(
                    "rounded-full h-2 overflow-hidden",
                    theme === "light" ? "bg-indigo-100" : "bg-indigo-900/50",
                  )}
                >
                  <div
                    className={cn(
                      "h-full w-full animate-progress",
                      theme === "light"
                        ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                        : "bg-gradient-to-r from-blue-500 to-purple-500",
                    )}
                  ></div>
                </div>
                <div
                  className={cn(
                    "flex justify-between text-xs mt-1",
                    theme === "light" ? "text-indigo-700" : "text-white/80",
                  )}
                >
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
                  "h-12 pr-4 transition-all duration-200",
                  theme === "light"
                    ? "bg-white/50 border-indigo-200 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                    : "bg-gray-800/40 border-indigo-500/30 text-white placeholder:text-white/50 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent",
                  error ? "border-red-400 focus:ring-red-400/50" : "",
                )}
              />
              <div
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2",
                  theme === "light" ? "text-indigo-400" : "text-white/50",
                )}
              >
                <LinkIcon className="h-4 w-4" />
              </div>
            </div>
            {error && (
              <div className="flex items-center text-red-500 dark:text-red-300 text-sm">
                <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className={cn(
              "w-full h-12 font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-200",
              "hover:scale-[1.02] active:scale-[0.98]",
              theme === "light"
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700",
              isLoading && "opacity-80",
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div
                  className={cn(
                    "h-5 w-5 rounded-full border-2 border-t-white animate-spin",
                    theme === "light" ? "border-indigo-200" : "border-white/20",
                  )}
                />
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
          <div
            className={cn(
              "mt-6 rounded-lg p-4 border animate-fade-in transition-all duration-500",
              theme === "light" ? "bg-white/50 border-indigo-200" : "bg-gray-800/40 border-indigo-500/30",
            )}
          >
            <p className={cn("text-sm mb-2", theme === "light" ? "text-indigo-800" : "text-white")}>
              {t("yourShortenedUrl")}:
            </p>
            <div className="flex items-center">
              <div
                className={cn(
                  "rounded-l-lg py-2.5 px-4 flex-1 truncate",
                  theme === "light" ? "bg-indigo-100 text-indigo-900" : "bg-indigo-900/50 text-white",
                )}
              >
                {shortenedUrl}
              </div>
              <button
                onClick={copyToClipboard}
                className={cn(
                  "rounded-r-lg p-2.5 transition-colors",
                  theme === "light"
                    ? "bg-indigo-200 hover:bg-indigo-300 text-indigo-700"
                    : "bg-indigo-800/60 hover:bg-indigo-700/70 text-white",
                )}
                aria-label={t("copyToClipboard")}
              >
                {copied ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-300 animate-success" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Expiration info with animation */}
            <div className="flex items-center mt-2">
              <Clock
                className={cn(
                  "h-4 w-4 mr-1 animate-pulse-subtle",
                  theme === "light" ? "text-indigo-500/70" : "text-white/70",
                )}
              />
              <p className={cn("text-xs italic", theme === "light" ? "text-indigo-600/70" : "text-white/70")}>
                {t("linkWillExpire", { days: getDaysRemaining() })}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setTermsModalOpen(true)}
            className={cn(
              "inline-flex items-center text-sm transition-colors",
              theme === "light" ? "text-indigo-700 hover:text-indigo-900" : "text-white/80 hover:text-white",
            )}
          >
            <FileText className="h-4 w-4 mr-1" />
            {mounted && termsAccepted ? t("viewTerms") : t("readAndAcceptTerms")}
          </button>
          {mounted && !termsAccepted && (
            <p className="text-amber-500 dark:text-amber-300 text-xs mt-1 animate-pulse-subtle">
              {t("termsRequiredNotice")}
            </p>
          )}
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      <TermsModal
        open={termsModalOpen}
        onOpenChange={setTermsModalOpen}
        onAccept={handleAcceptTerms}
        accepted={termsAccepted}
      />

      <footer className={cn("relative z-10 mt-8 text-sm", theme === "light" ? "text-indigo-700/70" : "text-white/60")}>
        {t("footer")}
      </footer>

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
        
        .shadow-glow-dark {
          box-shadow: 0 0 15px rgba(30, 30, 30, 0.4);
        }
      `}</style>
    </main>
  )
}
