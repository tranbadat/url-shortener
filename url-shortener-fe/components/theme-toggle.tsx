"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the toggle after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Force theme update on mount
  useEffect(() => {
    if (mounted) {
      // Apply the theme explicitly
      const currentTheme = theme || "dark"
      document.documentElement.classList.toggle("dark", currentTheme === "dark")
    }
  }, [mounted, theme])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    // Apply the theme change immediately
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "rounded-full backdrop-blur-sm transition-all duration-300 w-10 h-10 p-0",
        theme === "light"
          ? "bg-white/40 hover:bg-white/60 text-indigo-700"
          : "bg-white/20 hover:bg-white/30 text-white",
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 transition-transform hover:rotate-45 duration-300" />
      ) : (
        <Moon className="h-5 w-5 transition-transform hover:rotate-12 duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
