import type { MetadataRoute } from "next";

import { LOCKED_SLUGS } from "@/lib/case-study-lock";
import { site } from "@/content/site";

/**
 * Crawlers are kept off the gated studies and off the unlock form itself.
 *
 * This is courtesy, not security. Anything that ignores robots.txt still hits
 * the middleware and still gets sent to /unlock without the password. What it
 * buys is that the URLs and their titles never surface in search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      /* The device mockup under each locked study is the one file that stays
         public, because the card on /projects renders it. Wildcarded rather
         than named with an extension, so re-encoding it does not quietly drop
         it out of Google Images. A more specific Allow beats the Disallow. */
      allow: ["/", ...LOCKED_SLUGS.map((slug) => `/projects/${slug}/device*`)],
      disallow: ["/unlock", ...LOCKED_SLUGS.map((slug) => `/projects/${slug}`)],
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
