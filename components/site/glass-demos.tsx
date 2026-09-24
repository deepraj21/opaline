"use client"

import * as React from "react"
import {
  ArchiveIcon,
  ArrowRightIcon,
  BellIcon,
  BoldIcon,
  CalendarIcon,
  CameraIcon,
  CloudSunIcon,
  CompassIcon,
  CopyIcon,
  HeartIcon,
  HighlighterIcon,
  HouseIcon,
  ItalicIcon,
  LibraryIcon,
  LinkIcon,
  MailIcon,
  MapIcon,
  MessageCircleIcon,
  MicIcon,
  MusicIcon,
  PencilIcon,
  RadioIcon,
  SearchIcon,
  SettingsIcon,
  Share2Icon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
  UnderlineIcon,
} from "lucide-react"

import { Tile } from "@/components/site/tile"
import { GlassBadge } from "@/registry/opaline/ui/glass-badge"
import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/registry/opaline/ui/glass-card"
import {
  GlassDialog,
  GlassDialogClose,
  GlassDialogContent,
  GlassDialogDescription,
  GlassDialogFooter,
  GlassDialogHeader,
  GlassDialogTitle,
  GlassDialogTrigger,
} from "@/registry/opaline/ui/glass-dialog"
import {
  GlassDock,
  GlassDockItem,
  GlassDockSeparator,
} from "@/registry/opaline/ui/glass-dock"
import { GlassInput } from "@/registry/opaline/ui/glass-input"
import { GlassLens } from "@/registry/opaline/ui/glass-lens"
import {
  GlassMenu,
  GlassMenuCheckboxItem,
  GlassMenuContent,
  GlassMenuItem,
  GlassMenuLabel,
  GlassMenuSeparator,
  GlassMenuShortcut,
  GlassMenuTrigger,
} from "@/registry/opaline/ui/glass-menu"
import {
  GlassNotification,
  GlassNotificationStack,
} from "@/registry/opaline/ui/glass-notification"
import { GlassPlayer } from "@/registry/opaline/ui/glass-player"
import { GlassSlider } from "@/registry/opaline/ui/glass-slider"
import { GlassSwitch } from "@/registry/opaline/ui/glass-switch"
import { GlassTabBar, GlassTabBarItem } from "@/registry/opaline/ui/glass-tab-bar"
import {
  GlassTabs,
  GlassTabsList,
  GlassTabsTrigger,
} from "@/registry/opaline/ui/glass-tabs"
import {
  GlassToolbar,
  GlassToolbarButton,
  GlassToolbarSeparator,
} from "@/registry/opaline/ui/glass-toolbar"
import {
  GlassTooltip,
  GlassTooltipContent,
  GlassTooltipTrigger,
} from "@/registry/opaline/ui/glass-tooltip"

function AppIcon({
  from,
  to,
  children,
}: {
  from: string
  to: string
  children: React.ReactNode
}) {
  return (
    <span
      className="grid place-items-center text-white [&_svg]:size-[46%] [&_svg]:drop-shadow-[0_1px_1px_rgb(0_0_0/0.2)]"
      style={{ background: `linear-gradient(180deg, ${from}, ${to})` }}
    >
      {children}
    </span>
  )
}

const apps = [
  { label: "Finder", from: "#6cc6ff", to: "#1e7cf2", icon: <SparklesIcon /> },
  { label: "Safari", from: "#ffffff", to: "#dfe7f1", icon: <CompassIcon className="!text-[#1e7cf2]" /> },
  { label: "Messages", from: "#6ef08a", to: "#1fbf4a", icon: <MessageCircleIcon /> },
  { label: "Mail", from: "#6cc6ff", to: "#1666e0", icon: <MailIcon /> },
  { label: "Maps", from: "#9ef08a", to: "#38b24a", icon: <MapIcon /> },
  { label: "Photos", from: "#ffd76b", to: "#ff6b8a", icon: <CameraIcon /> },
  { label: "Calendar", from: "#ffffff", to: "#eceff3", icon: <CalendarIcon className="!text-[#ff3b30]" /> },
  { label: "Music", from: "#ff6b8a", to: "#fa2d48", icon: <MusicIcon /> },
]

function DockDemo() {
  return (
    <div className="flex h-40 items-end max-md:scale-[0.62] md:max-lg:scale-90">
      <GlassDock>
        {apps.map((a, i) => (
          <GlassDockItem key={a.label} label={a.label} active={i < 3}>
            <AppIcon from={a.from} to={a.to}>
              {a.icon}
            </AppIcon>
          </GlassDockItem>
        ))}
        <GlassDockSeparator />
        <GlassDockItem label="Settings">
          <AppIcon from="#d5d8de" to="#8e939c">
            <SettingsIcon />
          </AppIcon>
        </GlassDockItem>
      </GlassDock>
    </div>
  )
}

function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <GlassButton>Continue</GlassButton>
        <GlassButton variant="prominent">
          Get started <ArrowRightIcon />
        </GlassButton>
      </div>
      <div className="flex items-center gap-3">
        <GlassButton size="icon" aria-label="Like">
          <HeartIcon />
        </GlassButton>
        <GlassButton size="icon" aria-label="Share">
          <ShareIcon />
        </GlassButton>
        <GlassButton size="icon-lg" aria-label="Record">
          <MicIcon />
        </GlassButton>
      </div>
    </div>
  )
}

function CardDemo() {
  return (
    <GlassCard className="w-full max-w-[280px]">
      <GlassCardHeader>
        <GlassCardDescription className="flex items-center gap-1.5 font-medium">
          <CloudSunIcon className="size-4" /> Cupertino
        </GlassCardDescription>
        <GlassCardTitle className="text-5xl font-light tracking-[-0.04em]">
          72°
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="flex justify-between text-center text-[13px]">
        {[
          ["Now", "72°"],
          ["1PM", "74°"],
          ["2PM", "75°"],
          ["3PM", "73°"],
          ["4PM", "70°"],
        ].map(([t, v]) => (
          <div key={t} className="flex flex-col gap-1">
            <span className="opacity-60">{t}</span>
            <span className="font-medium">{v}</span>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  )
}

function SwitchDemo() {
  return (
    <GlassCard className="w-full max-w-[260px] gap-0 py-2">
      {[
        ["Wi-Fi", true],
        ["Bluetooth", true],
        ["Airplane Mode", false],
      ].map(([label, on]) => (
        <label
          key={String(label)}
          className="flex items-center justify-between gap-4 px-5 py-2.5 text-[15px] font-medium"
        >
          {label}
          <GlassSwitch defaultChecked={Boolean(on)} aria-label={String(label)} />
        </label>
      ))}
    </GlassCard>
  )
}

function SliderDemo() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-6">
      <GlassSlider defaultValue={[62]} aria-label="Volume" />
      <GlassSlider defaultValue={[28]} aria-label="Brightness" />
    </div>
  )
}

function TabsDemo() {
  return (
    <GlassTabs defaultValue="week">
      <GlassTabsList>
        <GlassTabsTrigger value="day">Day</GlassTabsTrigger>
        <GlassTabsTrigger value="week">Week</GlassTabsTrigger>
        <GlassTabsTrigger value="month">Month</GlassTabsTrigger>
        <GlassTabsTrigger value="year">Year</GlassTabsTrigger>
      </GlassTabsList>
    </GlassTabs>
  )
}

function TabBarDemo() {
  return (
    <GlassTabBar defaultValue="home">
      <GlassTabBarItem value="home" icon={<HouseIcon />} label="Home" />
      <GlassTabBarItem value="new" icon={<SparklesIcon />} label="New" />
      <GlassTabBarItem value="radio" icon={<RadioIcon />} label="Radio" />
      <GlassTabBarItem value="library" icon={<LibraryIcon />} label="Library" />
    </GlassTabBar>
  )
}

function InputDemo() {
  return (
    <GlassInput
      className="max-w-[300px]"
      placeholder="Search"
      aria-label="Search"
      startIcon={<SearchIcon />}
      endAdornment={<MicIcon />}
    />
  )
}

function ToolbarDemo() {
  const [active, setActive] = React.useState<string[]>(["bold"])
  const toggle = (k: string) =>
    setActive((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))
  return (
    <GlassToolbar>
      {[
        ["bold", <BoldIcon key="b" />],
        ["italic", <ItalicIcon key="i" />],
        ["underline", <UnderlineIcon key="u" />],
        ["highlight", <HighlighterIcon key="h" />],
      ].map(([k, icon]) => (
        <GlassToolbarButton
          key={String(k)}
          aria-label={String(k)}
          active={active.includes(String(k))}
          onClick={() => toggle(String(k))}
        >
          {icon}
        </GlassToolbarButton>
      ))}
      <GlassToolbarSeparator />
      <GlassToolbarButton aria-label="Link">
        <LinkIcon />
      </GlassToolbarButton>
    </GlassToolbar>
  )
}

function BadgeDemo() {
  return (
    <div className="flex max-w-[280px] flex-wrap items-center justify-center gap-2">
      <GlassBadge dot="#34c759">Live</GlassBadge>
      <GlassBadge dot="#ff9f0a">Syncing</GlassBadge>
      <GlassBadge>
        <SparklesIcon /> New
      </GlassBadge>
      <GlassBadge dot="#ff3b30">Recording</GlassBadge>
      <GlassBadge>v1.0</GlassBadge>
    </div>
  )
}

function DialogDemo() {
  return (
    <GlassDialog>
      <GlassDialogTrigger asChild>
        <GlassButton>Open dialog</GlassButton>
      </GlassDialogTrigger>
      <GlassDialogContent>
        <GlassDialogHeader>
          <GlassDialogTitle>Share with friends</GlassDialogTitle>
          <GlassDialogDescription>
            Anyone with the link can view this collection. You can change
            access at any time.
          </GlassDialogDescription>
        </GlassDialogHeader>
        <GlassDialogFooter>
          <GlassDialogClose asChild>
            <GlassButton size="sm">Cancel</GlassButton>
          </GlassDialogClose>
          <GlassDialogClose asChild>
            <GlassButton size="sm" variant="prominent">
              <Share2Icon /> Copy link
            </GlassButton>
          </GlassDialogClose>
        </GlassDialogFooter>
      </GlassDialogContent>
    </GlassDialog>
  )
}

function MenuDemo() {
  const [pinned, setPinned] = React.useState(true)
  return (
    <GlassMenu>
      <GlassMenuTrigger asChild>
        <GlassButton>Actions</GlassButton>
      </GlassMenuTrigger>
      <GlassMenuContent>
        <GlassMenuLabel>Document</GlassMenuLabel>
        <GlassMenuItem>
          <PencilIcon /> Rename <GlassMenuShortcut>⌘R</GlassMenuShortcut>
        </GlassMenuItem>
        <GlassMenuItem>
          <CopyIcon /> Duplicate <GlassMenuShortcut>⌘D</GlassMenuShortcut>
        </GlassMenuItem>
        <GlassMenuItem>
          <ArchiveIcon /> Archive
        </GlassMenuItem>
        <GlassMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          Pin to top
        </GlassMenuCheckboxItem>
        <GlassMenuSeparator />
        <GlassMenuItem variant="destructive">
          <TrashIcon /> Delete
        </GlassMenuItem>
      </GlassMenuContent>
    </GlassMenu>
  )
}

function TooltipDemo() {
  return (
    <div className="flex gap-3">
      {[
        ["Notifications", <BellIcon key="b" />],
        ["Favourite", <HeartIcon key="h" />],
        ["Share", <ShareIcon key="s" />],
      ].map(([label, icon]) => (
        <GlassTooltip key={String(label)}>
          <GlassTooltipTrigger asChild>
            <GlassButton size="icon" aria-label={String(label)}>
              {icon}
            </GlassButton>
          </GlassTooltipTrigger>
          <GlassTooltipContent>{label}</GlassTooltipContent>
        </GlassTooltip>
      ))}
    </div>
  )
}

function PlayerDemo() {
  return <GlassPlayer title="Midnight City" artist="M83" duration={243} />
}

function NotificationDemo() {
  return (
    <div className="flex h-[300px] w-full max-w-sm items-start pt-6">
      <GlassNotificationStack>
        <GlassNotification
          icon={
            <AppIcon from="#6ef08a" to="#1fbf4a">
              <MessageCircleIcon />
            </AppIcon>
          }
          title="Ava"
          time="now"
        >
          Dinner at 8? I found a place with a view of the bay.
        </GlassNotification>
        <GlassNotification
          icon={
            <AppIcon from="#6cc6ff" to="#1666e0">
              <MailIcon />
            </AppIcon>
          }
          title="Design Review"
          time="5m ago"
        >
          The new glass tokens are approved for release.
        </GlassNotification>
        <GlassNotification
          icon={
            <AppIcon from="#ff6b8a" to="#fa2d48">
              <MusicIcon />
            </AppIcon>
          }
          title="New Music"
          time="1h ago"
        >
          Your weekly mix is ready.
        </GlassNotification>
      </GlassNotificationStack>
    </div>
  )
}

function LensDemo() {
  return (
    <div className="relative h-[320px] w-full">
      <GlassLens size={150} defaultPosition={{ x: 60, y: 70 }} />
      <GlassBadge className="pointer-events-none absolute right-0 bottom-0">
        Drag the lens
      </GlassBadge>
    </div>
  )
}

export function GlassSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Tile name="glass-dock" wallpaper="sunset" className="md:col-span-2">
        <DockDemo />
      </Tile>
      <Tile name="glass-button" wallpaper="aurora">
        <ButtonDemo />
      </Tile>
      <Tile name="glass-lens" wallpaper="type" stageClassName="p-4">
        <LensDemo />
      </Tile>
      <Tile name="glass-player" wallpaper="dunes">
        <PlayerDemo />
      </Tile>
      <Tile name="glass-card" wallpaper="ocean">
        <CardDemo />
      </Tile>
      <Tile name="glass-switch" wallpaper="bloom">
        <SwitchDemo />
      </Tile>
      <Tile name="glass-slider" wallpaper="stripes">
        <SliderDemo />
      </Tile>
      <Tile name="glass-tabs" wallpaper="mono">
        <TabsDemo />
      </Tile>
      <Tile name="glass-tab-bar" wallpaper="aurora">
        <TabBarDemo />
      </Tile>
      <Tile name="glass-notification" wallpaper="grid" stageClassName="items-start">
        <NotificationDemo />
      </Tile>
      <Tile name="glass-input" wallpaper="bloom">
        <InputDemo />
      </Tile>
      <Tile name="glass-toolbar" wallpaper="dots">
        <ToolbarDemo />
      </Tile>
      <Tile name="glass-menu" wallpaper="stripes">
        <MenuDemo />
      </Tile>
      <Tile name="glass-dialog" wallpaper="dunes">
        <DialogDemo />
      </Tile>
      <Tile name="glass-tooltip" wallpaper="ocean">
        <TooltipDemo />
      </Tile>
      <Tile name="glass-badge" wallpaper="sunset" className="md:col-span-2 lg:col-span-2">
        <BadgeDemo />
      </Tile>
    </div>
  )
}
