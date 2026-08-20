import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  /** Seconds for one full loop. Higher is slower. */
  duration?: number;
  /** Character placed between items. */
  separator?: string;
  className?: string;
  itemClassName?: string;
};

/**
 * Infinite horizontal ticker, CSS only.
 *
 * The track renders the item list twice and travels exactly -50%, so the
 * second copy lands where the first started and the loop is seamless. The
 * duplicate is aria-hidden, and the whole strip is presentational, so a
 * screen reader hears the list once.
 *
 * prefers-reduced-motion stops the animation via the rule in globals.css.
 */
export function Marquee({
  items,
  duration = 40,
  separator = "✳",
  className,
  itemClassName,
}: MarqueeProps) {
  const track = (
    <ul className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-center">
          <span className={cn("whitespace-nowrap", itemClassName)}>{item}</span>
          <span
            aria-hidden
            className="mx-6 text-muted sm:mx-10"
            style={{ fontSize: "0.5em" }}
          >
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      // The visible list is decorative repetition, so expose it once as a label
      // rather than letting a screen reader read the doubled track.
      role="presentation"
    >
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {track}
        <div aria-hidden>{track}</div>
      </div>
    </div>
  );
}
