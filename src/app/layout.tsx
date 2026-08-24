import type { Metadata, Viewport } from "next";
import {
  Averia_Serif_Libre,
  Caveat,
  Inclusive_Sans,
} from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { RouteTransitionProvider } from "@/components/transition/RouteTransition";
import { site } from "@/content/site";

import "./globals.css";

/* Headings and the hero statement. Averia Serif Libre only ships 300/400/700;
   the display voice here is 400, set very tight, so nothing heavier is needed. */
const averia = Averia_Serif_Libre({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-averia",
  display: "swap",
});

/* Everything else. Inclusive Sans carries body copy at 400 and the small
   uppercase labels at 600. */
const inclusive = Inclusive_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inclusive",
  display: "swap",
});

/* The handwritten word in the hero, and nothing else. */
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Product Designer",
    "UX Design",
    "Toronto",
    "Portfolio",
    "Abdul Alzokm",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name}, ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${averia.variable} ${inclusive.variable} ${caveat.variable}`}
    >
      <body className="min-h-dvh bg-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>

        <CustomCursor />

        <RouteTransitionProvider>
          <SiteHeader />

          <main id="main" tabIndex={-1} className="outline-none">
            <PageTransition>{children}</PageTransition>
          </main>

          <SiteFooter />
        </RouteTransitionProvider>
      </body>
    </html>
  );
}
