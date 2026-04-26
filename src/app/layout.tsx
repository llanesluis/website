import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_CONFIG } from "@/config/site";
import { fontVariables } from "@/lib/fonts";

export function generateMetadata(): Metadata {
  const title = SITE_CONFIG.title;
  const name = SITE_CONFIG.name;
  const description = SITE_CONFIG.description;
  const url = SITE_CONFIG.url;
  const ogImage = SITE_CONFIG.ogImage;
  const keywords = SITE_CONFIG.keywords;
  const creator = SITE_CONFIG.creator;

  return {
    title: {
      default: title,
      template: `%s – ${name}`,
    },
    metadataBase: new URL(url),
    description,
    keywords,
    authors: [{ name: creator.name, url: url }],
    creator: creator.twitterUsername,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
      creator: creator.twitterUsername,
    },
    publisher: creator.name,
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
    },
  };
}

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
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
          */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
      </head>

      <body className={`flex min-h-svh flex-col overscroll-none scroll-smooth`}>
        <Providers>
          <Header />
          <div className="relative isolate flex flex-1 flex-col">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
