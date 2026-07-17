"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import React from "react"

import { Button } from "../components/Button"
import { MaterialIcon } from "../components/Icons"

export function About() {
  const t = useTranslations("about")

  const features = [
    {
      icon: "school",
      title: t("feature1Title"),
      description: t("feature1Desc"),
    },
    {
      icon: "diversity_1",
      title: t("feature2Title"),
      description: t("feature2Desc"),
      isSecondary: true,
    },
  ]

  return (
    <section id="about" className="py-20 md:py-28 relative bg-white overflow-hidden font-gujarati">
      <div className="absolute inset-0 gujarati-pattern pointer-events-none"></div>
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Left Image Column */}
        <div className="w-full lg:w-1/2 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
            <Image
              alt="Institutional Heritage"
              className="w-full h-full object-cover"
              src="/images/about_heritage.jpg"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Right Content Column */}
        <div className="w-full lg:w-1/2">
          <span className="text-secondary font-semibold text-base md:text-lg tracking-[0.2em] uppercase mb-4 block">
            {t("tag")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6 leading-tight">
            {t("title")}
          </h2>
          <p className="font-sans text-base md:text-lg text-on-surface-variant mb-8 leading-relaxed">
            {t("description")}
          </p>

          {/* Info cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 mb-10">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    feature.isSecondary
                      ? "bg-secondary-container/10 text-secondary"
                      : "bg-primary/5 text-primary"
                  }`}
                >
                  <MaterialIcon name={feature.icon} className="text-[32px]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg md:text-xl text-primary mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm md:text-base text-on-surface-variant font-sans">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="primary" className="px-8 py-4 text-base md:text-lg">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default About
