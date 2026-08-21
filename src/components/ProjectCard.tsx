"use client";

import { useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback } from "react";

import { Icon } from "@/components/Icon";
import { ImageSlot } from "@/components/ImageSlot";
import { cardThemeVars, heroGradient } from "@/lib/project-theme";
import type { Project } from "@/lib/projects";
import { useRouteTransition } from "@/components/transition/RouteTransition";
import { cn } from "@/lib/utils";

/**
 * One case study as a full-width card: media on one side, the story and the
 * numbers on the other. Cards alternate sides down the page.
 *
 * The card is not one big link. The title and the explicit "View case study"
 * action are the links, so the tags and metrics stay selectable and the tab
 * order stays predictable.
 *
 * On hover it adopts the study's own palette. On click a panel in that study's
 * title gradient swipes across the screen and the route changes underneath it,
 * so the two pages read as continuous.
 */
export function ProjectCard({
  project,
  flip = false,
  className,
}: {
  project: Project;
  /** Put the media on the right instead of the left. */
  flip?: boolean;
  className?: string;
}) {
  const href = `/projects/${project.slug}`;
  const reduceMotion = useReducedMotion();
  const { swipeTo } = useRouteTransition();

  const gradient =
    heroGradient(project.theme) ??
    (project.theme.accent ? `linear-gradient(158deg, ${project.theme.accent}, ${project.theme.accent})` : "");

  /**
   * Hand off to the layout-level swipe. With reduced motion the click is left
   * alone and the link navigates normally.
   */
  const handleNavigate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduceMotion) return;
      // Let modified clicks open in a new tab as usual.
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();
      swipeTo(href, gradient);
    },
    [gradient, href, reduceMotion, swipeTo],
  );

  return (
    <article
      style={cardThemeVars(project.theme)}
      className={cn(
        "theme-hover group grid overflow-hidden rounded-block bg-surface md:grid-cols-2",
        className,
      )}
    >
      <div className={cn("p-4 md:p-6", flip && "md:order-2")}>
        {/* TODO: set `cover` in the MDX frontmatter to replace this slot. */}
        <ImageSlot
          src={project.cover}
          alt={project.coverAlt}
          aspect="4/3"
          sizes="(min-width: 768px) 46vw, 92vw"
          className="rounded-card"
        />
      </div>

      <div className="flex flex-col justify-center p-6 md:p-10">
        <p className="eyebrow text-accent">{project.shortTitle}</p>

        <h3 className="text-card mt-3">
          <Link
            href={href}
            onClick={handleNavigate}
            className="transition-colors hover:text-accent focus-visible:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-4 text-sm">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="eyebrow rounded-full bg-paper px-3 py-2 text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Three across on one row. Labels stay sentence case, because these
            are phrases rather than the two-word stats a card usually carries. */}
        <dl className="mt-8 grid grid-cols-3 gap-x-5 gap-y-4 border-t border-rule pt-6">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block font-display text-2xl leading-none text-accent">
                  {metric.value}
                </span>
                <span
                  aria-hidden
                  className="mt-2 block text-xs leading-snug text-muted first-letter:uppercase"
                >
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Expands on hover: the pill grows, the fill wipes in from the left,
            and the arrow hands off to a second copy so it reads as leaving
            rather than nudging. */}
        <Link
          href={href}
          onClick={handleNavigate}
          className="group/cta relative mt-8 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full border border-rule px-6 py-3.5 transition-[padding,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:px-9 hover:border-accent focus-visible:px-9 focus-visible:border-accent"
        >
          <span
            aria-hidden
            className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-x-100 group-focus-visible/cta:scale-x-100"
          />

          <span className="eyebrow relative whitespace-nowrap text-ink transition-colors duration-300 group-hover/cta:text-paper group-focus-visible/cta:text-paper">
            View case study
          </span>

          <span
            aria-hidden
            className="relative block h-4 w-4 shrink-0 overflow-hidden text-ink transition-colors duration-300 group-hover/cta:text-paper group-focus-visible/cta:text-paper"
          >
            <Icon
              name="arrow"
              className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-5 group-focus-visible/cta:translate-x-5"
            />
            <Icon
              name="arrow"
              className="absolute inset-0 h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-0 group-focus-visible/cta:translate-x-0"
            />
          </span>
        </Link>

      </div>
    </article>
  );
}
