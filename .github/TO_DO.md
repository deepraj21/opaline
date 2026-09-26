# Opaline — TODO

## Done
- [x] 37 components: 32 liquid glass + 4 widgets + the `LiquidGlass` primitive
- [x] Physically based refraction (Snell's law, surface profiles, IOR, thickness, specular) + `LiquidGlassProvider`
- [x] Customize panel with presets, generated code and props table on every component page
- [x] Interactive "How the glass bends light" article on the Liquid Glass page
- [x] Component pages with preview, code, install tabs and usage; ⌘K search
- [x] `llms.txt`, `llms-full.txt`, per-component Markdown
- [x] Transform-only glass animations (no empty frames); refraction from the first frame
- [x] MIT license, CI on PRs, issue/PR templates, CONTRIBUTING, CODEOWNERS
- [x] `@opaline` submitted to the shadcn registry directory
- [x] Canonical repo moved to deepraj21/opaline; forks can publish opt-in test deploys

## Launch (now)
- [ ] Move Pages to `deepraj21/opaline`: unpublish the fork's site, then DNS CNAME `opaline` → `deepraj21.github.io`
- [ ] Pages: Source = GitHub Actions, custom domain `opaline.buildlab.in`, enforce HTTPS
- [ ] Repo settings: About (description, website, topics), enable Discussions
- [ ] Protect `main`: require CI + code-owner review
- [ ] Smoke test: `npx shadcn@latest add https://opaline.buildlab.in/r/all.json`
- [ ] Follow up on the shadcn directory PR until merged

## Next components
- [x] Glass: context menu, date picker, stepper, segmented picker
- [x] Widgets: weather, calendar, battery (iOS sizes)
- [x] Glass: OTP input
- [ ] Glass: date range picker, time picker, color picker
- [ ] Widgets: music, fitness, stocks, photos, reminders
- [ ] Blocks: hero, pricing, auth, lock screen, full macOS desktop

## Site & docs
- [ ] Let visitors drop in their own wallpaper behind the demos

## Engineering
- [ ] Pause refraction for off-screen elements (IntersectionObserver)
- [ ] Better Safari/Firefox fallback; `prefers-reduced-motion` everywhere
- [ ] Playwright visual tests (Chromium + WebKit, light/dark)
- [ ] CI smoke test: install `@opaline/all` into a fresh Next.js app
- [ ] Versioned releases + changelog

## Growth
- [ ] Launch: X thread with screen recordings, Product Hunt, Show HN, r/reactjs
- [ ] Share the refraction write-up (Liquid Glass page) as a blog post
- [ ] List on awesome-shadcn-ui and freefrontend
- [ ] `good first issue` labels to attract contributors
- [ ] Analytics on copy-command clicks to decide which components to build next
