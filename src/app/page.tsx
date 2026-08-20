import Link from "next/link";

import { Hero } from "@/components/Hero";
import { ImageSlot } from "@/components/ImageSlot";
import { Marquee } from "@/components/Marquee";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { about } from "@/content/about";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { greetings, links, site, tools } from "@/content/site";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <Hero />

      {/* Greeting ticker. Full bleed, hairlines top and bottom. */}
      <div className="border-y border-rule py-5 md:py-7">
        <Marquee
          items={[...greetings, ...greetings, ...greetings]}
          duration={38}
          itemClassName="font-display text-h2 uppercase leading-none"
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      <section id="work" className="shell scroll-mt-24 pt-24 md:pt-32">
        <Reveal>
          <SectionLabel index="01" aside={`${projects.length} projects`}>
            Selected work
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-2xl text-h1">
            Case studies in research, structure and the details in between.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index % 2 === 1 ? 0.08 : 0}
              /* Offsetting the right column keeps the grid from reading as a
                 table of four identical boxes. */
              className={index % 2 === 1 ? "md:mt-24" : undefined}
            >
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="shell pt-28 md:pt-40">
        <Reveal>
          <SectionLabel index="02" aside="Architecture to product">
            About
          </SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <div className="max-w-xl">
              {about.short.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? "text-lead" : "mt-6 text-ink-soft"}
                >
                  {paragraph}
                </p>
              ))}

              <Link
                href="/about"
                className="label group mt-8 inline-flex items-center gap-2 text-ink"
              >
                More about me
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-5">
            {/* TODO: add a portrait to /public and set `portrait` in src/content/about.ts */}
            <ImageSlot
              src={about.portrait}
              alt={about.portraitAlt}
              aspect="4/5"
              sizes="(min-width: 768px) 38vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="pt-28 md:pt-40">
        <div className="shell">
          <Reveal>
            <SectionLabel index="03" aside="2023 to present">
              Experience
            </SectionLabel>
          </Reveal>

          <ul className="mt-10 border-t border-rule">
            {experience.map((role, index) => (
              <Reveal key={`${role.company}-${role.title}`} delay={index * 0.04}>
                <li className="border-b border-rule">
                  <div className="grid items-baseline gap-2 py-6 md:grid-cols-12 md:gap-6">
                    <p className="label md:col-span-3">
                      {role.start}
                      {role.end !== role.start ? ` – ${role.end}` : ""}
                    </p>
                    <h3 className="text-h3 md:col-span-5">{role.company}</h3>
                    <p className="text-ink-soft md:col-span-4">{role.title}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <Link
              href="/experience"
              className="label group mt-8 inline-flex items-center gap-2 text-ink"
            >
              Full experience
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Tools ticker */}
        <div className="mt-16 border-y border-rule py-4 md:mt-20">
          <Marquee
            items={[...tools, ...tools, ...tools, ...tools]}
            duration={30}
            separator="/"
            itemClassName="label text-ink"
          />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="shell pt-28 md:pt-40">
        <Reveal>
          <SectionLabel index="04" aside="University of Toronto">
            Education
          </SectionLabel>
        </Reveal>

        <ul className="mt-10 border-t border-rule">
          {education.map((degree, index) => (
            <Reveal key={degree.degree} delay={index * 0.04}>
              <li className="border-b border-rule">
                <div className="grid items-baseline gap-2 py-6 md:grid-cols-12 md:gap-6">
                  <p className="label md:col-span-3">
                    {degree.start} – {degree.end}
                  </p>
                  <h3 className="text-h3 md:col-span-5">{degree.degree}</h3>
                  <p className="text-ink-soft md:col-span-4">{degree.school}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Link
            href="/education"
            className="label group mt-8 inline-flex items-center gap-2 text-ink"
          >
            Full education
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="shell pt-28 md:pt-40">
        <Reveal>
          <SectionLabel index="05" aside="Open to work">
            Contact
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-10 max-w-3xl text-h1">
            Looking to start a project? Feel free to contact me.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3">
            <div>
              <p className="label">Email</p>
              <a
                href={links.email}
                className="mt-2 block text-ink transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="label">Based in</p>
              <p className="mt-2 text-ink">{site.location}</p>
            </div>
            <div>
              <p className="label">Elsewhere</p>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-1 text-ink transition-colors hover:text-accent"
              >
                LinkedIn
                <span aria-hidden className="text-[0.7em]">
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-paper transition-colors hover:bg-accent"
          >
            <span className="label text-paper">Send me a message</span>
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
