import { CopyButton } from "@/components/copy-button";
import { getIconForLanguageExtension } from "@/components/icons";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";

/**
 * Renders a highlighted code block OUTSIDE of MDX, from any server component.
 * Uses the same `highlightCode` (themes + transformers) as the MDX pipeline, so
 * the result is identical to a fenced block in a post. Reuses the same
 * `[data-rehype-pretty-code-figure]` styling from globals.css.
 *
 * @example
 * <CodeBlock lang="ts" title="example.ts" code={`const x = 1;`} />
 */
export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}) {
  const html = await highlightCode(code, lang);

  return (
    <figure data-rehype-pretty-code-figure="" className={cn("group/figure not-prose", className)}>
      {title && (
        <figcaption data-rehype-pretty-code-title="" data-language={lang}>
          {getIconForLanguageExtension(lang)}
          <span className="truncate">{title}</span>
        </figcaption>
      )}

      <CopyButton
        value={code}
        label="Code"
        className="absolute top-3 right-3 z-10 rounded-md border bg-background/70 p-1.5 opacity-0 backdrop-blur transition-opacity group-hover/figure:opacity-100 focus-visible:opacity-100"
      />

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
