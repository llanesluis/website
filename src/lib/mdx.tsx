import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * MDX component overrides for rendered blog posts. Posts are wrapped in
 * `prose-custom`, so the typography plugin handles most elements — this only
 * routes internal links through Next's client-side `<Link>` and opens external
 * links safely. Headless usage: pass this to `<MDX components={...} />`.
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
    ...overrides,
  };
}
