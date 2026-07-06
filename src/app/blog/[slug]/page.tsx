import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CopyPage } from "@/components/copy-page";
import { formatPostDate } from "@/lib/dates";
import { getMDXComponents } from "@/lib/mdx";
import { formatReadingTime, getReadingTime } from "@/lib/reading-time";
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
  const readingTime = page.data.readingTime ?? getReadingTime(raw);

  return (
    <main className="container container-padding-x section-padding-y">
      <article className="prose-custom prose-no-margin">
        <div className="not-prose mb-8 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="trail-highlight heading text-2xl">{page.data.title}</h1>
            <p className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
              <time dateTime={new Date(page.data.date).toISOString()} className="whitespace-nowrap">
                {formatPostDate(page.data.date)}
              </time>
              <span aria-hidden>·</span>
              <span className="whitespace-nowrap">{formatReadingTime(readingTime)}</span>
            </p>
          </div>
          <CopyPage content={raw} url={absoluteUrl(page.url)} markdownUrl={`/llm${page.url}`} />
        </div>
        <MDX components={getMDXComponents()} />
      </article>
    </main>
  );
}
