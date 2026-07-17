"use client"

import { motion } from "framer-motion"
import React from "react"

import { About } from "../../../features/About"
import { Contact } from "../../../features/Contact"
import { Facilities } from "../../../features/Facilities"
import { FAQ } from "../../../features/FAQ"
import { Gallery } from "../../../features/Gallery"
import { Hero } from "../../../features/Hero"
import { Routine } from "../../../features/Routine"
import { Timeline } from "../../../features/Timeline"
import { Trustees } from "../../../features/Trustees"

function ScrollAnimate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />
      <ScrollAnimate>
        <About />
      </ScrollAnimate>
      <ScrollAnimate>
        <Facilities />
      </ScrollAnimate>
      <ScrollAnimate>
        <Timeline />
      </ScrollAnimate>
      <ScrollAnimate>
        <Routine />
      </ScrollAnimate>
      <ScrollAnimate>
        <Gallery />
      </ScrollAnimate>
      <ScrollAnimate>
        <Trustees />
      </ScrollAnimate>
      <ScrollAnimate>
        <FAQ />
      </ScrollAnimate>
      <ScrollAnimate>
        <Contact />
      </ScrollAnimate>
    </div>
  )
}
