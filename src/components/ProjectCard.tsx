import Link from "next/link";

import { Icon } from "@/components/Icon";
import { ImageSlot } from "@/components/ImageSlot";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * One case study as a full-width card: media on one side, the story and the
 * numbers on the other. Cards alternate sides down the page.
 *
 * The card is not one big link. The title and the explicit "View case study"
 * action are the links, so the tags and metrics stay selectable and the tab
 * order stays predictable.
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

  return (
    <article
      className={cn(
        "group grid overflow-hidden rounded-block bg-surface md:grid-cols-2",
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

        <Link
          href={href}
          className="eyebrow mt-8 inline-flex w-fit items-center gap-2 text-ink transition-colors hover:text-accent"
        >
          View case study
          <Icon
            name="arrow"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
