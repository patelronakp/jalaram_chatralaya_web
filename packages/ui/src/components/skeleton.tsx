import { cn } from "@repo/utils"
import * as React from "react"

/** Pulsing placeholder block. Compose into skeleton screens while data loads. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export { Skeleton }
