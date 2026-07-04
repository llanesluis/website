import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { mdxCodeComponents } from "@/components/mdx-code-block";

/**
 * Renders a heading whose text links to itself, revealing a `#` on hover.
 * Fumadocs already assigns each heading an `id` (used by the TOC and by
 * `scroll-mt` in globals.css), so this only adds the anchor affordance.
 */
function anchoredHeading(Tag: "h2" | "h3" | "h4") {
  return function Heading({ id, children, ...props }: React.ComponentProps<"h2">) {
    if (!id) {
      return <Tag {...props}>{children}</Tag>;
    }
    return (
      <Tag id={id} {...props}>
        <a
          href={`#${id}`}
          className="group/anchor text-inherit no-underline hover:text-inherit hover:no-underline"
        >
          {children}
          <span
            aria-hidden
            className="ml-1.5 text-highlight opacity-0 transition-opacity group-hover/anchor:opacity-100"
          >
            #
          </span>
        </a>
      </Tag>
    );
  };
}

/**
 * MDX component overrides for rendered blog posts. Posts are wrapped in
 * `prose-custom`, so the typography plugin handles most elements — this routes
 * internal links through Next's `<Link>`, opens external links safely, gives
 * headings hover anchors, and adds a copy button to code blocks. Headless usage:
 * pass this to `<MDX components={...} />`.
 */
export function getMDXComponents(overrides?: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", ...props }) => {
      const isInternal = href.startsWith("/") || href.startsWith("#");
      return isInternal ? (
        <Link href={href} {...props} />
      ) : (
        <a href={href} target="_blank" rel="noreferrer" {...props} />
      );
    },
    h2: anchoredHeading("h2"),
    h3: anchoredHeading("h3"),
    h4: anchoredHeading("h4"),
    ...mdxCodeComponents,
    ...overrides,
  };
}
