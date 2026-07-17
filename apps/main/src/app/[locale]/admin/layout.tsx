/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { AdminShell } from "@repo/admin-ui"
import { useRequireAdmin } from "@repo/auth-core"
import { LayoutDashboard, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  // Check admin session, except on the login page itself
  const { isLoading, user } = useRequireAdmin(isLoginPage ? "/admin/login" : "/admin/login")

  if (isLoginPage) {
    return (
      <div className="theme-admin min-h-screen bg-background text-foreground transition-colors duration-200 flex items-center justify-center">
        {children}
      </div>
    )
  }

  if (isLoading || !user) {
    return (
      <div className="theme-admin flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground animate-pulse">
          Checking administrator session...
        </p>
      </div>
    )
  }

  const sidebarItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Users", href: "/admin/users", icon: <Users className="h-4 w-4" /> },
    { label: "Settings", href: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
  ]

  const paths = pathname.split("/").filter(Boolean)
  const breadcrumbItems = paths.map((path, idx) => {
    const href = "/" + paths.slice(0, idx + 1).join("/")
    return {
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href: idx === paths.length - 1 ? undefined : href,
    }
  })

  return (
    <div className="theme-admin min-h-screen bg-background text-foreground transition-colors duration-200">
      <AdminShell
        sidebarItems={sidebarItems}
        currentPath={pathname}
        LinkComponent={Link as any}
        breadcrumbItems={breadcrumbItems}
      >
        {children}
      </AdminShell>
    </div>
  )
}
