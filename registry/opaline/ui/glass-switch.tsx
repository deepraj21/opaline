"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { LiquidGlass } from "@/registry/opaline/ui/liquid-glass"

/**
 * iOS-style switch whose thumb turns into a liquid glass lens while pressed.
 */
function GlassSwitch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="glass-switch"
      className={cn(
        "peer group/switch relative inline-flex h-8 w-[60px] shrink-0 cursor-pointer items-center rounded-full p-[3px] transition-colors duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
        "shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] data-[state=checked]:bg-[oklch(0.72_0.19_148)] data-[state=unchecked]:bg-[oklch(0.5_0.01_286/0.22)] dark:data-[state=unchecked]:bg-[oklch(1_0_0/0.16)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb asChild>
        <LiquidGlass
          data-slot="glass-switch-thumb"
          bezel={10}
          refraction={22}
          className="pointer-events-none block h-[26px] w-[34px] rounded-full transition-[transform,width,height] duration-400 ease-[cubic-bezier(0.34,1.45,0.64,1)] group-active/switch:scale-[1.28] data-[state=checked]:translate-x-5"
        >
          <span className="absolute inset-0 rounded-full bg-white shadow-[0_2px_6px_rgb(0_0_0/0.2)] transition-opacity duration-300 group-active/switch:opacity-0" />
        </LiquidGlass>
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { GlassSwitch }
