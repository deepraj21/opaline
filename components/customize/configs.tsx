"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Mic01Icon, Search01Icon } from "@hugeicons/core-free-icons"

import { element, openTag } from "@/components/customize/code"
import type { Control, Customization, Values } from "@/components/customize/types"
import { GlassBadge } from "@/registry/opaline/ui/glass-badge"
import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/registry/opaline/ui/glass-card"
import { GlassClock } from "@/registry/opaline/ui/glass-clock"
import { GlassInput } from "@/registry/opaline/ui/glass-input"
import { GlassKnob } from "@/registry/opaline/ui/glass-knob"
import { GlassLens } from "@/registry/opaline/ui/glass-lens"
import { GlassOTP } from "@/registry/opaline/ui/glass-otp"
import { GlassSlider } from "@/registry/opaline/ui/glass-slider"
import { GlassStepper } from "@/registry/opaline/ui/glass-stepper"
import { GlassSwitch } from "@/registry/opaline/ui/glass-switch"
import { GlassText } from "@/registry/opaline/ui/glass-text"
import { GlassWidget, type WidgetSize } from "@/registry/opaline/ui/glass-widget"
import { LiquidGlass } from "@/registry/opaline/ui/liquid-glass"

const ui = (name: string, ...names: string[]) =>
  `import { ${names.join(", ")} } from "@/components/ui/${name}"`

const text = (key: string, label: string, value: string, description?: string): Control => ({
  kind: "text",
  key,
  label,
  default: value,
  description,
  type: key === "children" ? "ReactNode" : "string",
})

const num = (
  key: string,
  label: string,
  value: number,
  min: number,
  max: number,
  extra: Partial<Extract<Control, { kind: "number" }>> = {}
): Control => ({ kind: "number", key, label, default: value, min, max, ...extra })

const s = (v: Values, k: string) => String(v[k] ?? "")
const n = (v: Values, k: string) => Number(v[k])
const b = (v: Values, k: string) => Boolean(v[k])

/**
 * Glass settings a component pins on its own surface (e.g. a widget is always
 * frosted), so a provider can't change them. Their controls are hidden.
 */
export const pinned: Record<string, string[]> = {
  "glass-badge": ["bezel"],
  "glass-card": ["variant"],
  "glass-clock": ["bezel"],
  "glass-command": ["variant"],
  "glass-context-menu": ["variant"],
  "glass-control-center": ["bezel"],
  "glass-date-picker": ["variant"],
  "glass-dialog": ["variant"],
  "glass-dock": ["bezel", "variant"],
  "glass-knob": ["bezel"],
  "glass-lens": ["bezel", "thickness"],
  "glass-menu": ["variant"],
  "glass-notification": ["variant"],
  "glass-player": ["variant"],
  "glass-popover": ["variant"],
  "glass-select": ["variant"],
  "glass-sheet": ["variant"],
  "glass-sidebar": ["variant"],
  "glass-slider": ["bezel", "thickness"],
  "glass-stack": ["variant"],
  "glass-switch": ["bezel", "thickness"],
  "glass-toast": ["variant"],
  "glass-tooltip": ["variant"],
  "glass-widget": ["bezel", "variant"],
  "glass-widget-battery": ["bezel", "variant"],
  "glass-widget-calendar": ["bezel", "variant"],
  "glass-widget-weather": ["bezel", "variant"],
}

export const customizations: Record<string, Customization> = {
  "liquid-glass": {
    glassMode: "props",
    controls: [
      num("width", "Width", 220, 60, 360, { unit: "px", description: "Preview only — size it with classes." }),
      num("height", "Height", 150, 40, 300, { unit: "px", description: "Preview only — size it with classes." }),
      num("radius", "Corner radius", 44, 0, 150, { unit: "px", description: "Preview only — any `rounded-*` class works." }),
      text("children", "Label", "Liquid Glass"),
    ],
    presets: [
      { name: "Pill", values: { width: 260, height: 88, radius: 44 } },
      { name: "Orb", values: { width: 180, height: 180, radius: 90, surface: "circle", thickness: 1.8 } },
      { name: "Tile", values: { width: 200, height: 200, radius: 48 } },
    ],
    render: (v, glass) => (
      <LiquidGlass
        {...glass}
        className="grid place-items-center text-[15px] font-semibold tracking-[-0.01em] text-(--glass-foreground)"
        style={{ width: n(v, "width"), height: n(v, "height"), borderRadius: n(v, "radius") }}
      >
        {s(v, "children")}
      </LiquidGlass>
    ),
    code: (v, _, glass) => ({
      imports: [ui("liquid-glass", "LiquidGlass")],
      jsx: element(
        "LiquidGlass",
        [
          ...glass,
          `className="grid h-[${n(v, "height")}px] w-[${n(v, "width")}px] place-items-center rounded-[${n(v, "radius")}px]"`,
        ],
        s(v, "children")
      ),
    }),
  },

  "glass-button": {
    controls: [
      {
        kind: "select",
        key: "variant",
        label: "Variant",
        default: "default",
        options: ["default", "prominent", "destructive"],
        type: '"default" | "prominent" | "destructive"',
      },
      {
        kind: "select",
        key: "size",
        label: "Size",
        default: "default",
        options: ["sm", "default", "lg"],
        type: '"sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"',
      },
      text("children", "Label", "Get started"),
      { kind: "boolean", key: "icon", label: "Trailing icon", default: true, description: "Preview only." },
    ],
    glass: { exclude: ["variant"] },
    presets: [
      { name: "Prominent", values: { variant: "prominent" } },
      { name: "Destructive", values: { variant: "destructive", children: "Delete", icon: false } },
      { name: "Large bubble", values: { size: "lg", surface: "lip", specular: 0.6 } },
    ],
    render: (v) => (
      <GlassButton variant={s(v, "variant") as "default"} size={s(v, "size") as "default"}>
        {s(v, "children")}
        {b(v, "icon") ? <HugeiconsIcon icon={ArrowRight01Icon} /> : null}
      </GlassButton>
    ),
    code: (v, attrs) => ({
      imports: b(v, "icon")
        ? [
            'import { HugeiconsIcon } from "@hugeicons/react"',
            'import { ArrowRight01Icon } from "@hugeicons/core-free-icons"',
            ui("glass-button", "GlassButton"),
          ]
        : [ui("glass-button", "GlassButton")],
      jsx: element(
        "GlassButton",
        attrs(["variant", "size"]),
        b(v, "icon") ? `${s(v, "children")} <HugeiconsIcon icon={ArrowRight01Icon} />` : s(v, "children")
      ),
    }),
  },

  "glass-badge": {
    controls: [
      text("children", "Label", "Live"),
      {
        kind: "color",
        key: "dot",
        label: "Status dot",
        default: "#34c759",
        auto: "None",
        description: "Colour of an optional glowing status dot.",
        type: "string",
      },
    ],
    presets: [
      { name: "Recording", values: { children: "Recording", dot: "#ff3b30" } },
      { name: "Syncing", values: { children: "Syncing", dot: "#ff9f0a" } },
      { name: "Plain", values: { children: "v1.0", dot: null } },
    ],
    render: (v) => (
      <GlassBadge dot={v.dot ? s(v, "dot") : undefined} className="scale-150">
        {s(v, "children")}
      </GlassBadge>
    ),
    code: (v) => ({
      imports: [ui("glass-badge", "GlassBadge")],
      jsx: element("GlassBadge", v.dot ? [`dot="${s(v, "dot")}"`] : [], s(v, "children")),
    }),
  },

  "glass-card": {
    controls: [
      {
        kind: "select",
        key: "variant",
        label: "Material",
        default: "frosted",
        options: ["frosted", "clear"],
        type: '"frosted" | "clear"',
      },
      text("title", "Title", "72°"),
      text("description", "Description", "Cupertino"),
    ],
    presets: [
      { name: "Clear", values: { variant: "clear" } },
      { name: "Thick crystal", values: { ior: 1.9, thickness: 2.1, specular: 0.5 } },
    ],
    render: (v) => (
      <GlassCard variant={s(v, "variant") as "frosted"} className="w-full max-w-[280px]">
        <GlassCardHeader>
          <GlassCardDescription className="font-medium">{s(v, "description")}</GlassCardDescription>
          <GlassCardTitle className="text-5xl font-light tracking-[-0.04em]">{s(v, "title")}</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent className="text-[13px] opacity-70">Mostly sunny until 6 PM.</GlassCardContent>
      </GlassCard>
    ),
    code: (v, attrs) => ({
      imports: [
        ui("glass-card", "GlassCard", "GlassCardHeader", "GlassCardTitle", "GlassCardDescription", "GlassCardContent"),
      ],
      jsx: element(
        "GlassCard",
        attrs(["variant"]),
        [
          element(
            "GlassCardHeader",
            [],
            [
              element("GlassCardDescription", [], s(v, "description")),
              element("GlassCardTitle", [], s(v, "title")),
            ].join("\n")
          ),
          element("GlassCardContent", [], "Mostly sunny until 6 PM."),
        ].join("\n")
      ),
    }),
  },

  "glass-lens": {
    controls: [num("size", "Size", 150, 60, 260, { unit: "px", step: 2, remount: true })],
    presets: [
      { name: "Magnifier", values: { size: 190, ior: 1.9, dispersion: 0.25 } },
      { name: "Droplet", values: { size: 100, surface: "circle", ior: 1.33 } },
    ],
    render: (v) => (
      <div className="relative h-[300px] w-full">
        <GlassLens size={n(v, "size")} defaultPosition={{ x: 60, y: 60 }} />
      </div>
    ),
    code: (v, attrs) => ({
      imports: [ui("glass-lens", "GlassLens")],
      jsx: element("div", ['className="relative h-80"'], openTag("GlassLens", attrs(), true)),
    }),
  },

  "glass-clock": {
    controls: [
      num("size", "Size", 168, 100, 260, { unit: "px", step: 2 }),
      {
        kind: "select",
        key: "timeZone",
        label: "Time zone",
        default: "",
        options: [
          { value: "", label: "Local" },
          "America/New_York",
          "Europe/London",
          "Asia/Kolkata",
          "Asia/Tokyo",
          "Australia/Sydney",
        ],
        type: "string",
        description: "IANA time zone. Defaults to the local zone.",
      },
      text("label", "Label", "", "Caption under the centre, e.g. a city name."),
      { kind: "boolean", key: "seconds", label: "Seconds hand", default: true },
    ],
    presets: [{ name: "Tokyo", values: { timeZone: "Asia/Tokyo", label: "Tokyo" } }],
    render: (v) => (
      <GlassClock
        size={n(v, "size")}
        timeZone={s(v, "timeZone") || undefined}
        label={s(v, "label") || undefined}
        seconds={b(v, "seconds")}
      />
    ),
    code: (_, attrs) => ({
      imports: [ui("glass-clock", "GlassClock")],
      jsx: openTag("GlassClock", attrs(), true),
    }),
  },

  "glass-knob": {
    controls: [
      num("defaultValue", "Value", 64, 0, 100, { remount: true, description: "Initial value (uncontrolled)." }),
      num("size", "Size", 132, 80, 220, { unit: "px", step: 2 }),
      {
        kind: "color",
        key: "color",
        label: "Arc colour",
        default: "oklch(0.72 0.17 255)",
        type: "string",
      },
      text("label", "Label", "Value"),
    ],
    presets: [
      { name: "Volume", values: { label: "Volume", defaultValue: 64 } },
      { name: "Heat", values: { label: "Heat", color: "#ff9f0a", defaultValue: 80 } },
    ],
    render: (v) => (
      <GlassKnob
        defaultValue={n(v, "defaultValue")}
        size={n(v, "size")}
        color={s(v, "color")}
        label={s(v, "label")}
      />
    ),
    code: (_, attrs) => ({
      imports: [ui("glass-knob", "GlassKnob")],
      jsx: openTag("GlassKnob", attrs(), true),
    }),
  },

  "glass-text": {
    glass: false,
    controls: [
      text("children", "Text", "Opaline"),
      num("bevel", "Bevel", 12, 2, 30, { unit: "px", description: "Width of the rounded glyph edge in px." }),
      num("refraction", "Refraction", 22, 0, 60, { unit: "px", description: "How strongly the glyphs bend the backdrop." }),
      num("dispersion", "Dispersion", 0.06, 0, 0.4, { step: 0.01, description: "Chromatic dispersion at the glyph edges." }),
      { kind: "boolean", key: "shine", label: "Shine", default: true, description: "Animate a soft specular sweep." },
      { kind: "color", key: "tint", label: "Fill", default: "oklch(1 0 0 / 0.08)", type: "string", description: "Colour filling the glyphs." },
      num("fontSize", "Font size", 104, 40, 160, { unit: "px", description: "Preview only — style the text with classes." }),
    ],
    presets: [
      { name: "Subtle", values: { bevel: 7, refraction: 12, shine: false } },
      { name: "Deep", values: { bevel: 20, refraction: 44, dispersion: 0.2 } },
    ],
    render: (v) => (
      <GlassText
        key={s(v, "children")}
        bevel={n(v, "bevel")}
        refraction={n(v, "refraction")}
        dispersion={n(v, "dispersion")}
        shine={b(v, "shine")}
        tint={s(v, "tint")}
        className="leading-none font-black tracking-[-0.055em]"
        style={{ fontSize: n(v, "fontSize") }}
      >
        {s(v, "children") || " "}
      </GlassText>
    ),
    code: (v, attrs) => ({
      imports: [ui("glass-text", "GlassText")],
      jsx: element(
        "GlassText",
        [
          ...attrs(["bevel", "refraction", "dispersion", "shine", "tint"]),
          `className="text-[${n(v, "fontSize")}px] font-black tracking-[-0.055em]"`,
        ],
        s(v, "children")
      ),
    }),
  },

  "glass-widget": {
    controls: [
      {
        kind: "select",
        key: "size",
        label: "Size",
        default: "small",
        options: ["small", "medium", "large"],
        type: '"small" | "medium" | "large"',
      },
      {
        kind: "select",
        key: "variant",
        label: "Material",
        default: "frosted",
        options: ["frosted", "clear"],
        type: '"frosted" | "clear"',
      },
    ],
    render: (v) => (
      <GlassWidget size={s(v, "size") as WidgetSize} variant={s(v, "variant") as "frosted"} className="justify-between">
        <span className="text-[12px] font-semibold tracking-wide uppercase opacity-60">{s(v, "size")}</span>
        <span className="text-[34px] leading-none font-light tracking-[-0.04em]">Widget</span>
      </GlassWidget>
    ),
    code: (_, attrs) => ({
      imports: [ui("glass-widget", "GlassWidget")],
      jsx: element("GlassWidget", attrs(), "…"),
    }),
  },

  "glass-slider": {
    controls: [
      num("value", "Value", 62, 0, 100, { remount: true, type: "number[]", description: "Initial value (`defaultValue`)." }),
      num("step", "Step", 1, 1, 25),
    ],
    presets: [{ name: "Droplet thumb", values: { surface: "circle", ior: 1.33, specular: 0.5 } }],
    render: (v) => (
      <GlassSlider
        className="max-w-[280px]"
        defaultValue={[n(v, "value")]}
        step={n(v, "step")}
        aria-label="Volume"
      />
    ),
    code: (v, attrs) => ({
      imports: [ui("glass-slider", "GlassSlider")],
      jsx: openTag("GlassSlider", [`defaultValue={[${n(v, "value")}]}`, ...attrs(["step"]), 'aria-label="Volume"'], true),
    }),
  },

  "glass-switch": {
    controls: [{ kind: "boolean", key: "defaultChecked", label: "Checked", default: true, remount: true }],
    render: (v) => (
      <GlassSwitch defaultChecked={b(v, "defaultChecked")} aria-label="Wi-Fi" className="scale-150" />
    ),
    code: (_, attrs) => ({
      imports: [ui("glass-switch", "GlassSwitch")],
      jsx: openTag("GlassSwitch", [...attrs(), 'aria-label="Wi-Fi"'], true),
    }),
  },

  "glass-stepper": {
    controls: [
      num("defaultValue", "Value", 2, -10, 20, { remount: true }),
      num("min", "Min", 1, -10, 10),
      num("max", "Max", 8, 1, 20),
      num("step", "Step", 1, 0.5, 5, { step: 0.5 }),
      text("label", "Label", "Guests", "Accessible name."),
    ],
    presets: [{ name: "Thermostat", values: { defaultValue: 20, min: 16, max: 30, step: 0.5, label: "Temperature" } }],
    render: (v) => (
      <GlassStepper
        defaultValue={n(v, "defaultValue")}
        min={n(v, "min")}
        max={n(v, "max")}
        step={n(v, "step")}
        label={s(v, "label")}
      />
    ),
    code: (_, attrs) => ({
      imports: [ui("glass-stepper", "GlassStepper")],
      jsx: openTag("GlassStepper", attrs(), true),
    }),
  },

  "glass-input": {
    controls: [
      text("placeholder", "Placeholder", "Search"),
      { kind: "boolean", key: "icons", label: "Icons", default: true, description: "Preview only — pass `startIcon` / `endAdornment`." },
    ],
    render: (v) => (
      <GlassInput
        className="max-w-[300px]"
        placeholder={s(v, "placeholder")}
        aria-label={s(v, "placeholder") || "Input"}
        startIcon={b(v, "icons") ? <HugeiconsIcon icon={Search01Icon} /> : undefined}
        endAdornment={b(v, "icons") ? <HugeiconsIcon icon={Mic01Icon} /> : undefined}
      />
    ),
    code: (v, attrs) => ({
      imports: [
        ...(b(v, "icons")
          ? [
              'import { HugeiconsIcon } from "@hugeicons/react"',
              'import { Mic01Icon, Search01Icon } from "@hugeicons/core-free-icons"',
            ]
          : []),
        ui("glass-input", "GlassInput"),
      ],
      jsx: openTag(
        "GlassInput",
        [
          ...attrs(["placeholder"]),
          ...(b(v, "icons")
            ? ["startIcon={<HugeiconsIcon icon={Search01Icon} />}", "endAdornment={<HugeiconsIcon icon={Mic01Icon} />}"]
            : []),
        ],
        true
      ),
    }),
  },

  "glass-otp": {
    controls: [
      num("length", "Length", 6, 3, 8, { remount: true }),
      num("group", "Group", 3, 0, 4, { description: "Separator after every `group` cells. 0 for none." }),
      {
        kind: "select",
        key: "pattern",
        label: "Pattern",
        default: "digits",
        options: ["digits", "alphanumeric"],
        type: '"digits" | "alphanumeric"',
      },
      {
        kind: "select",
        key: "status",
        label: "Status",
        default: "idle",
        options: ["idle", "success", "error"],
        type: '"idle" | "success" | "error"',
      },
      { kind: "boolean", key: "mask", label: "Mask", default: false, description: "Show dots instead of characters." },
      text("defaultValue", "Value", "12", "Initial value (uncontrolled)."),
    ],
    presets: [
      { name: "Verified", values: { defaultValue: "123456", status: "success" } },
      { name: "Wrong code", values: { defaultValue: "123455", status: "error" } },
      { name: "PIN", values: { length: 4, group: 0, mask: true, defaultValue: "12" } },
      { name: "Invite", values: { length: 8, group: 4, pattern: "alphanumeric", defaultValue: "OPAL" } },
    ],
    render: (v) => (
      <GlassOTP
        key={`${n(v, "length")}:${s(v, "pattern")}:${s(v, "defaultValue")}`}
        aria-label="Verification code"
        length={n(v, "length")}
        group={n(v, "group") || undefined}
        pattern={s(v, "pattern") as "digits"}
        status={s(v, "status") as "idle"}
        mask={b(v, "mask")}
        defaultValue={s(v, "defaultValue")}
      />
    ),
    code: (_, attrs) => ({
      imports: [ui("glass-otp", "GlassOTP")],
      jsx: openTag(
        "GlassOTP",
        [...attrs(["length", "group", "pattern", "status", "mask"]), "onComplete={(code) => verify(code)}"],
        true
      ),
    }),
  },

}
