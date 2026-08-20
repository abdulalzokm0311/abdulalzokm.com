import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Case studies live as MDX files in /content/projects.
 * To add a project: drop in a new .mdx file with the frontmatter below.
 * No code changes needed. The index page, home grid, sitemap and
 * prev/next links all read from here.
 */

export type Metric = {
  value: string;
  label: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  order: number;
  year: string;
  summary: string;
  role: string;
  timeline: string;
  tools: string[];
  tags: string[];
  metrics: Metric[];
  /** Path under /public, or "" while still a placeholder. */
  cover: string;
  coverAlt: string;
  /** Set to false to keep a project in the repo but off the site. */
  published: boolean;
};

export type Project = ProjectMeta & {
  /** Raw MDX body, ready to hand to <MDXRemote source={...} />. */
  content: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function parseFile(filename: string): Project {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    shortTitle: String(data.shortTitle ?? data.title ?? slug),
    order: Number(data.order ?? 999),
    year: String(data.year ?? ""),
    summary: String(data.summary ?? ""),
    role: String(data.role ?? ""),
    timeline: String(data.timeline ?? ""),
    tools: (data.tools as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    metrics: (data.metrics as Metric[]) ?? [],
    cover: String(data.cover ?? ""),
    coverAlt: String(data.coverAlt ?? ""),
    published: data.published !== false,
    content,
  };
}

/** All published projects, in explicit `order`. */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseFile)
    .filter((project) => project.published)
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

/** Powers the "next case study" link at the bottom of each study. Wraps around. */
export function getAdjacentProjects(slug: string) {
  const all = getAllProjects();
  const index = all.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: all[(index - 1 + all.length) % all.length],
    next: all[(index + 1) % all.length],
  };
}
