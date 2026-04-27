/** @type {import("prettier").Config} */
const prettierConfig = {
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  tailwindFunctions: ["cn", "cva", "clsx"],
  tailwindStylesheet: "./src/styles/globals.css",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/",
    "^~/",
    "^\\.\\./",
    "^\\./",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

export default prettierConfig;
