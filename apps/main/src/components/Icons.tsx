import { cn } from "@repo/utils"
import React from "react"

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
}

export const MaterialIcon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, name, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("material-symbols-outlined select-none", className)} {...props}>
        {name}
      </span>
    )
  },
)

MaterialIcon.displayName = "MaterialIcon"
export default MaterialIcon
