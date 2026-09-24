import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-medium tracking-[-0.01em] whitespace-nowrap transition-[color,background-color,box-shadow,transform] duration-200 ease-out outline-none select-none active:scale-[0.97] focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-45 aria-invalid:ring-destructive/30 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.12),0_4px_12px_-4px_rgb(0_0_0/0.2)] hover:bg-primary/88",
        destructive:
          "bg-destructive text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.2),0_1px_2px_rgb(0_0_0/0.12)] hover:bg-destructive/90",
        outline:
          "border border-border bg-background shadow-[0_1px_2px_rgb(0_0_0/0.04)] hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "rounded-md text-foreground underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        default: "h-9 px-4 has-[>svg]:px-3.5",
        sm: "h-8 gap-1.5 px-3 text-[13px] has-[>svg]:px-2.5",
        lg: "h-11 px-6 text-[15px] has-[>svg]:px-5",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
