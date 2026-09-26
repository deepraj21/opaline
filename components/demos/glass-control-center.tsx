"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { BluetoothIcon, CastIcon, KeyboardIcon, MoonIcon, MusicNote01Icon, PanelsTopLeftIcon, PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, Sun01Icon, SunDimIcon, Timer01Icon, VolumeHighIcon, VolumeLowIcon, Wifi01Icon } from "@hugeicons/core-free-icons"

import {
  GlassControlButton,
  GlassControlCenter,
  GlassControlTile,
  GlassControlToggle,
} from "@/registry/opaline/ui/glass-control-center"
import { GlassSlider } from "@/registry/opaline/ui/glass-slider"

function Transport({
  playing,
  onToggle,
  className,
}: {
  playing: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-between px-1 [&_button]:cursor-pointer [&_button]:transition-transform [&_button]:active:scale-85 [&_svg]:size-5 [&_svg]:fill-current ${className ?? ""}`}
    >
      <button type="button" aria-label="Previous"><HugeiconsIcon icon={SkipBackIcon} /></button>
      <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={onToggle}>
        {playing ? <HugeiconsIcon icon={PauseIcon} strokeWidth={0} /> : <HugeiconsIcon icon={PlayIcon} strokeWidth={0} />}
      </button>
      <button type="button" aria-label="Next"><HugeiconsIcon icon={SkipForwardIcon} /></button>
    </div>
  )
}

export default function GlassControlCenterDemo() {
  const [playing, setPlaying] = React.useState(true)
  const [qtPlaying, setQtPlaying] = React.useState(false)
  const [dark, setDark] = React.useState(true)
  const [stage, setStage] = React.useState(false)
  const [timer, setTimer] = React.useState(true)

  return (
    <div className="dark">
      <GlassControlCenter>
        <GlassControlTile cols={2} className="rounded-full">
          <GlassControlToggle icon={<HugeiconsIcon icon={Wifi01Icon} strokeWidth={3} />} label="Wi-Fi" status="buildlab F8" defaultPressed />
        </GlassControlTile>
        <GlassControlTile cols={2} className="rounded-full">
          <GlassControlToggle icon={<HugeiconsIcon icon={BluetoothIcon} strokeWidth={3} />} label="Bluetooth" status="On" defaultPressed />
        </GlassControlTile>

        <GlassControlTile cols={4}>
          <span className="px-1 text-[13px] font-semibold tracking-[-0.01em]">Display</span>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={SunDimIcon} className="size-4 shrink-0 opacity-60" strokeWidth={3} />
            <GlassSlider defaultValue={[72]} aria-label="Display" className="flex-1" />
            <HugeiconsIcon icon={Sun01Icon} className="size-4 shrink-0 opacity-60" strokeWidth={3} />
          </div>
        </GlassControlTile>
        <GlassControlTile cols={4}>
          <span className="px-1 text-[13px] font-semibold tracking-[-0.01em]">Sound</span>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={VolumeLowIcon} className="size-4 shrink-0 opacity-60" strokeWidth={3} />
            <GlassSlider defaultValue={[45]} aria-label="Sound" className="flex-1" />
            <HugeiconsIcon icon={VolumeHighIcon} className="size-4 shrink-0 opacity-60" strokeWidth={3} />
          </div>
        </GlassControlTile>

        <GlassControlTile cols={1} className="rounded-full">
          <GlassControlButton aria-label="Timer" active={timer} onClick={() => setTimer(!timer)}>
            <HugeiconsIcon icon={Timer01Icon} strokeWidth={3}/>
          </GlassControlButton>
        </GlassControlTile>
        <GlassControlTile cols={1} className="rounded-full">
          <GlassControlButton aria-label="Dark Mode" active={dark} onClick={() => setDark(!dark)}>
            <HugeiconsIcon icon={MoonIcon} strokeWidth={3}/>
          </GlassControlButton>
        </GlassControlTile>
        <GlassControlTile cols={1} className="rounded-full">
          <GlassControlButton aria-label="Stage Manager" active={stage} onClick={() => setStage(!stage)}>
            <HugeiconsIcon icon={PanelsTopLeftIcon} strokeWidth={3}/>
          </GlassControlButton>
        </GlassControlTile>
        <GlassControlTile cols={1} className="rounded-full">
          <GlassControlButton aria-label="Screen Mirroring">
            <HugeiconsIcon icon={CastIcon} strokeWidth={3}/>
          </GlassControlButton>
        </GlassControlTile>

        <GlassControlTile rows={2} cols={2} className="justify-between">
          <div className="size-12 rounded-xl bg-[conic-gradient(from_200deg,#ff6b9a,#ffb56b,#6bd2ff,#a36bff,#ff6b9a)] shadow-[0_6px_16px_-6px_rgb(0_0_0/0.4)]" />
          <div className="leading-tight">
            <div className="truncate text-[13px] font-semibold">Midnight City</div>
            <div className="truncate text-[11px] opacity-60">M83</div>
          </div>
          <Transport playing={playing} onToggle={() => setPlaying(!playing)} />
        </GlassControlTile>
        <GlassControlTile cols={2}>
          <span className="px-1 text-[13px] font-semibold tracking-[-0.01em]">Keyboard</span>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={KeyboardIcon} className="size-4 shrink-0 opacity-60" strokeWidth={3} />
            <GlassSlider defaultValue={[30]} aria-label="Keyboard" className="flex-1" />
          </div>
        </GlassControlTile>

        <GlassControlTile cols={2} className="rounded-full">
          <GlassControlToggle icon={<HugeiconsIcon icon={MoonIcon} strokeWidth={3} />} label="Focus" color="#0a84ff" defaultPressed  />
        </GlassControlTile>
      </GlassControlCenter>
    </div>
  )
}
