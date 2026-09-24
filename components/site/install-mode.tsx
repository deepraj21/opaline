"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { installCommand, type InstallMode } from "@/lib/site"
import { cn } from "@/lib/utils"

const ModeContext = React.createContext<{
  mode: InstallMode
  setMode: (mode: InstallMode) => void
}>({ mode: "namespace", setMode: () => {} })

export function InstallModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<InstallMode>("namespace")
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("opaline-install-mode")
      if (saved === "url" || saved === "namespace") setModeState(saved)
    } catch {}
  }, [])
  const setMode = React.useCallback((next: InstallMode) => {
    setModeState(next)
    try {
      localStorage.setItem("opaline-install-mode", next)
    } catch {}
  }, [])
  return (
    <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>
  )
}

export const useInstallMode = () => React.useContext(ModeContext)

export function useCopy() {
  const [copied, setCopied] = React.useState(false)
  const copy = React.useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const el = document.createElement("textarea")
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      el.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }, [])
  return { copied, copy }
}

export function CopyIconSwap({ copied }: { copied: boolean }) {
  return (
    <span className="relative grid size-3.5 place-items-center">
      <CopyIcon
        className={cn(
          "absolute size-3.5 transition-all duration-300",
          copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
        )}
      />
      <CheckIcon
        strokeWidth={2.75}
        className={cn(
          "absolute size-3.5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
      />
    </span>
  )
}

/** Compact command chip used in tile footers. */
export function InstallChip({ name }: { name: string }) {
  const { mode } = useInstallMode()
  const { copied, copy } = useCopy()
  const command = installCommand(name, mode)
  return (
    <button
      type="button"
      onClick={() => copy(command)}
      title={command}
      aria-label={`Copy install command for ${name}`}
      className="group/chip flex min-w-0 cursor-pointer items-center gap-2 rounded-full py-1 pr-1 pl-2.5 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
    >
      <span className="truncate">
        {mode === "namespace" ? `@opaline/${name}` : `${name}.json`}
      </span>
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-foreground/[0.06] transition-colors group-hover/chip:bg-foreground/10">
        <CopyIconSwap copied={copied} />
      </span>
    </button>
  )
}

/** Large command bar used in the hero. */
export function InstallBar({ name = "all" }: { name?: string }) {
  const { mode, setMode } = useInstallMode()
  const { copied, copy } = useCopy()
  const command = installCommand(name, mode)
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <div className="flex items-center gap-1 self-center rounded-full bg-foreground/[0.05] p-0.5 text-[12px] font-medium">
        {(["namespace", "url"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1 text-muted-foreground transition-all",
              mode === m &&
                "bg-background text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.08)] dark:bg-foreground/15"
            )}
          >
            {m === "namespace" ? "@opaline" : "Direct URL"}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => copy(command)}
        className="group/bar flex h-12 w-full cursor-pointer items-center gap-3 rounded-full border border-border bg-background/70 pr-1.5 pl-5 font-mono text-[13px] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] backdrop-blur-xl transition-colors hover:border-foreground/15"
      >
        <span className="text-muted-foreground select-none">$</span>
        <span className="min-w-0 flex-1 truncate text-left">{command}</span>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-active/bar:scale-90">
          <CopyIconSwap copied={copied} />
        </span>
      </button>
    </div>
  )
}
