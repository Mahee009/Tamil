import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full min-h-16 rounded-md border bg-transparent px-3 py-2 text-base md:text-sm",
        "border-input placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-[color,box-shadow] shadow-xs",
        className,
      )}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
