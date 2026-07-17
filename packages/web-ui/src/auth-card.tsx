import React from "react"

export interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-lg p-6 sm:p-8 animate-in fade-in zoom-in-95">
      <div className="flex flex-col space-y-1.5 text-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
      {footer && (
        <div className="mt-6 border-t pt-4 text-center text-sm text-muted-foreground">{footer}</div>
      )}
    </div>
  )
}
