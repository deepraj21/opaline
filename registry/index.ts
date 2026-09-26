// Registry manifest — the single source of truth for every Opaline item.
// `scripts/generate-registry.mts` turns it into registry.json, llms.txt and
// per-component markdown; the site reads it for pages, search and commands.

export type Category = "foundation" | "glass"

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
  /** Usage snippet shown on the docs page and in llms.txt. */
  usage?: string
}

export const categoryLabels: Record<Category, string> = {
  foundation: "Foundations",
  glass: "Liquid Glass",
}

export const keyframes: Record<string, Record<string, Record<string, string>>> = {
  "opaline-spoke": { from: { opacity: "1" }, to: { opacity: "0.15" } },
  "opaline-sheen": {
    from: { "background-position": "100% 0" },
    to: { "background-position": "-150% 0" },
  },
  // Glass surfaces animate transform only: a `filter` or `opacity` on an
  // ancestor would cut the backdrop off and the glass would render empty.
  "opaline-glass-in": {
    from: {
      transform:
        "translate3d(var(--glass-enter-x, 0), var(--glass-enter-y, 0), 0) scale(var(--glass-enter-scale, 1))",
    },
  },
  "opaline-glass-out": {
    to: {
      transform:
        "translate3d(var(--glass-exit-x, 0), var(--glass-exit-y, 0), 0) scale(var(--glass-exit-scale, 1))",
    },
  },
  "opaline-slide-in": {
    from: { opacity: "0", transform: "translateX(var(--slide-from, 16px))" },
  },
  "opaline-shake": {
    "0%, 100%": { transform: "translateX(0)" },
    "20%": { transform: "translateX(-5px)" },
    "40%": { transform: "translateX(5px)" },
    "60%": { transform: "translateX(-3px)" },
    "80%": { transform: "translateX(3px)" },
  },
  "opaline-caret": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
  "opaline-cloud": {
    from: { transform: "translateX(-1.5px)" },
    to: { transform: "translateX(1.5px)" },
  },
  "opaline-fall": {
    from: { transform: "translateY(-3px)", opacity: "0" },
    "30%": { opacity: "1" },
    to: { transform: "translateY(4px)", opacity: "0" },
  },
  // Blobs are centred with the `translate` property, so this only drifts.
  "opaline-drift": {
    "0%": { transform: "translate(0, 0) scale(1)" },
    "50%": { transform: "translate(var(--dx1), var(--dy1)) scale(1.18)" },
    "100%": { transform: "translate(var(--dx2), var(--dy2)) scale(0.92)" },
  },
}

const ui = (name: string) => ({
  path: `registry/opaline/ui/${name}.tsx`,
  type: "registry:ui",
})

const glass = (
  name: string,
  title: string,
  description: string,
  usage: string,
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
  usage,
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
      "The primitive behind every glass component. Refracts the backdrop through an SVG displacement map, with a frosted fallback.",
    category: "foundation",
    type: "registry:ui",
    files: [
      ui("liquid-glass"),
      { path: "registry/opaline/lib/glass-refraction.ts", type: "registry:lib" },
    ],
    dependencies: ["radix-ui"],
    glass: true,
    keyframes: ["opaline-glass-in", "opaline-glass-out"],
    usage: `import { LiquidGlass } from "@/components/ui/liquid-glass"

<LiquidGlass className="rounded-3xl p-6" bezel={24} refraction={40}>
  Anything you like
</LiquidGlass>`,
  },
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

  glass(
    "glass-dock",
    "Glass Dock",
    "macOS-style dock with smooth magnification and hover labels.",
    `import { GlassDock, GlassDockItem, GlassDockSeparator } from "@/components/ui/glass-dock"

<GlassDock>
  <GlassDockItem label="Finder" active>
    <img src="/icons/finder.png" alt="" />
  </GlassDockItem>
  <GlassDockItem label="Mail">
    <img src="/icons/mail.png" alt="" />
  </GlassDockItem>
  <GlassDockSeparator />
  <GlassDockItem label="Trash">
    <img src="/icons/trash.png" alt="" />
  </GlassDockItem>
</GlassDock>`
  ),
  glass(
    "glass-text",
    "Glass Text",
    "Headlines cast in liquid glass — every glyph is a bevelled lens with rim light and a travelling sheen.",
    `import { GlassText } from "@/components/ui/glass-text"

<GlassText className="text-8xl font-extrabold tracking-tight">Opaline</GlassText>
<GlassText bevel={6} refraction={16} shine={false} className="text-4xl font-bold">
  bends the light
</GlassText>`,
    { keyframes: ["opaline-sheen"] }
  ),
  glass(
    "glass-control-center",
    "Glass Control Center",
    "macOS-style Control Center kit — glass modules, toggles, light-filled sliders and buttons.",
    `import { HugeiconsIcon } from "@hugeicons/react"
import { BluetoothIcon, SunDimIcon, Timer01Icon, Wifi01Icon } from "@hugeicons/core-free-icons"
import {
  GlassControlButton,
  GlassControlCenter,
  GlassControlSlider,
  GlassControlTile,
  GlassControlToggle,
} from "@/components/ui/glass-control-center"

<GlassControlCenter>
  <GlassControlTile rows={2}>
    <GlassControlToggle icon={<HugeiconsIcon icon={Wifi01Icon} />} label="Wi-Fi" defaultPressed />
    <GlassControlToggle icon={<HugeiconsIcon icon={BluetoothIcon} />} label="Bluetooth" />
  </GlassControlTile>
  <GlassControlTile cols={1}>
    <GlassControlButton aria-label="Timer"><HugeiconsIcon icon={Timer01Icon} /></GlassControlButton>
  </GlassControlTile>
  <GlassControlTile cols={4}>
    <GlassControlSlider label="Display" icon={<HugeiconsIcon icon={SunDimIcon} />} defaultValue={70} />
  </GlassControlTile>
</GlassControlCenter>`
  ),
  glass(
    "glass-segmented",
    "Glass Segmented",
    "Icon segmented picker whose glass bubble stretches like liquid as it travels.",
    `import { HugeiconsIcon } from "@hugeicons/react"
import { Folder01Icon, Image01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { GlassSegmented, GlassSegmentedItem } from "@/components/ui/glass-segmented"

<GlassSegmented defaultValue="photos" aria-label="Library">
  <GlassSegmentedItem value="photos" icon={<HugeiconsIcon icon={Image01Icon} />} label="Photos" />
  <GlassSegmentedItem value="albums" icon={<HugeiconsIcon icon={Folder01Icon} />} label="Albums" />
  <GlassSegmentedItem value="search" icon={<HugeiconsIcon icon={Search01Icon} />} label="Search" />
</GlassSegmented>`,
    { internal: ["liquid-glass", "use-active-indicator"] }
  ),
  glass(
    "glass-date-picker",
    "Glass Date Picker",
    "Glass calendar with a gliding day bubble, and a capsule date picker.",
    `import { GlassCalendar, GlassDatePicker } from "@/components/ui/glass-date-picker"

<GlassDatePicker onValueChange={setDate} />

// or inline
<GlassCalendar value={date} onValueChange={setDate} weekStartsOn={1} />`,
    {
      dependencies: ["radix-ui", "@hugeicons/react", "@hugeicons/core-free-icons"],
      internal: ["liquid-glass", "use-active-indicator"],
      keyframes: ["opaline-slide-in"],
    }
  ),
  glass(
    "glass-stepper",
    "Glass Stepper",
    "Capsule stepper with rolling digits, hold-to-accelerate and a shake at the limits.",
    `import { GlassStepper } from "@/components/ui/glass-stepper"

<GlassStepper defaultValue={2} min={1} max={10} label="Guests" />
<GlassStepper
  defaultValue={24}
  step={0.5}
  format={{ style: "unit", unit: "celsius" }}
  label="Temperature"
/>`,
    {
      dependencies: ["@hugeicons/react", "@hugeicons/core-free-icons"],
      internal: ["liquid-glass"],
      keyframes: ["opaline-shake"],
    }
  ),
  glass(
    "glass-context-menu",
    "Glass Context Menu",
    "Right-click menu that springs from the cursor, with a row of round quick actions.",
    `import { HugeiconsIcon } from "@hugeicons/react"
import { CopyIcon, Share01Icon, TrashIcon } from "@hugeicons/core-free-icons"
import {
  GlassContextMenu,
  GlassContextMenuAction,
  GlassContextMenuActions,
  GlassContextMenuContent,
  GlassContextMenuItem,
  GlassContextMenuTrigger,
} from "@/components/ui/glass-context-menu"

<GlassContextMenu>
  <GlassContextMenuTrigger>Right-click me</GlassContextMenuTrigger>
  <GlassContextMenuContent>
    <GlassContextMenuActions>
      <GlassContextMenuAction icon={<HugeiconsIcon icon={CopyIcon} />} label="Copy" />
      <GlassContextMenuAction icon={<HugeiconsIcon icon={Share01Icon} />} label="Share" />
      <GlassContextMenuAction icon={<HugeiconsIcon icon={TrashIcon} />} label="Delete" variant="destructive" />
    </GlassContextMenuActions>
    <GlassContextMenuItem>Get Info</GlassContextMenuItem>
    <GlassContextMenuItem>Rename</GlassContextMenuItem>
  </GlassContextMenuContent>
</GlassContextMenu>`,
    { dependencies: ["radix-ui", "@hugeicons/react", "@hugeicons/core-free-icons"] }
  ),
  glass(
    "glass-widget",
    "Glass Widget",
    "iOS home-screen widget frame on liquid glass — small, medium and large.",
    `import { GlassWidget } from "@/components/ui/glass-widget"

<GlassWidget size="small">…</GlassWidget>
<GlassWidget size="medium">…</GlassWidget>`
  ),
  glass(
    "glass-widget-weather",
    "Weather Widget",
    "Weather widget with animated condition art and an hourly forecast.",
    `import { GlassWidgetWeather } from "@/components/ui/glass-widget-weather"

<GlassWidgetWeather
  size="medium"
  location="Cupertino"
  temperature={72}
  condition="partly-cloudy"
  high={76}
  low={58}
  hourly={[
    { time: "Now", temperature: 72, condition: "partly-cloudy" },
    { time: "3PM", temperature: 74, condition: "sunny" },
  ]}
/>`,
    { internal: ["liquid-glass", "glass-widget"], keyframes: ["opaline-cloud", "opaline-fall"] }
  ),
  glass(
    "glass-widget-calendar",
    "Calendar Widget",
    "Calendar widget showing today, what's next and a month at a glance.",
    `import { GlassWidgetCalendar } from "@/components/ui/glass-widget-calendar"

<GlassWidgetCalendar
  size="medium"
  events={[
    { title: "Design review", time: "2:00 – 3:00 PM", color: "#ff9f0a" },
    { title: "Gym", time: "6:30 PM", color: "#30d158" },
  ]}
/>`,
    { internal: ["liquid-glass", "glass-widget"] }
  ),
  glass(
    "glass-widget-battery",
    "Battery Widget",
    "Batteries widget with device rings that fill, turn red when low and show charging.",
    `import { GlassWidgetBattery } from "@/components/ui/glass-widget-battery"

<GlassWidgetBattery
  size="medium"
  devices={[
    { name: "iPhone", level: 82, kind: "phone", charging: true },
    { name: "Watch", level: 64, kind: "watch" },
    { name: "AirPods", level: 18, kind: "headphones" },
  ]}
/>`,
    { dependencies: ["@hugeicons/react", "@hugeicons/core-free-icons"], internal: ["liquid-glass", "glass-widget"] }
  ),
  glass(
    "glass-button",
    "Glass Button",
    "Pill button made of liquid glass with a pointer-tracked highlight.",
    `import { HugeiconsIcon } from "@hugeicons/react"
import { HeartIcon } from "@hugeicons/core-free-icons"
import { GlassButton } from "@/components/ui/glass-button"

<GlassButton>Continue</GlassButton>
<GlassButton variant="prominent">Get started</GlassButton>
<GlassButton size="icon" aria-label="Like">
  <HugeiconsIcon icon={HeartIcon} />
</GlassButton>`,
    { dependencies: ["class-variance-authority"] }
  ),
  glass(
    "glass-lens",
    "Glass Lens",
    "Draggable magnifying lens that bends whatever is beneath it.",
    `import { GlassLens } from "@/components/ui/glass-lens"

<div className="relative h-80">
  <h1 className="text-8xl font-bold">Opaline</h1>
  <GlassLens size={150} defaultPosition={{ x: 40, y: 40 }} />
</div>`
  ),
  glass(
    "glass-sidebar",
    "Glass Sidebar",
    "Floating source list with a sliding glass selection and icon-only mode.",
    `import { HugeiconsIcon } from "@hugeicons/react"
import { Home01Icon, InboxIcon } from "@hugeicons/core-free-icons"
import {
  GlassSidebar,
  GlassSidebarGroup,
  GlassSidebarHeader,
  GlassSidebarItem,
  GlassSidebarToggle,
} from "@/components/ui/glass-sidebar"

<GlassSidebar>
  <GlassSidebarHeader>
    <GlassSidebarToggle />
  </GlassSidebarHeader>
  <GlassSidebarGroup label="Library">
    <GlassSidebarItem icon={<HugeiconsIcon icon={Home01Icon} />} active>Home</GlassSidebarItem>
    <GlassSidebarItem icon={<HugeiconsIcon icon={InboxIcon} />} badge={4}>Inbox</GlassSidebarItem>
  </GlassSidebarGroup>
</GlassSidebar>`,
    { dependencies: ["radix-ui", "@hugeicons/react", "@hugeicons/core-free-icons"], internal: ["liquid-glass", "use-active-indicator"] }
  ),
  glass(
    "glass-command",
    "Glass Command",
    "⌘K command palette on a frosted glass sheet, powered by cmdk.",
    `import {
  GlassCommandDialog,
  GlassCommandEmpty,
  GlassCommandGroup,
  GlassCommandInput,
  GlassCommandItem,
  GlassCommandList,
} from "@/components/ui/glass-command"

const [open, setOpen] = React.useState(false)

React.useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener("keydown", onKey)
  return () => document.removeEventListener("keydown", onKey)
}, [])

<GlassCommandDialog open={open} onOpenChange={setOpen}>
  <GlassCommandInput placeholder="Search…" />
  <GlassCommandList>
    <GlassCommandEmpty>No results.</GlassCommandEmpty>
    <GlassCommandGroup heading="Suggestions">
      <GlassCommandItem>Calendar</GlassCommandItem>
      <GlassCommandItem>Settings</GlassCommandItem>
    </GlassCommandGroup>
  </GlassCommandList>
</GlassCommandDialog>`,
    { dependencies: ["cmdk", "radix-ui", "@hugeicons/react", "@hugeicons/core-free-icons"] }
  ),
  glass(
    "glass-player",
    "Glass Player",
    "Now-playing widget with scrubber, transport controls and volume.",
    `import { GlassPlayer } from "@/components/ui/glass-player"

<GlassPlayer title="Midnight City" artist="M83" duration={243} artwork="/cover.jpg" />`,
    { dependencies: ["@hugeicons/react", "@hugeicons/core-free-icons"] }
  ),
  glass(
    "glass-card",
    "Glass Card",
    "Frosted card surface with header, content and footer slots.",
    `import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/ui/glass-card"

<GlassCard className="w-80">
  <GlassCardHeader>
    <GlassCardDescription>Cupertino</GlassCardDescription>
    <GlassCardTitle>72°</GlassCardTitle>
  </GlassCardHeader>
  <GlassCardContent>Mostly sunny</GlassCardContent>
</GlassCard>`
  ),
  glass(
    "glass-knob",
    "Glass Knob",
    "Rotary dial with a glass cap — drag around it or use the arrow keys.",
    `import { GlassKnob } from "@/components/ui/glass-knob"

<GlassKnob defaultValue={64} label="Volume" />
<GlassKnob
  value={temp}
  onValueChange={setTemp}
  min={16}
  max={30}
  formatValue={(v) => \`\${v}°\`}
/>`
  ),
  glass(
    "glass-clock",
    "Glass Clock",
    "Analog clock on a liquid glass face with a sweeping second hand.",
    `import { GlassClock } from "@/components/ui/glass-clock"

<GlassClock />
<GlassClock timeZone="Asia/Tokyo" label="Tokyo" size={140} />`
  ),
  glass(
    "glass-stack",
    "Glass Stack",
    "A deck of glass cards — swipe the top one away to reveal the next.",
    `import { GlassStack, GlassStackCard } from "@/components/ui/glass-stack"

<GlassStack className="h-52 w-80">
  <GlassStackCard>Apple Card</GlassStackCard>
  <GlassStackCard>Boarding pass</GlassStackCard>
  <GlassStackCard>Membership</GlassStackCard>
</GlassStack>`
  ),
  glass(
    "glass-switch",
    "Glass Switch",
    "iOS switch whose thumb turns into a glass lens while pressed.",
    `import { GlassSwitch } from "@/components/ui/glass-switch"

<GlassSwitch defaultChecked aria-label="Wi-Fi" />`,
    { dependencies: ["radix-ui"] }
  ),
  glass(
    "glass-slider",
    "Glass Slider",
    "Slider whose thumb becomes a refracting lens while dragging.",
    `import { GlassSlider } from "@/components/ui/glass-slider"

<GlassSlider defaultValue={[60]} aria-label="Volume" />`,
    { dependencies: ["radix-ui"] }
  ),
  glass(
    "glass-tabs",
    "Glass Tabs",
    "Segmented control with a glass bubble that glides between tabs.",
    `import {
  GlassTabs,
  GlassTabsContent,
  GlassTabsList,
  GlassTabsTrigger,
} from "@/components/ui/glass-tabs"

<GlassTabs defaultValue="week">
  <GlassTabsList>
    <GlassTabsTrigger value="day">Day</GlassTabsTrigger>
    <GlassTabsTrigger value="week">Week</GlassTabsTrigger>
    <GlassTabsTrigger value="month">Month</GlassTabsTrigger>
  </GlassTabsList>
  <GlassTabsContent value="week">…</GlassTabsContent>
</GlassTabs>`,
    { dependencies: ["radix-ui"], internal: ["liquid-glass", "use-active-indicator"] }
  ),
  glass(
    "glass-tab-bar",
    "Glass Tab Bar",
    "Floating iOS 26 tab bar with a sliding liquid selection.",
    `import { HugeiconsIcon } from "@hugeicons/react"
import { Home01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { GlassTabBar, GlassTabBarItem } from "@/components/ui/glass-tab-bar"

<GlassTabBar defaultValue="home" onValueChange={console.log}>
  <GlassTabBarItem value="home" icon={<HugeiconsIcon icon={Home01Icon} />} label="Home" />
  <GlassTabBarItem value="search" icon={<HugeiconsIcon icon={Search01Icon} />} label="Search" />
</GlassTabBar>`,
    { internal: ["liquid-glass", "use-active-indicator"] }
  ),
  glass(
    "glass-sheet",
    "Glass Sheet",
    "Floating side sheet, or a drag-to-dismiss bottom drawer with side=\"bottom\".",
    `import {
  GlassSheet,
  GlassSheetContent,
  GlassSheetDescription,
  GlassSheetHeader,
  GlassSheetTitle,
  GlassSheetTrigger,
} from "@/components/ui/glass-sheet"

<GlassSheet>
  <GlassSheetTrigger>Open</GlassSheetTrigger>
  <GlassSheetContent side="right">
    <GlassSheetHeader>
      <GlassSheetTitle>Settings</GlassSheetTitle>
      <GlassSheetDescription>Tune your workspace.</GlassSheetDescription>
    </GlassSheetHeader>
  </GlassSheetContent>
</GlassSheet>`,
    { dependencies: ["radix-ui", "@hugeicons/react", "@hugeicons/core-free-icons"] }
  ),
  glass(
    "glass-toast",
    "Glass Toast",
    "Imperative toasts on glass that drop in from the top.",
    `import { GlassToaster, toast } from "@/components/ui/glass-toast"

// once, in your root layout
<GlassToaster />

// anywhere
toast("Message sent")
toast.success("Saved", { description: "Your changes are live." })
toast("File deleted", { action: { label: "Undo", onClick: restore } })`,
    { dependencies: ["@hugeicons/react", "@hugeicons/core-free-icons"] }
  ),
  glass(
    "glass-popover",
    "Glass Popover",
    "Rich popover content on a frosted glass surface.",
    `import {
  GlassPopover,
  GlassPopoverContent,
  GlassPopoverTrigger,
} from "@/components/ui/glass-popover"

<GlassPopover>
  <GlassPopoverTrigger>Details</GlassPopoverTrigger>
  <GlassPopoverContent>Anything goes here.</GlassPopoverContent>
</GlassPopover>`,
    { dependencies: ["radix-ui"] }
  ),
  glass(
    "glass-select",
    "Glass Select",
    "Capsule select with a frosted glass option list.",
    `import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/components/ui/glass-select"

<GlassSelect defaultValue="system">
  <GlassSelectTrigger className="w-48">
    <GlassSelectValue placeholder="Appearance" />
  </GlassSelectTrigger>
  <GlassSelectContent>
    <GlassSelectItem value="light">Light</GlassSelectItem>
    <GlassSelectItem value="dark">Dark</GlassSelectItem>
    <GlassSelectItem value="system">System</GlassSelectItem>
  </GlassSelectContent>
</GlassSelect>`,
    { dependencies: ["radix-ui", "@hugeicons/react", "@hugeicons/core-free-icons"] }
  ),
  glass(
    "glass-menu",
    "Glass Menu",
    "Dropdown menu rendered on liquid glass.",
    `import {
  GlassMenu,
  GlassMenuContent,
  GlassMenuItem,
  GlassMenuSeparator,
  GlassMenuTrigger,
} from "@/components/ui/glass-menu"

<GlassMenu>
  <GlassMenuTrigger>Actions</GlassMenuTrigger>
  <GlassMenuContent>
    <GlassMenuItem>Rename</GlassMenuItem>
    <GlassMenuItem>Duplicate</GlassMenuItem>
    <GlassMenuSeparator />
    <GlassMenuItem variant="destructive">Delete</GlassMenuItem>
  </GlassMenuContent>
</GlassMenu>`,
    { dependencies: ["radix-ui", "@hugeicons/react", "@hugeicons/core-free-icons"] }
  ),
  glass(
    "glass-dialog",
    "Glass Dialog",
    "Modal on a frosted glass sheet with springy transform-only motion.",
    `import {
  GlassDialog,
  GlassDialogContent,
  GlassDialogDescription,
  GlassDialogHeader,
  GlassDialogTitle,
  GlassDialogTrigger,
} from "@/components/ui/glass-dialog"

<GlassDialog>
  <GlassDialogTrigger>Open</GlassDialogTrigger>
  <GlassDialogContent>
    <GlassDialogHeader>
      <GlassDialogTitle>Share with friends</GlassDialogTitle>
      <GlassDialogDescription>Anyone with the link can view.</GlassDialogDescription>
    </GlassDialogHeader>
  </GlassDialogContent>
</GlassDialog>`,
    { dependencies: ["radix-ui", "@hugeicons/react", "@hugeicons/core-free-icons"] }
  ),
  glass(
    "glass-notification",
    "Glass Notification",
    "iOS notification banner plus a stack that fans out on hover.",
    `import {
  GlassNotification,
  GlassNotificationStack,
} from "@/components/ui/glass-notification"

<GlassNotificationStack>
  <GlassNotification title="Ava" time="now">Dinner at 8?</GlassNotification>
  <GlassNotification title="Mail" time="5m ago">Your invoice is ready.</GlassNotification>
</GlassNotificationStack>`
  ),
  glass(
    "glass-input",
    "Glass Input",
    "Capsule text field with icon and adornment slots — made for search.",
    `import { HugeiconsIcon } from "@hugeicons/react"
import { Mic01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { GlassInput } from "@/components/ui/glass-input"

<GlassInput placeholder="Search" startIcon={<HugeiconsIcon icon={Search01Icon} />} endAdornment={<HugeiconsIcon icon={Mic01Icon} />} />`
  ),
  glass(
    "glass-toolbar",
    "Glass Toolbar",
    "Floating capsule toolbar that groups icon actions.",
    `import { HugeiconsIcon } from "@hugeicons/react"
import { BoldIcon, ItalicIcon, LinkIcon } from "@hugeicons/core-free-icons"
import {
  GlassToolbar,
  GlassToolbarButton,
  GlassToolbarSeparator,
} from "@/components/ui/glass-toolbar"

<GlassToolbar>
  <GlassToolbarButton aria-label="Bold" active><HugeiconsIcon icon={BoldIcon} /></GlassToolbarButton>
  <GlassToolbarButton aria-label="Italic"><HugeiconsIcon icon={ItalicIcon} /></GlassToolbarButton>
  <GlassToolbarSeparator />
  <GlassToolbarButton aria-label="Link"><HugeiconsIcon icon={LinkIcon} /></GlassToolbarButton>
</GlassToolbar>`
  ),
  glass(
    "glass-tooltip",
    "Glass Tooltip",
    "Capsule tooltip that springs out of its trigger.",
    `import {
  GlassTooltip,
  GlassTooltipContent,
  GlassTooltipTrigger,
} from "@/components/ui/glass-tooltip"

<GlassTooltip>
  <GlassTooltipTrigger>Hover me</GlassTooltipTrigger>
  <GlassTooltipContent>Notifications</GlassTooltipContent>
</GlassTooltip>`,
    { dependencies: ["radix-ui"] }
  ),
  glass(
    "glass-badge",
    "Glass Badge",
    "Small glass chip with an optional glowing status dot.",
    `import { GlassBadge } from "@/components/ui/glass-badge"

<GlassBadge dot="#34c759">Live</GlassBadge>`
  ),

  glass(
    "glass-otp",
    "OTP Input",
    "One-time code cells on glass with a gliding lens, paste and SMS autofill, and success / error states.",
    `import { GlassOTP } from "@/components/ui/glass-otp"

<GlassOTP length={6} group={3} onComplete={(code) => verify(code)} />`,
    {
      internal: ["liquid-glass", "use-active-indicator"],
      keyframes: ["opaline-glass-in", "opaline-caret", "opaline-shake"],
    }
  ),
]

export const itemsByName = Object.fromEntries(items.map((i) => [i.name, i]))

/** Items that get a docs page and a tile, in display order. */
export const docItems = items.filter((i) => i.name !== "theme" && i.type !== "registry:hook")
