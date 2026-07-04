# 006 — Presentation polish

**Goal**: hover-to-copy email, a GitHub contributions section, a "latest writing" teaser, final home composition, and a template README.

**Files in scope**:
- `src/components/copy-button.tsx` (new)
- `src/components/email-link.tsx` (new)
- `src/components/sections/contributions.tsx` (new)
- `src/components/sections/writing.tsx` (new)
- `src/components/sections/intro.tsx` (edit — email item only)
- `src/components/layout/footer.tsx` (edit — email item only)
- `src/app/page.tsx` (edit — compose sections)
- `README.md` (create/replace — template instructions)

**Out of scope**: `src/components/github-contributions.tsx`, `src/components/contribution-graph.tsx`, `src/lib/get-cached-contributions.ts` (consume as-is), `src/lib/source.ts`, all config, `layout.tsx`. Icons: Tabler only. `toast` uses `sonner` (the `<Toaster/>` is mounted by a later host plan — copying still works now, the toast just becomes visible then).

## `src/components/copy-button.tsx` (client)
```tsx
"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label={`Copy ${label.toLowerCase()}`}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        toast.success(`${label} copied to clipboard`);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={cn("inline-flex cursor-pointer items-center", className)}
    >
      {copied ? <IconCheck className="size-3.5" /> : <IconCopy className="size-3.5" />}
    </button>
  );
}
```

## `src/components/email-link.tsx` (client)
Renders the email label with a copy icon that fades in on hover. Copies the address — does **not** open a mailto link.
```tsx
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

export function EmailLink({ email, className }: { email: string; className?: string }) {
  return (
    <span className={cn("group/email inline-flex items-center gap-1.5", className)}>
      Email
      <CopyButton
        value={email}
        label="Email"
        className="opacity-0 transition-opacity group-hover/email:opacity-100"
      />
    </span>
  );
}
```

## Wire email in `intro.tsx` and `footer.tsx`
Both render socials with `Object.values(SOCIALS).map(...)`. Special-case the `mailto:` entry to use `EmailLink`, keeping the exact same item className the links use so the row layout/hover-dim behavior is unchanged. Pattern:
```tsx
{Object.values(SOCIALS).map((social) => {
  const itemClass = "<the existing per-item className, unchanged>";
  return social.url.startsWith("mailto:") ? (
    <EmailLink key={social.name} email={social.url.replace("mailto:", "")} className={itemClass} />
  ) : (
    <Link key={social.name} href={social.url} target="_blank" className={itemClass}>
      {social.name}
    </Link>
  );
})}
```
Only touch the socials `.map` in each file — leave everything else identical.

## `src/components/sections/contributions.tsx` (server, crash-safe)
The data source (`get-cached-contributions.ts`) has an unguarded `res.json()` and hits an unofficial API — it MUST NOT crash the page. Await server-side inside try/catch and render `null` on failure or empty:
```tsx
import type { Activity } from "@/components/contribution-graph";
import { GitHubContributions } from "@/components/github-contributions";
import { GITHUB_USERNAME } from "@/config/site";
import { getCachedContributions } from "@/lib/get-cached-contributions";

export async function Contributions() {
  let data: Activity[] = [];
  try {
    data = await getCachedContributions(GITHUB_USERNAME);
  } catch {
    return null;
  }
  if (!data.length) return null;

  return (
    <section className="flex flex-col gap-6 section-padding-y" id="contributions">
      <h2 className="trail-highlight heading">Contributions</h2>
      <GitHubContributions
        contributions={Promise.resolve(data)}
        githubProfileUrl={`https://github.com/${GITHUB_USERNAME}`}
      />
    </section>
  );
}
```
(`GitHubContributions` takes a `Promise<Activity[]>` and unwraps with `use()`, so pass `Promise.resolve(data)`.)

## `src/components/sections/writing.tsx` (server)
Latest 3 posts, links to `/blog`. Keep the post title in a plain `<span>` (a later host plan adds a shared-element transition on it).
```tsx
import Link from "next/link";

import { getSortedPosts } from "@/lib/source";

export function Writing() {
  const posts = getSortedPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 section-padding-y" id="writing">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="trail-highlight heading">Writing</h2>
        <Link href="/blog" className="text-sm link">
          All posts
        </Link>
      </div>

      <ul className="group/container flex flex-col divide-y divide-dashed">
        {posts.map((post) => (
          <li key={post.url}>
            <Link
              href={post.url}
              className="group/item flex flex-col gap-1 py-4 transition-opacity ease-out group-hover/container:opacity-50 hover:opacity-100"
            >
              <span className="text-balance">{post.data.title}</span>
              {post.data.description && (
                <span className="text-sm text-pretty text-muted-foreground">
                  {post.data.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

## `src/app/page.tsx` — compose
```tsx
import { Contributions } from "@/components/sections/contributions";
import { Intro } from "@/components/sections/intro";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { Writing } from "@/components/sections/writing";

export default function Home() {
  return (
    <main className="container container-padding-x">
      <Intro />
      <Work />
      <Projects />
      <Writing />
      <Contributions />
    </main>
  );
}
```

## `README.md`
Create a concise template README: what it is (minimal dev portfolio + Fumadocs blog), quickstart (`pnpm install`, `pnpm dev`), and a "Make it yours" section: edit `src/config/` (`author.ts`, `socials.ts`, `work.ts`, `projects.ts`, `site.ts`), swap the avatar (`AUTHOR.avatarUrl`) and OG image, and add posts as `content/blog/*.mdx` (frontmatter: `title`, `description`, `date`, optional `author`/`tags`/`published`). Mention the stack (Next 16, React 19, Tailwind v4, shadcn/ui, Fumadocs) and that `src/components/ui` is shadcn. Keep it tight and friendly.

## Done criteria
- `pnpm exec tsc --noEmit` passes.
- Email in intro + footer shows a copy icon on hover that copies the address (no mailto navigation).
- `Contributions` renders the graph for `GITHUB_USERNAME` and returns `null` if the API throws/empty.
- Home renders Intro, Work, Projects, Writing, Contributions in that order.
- README has a clear "Make it yours" section.
