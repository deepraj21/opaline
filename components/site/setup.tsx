"use client"

import { CopyIconSwap, useCopy } from "@/components/site/install-mode"
import { siteConfig } from "@/lib/site"

function Code({ code, label }: { code: string; label: string }) {
  const { copied, copy } = useCopy()
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted/50">
      <div className="flex items-center justify-between border-b border-border py-1.5 pr-1.5 pl-4 text-[12px] text-muted-foreground">
        {label}
        <button
          type="button"
          onClick={() => copy(code)}
          aria-label="Copy"
          className="grid size-7 cursor-pointer place-items-center rounded-full transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
        >
          <CopyIconSwap copied={copied} />
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

const steps = [
  {
    title: "Add the registry",
    body: "Point the @opaline namespace at the registry in your components.json.",
    label: "components.json",
    code: `{
  "registries": {
    "@opaline": "${siteConfig.registryUrl}/{name}.json"
  }
}`,
  },
  {
    title: "Install components",
    body: "Pull individual pieces, or the theme and every component at once.",
    label: "Terminal",
    code: `npx shadcn@latest add @opaline/theme @opaline/glass-button
# or everything
npx shadcn@latest add @opaline/all`,
  },
  {
    title: "Use them",
    body: "Glass looks best over something colourful — photos, gradients, content.",
    label: "app/page.tsx",
    code: `import { GlassButton } from "@/components/ui/glass-button"

export default function Page() {
  return <GlassButton variant="prominent">Get started</GlassButton>
}`,
  },
]

export function Setup() {
  return (
    <section id="setup" className="mt-28 scroll-mt-24">
      <div className="mb-8 flex flex-col gap-2 px-1">
        <span className="text-[13px] font-medium text-muted-foreground">
          Three steps
        </span>
        <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Setup
        </h2>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Requires a shadcn project with Tailwind CSS v4. True refraction
          renders in Chromium; other browsers get a graceful frosted glass.
        </p>
      </div>
      <ol className="grid gap-4 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="flex min-w-0 flex-col gap-4 rounded-[28px] border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.015em]">{s.title}</h3>
                <p className="text-[13px] text-muted-foreground">{s.body}</p>
              </div>
            </div>
            <Code code={s.code} label={s.label} />
          </li>
        ))}
      </ol>
    </section>
  )
}
