import React from "react"
import { Loader2 } from "lucide-react"

export interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading data..." }: LoadingStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center animate-in fade-in-50">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
