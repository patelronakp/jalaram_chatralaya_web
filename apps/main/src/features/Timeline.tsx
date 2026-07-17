"use client"

import { useTranslations } from "next-intl"
import React from "react"

import { Card } from "../components/Card"
import { MaterialIcon } from "../components/Icons"

export function Timeline() {
  const t = useTranslations("admission")

  const documents = [
    t("documents.marklist"),
    t("documents.lc"),
    t("documents.aadhar"),
    t("documents.photos"),
  ]

  const steps = [
    {
      numText: t("steps.step1.numText"),
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
    },
    {
      numText: t("steps.step2.numText"),
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
    },
    {
      numText: t("steps.step3.numText"),
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
    },
  ]

  return (
    <section id="admission" className="py-20 md:py-28 bg-white font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left Column: Title & Documents */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-6">
                {t("title")}
              </h2>
              <p className="font-sans text-base md:text-lg text-on-surface-variant mb-8 leading-relaxed">
                {t("subtitle")}
              </p>
            </div>
            {/* Required Documents Card */}
            <div className="p-8 rounded-2xl bg-primary-container text-white shadow-xl">
              <h4 className="text-xl md:text-2xl font-bold mb-5">{t("documents.title")}</h4>
              <ul className="space-y-3 font-sans">
                {documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <MaterialIcon
                      name="check_circle"
                      className="text-secondary-container text-lg"
                    />
                    <span className="text-base md:text-lg opacity-90 font-medium">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Timeline Steps */}
          <div className="w-full lg:w-2/3">
            <div className="space-y-12">
              {steps.map((step, idx) => (
                <div key={idx} className="relative pl-16 timeline-step">
                  {/* Number Badge */}
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xl z-10 shadow-lg font-gujarati">
                    {step.numText}
                  </div>
                  {/* Card Content */}
                  <Card className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl text-primary mb-2 font-bold">
                      {step.title}
                    </h3>
                    <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
