import type { Metadata } from "next"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { ComponentGrid } from "@/components/site/grid"
import { Tile } from "@/components/site/tile"
import { GlassButton } from "@/registry/opaline/ui/glass-button"
import { categoryLabels, docItems, type Category } from "@/registry/index"

export const metadata: Metadata = {
  title: "Components",
  description: "Every Opaline component — liquid glass surfaces and controls.",
}

const blurbs: Record<Category, string> = {
  foundation: "The primitive every glass component is built on.",
  glass: "Surfaces and controls that refract whatever sits behind them.",
}

export default function ComponentsPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pt-32 pb-24 sm:px-6">
      <header className="flex flex-col gap-3 px-1">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Components</h1>
        <p className="max-w-xl text-[16px] leading-relaxed text-muted-foreground">
          {docItems.length} components. Open any of them for a live preview, source and install
          commands — or press <kbd className="font-sans">⌘K</kbd> to jump straight to one.
        </p>
      </header>
      {(Object.keys(categoryLabels) as Category[]).map((cat) => {
        const list = docItems.filter((i) => i.category === cat)
        if (!list.length) return null
        return (
          <section key={cat} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 px-1">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">{categoryLabels[cat]}</h2>
              <p className="text-[15px] text-muted-foreground">{blurbs[cat]}</p>
            </div>
            {cat === "foundation" ? (
              <div className="grid items-center gap-8 lg:grid-cols-2">
                {list.map((i) => (
                  <Tile key={i.name} name={i.name} />
                ))}
                <div className="flex flex-col items-start gap-4 px-1">
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">
                    How the glass bends light
                  </h3>
                  <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                    Most “glass” on the web is a blur. Real glass doesn&apos;t blur what&apos;s
                    behind it: it bends it. Near a curved edge, light changes direction and the
                    background appears to slide, stretch and fringe with colour. Opaline models
                    that with a little optics: a surface shape, an index of refraction and
                    Snell&apos;s law. The result is baked into an image the browser can apply to
                    the backdrop.
                  </p>
                  <GlassButton variant="prominent" asChild>
                    <a href="/components/liquid-glass#how-it-works">
                      Read <HugeiconsIcon icon={ArrowRight01Icon} />
                    </a>
                  </GlassButton>
                </div>
              </div>
            ) : (
              <ComponentGrid items={list} />
            )}
          </section>
        )
      })}
    </main>
  )
}
