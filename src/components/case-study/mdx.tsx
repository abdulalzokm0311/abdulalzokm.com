import type { ReactNode } from "react";

import { ImageSlot } from "@/components/ImageSlot";
import { cn } from "@/lib/utils";

/**
 * The component vocabulary available inside a case study MDX file.
 *
 * The bias throughout is toward showing rather than explaining: a decision is
 * an image plus one line of before and one line of after, a finding is an
 * observation plus what a participant actually said. Long prose is the thing
 * these are meant to replace.
 */

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

export function Figure({
  src,
  alt,
  caption,
  aspect = "16/9",
  /** Break out of the text measure and run the full content width. */
  wide = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  aspect?: string;
  wide?: boolean;
}) {
  return (
    <figure className={cn("my-12", wide ? "" : "mx-auto max-w-4xl")}>
      <ImageSlot src={src} alt={alt} aspect={aspect} sizes="100vw" />
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Video({
  src,
  caption,
  poster,
}: {
  src?: string;
  caption?: string;
  poster?: string;
}) {
  return (
    <figure className="my-12">
      {src ? (
        <video
          className="w-full bg-surface"
          controls
          muted
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      ) : (
        <ImageSlot
          alt={caption ?? "Flow video"}
          aspect="16/9"
          sizes="100vw"
        />
      )}
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Structure                                                           */
/* ------------------------------------------------------------------ */

/** A design decision: what was wrong, what replaced it, and the evidence. */
export function Decision({
  index,
  title,
  before,
  after,
  src,
  alt,
  aspect = "16/9",
}: {
  index: string;
  title: string;
  before: string;
  after: string;
  src?: string;
  alt: string;
  aspect?: string;
}) {
  return (
    <section className="my-16 border-t border-rule pt-8">
      <div className="flex items-baseline gap-4">
        <span className="eyebrow text-accent">{index}</span>
        <h3 className="text-card">{title}</h3>
      </div>

      <div className="mt-8">
        <ImageSlot src={src} alt={alt} aspect={aspect} sizes="100vw" />
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="eyebrow text-muted">Before</p>
          <p className="mt-3 text-sm">{before}</p>
        </div>
        <div>
          <p className="eyebrow text-accent">After</p>
          <p className="mt-3 text-sm text-ink">{after}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * What a round of testing surfaced.
 *
 * The learning leads. The change sits directly under the title at reading
 * scale, because that is the thing worth carrying away. The observation and
 * the verbatim quotes follow underneath at a smaller size, as the evidence
 * backing it up rather than as the headline.
 *
 * No tinted container anywhere: scale, position and a single rule carry the
 * hierarchy instead.
 */
export function Finding({
  index,
  title,
  observation,
  quotes = [],
  changed,
  src,
  alt,
  aspect = "16/9",
}: {
  index: string;
  title: string;
  observation: string;
  quotes?: { text: string; who: string }[];
  changed: string;
  /** Optional supporting image, e.g. the before and after of the fix. */
  src?: string;
  alt?: string;
  aspect?: string;
}) {
  return (
    <section className="my-20 border-t border-rule pt-8">
      <div className="flex items-baseline gap-4">
        <span className="eyebrow text-accent">{index}</span>
        <h3 className="text-card">{title}</h3>
      </div>

      {/* The learning. */}
      <p className="eyebrow mt-8 text-accent">What changed</p>
      <p className="mt-4 max-w-3xl text-[1.375rem] leading-snug text-ink">
        {changed}
      </p>

      {/* The evidence behind it, deliberately quieter. */}
      <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-rule pt-8 md:grid-cols-12">
        {/* With no quotes to sit beside it, the observation takes a wider
            measure rather than leaving half the row empty. */}
        <div className={quotes.length > 0 ? "md:col-span-4" : "md:col-span-7"}>
          <p className="eyebrow text-muted">What we saw</p>
          <p className="mt-3 text-sm">{observation}</p>
        </div>

        {quotes.length > 0 ? (
          <div className="md:col-span-7 md:col-start-6">
            <ul className="space-y-5">
              {quotes.map((quote) => (
                <li key={quote.who}>
                  <p className="text-sm italic text-ink-soft">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="eyebrow mt-2 text-muted">{quote.who}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {alt ? (
        <div className="mt-10">
          <ImageSlot src={src} alt={alt} aspect={aspect} sizes="100vw" />
        </div>
      ) : null}
    </section>
  );
}

/** The numbered process, compressed to one line each. */
export function Steps({
  items,
}: {
  items: { label: string; text: string }[];
}) {
  return (
    /* Hairline per item rather than a filled grid, so nothing paints an empty
       cell. The column count follows the item count on wide screens, so a
       five stage process stays on one line instead of orphaning the last one. */
    <ol
      className="my-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-[repeat(var(--steps-cols),minmax(0,1fr))]"
      style={{ "--steps-cols": items.length } as React.CSSProperties}
    >
      {items.map((item, index) => (
        <li key={item.label} className="border-t border-rule pt-5">
          <span className="eyebrow text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="mt-3 font-display text-xl font-medium text-ink">
            {item.label}
          </h4>
          <p className="mt-2 text-sm">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** A short list where each item is a change, not a paragraph. */
export function ChangeList({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <ul className="my-10 border-t border-rule">
      {items.map((item) => (
        <li
          key={item.title}
          className="grid gap-2 border-b border-rule py-5 md:grid-cols-12 md:gap-8"
        >
          <p className="font-display text-lg font-medium text-ink md:col-span-4">
            {item.title}
          </p>
          <p className="text-sm md:col-span-8">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * The running order of a page, drawn as a stack rather than written as a list.
 *
 * The argument in these sections is almost always about sequence: something
 * important sits too far down. A numbered list states that; a stack shows it,
 * because the flagged band is visibly below the ones burying it.
 */
export function PageOrder({
  items,
  caption,
}: {
  items: { step: string; detail?: string; flag?: string }[];
  caption?: string;
}) {
  return (
    <figure className="my-12">
      <ol className="flex flex-col gap-2">
        {items.map((item, index) => {
          const flagged = Boolean(item.flag);

          return (
            <li
              key={item.step}
              className={cn(
                "flex items-baseline gap-5 rounded-card px-6 py-5 sm:gap-7 sm:px-8",
                flagged
                  ? "border-l-4 border-accent bg-surface-deep"
                  : "bg-surface",
              )}
            >
              <span
                className={cn(
                  "font-display text-2xl leading-none",
                  flagged ? "text-accent" : "text-muted",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="flex-1">
                <span className="block font-display text-lg font-medium text-ink">
                  {item.step}
                </span>
                {item.detail ? (
                  <span className="mt-1 block text-sm text-ink-soft">
                    {item.detail}
                  </span>
                ) : null}
              </span>

              {flagged ? (
                <span className="eyebrow shrink-0 text-accent">{item.flag}</span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** An honest caveat. Used where a number could be mistaken for something bigger. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="my-10 border-l-2 border-rule pl-5 text-sm text-muted">
      {children}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Base elements                                                       */
/* ------------------------------------------------------------------ */

export const mdxComponents = {
  Figure,
  Video,
  Decision,
  Finding,
  Steps,
  ChangeList,
  PageOrder,
  Note,

  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="text-section mt-20 max-w-3xl scroll-mt-24" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="text-card mt-14 max-w-3xl" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-5 max-w-2xl" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mt-5 max-w-2xl list-decimal space-y-2 pl-5" {...props} />
  ),
  /* Pull quote. Set larger than body and marked with a rule rather than
     wrapped in a panel, matching how quotes read inside a Finding. */
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-10 max-w-3xl border-l-2 border-accent pl-6 text-[1.375rem] italic leading-snug text-ink [&>p]:mt-0"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-medium text-ink" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
      {...props}
    />
  ),
  hr: () => <hr className="my-16 border-0 border-t border-rule" />,
};
