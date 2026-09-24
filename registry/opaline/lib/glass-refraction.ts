/**
 * Opaline — liquid glass engine.
 *
 * Generates a displacement map for a rounded rectangle whose rim behaves like
 * a convex glass bezel. The map is fed to an SVG <feDisplacementMap> which is
 * applied through `backdrop-filter: url(#id)`, so the content *behind* the
 * element is refracted at its edges — the way Apple's Liquid Glass bends light.
 *
 * Only Chromium supports SVG filters inside `backdrop-filter`. Every other
 * engine gets a frosted blur fallback, so components still look like glass.
 */

export type GlassMapOptions = {
  width: number
  height: number
  /** Corner radius in px (clamped to half the shortest side). */
  radius: number
  /** Width of the refracting rim in px. */
  bezel: number
}

const MAX_MAP_SIZE = 480
const cache = new Map<string, string>()

/** Convex "squircle" surface profile — flat in the middle, curving at the rim. */
function surface(t: number) {
  return Math.pow(1 - Math.pow(1 - t, 4), 0.25)
}

/**
 * Returns a data URL of an RGB displacement map.
 * R/G encode the x/y displacement (128 = none), sampled towards the centre so
 * the backdrop appears to bend around the rim.
 */
export function createDisplacementMap({
  width,
  height,
  radius,
  bezel,
}: GlassMapOptions): string {
  const w = Math.max(1, Math.round(width))
  const h = Math.max(1, Math.round(height))
  const key = `${w}:${h}:${Math.round(radius)}:${Math.round(bezel)}`
  const cached = cache.get(key)
  if (cached) return cached

  // Render at a reduced resolution for large surfaces; feImage stretches it.
  const scale = Math.min(1, MAX_MAP_SIZE / Math.max(w, h))
  const mw = Math.max(1, Math.round(w * scale))
  const mh = Math.max(1, Math.round(h * scale))
  const r = Math.min(radius, w / 2, h / 2) * scale
  const b = Math.max(1, Math.min(bezel, w / 2, h / 2) * scale)

  const canvas = document.createElement("canvas")
  canvas.width = mw
  canvas.height = mh
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""
  const img = ctx.createImageData(mw, mh)
  const data = img.data

  const hw = mw / 2
  const hh = mh / 2

  for (let y = 0; y < mh; y++) {
    for (let x = 0; x < mw; x++) {
      const px = x + 0.5 - hw
      const py = y + 0.5 - hh
      const qx = Math.abs(px) - (hw - r)
      const qy = Math.abs(py) - (hh - r)

      // Signed distance to the rounded-rect edge and outward normal.
      let dist: number
      let nx = 0
      let ny = 0
      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy)
        dist = r - len
        nx = (qx / len) * Math.sign(px)
        ny = (qy / len) * Math.sign(py)
      } else if (qx > qy) {
        dist = r - qx
        nx = Math.sign(px)
      } else {
        dist = r - qy
        ny = Math.sign(py)
      }

      const i = (y * mw + x) * 4
      let dx = 0
      let dy = 0
      if (dist > 0 && dist < b) {
        const m = 1 - surface(dist / b)
        dx = -nx * m
        dy = -ny * m
      }
      data[i] = 128 + dx * 127
      data[i + 1] = 128 + dy * 127
      data[i + 2] = 128
      data[i + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
  const url = canvas.toDataURL()
  if (cache.size > 64) cache.delete(cache.keys().next().value as string)
  cache.set(key, url)
  return url
}

let support: boolean | undefined

/** True when the browser can refract the backdrop with SVG filters (Chromium). */
export function supportsLiquidGlass(): boolean {
  if (support !== undefined) return support
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent
  const chromium = /Chrome\/|Chromium\//.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua)
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches
  support = chromium && !reduced
  return support
}
