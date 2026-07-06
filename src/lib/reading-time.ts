// Average adult reading speed for prose, in words per minute. Deliberately on
// the lower end so estimates never feel rushed.
const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time in minutes from a post's raw MDX source.
 *
 * Strips the frontmatter block, fenced code, and JSX/markdown punctuation so
 * only prose counts, then divides by {@link WORDS_PER_MINUTE}. Always returns at
 * least 1. Prefer a `readingTime` value from frontmatter when the author set one
 * — this is the fallback for when they didn't.
 */
export function getReadingTime(raw: string): number {
  const prose = raw
    // Leading frontmatter block (--- ... ---).
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    // Fenced code blocks — code shouldn't count toward reading time.
    .replace(/```[\s\S]*?```/g, "")
    // JSX/HTML tags.
    .replace(/<[^>]+>/g, " ")
    // Markdown/MDX punctuation, so tokens aren't counted as words.
    .replace(/[#>*_`~[\]()!]/g, " ");

  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Formats a minute estimate for display, e.g. `"3 min read"`. */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
