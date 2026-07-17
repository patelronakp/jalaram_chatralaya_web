/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useAuth } from "@repo/auth-core"
import { SiteFooter, SiteHeader } from "@repo/web-ui"
import Link from "next/link"
import React from "react"

export default function WebLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth()

  return (
    <div className="theme-web flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      <SiteHeader
        LinkComponent={Link as any}
        isAuthenticated={!!user}
        userName={user?.name || user?.email}
        onSignOut={signOut}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter LinkComponent={Link as any} />
    </div>
  )
}
