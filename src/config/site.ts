export const SITE_INFO = {
  name: "Luis Llanes, Software Engineer",
  url: process.env.APP_URL || "https://luisllanes.com",
  description: "",
  shortDescription: "",
  ogImage: "",
  keywords: [
    "México",
    "Portfolio",
    "Luis Llanes",
    "Software Engineer",
    "Web Developer",
    "Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Next.js portfolio",
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
