import { SITE_CONFIG } from "@/config/site";

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

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function deslugify(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function getPageBreadcrumbs(url: string, defaultBreadcrumb: string): string {
  const urlSegments = url.split("/").filter(Boolean);
  urlSegments.pop();
  const breadcrumbs = urlSegments.length
    ? urlSegments.map(deslugify).join(" › ")
    : defaultBreadcrumb;
  return breadcrumbs;
}
