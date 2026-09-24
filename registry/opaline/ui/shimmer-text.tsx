import * as React from "react"

import { cn } from "@/lib/utils"

/** Text with a slow specular sweep — like light catching glass. */
function ShimmerText({
  className,
  duration = 2.4,
  style,
  ...props
}: React.ComponentProps<"span"> & { duration?: number }) {
  return (
    <span
      data-slot="shimmer-text"
      className={cn(
        "inline-block animate-[opaline-sheen_var(--sheen-duration)_linear_infinite] bg-[linear-gradient(110deg,var(--muted-foreground)_35%,var(--foreground)_50%,var(--muted-foreground)_65%)] bg-[length:250%_100%] bg-clip-text text-transparent",
        className
      )}
      style={{ "--sheen-duration": `${duration}s`, ...style } as React.CSSProperties}
      {...props}
    />
  )
}

export { ShimmerText }
