import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: SITE_INFO.name,
    template: `%s | ${SITE_INFO.name}`,
  },
  metadataBase: new URL(SITE_INFO.url),
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [{ name: SITE_INFO.creator.name, url: SITE_INFO.url }],
  creator: SITE_INFO.creator.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_BASE_URL,
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    siteName: SITE_INFO.name,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    images: [SITE_INFO.ogImage],
    creator: SITE_INFO.creator.twitterUsername,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

// Thanks @shadcn-ui, @tailwindcss
const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        <script async crossOrigin="anonymous" src="https://tweakcn.com/live-preview.min.js" />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
      </head>

      <body
        className={`${fontVariables} flex min-h-svh flex-col overscroll-none scroll-smooth lowercase`}
      >
        <Providers>
          <Header />
          <div className="relative isolate flex flex-1 flex-col">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
