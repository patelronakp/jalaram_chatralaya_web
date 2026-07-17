"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import React from "react"

import { Button } from "../components/Button"
import { MaterialIcon } from "../components/Icons"

export function Hero() {
  const t = useTranslations("hero")
  const tStats = useTranslations("stats")

  const badges = [
    { icon: "history", text: t("badges.established") },
    { icon: "volunteer_activism", text: t("badges.registered") },
    { icon: "home", text: t("badges.freeHostel") },
    { icon: "security", text: t("badges.secureCampus") },
  ]

  const statsList = [
    { value: "૩૫+", label: tStats("experience") },
    { value: "૧૦૦%", label: tStats("freeFacility"), textClass: "text-secondary" },
    { value: "૨૪x૭", label: tStats("security") },
    { value: "૫૦૦+", label: tStats("students"), textClass: "text-secondary" },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center overflow-hidden bg-primary font-gujarati">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient z-10"></div>
          <Image
            alt="Hero"
            className="w-full h-full object-cover opacity-80"
            src="/images/hero_banner.jpg"
            fill
            priority
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-[1280px] mx-auto px-6 w-full py-20 md:py-32">
          <div className="max-w-3xl text-white">
            {/* Saffron Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-secondary-container/90 backdrop-blur text-on-secondary-container rounded-full mb-8 font-semibold text-sm md:text-base">
              <MaterialIcon name="verified" className="text-[18px]" />
              <span>{t("badge")}</span>
            </div>

            {/* Title */}
            <h1 className="font-extrabold mb-8 leading-[1.15] text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {t("title")}
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-lg md:text-xl mb-12 opacity-90 max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Button
                variant="secondary"
                className="px-8 py-4 text-lg md:text-xl flex items-center gap-3 rounded-xl"
              >
                <span>{t("primaryCta")}</span>
                <MaterialIcon name="arrow_forward" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg md:text-xl rounded-xl border-white/30 text-white hover:bg-white/10"
              >
                {t("secondaryCta")}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 pt-10 font-sans">
              {badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <MaterialIcon name={badge.icon} className="text-secondary-container text-xl" />
                  <span className="text-xs md:text-sm opacity-90 uppercase tracking-wider font-semibold">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 md:-mt-20 z-30 px-6 mb-20 font-gujarati">
        <div className="max-w-[1280px] mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-outline-variant/30">
          {statsList.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center px-4 pt-6 lg:pt-0 ${
                idx === 0 ? "pt-0" : ""
              } ${idx === 1 ? "border-none lg:border-l" : ""}`}
            >
              <span
                className={`block font-extrabold text-4xl md:text-5xl mb-2 ${
                  stat.textClass || "text-primary"
                }`}
              >
                {stat.value}
              </span>
              <p className="text-sm md:text-base text-on-surface-variant font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Hero
