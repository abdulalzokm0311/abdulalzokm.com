import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { headlines, links, site } from "@/content/site";

const contactItems = [
  { icon: "mail" as const, label: site.email, href: links.email },
  { icon: "linkedin" as const, label: "LinkedIn", href: links.linkedin },
  { icon: "pin" as const, label: site.location, href: undefined },
];

/**
 * Full bleed and full screen. The tint runs edge to edge rather than sitting
 * inside a rounded panel, so the first screen reads as the page itself.
 *
 * The greeting and headline sit centred in the optical middle; the contact
 * details are pinned to the bottom left of the same screen, so everything
 * needed to reach Abdul is above the fold without a call to action.
 */
export function Hero() {
  return (
    <section className="bg-surface">
      <div className="shell flex min-h-[calc(100dvh-4rem)] flex-col py-14 md:min-h-[calc(100dvh-5rem)] md:py-16">
        <Reveal
          immediate
          y={16}
          className="flex flex-1 flex-col justify-center text-center"
        >
          <p className="text-sub text-ink">Welcome, I&rsquo;m Abdul</p>

          <div className="mt-8">
            <RotatingHeadline phrases={headlines} />
          </div>
        </Reveal>

        <Reveal immediate delay={0.15} className="mt-10">
          <p className="eyebrow text-muted">Get in touch</p>

          <ul className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-8">
            {contactItems.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
                  >
                    <Icon name={item.icon} className="h-4 w-4 text-accent" />
                    {item.label}
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-ink">
                    <Icon name={item.icon} className="h-4 w-4 text-accent" />
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
