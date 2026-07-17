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
    <section className="py-20 md:py-28 bg-surface-container-low/30 overflow-hidden font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-16 text-center">
          {t("title")}
        </h2>

        {/* Steps Flow */}
        <div className="flex flex-wrap justify-center gap-6 items-start">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Circle Item */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 mb-4 cursor-pointer">
                  <MaterialIcon name={step.icon} className="text-[36px]" />
                </div>
                <p className="font-bold text-primary mb-1">{step.title}</p>
                <p className="text-sm text-on-surface-variant font-sans">{step.time}</p>
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="h-px w-12 bg-outline-variant mt-12 hidden md:block"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Routine
