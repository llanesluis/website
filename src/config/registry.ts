export const REGISTRY_CONFIG = {
  /**
   * Registry namespace identifier for shadcn CLI
   * @example "@lllanes" - Users can install components with: `npx shadcn add @lllanes/[component-name]`
   * @see https://ui.shadcn.com/docs/registry/namespace#overview
   */
  namespace: process.env.REGISTRY_NAMESPACE || "@lllanes",
  /**
   * URL pattern for resolving namespaced components
   * The {name} placeholder will be replaced with the component name
   * @example "https://luisllanes.com/r/{name}.json" resolves to "https://luisllanes.com/r/[component-name].json"
   * This tells shadcn CLI where to fetch component definitions when installing with namespace prefix
   * @see https://ui.shadcn.com/docs/registry/namespace#url-pattern-system
   */
  namespaceUrl: process.env.REGISTRY_NAMESPACE_URL || "https://luisllanes.com/r/{name}.json",
};
