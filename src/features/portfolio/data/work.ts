import type { Work } from "@/features/portfolio/types";

export const WORK: Work[] = [
  {
    type: "work",
    name: "shadcncraft",
    description: "Production-ready shadcn/ui design system.",
    url: "https://shadcncraft.com",
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
