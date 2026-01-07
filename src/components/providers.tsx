import { ThemeProvider } from "next-themes";

import { ScreenSizeIndicator } from "@/components/screen-size-indicator";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}

      <ScreenSizeIndicator className="fixed right-2 bottom-2" showTooltip />
    </ThemeProvider>
  );
}
