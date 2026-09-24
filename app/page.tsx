import { CoreSection } from "@/components/site/core-demos"
import { GlassSection } from "@/components/site/glass-demos"
import { GithubIcon, Header, Logo } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { InstallModeProvider } from "@/components/site/install-mode"
import { Setup } from "@/components/site/setup"
import { siteConfig } from "@/lib/site"
import { items } from "@/registry/index"

function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="mb-8 flex scroll-mt-24 flex-col gap-2 px-1">
      <span className="text-[13px] font-medium text-muted-foreground">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-xl text-[15px] leading-relaxed text-pretty text-muted-foreground">
        {children}
      </p>
    </div>
  )
}

export default function Page() {
  const glassCount = items.filter((i) => i.category === "glass").length
  const coreCount = items.filter((i) => i.category === "core").length

  return (
    <InstallModeProvider>
      <Header />
      <main id="top" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Hero />

        <section className="mt-28">
          <SectionHeading
            id="glass"
            eyebrow={`${glassCount} components`}
            title="Liquid Glass"
          >
            Real refraction, not just blur. Each surface bends the backdrop
            through a displacement map, rims catch the light, and controls melt
            into lenses when you touch them.
          </SectionHeading>
          <GlassSection />
        </section>

        <section className="mt-28">
          <SectionHeading
            id="essentials"
            eyebrow={`${coreCount} components`}
            title="Essentials"
          >
            Quiet, precise building blocks with the same API as shadcn/ui —
            drop them in and your app instantly feels considered.
          </SectionHeading>
          <CoreSection />
        </section>

        <Setup />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-[13px] text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="size-5" />
            <span>Opaline — liquid glass for the web.</span>
          </div>
          <a
            href={siteConfig.github}
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" /> Source on GitHub
          </a>
        </div>
      </footer>
    </InstallModeProvider>
  )
}
