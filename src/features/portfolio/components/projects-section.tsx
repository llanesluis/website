import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
  return (
    <section className="flex flex-col gap-6 section-padding-y" id="work">
      <h2 className="trail-highlight heading">Projects</h2>

      <div className="group/container grid grid-cols-1 divide-y">
        {PROJECTS.map((project) => (
          <Link key={project.name} href={project.url} target="_blank">
            <ProjectItem project={project} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <article className="group/item py-6 transition-opacity ease-out group-hover/container:opacity-50 hover:opacity-100">
      <div className="flex flex-col items-start gap-x-6 gap-y-4 md:flex-row">
        <div className="flex flex-col gap-2 md:w-1/3">
          <h3 className="text-balance">
            {project.name}{" "}
            <ArrowUpRight className="inline-block size-3.5 shrink-0 text-muted-foreground group-hover/item:visible md:invisible" />
          </h3>
        </div>

        <div className="flex flex-1 flex-col items-start gap-4">
          <p className="text-sm text-pretty text-muted-foreground">{project.description}</p>
        </div>
      </div>
    </article>
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
    description:
      "A shadcn/ui theme generator, supporting Tailwind CSS v3 and v4. Not longer maintained.",
    url: "https://themux.vercel.app",
  },
];
