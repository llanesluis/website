import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LocalTime } from "@/features/portfolio/components/local-time";
import { SOCIALS } from "@/features/portfolio/data/socials";

export function OverviewSection() {
  return (
    <section className="flex flex-col gap-6 section-padding-y" id="overview">
      <div className="grid w-full grid-cols-[1fr_auto] gap-6">
        <div className="flex flex-col gap-6">
          <Link href="/" className="no-underline">
            <Avatar className="size-12 rounded-none rounded-tr-sm grayscale transition-all hover:grayscale-0">
              <AvatarImage src="https://github.com/llanesluis.png" />
              <AvatarFallback className="rounded-inherit font-mono lowercase">l_</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex flex-col gap-6">
            <h1 className="trail-highlight heading">Luis Llanes</h1>
            <p className="text-balance text-muted-foreground">
              Hey, I&apos;m a Software Engineer and Web Developer. I like the frontend and I care
              deeply about the little details.
            </p>
          </div>

          <ul className="list-custom flex flex-col gap-2">
            <li className="text-sm">
              Working at{" "}
              <Link href="https://shadcraft.com" target="_blank" className="link">
                Shadcraft
              </Link>
            </li>
            <li className="text-sm">Based in Mexico</li>
            <li className="text-sm">
              <LocalTime />
            </li>
          </ul>
        </div>

        <div className="group flex flex-col items-end gap-4">
          {Object.values(SOCIALS).map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              className="text-sm link transition-opacity delay-50 ease-out group-has-[:hover]:opacity-50 group-has-[:hover]:hover:opacity-100"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
