export const siteConfig = {
  name: "Opaline",
  github: "https://github.com/Abhishek-Mallick/opaline",
  registryUrl: (
    process.env.NEXT_PUBLIC_REGISTRY_URL ??
    "https://abhishek-mallick.github.io/opaline/r"
  ).replace(/\/$/, ""),
}

export type InstallMode = "namespace" | "url"

export function installCommand(name: string, mode: InstallMode) {
  return mode === "namespace"
    ? `npx shadcn@latest add @opaline/${name}`
    : `npx shadcn@latest add ${siteConfig.registryUrl}/${name}.json`
}
