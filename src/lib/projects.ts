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

/**
 * Per case study colour overrides, so a study can carry the brand of the
 * product it is about. Every key maps onto one of the design system's CSS
 * variables, so setting them on the article re-themes the whole template
 * without touching a single component.
 *
 * Anything left unset falls back to the site's own palette.
 */
export type ProjectTheme = {
  /** The page ground. Lets a study sit on cream rather than white. */
  paper?: string;
  accent?: string;
  /** Three stops for the case study title block. All three must be set. */
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  accentDeep?: string;
  surface?: string;
  surfaceDeep?: string;
  ink?: string;
  inkSoft?: string;
  muted?: string;
  rule?: string;
};

const THEME_VARS: Partial<Record<keyof ProjectTheme, string>> = {
  paper: "--color-paper",
  accent: "--color-accent",
  accentDeep: "--color-accent-deep",
  surface: "--color-surface",
  surfaceDeep: "--color-surface-deep",
  ink: "--color-ink",
  inkSoft: "--color-ink-soft",
  muted: "--color-muted",
  rule: "--color-rule",
};

/** Only plain hex colours are allowed through, since this ends up in a
 *  stylesheet. Anything else is dropped rather than escaped. */
const HEX = /^#[0-9a-fA-F]{3,8}$/;

/**
 * Turn a project's theme into a `:root` declaration block.
 *
 * It targets the root rather than a wrapper element so the header and footer
 * pick the theme up too. A case study reading half in the product's colours
 * and half in the site's looks like a bug, not like art direction. The rule
 * is unlayered, so it wins over the layered `@theme` defaults, and it is
 * removed when the route unmounts.
 */
export function themeToCssText(theme: ProjectTheme): string {
  return Object.entries(THEME_VARS)
    .map(([key, variable]) => {
      const value = theme[key as keyof ProjectTheme];
      return value && HEX.test(value) ? `${variable}:${value};` : "";
    })
    .join("");
}

/**
 * The case study title block's background. Returns undefined unless all three
 * stops are present and valid, in which case the block falls back to the flat
 * themed surface.
 */
export function heroGradient(theme: ProjectTheme): string | undefined {
  const { gradientFrom, gradientVia, gradientTo } = theme;
  const stops = [gradientFrom, gradientVia, gradientTo];
  if (!stops.every((stop) => stop && HEX.test(stop))) return undefined;

  return `linear-gradient(158deg, ${gradientFrom} 0%, ${gradientVia} 46%, ${gradientTo} 100%)`;
}

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
