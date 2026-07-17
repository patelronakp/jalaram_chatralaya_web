"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import React from "react"

export function Trustees() {
  const t = useTranslations("trustees")

  const items = [
    {
      name: t("items.trustee1.name"),
      role: t("items.trustee1.role"),
      description: t("items.trustee1.description"),
      image: "/images/trustee.png",
    },
    {
      name: t("items.trustee2.name"),
      role: t("items.trustee2.role"),
      description: t("items.trustee2.description"),
      image: "/images/trustee.png",
    },
    {
      name: t("items.trustee3.name"),
      role: t("items.trustee3.role"),
      description: t("items.trustee3.description"),
      image: "/images/trustee-female.png",
    },
    {
      name: t("items.trustee4.name"),
      role: t("items.trustee4.role"),
      description: t("items.trustee4.description"),
      image: "/images/trustee.png",
    },
  ]

  return (
    <section id="trustees" className="py-20 md:py-28 bg-background font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-16 md:mb-20">
          {t("title")}
        </h2>

        {/* Trustees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map((trustee, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Profile Image */}
              <div className="w-52 h-52 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 border-8 border-white shadow-xl relative">
                <Image
                  alt={trustee.name}
                  className="w-full h-full object-cover"
                  src={trustee.image}
                  fill
                  sizes="224px"
                />
              </div>
              {/* Profile Info */}
              <h4 className="font-bold text-xl md:text-xl text-primary mb-2">{trustee.name}</h4>
              <p className="text-secondary font-semibold mb-4 text-base">{trustee.role}</p>
              <p className="font-sans text-sm text-on-surface-variant px-4 md:px-6 leading-relaxed">
                {trustee.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trustees
