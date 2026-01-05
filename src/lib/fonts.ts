import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontVariables = cn(geistSans.variable, geistMono.variable);
