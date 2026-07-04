import Link from "next/link";

import { EmailLink } from "@/components/email-link";
import { LogoMark } from "@/components/logo-mark";
import { Separator } from "@/components/ui/separator";
import { SOCIALS } from "@/config/socials";

export function Footer() {
  return (
    <footer className="container flex flex-col gap-6 container-padding-x pt-12 pb-12 lg:pb-24">
      <div className="flex items-center gap-2">
        <Link href="/">
          <LogoMark />
        </Link>
        <Separator className="flex-1 border-t border-dashed bg-transparent" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-2">
          <p className="trail-highlight text-sm">2026</p>
          <p className="text-xs text-muted-foreground">
            Source code available{" "}
            <Link href="https://github.com/llanesluis/website" target="_blank" className="link">
              here
            </Link>
          </p>
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
    </footer>
  );
}
