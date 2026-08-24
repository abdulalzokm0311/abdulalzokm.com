import Image from "next/image";

/**
 * One tool in the ticker.
 *
 * Shows the logo when the tool has one and the name when it does not, so a
 * missing file degrades to the text strip this replaced rather than to a hole.
 * The name is always present for screen readers, whether or not it is visible.
 */
export function ToolMark({ name, logo }: { name: string; logo: string }) {
  if (!logo) {
    return <span className="eyebrow whitespace-nowrap text-ink">{name}</span>;
  }

  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <Image
        src={logo}
        alt=""
        // Matches the mark's own 38:57, so the row does not jump when it loads.
        width={19}
        height={28}
        // SVG is refused by the image optimizer unless dangerouslyAllowSVG is
        // switched on globally, which is not worth doing for a vector that has
        // nothing to optimise. Served as-is instead.
        unoptimized
        className="h-6 w-auto sm:h-7"
      />
      <span className="eyebrow text-ink">{name}</span>
    </span>
  );
}
