"use client"

import React from "react"
import { useAuth } from "@repo/auth-core"
import { ThemeToggle } from "./theme-toggle"
import { User, LogOut } from "lucide-react"
import { Button } from "@repo/ui"

export interface AdminHeaderProps {
  onMenuToggle?: () => void
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        )}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-wider text-primary">ADMIN PANEL</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user && (
          <div className="flex items-center gap-3 pl-2 border-l">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-sm font-medium text-foreground">{user.name || user.email}</span>
              <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
