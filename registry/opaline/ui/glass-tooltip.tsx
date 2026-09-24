"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { LiquidGlass } from "@/registry/opaline/ui/liquid-glass"

function GlassTooltipProvider({
  delayDuration = 80,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
}

function GlassTooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <GlassTooltipProvider>
      <TooltipPrimitive.Root data-slot="glass-tooltip" {...props} />
    </GlassTooltipProvider>
  )
}

function GlassTooltipTrigger(
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>
) {
  return <TooltipPrimitive.Trigger data-slot="glass-tooltip-trigger" {...props} />
}

function GlassTooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content asChild sideOffset={sideOffset} {...props}>
        <LiquidGlass
          data-slot="glass-tooltip-content"
          variant="frosted"
          className={cn(
            "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-(--glass-foreground)",
            "duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)] data-[state=closed]:animate-out data-[state=closed]:zoom-out-75 data-[state=closed]:duration-100 data-[state=delayed-open]:animate-in data-[state=delayed-open]:zoom-in-50 data-[state=instant-open]:animate-in data-[state=instant-open]:zoom-in-50",
            className
          )}
        >
          {children}
        </LiquidGlass>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export {
  GlassTooltip,
  GlassTooltipTrigger,
  GlassTooltipContent,
  GlassTooltipProvider,
}
