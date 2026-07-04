import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { MAIN_NAVIGATION } from "@/config/site";

export function Header() {
  return (
    <header
      style={{ viewTransitionName: "persistent-nav" }}
      className="backdrop-grid sticky top-0 isolate z-50 container mt-10 overflow-hidden bg-background/75 container-padding-x py-3 backdrop-blur-lg"
    >
      <div className="flex h-10 items-center justify-between gap-4">
        <Link href="/" className="font-mono font-medium">
          l<span className="text-highlight">_</span>uis<span className="text-highlight"></span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 font-mono text-sm">
            {MAIN_NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <ThemeToggle size="icon-sm" />
        </div>
      </div>
    </header>
  );
}
