import Link from "next/link";

import { ImageSlot } from "@/components/ImageSlot";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * One case study, as it appears on the home grid and the projects index.
 * The whole card is a single link, so it is one tab stop and one target.
 */
export function ProjectCard({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="flex items-center gap-4">
          <p className="label shrink-0 text-ink">
            {String(index + 1).padStart(2, "0")}
          </p>
          <span aria-hidden className="h-px flex-1 bg-rule" />
          <p className="label shrink-0">{project.year}</p>
        </div>

        <div className="mt-5 overflow-hidden rounded-sm">
          {/* TODO: set `cover` in the MDX frontmatter to replace this slot. */}
          <ImageSlot
            src={project.cover}
            alt={project.coverAlt}
            aspect="4/3"
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>

        <h3 className="mt-6 text-h3 transition-colors group-hover:text-accent">
          {project.title}
        </h3>

        <p className="mt-3 max-w-md text-ink-soft">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="label rounded-full border border-rule px-3 py-1.5"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="label mt-6 inline-flex items-center gap-2 text-ink">
          Read case study
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </p>
      </Link>
    </article>
  );
}
