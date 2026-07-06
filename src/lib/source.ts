import { blog } from "collections/server";
import { loader } from "fumadocs-core/source";

// Headless Fumadocs loader for the blog. Pages are rendered by the site's own
// components (see `src/app/blog`), not the Fumadocs UI theme.
export const source = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});

/** All published blog posts, newest first. */
export function getSortedPosts() {
  return source
    .getPages()
    .filter((page) => page.data.published !== false)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}
