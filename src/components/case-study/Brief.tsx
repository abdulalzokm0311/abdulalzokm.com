import type { Project } from "@/lib/projects";

/**
 * The skim path. A hiring manager who reads nothing else should still come
 * away with the problem, the method and the honest outcome.
 *
 * It carries the results so the numbers appear once on the page rather than
 * twice. The outcomes are tiles rather than a list: at a glance the eye lands
 * on four numbers, which is the whole job of this block.
 */
export function Brief({ project }: { project: Project }) {
  const { brief, tasks } = project;
  if (!brief) return null;

  return (
    <section
      aria-labelledby="brief-heading"
      className="mt-14 rounded-block bg-surface p-7 sm:p-10 md:p-12"
    >
      <div className="flex items-center gap-5">
        <h2 id="brief-heading" className="eyebrow shrink-0 text-accent">
          The short version
        </h2>
        <span aria-hidden className="h-px flex-1 bg-rule" />
      </div>

      <div className="mt-9 grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <h3 className="font-display text-xl font-medium text-ink">
            The problem
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed">{brief.problem}</p>

          <h3 className="mt-8 font-display text-xl font-medium text-ink">
            What I did
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed">{brief.approach}</p>
        </div>

        {tasks.length > 0 ? (
          <div className="md:col-span-7">
            <ul className="grid gap-3 sm:grid-cols-2">
              {tasks.map((task) => (
                <li
                  key={task.task}
                  className="rounded-card bg-surface-deep p-5 sm:p-6"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-display text-4xl leading-none text-accent">
                      {task.result}
                    </span>
                    {task.note ? (
                      <span className="eyebrow text-ink-soft">{task.note}</span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                    {task.task}
                  </p>
                </li>
              ))}
            </ul>

          </div>
        ) : null}
      </div>
    </section>
  );
}
