import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
