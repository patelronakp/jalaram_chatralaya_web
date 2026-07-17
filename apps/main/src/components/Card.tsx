import { cn } from "@repo/utils"
import React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  premium?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, premium = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-2xl p-8 border border-outline-variant/30",
          premium && "premium-card",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = "Card"
export default Card
