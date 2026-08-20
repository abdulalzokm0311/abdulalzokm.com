import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Icon } from "@/components/Icon";
import { ImageSlot } from "@/components/ImageSlot";
import { mdxComponents } from "@/components/case-study/mdx";
import { getAdjacentProjects, getAllProjects, getProject } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.headline,
    description: project.summary,
    openGraph: {
      title: project.headline,
      description: project.summary,
      type: "article",
    },
  };
}

/** The spec strip. A definition list on hairlines, not a row of cards. */
function Spec({ label, value }: { label: string; value: string }) {
  if (!value) return null;

  return (
    <div className="border-t border-rule pt-4">
      <dt className="eyebrow text-muted">{label}</dt>
      <dd className="mt-2 text-sm text-ink">{value}</dd>
    </div>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { next } = getAdjacentProjects(slug);

  return (
    <article>
      {/* Title block. Carries the hero tint so the study opens on a surface
          rather than starting cold on white. */}
      <header className="bg-surface">
        <div className="shell py-16 md:py-24">
          <Link
            href="/projects"
            className="eyebrow inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
          >
            <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" />
            All case studies
          </Link>

          <p className="eyebrow mt-10 text-accent">
            {project.client || project.shortTitle}
            {project.year ? (
              <span className="text-muted"> / {project.year}</span>
            ) : null}
          </p>

          <h1 className="text-hero mt-4 max-w-4xl font-normal">
            {project.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-sub text-ink">{project.summary}</p>
        </div>
      </header>

      <div className="shell">
        <div className="-mt-8 md:-mt-12">
          {/* TODO: set `cover` in the frontmatter to fill this. */}
          <ImageSlot
            src={project.cover}
            alt={project.coverAlt}
            aspect="16/9"
            sizes="100vw"
            priority
          />
        </div>

        <dl className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          <Spec label="Role" value={project.role} />
          <Spec label="Team" value={project.team} />
          <Spec label="Timeline" value={project.timeline} />
          <Spec label="Tools" value={project.tools.join(", ")} />
          <Spec label="Context" value={project.context} />
        </dl>

        {/* The story. */}
        <div className="pb-8">
          <MDXRemote source={project.content} components={mdxComponents} />
        </div>

        {/* Measured outcomes, read as a table because that is what they are. */}
        {project.tasks.length > 0 ? (
          <section className="mt-20">
            <h2 className="text-section max-w-3xl">Measured task outcomes</h2>

            <table className="mt-8 w-full border-collapse text-left">
              <caption className="sr-only">
                Task success rates from moderated usability testing
              </caption>
              <thead>
                <tr className="border-b border-rule">
                  <th scope="col" className="eyebrow py-3 font-medium text-muted">
                    Task
                  </th>
                  <th
                    scope="col"
                    className="eyebrow py-3 text-right font-medium text-muted"
                  >
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.tasks.map((task) => (
                  <tr key={task.task} className="border-b border-rule">
                    <th
                      scope="row"
                      className="py-5 pr-6 text-base font-normal text-ink"
                    >
                      {task.task}
                    </th>
                    <td className="py-5 text-right align-middle">
                      <span className="font-display text-3xl leading-none text-accent">
                        {task.result}
                      </span>
                      {task.note ? (
                        <span className="eyebrow ml-3 text-muted">
                          {task.note}
                        </span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {project.tasksNote ? (
              <p className="mt-6 max-w-2xl text-sm text-muted">
                {project.tasksNote}
              </p>
            ) : null}
          </section>
        ) : null}
      </div>

      {/* Next study. */}
      {next && next.slug !== project.slug ? (
        <nav className="shell mt-24" aria-label="Next case study">
          <Link
            href={`/projects/${next.slug}`}
            className="group block border-t border-rule pt-8"
          >
            <p className="eyebrow text-muted">Next case study</p>
            <p className="text-section mt-3 font-display text-ink transition-colors group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
