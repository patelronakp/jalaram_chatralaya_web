"use client"

import React, { useEffect, useState } from "react"

import { AdminBreadcrumbs, type BreadcrumbItem } from "./admin-breadcrumbs"
import { AdminHeader } from "./admin-header"
import { AdminSidebar, type SidebarItem } from "./admin-sidebar"

export interface AdminShellProps {
  children: React.ReactNode
  sidebarItems: SidebarItem[]
  currentPath?: string
  LinkComponent: React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>
  breadcrumbItems?: BreadcrumbItem[]
}

const COLLAPSE_KEY = "admin_sidebar_collapsed"

export function AdminShell({
  children,
  sidebarItems,
  currentPath,
  LinkComponent,
  breadcrumbItems,
}: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  // Restore the desktop collapse preference.
  useEffect(() => {
    if (typeof window === "undefined") return
    setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === "true")
  }, [])

  const toggleCollapse = () =>
    setCollapsed((prev) => {
      const next = !prev
      if (typeof window !== "undefined") window.localStorage.setItem(COLLAPSE_KEY, String(next))
      return next
    })

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <AdminSidebar
        items={sidebarItems}
        currentPath={currentPath}
        LinkComponent={LinkComponent}
        isOpen={mobileOpen}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuToggle={() => setMobileOpen((open) => !open)} />
        <main className="flex-1 overflow-y-auto bg-muted/30 px-4 py-5 sm:px-6">
          <div className="mx-auto w-full max-w-7xl">
            {breadcrumbItems && breadcrumbItems.length > 0 && (
              <div className="mb-4">
                <AdminBreadcrumbs items={breadcrumbItems} LinkComponent={LinkComponent} />
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
