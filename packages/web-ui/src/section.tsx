import React from "react"
import { cn } from "@repo/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-12 md:py-16 lg:py-20 bg-background text-foreground", className)}
      {...props}
    >
      {children}
    </section>
  )
}
