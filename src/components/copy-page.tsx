"use client";

import { useState } from "react";
import {
  IconBrandOpenai,
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconMarkdown,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Builds a deep link that opens an assistant with a prompt about this post. */
function assistantUrl(base: string, url: string) {
  const prompt = `I'm reading this article: ${url}.
Help me understand it — explain concepts, give examples, or help me apply it.`;
  return `${base}?q=${encodeURIComponent(prompt)}`;
}

/**
 * A split "Copy Page" button for blog posts: the primary action copies the raw
 * MDX to the clipboard, and the dropdown links to the raw markdown route plus
 * assistants pre-loaded with a prompt about the post. Ported from the shadcn
 * "copy page" pattern onto Base UI (`render` instead of `asChild`) + Tabler.
 */
export function CopyPage({
  content,
  url,
  markdownUrl,
}: {
  /** Raw MDX source, copied verbatim. */
  content: string;
  /** Absolute post URL, embedded in assistant prompts. */
  url: string;
  /** Path to the raw markdown route (`/llm/blog/[slug]`). */
  markdownUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  const items = [
    { key: "markdown", label: "View as Markdown", href: markdownUrl, icon: <IconMarkdown /> },
    {
      key: "chatgpt",
      label: "Open in ChatGPT",
      href: assistantUrl("https://chatgpt.com", url),
      icon: <IconBrandOpenai />,
    },
  ];

  return (
    <ButtonGroup orientation="horizontal">
      <Button
        variant="secondary"
        size="sm"
        className="max-sm:aspect-square"
        onClick={async () => {
          await navigator.clipboard.writeText(content);
          setCopied(true);
          toast.success("Page copied as Markdown");
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <IconCheck /> : <IconCopy />}
        <span className="max-sm:sr-only">Copy Page</span>
      </Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="secondary" size="icon-sm" aria-label="More Copy Options" />}
        >
          <IconChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {items.map((item) => (
            <DropdownMenuItem
              key={item.key}
              render={<a href={item.href} target="_blank" rel="noopener noreferrer" />}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
