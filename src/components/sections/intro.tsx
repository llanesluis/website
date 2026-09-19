import Link from "next/link";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

import { EmailLink } from "@/components/email-link";
import { ExternalLink } from "@/components/external-link";
import { HalftoneImage } from "@/components/halftone-image";
import { LocalTime } from "@/components/local-time";
import { UiRulesLogoMark } from "@/components/ui-rules-logo-mark";
import { AUTHOR } from "@/config/author";
import { SOCIALS } from "@/config/socials";

export function Intro() {
  const initialTime = format(TZDate.tz(AUTHOR.timeZone), "HH:mm");

  return (
    <section className="flex flex-col gap-6 section-padding-y" id="intro">
      <div className="grid w-full grid-cols-[1fr_auto] gap-6">
        <div className="flex flex-col gap-6">
          <Link href="/" className="no-underline">
            <HalftoneImage src={AUTHOR.avatarUrl} alt={AUTHOR.name} className="rounded-none" />
          </Link>

          <div className="flex flex-col gap-6">
            <h1 className="trail-cursor heading">{AUTHOR.name}</h1>
            <p className="text-balance text-muted-foreground">{AUTHOR.blurb}</p>
          </div>

          <ul className="list-custom flex flex-col gap-2">
            {AUTHOR.company && (
              <li className="text-sm">
                Working at{" "}
                <ExternalLink href={AUTHOR.company.url} className="align-bottom link">
                  <UiRulesLogoMark className="mr-1.5" />
                  {AUTHOR.company.name}
                </ExternalLink>
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
              <ExternalLink key={social.name} href={social.url} className={itemClass}>
                {social.name}
              </ExternalLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
