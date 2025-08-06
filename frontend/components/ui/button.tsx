import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gymshock-primary-600 text-white hover:bg-gymshock-primary-700 focus-visible:ring-gymshock-primary-500",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-gymshock-primary-600 bg-transparent text-gymshock-primary-600 hover:bg-gymshock-primary-50",
        secondary: "bg-gymshock-dark-100 text-gymshock-dark-900 hover:bg-gymshock-dark-200",
        ghost: "hover:bg-gymshock-dark-100 hover:text-gymshock-dark-900",
        link: "text-sm text-gray-400 hover:text-white underline hover:no-underline transition-colors",
        gymshock: "bg-gradient-to-r from-gymshock-primary-600 to-gymshock-energy-500 hover:from-gymshock-primary-700 hover:to-gymshock-energy-600 text-white px-10 py-5 rounded-xl font-bold text-sm md:text-lg lg:text-xl shadow-gymshock-brand hover:scale-105 transition-all duration-300"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

