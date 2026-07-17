import "../globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import React from "react"

import { routing } from "../../i18n/routing"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "શ્રી જલારામ કન્યા છાત્રાલય | Shri Jalaram Kanya Chatralay",
  description: "દીકરીઓના સર્વાંગી ઉત્કર્ષ, સુરક્ષા અને સંસ્કારનું પવિત્ર ધામ. અમે ૧૯૮૮ થી રઘુવંશી દીકરીઓના ઉજ્જવળ ભવિષ્ય માટે કાર્યરત છીએ.",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
