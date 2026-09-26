"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, HeartIcon, Mic01Icon, PauseIcon, PlayIcon, Search01Icon } from "@hugeicons/core-free-icons"

import { InstallBar } from "@/components/site/install-mode"
import { Wallpaper } from "@/components/site/wallpaper"
import { GlassBadge } from "@/registry/opaline/ui/glass-badge"
import { GlassButton } from "@/registry/opaline/ui/glass-button"
import { GlassInput } from "@/registry/opaline/ui/glass-input"
import { GlassLens } from "@/registry/opaline/ui/glass-lens"

export function Hero() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = React.useState(false)

  const toggleVideo = React.useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play().then(() => setPaused(false)).catch(() => setPaused(false))
    } else {
      video.pause()
      setPaused(true)
    }
  }, [])

  return (
    <section className="flex flex-col items-center pt-32 text-center sm:pt-40">
      <GlassBadge
        dot="#34c759"
        className="mb-7 text-foreground"
        tint="color-mix(in oklch, var(--foreground) 4%, transparent)"
      >
        Now with Liquid Glass
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
        <Wallpaper name="hero" videoRef={videoRef} className="-z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 flex items-center justify-center text-[22vw] leading-none font-bold tracking-[-0.07em] text-[#141418] select-none lg:text-[240px]"
        >
          Opaline
        </div>

        <GlassLens size={180} defaultPosition={{ x: 250, y: 110 }} />

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 px-4 [&>*]:pointer-events-auto">
          {/* <GlassInput
            className="max-w-sm"
            placeholder="Search anything"
            aria-label="Search"
            startIcon={<HugeiconsIcon icon={Search01Icon} />}
            endAdornment={<HugeiconsIcon icon={Mic01Icon} />}
          /> */}
          <div className="flex items-center gap-2.5">
            <GlassButton size="icon" aria-label="Like">
              <HugeiconsIcon icon={HeartIcon} />
            </GlassButton>
            <GlassButton variant="prominent" asChild>
              <a href="#components">
                Explore components <HugeiconsIcon icon={ArrowRight01Icon} />
              </a>
            </GlassButton>
            <GlassButton size="icon" aria-label={paused ? "Play" : "Pause"} aria-pressed={paused} onClick={toggleVideo}>
              {paused ? <HugeiconsIcon icon={PlayIcon} className="fill-current" /> : <HugeiconsIcon icon={PauseIcon} className="fill-current" />}
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  )
}
