"use client"

import { GlassText } from "@/registry/opaline/ui/glass-text"

export default function GlassTextDemo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <GlassText className="text-[104px] leading-none font-black" bevel={0}>
        Opaline
      </GlassText>
      <GlassText
        bevel={0}
        refraction={12}
        shine={false}
        className="text-[40px] font-extrabold tracking-[-0.035em]"
      >
        bends the light
      </GlassText>
    </div>
  )
}
