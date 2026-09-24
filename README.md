# Opaline

Liquid glass and premium, minimal React components. Built on Tailwind CSS v4 and Radix, installable with the shadcn CLI.

```bash
npx shadcn@latest add @opaline/all            # theme + every component
npx shadcn@latest add @opaline/glass-button   # or one at a time
```

If `@opaline` isn't resolved yet, add it to your `components.json` first:

```json
{
  "registries": {
    "@opaline": "https://abhishek-mallick.github.io/opaline/r/{name}.json"
  }
}
```

You can also install straight from this repo: `npx shadcn@latest add abhishek-mallick/opaline/glass-button`.

Browse everything at **https://abhishek-mallick.github.io/opaline**.

True refraction renders in Chromium browsers. Safari and Firefox show a frosted-glass fallback.

## Development

```bash
pnpm install
pnpm dev         # showcase at localhost:3000
pnpm build       # registry JSON in public/r + static site in out/
```

Components are in `registry/opaline`, the manifest is `registry/index.ts` and design tokens are in `registry/theme.ts`. `registry.json` is generated, so run `pnpm registry:gen` after you edit the manifest.
