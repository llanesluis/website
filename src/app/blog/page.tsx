import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";

import { getSortedPosts } from "@/lib/source";

export const metadata: Metadata = { title: "Blog" };

export default function BlogIndexPage() {
  const posts = getSortedPosts();
  if (posts.length === 0) return null;

  return (
    <main className="container container-padding-x section-padding-y">
      <h1 className="trail-highlight heading">Writing</h1>

      <ul className="mt-8 flex flex-col divide-y divide-dashed">
        {posts.map((post) => (
          <li key={post.url} className="py-6">
            <Link href={post.url} className="group flex flex-col gap-1">
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-balance group-hover:text-highlight">{post.data.title}</span>
                <time
                  dateTime={new Date(post.data.date).toISOString()}
                  className="shrink-0 font-mono text-xs text-muted-foreground"
                >
                  {format(new Date(post.data.date), "MMM d, yyyy")}
                </time>
              </span>
              {post.data.description && (
                <span className="text-sm text-pretty text-muted-foreground">
                  {post.data.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
