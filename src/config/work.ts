import type { Work } from "@/types";

/** Things you've worked on or contributed to. */
export const WORK: Work[] = [
  {
    name: "UI Rules",
    role: "Founding Engineer",
    description: "Brand & design rules for AI-generated UI.",
    url: "https://uirules.com",
  },
  {
    name: "shadcncraft",
    role: "Developer",
    description: "Production-ready shadcn/ui design system.",
    url: "https://shadcncraft.com",
  },
  {
    name: "tweakcn",
    role: "Contributor",
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
