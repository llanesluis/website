import { ArrowUpRight, Info } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function WorkSection() {
  return (
    <section className="section-padding-y flex flex-col gap-6" id="work">
      <h2 className="heading trail-highlight">My Work</h2>
      <div className="grid grid-cols-1 gap-4">
        {WORK.map((project) => (
          <Card key={project.name} className="group">
            <CardHeader>
              {project.type === "oss-contribution" && (
                <CardAction>
                  <Badge variant="secondary" className="justify-self-end">
                    OSS Contribution
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Not my own project, I&apos;m just a contributor!
                      </TooltipContent>
                    </Tooltip>
                  </Badge>
                </CardAction>
              )}

              <CardTitle className="group-hover:text-highlight transition-colors">
                <h3>{project.name}</h3>
              </CardTitle>
              <CardDescription>
                <p>{project.description}</p>
              </CardDescription>
            </CardHeader>

            {project.content && (
              <CardContent className="flex flex-col gap-2">
                <p>{project.content.text}</p>
                <ul className="list-custom">
                  {project.content.features?.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            )}

            <CardFooter>
              <Link
                href={project.url}
                target="_blank"
                className="link flex items-center gap-1 text-sm"
              >
                Preview <ArrowUpRight className="size-3.5" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

type Work = {
  type: "oss-contribution" | "work";
  name: string;
  description: string;
  details?: string;
  content?: {
    text?: string;
    features?: string[];
  };
  url: string;
};

const WORK: Work[] = [
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
    type: "oss-contribution",
    name: "tweakcn",
    description: "A visual no-code theme editor for shadcn/ui components.",
    content: {
      text: "After 50+ PRs, here are some of the features I built:",
      features: [
        "AI theme generation",
        "Custom website preview",
        "Tailwind V4 color picker",
        "Google Fonts picker",
        "Cards preview",
      ],
    },
    url: "https://tweakcn.com/editor/theme?tab=ai&p=custom",
  },
];
