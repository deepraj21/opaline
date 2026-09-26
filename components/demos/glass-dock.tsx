"use client"

import Image from "next/image"

import {
  GlassDock,
  GlassDockItem,
  GlassDockSeparator,
} from "@/registry/opaline/ui/glass-dock"

const apps = [
  { label: "Finder", src: "/assets/finder.png" },
  { label: "Safari", src: "/assets/safari.png" },
  { label: "Brave", src: "/assets/brave.png" },
  { label: "Claude", src: "/assets/claude.png" },
  { label: "VS Code", src: "/assets/vs-code.png" },
  { label: "App Store", src: "/assets/app-store.png" },
  { label: "Activity Monitor", src: "/assets/activity-monitor.png" },
  { label: "Apps", src: "/assets/apps.png" },
]

export default function GlassDockDemo() {
  return (
    <div className="flex h-44 items-center justify-center max-md:scale-[0.62] md:max-lg:scale-90">
      <GlassDock>
        {apps.map((app, i) => (
          <GlassDockItem key={app.label} label={app.label}>
            <Image
              src={app.src}
              alt={app.label}
              width={96}
              height={96}
              draggable={false}
              className="size-full object-cover select-none"
            />
          </GlassDockItem>
        ))}
        <GlassDockSeparator />
        <GlassDockItem label="Siri">
          <Image
            src="/assets/siri.png"
            alt="Siri"
            width={96}
            height={96}
            draggable={false}
            className="size-full object-cover select-none"
          />
        </GlassDockItem>
      </GlassDock>
    </div>
  )
}
