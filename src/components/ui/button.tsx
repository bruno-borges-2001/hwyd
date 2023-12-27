import { cn } from "@/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { HTMLMotionProps, motion } from 'framer-motion'
import * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "p-2 aspect-square bg-black/80 hover:bg-black transition-colors rounded-full",
        none: ""
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        none: ""
      },
      behaviour: {
        default: "",
        scale: "hover:scale-105 active:scale-95 transition-transform"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      behaviour: "default"
    },
  }
)

type ButtonProps =
  (React.ButtonHTMLAttributes<HTMLButtonElement> | HTMLMotionProps<"button">) &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, behaviour, asChild = false, ...props }, ref) => {
    if (asChild)
      return <Slot className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}
      />

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, behaviour, className }))}
        ref={ref}
        {...props as HTMLMotionProps<"button">}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
