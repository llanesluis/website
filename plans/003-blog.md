# 003 — Blog (headless Fumadocs pages)

**Goal**: render the blog with the site's own minimal pages using the Fumadocs pipeline already wired in `src/lib/source.ts` + `src/lib/mdx.tsx`. No `fumadocs-ui` theme.

**Files in scope**:
- `src/app/blog/page.tsx` (new) — index
- `src/app/blog/[slug]/page.tsx` (new) — post
- `content/blog/*.mdx` — add one more sample post (keep existing `hello-world.mdx`)
- `src/app/sitemap.ts` — add blog URLs
- `src/components/layout/header.tsx` — render nav from `MAIN_NAVIGATION`

**Out of scope**: `src/lib/source.ts`, `src/lib/mdx.tsx`, `source.config.ts`, any config. Do not add `fumadocs-ui`.

## Blog index — `src/app/blog/page.tsx`
Server component. List `getSortedPosts()`; render `null` when empty (template-safe). Match the portfolio's minimal look.
```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";

import { getSortedPosts } from "@/lib/source";

export const metadata: Metadata = { title: "Blog" };

export default function BlogIndexPage() {
  const posts = getSortedPosts();
  if (posts.length === 0) return null;

  return (
    <main className="container container-padding-x section-padding-y">
      <h1 className="trail-highlight heading">Writing</h1>

      <ul className="mt-8 flex flex-col divide-y divide-dashed">
        {posts.map((post) => (
          <li key={post.url} className="py-6">
            <Link href={post.url} className="group flex flex-col gap-1">
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-balance group-hover:text-highlight">{post.data.title}</span>
                <time
                  dateTime={new Date(post.data.date).toISOString()}
                  className="shrink-0 font-mono text-xs text-muted-foreground"
                >
                  {format(new Date(post.data.date), "MMM d, yyyy")}
                </time>
              </span>
              {post.data.description && (
                <span className="text-sm text-pretty text-muted-foreground">
                  {post.data.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

## Blog post — `src/app/blog/[slug]/page.tsx`
Static-generated. Render `page.data.body` (the MDX component) inside `prose-custom`.
```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { format } from "date-fns";

import { getMDXComponents } from "@/lib/mdx";
import { source } from "@/lib/source";

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage([slug]);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const page = source.getPage([slug]);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <main className="container container-padding-x section-padding-y">
      <article className="prose-custom prose-no-margin">
        <div className="not-prose mb-8 flex flex-col gap-2">
          <h1 className="trail-highlight heading text-2xl">{page.data.title}</h1>
          <time
            dateTime={new Date(page.data.date).toISOString()}
            className="font-mono text-xs text-muted-foreground"
          >
            {format(new Date(page.data.date), "MMMM d, yyyy")}
          </time>
        </div>
        <MDX components={getMDXComponents()} />
      </article>
    </main>
  );
}
```
Notes:
- `PageProps<"/blog/[slug]">` is a Next 16 generated global type (params is a Promise — `await props.params`).
- `source.getPage()` takes a **slug array** — pass `[slug]`.
- `page.data.date` is `string | Date`; `new Date(...)` accepts both.
- Verify a rendered code block emits `[data-rehype-pretty-code-figure]` (existing CSS styles it). If instead it emits `.shiki`, don't fix CSS here — report it for a host globals.css pass.

## Second sample post — `content/blog/second-post.mdx`
Add a real second post so the list + sorting are exercised (different, earlier `date` than hello-world's `2026-01-15`). Include frontmatter `title`, `description`, `date` (quoted ISO), `author`, and a short body with a heading and a link. This doubles as template example content.

## Sitemap — `src/app/sitemap.ts`
Replace the `// TODO` with blog URLs from the source:
```ts
import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site";
import { getSortedPosts } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog"].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const posts = getSortedPosts().map((post) => ({
    url: `${SITE_CONFIG.url}${post.url}`,
    lastModified: new Date(post.data.date).toISOString(),
  }));

  return [...staticRoutes, ...posts];
}
```

## Header nav — `src/components/layout/header.tsx`
Add a minimal nav between the wordmark and the `<ThemeToggle />`, rendering `MAIN_NAVIGATION` from `@/config/site`. Keep it subtle and mono. Example:
```tsx
import { MAIN_NAVIGATION } from "@/config/site";
// ...inside the flex row, before <ThemeToggle/>:
<nav className="flex items-center gap-4 text-sm">
  {MAIN_NAVIGATION.map((item) => (
    <Link key={item.href} href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
      {item.name}
    </Link>
  ))}
</nav>
```
Keep the existing sticky/backdrop header wrapper and `<ThemeToggle size="icon-sm" />` as-is. Put the nav so layout stays: wordmark (left) · nav + theme toggle (right), or wordmark · nav · toggle — your call, keep it clean and balanced.

## Done criteria
- `pnpm exec tsc --noEmit` passes.
- `content/blog/` has ≥2 posts; index would list them newest-first; a post page renders the MDX body inside `prose-custom`.
- `sitemap.ts` includes `/blog` and each post URL.
- Header shows Home + Blog links.
