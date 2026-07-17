import Image from "next/image"
import React from "react"

import { TRUSTEES_CONTENT } from "../constants/content"

export function Trustees() {
  return (
    <section id="trustees" className="py-20 md:py-28 bg-[#fdfcf7] font-gujarati">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-16 md:mb-20">
          {TRUSTEES_CONTENT.title}
        </h2>

        {/* Trustees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {TRUSTEES_CONTENT.items.map((trustee, idx) => (
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
              <h4 className="font-bold text-xl md:text-2xl text-primary mb-2">{trustee.name}</h4>
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
