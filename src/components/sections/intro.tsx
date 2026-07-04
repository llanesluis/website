import Link from "next/link";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

import { EmailLink } from "@/components/email-link";
import { LocalTime } from "@/components/local-time";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AUTHOR } from "@/config/author";
import { SOCIALS } from "@/config/socials";

export function Intro() {
  const initialTime = format(TZDate.tz(AUTHOR.timeZone), "HH:mm");

  return (
    <section className="flex flex-col gap-6 section-padding-y" id="intro">
      <div className="grid w-full grid-cols-[1fr_auto] gap-6">
        <div className="flex flex-col gap-6">
          <Link href="/" className="no-underline">
            <Avatar className="size-12 rounded-none rounded-tr-sm grayscale transition-all hover:grayscale-0">
              <AvatarImage src={AUTHOR.avatarUrl} />
              <AvatarFallback className="rounded-inherit font-mono lowercase">
                {AUTHOR.handle.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex flex-col gap-6">
            <h1 className="trail-highlight heading">{AUTHOR.name}</h1>
            <p className="text-balance text-muted-foreground">{AUTHOR.blurb}</p>
          </div>

          <ul className="list-custom flex flex-col gap-2">
            {AUTHOR.company && (
              <li className="text-sm">
                Working at{" "}
                <Link href={AUTHOR.company.url} target="_blank" className="link">
                  {AUTHOR.company.name}
                </Link>
              </li>
            )}
            <li className="text-sm">Based in {AUTHOR.location}</li>
            <li className="text-sm">
              <LocalTime initial={initialTime} />
            </li>
          </ul>
        </div>

        <div className="group flex flex-col items-end gap-4">
          {Object.values(SOCIALS).map((social) => {
            const itemClass =
              "text-sm link transition-opacity delay-50 ease-out group-has-[:hover]:opacity-50 group-has-[:hover]:hover:opacity-100";

            return social.url.startsWith("mailto:") ? (
              <EmailLink
                key={social.name}
                email={social.url.replace("mailto:", "")}
                className={itemClass}
              />
            ) : (
              <Link key={social.name} href={social.url} target="_blank" className={itemClass}>
                {social.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
