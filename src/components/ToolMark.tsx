import Image from "next/image";

import { cn } from "@/lib/utils";

/** Height the marks are drawn at, and what the width is reserved against. */
const MARK_HEIGHT = 28;

/**
 * One tool in the ticker.
 *
 * Shows the logo when the tool has one and the name when it does not, so a
 * missing file degrades to the text strip this replaced rather than to a hole.
 * The name is always present for screen readers, whether or not it is visible.
 */
export function ToolMark({
  name,
  logo,
  ratio = 1,
  boxed = false,
  wordmark = false,
}: {
  name: string;
  logo: string;
  ratio?: number;
  boxed?: boolean;
  wordmark?: boolean;
}) {
  if (!logo) {
    return <span className="eyebrow whitespace-nowrap text-ink">{name}</span>;
  }

  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <Image
        src={logo}
        alt=""
        width={Math.round(MARK_HEIGHT * ratio)}
        height={MARK_HEIGHT}
        // SVG is refused by the image optimizer unless dangerouslyAllowSVG is
        // switched on globally, which is not worth doing for a vector that has
        // nothing to optimise. Served as-is instead.
        unoptimized={logo.endsWith(".svg")}
        className={cn("w-auto", boxed ? "h-5 sm:h-6" : "h-6 sm:h-7")}
      />
      <span className={cn("text-ink", wordmark ? "sr-only" : "eyebrow")}>
        {name}
      </span>
    </span>
  );
}
