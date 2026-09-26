"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { BookOpen01Icon, FileTextIcon, MoonIcon, Search01Icon } from "@hugeicons/core-free-icons"

import { siteConfig, withBase } from "@/lib/site"
import { toggleTheme } from "@/lib/theme"
import { categoryLabels, docItems, type Category } from "@/registry/index"
import {
  GlassCommandDialog,
  GlassCommandEmpty,
  GlassCommandGroup,
  GlassCommandInput,
  GlassCommandItem,
  GlassCommandList,
  GlassCommandSeparator,
  GlassCommandShortcut,
} from "@/registry/opaline/ui/glass-command"

/** Site-wide ⌘K / Ctrl+K search over every component and doc page. */
export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const [mac, setMac] = React.useState(true)
  const router = useRouter()

  React.useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === "/" && !open) {
        const t = e.target as HTMLElement
        if (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    if (href.startsWith("http")) window.open(href, "_blank", "noopener")
    else if (/\.\w+$/.test(href)) window.location.href = withBase(href) // static file
    else router.push(href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search components"
        className="flex h-9 cursor-pointer items-center gap-2 rounded-full pr-1.5 pl-3 text-[13px] text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground sm:w-48 sm:bg-foreground/[0.05]"
      >
        <HugeiconsIcon icon={Search01Icon} className="size-4 shrink-0" />
        <span className="hidden flex-1 text-left sm:inline">Search…</span>
        <kbd className="hidden h-6 items-center rounded-full bg-background px-2 font-sans text-[11px] font-medium shadow-[0_0_0_1px_var(--border)] sm:flex">
          {mac ? "⌘" : "Ctrl "}K
        </kbd>
      </button>
      <GlassCommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Opaline"
        description="Search components and documentation"
      >
        <GlassCommandInput placeholder="Search components…" />
        <GlassCommandList>
          <GlassCommandEmpty>No components found.</GlassCommandEmpty>
          {(Object.keys(categoryLabels) as Category[]).map((cat) => {
            const list = docItems.filter((i) => i.category === cat)
            if (!list.length) return null
            return (
              <GlassCommandGroup key={cat} heading={categoryLabels[cat]}>
                {list.map((i) => (
                  <GlassCommandItem
                    key={i.name}
                    value={`${i.title} ${i.name} ${i.description}`}
                    onSelect={() => go(`/components/${i.name}`)}
                  >
                    <span className="shrink-0">{i.title}</span>
                    <span className="ml-auto hidden min-w-0 truncate pl-4 text-xs opacity-45 sm:block">
                      {i.description}
                    </span>
                  </GlassCommandItem>
                ))}
              </GlassCommandGroup>
            )
          })}
          <GlassCommandSeparator />
          <GlassCommandGroup heading="General">
            <GlassCommandItem onSelect={() => go("/#setup")}>
              <HugeiconsIcon icon={BookOpen01Icon} /> Installation
            </GlassCommandItem>
            <GlassCommandItem onSelect={() => go("/llms.txt")}>
              <HugeiconsIcon icon={FileTextIcon} /> llms.txt
            </GlassCommandItem>
            <GlassCommandItem
              onSelect={() => {
                toggleTheme()
                setOpen(false)
              }}
            >
              <HugeiconsIcon icon={MoonIcon} /> Toggle theme
            </GlassCommandItem>
            <GlassCommandItem onSelect={() => go(siteConfig.github)}>
              <HugeiconsIcon icon={FileTextIcon} /> GitHub repository
            </GlassCommandItem>
          </GlassCommandGroup>
        </GlassCommandList>
      </GlassCommandDialog>
    </>
  )
}
