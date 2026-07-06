import Link from "next/link";

import { PostList } from "@/components/post-list";
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

      <PostList posts={posts} />
    </section>
  );
}
