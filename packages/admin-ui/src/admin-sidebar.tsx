"use client"

import { cn } from "@repo/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"

export interface SidebarItem {
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
}

export interface AdminSidebarProps {
  items: SidebarItem[]
  currentPath?: string
  LinkComponent: React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>
  /** Mobile drawer open state. */
  isOpen?: boolean
  /** Desktop icon-rail mode. */
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function AdminSidebar({
  items,
  currentPath,
  LinkComponent,
  isOpen = false,
  collapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "group/sidebar fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r bg-card transition-[width,transform] duration-300 ease-in-out md:relative md:translate-x-0",
        collapsed && "md:w-[68px]",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Edge collapse/expand toggle — sits on the divider line below the header (desktop only) */}
      {onToggleCollapse && (
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute right-0 top-20 z-40 hidden h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-md transition-colors hover:bg-primary hover:text-primary-foreground md:flex"
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      )}
      {/* Brand */}
      <div className="flex h-16 items-center border-b px-4">
        <LinkComponent
          href="/"
          className="flex items-center gap-2.5 font-bold text-foreground transition-colors hover:text-primary"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            P
          </span>
          <span className={cn("text-base tracking-tight", collapsed && "md:hidden")}>
            Probietech
          </span>
        </LinkComponent>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p
          className={cn(
            "px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60",
            collapsed && "md:hidden",
          )}
        >
          Menu
        </p>
        {items.map((item, idx) => {
          const isActive =
            item.active ??
            (currentPath === item.href ||
              (currentPath && currentPath.startsWith(item.href) && item.href !== "/admin"))

          return (
            <LinkComponent
              key={idx}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                collapsed && "md:justify-center md:px-0",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.icon && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {item.icon}
                </span>
              )}
              <span className={cn(collapsed && "md:hidden")}>{item.label}</span>

              {/* Tooltip shown only in collapsed (desktop) mode on hover */}
              {collapsed && (
                <span className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md md:group-hover:block">
                  {item.label}
                </span>
              )}
            </LinkComponent>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-3">
        <p
          className={cn(
            "text-center text-xs text-muted-foreground/60",
            collapsed && "md:hidden",
          )}
        >
          v1.0.0
        </p>
      </div>
    </aside>
  )
}
