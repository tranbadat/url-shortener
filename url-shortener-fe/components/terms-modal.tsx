"use client"

import { useState } from "react"
import { Check, Info, Shield, Clock, AlertTriangle, HelpCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTheme } from "next-themes"

interface TermsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAccept: () => void
  accepted: boolean
}

export function TermsModal({ open, onOpenChange, onAccept, accepted }: TermsModalProps) {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-3xl max-h-[90vh] overflow-y-auto backdrop-blur-lg border transition-all duration-500",
          theme === "light"
            ? "bg-white/30 border-indigo-200/50 text-gray-800"
            : "bg-gray-900/30 border-indigo-500/20 text-white",
        )}
      >
        <DialogHeader>
          <DialogTitle className={cn("text-2xl font-bold", theme === "light" ? "text-indigo-900" : "text-white")}>
            {t("termsAndConditions")}
          </DialogTitle>
          <DialogDescription className={cn(theme === "light" ? "text-gray-700" : "text-white/70")}>
            {t("termsIntroText")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Introduction */}
          <div
            className={cn(
              "rounded-lg border overflow-hidden transition-all duration-300",
              expandedSection === "intro" ? "max-h-96" : "max-h-16",
              theme === "light" ? "bg-white/40 border-indigo-200" : "bg-gray-800/40 border-indigo-500/30",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("intro")}>
              <Info
                className={cn(
                  "h-6 w-6 mr-3 transition-transform duration-300",
                  expandedSection === "intro" ? "rotate-180" : "",
                  theme === "light" ? "text-indigo-700" : "text-white",
                )}
              />
              <h2 className={cn("text-xl font-bold", theme === "light" ? "text-indigo-900" : "text-white")}>
                {t("termsIntroTitle")}
              </h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 transition-opacity duration-300",
                expandedSection === "intro" ? "opacity-100" : "opacity-0",
                theme === "light" ? "text-gray-700" : "text-white/80",
              )}
            >
              <p>{t("termsIntroText")}</p>
            </div>
          </div>

          {/* Data Storage */}
          <div
            className={cn(
              "rounded-lg border overflow-hidden transition-all duration-300",
              expandedSection === "storage" ? "max-h-96" : "max-h-16",
              theme === "light" ? "bg-white/40 border-indigo-200" : "bg-gray-800/40 border-indigo-500/30",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("storage")}>
              <Shield
                className={cn(
                  "h-6 w-6 mr-3 transition-transform duration-300",
                  expandedSection === "storage" ? "rotate-180" : "",
                  theme === "light" ? "text-indigo-700" : "text-white",
                )}
              />
              <h2 className={cn("text-xl font-bold", theme === "light" ? "text-indigo-900" : "text-white")}>
                {t("dataStorageTitle")}
              </h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 transition-opacity duration-300",
                expandedSection === "storage" ? "opacity-100" : "opacity-0",
                theme === "light" ? "text-gray-700" : "text-white/80",
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
          <div
            className={cn(
              "rounded-lg border-2 p-4 animate-pulse-subtle",
              theme === "light" ? "bg-indigo-100/70 border-indigo-300" : "bg-indigo-900/40 border-indigo-500/50",
            )}
          >
            <div className="flex items-center">
              <Clock
                className={cn("h-6 w-6 mr-3 animate-spin-slow", theme === "light" ? "text-indigo-700" : "text-white")}
              />
              <h2 className={cn("text-xl font-bold", theme === "light" ? "text-indigo-900" : "text-white")}>
                {t("dataRetentionTitle")}
              </h2>
            </div>
            <div
              className={cn(
                "mt-2 p-3 rounded-lg border",
                theme === "light" ? "bg-white/50 border-indigo-200" : "bg-indigo-800/30 border-indigo-600/30",
              )}
            >
              <p className={cn("font-medium", theme === "light" ? "text-indigo-900" : "text-white")}>
                {t("dataRetentionHighlight")}
              </p>
            </div>
          </div>

          {/* User Responsibility */}
          <div
            className={cn(
              "rounded-lg border overflow-hidden transition-all duration-300",
              expandedSection === "responsibility" ? "max-h-96" : "max-h-16",
              theme === "light" ? "bg-white/40 border-indigo-200" : "bg-gray-800/40 border-indigo-500/30",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("responsibility")}>
              <AlertTriangle
                className={cn(
                  "h-6 w-6 mr-3 transition-transform duration-300",
                  expandedSection === "responsibility" ? "rotate-180" : "",
                  theme === "light" ? "text-indigo-700" : "text-white",
                )}
              />
              <h2 className={cn("text-xl font-bold", theme === "light" ? "text-indigo-900" : "text-white")}>
                {t("userResponsibilityTitle")}
              </h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 transition-opacity duration-300",
                expandedSection === "responsibility" ? "opacity-100" : "opacity-0",
                theme === "light" ? "text-gray-700" : "text-white/80",
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
              "rounded-lg border overflow-hidden transition-all duration-300",
              expandedSection === "limitations" ? "max-h-96" : "max-h-16",
              theme === "light" ? "bg-white/40 border-indigo-200" : "bg-gray-800/40 border-indigo-500/30",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("limitations")}>
              <HelpCircle
                className={cn(
                  "h-6 w-6 mr-3 transition-transform duration-300",
                  expandedSection === "limitations" ? "rotate-180" : "",
                  theme === "light" ? "text-indigo-700" : "text-white",
                )}
              />
              <h2 className={cn("text-xl font-bold", theme === "light" ? "text-indigo-900" : "text-white")}>
                {t("limitationsTitle")}
              </h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 transition-opacity duration-300",
                expandedSection === "limitations" ? "opacity-100" : "opacity-0",
                theme === "light" ? "text-gray-700" : "text-white/80",
              )}
            >
              <p>{t("limitationsText")}</p>
            </div>
          </div>

          {/* Contact */}
          <div
            className={cn(
              "rounded-lg border overflow-hidden transition-all duration-300",
              expandedSection === "contact" ? "max-h-96" : "max-h-16",
              theme === "light" ? "bg-white/40 border-indigo-200" : "bg-gray-800/40 border-indigo-500/30",
            )}
          >
            <div className="p-4 flex items-center cursor-pointer" onClick={() => toggleSection("contact")}>
              <Mail
                className={cn(
                  "h-6 w-6 mr-3 transition-transform duration-300",
                  expandedSection === "contact" ? "rotate-180" : "",
                  theme === "light" ? "text-indigo-700" : "text-white",
                )}
              />
              <h2 className={cn("text-xl font-bold", theme === "light" ? "text-indigo-900" : "text-white")}>
                {t("contactTitle")}
              </h2>
            </div>
            <div
              className={cn(
                "px-4 pb-4 transition-opacity duration-300",
                expandedSection === "contact" ? "opacity-100" : "opacity-0",
                theme === "light" ? "text-gray-700" : "text-white/80",
              )}
            >
              <p>{t("contactText")}</p>
            </div>
          </div>

          {/* Agreement */}
          <div
            className={cn(
              "p-4 rounded-lg border mt-6",
              theme === "light" ? "bg-white/40 border-indigo-200" : "bg-gray-800/40 border-indigo-500/30",
            )}
          >
            <div className="flex items-start space-x-3">
              <div
                onClick={onAccept}
                className={cn(
                  "w-5 h-5 rounded-sm border flex items-center justify-center cursor-pointer transition-all duration-300",
                  accepted
                    ? "bg-green-500 border-green-500 scale-110"
                    : theme === "light"
                      ? "bg-white/50 border-indigo-300 hover:bg-indigo-100"
                      : "bg-indigo-900/50 border-indigo-400/70 hover:bg-indigo-800/70",
                )}
              >
                {accepted && <Check className="h-3.5 w-3.5 text-white" />}
              </div>
              <label
                onClick={onAccept}
                className={cn("cursor-pointer", theme === "light" ? "text-gray-800" : "text-white")}
              >
                {t("termsAgreement")}
              </label>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={cn(
              "border transition-colors",
              theme === "light"
                ? "bg-white/40 hover:bg-white/60 text-indigo-700 border-indigo-200"
                : "bg-gray-800/40 hover:bg-indigo-900/50 text-white border-indigo-500/30",
            )}
          >
            {t("backToHome")}
          </Button>

          <Button
            onClick={onAccept}
            disabled={accepted}
            className={cn(
              "transition-all duration-300",
              accepted ? "bg-green-500 hover:bg-green-500 text-white" : "hover:scale-105",
              theme === "light"
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700",
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
