"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import React from "react"

import { Link } from "../i18n/routing"
import { MaterialIcon } from "./Icons"

const cleanPhoneForDialing = (num: string) => {
  const guToEn: { [key: string]: string } = {
    "૦": "0",
    "૧": "1",
    "૨": "2",
    "૩": "3",
    "૪": "4",
    "૫": "5",
    "૬": "6",
    "૭": "7",
    "૮": "8",
    "૯": "9",
  }
  const replaced = num.replace(/[૦-૯]/g, (char) => guToEn[char] || char)
  return replaced.replace(/[^0-9+]/g, "")
}

export function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
  const locale = useLocale()

  const quickLinks = [
    { label: tNav("about"), href: "#about" },
    { label: tNav("facilities"), href: "#facilities" },
    { label: tNav("admission"), href: "#admission" },
    { label: locale === "gu" ? "ગેલેરી" : "Gallery", href: "#gallery" },
  ]

  const infoLinks = [
    { label: t("faq"), href: "#faq" },
    { label: t("terms"), href: "#terms" },
    { label: t("privacy"), href: "#privacy" },
    { label: t("trustees"), href: "#trustees" },
  ]

  return (
    <footer className="bg-primary text-white pt-16 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(254,166,25,0.05),transparent_40%)]"></div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-30 h-30 rounded-full flex items-center justify-center p-1">
                <Image
                  alt="Logo White"
                  className="w-40 h-auto"
                  src="/images/logo.png"
                  width={64}
                  height={64}
                />
              </div>
              <span className="font-bold text-lg leading-tight">
                {locale === "gu" ? "શ્રી જલારામ કન્યા છાત્રાલય" : "Shree Jalaram Kanya Chatralay"}
              </span>
            </div>
            <p className="opacity-70 text-sm leading-relaxed mb-6 font-sans">{t("desc")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-lg mb-6 border-l-4 border-secondary-container pl-4">
              {t("quickLinks")}
            </h5>
            <ul className="space-y-3 opacity-80 text-base">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary-container transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h5 className="font-bold text-lg mb-6 border-l-4 border-secondary-container pl-4">
              {t("info")}
            </h5>
            <ul className="space-y-3 opacity-80 text-base">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary-container transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h5 className="font-bold text-lg mb-6 border-l-4 border-secondary-container pl-4">
              {t("contact")}
            </h5>
            <ul className="space-y-4 opacity-80 text-base">
              <li className="flex items-start gap-3">
                <MaterialIcon name="call" className="text-secondary-container mt-1" />
                <div className="flex flex-col">
                  {t("phone")
                    .split("\n")
                    .map((num, i) => {
                      const cleanNum = cleanPhoneForDialing(num.trim())
                      return (
                        <a
                          key={i}
                          href={`tel:${cleanNum}`}
                          className="hover:text-secondary-container transition-colors font-sans whitespace-nowrap block"
                        >
                          {num.trim()}
                        </a>
                      )
                    })}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MaterialIcon name="mail" className="text-secondary-container" />
                <a
                  href={`mailto:${t("email")}`}
                  className="hover:text-secondary-container transition-colors break-all"
                >
                  {t("email")}
                </a>
              </li>
              {/* <li className="flex gap-4 pt-2">
                <Link
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-secondary-container hover:text-primary transition-all"
                  href="#"
                >
                  <MaterialIcon name="public" className="text-[20px]" />
                </Link>
                <Link
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-secondary-container hover:text-primary transition-all"
                  href="#"
                >
                  <MaterialIcon name="share" className="text-[20px]" />
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="pt-12 border-t border-white/10 text-center opacity-60 text-sm">
          <p>{t("copyright")}</p>
          <p className="text-[12px] mt-2 font-sans">{t("devNote")}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
