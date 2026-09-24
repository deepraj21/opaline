"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors duration-300 ease-out outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[oklch(0.72_0.19_148)] data-[state=unchecked]:bg-foreground/12",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block h-6 w-6 rounded-full bg-white shadow-[0_2px_6px_rgb(0_0_0/0.18),0_0_0_0.5px_rgb(0_0_0/0.04)] ring-0 transition-[transform,width] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] group-active/switch:w-7 data-[state=checked]:translate-x-5 group-active/switch:data-[state=checked]:translate-x-4"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
