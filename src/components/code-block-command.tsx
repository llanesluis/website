"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
type PackageManager = (typeof MANAGERS)[number];

// Persist the reader's preferred package manager across posts and visits.
const packageManagerAtom = atomWithStorage<PackageManager>("preferred-package-manager", "pnpm");

/**
 * Tabbed npm/pnpm/yarn/bun command block. Fed the per-manager strings the
 * `highlight-code` transformers derive from an `npm …` fence (in MDX), or used
 * standalone with the same props. Self-contained by default; pass `className`
 * to strip the container (the MDX `code` component does this since the figure
 * already provides `bg-code`).
 */
export function CodeBlockCommand({
  className,
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: {
  className?: string;
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}) {
  const [pm, setPm] = useAtom(packageManagerAtom);
  const commands: Record<PackageManager, string | undefined> = {
    pnpm: __pnpm__,
    npm: __npm__,
    yarn: __yarn__,
    bun: __bun__,
  };
  const active = commands[pm] ?? commands.npm ?? "";

  return (
    <Tabs
      value={pm}
      onValueChange={(value) => setPm(value as PackageManager)}
      className={cn("gap-0 overflow-hidden rounded-xl border bg-code", className)}
    >
      <div className="flex items-center justify-between border-b pr-2">
        <TabsList variant="line" className="h-10 rounded-none bg-transparent px-3">
          {MANAGERS.map((manager) => (
            <TabsTrigger
              key={manager}
              value={manager}
              className="rounded-none px-2 font-mono text-xs text-code-number data-active:text-code-foreground"
            >
              {manager}
            </TabsTrigger>
          ))}
        </TabsList>
        <CopyButton
          value={active}
          label="Command"
          className="text-muted-foreground hover:text-foreground"
        />
      </div>

      {MANAGERS.map((manager) => (
        <TabsContent
          key={manager}
          value={manager}
          className="no-scrollbar overflow-x-auto px-4 py-3.5 font-mono text-sm text-code-foreground"
        >
          {commands[manager]}
        </TabsContent>
      ))}
    </Tabs>
  );
}
