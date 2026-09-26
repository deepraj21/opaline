"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { AlertCircleIcon, CircleCheckIcon, InfoIcon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { LiquidGlass } from "@/registry/opaline/ui/liquid-glass"

type ToastVariant = "default" | "success" | "error" | "info"

type ToastOptions = {
  description?: React.ReactNode
  icon?: React.ReactNode
  variant?: ToastVariant
  /** Milliseconds before auto-dismiss. `Infinity` keeps it open. */
  duration?: number
  action?: { label: string; onClick: () => void }
}

type ToastData = ToastOptions & {
  id: number
  title: React.ReactNode
  leaving?: boolean
}

let toasts: ToastData[] = []
let nextId = 1
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function dismiss(id: number) {
  toasts = toasts.map((t) => (t.id === id ? { ...t, leaving: true } : t))
  emit()
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    emit()
  }, 220)
}

/** Show a glass toast. Returns its id. */
function toast(title: React.ReactNode, options: ToastOptions = {}) {
  const id = nextId++
  toasts = [{ id, title, ...options }, ...toasts].slice(0, 5)
  emit()
  return id
}
toast.success = (title: React.ReactNode, o: ToastOptions = {}) =>
  toast(title, { ...o, variant: "success" })
toast.error = (title: React.ReactNode, o: ToastOptions = {}) =>
  toast(title, { ...o, variant: "error" })
toast.info = (title: React.ReactNode, o: ToastOptions = {}) =>
  toast(title, { ...o, variant: "info" })
toast.dismiss = dismiss

const icons: Record<ToastVariant, React.ReactNode> = {
  default: null,
  success: <HugeiconsIcon icon={CircleCheckIcon} className="text-[#34c759]" />,
  error: <HugeiconsIcon icon={AlertCircleIcon} className="text-[#ff3b30]" />,
  info: <HugeiconsIcon icon={InfoIcon} className="text-[#0a84ff]" />,
}

function ToastItem({
  data,
  index,
  ref,
}: {
  data: ToastData
  index: number
  ref?: React.Ref<HTMLLIElement>
}) {
  const { id, title, description, variant = "default", icon, action, leaving } = data
  const duration = data.duration ?? 4000
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (paused || leaving || !Number.isFinite(duration)) return
    const timer = setTimeout(() => dismiss(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, paused, leaving])

  const glyph = icon ?? icons[variant]

  return (
    <li
      ref={ref}
      className={cn(
        "pointer-events-auto w-full transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]",
        "[--glass-enter-scale:0.75] [--glass-enter-y:-140%] [--glass-exit-scale:0.75] [--glass-exit-y:-140%]",
        leaving
          ? "animate-[opaline-glass-out_200ms_ease-in_forwards]"
          : "animate-[opaline-glass-in_520ms_cubic-bezier(0.34,1.3,0.64,1)]"
      )}
      style={{ zIndex: 100 - index }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <LiquidGlass
        role="status"
        variant="frosted"
        className="flex items-center gap-3 rounded-[24px] py-3 pr-3 pl-4 text-(--glass-foreground) [&_svg]:size-5 [&_svg]:shrink-0"
      >
        {glyph}
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold tracking-[-0.015em]">{title}</div>
          {description ? (
            <div className="text-[13px] leading-snug opacity-70">{description}</div>
          ) : null}
        </div>
        {action ? (
          <button
            type="button"
            onClick={() => {
              action.onClick()
              dismiss(id)
            }}
            className="shrink-0 cursor-pointer rounded-full bg-(--glass-highlight) px-3 py-1.5 text-[13px] font-semibold transition-transform active:scale-95"
          >
            {action.label}
          </button>
        ) : null}
      </LiquidGlass>
    </li>
  )
}

/** Mount once near the root of your app. */
function GlassToaster({
  className,
  position = "top",
}: {
  className?: string
  position?: "top" | "bottom"
}) {
  const list = React.useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => toasts,
    () => toasts
  )

  // FLIP the stack: when toasts are added or removed the survivors reflow
  // instantly, so glide each one from its previous top to its new one.
  const itemEls = React.useRef(new Map<number, HTMLLIElement>())
  const prevTops = React.useRef(new Map<number, number>())
  React.useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const seen = new Set<number>()
    for (const t of list) {
      const el = itemEls.current.get(t.id)
      if (!el) continue
      seen.add(t.id)
      const top = el.getBoundingClientRect().top
      const prev = prevTops.current.get(t.id)
      if (prev !== undefined && !reduce && Math.abs(top - prev) > 1) {
        el.animate(
          [{ transform: `translateY(${prev - top}px)` }, { transform: "translateY(0)" }],
          { duration: 450, easing: "cubic-bezier(0.34,1.25,0.64,1)" }
        )
      }
      prevTops.current.set(t.id, top)
    }
    for (const id of [...itemEls.current.keys()]) {
      if (!seen.has(id)) {
        itemEls.current.delete(id)
        prevTops.current.delete(id)
      }
    }
  })

  return (
    <ol
      data-slot="glass-toaster"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed inset-x-0 z-[100] mx-auto flex w-[min(24rem,calc(100%-2rem))] gap-2",
        position === "top" ? "top-4 flex-col" : "bottom-4 flex-col-reverse",
        className
      )}
    >
      {list.map((t, i) => (
        <ToastItem
          key={t.id}
          data={t}
          index={i}
          ref={(el) => {
            if (el) itemEls.current.set(t.id, el)
          }}
        />
      ))}
    </ol>
  )
}

export { GlassToaster, toast }
