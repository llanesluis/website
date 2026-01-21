export const SITE_INFO = {
  name: "Luis Llanes | Software Engineer and Web Developer",
  url: process.env.APP_URL || "https://luisllanes.com",
  description:
    "Software Engineer and Web Developer who cares deeply about the little details; working at Shadcraft.",
  shortDescription: "Software Engineer and Web Developer who cares about the little details.",
  ogImage: "https://luisllanes.com/assets/opengraph-image.png",
  keywords: [
    "Software Engineer",
    "Developer",
    "Web Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Next.js portfolio",
    "México",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "shadcn",
  ],
  creator: {
    name: "Luis Llanes",
    twitterUsername: "@luisllanes_",
    githubUsername: "llanesluis",
  },
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#0a0a0a",
};

export const MAIN_NAVIGATION = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
] as const;

export const GITHUB_USERNAME = "llanesluis";
export const SOURCE_CODE_GITHUB_REPO = "llanesluis/website";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/llanesluis/website";
export const SPONSORSHIP_URL = "https://github.com/sponsors/llanesluis";
