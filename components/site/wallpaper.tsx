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

const svg = (markup: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(markup)}")`

const dunes = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' preserveAspectRatio='none'>
    <defs>
      <linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#fde6c8'/><stop offset='1' stop-color='#f7b98b'/></linearGradient>
    </defs>
    <rect width='800' height='500' fill='url(#s)'/>
    <circle cx='560' cy='170' r='70' fill='#fff4e0'/>
    <path d='M0 300 C160 240 300 330 460 280 S720 220 800 260 V500 H0Z' fill='#e9895f'/>
    <path d='M0 360 C140 320 280 400 440 350 S700 300 800 340 V500 H0Z' fill='#c9603f'/>
    <path d='M0 420 C180 380 330 460 520 410 S740 380 800 400 V500 H0Z' fill='#8e3a2a'/>
  </svg>`
)

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
    background: `
      radial-gradient(circle at 50% 62%, #fff3c4 0 12%, transparent 12.5%),
      repeating-linear-gradient(180deg, transparent 0 14px, rgba(255,255,255,0.35) 14px 18px) 0 62% / 100% 38% no-repeat,
      linear-gradient(180deg, #2b1055 0%, #7b2f8c 30%, #ff6e7f 58%, #ffb86b 75%, #ffd89b 100%)`,
  },
  stripes: {
    background: `repeating-linear-gradient(-45deg,
      #ff5f6d 0 22px, #ffc371 22px 44px, #47e5bc 44px 66px, #4f8cff 66px 88px, #b36bff 88px 110px)`,
  },
  dots: {
    background: `
      radial-gradient(circle, rgba(20,20,30,0.85) 2.2px, transparent 2.8px) 0 0 / 18px 18px,
      linear-gradient(135deg, #fef6e4, #f3d2ff 50%, #c7e7ff)`,
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
  dunes: { background: `${dunes} center / cover` },
  bloom: {
    background: `
      radial-gradient(circle at 30% 40%, #ff4d8d 0 14%, transparent 14.5%),
      radial-gradient(circle at 68% 58%, #ffb800 0 18%, transparent 18.5%),
      radial-gradient(circle at 52% 22%, #00c2ff 0 10%, transparent 10.5%),
      radial-gradient(circle at 22% 78%, #7c5cff 0 12%, transparent 12.5%),
      radial-gradient(circle at 84% 18%, #00d68f 0 8%, transparent 8.5%),
      linear-gradient(135deg, #fff7ed, #fdf2f8)`,
  },
  grid: {
    background: `
      linear-gradient(rgba(79,70,229,0.35) 1.5px, transparent 1.5px) 0 0 / 24px 24px,
      linear-gradient(90deg, rgba(79,70,229,0.35) 1.5px, transparent 1.5px) 0 0 / 24px 24px,
      linear-gradient(160deg, #eef2ff, #fdf4ff)`,
  },
}

export function Wallpaper({
  name,
  className,
  children,
}: {
  name: WallpaperName
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={styles[name]}
    >
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
