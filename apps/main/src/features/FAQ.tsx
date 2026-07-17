"use client"

import { useTranslations } from "next-intl"
import React, { useState } from "react"

import { MaterialIcon } from "../components/Icons"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const t = useTranslations("faq")

  const items = [
    { question: t("items.q1.q"), answer: t("items.q1.a") },
    { question: t("items.q2.q"), answer: t("items.q2.a") },
    { question: t("items.q3.q"), answer: t("items.q3.a") },
    { question: t("items.q4.q"), answer: t("items.q4.a") },
  ]

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-20 md:py-28 bg-white font-gujarati">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-16 text-center">
          {t("title")}
        </h2>

        {/* Accordions */}
        <div className="space-y-6">
          {items.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-background rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm"
              >
                {/* Accordion Header Trigger */}
                <button
                  className="w-full px-6 md:px-8 py-5 md:py-6 text-left flex justify-between items-center group transition-all"
                  onClick={() => toggle(idx)}
                >
                  <span className="font-bold text-lg md:text-xl text-primary group-hover:text-secondary transition-colors pr-4">
                    {faq.question}
                  </span>
                  <MaterialIcon
                    name="expand_more"
                    className={`text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content Panel */}
                <div
                  className={`px-6 md:px-8 py-5 md:py-6 text-on-surface-variant text-base md:text-lg border-t border-outline-variant/30 font-sans leading-relaxed transition-all duration-300 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
