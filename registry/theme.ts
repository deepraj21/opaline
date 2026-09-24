// Single source of truth for Opaline design tokens. Consumed by
// scripts/generate-registry.mts (registry cssVars + app/opaline.css).

export const fontSans =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter Variable", "Inter", "Helvetica Neue", system-ui, sans-serif'
export const fontMono =
  'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace'

export const light = {
  background: "oklch(0.99 0.002 286)",
  foreground: "oklch(0.21 0.004 286)",
  card: "oklch(1 0 0)",
  "card-foreground": "oklch(0.21 0.004 286)",
  popover: "oklch(1 0 0)",
  "popover-foreground": "oklch(0.21 0.004 286)",
  primary: "oklch(0.21 0.004 286)",
  "primary-foreground": "oklch(0.99 0 0)",
  secondary: "oklch(0.965 0.002 286)",
  "secondary-foreground": "oklch(0.21 0.004 286)",
  muted: "oklch(0.965 0.002 286)",
  "muted-foreground": "oklch(0.53 0.008 286)",
  accent: "oklch(0.955 0.003 286)",
  "accent-foreground": "oklch(0.21 0.004 286)",
  destructive: "oklch(0.63 0.22 27)",
  border: "oklch(0.21 0.004 286 / 9%)",
  input: "oklch(0.21 0.004 286 / 12%)",
  ring: "oklch(0.62 0.19 255)",
  radius: "0.875rem",
  "glass-tint": "oklch(1 0 0 / 14%)",
  "glass-tint-frosted": "oklch(1 0 0 / 52%)",
  "glass-rim":
    "inset 1px 1px 0 -0.5px oklch(1 0 0 / 85%), inset -1px -1px 0 -0.5px oklch(1 0 0 / 55%), inset 0 0 0 0.5px oklch(1 0 0 / 40%), inset 0 0 12px -4px oklch(1 0 0 / 60%)",
  "glass-shadow":
    "0 1px 2px oklch(0 0 0 / 6%), 0 10px 32px -8px oklch(0 0 0 / 22%)",
  "glass-foreground": "oklch(0.18 0.004 286)",
  "glass-highlight": "oklch(1 0 0 / 62%)",
}

export const dark = {
  background: "oklch(0.13 0.002 286)",
  foreground: "oklch(0.97 0.002 286)",
  card: "oklch(0.18 0.003 286)",
  "card-foreground": "oklch(0.97 0.002 286)",
  popover: "oklch(0.2 0.003 286)",
  "popover-foreground": "oklch(0.97 0.002 286)",
  primary: "oklch(0.97 0.002 286)",
  "primary-foreground": "oklch(0.18 0.003 286)",
  secondary: "oklch(0.24 0.004 286)",
  "secondary-foreground": "oklch(0.97 0.002 286)",
  muted: "oklch(0.22 0.003 286)",
  "muted-foreground": "oklch(0.68 0.008 286)",
  accent: "oklch(0.25 0.004 286)",
  "accent-foreground": "oklch(0.97 0.002 286)",
  destructive: "oklch(0.68 0.2 25)",
  border: "oklch(1 0 0 / 9%)",
  input: "oklch(1 0 0 / 13%)",
  ring: "oklch(0.68 0.16 255)",
  "glass-tint": "oklch(0.2 0.004 286 / 22%)",
  "glass-tint-frosted": "oklch(0.2 0.004 286 / 58%)",
  "glass-rim":
    "inset 1px 1px 0 -0.5px oklch(1 0 0 / 45%), inset -1px -1px 0 -0.5px oklch(1 0 0 / 22%), inset 0 0 0 0.5px oklch(1 0 0 / 16%), inset 0 0 12px -4px oklch(1 0 0 / 22%)",
  "glass-shadow":
    "0 1px 2px oklch(0 0 0 / 20%), 0 12px 36px -8px oklch(0 0 0 / 50%)",
  "glass-foreground": "oklch(0.98 0 0)",
  "glass-highlight": "oklch(1 0 0 / 16%)",
}

// Only the glass tokens — shipped with every glass component so they work
// even without the full theme.
export const glassKeys = [
  "glass-tint",
  "glass-tint-frosted",
  "glass-rim",
  "glass-shadow",
  "glass-foreground",
  "glass-highlight",
]

export const pick = (obj: Record<string, string>, keys: string[]) =>
  Object.fromEntries(keys.filter((k) => k in obj).map((k) => [k, obj[k]]))
