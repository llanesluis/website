import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

import { source } from "@/lib/source";

// Serves the raw MDX source of a blog post as `text/markdown`, mirroring the
// post URL: `/blog/[slug]` -> `/llm/blog/[slug]`. Intended for LLMs and tooling
// (see the `X-Robots-Tag` below), and as the target of the post's
// "view as markdown" link.
export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  // `generateParams()` yields `{ slug: string[] }` (catch-all shape); the flat
  // `[slug]` route needs `slug` as a single string.
  return source.generateParams().map((params) => ({ slug: params.slug[0] }));
}

export async function GET(_req: NextRequest, { params }: RouteContext<"/llm/blog/[slug]">) {
  const { slug } = await params;
  const page = source.getPage([slug]);

  if (!page) {
    notFound();
  }

  const raw = await page.data.getText("raw");

  return new NextResponse(raw, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Raw markdown is for tools, not search results.
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
