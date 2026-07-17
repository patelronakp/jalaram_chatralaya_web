import React from "react"
import { Container } from "./container"

export interface HeroSectionProps {
  title: string
  subtitle?: string
  cta?: React.ReactNode
}

export function HeroSection({ title, subtitle, cta }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-background py-24 md:py-32 border-b bg-gradient-to-b from-primary/5 via-transparent to-transparent">
      <Container className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl max-w-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-6 text-xl text-muted-foreground max-w-2xl">{subtitle}</p>}
        {cta && <div className="mt-10">{cta}</div>}
      </Container>
    </div>
  )
}
