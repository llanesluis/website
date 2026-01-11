import { DM_Sans, Geist_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontVariables = cn(dmSans.variable, geistMono.variable);
