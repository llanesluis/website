"use client";

import * as React from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";

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

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setMetaColor(
      newTheme === "dark" || (newTheme === "system" && resolvedTheme === "dark")
        ? META_THEME_COLORS.dark
        : META_THEME_COLORS.light
    );
  };

  const switchTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(resolvedTheme === "dark" ? META_THEME_COLORS.light : META_THEME_COLORS.dark);
  };

  useHotkeys("d, m", () => switchTheme());

  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={switchTheme}
            title="Toggle Theme"
            {...props}
          />
        }
      >
        <IconSun className="hidden dark:block" />
        <IconMoon className="block dark:hidden" />
        <span className="sr-only">Toggle Theme</span>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-auto min-w-0 space-y-1 *:data-[active=true]:bg-accent *:data-[active=true]:text-accent-foreground">
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
