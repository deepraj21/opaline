import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { Demo } from "@/components/demos";
import { demoMeta } from "@/components/demos/meta";
import { InstallChip } from "@/components/site/install-mode";
import { Wallpaper } from "@/components/site/wallpaper";
import { cn } from "@/lib/utils";
import { itemsByName } from "@/registry/index";

export function Tile({ name }: { name: string }) {
  const item = itemsByName[name];
  const meta = demoMeta[name] ?? {};
  return (
    <section
      id={name}
      className={cn(
        "group/tile flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.03)]",
        meta.tile === "wide" && "md:col-span-2",
        meta.tile === "tall" && "md:row-span-2",
      )}
    >
      <div className="flex flex-1 flex-col p-2 rounded-[28px] overflow-hidden">
        <Stage name={name} className="min-h-[280px] flex-1 rounded-[23px]" />
      </div>
      <footer className="flex items-center gap-2 py-2.5 pr-3 pl-5">
        <Link
          href={`/components/${name}`}
          className="group/link flex min-w-0 flex-1 items-center gap-1.5 text-[14px] font-medium tracking-[-0.01em]"
        >
          <span className="truncate">{item?.title ?? name}</span>
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-foreground" />
        </Link>
        <InstallChip name={name} />
      </footer>
    </section>
  );
}

/** Wallpapered stage with the live demo — shared by tiles and docs previews. */
export function Stage({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const meta = demoMeta[name] ?? {};
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden p-8 @container",
        !meta.wallpaper &&
          "bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px]",
        meta.stage,
        className,
      )}
    >
      {meta.wallpaper ? (
        <Wallpaper
          name={meta.wallpaper}
          className="-z-10 dark:brightness-[0.8]"
        />
      ) : null}
      {/* Full width so w-full demos lay out normally; m-auto centers the
          wrapper when content fits but pins it top-left on overflow, so
          plain centering can never eat the top or left edge. */}
      <div className="m-auto flex w-full flex-col items-center">
        <Demo name={name} />
      </div>
    </div>
  );
}
