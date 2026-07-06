import Link from "next/link";

import { EmailLink } from "@/components/email-link";
import { Separator } from "@/components/ui/separator";
import { AUTHOR } from "@/config/author";
import { SITE_CONFIG, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { SOCIALS } from "@/config/socials";

/** Minimal contact footer: how to reach {@link AUTHOR}, plus the repo it's built from. */
export function Footer() {
  return (
    <footer className="container flex flex-col gap-6 container-padding-x pt-12 pb-12 lg:pb-24">
      <Separator className="border-t border-dashed bg-transparent" />

      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {AUTHOR.name}
          </p>
          <Link href={SOURCE_CODE_GITHUB_URL} target="_blank" className="link">
            {SITE_CONFIG.name} on GitHub
          </Link>
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
