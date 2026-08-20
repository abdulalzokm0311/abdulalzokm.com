import { cn } from "@/lib/utils";

type SectionLabelProps = {
  /** The two-digit index, e.g. "01". Reads like a drawing sheet number. */
  index?: string;
  children: React.ReactNode;
  /** Optional text pinned to the far right of the rule. */
  aside?: React.ReactNode;
  className?: string;
};

/**
 * The drafting-set section marker:
 *
 *   01 / SELECTED WORK ─────────────────────────── 04 PROJECTS
 *
 * Purely decorative rule, so it is hidden from assistive tech. The heading
 * that follows a SectionLabel should carry the real semantics.
 */
export function SectionLabel({
  index,
  children,
  aside,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <p className="label shrink-0">
        {index ? <span className="text-ink">{index} / </span> : null}
        {children}
      </p>
      <span aria-hidden className="h-px flex-1 bg-rule" />
      {aside ? <p className="label shrink-0">{aside}</p> : null}
    </div>
  );
}
