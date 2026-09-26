import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { CopyPageButton } from "@/components/site/copy-page"
import { CodeBlock } from "@/components/site/code-block"
import { DocsNav } from "@/components/site/docs-nav"
import { InstallTabs, type InstallData } from "@/components/site/install-tabs"
import { GlassArticle } from "@/components/article/glass-article"
import { Customizer, PropsTable } from "@/components/customize/customizer"
import { highlight } from "@/lib/highlight"
import { installCommand, siteConfig } from "@/lib/site"
import { demoSource, itemFiles } from "@/lib/source"
import { docItems, itemsByName } from "@/registry/index"
import { componentMarkdown } from "@/registry/markdown"

export const dynamicParams = false

export function generateStaticParams() {
  return docItems.map((i) => ({ name: i.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const item = itemsByName[(await params).name]
  if (!item) return {}
  return {
    title: item.title,
    description: item.description,
    alternates: { types: { "text/markdown": `${siteConfig.url}/components/${item.name}.md` } },
  }
}

const run = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
} as const
const add = { pnpm: "pnpm add", npm: "npm install", yarn: "yarn add", bun: "bun add" } as const

async function installData(name: string): Promise<InstallData> {
  const item = itemsByName[name]
  const commands: InstallData["commands"] = {}
  for (const mode of ["namespace", "url"] as const) {
    const target = installCommand(name, mode).replace("npx shadcn@latest add ", "")
    for (const pm of Object.keys(run) as (keyof typeof run)[]) {
      const code = `${run[pm]} ${target}`
      commands[`${mode}:${pm}`] = { code, html: await highlight(code, "bash") }
    }
  }

  const deps = [
    ...(item.dependencies ?? []),
    ...(item.internal?.length ? ["clsx", "tailwind-merge"] : []),
  ].filter((d, i, a) => a.indexOf(d) === i)
  let depData: InstallData["deps"] = null
  if (deps.length) {
    const entries = await Promise.all(
      (Object.keys(add) as (keyof typeof add)[]).map(async (pm) => {
        const code = `${add[pm]} ${deps.join(" ")}`
        return [pm, { code, html: await highlight(code, "bash") }] as const
      })
    )
    depData = Object.fromEntries(entries) as InstallData["deps"]
  }

  const files = await Promise.all(
    itemFiles(item).map(async (f) => ({
      target: f.target,
      code: f.code,
      html: await highlight(f.code, f.target.endsWith(".tsx") ? "tsx" : "ts"),
    }))
  )

  const requires = (item.internal ?? []).map((n) => ({
    name: n,
    title: itemsByName[n]?.title ?? n,
  }))

  return { commands, deps: depData, files, requires }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = itemsByName[name]
  if (!item) notFound()

  const index = docItems.findIndex((i) => i.name === name)
  const prev = docItems[index - 1]
  const next = docItems[index + 1]
  const demo = demoSource(name)
  const [demoHtml, install] = await Promise.all([
    demo ? highlight(demo, "tsx") : Promise.resolve(""),
    installData(name),
  ])
  const markdown = componentMarkdown(item, {
    homepage: siteConfig.url,
    registryUrl: siteConfig.registryUrl,
  })

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 pt-28 pb-24 sm:px-6">
      <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-52 shrink-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block">
        <DocsNav current={name} />
      </aside>

      <article className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-[34px] leading-tight font-semibold tracking-[-0.035em]">
              {item.title}
            </h1>
            <div className="flex shrink-0 items-center gap-1.5 pt-1.5">
              <CopyPageButton markdown={markdown} />
              <NavArrow item={prev} dir="prev" />
              <NavArrow item={next} dir="next" />
            </div>
          </div>
          <p className="text-[16px] leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </header>

        <Customizer name={name} demoCode={demo} demoHtml={demoHtml} />

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Installation</h2>
          <InstallTabs data={install} />
        </section>

        {item.usage ? (
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">Usage</h2>
            <CodeBlock code={item.usage} />
          </section>
        ) : null}

        <PropsTable name={name} />

        {name === "liquid-glass" ? <GlassArticle /> : null}

        {item.glass ? (
          <p className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-[13.5px] leading-relaxed text-muted-foreground">
            Glass needs something to bend — place it over imagery, gradients or content. Chromium
            browsers render true refraction; Safari and Firefox get a frosted fallback.
          </p>
        ) : null}

        <footer className="flex items-center justify-between gap-4 border-t border-border pt-6">
          {prev ? (
            <Link href={`/components/${prev.name}`} className="group flex flex-col gap-0.5 text-sm">
              <span className="text-muted-foreground">Previous</span>
              <span className="flex items-center gap-1 font-medium">
                <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4 transition-transform group-hover:-translate-x-0.5" />
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/components/${next.name}`} className="group flex flex-col items-end gap-0.5 text-sm">
              <span className="text-muted-foreground">Next</span>
              <span className="flex items-center gap-1 font-medium">
                {next.title}
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ) : null}
        </footer>
      </article>
    </div>
  )
}

function NavArrow({
  item,
  dir,
}: {
  item?: { name: string; title: string }
  dir: "prev" | "next"
}) {
  const Icon = dir === "prev" ? ArrowLeft01Icon : ArrowRight01Icon
  const cls =
    "grid size-8 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors"
  if (!item)
    return (
      <span className={`${cls} opacity-40`} aria-hidden>
        <HugeiconsIcon icon={Icon} className="size-4" />
      </span>
    )
  return (
    <Link
      href={`/components/${item.name}`}
      aria-label={`${dir === "prev" ? "Previous" : "Next"}: ${item.title}`}
      className={`${cls} hover:text-foreground`}
    >
      <HugeiconsIcon icon={Icon} className="size-4" />
    </Link>
  )
}
