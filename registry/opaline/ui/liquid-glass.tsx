"use client"

import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import {
  createDisplacementMap,
  supportsLiquidGlass,
} from "@/registry/opaline/lib/glass-refraction"

type LiquidGlassProps = React.ComponentProps<"div"> & {
  /** Refraction strength in px. Defaults to a value derived from the bezel. */
  refraction?: number
  /** Width of the refracting rim in px. Defaults to ~40% of the shortest side. */
  bezel?: number
  /** Backdrop blur in px. Liquid glass is mostly clear — keep this small. */
  blur?: number
  /** Backdrop saturation multiplier. */
  saturation?: number
  /** Chromatic dispersion at the rim (0 – 1). */
  dispersion?: number
  /** Overrides the surface tint colour (defaults to `--glass-tint`). */
  tint?: string
  /** `clear` refracts, `frosted` adds a heavier blur for legibility. */
  variant?: "clear" | "frosted"
  /** Draw the soft outer shadow. */
  shadow?: boolean
  /** Render the glass onto its only child element instead of a div. */
  asChild?: boolean
}

function useSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState({ width: 0, height: 0, radius: 0 })

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const width = el.offsetWidth
      const height = el.offsetHeight
      const radius = Math.min(
        parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0,
        width / 2,
        height / 2
      )
      setSize((s) =>
        s.width === width && s.height === height && s.radius === radius
          ? s
          : { width, height, radius }
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return size
}

function LiquidGlass({
  ref,
  className,
  style,
  children,
  refraction,
  bezel,
  blur,
  saturation = 1.6,
  dispersion = 0.12,
  tint,
  variant = "clear",
  shadow = true,
  asChild = false,
  ...props
}: LiquidGlassProps) {
  const Comp = asChild ? Slot.Root : "div"
  const innerRef = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

  const id = "lg" + React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const [enabled, setEnabled] = React.useState(false)
  React.useEffect(() => setEnabled(supportsLiquidGlass()), [])

  const { width, height, radius } = useSize(innerRef)
  const rim = bezel ?? Math.max(6, Math.min(Math.min(width, height) * 0.4, 32))
  const scale = refraction ?? rim * 1.6
  const blurPx = blur ?? (variant === "frosted" ? 10 : 1.5)

  const map = React.useMemo(
    () =>
      enabled && width > 0 && height > 0
        ? createDisplacementMap({ width, height, radius, bezel: rim })
        : "",
    [enabled, width, height, radius, rim]
  )

  const backdrop = map
    ? `url(#${id})`
    : `blur(${blur ?? (variant === "frosted" ? 14 : 8)}px) saturate(${saturation})`

  return (
    <Comp
      ref={innerRef}
      data-slot="liquid-glass"
      data-refracting={map ? "" : undefined}
      className={cn("relative isolate", className)}
      style={style}
      {...props}
    >
      <span
        aria-hidden
        data-slot="liquid-glass-backdrop"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
        style={{ backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}
      />
      <span
        aria-hidden
        data-slot="liquid-glass-tint"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 rounded-[inherit]",
          variant === "frosted"
            ? "bg-(--glass-tint-frosted)"
            : "bg-(--glass-tint)"
        )}
        style={tint ? { background: tint } : undefined}
      />
      <span
        aria-hidden
        data-slot="liquid-glass-rim"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] shadow-(--glass-rim)",
          shadow && "[box-shadow:var(--glass-rim),var(--glass-shadow)]"
        )}
      />
      {map ? (
        <svg
          aria-hidden
          width="0"
          height="0"
          className="pointer-events-none absolute size-0"
        >
          <filter
            id={id}
            x="0"
            y="0"
            width={width}
            height={height}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={blurPx}
              result="blur"
            />
            <feImage
              href={map}
              x="0"
              y="0"
              width={width}
              height={height}
              preserveAspectRatio="none"
              result="map"
            />
            {dispersion > 0 ? (
              <>
                <feDisplacementMap
                  in="blur"
                  in2="map"
                  scale={scale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="dr"
                />
                <feColorMatrix
                  in="dr"
                  type="matrix"
                  values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                  result="r"
                />
                <feDisplacementMap
                  in="blur"
                  in2="map"
                  scale={scale * (1 - dispersion)}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="dg"
                />
                <feColorMatrix
                  in="dg"
                  type="matrix"
                  values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                  result="g"
                />
                <feDisplacementMap
                  in="blur"
                  in2="map"
                  scale={scale * (1 - dispersion * 2)}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="db"
                />
                <feColorMatrix
                  in="db"
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                  result="b"
                />
                <feBlend in="r" in2="g" mode="screen" result="rg" />
                <feBlend in="rg" in2="b" mode="screen" result="refracted" />
              </>
            ) : (
              <feDisplacementMap
                in="blur"
                in2="map"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
                result="refracted"
              />
            )}
            <feColorMatrix
              in="refracted"
              type="saturate"
              values={String(saturation)}
            />
          </filter>
        </svg>
      ) : null}
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  )
}

export { LiquidGlass, type LiquidGlassProps }
