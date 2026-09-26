"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { MoonIcon, Sun01Icon } from "@hugeicons/core-free-icons"

import Link from "next/link"

import { SearchCommand } from "@/components/site/search"
import { siteConfig } from "@/lib/site"
import { applyTheme, isDark, THEME_STORAGE_KEY, toggleTheme } from "@/lib/theme"
import { LiquidGlass } from "@/registry/opaline/ui/liquid-glass"

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <radialGradient id="opal" cx="30%" cy="25%" r="85%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.35" stopColor="#ffd6ec" />
          <stop offset="0.6" stopColor="#c7d8ff" />
          <stop offset="0.85" stopColor="#b8f0e0" />
          <stop offset="1" stopColor="#e9d5ff" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#opal)" />
      <circle
        cx="16"
        cy="16"
        r="13.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
      />
      <ellipse cx="11.5" cy="10" rx="5" ry="2.6" fill="#fff" opacity="0.85" transform="rotate(-30 11.5 10)" />
    </svg>
  )
}

export function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function ThemeToggle() {
  React.useEffect(() => {
    // The inline script only sets the class; bring the meta tags in line.
    applyTheme(isDark())
    // Keep other open tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) applyTheme(e.newValue === "dark")
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="grid size-9 cursor-pointer place-items-center rounded-full transition-colors hover:bg-foreground/[0.06] active:scale-90"
    >
      <HugeiconsIcon icon={Sun01Icon} className="size-[18px] dark:hidden" />
      <HugeiconsIcon icon={MoonIcon} className="hidden size-[18px] dark:block" />
    </button>
  )
}

export function Header() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-4">
      <LiquidGlass
        variant="frosted"
        className="pointer-events-auto flex h-12 w-full max-w-4xl items-center gap-1 rounded-full pr-1.5 pl-4 text-foreground"
      >
        <Link href="/" className="mr-auto flex items-center gap-2">
          <Logo className="size-6" />
          <span className="text-[20px] font-semibold tracking-[-0.02em]">
            Opaline
          </span>
        </Link>
        <nav className="hidden items-center text-[13px] font-medium text-muted-foreground md:flex">
          <Link href="/components" className="rounded-full px-3 py-1.5 transition-colors hover:text-foreground">
            Components
          </Link>
          <Link href="/#setup" className="rounded-full px-3 py-1.5 transition-colors hover:text-foreground">
            Setup
          </Link>
        </nav>
        <SearchCommand />
        <a
          href={siteConfig.github}
          aria-label="GitHub"
          className="grid size-9 place-items-center rounded-full transition-colors hover:bg-foreground/[0.06]"
        >
          <GithubIcon className="size-[18px]" />
        </a>
        <ThemeToggle />
      </LiquidGlass>
    </div>
  )
}
