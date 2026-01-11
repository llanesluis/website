import Link from "next/link";

import { LocalTime } from "@/components/portfolio/local-time";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SOCIALS } from "@/config/socials";

export function OverviewSection() {
  return (
    <section className="section-padding-y flex flex-col gap-6" id="overview">
      <div className="grid w-full grid-cols-[1fr_auto] gap-6">
        <div className="flex flex-col gap-6">
          <Link href="/" className="no-underline">
            <Avatar className="size-12 rounded-none rounded-tr-sm grayscale transition-all hover:grayscale-0">
              <AvatarImage src="https://github.com/llanesluis.png" />
              <AvatarFallback className="rounded-inherit font-mono lowercase">l_</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="trail-highlight font-medium">Luis Llanes</h1>
            <p className="text-muted-foreground text-balance">
              I&apos;m a Frontend Web Developer who cares about the little details.
            </p>
          </div>

          <ul className="list-highlight flex flex-col gap-2">
            <li className="text-sm">Based in México</li>
            <li className="text-sm">
              Working at{" "}
              <Link href="https://shadcraft.com" target="_blank" className="link">
                Shadcraft
              </Link>
            </li>
            <li className="text-sm">
              <LocalTime />
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          {SOCIALS.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              className="link text-right text-sm"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
