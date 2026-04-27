import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(mobileBreakpoint = MOBILE_BREAKPOINT) {
  const query = React.useMemo(() => `(max-width: ${mobileBreakpoint - 1}px)`, [mobileBreakpoint]);

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = React.useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}
