import { cn } from "@/lib/utils"

export type WallpaperName =
  | "aurora"
  | "sunset"
  | "stripes"
  | "dots"
  | "type"
  | "ocean"
  | "mono"
  | "dunes"
  | "bloom"
  | "grid"
  | "dusk"
  | "hero"
  | "ice"

const svg = (markup: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(markup)}")`

const ocean = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'>
    <path d='M0 20 Q15 5 30 20 T60 20 T90 20 T120 20' fill='none' stroke='rgba(255,255,255,0.55)' stroke-width='3'/>
  </svg>`
)

const styles: Record<WallpaperName, React.CSSProperties> = {
  aurora: {
    background: `
      radial-gradient(40% 55% at 18% 25%, #ff8ac2 0%, transparent 70%),
      radial-gradient(45% 60% at 82% 20%, #7aa8ff 0%, transparent 70%),
      radial-gradient(50% 60% at 70% 85%, #ffc46b 0%, transparent 70%),
      radial-gradient(45% 55% at 20% 85%, #8f7bff 0%, transparent 70%),
      linear-gradient(135deg, #ffe3f1, #e1ecff)`,
  },
  sunset: {
    background: `url("/wallpapers/sunset.jpg") center / cover`,
  },
  stripes: {
    background: `url("/wallpapers/stripes.jpg") center / cover`,
  },
  dots: {
    background: `url("/wallpapers/dots.jpg") center / cover`,
  },
  ice: {
    background: `url("/wallpapers/ice.jpg") center / cover`,
  },
  type: {
    background: "linear-gradient(135deg, #111114, #232329)",
  },
  ocean: {
    background: `${ocean} 0 0 / 120px 40px, linear-gradient(180deg, #38bdf8, #2563eb 55%, #1e1b4b)`,
  },
  mono: {
    background: `
      conic-gradient(from 90deg at 1px 1px, transparent 90deg, rgba(0,0,0,0.08) 0) 0 0 / 28px 28px,
      radial-gradient(60% 70% at 30% 30%, #ffffff, #e7e7ea)`,
  },
  dunes: { background: `url("/wallpapers/dunes.jpg") center / cover` },
  bloom: {
    background: `
      radial-gradient(circle at 30% 40%, #ff4d8d 0 14%, transparent 14.5%),
      radial-gradient(circle at 68% 58%, #ffb800 0 18%, transparent 18.5%),
      radial-gradient(circle at 52% 22%, #00c2ff 0 10%, transparent 10.5%),
      radial-gradient(circle at 22% 78%, #7c5cff 0 12%, transparent 12.5%),
      radial-gradient(circle at 84% 18%, #00d68f 0 8%, transparent 8.5%),
      linear-gradient(135deg, #fff7ed, #fdf2f8)`,
  },
  dusk: {
    background: `url("/wallpapers/dusk.png") center / cover`,
  },
  grid: {
    background: `url("/wallpapers/grid.png") center / cover`,
  },
  hero: { background: `url("/wallpapers/hero-fallback.png") center / cover, #0a0a0f` },
}

export function Wallpaper({
  name,
  className,
  children,
  videoRef,
}: {
  name: WallpaperName
  className?: string
  children?: React.ReactNode
  videoRef?: React.Ref<HTMLVideoElement>
}) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={styles[name]}
    >
      {name === "hero" ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/wallpapers/hero-fallback.png"
          src="/wallpapers/hero.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      {name === "type" ? (
        <div className="absolute inset-0 flex -rotate-6 scale-125 flex-col justify-center gap-1 text-[64px] leading-none font-bold tracking-[-0.05em] whitespace-nowrap select-none">
          {["Liquid glass", "Opaline", "Refraction", "Liquid glass", "Opaline"].map(
            (t, i) => (
              <span
                key={i}
                className={cn(
                  i % 2 ? "text-[#ff7ab6]" : "text-[#7cc4ff]",
                  i % 2 && "translate-x-[-10%]"
                )}
              >
                {t} {t} {t}
              </span>
            )
          )}
        </div>
      ) : null}
      {children}
    </div>
  )
}
