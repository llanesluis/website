import { SITE_CONFIG } from "@/config/site";

/** Resolve a path against the site's base URL (passes through absolute URLs). */
export function absoluteUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  const base = SITE_CONFIG.url;
  let p = path.trim();
  if (p === "" || p === "/") {
    return base;
  }
  if (!p.startsWith("/")) {
    p = `/${p}`;
  }
  if (p.length > 1 && p.endsWith("/")) {
    p = p.slice(0, -1);
  }
  return `${base}${p}`;
}
