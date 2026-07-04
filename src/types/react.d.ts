import type { ComponentType, ReactNode } from "react";

// Next.js bundles a React canary that ships `<ViewTransition>` and
// `addTransitionType` at runtime, but `@types/react` only exposes them behind a
// gated `canary.d.ts`. This augmentation surfaces the real (non-`unstable_`)
// names so `tsc` matches what actually runs. Remove once `@types/react` ships
// these as stable exports.
type ViewTransitionClass = string | Record<string, string>;

declare module "react" {
  export interface ViewTransitionProps {
    children?: ReactNode;
    name?: string;
    default?: ViewTransitionClass;
    enter?: ViewTransitionClass;
    exit?: ViewTransitionClass;
    update?: ViewTransitionClass;
    share?: ViewTransitionClass;
    onEnter?: (instance: Element, types: string[]) => void;
    onExit?: (instance: Element, types: string[]) => void;
    onShare?: (instance: Element, types: string[]) => void;
    onUpdate?: (instance: Element, types: string[]) => void;
  }

  export const ViewTransition: ComponentType<ViewTransitionProps>;
  export function addTransitionType(type: string): void;
}
