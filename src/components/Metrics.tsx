import type { Metric } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * The outcome numbers on a case study. Value in display serif, what it means
 * in small mono underneath, separated by hairlines like a spec table.
 */
export function Metrics({
  metrics,
  className,
}: {
  metrics: Metric[];
  className?: string;
}) {
  if (metrics.length === 0) return null;

  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden border-y border-rule bg-rule sm:grid-cols-3",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-paper px-1 py-5 sm:px-5">
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <span className="block font-display text-h3 leading-none text-ink">
              {metric.value}
            </span>
            <span
              aria-hidden
              className="mt-2 block font-mono text-[0.7rem] leading-snug text-muted"
            >
              {metric.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
