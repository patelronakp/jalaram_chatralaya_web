"use client"

import { motion, type TargetAndTransition,type Transition } from "framer-motion"
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

type AnimationType =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleUp"
  | "scaleDown"
  | "slideUpStagger"
  | "slideDownStagger"
  | "slideLeftStagger"
  | "slideRightStagger"
  | "hero"

interface AnimationConfig {
  initial: TargetAndTransition
  whileInView: TargetAndTransition
  transition: Transition
}

const animationVariants: Record<AnimationType, AnimationConfig> = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  fadeDown: {
    initial: { opacity: 0, y: -40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  fadeRight: {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  scaleDown: {
    initial: { opacity: 0, scale: 1.1 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  slideUpStagger: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  slideDownStagger: {
    initial: { opacity: 0, y: -30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  slideLeftStagger: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  slideRightStagger: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  hero: {
    initial: { opacity: 0, y: 60, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function ScrollAnimate({
  children,
  delay = 0,
  animation = "fadeUp",
}: {
  children: React.ReactNode
  delay?: number
  animation?: AnimationType
}) {
  const { initial, whileInView, transition } = animationVariants[animation]
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "0px" }}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero - Dramatic entrance with scale + fade up */}
      <ScrollAnimate delay={0.1} animation="hero">
        <Hero />
      </ScrollAnimate>

      {/* About - Two columns: image slides from left, content from right */}
      <ScrollAnimate delay={0.15} animation="fadeUp">
        <About />
      </ScrollAnimate>

      {/* Facilities - Grid of cards: staggered scale up */}
      <ScrollAnimate delay={0.1} animation="slideUpStagger">
        <Facilities />
      </ScrollAnimate>

      {/* Timeline - Left column slides from left, right column cards from right */}
      <ScrollAnimate delay={0.15} animation="fadeUp">
        <Timeline />
      </ScrollAnimate>

      {/* Routine - Circular steps: staggered scale up from center */}
      <ScrollAnimate delay={0.1} animation="scaleUp">
        <Routine />
      </ScrollAnimate>

      {/* Gallery - Masonry grid: staggered fade + scale */}
      <ScrollAnimate delay={0.1} animation="slideUpStagger">
        <Gallery />
      </ScrollAnimate>

      {/* Trustees - 4 profile cards: staggered slide up */}
      <ScrollAnimate delay={0.1} animation="slideUpStagger">
        <Trustees />
      </ScrollAnimate>

      {/* FAQ - Accordion items: staggered slide down */}
      <ScrollAnimate delay={0.1} animation="slideDownStagger">
        <FAQ />
      </ScrollAnimate>

      {/* Contact - Two columns: left from left, right from right */}
      <ScrollAnimate delay={0.15} animation="fadeUp">
        <Contact />
      </ScrollAnimate>
    </div>
  )
}
