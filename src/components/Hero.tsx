import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { HeroStatement } from "@/components/HeroStatement";
import { links, site } from "@/content/site";

/**
 * Full bleed and full screen.
 *
 * The greeting and headline sit centred in the optical middle. The contact
 * details are pinned 24px from the bottom left of the viewport and the
 * location 24px from the bottom right, matching the reference: this row sits
 * outside the content column, hard against the page edges rather than inset
 * with the rest of the page.
 */
export function Hero() {
  return (
    /* Clipped: the script word is deliberately wider than its column and
       nudged right, which otherwise pushes the document past the viewport and
       produces a sideways scrollbar. Its glyphs stop short of the edge, so
       nothing readable is lost. */
    <section className="overflow-hidden bg-surface">
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col md:min-h-[calc(100dvh-5rem)]">
        <Reveal
          immediate
          y={16}
          className="shell flex flex-1 flex-col justify-center py-16 text-center"
        >
          <p className="mb-16 font-script text-[clamp(1.15rem,2.1vw,1.6rem)] leading-none text-ink sm:mb-24">
            Welcome, I&rsquo;m Abdul
          </p>

          <HeroStatement />
        </Reveal>

        <Reveal
          immediate
          delay={0.15}
          className="flex flex-col gap-5 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="eyebrow text-muted">Get in touch</p>

            <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
              <li>
                <a
                  href={links.email}
                  className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
                >
                  <Icon name="mail" className="h-4 w-4 text-accent" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
                >
                  <Icon name="linkedin" className="h-4 w-4 text-accent" />
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <p className="flex items-center gap-2 text-sm text-ink">
            <Icon name="pin" className="h-4 w-4 text-accent" />
            {site.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
