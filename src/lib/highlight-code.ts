import { createHash } from "node:crypto";
import { LRUCache } from "lru-cache";
import { codeToHtml, type ShikiTransformer } from "shiki";

// Highlighting is CPU-heavy and deterministic, so cache across requests.
const highlightCache = new LRUCache<string, string>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour
});

/**
 * Detects package-manager commands and stashes the raw source plus per-manager
 * variants on the `<code>` node. Shared by rehype-pretty-code (MDX) and
 * {@link highlightCode} (standalone), so both can feed `CodeBlockCommand` and
 * the copy button. See `src/types/unist.ts` for the injected prop shape.
 */
export const transformers: ShikiTransformer[] = [
  {
    code(node) {
      if (node.tagName !== "code") return;
      const raw = this.source;
      node.properties["__raw__"] = raw;

      if (raw.startsWith("npm install")) {
        node.properties["__npm__"] = raw;
        node.properties["__yarn__"] = raw.replace("npm install", "yarn add");
        node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add");
        node.properties["__bun__"] = raw.replace("npm install", "bun add");
      }

      if (raw.startsWith("npx create-")) {
        node.properties["__npm__"] = raw;
        node.properties["__yarn__"] = raw.replace("npx create-", "yarn create ");
        node.properties["__pnpm__"] = raw.replace("npx create-", "pnpm create ");
        node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
      }

      if (raw.startsWith("npm create")) {
        node.properties["__npm__"] = raw;
        node.properties["__yarn__"] = raw.replace("npm create", "yarn create");
        node.properties["__pnpm__"] = raw.replace("npm create", "pnpm create");
        node.properties["__bun__"] = raw.replace("npm create", "bun create");
      }

      if (raw.startsWith("npx")) {
        node.properties["__npm__"] = raw;
        node.properties["__yarn__"] = raw.replace("npx", "yarn");
        node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx");
        node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
      }

      if (raw.startsWith("npm run")) {
        node.properties["__npm__"] = raw;
        node.properties["__yarn__"] = raw.replace("npm run", "yarn");
        node.properties["__pnpm__"] = raw.replace("npm run", "pnpm");
        node.properties["__bun__"] = raw.replace("npm run", "bun");
      }
    },
  },
];

// Adds the line structure (grid + `data-line`) so standalone `highlightCode`
// output matches the DOM rehype-pretty-code emits for MDX code fences.
const lineStructure: ShikiTransformer[] = [
  {
    pre(node) {
      node.properties["style"] = "";
    },
    code(node) {
      node.properties["data-line-numbers"] = "";
      node.properties["style"] = "display: grid";
    },
    line(node, line) {
      node.properties["data-line"] = String(line);
    },
  },
];

/**
 * Highlight a code string to dual-theme HTML for use OUTSIDE MDX — from any
 * server component. Uses the same themes and transformers as the MDX pipeline,
 * so the result is identical to a fenced block in a post.
 */
export async function highlightCode(code: string, language = "tsx"): Promise<string> {
  const cacheKey = createHash("sha256").update(`${language}:${code}`).digest("hex");

  const cached = highlightCache.get(cacheKey);
  if (cached) return cached;

  const html = await codeToHtml(code, {
    lang: language,
    themes: { dark: "github-dark", light: "github-light" },
    defaultColor: false,
    transformers: [...transformers, ...lineStructure],
  });

  highlightCache.set(cacheKey, html);
  return html;
}
