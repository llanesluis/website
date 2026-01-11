import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WorkSection() {
  return (
    <section className="section-padding-y flex flex-col gap-6" id="work">
      <h2 className="trail-highlight font-medium">My Work</h2>
      <div className="grid grid-cols-1 gap-4">
        {WORK.map((project) => (
          <Card key={project.name}>
            {project.type === "oss-contribution" && (
              <span className="bg-highlight/10 text-highlight w-fit rounded-tr-sm border-l-2 py-1 pr-2 pl-6 text-xs font-medium">
                Open Source Contribution
              </span>
            )}
            <CardHeader>
              <CardTitle>
                <h3>{project.name}</h3>
              </CardTitle>
              <CardDescription>
                <p>{project.description}</p>
              </CardDescription>
            </CardHeader>

            {project.features && (
              <CardContent>
                <ul className="list-highlight list-inside">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            )}

            <CardFooter className="flex gap-2">
              {project.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  className="link flex items-center gap-1 text-sm"
                >
                  {link.label} <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3.5" />
                </Link>
              ))}
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
  features?: string[];
  links: {
    label: string;
    url: string;
  }[];
};

const WORK: Work[] = [
  {
    type: "work",
    name: "Shadcraft Registry",
    description:
      "A shadcn/ui compatible registry of premium quality marketing and application components and blocks, ready to use in your projects.",
    links: [
      {
        label: "Preview",
        url: "https://registry-shadcraft.vercel.app/",
      },
    ],
  },
  {
    type: "work",
    name: "Shadcraft Free Registry",
    description:
      "A shadcn/ui compatible registry of free marketing and application components and blocks, ready to use in your projects.",
    links: [
      {
        label: "Preview",
        url: "https://shadcraft-free.vercel.app/",
      },
      {
        label: "Github Repo",
        url: "https://github.com/shadcraft/shadcraft-free",
      },
    ],
  },
  {
    type: "oss-contribution",
    name: "tweakcn",
    description: "A visual no-code theme editor for shadcn/ui components.",
    features: [
      "AI Theme Generator",
      "Custom website preview",
      "Tailwind V4 color picker",
      "Google Fonts picker",
      "Shadcn-like cards preview",
    ],
    links: [
      {
        label: "Preview",
        url: "https://tweakcn.com/",
      },
      {
        label: "Github Repo",
        url: "https://github.com/jnsahaj/tweakcn",
      },
    ],
  },
];
