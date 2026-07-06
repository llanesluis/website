import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

// `transformers` is shared with the standalone highlighter (src/lib/highlight-code)
// so MDX code fences and `<CodeBlock>` outside MDX produce identical markup.
// Relative import: source.config is bundled from the repo root, not via `@/*`.
import { transformers } from "./src/lib/highlight-code";

// The blog collection. Add `.mdx` files to `content/blog/` — each needs the
// frontmatter below. This is the only content source; the site renders it with
// its own minimal pages (see `src/app/blog`), not the Fumadocs UI theme.
export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      // Quoted ISO string ("2026-01-15") or an unquoted YAML date both work.
      date: z.union([z.string(), z.date()]),
      author: z.string().optional(),
      published: z.boolean().default(true),
      tags: z.array(z.string()).optional(),
      // Manual read-time override in minutes. When omitted, it's estimated from
      // the post body (see `src/lib/reading-time.ts`).
      readingTime: z.coerce.number().int().positive().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      // Drop Fumadocs' built-in rehype-code (first plugin) and highlight with
      // rehype-pretty-code instead, so its `[data-rehype-pretty-code-*]` DOM
      // matches globals.css and the shared transformers apply.
      plugins.shift();
      plugins.push([
        rehypePrettyCode,
        {
          theme: { dark: "github-dark", light: "github-light" },
          // Drop Shiki's inline background; globals.css paints `bg-code` instead.
          keepBackground: false,
          transformers,
        },
      ]);
      return plugins;
    },
  },
});
