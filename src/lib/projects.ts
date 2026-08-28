import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import {
  cardThemeVars,
  heroGradient,
  themeToCssText,
  type ProjectTheme,
} from "@/lib/project-theme";

export { cardThemeVars, heroGradient, themeToCssText };
export type { ProjectTheme };

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

/** One row of the measured task results table on a case study. */
export type TaskResult = {
  task: string;
  result: string;
  /** Optional qualifier, e.g. "partial". Rendered quieter than the result. */
  note?: string;
};

export type ProjectMeta = {
  slug: string;
  /** Card title on the home grid and index. */
  title: string;
  /** The case study page's own title. Falls back to `title`. */
  headline: string;
  shortTitle: string;
  /** Who the work was for. */
  client: string;
  /** Who else was on it. Empty string for solo work. */
  team: string;
  /** Where the work happened: a course, a company, a client engagement. */
  context: string;
  /** Optional skim summary shown under the spec strip. Omit to hide it. */
  brief: { problem: string; approach: string } | null;
  tasks: TaskResult[];
  /** Caveat printed under the results table. */
  tasksNote: string;
  theme: ProjectTheme;
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
  /** Transparent device mockup shown on the card. */
  device: string;
  /** The mockup's width over its height, so the card can lay it out. */
  deviceRatio: number;
  /** True ratio of the cover file, e.g. "1440/1031". */
  coverAspect: string;
  /** Address shown in the hero's browser chrome. */
  coverUrl: string;
  /** Set false when the cover already is a device mockup and needs no chrome. */
  coverChrome: boolean;
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
    headline: String(data.headline ?? data.title ?? slug),
    shortTitle: String(data.shortTitle ?? data.title ?? slug),
    client: String(data.client ?? ""),
    team: String(data.team ?? ""),
    context: String(data.context ?? ""),
    brief:
      data.brief && data.brief.problem && data.brief.approach
        ? {
            problem: String(data.brief.problem),
            approach: String(data.brief.approach),
          }
        : null,
    tasks: (data.tasks as TaskResult[]) ?? [],
    tasksNote: String(data.tasksNote ?? ""),
    theme: (data.theme as ProjectTheme) ?? {},
    order: Number(data.order ?? 999),
    year: String(data.year ?? ""),
    summary: String(data.summary ?? ""),
    role: String(data.role ?? ""),
    timeline: String(data.timeline ?? ""),
    tools: (data.tools as string[]) ?? [],
    tags: (data.tags as string[]) ?? [],
    metrics: (data.metrics as Metric[]) ?? [],
    cover: String(data.cover ?? ""),
    device: String(data.device ?? ""),
    deviceRatio: Number(data.deviceRatio ?? 0) || 0,
    coverAspect: String(data.coverAspect ?? ""),
    coverUrl: String(data.coverUrl ?? ""),
    coverChrome: data.coverChrome !== false,
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
