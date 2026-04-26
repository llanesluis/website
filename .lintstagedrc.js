/** @type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,mdx,css}": "prettier --write",
};

export default lintStagedConfig;
