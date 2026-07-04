"use client";

import { useRef, useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

/**
 * `pre` override for MDX code blocks. Fumadocs emits a bare `<pre class="shiki">`;
 * this wraps it so a copy button can sit in the corner. The code text is read
 * from the rendered `<pre>` at click time, so it survives syntax-highlight spans.
 */
export function Pre({ className, ...props }: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label="Copy Code"
        onClick={async () => {
          await navigator.clipboard.writeText(ref.current?.textContent ?? "");
          setCopied(true);
          toast.success("Code copied to clipboard");
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute top-3 right-3 z-10 inline-flex cursor-pointer items-center rounded-md border bg-background/70 p-1.5 text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100"
      >
        {copied ? <IconCheck className="size-3.5" /> : <IconCopy className="size-3.5" />}
      </button>
      <pre ref={ref} className={cn(className)} {...props} />
    </div>
  );
}
