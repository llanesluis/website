/**
 * Render-blocking inline script for pre-hydration DOM patching (theme, sidebar
 * state, …). On client renders the type flips to text/plain: the copy is
 * explicitly inert and React's dev warning about rendered <script> tags is
 * avoided. See: https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export function InlineScript({
  html,
  ...props
}: { html: string } & Omit<
  React.ComponentProps<"script">,
  "type" | "dangerouslySetInnerHTML" | "children"
>) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}
