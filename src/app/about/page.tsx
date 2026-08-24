import type { Metadata } from "next";
import Link from "next/link";

import { ImageSlot } from "@/components/ImageSlot";
import { PhotoScatter } from "@/components/PhotoScatter";
import { SectionHeading } from "@/components/SectionHeading";
import { about } from "@/content/about";
import { links, site } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Abdul Alzokm is a product designer who studied architecture, now designing digital products with a structural mindset.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-surface">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow text-accent">About</p>

          <h1 className="text-hero mt-5 max-w-4xl font-normal">
            I design screens the way I was taught to design space.
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-12">
            {/* Portrait leads, so the page opens on a face rather than a wall
                of copy. Contained at its own ratio, never cropped. */}
            <div className="md:col-span-4">
              <ImageSlot
                src={about.portrait}
                alt={about.portraitAlt}
                aspect={about.portraitAspect}
                sizes="(min-width: 768px) 30vw, 92vw"
                fit="contain"
                priority
                className="rounded-card"
              />
            </div>

            <div className="md:col-span-8">
              {about.full.map((paragraph, index) => (
                <p key={index} className={cn(index > 0 && "mt-5", "max-w-2xl")}>
                  {paragraph}
                </p>
              ))}

              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                <div className="border-t border-rule pt-4">
                  <dt className="eyebrow text-muted">Now</dt>
                  <dd className="mt-2 text-sm text-ink">
                    Product Designer at Rocket Innovation Studio
                  </dd>
                </div>
                <div className="border-t border-rule pt-4">
                  <dt className="eyebrow text-muted">Studied</dt>
                  <dd className="mt-2 text-sm text-ink">
                    BArch and MI in UX Design, University of Toronto
                  </dd>
                </div>
                <div className="border-t border-rule pt-4">
                  <dt className="eyebrow text-muted">Based in</dt>
                  <dd className="mt-2 text-sm text-ink">{site.location}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* The second half. The work explains the designer; this explains the
          person, so the photographs lead and the copy stays out of the way. */}
      <section className="shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Away from the screen"
          title="Courts, matches and a lot of food"
          description="I play tennis, padel and volleyball. I watch just about everything else. And I am a serious foodie, which the last picture will confirm."
        />

        <PhotoScatter />

        <div className="mt-20 border-t border-rule pt-8">
          <p className="max-w-xl text-lead text-ink">
            If any of that sounds like your kind of team, I would like to hear
            from you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={links.email}
              className="eyebrow rounded-full bg-accent px-6 py-3.5 text-paper transition-colors hover:bg-accent-deep"
            >
              Get in touch
            </a>
            <a
              href={links.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="eyebrow rounded-full border border-rule px-6 py-3.5 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Resume
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
