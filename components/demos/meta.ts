import type { WallpaperName } from "@/components/site/wallpaper"

type DemoMeta = {
  wallpaper?: WallpaperName
  /** Extra classes for the preview stage. */
  stage?: string
  /** Grid footprint on the overview. */
  tile?: "wide" | "tall"
}

export const demoMeta: Record<string, DemoMeta> = {
  "liquid-glass": { wallpaper: "stripes" },
  "glass-dock": { wallpaper: "sunset", tile: "wide" },
  "glass-button": { wallpaper: "ice" },
  "glass-text": { wallpaper: "dusk", tile: "wide" },
  "glass-control-center": { wallpaper: "sunset", tile: "tall", stage: "p-5" },
  "glass-lens": { wallpaper: "type", stage: "p-4" },
  "glass-sidebar": { wallpaper: "dunes", tile: "tall" },
  "glass-command": { wallpaper: "grid" },
  "glass-player": { wallpaper: "bloom" },
  "glass-card": { wallpaper: "ocean" },
  "glass-knob": { wallpaper: "aurora" },
  "glass-clock": { wallpaper: "sunset" },
  "glass-stack": { wallpaper: "type" },
  "glass-switch": { wallpaper: "grid" },
  "glass-slider": { wallpaper: "aurora" },
  "glass-tabs": { wallpaper: "ice" },
  "glass-tab-bar": { wallpaper: "aurora" },
  "glass-sheet": { wallpaper: "dunes" },
  "glass-toast": { wallpaper: "dots" },
  "glass-popover": { wallpaper: "stripes" },
  "glass-select": { wallpaper: "ocean" },
  "glass-menu": { wallpaper: "ice" },
  "glass-dialog": { wallpaper: "dunes" },
  "glass-notification": { wallpaper: "grid", stage: "items-start" },
  "glass-input": { wallpaper: "bloom" },
  "glass-toolbar": { wallpaper: "dots" },
  "glass-tooltip": { wallpaper: "ocean" },
  "glass-badge": { wallpaper: "sunset" },
  "glass-segmented": { wallpaper: "sunset" },
  "glass-date-picker": { wallpaper: "aurora", tile: "tall" },
  "glass-stepper": { wallpaper: "bloom" },
  "glass-context-menu": { wallpaper: "grid" },
  "glass-widget": { wallpaper: "ocean", tile: "wide" },
  "glass-widget-weather": { wallpaper: "dusk", tile: "wide" },
  "glass-widget-calendar": { wallpaper: "aurora", tile: "wide" },
  "glass-widget-battery": { wallpaper: "sunset", tile: "wide" },
  "glass-otp": { wallpaper: "aurora" },
}
