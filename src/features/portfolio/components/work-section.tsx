import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function WorkSection() {
  return (
    <section className="section-padding-y flex flex-col gap-6" id="work">
      <h2 className="heading trail-highlight">My Work</h2>

      <div className="group/container grid grid-cols-1 divide-y divide-dashed">
        {WORK.map((work) => (
          <Link key={work.name} href={work.url} target="_blank">
            <WorkItem work={work} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function WorkItem({ work }: { work: Work }) {
  return (
    <article className="group/item py-6 transition-opacity ease-out group-hover/container:opacity-50 hover:opacity-100">
      <div className="flex flex-col items-start gap-x-6 gap-y-4 md:flex-row">
        <div className="flex flex-col gap-2 md:w-1/3">
          {work.type === "contribution" && (
            <span className="text-muted-foreground group-hover/item:text-highlight w-fit font-mono text-xs font-medium lowercase">
              Contribution
            </span>
          )}
          <h3 className="text-balance">
            {work.name}{" "}
            <ArrowUpRight className="text-muted-foreground inline-block size-3.5 shrink-0 group-hover/item:visible md:invisible" />
          </h3>
        </div>

        <div className="flex flex-1 flex-col items-start gap-4">
          <p className="text-muted-foreground text-sm text-pretty">{work.description}</p>

          {work.features && (
            <ul className="list-custom text-muted-foreground space-y-1 text-sm">
              {work.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

type Work = {
  type: "contribution" | "work";
  name: string;
  description: string;
  details?: string;
  features?: string[];
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
