"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import React, { useState } from "react"

import { Link, usePathname } from "../i18n/routing"
import { Button } from "./Button"
import { MaterialIcon } from "./Icons"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
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

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="flex justify-between items-center w-full px-6 max-w-[1280px] mx-auto h-24">
        {/* Logo and title */}
        <Link href="/" className="flex items-center gap-4 md:gap-6">
          <Image
            alt="Logo"
            className="h-16 w-auto"
            src="/images/logo.png"
            width={64}
            height={64}
            priority
          />
          <span className="font-gujarati text-2xl font-bold text-primary hidden lg:block">
            {locale === "gu" ? "શ્રી જલારામ કન્યા છાત્રાલય" : "Shri Jalaram Kanya Chatralay"}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 lg:gap-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              className="font-gujarati text-base text-on-surface-variant hover:text-primary transition-colors hover:border-b-2 hover:border-primary pb-1"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="font-gujarati text-base text-primary hover:bg-primary/5 px-3 py-2 rounded-lg flex items-center gap-2 transition-all border border-outline-variant/30"
            >
              <MaterialIcon name="language" className="text-[20px]" />
              <span>{locale === "gu" ? "ગુજરાતી" : "English"}</span>
              <MaterialIcon name="arrow_drop_down" className="text-[18px]" />
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

          <Button variant="secondary" className="px-5 py-2.5 text-base whitespace-nowrap">
            {t("formBtn")}
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-lg"
          >
            <MaterialIcon name={isOpen ? "close" : "menu"} className="text-[28px]" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t bg-white border-outline-variant/30 py-4 px-6 flex flex-col gap-4 font-gujarati">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg text-on-surface-variant hover:text-primary transition-colors py-2"
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

