import type { Metadata } from "next";

import { ScreenSizeIndicator } from "@/components/screen-size-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_CONFIG } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  metadataBase: new URL(SITE_CONFIG.homepageUrl),
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.creator.name, url: SITE_CONFIG.homepageUrl }],
  creator: SITE_CONFIG.creator.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_BASE_URL,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.homepageUrl}/opengraph-image.png`, // TODO: Add opengraph image
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.homepageUrl}/opengraph-image.png`], // TODO: Add opengraph image
    creator: SITE_CONFIG.creator.twitterHandle,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async crossOrigin="anonymous" src="https://tweakcn.com/live-preview.min.js" />
      </head>

      <body
        className={`${fontVariables} flex min-h-svh flex-col overscroll-none scroll-smooth font-mono antialiased`}
      >
        <ThemeProvider>
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />

          <ScreenSizeIndicator className="fixed right-2 bottom-2" showTooltip />
        </ThemeProvider>
      </body>
    </html>
  );
}
