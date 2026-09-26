import type { Metadata, Viewport } from "next"
import Script from "next/script"

import { GithubIcon, Header, Logo } from "@/components/site/header"
import { InstallModeProvider } from "@/components/site/install-mode"
import { siteConfig, withBase } from "@/lib/site"
import { THEME_COLORS, themeScript } from "@/lib/theme"
import { GlassToaster } from "@/registry/opaline/ui/glass-toast"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s — Opaline" },
  description: siteConfig.description,
  keywords: ["liquid glass", "glassmorphism", "shadcn", "react", "tailwind", "components", "apple"],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: "Opaline",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: `${siteConfig.url}/og.png`, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
  },
  alternates: { types: { "text/plain": `${siteConfig.url}/llms.txt` } },
}

// Light by default, independent of the OS or browser preference. The toggle
// updates both tags at runtime (lib/theme.ts).
export const viewport: Viewport = {
  themeColor: THEME_COLORS.light,
  colorScheme: "light",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="opaline-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>
        <InstallModeProvider>
          <Header />
          {children}
          <footer className="border-t border-border">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-[13px] text-muted-foreground sm:flex-row">
              <div className="flex items-center gap-2">
                <Logo className="size-5" />
                <span>Opaline — interfaces that bend the light.</span>
              </div>
              <div className="flex items-center gap-5">
                <a href={withBase("/llms.txt")} className="transition-colors hover:text-foreground">
                  llms.txt
                </a>
                <a
                  href={siteConfig.github}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <GithubIcon className="size-4" /> GitHub
                </a>
              </div>
            </div>
          </footer>
          <GlassToaster />
        </InstallModeProvider>
      </body>
    </html>
  )
}
