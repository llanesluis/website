import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { WORK } from "@/features/portfolio/data/work";
import type { Work } from "@/features/portfolio/types";

export function WorkSection() {
  return (
    <section className="flex flex-col gap-6 section-padding-y" id="work">
      <h2 className="trail-highlight heading">My Work</h2>

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
            <span className="w-fit font-mono text-xs font-medium text-muted-foreground lowercase group-hover/item:text-highlight">
              Contribution
            </span>
          )}
          <h3 className="text-balance">
            {work.name}{" "}
            <ArrowUpRight className="inline-block size-3.5 shrink-0 text-muted-foreground group-hover/item:visible md:invisible" />
          </h3>
        </div>

        <div className="flex flex-1 flex-col items-start gap-4">
          <p className="text-sm text-pretty text-muted-foreground">{work.description}</p>

          {work.features && (
            <ul className="list-custom space-y-1 text-sm text-muted-foreground">
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
