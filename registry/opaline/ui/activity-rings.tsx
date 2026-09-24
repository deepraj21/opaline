"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Ring = {
  /** 0 – 1+ ; values above 1 wrap around like Apple Watch. */
  value: number
  color: string
  label?: string
}

function ActivityRings({
  rings,
  size = 160,
  stroke = 16,
  gap = 3,
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "children" | "stroke"> & {
  rings: Ring[]
  size?: number
  stroke?: number
  gap?: number
}) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <svg
      data-slot="activity-rings"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn("-rotate-90", className)}
      {...props}
    >
      {rings.map((ring, i) => {
        const r = size / 2 - stroke / 2 - i * (stroke + gap)
        const c = 2 * Math.PI * r
        const v = mounted ? Math.min(ring.value, 1) : 0
        return (
          <g key={i}>
            <title>{ring.label}</title>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={ring.color}
              strokeOpacity={0.18}
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={ring.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - v)}
              style={{
                transition: `stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}

export { ActivityRings, type Ring }
