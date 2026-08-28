import type { MetadataRoute } from "next";

import { LOCKED_SLUGS } from "@/lib/case-study-lock";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/content/site";

/**
 * The sitemap, built from the same MDX files the site is.
 *
 * The password-gated studies are left out on purpose. They redirect to
 * /unlock before any HTML is sent, so listing them would only point a crawler
 * at a page it is told not to index.
 *
 * No lastModified: file mtimes are the deploy's checkout time, not the day
 * anything was written, and a date that says "all of it, just now" is worse
 * than no date at all.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const locked = new Set<string>(LOCKED_SLUGS);

  const pages = ["/", "/projects", "/about"];

  const studies = getAllProjects()
    .filter((project) => !locked.has(project.slug))
    .map((project) => `/projects/${project.slug}`);

  return [...pages, ...studies].map((path) => ({
    url: new URL(path, site.url).toString(),
  }));
}
