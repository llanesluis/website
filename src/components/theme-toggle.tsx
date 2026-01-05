"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { META_THEME_COLORS, useMetaColor } from "@/hooks/use-meta-colors";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const { setMetaColor } = useMetaColor();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(resolvedTheme === "dark" ? META_THEME_COLORS.light : META_THEME_COLORS.dark);
  }, [resolvedTheme, setTheme, setMetaColor]);

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={cn("", className)}
          title="Toggle theme"
          {...props}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </ContextMenuTrigger>

      <ContextMenuContent className="*:data-[active=true]:bg-accent *:data-[active=true]:text-accent-foreground space-y-1">
        <ContextMenuItem data-active={theme === "light"} onClick={() => setTheme("light")}>
          <Sun /> Light
        </ContextMenuItem>
        <ContextMenuItem data-active={theme === "dark"} onClick={() => setTheme("dark")}>
          <Moon />
          Dark
        </ContextMenuItem>
        <ContextMenuItem data-active={theme === "system"} onClick={() => setTheme("system")}>
          <Monitor /> System
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
