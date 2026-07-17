import React from "react"
import { AlertCircle } from "lucide-react"

export interface ErrorStateProps {
  title?: string
  message?: string
  retry?: () => void
  retryText?: string
}

export function ErrorState({
  title = "An error occurred",
  message = "Failed to load data. Please check your connection and try again.",
  retry,
  retryText = "Try again",
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center animate-in fade-in-50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {retryText}
        </button>
      )}
    </div>
  )
}
