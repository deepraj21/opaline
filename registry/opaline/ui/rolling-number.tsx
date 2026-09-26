"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

/** Odometer-style number — each digit rolls to its new value. */
function RollingNumber({
  value,
  locale = "en-US",
  format,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  value: number
  /** Defaults to en-US so server and client format identically. */
  locale?: string
  format?: Intl.NumberFormatOptions
}) {
  const text = new Intl.NumberFormat(locale, format).format(value)
  const chars = text.split("")

  return (
    <span
      data-slot="rolling-number"
      className={cn(
        "relative inline-flex overflow-hidden leading-[1.15] tabular-nums",
        className
      )}
      {...props}
    >
      <span className="sr-only">{text}</span>
      {chars.map((char, i) => {
        // Key from the right so columns keep their identity as length changes.
        const key = chars.length - i
        const digit = DIGITS.indexOf(char)
        if (digit === -1) {
          return (
            <span key={`s${key}`} aria-hidden>
              {char}
            </span>
          )
        }
        return (
          <span
            key={key}
            aria-hidden
            className="relative inline-block h-[1.15em] overflow-hidden"
          >
            <span
              className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1.25,0.36,1)]"
              style={{ transform: `translateY(${-digit * 1.15}em)` }}
            >
              {DIGITS.map((d) => (
                <span key={d} className="h-[1.15em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
}

export { RollingNumber }
