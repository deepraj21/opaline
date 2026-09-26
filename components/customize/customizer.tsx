"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { RefreshIcon } from "@hugeicons/core-free-icons"

import { attrs, changed, parseUsage, render } from "@/components/customize/code"
import { customizations, pinned } from "@/components/customize/configs"
import { Field } from "@/components/customize/controls"
import { glassControls, glassPresets } from "@/components/customize/glass"
import { highlightTsx, plainHtml } from "@/components/customize/highlight"
import type { Control, Customization, Preset, Values } from "@/components/customize/types"
import { Demo } from "@/components/demos"
import { demoMeta } from "@/components/demos/meta"
import { CodeFrame } from "@/components/site/code"
import { Wallpaper } from "@/components/site/wallpaper"
import { GlassSelect, GlassSelectContent, GlassSelectGroup, GlassSelectItem, GlassSelectLabel, GlassSelectTrigger, GlassSelectValue } from "@/registry/opaline/ui/glass-select"
import { cn } from "@/lib/utils"
import { itemsByName } from "@/registry/index"
import { LiquidGlassProvider } from "@/registry/opaline/ui/liquid-glass"

const CUSTOM = "Custom"

const defaults = (controls: Control[]): Values =>
  Object.fromEntries(controls.map((c) => [c.key, c.default]))

/** Resolves which controls a component gets: its own, plus the glass ones it supports. */
export function useControls(name: string) {
  const item = itemsByName[name]
  const config: Customization = customizations[name] ?? {}
  const own = config.controls ?? []
  const hidden = [...(pinned[name] ?? []), ...((config.glass && config.glass.exclude) || [])]
  const glass =
    item?.glass && config.glass !== false ? glassControls.filter((c) => !hidden.includes(c.key)) : []
  return { item, config, own, glass }
}

/**
 * Live preview with a control panel: tweak props and glass optics, pick a
 * preset, and copy the code. Components without a dedicated config still get
 * the shared glass controls around their demo.
 */
export function Customizer({
  name,
  demoCode,
  demoHtml,
}: {
  name: string
  demoCode: string
  demoHtml: string
}) {
  const { item, config, own, glass } = useControls(name)
  const all = React.useMemo(() => [...own, ...glass], [own, glass])
  const initial = React.useMemo(() => defaults(all), [all])
  const [values, setValues] = React.useState<Values>(initial)
  const [preset, setPreset] = React.useState<string>(CUSTOM)

  const presets: { group: string; list: Preset[] }[] = [
    { group: item?.title ?? "Component", list: config.presets ?? [] },
    { group: "Glass", list: glass.length ? glassPresets : [] },
  ].filter((g) => g.list.length)

  const set = (key: string, value: Values[string]) => {
    setValues((v) => ({ ...v, [key]: value }))
    setPreset(CUSTOM)
  }
  const apply = (label: string) => {
    const p = presets.flatMap((g) => g.list).find((p) => p.name === label)
    if (!p) return
    setValues({ ...initial, ...p.values })
    setPreset(label)
  }
  const reset = () => {
    setValues(initial)
    setPreset(CUSTOM)
  }
  const dirty = all.some((c) => values[c.key] !== c.default)

  // Glass settings travel through the provider, or straight onto the component.
  const glassProps = changed(glass, values)
  const viaProps = config.glassMode === "props"
  const remountKey = own
    .filter((c) => c.remount)
    .map((c) => String(values[c.key]))
    .join("|")

  const preview = config.render ? config.render(values, viaProps ? glassProps : {}) : <Demo name={name} />

  const code = React.useMemo(() => {
    const glassAttrs = attrs(glass, values)
    const provider = viaProps ? [] : glassAttrs
    if (config.code)
      return render(
        config.code(values, (keys) => attrs(own, values, keys), viaProps ? glassAttrs : []),
        provider
      )
    return item?.usage ? render(parseUsage(item.usage), provider) : ""
  }, [config, glass, own, values, viaProps, item])

  const [html, setHtml] = React.useState(() => plainHtml(code))
  React.useEffect(() => {
    let live = true
    setHtml(plainHtml(code))
    highlightTsx(code).then((h) => live && setHtml(h))
    return () => {
      live = false
    }
  }, [code])

  const [tab, setTab] = React.useState<"code" | "demo">("code")
  const meta = demoMeta[name] ?? {}

  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-card">
      <div
        className={cn(
          "relative isolate flex min-h-[380px] items-center justify-center overflow-hidden p-8",
          !meta.wallpaper &&
            "bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px]",
          meta.stage
        )}
      >
        {meta.wallpaper ? (
          <Wallpaper name={meta.wallpaper} className="-z-10 dark:brightness-[0.8]" />
        ) : null}
        <LiquidGlassProvider {...(viaProps ? {} : glassProps)}>
          <React.Fragment key={remountKey}>{preview}</React.Fragment>
        </LiquidGlassProvider>
      </div>

      {all.length ? (
        <section aria-label="Customize" className="flex flex-col gap-4 border-t border-border p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[15px] font-semibold tracking-[-0.01em]">Customize</h2>
            <div className="flex items-center gap-2">
              {presets.length ? (
                <div className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                  <span id={`${name}-preset-label`}>Preset</span>
                  <GlassSelect value={preset} onValueChange={(v) => apply(v)}>
                    <GlassSelectTrigger
                      className="h-8 w-auto min-w-28 rounded-lg text-[13px]"
                      aria-labelledby={`${name}-preset-label`}
                    >
                      <GlassSelectValue />
                    </GlassSelectTrigger>
                    <GlassSelectContent>
                      <GlassSelectItem value={CUSTOM} disabled>
                        {CUSTOM}
                      </GlassSelectItem>
                      {presets.map((g) => (
                        <GlassSelectGroup key={g.group}>
                          <GlassSelectLabel>{g.group}</GlassSelectLabel>
                          {g.list.map((p) => (
                            <GlassSelectItem key={p.name} value={p.name}>
                              {p.name}
                            </GlassSelectItem>
                          ))}
                        </GlassSelectGroup>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                </div>
              ) : null}
              <button
                type="button"
                onClick={reset}
                disabled={!dirty}
                className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-[13px] transition-opacity disabled:cursor-default disabled:opacity-40"
              >
                <HugeiconsIcon icon={RefreshIcon} className="size-3.5" />
                Reset
              </button>
            </div>
          </div>

          {own.length ? <Group title="Component" controls={own} values={values} set={set} /> : null}
          {glass.length ? <Group title="Glass" controls={glass} values={values} set={set} /> : null}
        </section>
      ) : null}

      {code || demoCode ? (
        <CodeFrame
          html={tab === "code" && code ? html : demoHtml}
          code={tab === "code" && code ? code : demoCode}
          className="rounded-none border-x-0 border-b-0"
          bodyClassName="max-h-[420px]"
          title={
            <div role="tablist" className="flex items-center gap-1">
              {code ? <Tab active={tab === "code"} onClick={() => setTab("code")}>Code</Tab> : null}
              {demoCode ? <Tab active={tab === "demo" || !code} onClick={() => setTab("demo")}>Demo source</Tab> : null}
            </div>
          }
        />
      ) : null}
    </div>
  )
}

function Group({
  title,
  controls,
  values,
  set,
}: {
  title: string
  controls: Control[]
  values: Values
  set: (key: string, value: Values[string]) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[11.5px] font-semibold tracking-[0.04em] text-muted-foreground uppercase">{title}</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {controls.map((c) => (
          <Field key={c.key} control={c} value={values[c.key] ?? null} onChange={(v) => set(c.key, v)} />
        ))}
      </div>
    </div>
  )
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "h-7 cursor-pointer rounded-md px-2.5 text-[12.5px] font-medium transition-colors",
        active ? "bg-foreground/[0.07] text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}

const typeOf = (c: Control) =>
  c.type ??
  (c.kind === "select"
    ? c.options.map((o) => JSON.stringify(typeof o === "string" ? o : o.value)).join(" | ")
    : c.kind === "color" || c.kind === "text"
      ? "string"
      : c.kind)

const defaultOf = (c: Control) =>
  c.default === null
    ? ("auto" in c && c.auto) || "—"
    : typeof c.default === "string"
      ? JSON.stringify(c.default)
      : String(c.default)

/** Props table generated from the same schema that drives the controls. */
export function PropsTable({ name }: { name: string }) {
  const { own, glass } = useControls(name)
  const rows = [
    ...own.map((c) => ({ c, inherited: false })),
    ...glass.map((c) => ({ c, inherited: true })),
  ]
  if (!rows.length) return null
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">Props</h2>
        <span className="text-[13px] text-muted-foreground">{rows.length} properties</span>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[560px] text-left text-[13px]">
          <thead className="bg-muted/40 text-[12px] text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">Prop</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Default</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ c, inherited }) => (
              <tr key={c.key} className="border-t border-border align-top">
                <td className="px-4 py-2.5 font-mono text-[12.5px] font-medium whitespace-nowrap">
                  {c.key}
                  {inherited ? (
                    <span className="ml-1.5 rounded bg-foreground/[0.06] px-1 py-px font-sans text-[10.5px] font-normal text-muted-foreground">
                      glass
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-2.5 font-mono text-[12px] text-muted-foreground">{typeOf(c)}</td>
                <td className="px-4 py-2.5 font-mono text-[12px] whitespace-nowrap text-muted-foreground">
                  {defaultOf(c)}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{c.description ?? c.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {glass.length ? (
        <p className="text-[13px] text-muted-foreground">
          Props marked <span className="font-medium text-foreground">glass</span> are the optics of{" "}
          <code className="font-mono text-[12.5px]">LiquidGlass</code>. Pass them to{" "}
          <code className="font-mono text-[12.5px]">LiquidGlassProvider</code> to style every surface
          inside it, including a component&apos;s inner bubbles and thumbs.
        </p>
      ) : null}
    </section>
  )
}
