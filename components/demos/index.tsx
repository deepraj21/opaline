"use client"

// List of demo components, keyed by registry item name.

import GlassBadgeDemo from "./glass-badge"
import GlassButtonDemo from "./glass-button"
import GlassCardDemo from "./glass-card"
import GlassClockDemo from "./glass-clock"
import GlassCommandDemo from "./glass-command"
import GlassContextMenuDemo from "./glass-context-menu"
import GlassControlCenterDemo from "./glass-control-center"
import GlassDatePickerDemo from "./glass-date-picker"
import GlassDialogDemo from "./glass-dialog"
import GlassDockDemo from "./glass-dock"
import GlassInputDemo from "./glass-input"
import GlassKnobDemo from "./glass-knob"
import GlassLensDemo from "./glass-lens"
import GlassMenuDemo from "./glass-menu"
import GlassOTPDemo from "./glass-otp"
import GlassNotificationDemo from "./glass-notification"
import GlassPlayerDemo from "./glass-player"
import GlassPopoverDemo from "./glass-popover"
import GlassSegmentedDemo from "./glass-segmented"
import GlassSelectDemo from "./glass-select"
import GlassSheetDemo from "./glass-sheet"
import GlassSidebarDemo from "./glass-sidebar"
import GlassSliderDemo from "./glass-slider"
import GlassStackDemo from "./glass-stack"
import GlassStepperDemo from "./glass-stepper"
import GlassSwitchDemo from "./glass-switch"
import GlassTabBarDemo from "./glass-tab-bar"
import GlassTabsDemo from "./glass-tabs"
import GlassTextDemo from "./glass-text"
import GlassToastDemo from "./glass-toast"
import GlassToolbarDemo from "./glass-toolbar"
import GlassTooltipDemo from "./glass-tooltip"
import GlassWidgetDemo from "./glass-widget"
import GlassWidgetBatteryDemo from "./glass-widget-battery"
import GlassWidgetCalendarDemo from "./glass-widget-calendar"
import GlassWidgetWeatherDemo from "./glass-widget-weather"
import LiquidGlassDemo from "./liquid-glass"

const demos: Record<string, React.ComponentType> = {
  "glass-badge": GlassBadgeDemo,
  "glass-button": GlassButtonDemo,
  "glass-card": GlassCardDemo,
  "glass-clock": GlassClockDemo,
  "glass-command": GlassCommandDemo,
  "glass-context-menu": GlassContextMenuDemo,
  "glass-control-center": GlassControlCenterDemo,
  "glass-date-picker": GlassDatePickerDemo,
  "glass-dialog": GlassDialogDemo,
  "glass-dock": GlassDockDemo,
  "glass-input": GlassInputDemo,
  "glass-knob": GlassKnobDemo,
  "glass-lens": GlassLensDemo,
  "glass-menu": GlassMenuDemo,
  "glass-notification": GlassNotificationDemo,
  "glass-otp": GlassOTPDemo,
  "glass-player": GlassPlayerDemo,
  "glass-popover": GlassPopoverDemo,
  "glass-segmented": GlassSegmentedDemo,
  "glass-select": GlassSelectDemo,
  "glass-sheet": GlassSheetDemo,
  "glass-sidebar": GlassSidebarDemo,
  "glass-slider": GlassSliderDemo,
  "glass-stack": GlassStackDemo,
  "glass-stepper": GlassStepperDemo,
  "glass-switch": GlassSwitchDemo,
  "glass-tab-bar": GlassTabBarDemo,
  "glass-tabs": GlassTabsDemo,
  "glass-text": GlassTextDemo,
  "glass-toast": GlassToastDemo,
  "glass-toolbar": GlassToolbarDemo,
  "glass-tooltip": GlassTooltipDemo,
  "glass-widget": GlassWidgetDemo,
  "glass-widget-battery": GlassWidgetBatteryDemo,
  "glass-widget-calendar": GlassWidgetCalendarDemo,
  "glass-widget-weather": GlassWidgetWeatherDemo,
  "liquid-glass": LiquidGlassDemo,
}

export function Demo({ name }: { name: string }) {
  const Component = demos[name]
  return Component ? <Component /> : null
}
