"use client"

import React from "react"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface AdminBreadcrumbsProps {
  items: BreadcrumbItem[]
  LinkComponent: React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>
}

export function AdminBreadcrumbs({ items, LinkComponent }: AdminBreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1

          return (
            <li key={idx} className="flex items-center">
              {idx > 0 && <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground/50" />}
              {isLast || !item.href ? (
                <span className="font-semibold text-foreground">{item.label}</span>
              ) : (
                <LinkComponent href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </LinkComponent>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
