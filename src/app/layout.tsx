import type { Metadata, Viewport } from "next";
import { Afacad, Rubik } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PageTransition } from "@/components/PageTransition";
import { RouteTransitionProvider } from "@/components/transition/RouteTransition";
import { site } from "@/content/site";

import "./globals.css";

/* Headings. Afacad is a warm humanist face that holds up at 56px in the hero
   and at 20px on a card, which is why it carries every heading on the site. */
const afacad = Afacad({
  subsets: ["latin"],
  variable: "--font-afacad",
  display: "swap",
});

/* Everything else. Rubik runs light (300) as body copy and steps up to 500
   for eyebrows, tags and UI. */
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-rubik",
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
      className={`${afacad.variable} ${rubik.variable}`}
    >
      <body className="min-h-dvh bg-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>

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
