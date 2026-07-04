import Link from "next/link";

import { getSortedPosts } from "@/lib/source";

export function Writing() {
  const posts = getSortedPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 section-padding-y" id="writing">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="trail-highlight heading">Writing</h2>
        <Link href="/blog" className="text-sm link">
          All posts
        </Link>
      </div>

      <ul className="group/container flex flex-col divide-y divide-dashed">
        {posts.map((post) => (
          <li key={post.url}>
            <Link
              href={post.url}
              className="group/item flex flex-col gap-1 py-4 transition-opacity ease-out group-hover/container:opacity-50 hover:opacity-100"
            >
              <span className="text-balance">{post.data.title}</span>
              {post.data.description && (
                <span className="text-sm text-pretty text-muted-foreground">
                  {post.data.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
