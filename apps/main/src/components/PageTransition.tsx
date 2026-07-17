"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useLocale } from "next-intl"
import React from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const locale = useLocale()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locale}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
