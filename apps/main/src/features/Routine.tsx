"use client"

import { useTranslations } from "next-intl"
import React from "react"

import { MaterialIcon } from "../components/Icons"

export function Routine() {
  const t = useTranslations("routine")

  const steps = [
    { icon: "wb_sunny", title: t("steps.step1.title"), time: t("steps.step1.time") },
    { icon: "coffee", title: t("steps.step2.title"), time: t("steps.step2.time") },
    { icon: "school", title: t("steps.step3.title"), time: t("steps.step3.time") },
    { icon: "menu_book", title: t("steps.step4.title"), time: t("steps.step4.time") },
    {
      icon: "sports_volleyball",
      title: t("steps.step5.title"),
      time: t("steps.step5.time"),
    },
    { icon: "dinner_dining", title: t("steps.step6.title"), time: t("steps.step6.time") },
    { icon: "bedtime", title: t("steps.step7.title"), time: t("steps.step7.time") },
  ]

  return (
    <section className="py-20 md:py-28 bg-[#eff3ff]/30 overflow-hidden font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-16 text-center">
          {t("title")}
        </h2>

        {/* Steps Flow */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-4 items-center">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Circle Item */}
              <div className="flex flex-col items-center group w-32 md:w-36 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-4">
                  <MaterialIcon name={step.icon} className="text-[32px] md:text-[36px]" />
                </div>
                <p className="font-bold text-primary text-base md:text-lg mb-1">{step.title}</p>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant">{step.time}</p>
              </div>

              {/* Dotted Line Connector */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block h-px w-8 xl:w-12 bg-outline-variant/40 -mt-10"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Routine
