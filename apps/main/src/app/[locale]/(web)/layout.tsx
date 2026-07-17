/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"

import { Footer as JalaramFooter } from "../../../components/Footer"
import { Header as JalaramHeader } from "../../../components/Header"
import { PageTransition } from "../../../components/PageTransition"

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-web flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      <JalaramHeader />
      <main className="flex-1 flex flex-col">
        <PageTransition>{children}</PageTransition>
      </main>
      <JalaramFooter />
    </div>
  )
}
