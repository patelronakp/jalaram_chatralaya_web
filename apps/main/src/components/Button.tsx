import { cn } from "@repo/utils"
import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const baseStyle =
      "inline-flex items-center justify-center font-gujarati font-semibold rounded-xl transition-all active:scale-95 duration-200"

    const variants = {
      primary: "bg-primary text-white hover:bg-primary-container",
      secondary: "bg-secondary-container text-on-secondary-container hover:shadow-lg",
      outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary/5",
      ghost: "text-primary hover:bg-primary/5",
    }

    return (
      <button ref={ref} className={cn(baseStyle, variants[variant], className)} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
