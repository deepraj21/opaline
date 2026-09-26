"use client"

import * as React from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { TerminalIcon } from "@hugeicons/core-free-icons"

import { CodeFrame } from "@/components/site/code"
import { useInstallMode } from "@/components/site/install-mode"
import { cn } from "@/lib/utils"

const managers = ["pnpm", "npm", "yarn", "bun"] as const
type Manager = (typeof managers)[number]

type Highlighted = { html: string; code: string }

export type InstallData = {
  /** Keyed by `${mode}:${manager}` → highlighted command. */
  commands: Record<string, Highlighted>
  deps: Record<Manager, Highlighted> | null
  files: (Highlighted & { target: string })[]
  requires: { name: string; title: string }[]
}

function Tabs<T extends string>({
  value,
  options,
  onChange,
  className,
}: {
  value: T
  options: readonly { value: T; label: React.ReactNode }[]
  onChange: (v: T) => void
  className?: string
}) {
  return (
    <div role="tablist" className={cn("flex items-center gap-5", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          type="button"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className="relative cursor-pointer pb-2 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground aria-selected:text-foreground aria-selected:after:absolute aria-selected:after:inset-x-0 aria-selected:after:-bottom-px aria-selected:after:h-0.5 aria-selected:after:rounded-full aria-selected:after:bg-foreground"
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function ManagerSwitch({ value, onChange }: { value: Manager; onChange: (m: Manager) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      <HugeiconsIcon icon={TerminalIcon} className="mr-1.5 size-4" />
      {managers.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={cn(
            "cursor-pointer rounded-md px-2 py-0.5 font-mono text-[12.5px] transition-colors hover:text-foreground",
            value === m && "bg-background text-foreground shadow-[0_0_0_1px_var(--border)]"
          )}
        >
          {m}
        </button>
      ))}
    </div>
  )
}

function useManager() {
  const [manager, setManager] = React.useState<Manager>("npm")
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("opaline-pm") as Manager | null
      if (saved && managers.includes(saved)) setManager(saved)
    } catch {}
  }, [])
  const set = (m: Manager) => {
    setManager(m)
    try {
      localStorage.setItem("opaline-pm", m)
    } catch {}
  }
  return [manager, set] as const
}

export function InstallTabs({ data }: { data: InstallData }) {
  const [tab, setTab] = React.useState<"command" | "manual">("command")
  const [manager, setManager] = useManager()
  const { mode, setMode } = useInstallMode()
  const command = data.commands[`${mode}:${manager}`]

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { value: "command", label: "Command" },
          { value: "manual", label: "Manual" },
        ]}
        className="border-b border-border"
      />

      {tab === "command" ? (
        <div className="flex flex-col gap-3">
          <CodeFrame
            html={command.html}
            code={command.code}
            lineNumbers={false}
            title={<ManagerSwitch value={manager} onChange={setManager} />}
          />
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {mode === "namespace" ? (
              <>
                First time using <code className="font-mono text-foreground">@opaline</code>? Add
                the registry to your <code className="font-mono">components.json</code> (see{" "}
                <Link href="/#setup" className="text-foreground underline underline-offset-4">
                  Setup
                </Link>
                ) or{" "}
                <button
                  type="button"
                  // onClick={() => setMode("url")}
                  className="cursor-pointer text-foreground underline underline-offset-4"
                >
                  use the direct URL
                </button>
                .
              </>
            ) : (
              <>
                Installing by URL needs no configuration.{" "}
                <button
                  type="button"
                  // onClick={() => setMode("namespace")}
                  className="cursor-pointer text-foreground underline underline-offset-4"
                >
                  Use the @opaline namespace
                </button>
                .
              </>
            )}
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-6 [counter-reset:step]">
          {data.requires.length ? (
            <Step title="Install the required Opaline items">
              <p className="text-[14px] text-muted-foreground">
                This component builds on{" "}
                {data.requires.map((r, i) => (
                  <React.Fragment key={r.name}>
                    {i ? ", " : ""}
                    <Link href={`/components/${r.name}`} className="text-foreground underline underline-offset-4">
                      {r.title}
                    </Link>
                  </React.Fragment>
                ))}
                . Install it first.
              </p>
            </Step>
          ) : null}
          {data.deps ? (
            <Step title="Install the dependencies">
              <CodeFrame
                html={data.deps[manager].html}
                code={data.deps[manager].code}
                lineNumbers={false}
                title={<ManagerSwitch value={manager} onChange={setManager} />}
              />
            </Step>
          ) : null}
          <Step title="Copy the source into your project">
            <div className="flex flex-col gap-3">
              {data.files.map((f) => (
                <CodeFrame
                  key={f.target}
                  html={f.html}
                  code={f.code}
                  title={<span className="font-mono">{f.target}</span>}
                  bodyClassName="max-h-[420px]"
                />
              ))}
            </div>
          </Step>
          <Step title="Update the import paths to match your project setup." />
        </ol>
      )}
    </div>
  )
}

function Step({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <li className="relative flex flex-col gap-3 pl-9 [counter-increment:step] before:absolute before:top-0 before:left-0 before:grid before:size-6 before:place-items-center before:rounded-full before:bg-muted before:text-[12px] before:font-semibold before:content-[counter(step)]">
      <h3 className="text-[15px] leading-6 font-medium tracking-[-0.01em]">{title}</h3>
      {children}
    </li>
  )
}
