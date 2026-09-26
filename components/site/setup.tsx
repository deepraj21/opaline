import { CodeBlock } from "@/components/site/code-block"
import { siteConfig, withBase } from "@/lib/site"

const steps = [
  {
    title: "Add the registry",
    body: "Point the @opaline namespace at the registry in components.json.",
    label: "components.json",
    lang: "json" as const,
    code: `{
  "registries": {
    "@opaline": "${siteConfig.registryUrl}/{name}.json"
  }
}`,
  },
  {
    title: "Install components",
    body: "Pull individual pieces, or the theme and everything at once.",
    label: "Terminal",
    lang: "bash" as const,
    code: `# Install individual components
npx shadcn@latest add @opaline/theme @opaline/glass-button

# or everything
npx shadcn@latest add @opaline/all`,
  },
  {
    title: "Use them",
    body: "Glass looks best over something colourful — photos, gradients, content.",
    label: "app/page.tsx",
    lang: "tsx" as const,
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
        <span className="text-[13px] font-medium text-muted-foreground">Three steps</span>
        <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Setup</h2>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Requires a shadcn project with Tailwind CSS v4. True refraction renders in Chromium; <br/>
          other browsers get a graceful frosted glass. Building with AI? Point your agent at{" "}
          <a href={withBase("/llms.txt")} className="text-foreground underline underline-offset-4">
            /llms.txt
          </a>
          .
        </p>
      </div>
      <ol className="grid gap-4 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex min-w-0 flex-col gap-4 rounded-[28px] border border-border bg-card p-5"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.015em]">{s.title}</h3>
                <p className="text-[13px] text-muted-foreground">{s.body}</p>
              </div>
            </div>
            <CodeBlock
              code={s.code}
              lang={s.lang}
              title={<span className="font-mono">{s.label}</span>}
              lineNumbers={false}
            />
          </li>
        ))}
      </ol>
    </section>
  )
}
