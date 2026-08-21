/**
 * Pure theme helpers, kept free of node:fs so client components can import
 * them. The MDX loader in projects.ts re-exports everything here, so existing
 * imports from "@/lib/projects" keep working.
 */

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

/**
 * Site defaults, mirrored from the @theme block in globals.css. Every --t-*
 * variable has to resolve to something, because the theme-hover utility remaps
 * the design tokens onto them with no fallback. A project theme that omits a
 * key falls back here rather than producing an invalid declaration.
 */
const SITE_DEFAULTS: Required<ProjectTheme> = {
  paper: "#ffffff",
  surface: "#f4f1f1",
  surfaceDeep: "#ebe6e6",
  ink: "#121212",
  inkSoft: "#505050",
  muted: "#757575",
  rule: "#e6e1e1",
  accent: "#8a1212",
  accentDeep: "#5e0c0c",
  gradientFrom: "#f4f1f1",
  gradientVia: "#ebe6e6",
  gradientTo: "#e6e1e1",
};

/**
 * The project's palette as --t-* custom properties, for a card that adopts its
 * case study's colours on hover. Read by the theme-hover utility.
 */
export function cardThemeVars(theme: ProjectTheme): Record<string, string> {
  const merged = { ...SITE_DEFAULTS, ...theme };
  const vars: Record<string, string> = {};

  for (const [key, variable] of Object.entries(THEME_VARS)) {
    const value = merged[key as keyof ProjectTheme];
    if (value && HEX.test(value)) {
      vars[variable.replace("--color-", "--t-")] = value;
    }
  }

  return vars;
}
