import { tz } from "@date-fns/tz";
import { format } from "date-fns";

/**
 * Formats a post date in UTC.
 *
 * Frontmatter dates are calendar dates (`"2026-01-15"`), which parse as UTC
 * midnight. Formatting them in the viewer's local zone rolls the date back a day
 * anywhere west of UTC (e.g. `2026-01-15` shows as Jan 14 in GMT-7). Pinning the
 * format to UTC keeps the displayed date identical to what's written.
 */
export function formatPostDate(date: string | Date, fmt = "MMMM d, yyyy"): string {
  return format(new Date(date), fmt, { in: tz("UTC") });
}
