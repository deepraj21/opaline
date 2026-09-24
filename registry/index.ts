// Registry manifest. `scripts/generate-registry.mts` turns this into
// registry.json; the showcase site reads it for titles and install commands.

export type Category = "glass" | "core" | "foundation"

export type Item = {
  name: string
  title: string
  description: string
  category: Category
  type: "registry:ui" | "registry:lib" | "registry:hook" | "registry:theme" | "registry:item"
  files: { path: string; type: string }[]
  dependencies?: string[]
  /** Other Opaline items (by name) — resolved to absolute URLs at build time. */
  internal?: string[]
  /** Needs the glass design tokens. */
  glass?: boolean
  /** Keyframes this item needs, from `keyframes` below. */
  keyframes?: string[]
}

export const keyframes: Record<string, Record<string, Record<string, string>>> = {
  "opaline-check": { to: { "stroke-dashoffset": "0" } },
  "opaline-pop": { from: { transform: "scale(0)" }, to: { transform: "scale(1)" } },
  "opaline-shimmer": { to: { transform: "translateX(100%)" } },
  "opaline-spoke": { from: { opacity: "1" }, to: { opacity: "0.15" } },
  "opaline-sheen": {
    from: { "background-position": "100% 0" },
    to: { "background-position": "-150% 0" },
  },
}

const ui = (name: string) => ({
  path: `registry/opaline/ui/${name}.tsx`,
  type: "registry:ui",
})

const glassUi = (
  name: string,
  title: string,
  description: string,
  extra: Partial<Item> = {}
): Item => ({
  name,
  title,
  description,
  category: "glass",
  type: "registry:ui",
  files: [ui(name)],
  internal: ["liquid-glass"],
  glass: true,
  ...extra,
})

const coreUi = (
  name: string,
  title: string,
  description: string,
  extra: Partial<Item> = {}
): Item => ({
  name,
  title,
  description,
  category: "core",
  type: "registry:ui",
  files: [ui(name)],
  dependencies: ["radix-ui"],
  ...extra,
})

export const items: Item[] = [
  {
    name: "theme",
    title: "Opaline Theme",
    description:
      "Minimal, premium design tokens — Apple system typography, neutral palette and glass materials for light and dark.",
    category: "foundation",
    type: "registry:theme",
    files: [],
    glass: true,
  },
  {
    name: "liquid-glass",
    title: "Liquid Glass",
    description:
      "The primitive behind every glass component. Refracts the backdrop through an SVG displacement map with a frosted fallback.",
    category: "foundation",
    type: "registry:ui",
    files: [
      ui("liquid-glass"),
      { path: "registry/opaline/lib/glass-refraction.ts", type: "registry:lib" },
    ],
    dependencies: ["radix-ui"],
    glass: true,
  },

  glassUi("glass-button", "Glass Button", "Pill button made of liquid glass with a pointer-tracked specular highlight.", {
    dependencies: ["class-variance-authority"],
  }),
  glassUi("glass-card", "Glass Card", "Frosted card surface with header, content and footer slots."),
  glassUi("glass-dock", "Glass Dock", "macOS-style dock with cosine magnification and hover labels."),
  glassUi("glass-switch", "Glass Switch", "iOS switch whose thumb turns into a glass lens while pressed.", {
    dependencies: ["radix-ui"],
  }),
  glassUi("glass-slider", "Glass Slider", "Slider with a thumb that becomes a refracting lens while dragging.", {
    dependencies: ["radix-ui"],
  }),
  glassUi("glass-tabs", "Glass Tabs", "Segmented control with a glass bubble that glides between tabs.", {
    dependencies: ["radix-ui"],
    internal: ["liquid-glass", "use-active-indicator"],
  }),
  glassUi("glass-tab-bar", "Glass Tab Bar", "Floating iOS 26 tab bar with a sliding liquid selection.", {
    internal: ["liquid-glass", "use-active-indicator"],
  }),
  glassUi("glass-input", "Glass Input", "Capsule text field — perfect for search — with icon and adornment slots."),
  glassUi("glass-toolbar", "Glass Toolbar", "Floating capsule toolbar that groups icon actions."),
  glassUi("glass-badge", "Glass Badge", "Small glass chip with an optional glowing status dot."),
  glassUi("glass-dialog", "Glass Dialog", "Modal on a frosted glass sheet with springy transform-only motion.", {
    dependencies: ["radix-ui", "lucide-react"],
  }),
  glassUi("glass-menu", "Glass Menu", "Dropdown menu rendered on liquid glass.", {
    dependencies: ["radix-ui", "lucide-react"],
  }),
  glassUi("glass-tooltip", "Glass Tooltip", "Capsule tooltip that springs out of its trigger.", {
    dependencies: ["radix-ui"],
  }),
  glassUi("glass-player", "Glass Player", "Now-playing widget with scrubber, transport controls and volume.", {
    dependencies: ["lucide-react"],
  }),
  glassUi("glass-notification", "Glass Notification", "iOS notification banner plus a stack that fans out on hover."),
  glassUi("glass-lens", "Glass Lens", "Draggable magnifying lens that bends whatever is beneath it."),

  coreUi("button", "Button", "Drop-in shadcn button with pill geometry and tactile press.", {
    dependencies: ["radix-ui", "class-variance-authority"],
  }),
  coreUi("input", "Input", "Quiet text input with a soft focus ring.", { dependencies: [] }),
  coreUi("textarea", "Textarea", "Auto-sizing multi-line input.", { dependencies: [] }),
  coreUi("label", "Label", "Accessible form label."),
  coreUi("card", "Card", "Hairline card with generous radius and whisper-soft shadow.", {
    dependencies: [],
  }),
  coreUi("badge", "Badge", "Compact status pill in six tones.", {
    dependencies: ["radix-ui", "class-variance-authority"],
  }),
  coreUi("kbd", "Kbd", "Keyboard key and key group.", { dependencies: [] }),
  coreUi("separator", "Separator", "Hairline divider."),
  coreUi("switch", "Switch", "iOS-green switch with a thumb that stretches on press."),
  coreUi("checkbox", "Checkbox", "Checkbox with a drawn-on check mark.", {
    keyframes: ["opaline-check"],
  }),
  coreUi("radio-group", "Radio Group", "Radio group with a springy indicator.", {
    keyframes: ["opaline-pop"],
  }),
  coreUi("slider", "Slider", "Minimal slider with an elastic thumb."),
  coreUi("tabs", "Tabs", "Segmented tabs with a lifted active pill."),
  coreUi("tooltip", "Tooltip", "Compact, instant tooltip."),
  coreUi("dialog", "Dialog", "Modal with a soft overlay and spring entrance.", {
    dependencies: ["radix-ui", "lucide-react"],
  }),
  coreUi("dropdown-menu", "Dropdown Menu", "Translucent vibrancy menu with checkbox, radio and sub-menus.", {
    dependencies: ["radix-ui", "lucide-react"],
  }),
  coreUi("accordion", "Accordion", "Accordion with a rotating plus disclosure.", {
    dependencies: ["radix-ui", "lucide-react"],
  }),
  coreUi("avatar", "Avatar", "Avatar, fallback and overlapping group."),
  coreUi("progress", "Progress", "Slim progress bar with eased fill."),
  coreUi("skeleton", "Skeleton", "Loading placeholder with a travelling sheen.", {
    dependencies: [],
    keyframes: ["opaline-shimmer"],
  }),
  coreUi("spinner", "Spinner", "Apple-style eight-spoke activity indicator.", {
    dependencies: [],
    keyframes: ["opaline-spoke"],
  }),
  coreUi("activity-rings", "Activity Rings", "Concentric progress rings in the spirit of Apple Watch.", {
    dependencies: [],
  }),
  coreUi("shimmer-text", "Shimmer Text", "Text with a slow specular sweep.", {
    dependencies: [],
    keyframes: ["opaline-sheen"],
  }),

  {
    name: "use-active-indicator",
    title: "useActiveIndicator",
    description: "Hook that tracks the active item's box to animate a selection bubble.",
    category: "foundation",
    type: "registry:hook",
    files: [
      { path: "registry/opaline/hooks/use-active-indicator.ts", type: "registry:hook" },
    ],
  },
]

export const itemsByName = Object.fromEntries(items.map((i) => [i.name, i]))
