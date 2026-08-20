import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { headlines, links, site } from "@/content/site";

const contactItems = [
  { icon: "mail" as const, label: site.email, href: links.email },
  { icon: "linkedin" as const, label: "LinkedIn", href: links.linkedin },
  { icon: "pin" as const, label: site.location, href: undefined },
];

export function Hero() {
  return (
    <section className="shell pb-14 pt-4 md:pb-20 md:pt-6">
      <Reveal immediate y={16}>
        <div className="rounded-hero bg-surface px-5 py-16 text-center sm:px-10 md:py-24">
          <p className="text-sub text-ink">Welcome, I&rsquo;m Abdul</p>

          <div className="mt-6 flex justify-center">
            <Icon name="sparkle" className="h-6 w-6 text-accent" />
          </div>

          <div className="mt-6">
            <RotatingHeadline phrases={headlines} />
          </div>

          <div className="mx-auto mt-14 max-w-2xl border-t border-rule pt-8">
            <p className="eyebrow text-muted">Get in touch</p>

            <ul className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
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
          </div>
        </div>
      </Reveal>
    </section>
  );
}
