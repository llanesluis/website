# Refactor plans — index

Handoff plans for the portfolio → minimal-portfolio + Fumadocs-blog template refactor.
Base commit: `cac83c9`. Executors: read this file **and** your assigned plan fully before editing.

## Status

| # | Plan | Owner | Status |
|---|------|-------|--------|
| 000 | Foundation (deps, fumadocs, contributions, config flags) | host | ✅ done |
| 001 | Restructure & content model | host | ✅ done |
| 002 | Icons: Lucide → Tabler | executor | ✅ done |
| 003 | Blog (headless Fumadocs pages) | executor | ✅ done |
| 006 | Presentation polish | executor | ✅ done |
| 004 | Flash fixes (theme icon, clock, layout script) | host | ✅ done |
| 005 | Subtle View Transitions | host | ✅ done |
| 008 | Final verification (build · tsc · lint · format · live SSR) | host | ✅ done |

## Shared context

- **Stack**: Next.js 16.2.10 App Router (Turbopack), React 19.2.7, **React Compiler ON**, Tailwind v4, shadcn "base-rhea" + Base UI, `next-themes`, **pnpm**.
- **Verify** (no test suite): `pnpm exec tsc --noEmit`, `pnpm lint`. **Do NOT run `pnpm install`, `pnpm build`, or `pnpm dev`** — the host runs those once after this wave to avoid concurrent-write races. Editing `package.json` deps is fine (host installs later).
- **Conventions**: Prettier double-quotes, semicolons, 2-space, printWidth 100; import order `react` → `next` → third-party → blank line → `@/` → relative. Alias `@/*` → `src/*`. Files kebab-case; components = PascalCase **named** exports. `cn()` from `@/lib/utils`.
- **ESLint gotchas**: `@typescript-eslint/no-unused-vars` = **error** (prefix intentionally-unused with `_`); avoid `set-state-in-effect`.
- **Design system** (reuse — do not reinvent), utilities in `src/styles/globals.css`: `container`, `container-padding-x`, `section-padding-y`, `link`, `trail-highlight` (adds a trailing `_`), `heading` (mono + lowercase), `list-custom` (highlight bullets), `prose-custom` + `prose-no-margin` (MDX/typography). Accent token `--highlight` (rose). Dark mode via `.dark` (next-themes).
- **Icons**: `@tabler/icons-react` only. Never import `lucide-react`.
- **Content model** (already built in 001): edit-me config in `src/config/` — `site.ts` (`SITE_CONFIG`, `META_THEME_COLORS`, `MAIN_NAVIGATION`, `GITHUB_USERNAME`), `author.ts` (`AUTHOR`), `socials.ts` (`SOCIALS`), `work.ts` (`WORK`), `projects.ts` (`PROJECTS`). Shared types in `src/types` (`Author`, `Social`, `Work`, `Project`). Home sections in `src/components/sections/` (`intro.tsx`, `work.tsx`, `projects.tsx`). Clock widget `src/components/local-time.tsx`.
- **Blog pipeline** (built in 000): `src/lib/source.ts` exports `source` (Fumadocs loader, `baseUrl:"/blog"`) and `getSortedPosts()` (published, newest-first). `src/lib/mdx.tsx` exports `getMDXComponents()`. Posts live in `content/blog/*.mdx` (root). Page shape: `page.url`, `page.data.{title,description,date,body,toc}`; `page.data.body` is the MDX component. Loader methods: `source.getPage([slug])` (**array arg**), `source.generateParams()`, `source.getPages()`.
- **Out of scope for ALL**: `src/components/ui/**` (shadcn), the generated `src/components/{github-contributions,contribution-graph}.tsx` + `src/lib/get-cached-contributions.ts` (consume, don't edit), `.source/**`, lockfile hand-edits.

## Reporting

Return: files changed, key decisions, anything that deviated from the plan, and the result of `pnpm exec tsc --noEmit` if you ran it. Keep out-of-scope files untouched.
