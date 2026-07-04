# 002 — Icons: Lucide → Tabler

**Goal**: replace the last Lucide icon usages with `@tabler/icons-react` and remove `lucide-react` from the project. (Section files `work.tsx`/`projects.tsx` were already swapped by the host.)

**Files in scope** (exactly these):
- `src/app/not-found.tsx`
- `src/components/theme-toggle.tsx`
- `src/components/screen-size-indicator.tsx`
- `package.json` (remove the `lucide-react` dependency line only)

**Out of scope**: everything else. Do not restructure or change behavior/markup — only swap the icon imports/usages and keep identical size/class props.

## Exact mapping (verified to exist in `@tabler/icons-react@3.44.0`)
- `not-found.tsx`: `import { ArrowLeftIcon } from "lucide-react"` → `import { IconArrowLeft } from "@tabler/icons-react"`; JSX `<ArrowLeftIcon .../>` → `<IconArrowLeft .../>` (keep `className="size-4"`).
- `theme-toggle.tsx`: `import { MoonIcon, SunIcon } from "lucide-react"` → `import { IconMoon, IconSun } from "@tabler/icons-react"`; `<SunIcon />`→`<IconSun />`, `<MoonIcon />`→`<IconMoon />`. Keep all other logic exactly as-is (the no-flash rework is a later plan).
- `screen-size-indicator.tsx`: `import { MoveHorizontal, MoveVertical } from "lucide-react"` → `import { IconArrowsHorizontal, IconArrowsVertical } from "@tabler/icons-react"`; `<MoveHorizontal className="size-3 ..."/>`→`<IconArrowsHorizontal className="size-3 ..."/>`, `<MoveVertical .../>`→`<IconArrowsVertical .../>`.

Tabler import placement: it goes in the third-party group (same spot the `lucide-react` line was). If a file already imports from `@tabler/icons-react`, merge into that import.

## package.json
Remove the line `"lucide-react": "^1.23.0",` from `dependencies`. Do not touch other deps. (Host will run `pnpm install` afterward to prune it.)

## Done criteria
- `grep -rn "lucide-react" src` returns nothing.
- No `lucide-react` line remains in `package.json`.
- `pnpm exec tsc --noEmit` passes (optional to run; host will verify).
