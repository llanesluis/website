import type { Metadata } from "next";

import { PostList } from "@/components/post-list";
import { getSortedPosts } from "@/lib/source";

export const metadata: Metadata = { title: "Blog" };

export default function BlogIndexPage() {
  const posts = getSortedPosts();
  if (posts.length === 0) return null;

  return (
    <main className="container container-padding-x section-padding-y">
      <div className="flex flex-col gap-6">
        <h1 className="trail-highlight heading">Writing</h1>
        <PostList posts={posts} />
      </div>
    </main>
  );
}
