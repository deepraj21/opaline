import { itemsByName } from "@/registry/index"
import { cn } from "@/lib/utils"
import { InstallChip } from "@/components/site/install-mode"
import { Wallpaper, type WallpaperName } from "@/components/site/wallpaper"

export function Tile({
  name,
  wallpaper,
  className,
  stageClassName,
  children,
}: {
  name: string
  wallpaper?: WallpaperName
  className?: string
  stageClassName?: string
  children: React.ReactNode
}) {
  const item = itemsByName[name]
  return (
    <section
      id={name}
      className={cn(
        "group/tile flex scroll-mt-24 flex-col overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.03)]",
        className
      )}
    >
      <div
        className={cn(
          "relative isolate flex min-h-[280px] flex-1 items-center justify-center overflow-hidden p-8",
          !wallpaper &&
            "bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px]",
          stageClassName
        )}
      >
        {wallpaper ? (
          <Wallpaper name={wallpaper} className="-z-10 dark:brightness-[0.8]" />
        ) : null}
        {children}
      </div>
      <footer className="flex items-center gap-3 border-t border-border py-3 pr-3 pl-5">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[14px] font-medium tracking-[-0.01em]">
            {item?.title ?? name}
          </h3>
          <p
            title={item?.description}
            className="truncate text-[12.5px] text-muted-foreground"
          >
            {item?.description}
          </p>
        </div>
        <InstallChip name={name} />
      </footer>
    </section>
  )
}
