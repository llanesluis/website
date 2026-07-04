import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

export function EmailLink({ email, className }: { email: string; className?: string }) {
  return (
    <span className={cn("group/email inline-flex items-center gap-1.5", className)}>
      <CopyButton
        value={email}
        label="Email"
        className="opacity-0 transition-opacity group-hover/email:opacity-100"
      />
      Email
    </span>
  );
}
