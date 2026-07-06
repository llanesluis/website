// Shared content types. The actual content lives in `src/config/*` — edit those
// to make the site yours.

export type Author = {
  /** Full display name. */
  name: string;
  /** Short wordmark/handle, e.g. shown in the avatar fallback. */
  handle: string;
  /** One-line role, used in the page title and heading. */
  role: string;
  /** Short intro paragraph. */
  blurb: string;
  /** Absolute avatar URL (e.g. a GitHub avatar). */
  avatarUrl: string;
  /** Where you're based, e.g. "Mexico". */
  location: string;
  /** Optional current company/employer. */
  company?: { name: string; url: string };
  /** IANA time zone, e.g. "America/Mazatlan". */
  timeZone: string;
  /** Human label for the time zone, e.g. "GMT-7". */
  timeZoneLabel: string;
  githubUsername: string;
  twitterUsername?: string;
};

export type Social = {
  name: string;
  url: string;
};

export type Work = {
  type: "work" | "contribution";
  name: string;
  description: string;
  /** Optional bullet list, e.g. features you built. */
  features?: string[];
  url: string;
};

export type Project = {
  name: string;
  description: string;
  url: string;
};
