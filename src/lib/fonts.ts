import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontVariables = cn(geist.variable, geistMono.variable);
