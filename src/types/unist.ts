/**
 * Props the `highlight-code` transformers stash on a `<code>` node for
 * package-manager command blocks (`npm install …`, `npx …`, `npm run …`).
 * The MDX `code` component reads these to render a `CodeBlockCommand`.
 */
export type NpmCommands = {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
};
