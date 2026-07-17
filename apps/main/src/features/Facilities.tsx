import React from "react"

import { Card } from "../components/Card"
import { MaterialIcon } from "../components/Icons"
import { FACILITIES } from "../constants/content"

export function Facilities() {
  return (
    <section id="facilities" className="py-20 md:py-28 bg-[#eff3ff]/50 font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-4">
            {FACILITIES.title}
          </h2>
          <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {FACILITIES.subtitle}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FACILITIES.items.map((item, idx) => (
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
