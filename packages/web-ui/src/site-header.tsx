"use client"

import React from "react"
import { Container } from "./container"
import { Button, buttonVariants } from "@repo/ui"

export interface SiteHeaderProps {
  LinkComponent: React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>
  isAuthenticated?: boolean
  userName?: string
  onSignOut?: () => void
}

export function SiteHeader({
  LinkComponent,
  isAuthenticated = false,
  userName,
  onSignOut,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <LinkComponent href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span>Probietech</span>
        </LinkComponent>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <LinkComponent href="/" className="hover:text-foreground transition-colors">
            Home
          </LinkComponent>
          <LinkComponent href="/admin" className="hover:text-foreground transition-colors">
            Admin Panel
          </LinkComponent>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <LinkComponent href="/profile" className="text-sm font-medium hover:underline">
                Profile ({userName})
              </LinkComponent>
              {onSignOut && (
                <Button variant="outline" onClick={onSignOut}>
                  Logout
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LinkComponent href="/login" className={buttonVariants({ variant: "ghost" })}>
                Sign In
              </LinkComponent>
              <LinkComponent href="/register" className={buttonVariants({ variant: "default" })}>
                Sign Up
              </LinkComponent>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}
