"use client";

import { Moon02Icon, Sun02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-colors";

export function ThemeToggle({ onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const { setMetaColor } = useMetaColor();

  const handleThemeChange = React.useCallback(
    (newTheme: "light" | "dark" | "system") => {
      setTheme(newTheme);
      if (newTheme === "light") {
        setMetaColor(META_THEME_COLORS.light);
      } else if (newTheme === "dark") {
        setMetaColor(META_THEME_COLORS.dark);
      } else {
        // For system, use resolvedTheme to determine the color
        setMetaColor(resolvedTheme === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light);
      }
    },
    [resolvedTheme, setTheme, setMetaColor]
  );

  const switchTheme = React.useCallback(() => {
    handleThemeChange(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, handleThemeChange]);

  const lightIcon = <HugeiconsIcon icon={Sun02Icon} />;
  const darkIcon = <HugeiconsIcon icon={Moon02Icon} />;

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <Button variant="ghost" size="icon" onClick={switchTheme} title="Toggle theme" {...props}>
          {resolvedTheme === "dark" ? lightIcon : darkIcon}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </ContextMenuTrigger>

      <ContextMenuContent className="*:data-[active=true]:bg-accent *:data-[active=true]:text-accent-foreground w-auto min-w-0 space-y-1">
        <ContextMenuItem data-active={theme === "light"} onClick={() => handleThemeChange("light")}>
          Light Mode
        </ContextMenuItem>
        <ContextMenuItem data-active={theme === "dark"} onClick={() => handleThemeChange("dark")}>
          Dark Mode
        </ContextMenuItem>
        <ContextMenuItem
          data-active={theme === "system"}
          onClick={() => handleThemeChange("system")}
        >
          System
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
