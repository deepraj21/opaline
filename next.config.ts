import type { NextConfig } from "next"

// Static export so the site + registry JSON can be served from any static host
// (GitHub Pages, Vercel, Netlify). Set BASE_PATH when serving from a sub-path,
// e.g. BASE_PATH=/opaline for https://<user>.github.io/opaline.
const basePath = process.env.BASE_PATH || ""

const config: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default config
