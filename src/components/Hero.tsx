import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="shell pb-16 pt-10 md:pb-24 md:pt-16">
      <Reveal immediate y={12}>
        <div className="flex items-center gap-4">
          <p className="label shrink-0">{site.role}</p>
          <span aria-hidden className="h-px flex-1 bg-rule" />
          <p className="label shrink-0">{site.location}</p>
        </div>
      </Reveal>

      <div className="mt-10 grid items-end gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
        <Reveal immediate delay={0.08} className="md:col-span-7">
          <h1 className="text-display uppercase">
            {/* Stacked so the name reads as a monument rather than a line of text. */}
            <span className="block">Abdul</span>
            <span className="block">Alzokm</span>
          </h1>
        </Reveal>

        <Reveal immediate delay={0.2} className="md:col-span-5">
          <p className="max-w-md text-lead text-ink-soft md:pb-3">
            {site.intro}
          </p>
        </Reveal>
      </div>

      <Reveal immediate delay={0.32}>
        <a
          href="#work"
          className="mt-16 inline-flex items-center gap-3 text-ink md:mt-24"
        >
          <span className="label">Scroll</span>
          <span
            aria-hidden
            className="animate-bounce text-sm text-accent"
            style={{ animationDuration: "2.4s" }}
          >
            ↓
          </span>
        </a>
      </Reveal>
    </section>
  );
}
