import { cn } from "@/lib/utils";

/**
 * The section opener:
 *
 *   CASE STUDIES
 *   What I've designed recently
 *
 * The eyebrow names the section, the heading says something. No icon: a small
 * pictogram beside every label adds nothing the words do not already carry.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <p className="eyebrow text-accent">{eyebrow}</p>

      <h2 className="text-section mt-4">{title}</h2>

      {description ? (
        <p className={cn("mt-4 max-w-xl", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
