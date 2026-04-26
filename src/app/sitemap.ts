import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Add routes e.g. "/blog", etc.
  const routes = [""].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
