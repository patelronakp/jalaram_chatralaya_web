import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react"

import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Probietech Next.js Workspace",
  description: "Organizational starter master template using Turborepo and shadcn/ui.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
