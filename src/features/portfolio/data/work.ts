import type { Work } from "@/features/portfolio/types";

export const WORK: Work[] = [
  {
    type: "work",
    name: "Shadcraft Registry",
    description:
      "A shadcn/ui compatible registry of premium quality, production-ready marketing and application components and blocks.",
    url: "https://registry-shadcraft.vercel.app/",
  },
  {
    type: "work",
    name: "Shadcraft Free Registry",
    description:
      "A free, opensource shadcn/ui compatible registry of marketing components and blocks.",
    url: "https://shadcraft-free.vercel.app/",
  },
  {
    type: "contribution",
    name: "tweakcn",
    description: "A visual no-code theme editor for shadcn/ui components. Features I built:",
    features: [
      "AI theme generation",
      "Custom website preview",
      "Tailwind V4 color picker",
      "Google Fonts picker",
    ],
    url: "https://tweakcn.com/editor/theme?tab=ai&p=custom",
  },
];
