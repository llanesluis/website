import { IconExternalLink } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export function ExternalLink({ children, className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    >
      {children}
      <IconExternalLink aria-hidden className="size-3 shrink-0 text-muted-foreground" />
    </a>
  );
}
