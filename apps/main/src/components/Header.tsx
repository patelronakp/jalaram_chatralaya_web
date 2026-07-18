"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import React, { useEffect, useState } from "react"

import { Link, usePathname } from "../i18n/routing"
import { Button } from "./Button"
import { MaterialIcon } from "./Icons"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [activeSection, setActiveSection] = useState("#")
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()

  const navLinks = [
    { label: t("home"), href: "#" },
    { label: t("about"), href: "#about" },
    { label: t("facilities"), href: "#facilities" },
    { label: t("admission"), href: "#admission" },
    { label: t("contact"), href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "facilities", "admission", "contact"]
      let current = "#"

      if (window.scrollY < 200) {
        setActiveSection("#")
        return
      }

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250 && rect.bottom >= 150) {
            current = `#${section}`
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="flex justify-between items-center w-full px-6 max-w-[1580px] mx-auto h-24">
        {/* Logo and title */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            alt="Logo"
            className="h-14 md:h-16 w-auto"
            src="/images/logo.png"
            width={64}
            height={64}
            priority
          />
          <span className="font-gujarati text-sm md:text-base lg:text-lg xl:text-xl font-bold text-primary hidden md:block max-w-[180px] lg:max-w-[280px] xl:max-w-[360px] 2xl:max-w-none leading-tight">
            {locale === "gu"
              ? "શ્રી જલારામ રઘુવંશી લોહાણા કન્યા છાત્રાલય, રાપર(કચ્છ)"
              : "Shree Jalaram Raghuvanshi Lohana Kanya Chatralay, Rapar(Kutch)"}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex gap-6 2xl:gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              className="relative font-gujarati text-base text-on-surface-variant hover:text-primary transition-colors pb-1 pt-1 px-0"
              href={link.href}
              onClick={() => setActiveSection(link.href)}
            >
              <span className={activeSection === link.href ? "text-primary font-bold" : ""}>
                {link.label}
              </span>
              {activeSection === link.href && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="font-gujarati text-sm sm:text-base text-primary hover:bg-primary/5 px-2.5 sm:px-3 py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 transition-all border border-outline-variant/30"
            >
              <MaterialIcon name="language" className="text-[18px] sm:text-[20px]" />
              <span>{locale === "gu" ? "ગુજરાતી" : "English"}</span>
              <MaterialIcon name="arrow_drop_down" className="text-[16px] sm:text-[18px]" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-outline-variant/30 rounded-xl shadow-lg z-50 font-sans py-2">
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setShowLangMenu(false)}
                  className={`block px-4 py-2 text-sm text-left hover:bg-primary/5 transition-colors ${
                    locale === "en" ? "font-bold text-secondary" : "text-primary"
                  }`}
                >
                  English
                </Link>
                <Link
                  href={pathname}
                  locale="gu"
                  onClick={() => setShowLangMenu(false)}
                  className={`block px-4 py-2 text-sm text-left font-gujarati hover:bg-primary/5 transition-colors ${
                    locale === "gu" ? "font-bold text-secondary" : "text-primary"
                  }`}
                >
                  ગુજરાતી
                </Link>
              </div>
            )}
          </div>

          <Button
            variant="secondary"
            className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base whitespace-nowrap"
          >
            {t("formBtn")}
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <MaterialIcon name={isOpen ? "close" : "menu"} className="text-[28px]" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="xl:hidden border-t bg-white border-outline-variant/30 py-6 px-6 flex flex-col gap-2 font-gujarati shadow-inner animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-outline-variant/10 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
