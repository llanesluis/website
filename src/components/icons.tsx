import {
  IconBrandCss3,
  IconBrandGolang,
  IconBrandHtml5,
  IconBrandPython,
  IconBrandRust,
  IconBrandVue,
  IconCode,
  IconFileTypeJs,
  IconFileTypeJsx,
  IconFileTypeTs,
  IconFileTypeTsx,
  IconJson,
  IconMarkdown,
  IconTerminal2,
} from "@tabler/icons-react";

// Language/extension → icon. Extend as needed; unknown languages fall back to a
// generic code icon so a titled block always shows something.
const iconByLanguage: Record<string, typeof IconCode> = {
  ts: IconFileTypeTs,
  typescript: IconFileTypeTs,
  tsx: IconFileTypeTsx,
  js: IconFileTypeJs,
  javascript: IconFileTypeJs,
  mjs: IconFileTypeJs,
  cjs: IconFileTypeJs,
  jsx: IconFileTypeJsx,
  json: IconJson,
  jsonc: IconJson,
  css: IconBrandCss3,
  html: IconBrandHtml5,
  vue: IconBrandVue,
  py: IconBrandPython,
  python: IconBrandPython,
  rs: IconBrandRust,
  rust: IconBrandRust,
  go: IconBrandGolang,
  md: IconMarkdown,
  mdx: IconMarkdown,
  markdown: IconMarkdown,
  sh: IconTerminal2,
  bash: IconTerminal2,
  zsh: IconTerminal2,
  shell: IconTerminal2,
  console: IconTerminal2,
  terminal: IconTerminal2,
};

/** Returns an icon element for a code fence's language (for the title bar). */
export function getIconForLanguageExtension(language: string) {
  const Icon = iconByLanguage[language.toLowerCase()] ?? IconCode;
  return <Icon />;
}
