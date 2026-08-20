import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  /* An empty list hides the section, so a half-finished references block
     never ships by accident. */
  if (testimonials.length === 0) return null;

  return (
    <section className="shell pt-24 md:pt-32">
      <Reveal>
        <SectionHeading
          eyebrow="References"
          title="What the people I've worked with say"
          align="center"
        />
      </Reveal>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.name + index} delay={index * 0.06}>
            <li className="flex h-full flex-col rounded-card bg-surface p-7">
              <Icon name="quote" className="h-6 w-6 text-accent" />

              <blockquote className="mt-5 flex-1 text-sm">
                {item.quote}
              </blockquote>

              <footer className="mt-6 border-t border-rule pt-5">
                <p className="text-sm font-medium text-accent-deep">
                  {item.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">{item.title}</p>
              </footer>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
