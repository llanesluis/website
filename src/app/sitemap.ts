import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site";
import { getSortedPosts } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog"].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const posts = getSortedPosts().map((post) => ({
    url: `${SITE_CONFIG.url}${post.url}`,
    lastModified: new Date(post.data.date).toISOString(),
  }));

  return [...staticRoutes, ...posts];
}
