import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { SOCIALS } from "@/config/socials";

export function Footer() {
  return (
    <footer className="container-padding-x container flex flex-col gap-6 pt-12 pb-12 lowercase lg:pb-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm">2026 by Luis Llanes</p>
          <p className="text-muted-foreground text-xs">
            Source code available on{" "}
            <Link href="https://github.com/llanesluis/website" target="_blank">
              GitHub
            </Link>
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {SOCIALS.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              className="text-muted-foreground hover:text-primary/80 text-sm"
            >
              {social.name}
            </Link>
          ))}
        </div>
        <ThemeToggle size="icon-sm" />
      </div>
    </footer>
  );
}
