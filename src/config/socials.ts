import type { Social } from "@/types";

/** Your links. The `mailto:` entry is rendered as a hover-to-copy email. */
export const SOCIALS = {
  github: { name: "GitHub", url: "https://github.com/llanesluis" },
  linkedin: { name: "LinkedIn", url: "https://www.linkedin.com/in/llanesluis/" },
  twitter: { name: "Twitter", url: "https://x.com/luisllanes_" },
  email: { name: "Email", url: "mailto:luisllaboj@gmail.com" },
} satisfies Record<string, Social>;
