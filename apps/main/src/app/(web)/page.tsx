"use client"

import React from "react"

import { About } from "../../features/About"
import { Contact } from "../../features/Contact"
import { Facilities } from "../../features/Facilities"
import { FAQ } from "../../features/FAQ"
import { Gallery } from "../../features/Gallery"
import { Hero } from "../../features/Hero"
import { Routine } from "../../features/Routine"
import { Timeline } from "../../features/Timeline"
import { Trustees } from "../../features/Trustees"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Facilities />
      <Timeline />
      <Routine />
      <Gallery />
      <Trustees />
      <FAQ />
      <Contact />
    </div>
  )
}
