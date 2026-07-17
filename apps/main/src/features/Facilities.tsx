"use client"

import { useTranslations } from "next-intl"
import React from "react"

import { Card } from "../components/Card"
import { MaterialIcon } from "../components/Icons"

export function Facilities() {
  const t = useTranslations("facilities")

  const items = [
    { icon: "bed", title: t("items.bed.title"), description: t("items.bed.description") },
    {
      icon: "restaurant",
      title: t("items.restaurant.title"),
      description: t("items.restaurant.description"),
    },
    { icon: "library_books", title: t("items.library.title"), description: t("items.library.description") },
    { icon: "temple_hindu", title: t("items.temple.title"), description: t("items.temple.description") },
    {
      icon: "health_and_safety",
      title: t("items.health.title"),
      description: t("items.health.description"),
    },
    { icon: "videocam", title: t("items.cctv.title"), description: t("items.cctv.description") },
    {
      icon: "fitness_center",
      title: t("items.sports.title"),
      description: t("items.sports.description"),
    },
    { icon: "hot_tub", title: t("items.hotTub.title"), description: t("items.hotTub.description") },
  ]

  return (
    <section id="facilities" className="py-20 md:py-28 bg-[#eff3ff]/50 font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4">
            {t("title")}
          </h2>
          <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <Card key={idx} className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6">
                <MaterialIcon name={item.icon} className="text-[36px]" />
              </div>
              <h3 className="text-xl md:text-2xl text-primary mb-3 font-bold">{item.title}</h3>
              <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Facilities
