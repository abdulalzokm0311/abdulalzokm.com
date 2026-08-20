import { Icon, type IconName } from "@/components/Icon";
import { cn } from "@/lib/utils";

/**
 * The section opener used across the site:
 *
 *   ▣  CASE STUDIES
 *   What I've designed recently
 *
 * The eyebrow names the section, the heading says something. The icon is
 * decorative and hidden from assistive tech.
 */
export function SectionHeading({
  icon,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  icon: IconName;
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
      <div
        className={cn(
          "flex items-center gap-2",
          align === "center" && "justify-center",
        )}
      >
        <Icon name={icon} className="h-4 w-4 text-accent" />
        <p className="eyebrow text-ink">{eyebrow}</p>
      </div>

      <h2 className="text-section mt-4">{title}</h2>

      {description ? (
        <p className={cn("mt-4 max-w-xl", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
