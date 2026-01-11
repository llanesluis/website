import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="container-padding-x bg-background/75 sticky top-0 isolate z-50 container mt-10 overflow-hidden py-3 backdrop-blur-lg">
      <div className="flex h-10 items-center justify-between gap-4">
        <Link href="/" className="font-mono font-medium">
          l<span className="text-highlight">_</span>uis<span className="text-highlight"></span>
        </Link>

        <ThemeToggle size="icon-sm" />
      </div>
    </header>
  );
}
