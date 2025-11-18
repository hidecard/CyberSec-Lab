import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Code = forwardRef<
  HTMLPreElement,
  React.HTMLAttributes<HTMLPreElement>
>(({ className, ...props }, ref) => (
  <pre
    ref={ref}
    className={cn(
      "relative rounded bg-muted px-[0.75rem] py-[0.75rem] font-mono text-sm",
      className
    )}
    {...props}
  />
))
Code.displayName = "Code"

export { Code }