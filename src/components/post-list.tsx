import Link from "next/link";
import { format } from "date-fns";

import { getSortedPosts } from "@/lib/source";
import { cn } from "@/lib/utils";

type Post = ReturnType<typeof getSortedPosts>[number];

/**
 * Shared list of blog posts — date top-right, dashed separators, title highlight
 * on hover, and the `dim-siblings` hover effect. Used by both the home "Writing"
 * teaser and the blog index so the two read identically.
 */
export function PostList({ posts, className }: { posts: Post[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col divide-y divide-dashed dim-siblings", className)}>
      {posts.map((post) => (
        <li key={post.url}>
          <Link href={post.url} className="group/post flex flex-col gap-1 py-4">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-balance transition-colors group-hover/post:text-highlight">
                {post.data.title}
              </span>
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
  );
}
