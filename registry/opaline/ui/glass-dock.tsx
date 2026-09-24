"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { LiquidGlass } from "@/registry/opaline/ui/liquid-glass"

type DockContextValue = {
  mouseX: number | null
  size: number
  magnification: number
  distance: number
}

const DockContext = React.createContext<DockContextValue>({
  mouseX: null,
  size: 48,
  magnification: 1.6,
  distance: 140,
})

function GlassDock({
  className,
  children,
  size = 48,
  magnification = 1.6,
  distance = 140,
  ...props
}: React.ComponentProps<"div"> & {
  /** Resting icon size in px. */
  size?: number
  /** Scale of the icon directly under the cursor. */
  magnification?: number
  /** Radius of influence in px. */
  distance?: number
}) {
  const [mouseX, setMouseX] = React.useState<number | null>(null)

  return (
    <DockContext.Provider value={{ mouseX, size, magnification, distance }}>
      <LiquidGlass
        data-slot="glass-dock"
        role="toolbar"
        onPointerMove={(e) => e.pointerType === "mouse" && setMouseX(e.clientX)}
        onPointerLeave={() => setMouseX(null)}
        className={cn(
          "flex w-fit items-end gap-2 rounded-[26px] p-2",
          className
        )}
        {...props}
      >
        {children}
      </LiquidGlass>
    </DockContext.Provider>
  )
}

function GlassDockItem({
  className,
  children,
  label,
  active,
  style,
  ...props
}: React.ComponentProps<"button"> & {
  label?: string
  /** Shows the running-app indicator dot. */
  active?: boolean
}) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { mouseX, size, magnification, distance } = React.useContext(DockContext)
  const [center, setCenter] = React.useState<number | null>(null)

  React.useLayoutEffect(() => {
    if (mouseX === null || !ref.current) return setCenter(null)
    const r = ref.current.getBoundingClientRect()
    setCenter(r.left + r.width / 2)
  }, [mouseX])

  let scale = 1
  if (mouseX !== null && center !== null) {
    const d = Math.abs(mouseX - center)
    const t = Math.max(0, 1 - d / distance)
    // Smooth cosine falloff like the macOS dock.
    scale = 1 + (magnification - 1) * (0.5 - 0.5 * Math.cos(Math.PI * t))
  }
  const px = size * scale

  return (
    <button
      ref={ref}
      type="button"
      data-slot="glass-dock-item"
      aria-label={label}
      className={cn(
        "group/dock-item relative flex shrink-0 items-end justify-center outline-none",
        "transition-[width,height] duration-150 ease-out",
        className
      )}
      style={{ width: px, height: px, ...style }}
      {...props}
    >
      {label ? (
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 rounded-lg bg-(--glass-tint-frosted) px-2.5 py-1 text-xs font-medium whitespace-nowrap text-(--glass-foreground) opacity-0 shadow-(--glass-shadow) backdrop-blur-xl transition-[opacity,transform] duration-200 group-hover/dock-item:translate-y-0 group-hover/dock-item:opacity-100 group-focus-visible/dock-item:opacity-100">
          {label}
        </span>
      ) : null}
      <span className="flex size-full items-center justify-center overflow-hidden rounded-[22.5%] transition-transform duration-200 group-active/dock-item:scale-90 group-focus-visible/dock-item:ring-2 group-focus-visible/dock-item:ring-ring [&>*]:size-full">
        {children}
      </span>
      {active ? (
        <span className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-(--glass-foreground) opacity-70" />
      ) : null}
    </button>
  )
}

function GlassDockSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="glass-dock-separator"
      className={cn(
        "mx-1 w-px self-stretch bg-(--glass-foreground) opacity-15",
        className
      )}
      {...props}
    />
  )
}

export { GlassDock, GlassDockItem, GlassDockSeparator }
