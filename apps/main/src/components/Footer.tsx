"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import React from "react"

import { Link } from "../i18n/routing"
import { MaterialIcon } from "./Icons"

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
    <footer className="bg-primary text-white font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Image
                alt="Logo White"
                className="h-16 w-auto brightness-0 invert"
                src="/images/logo.png"
                width={64}
                height={64}
              />
              <h4 className="text-xl font-bold font-gujarati leading-tight">
                {locale === "gu" ? "શ્રી જલારામ કન્યા છાત્રાલય" : "Shri Jalaram Kanya Chatralay"}
              </h4>
            </div>
            <p className="opacity-70 leading-relaxed text-base">{t("desc")}</p>
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
              <li className="flex items-center gap-3">
                <MaterialIcon name="call" className="text-secondary-container" />
                <span>{t("phone")}</span>
              </li>
              <li className="flex items-center gap-3">
                <MaterialIcon name="mail" className="text-secondary-container" />
                <span className="break-all">{t("email")}</span>
              </li>
              <li className="flex gap-4 pt-2">
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
              </li>
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

