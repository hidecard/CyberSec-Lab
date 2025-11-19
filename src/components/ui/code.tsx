import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Code = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded bg-muted px-[0.75rem] py-[0.75rem] font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-48 overflow-y-auto",
      className
    )}
    {...props}
  />
))
Code.displayName = "Code"

export { Code }