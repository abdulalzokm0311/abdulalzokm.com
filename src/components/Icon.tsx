import { cn } from "@/lib/utils";

/**
 * The icon set, inline. Small enough that shipping an icon font would cost
 * more than it saves, and inline SVG keeps colour and sizing under CSS control.
 */
const paths = {
  sparkle:
    "M12 0c.9 7.5 3.6 10.2 12 12-8.4 1.8-11.1 4.5-12 12-.9-7.5-3.6-10.2-12-12C8.4 10.2 11.1 7.5 12 0Z",
  mail: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2-.3 7.8 6 7.8-6H4.2ZM20 7.7l-7.4 5.7a1 1 0 0 1-1.2 0L4 7.7v10.8c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V7.7Z",
  pin: "M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.3 6.6 11.8 6.9 12.1a.9.9 0 0 0 1.2 0c.3-.3 6.9-6.8 6.9-12.1A7.5 7.5 0 0 0 12 2Zm0 10.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05a4.2 4.2 0 0 1 3.77-2.07c4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z",
  arrow: "M13.2 4.8 20.4 12l-7.2 7.2-1.4-1.4 4.8-4.8H3.6v-2h13l-4.8-4.8 1.4-1.4Z",
  external:
    "M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3ZM5 5h5v2H6v11h11v-4h2v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  quote:
    "M7.5 6C4.9 6 3 8 3 10.6c0 2.4 1.7 4.2 4 4.2.4 0 .8 0 1.1-.2-.5 1.9-2 3.3-3.9 3.7l.5 1.7c3.6-.8 6.3-4 6.3-8.2C11 8.3 9.5 6 7.5 6Zm10 0C14.9 6 13 8 13 10.6c0 2.4 1.7 4.2 4 4.2.4 0 .8 0 1.1-.2-.5 1.9-2 3.3-3.9 3.7l.5 1.7c3.6-.8 6.3-4 6.3-8.2C21 8.3 19.5 6 17.5 6Z",
  cases:
    "M9 3a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3V5a2 2 0 0 0-2-2H9Zm0 2h6v1H9V5Zm11 3v11H4V8h16Z",
  user: "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.5-8 5.5V22h16v-2.5c0-3-3.6-5.5-8-5.5Z",
  work: "M9 4a2 2 0 0 0-2 2v1H3a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a1 1 0 0 0-1-1h-4V6a2 2 0 0 0-2-2H9Zm0 2h6v1H9V6ZM4 9h16v10H4V9Z",
  school: "M12 3 1 8l11 5 9-4.1V16h2V8L12 3ZM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.2-7-3.2Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="currentColor"
      className={cn("h-5 w-5 shrink-0", className)}
    >
      <path d={paths[name]} />
    </svg>
  );
}
