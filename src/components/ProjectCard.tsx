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
 * The whole card is clickable. It is one link, stretched over the card by a
 * pseudo element on the title, rather than a wrapper around everything: that
 * keeps the card to a single tab stop and keeps what a screen reader reads
 * out to the study's title.
 *
 * On click a panel in the study's title gradient zooms up to fill the screen
 * and the route changes underneath it, so the two pages read as continuous.
 */
/**
 * Where each tag lands when the card is hovered, measured from the middle of
 * the tray. The units are container units, so the whole arrangement scales
 * with the card instead of drifting at other widths.
 *
 * There are two sets because the two device shapes leave room in different
 * places. A laptop is wide and low, so its free space is the band above it. A
 * phone is narrow and tall, so its free space is down both sides.
 *
 * Three is the cap. The full list is set out of sight for screen readers.
 */
const LANDSCAPE_SPOTS = [
  { tx: "-27cqw", ty: "-38cqh", rotate: -8 },
  { tx: "1cqw", ty: "-44cqh", rotate: 4 },
  { tx: "29cqw", ty: "-37cqh", rotate: -5 },
];

const PORTRAIT_SPOTS = [
  { tx: "-34cqw", ty: "-25cqh", rotate: -9 },
  { tx: "34cqw", ty: "-11cqh", rotate: 7 },
  { tx: "-35cqw", ty: "15cqh", rotate: -4 },
];

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
  const { zoomTo } = useRouteTransition();

  /* Phones and laptops get laid out differently, and a study with no mockup
     falls back to its cover art in the laptop's slot. */
  const landscape = (project.deviceRatio || 1.6) >= 1;
  const spots = landscape ? LANDSCAPE_SPOTS : PORTRAIT_SPOTS;
  const tiles = project.tags.slice(0, spots.length);
  const artwork = project.device || project.cover;

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
      zoomTo(href, gradient);
    },
    [gradient, href, reduceMotion, zoomTo],
  );

  return (
    <article
      style={cardThemeVars(project.theme)}
      className={cn(
        /* The study's palette is the card's resting state. Hover is scale
           only: the card lifts toward the reader and its cover pushes in
           slightly further, so the motion reads as depth rather than a
           colour change. */
        "group relative grid overflow-hidden rounded-block bg-surface transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:scale-[1.025] focus-within:scale-[1.025] md:grid-cols-2",
        className,
      )}
    >
      <div className={cn("p-4 pb-1 md:p-6", flip && "md:order-2")}>
        {/* A flat tray in the study's own tint with the device standing in
            it. The tags sit hidden behind the device and fly out to their own
            corners on hover, while the device grows up out of the pocket
            along the bottom.

            The tray is a size container, so the tags' travel and the device's
            proportions are all expressed against the tray itself and hold at
            any card width. */}
        <div
          className={cn(
            "relative overflow-hidden rounded-block bg-surface-deep",
            /* A phone needs a squarer tray on mobile to stand up in at any
               size worth looking at. On a laptop the 4:3 tray is right at
               every width. */
            landscape ? "aspect-[4/3]" : "aspect-square sm:aspect-[4/3]",
          )}
          style={{ containerType: "size" }}
        >
          {/* Behind the device at rest, so no fade is needed to hide them.

              Dropped on a phone, where the tray is half the width and the
              longer tags would run off it, and where there is no hover to
              bring them out in the first place. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
          >
            {tiles.map((tag, index) => (
              <span
                key={tag}
                data-tag-tile
                style={
                  {
                    "--rot": `${spots[index].rotate}deg`,
                    "--tx": spots[index].tx,
                    "--ty": spots[index].ty,
                    transitionDelay: `${index * 70}ms`,
                  } as React.CSSProperties
                }
                className={cn(
                  "absolute left-1/2 top-1/2 whitespace-nowrap rounded-[0.7rem] bg-accent px-2 py-1.5 text-[0.54rem] font-semibold uppercase leading-none tracking-[0.05em] text-paper",
                  "[transform:translate(-50%,-50%)_scale(0.35)_rotate(var(--rot))] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "group-hover:[transform:translate(calc(-50%+var(--tx)),calc(-50%+var(--ty)))_rotate(var(--rot))] group-focus-within:[transform:translate(calc(-50%+var(--tx)),calc(-50%+var(--ty)))_rotate(var(--rot))]",
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="sr-only">{project.tags.join(", ")}</p>

          {/* Grows from its own base, so it rises out of the pocket rather
              than swelling in place. */}
          <div
            className={cn(
              "absolute left-1/2 z-10 -translate-x-1/2 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover:scale-[1.06] group-focus-within:scale-[1.06]",
                            /* Bigger on a phone. There is no hover there, so the tags
                 never come out and the device can have the whole tray. */
              landscape
                ? "bottom-[13cqh] w-[86cqw] sm:w-[72cqw]"
                : "bottom-[-11cqh] w-[50cqw] sm:w-[34cqw]",
            )}
          >
            <ImageSlot
              src={artwork}
              alt={project.coverAlt}
              aspect={project.deviceRatio ? String(project.deviceRatio) : "16/9"}
              fit="contain"
              sizes="(min-width: 768px) 34vw, 70vw"
              className="drop-shadow-[0_18px_28px_rgba(0,0,0,0.16)]"
            />
          </div>

          {/* The pocket the device stands in. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-20 h-[12cqh] rounded-t-[1.25rem] bg-surface md:h-[22cqh] md:rounded-t-[2rem]"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center p-5 pt-2 md:p-10">
        {/* The title's overlay is what makes the whole card clickable. One
            link rather than a wrapper around everything, so the card is a
            single tab stop and still announces as the study's title. */}
        <h3 className="text-card">
          <Link
            href={href}
            onClick={handleNavigate}
            className="transition-colors after:absolute after:inset-0 after:z-30 after:content-[''] hover:text-accent focus-visible:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-4 text-sm">{project.summary}</p>


        {/* Three across on one row. Labels stay sentence case, because these
            are phrases rather than the two-word stats a card usually carries. */}
        <dl className="mt-6 grid grid-cols-3 gap-x-5 gap-y-4 border-t border-rule pt-6 md:mt-8">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                {/* A worded value like "In build" is set a step down from a
                    figure. Its ascenders then land at about the height of the
                    digits beside it, where matching the point size would make
                    the phrase read as the loudest thing on the card. */}
                <span
                  className={cn(
                    "block font-display leading-none text-accent",
                    /[A-Za-z]/.test(metric.value) ? "text-xl" : "text-2xl",
                  )}
                >
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
          className="group/cta relative z-40 mt-8 hidden w-fit items-center gap-2.5 md:inline-flex overflow-hidden rounded-full border border-rule px-6 py-3.5 transition-[padding,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:px-9 hover:border-accent focus-visible:px-9 focus-visible:border-accent"
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

      {/* The card rules its own outline on hover, in the study's darker
          accent so the line reads as a deeper shade of the card rather than a
          new colour. Inset by a pixel because the article clips its overflow;
          a stroke centred on the very edge would lose its outer half. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-px h-[calc(100%-2px)] w-[calc(100%-2px)]"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="39"
          ry="39"
          fill="none"
          strokeWidth="1.5"
          pathLength={1}
          className="stroke-accent-deep [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]"
        />
      </svg>
    </article>
  );
}
