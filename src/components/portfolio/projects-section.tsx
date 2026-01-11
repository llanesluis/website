import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectsSection() {
  return (
    <section className="section-padding-y flex flex-col gap-6" id="work">
      <h2 className="trail-highlight font-medium">Projects</h2>
      <div className="grid grid-cols-1 gap-4">
        {PROJECTS.map((project) => (
          <Card key={project.name} className="group">
            <CardHeader>
              <CardTitle className="group-hover:text-highlight transition-colors">
                <h3>{project.name}</h3>
              </CardTitle>
              <CardDescription>
                <p>{project.description}</p>
              </CardDescription>
            </CardHeader>

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

type Project = {
  name: string;
  description: string;
  url: string;
};

const PROJECTS: Project[] = [
  {
    name: "Themux",
    description: "A shadcn/ui theme generator, supporting Tailwind CSS v3 and v4.",
    url: "https://themux.vercel.app",
  },
];
