"use client"

import { ArrowRightIcon, HeartIcon, MicIcon, PauseIcon, SearchIcon } from "lucide-react"

import { InstallBar } from "@/components/site/install-mode"
import { Wallpaper } from "@/components/site/wallpaper"
import { GlassBadge } from "@/registry/opaline/ui/glass-badge"
import { GlassButton } from "@/registry/opaline/ui/glass-button"
import { GlassInput } from "@/registry/opaline/ui/glass-input"
import { GlassLens } from "@/registry/opaline/ui/glass-lens"
import { ShimmerText } from "@/registry/opaline/ui/shimmer-text"

export function Hero() {
  return (
    <section className="flex flex-col items-center pt-32 text-center sm:pt-40">
      <GlassBadge
        dot="#34c759"
        className="mb-7 text-foreground"
        tint="color-mix(in oklch, var(--foreground) 4%, transparent)"
      >
        <ShimmerText>Now with Liquid Glass</ShimmerText>
      </GlassBadge>
      <h1 className="max-w-3xl text-[44px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-7xl">
        Interfaces that
        <br />
        bend the light.
      </h1>
      <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-pretty text-muted-foreground">
        Opaline is a liquid glass component library for React. Minimal,
        premium, and installable with the shadcn CLI.
      </p>
      <div className="mt-9 flex w-full justify-center">
        <InstallBar />
      </div>

      <div className="relative isolate mt-16 h-[460px] w-full overflow-hidden rounded-[36px] border border-border shadow-[0_30px_80px_-40px_rgb(0_0_0/0.45)] sm:h-[520px]">
        <Wallpaper name="bloom" className="-z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 flex items-center justify-center text-[22vw] leading-none font-bold tracking-[-0.07em] text-[#141418] select-none lg:text-[240px]"
        >
          Opaline
        </div>

        <GlassLens size={180} defaultPosition={{ x: 250, y: 110 }} />

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 px-4 [&>*]:pointer-events-auto">
          <GlassInput
            className="max-w-sm"
            placeholder="Search anything"
            aria-label="Search"
            startIcon={<SearchIcon />}
            endAdornment={<MicIcon />}
          />
          <div className="flex items-center gap-2.5">
            <GlassButton size="icon" aria-label="Like">
              <HeartIcon />
            </GlassButton>
            <GlassButton variant="prominent">
              Explore components <ArrowRightIcon />
            </GlassButton>
            <GlassButton size="icon" aria-label="Pause">
              <PauseIcon className="fill-current" />
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  )
}
