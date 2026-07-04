import { CodeBlockCommand } from "@/components/code-block-command";
import { CopyButton } from "@/components/copy-button";
import { getIconForLanguageExtension } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { NpmCommands } from "@/types/unist";

// MDX overrides for the DOM rehype-pretty-code emits: figure > figcaption? > pre > code.
// The shared `transformers` inject `__raw__` (copy) and `__npm__/…` (command tabs).
export const mdxCodeComponents = {
  figure({ className, ...props }: React.ComponentProps<"figure">) {
    const hasPrettyCode = "data-rehype-pretty-code-figure" in props;
    return (
      <figure className={cn(hasPrettyCode && "group/figure not-prose", className)} {...props} />
    );
  },

  figcaption({ className, children, ...props }: React.ComponentProps<"figcaption">) {
    const language =
      "data-language" in props && typeof props["data-language"] === "string"
        ? props["data-language"]
        : null;

    return (
      <figcaption className={cn("h-10 [&_svg]:size-4 [&_svg]:shrink-0", className)} {...props}>
        {language && getIconForLanguageExtension(language)}
        <span className="truncate">{children}</span>
      </figcaption>
    );
  },

  pre({ className, ...props }: React.ComponentProps<"pre">) {
    return (
      <pre
        className={cn(
          "min-w-0 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0",
          className
        )}
        {...props}
      />
    );
  },

  code({
    className,
    __raw__,
    __npm__,
    __yarn__,
    __pnpm__,
    __bun__,
    ...props
  }: React.ComponentProps<"code"> & { __raw__?: string } & NpmCommands) {
    const isCodeBlock = "data-language" in props;
    const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__;

    // `npm install …` / `npx …` fences render as the tabbed command block. The
    // figure already provides `bg-code`, so drop this one's own container.
    if (isNpmCommand) {
      return (
        <CodeBlockCommand
          className="rounded-none border-0 bg-transparent"
          pnpm={__pnpm__}
          yarn={__yarn__}
          npm={__npm__}
          bun={__bun__}
        />
      );
    }

    // Inline code — both markdown `x` and a bare <code>x</code>.
    if (!isCodeBlock && typeof props.children === "string") {
      return <code className={cn("not-prose inline-code", className)} {...props} />;
    }

    // Fenced code block. `__raw__` (from the transformer) feeds the copy button.
    return (
      <>
        {__raw__ && (
          <CopyButton
            text={__raw__}
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2 z-10"
          />
        )}
        <code data-slot="code-block" className={cn(className)} {...props} />
      </>
    );
  },
};
