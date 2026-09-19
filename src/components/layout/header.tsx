"use client";

import { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";

import { MAIN_NAVIGATION } from "@/config/site";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 0));

  return (
    <header className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] isolate z-50 container container-padding-x sm:sticky sm:top-4 sm:bottom-auto sm:mt-6">
      <div
        data-scrolled={scrolled}
        className="-mx-4 flex h-10 items-center justify-between gap-8 rounded-full border border-dotted bg-background/75 px-4 shadow-xs backdrop-blur-lg transition-[border-color,box-shadow] duration-300 ease-out sm:data-[scrolled=false]:border-transparent sm:data-[scrolled=false]:shadow-none"
      >
        <Link href="/" aria-label="Home" className="font-mono font-medium">
          l<span className="text-highlight">_</span>
        </Link>

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
      </div>
    </header>
  );
}
