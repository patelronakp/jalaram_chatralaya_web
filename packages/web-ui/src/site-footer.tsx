import React from "react"
import { Container } from "./container"

export interface SiteFooterProps {
  LinkComponent: React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>
}

export function SiteFooter({ LinkComponent }: SiteFooterProps) {
  return (
    <footer className="border-t bg-muted/30">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-8 text-center text-sm text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} Probietech. All rights reserved.</div>
        <div className="flex justify-center gap-4">
          <LinkComponent href="/privacy" className="hover:underline">
            Privacy Policy
          </LinkComponent>
          <LinkComponent href="/terms" className="hover:underline">
            Terms of Service
          </LinkComponent>
        </div>
      </Container>
    </footer>
  )
}
