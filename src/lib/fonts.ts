import { Figtree, Geist, Geist_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontVariables = cn(fontSans.variable, fontHeading.variable, fontMono.variable);
