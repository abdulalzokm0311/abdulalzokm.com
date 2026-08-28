import { cn } from "@/lib/utils";

/* The signature is a single-colour mark, so it renders as a mask filled with
   currentColor rather than an <img>. That way it picks up whatever the link
   around it is doing: ink in the header, paper on the red footer, and the
   accent on hover, transition included. */
const MARK_RATIO = 864 / 337;

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block bg-current", className)}
      style={{
        aspectRatio: MARK_RATIO,
        maskImage: "url(/brand/logo-mark.png)",
        WebkitMaskImage: "url(/brand/logo-mark.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
