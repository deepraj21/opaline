"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import type { Control, Value } from "@/components/customize/types"
import { ColorPopover } from "@/components/customize/color-picker"
import { cn } from "@/lib/utils"
import { GlassSlider } from "@/registry/opaline/ui/glass-slider"
import { AnimatePresence } from "motion/react"
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/registry/opaline/ui/glass-select"

const round = (v: number, step = 1) => {
  const digits = Math.max(0, -Math.floor(Math.log10(step)))
  return v.toFixed(Math.min(digits, 3))
}

export function Field({
  control,
  value,
  onChange,
}: {
  control: Control
  value: Value
  onChange: (value: Value) => void
}) {
  const id = React.useId()
  if (control.kind === "color") {
    return <ColorField control={control} value={value} onChange={onChange} />
  }
  const readout =
    control.kind === "number"
      ? value === null
        ? control.auto
        : `${round(Number(value), control.step)}${control.unit ?? ""}`
      : null

  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-2xl border border-border bg-background/60 px-3.5 py-3">
      <div className="flex items-center justify-between gap-2 text-[12.5px]">
        <label htmlFor={id} className="truncate font-medium text-foreground">
          {control.label}
        </label>
        {readout ? (
          <span className="flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums">
            {readout}
            {control.kind === "number" && control.auto && value !== null ? (
              <ClearButton label={`Reset ${control.label} to ${control.auto}`} onClick={() => onChange(null)} />
            ) : null}
          </span>
        ) : null}
      </div>
      <Input id={id} control={control} value={value} onChange={onChange} />
    </div>
  )
}

function ColorField({
  control,
  value,
  onChange,
}: {
  control: Extract<Control, { kind: "color" }>
  value: Value
  onChange: (value: Value) => void
}) {
  const v = typeof value === "string" ? value : null
  const [open, setOpen] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const popoverId = React.useId()
  const close = React.useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-2xl border border-border bg-background/60 px-3.5 py-3">
      <div className="flex items-center justify-between gap-2 text-[12.5px]">
        <span className="truncate font-medium text-foreground">{control.label}</span>
        <span className="flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums">
          {v ?? control.auto ?? ""}
          {control.auto && v !== null ? (
            <ClearButton label={`Reset ${control.label} to ${control.auto}`} onClick={() => onChange(null)} />
          ) : null}
        </span>
      </div>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? popoverId : undefined}
        aria-label={`${control.label} color`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-full cursor-pointer items-center justify-between rounded-lg bg-muted/60 px-3 transition-colors outline-none hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <span className="font-mono text-[12px] text-muted-foreground tabular-nums">
          {v ?? control.auto ?? "—"}
        </span>
        <span
          className="size-4.5 shrink-0 rounded-full border border-border/70"
          style={{ background: v ?? "transparent" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <ColorPopover
            id={popoverId}
            anchorRef={toggleRef}
            value={v ?? "#ffffff"}
            onValueChange={(hex) => onChange(hex)}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ClearButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-4 cursor-pointer place-items-center rounded-full text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
    >
      <HugeiconsIcon icon={Cancel01Icon} className="size-3" />
    </button>
  )
}

function Input({
  id,
  control: c,
  value,
  onChange,
}: {
  id: string
  control: Control
  value: Value
  onChange: (value: Value) => void
}) {
  switch (c.kind) {
    case "number": {
      const v = value === null ? (c.default ?? (c.min + c.max) / 2) : Number(value)
      return (
        <GlassSlider
          min={c.min}
          max={c.max}
          step={c.step ?? 1}
          value={[v]}
          onValueChange={([n]) => onChange(n ?? v)}
          aria-label={c.label}
          className={cn(value === null && "opacity-50")}
        />
      )
    }
    case "select":
      return (
        <GlassSelect value={String(value)} onValueChange={(v) => onChange(v)}>
          <GlassSelectTrigger
            id={id}
            className="h-8 min-w-0 rounded-xl text-[13px]"
            aria-label={c.label}
          >
            <GlassSelectValue />
          </GlassSelectTrigger>
          <GlassSelectContent>
            {c.options.map((o) => {
              const opt = typeof o === "string" ? { value: o, label: o } : o
              return (
                <GlassSelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </GlassSelectItem>
              )
            })}
          </GlassSelectContent>
        </GlassSelect>
      )
    case "boolean":
      return (
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className="flex h-8 cursor-pointer items-center justify-between rounded-lg border border-border bg-background px-2.5 text-[13px] text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {value ? "On" : "Off"}
          <span
            className={cn(
              "relative h-[18px] w-8 rounded-full transition-colors",
              value ? "bg-[oklch(0.72_0.19_148)]" : "bg-foreground/15"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-3.5 rounded-full bg-white shadow transition-transform duration-200",
                value && "translate-x-3.5"
              )}
            />
          </span>
        </button>
      )
    case "text":
      return (
        <input
          id={id}
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full rounded-lg border border-border bg-background px-2.5 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      )
  }
}
