import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";

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
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    // Dual themes so generated code blocks emit the same
    // `[data-rehype-pretty-code-figure]` + `--shiki-light/--shiki-dark`
    // markup the existing globals.css already styles.
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
