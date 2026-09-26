"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon, CloudIcon, Download01Icon, FileTextIcon, Folder01Icon, Home01Icon, Image01Icon, InboxIcon, MusicIcon, Settings01Icon, StarIcon } from "@hugeicons/core-free-icons"

import {
  GlassSidebar,
  GlassSidebarFooter,
  GlassSidebarGroup,
  GlassSidebarHeader,
  GlassSidebarItem,
  GlassSidebarToggle,
} from "@/registry/opaline/ui/glass-sidebar"

const groups = [
  {
    label: "Favourites",
    items: [
      { id: "home", label: "Home", icon: <HugeiconsIcon icon={Home01Icon} /> },
      { id: "inbox", label: "Inbox", icon: <HugeiconsIcon icon={InboxIcon} />, badge: 4 },
      { id: "recents", label: "Recents", icon: <HugeiconsIcon icon={Clock01Icon} /> },
      { id: "music", label: "Music", icon: <HugeiconsIcon icon={MusicIcon} /> },
      { id: "photos", label: "Photos", icon: <HugeiconsIcon icon={Image01Icon} /> },
    ],
  },
  {
    label: "Locations",
    items: [
      { id: "cloud", label: "iCloud Drive", icon: <HugeiconsIcon icon={CloudIcon} /> },
      { id: "projects", label: "Projects", icon: <HugeiconsIcon icon={Folder01Icon} /> },
      { id: "documents", label: "Documents", icon: <HugeiconsIcon icon={FileTextIcon} /> },
      { id: "downloads", label: "Downloads", icon: <HugeiconsIcon icon={Download01Icon} />, badge: 2 },
      { id: "starred", label: "Starred", icon: <HugeiconsIcon icon={StarIcon} /> },
    ],
  },
]

export default function GlassSidebarDemo() {
  const [active, setActive] = React.useState("home")
  return (
    <div className="h-[600px]">
      <GlassSidebar>
        <GlassSidebarHeader>
          <GlassSidebarToggle />
        </GlassSidebarHeader>
        {groups.map((group) => (
          <GlassSidebarGroup key={group.label} label={group.label}>
            {group.items.map((item) => (
              <GlassSidebarItem
                key={item.id}
                icon={item.icon}
                badge={item.badge}
                active={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </GlassSidebarItem>
            ))}
          </GlassSidebarGroup>
        ))}
        <GlassSidebarFooter>
          <GlassSidebarItem
            icon={<HugeiconsIcon icon={Settings01Icon} />}
            active={active === "settings"}
            onClick={() => setActive("settings")}
          >
            Settings
          </GlassSidebarItem>
        </GlassSidebarFooter>
      </GlassSidebar>
    </div>
  )
}
