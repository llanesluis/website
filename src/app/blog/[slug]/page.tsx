import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";

import { CopyPage } from "@/components/copy-page";
import { getMDXComponents } from "@/lib/mdx";
import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/url";

export function generateStaticParams() {
  // `source.generateParams()` yields `{ slug: string[] }` (shaped for a catch-all
  // route); the flat `[slug]` route needs `slug` as a single string.
  return source.generateParams().map((params) => ({ slug: params.slug[0] }));
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
  const raw = await page.data.getText("raw");

  return (
    <main className="container container-padding-x section-padding-y">
      <article className="prose-no-margin prose-custom">
        <div className="not-prose mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="trail-highlight heading text-2xl">{page.data.title}</h1>
            <time
              dateTime={new Date(page.data.date).toISOString()}
              className="font-mono text-xs text-muted-foreground"
            >
              {format(new Date(page.data.date), "MMMM d, yyyy")}
            </time>
          </div>
          <CopyPage content={raw} url={absoluteUrl(page.url)} markdownUrl={`/llm${page.url}`} />
        </div>
        <MDX components={getMDXComponents()} />
      </article>
    </main>
  );
}
