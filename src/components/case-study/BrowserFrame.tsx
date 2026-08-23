import { ImageSlot } from "@/components/ImageSlot";

/**
 * A screenshot presented as a desktop window.
 *
 * The chrome does one useful thing beyond decoration: it tells the reader this
 * is a full page in a browser rather than a cropped detail, which is exactly
 * the ambiguity a bare screenshot leaves.
 *
 * The dots are neutral rather than the usual red, amber and green. At this
 * size the shape alone reads as a window, and borrowing another product's
 * colours into a themed page just adds noise.
 */
export function BrowserFrame({
  src,
  alt,
  aspect = "16/9",
  url,
  priority = false,
}: {
  src?: string;
  alt: string;
  aspect?: string;
  url?: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-card border border-rule bg-paper shadow-[0_28px_70px_-30px_rgb(0_0_0/0.35)]">
      <div className="flex items-center gap-3 border-b border-rule bg-surface px-4 py-3">
        <span aria-hidden className="flex shrink-0 gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="block h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="block h-2.5 w-2.5 rounded-full bg-rule" />
        </span>

        {url ? (
          <span className="mx-auto max-w-[60%] truncate rounded-full bg-paper px-4 py-1 text-xs text-muted">
            {url}
          </span>
        ) : null}

        {/* Balances the dots so the address sits optically centred. */}
        <span aria-hidden className="w-[42px] shrink-0" />
      </div>

      <ImageSlot
        src={src}
        alt={alt}
        aspect={aspect}
        sizes="100vw"
        fit="contain"
        priority={priority}
      />
    </div>
  );
}
