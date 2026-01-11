import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectsSection() {
  return (
    <section className="section-padding-y flex flex-col gap-6" id="work">
      <h2 className="trail-highlight font-medium">Projects</h2>
      <div className="grid grid-cols-1 gap-4">
        {PROJECTS.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <CardTitle>
                <h3>{project.name}</h3>
              </CardTitle>
              <CardDescription>
                <p>{project.description}</p>
              </CardDescription>
            </CardHeader>

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

type Project = {
  name: string;
  description: string;
  links: {
    label: string;
    url: string;
  }[];
};

const PROJECTS: Project[] = [
  {
    name: "Themux",
    description: "A shadcn/ui theme generator, supporting Tailwind CSS v3 and v4.",
    links: [
      {
        label: "Preview",
        url: "https://themux.vercel.app",
      },
      {
        label: "Github Repo",
        url: "https://github.com/llanesluis/themux",
      },
    ],
  },
];
