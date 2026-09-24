import * as React from "react"

import { cn } from "@/lib/utils"

/** Apple-style activity indicator — eight fading spokes. */
function Spinner({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn("relative inline-block size-5 text-current", className)}
      {...props}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          className="absolute top-0 left-[calc(50%-4.5%)] h-[28%] w-[9%] origin-[50%_178%] animate-[opaline-spoke_0.8s_linear_infinite] rounded-full bg-current"
          style={{
            transform: `rotate(${i * 45}deg)`,
            animationDelay: `${-0.8 + i * 0.1}s`,
          }}
        />
      ))}
    </span>
  )
}

export { Spinner }
