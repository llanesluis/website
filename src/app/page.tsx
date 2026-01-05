import { Briefcase01Icon, Location04Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SOCIALS } from "@/config/socials";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Home() {
  return (
    <>
      <div className="bg-muted text-muted-foreground z-50 w-full py-2 text-sm lowercase">
        <div className="container-padding-x container text-center">website under construction</div>
      </div>

      <main className="container-padding-x container lowercase">
        <HeroSection />
      </main>
    </>
  );
}

function HeroSection() {
  return (
    <section className="section-padding-y flex flex-col gap-6">
      <div className="grid w-full grid-cols-[1fr_auto] gap-6">
        <div className="flex flex-col gap-6">
          <Link href="/" className="no-underline">
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/llanesluis.png" />
              <AvatarFallback>LL</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Luis Llanes</h1>
            <p className="text-muted-foreground text-balance">
              Hey, I&apos;m a software engineer. I build web apps and I care about user experience
              and the little details.
            </p>
          </div>

          <ul className="flex flex-col gap-2 border-l-2 pl-2">
            <li className="flex items-center gap-2 text-sm">
              <HugeiconsIcon icon={Location04Icon} className="text-muted-foreground size-4" />
              Based in México
            </li>
            <li className="flex items-center gap-2 text-sm">
              <HugeiconsIcon icon={Briefcase01Icon} className="text-muted-foreground size-4" />{" "}
              Working at{" "}
              <Link href="https://shadcraft.com" target="_blank">
                Shadcraft
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          {SOCIALS.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              className="text-muted-foreground hover:text-primary/80 text-sm"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
