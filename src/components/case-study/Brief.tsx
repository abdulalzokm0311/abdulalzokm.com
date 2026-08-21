import type { Project } from "@/lib/projects";

/**
 * The skim path. A hiring manager who reads nothing else should still come
 * away with the problem, the method and the honest outcome.
 *
 * It carries the results table so the numbers appear once on the page rather
 * than twice. Deliberately not a floating card: a themed band with hairline
 * structure, so it reads as part of the page rather than a widget on top of it.
 */
export function Brief({ project }: { project: Project }) {
  const { brief, tasks, tasksNote } = project;
  if (!brief) return null;

  return (
    <section
      aria-labelledby="brief-heading"
      className="mt-14 border-y border-rule bg-surface"
    >
      <div className="px-6 py-10 md:px-10 md:py-12">
        <h2 id="brief-heading" className="eyebrow text-accent">
          The short version
        </h2>

        <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h3 className="font-display text-xl font-medium text-ink">
              The problem
            </h3>
            <p className="mt-2 text-sm">{brief.problem}</p>

            <h3 className="mt-7 font-display text-xl font-medium text-ink">
              What I did
            </h3>
            <p className="mt-2 text-sm">{brief.approach}</p>
          </div>

          {tasks.length > 0 ? (
            <div className="md:col-span-7">
              <h3 className="font-display text-xl font-medium text-ink">
                What came out of it
              </h3>

              <dl className="mt-4">
                {tasks.map((task) => (
                  <div
                    key={task.task}
                    className="flex items-baseline justify-between gap-6 border-b border-rule py-3 last:border-b-0"
                  >
                    <dt className="text-sm">{task.task}</dt>
                    <dd className="flex shrink-0 items-baseline gap-2">
                      {task.note ? (
                        <span className="eyebrow text-muted">{task.note}</span>
                      ) : null}
                      <span className="font-display text-2xl leading-none text-accent">
                        {task.result}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              {tasksNote ? (
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  {tasksNote}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
