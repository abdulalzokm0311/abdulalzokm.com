import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Icon } from "@/components/Icon";
import { ImageSlot } from "@/components/ImageSlot";
import { Marquee } from "@/components/Marquee";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { about } from "@/content/about";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { links, site, tools } from "@/content/site";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <Hero />

      {/* ---------------------------------------------------------------- */}
      <section id="work" className="shell scroll-mt-24 pt-24 md:pt-32">
        <Reveal>
          <SectionHeading
            eyebrow="Case studies"
            title="What I've designed recently"
            align="center"
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} flip={index % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="eyebrow inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-paper transition-colors hover:bg-accent-deep"
            >
              All case studies
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="shell pt-24 md:pt-32">
        <div className="grid items-center gap-10 rounded-block bg-surface p-6 md:grid-cols-12 md:p-10">
          <Reveal className="md:col-span-5">
            {/* TODO: add a portrait to /public and set `portrait` in src/content/about.ts */}
            <ImageSlot
              src={about.portrait}
              alt={about.portraitAlt}
              aspect="4/5"
              sizes="(min-width: 768px) 38vw, 92vw"
              className="rounded-card"
            />
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-7">
            <SectionHeading
              eyebrow="About"
              title="A product designer who thinks like an architect"
            />

            <div className="mt-6 space-y-5">
              {about.short.map((paragraph, index) => (
                <p key={index} className="text-sm">
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href="/about"
              className="eyebrow mt-8 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
            >
              More about me
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="shell pt-24 md:pt-32">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked"
            align="center"
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {experience.map((role, index) => (
            <Reveal key={`${role.company}-${role.title}`} delay={index * 0.05}>
              <li className="flex h-full flex-col rounded-card bg-surface p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-sub">{role.title}</h3>
                  <p className="eyebrow text-muted">
                    {role.start} &ndash; {role.end}
                  </p>
                </div>

                <p className="eyebrow mt-2 text-accent">{role.company}</p>
                <p className="mt-4 text-sm">{role.summary}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-8 overflow-hidden rounded-card bg-surface py-4">
            <Marquee
              items={[...tools, ...tools, ...tools, ...tools]}
              duration={28}
              separator="✳"
              itemClassName="eyebrow text-ink"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="shell pt-24 md:pt-32">
        <Reveal>
          <SectionHeading
            eyebrow="Education"
            title="Where I trained"
            align="center"
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {education.map((degree, index) => (
            <Reveal key={degree.degree} delay={index * 0.05}>
              <li className="flex h-full flex-col rounded-card bg-surface p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-sub">{degree.degree}</h3>
                  <p className="eyebrow text-muted">
                    {degree.start} &ndash; {degree.end}
                  </p>
                </div>

                <p className="eyebrow mt-2 text-accent">{degree.school}</p>
                <p className="mt-4 text-sm">{degree.summary}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      <Testimonials />

      {/* ---------------------------------------------------------------- */}
      <section className="shell pt-24 md:pt-32">
        <Reveal>
          <div className="rounded-block bg-surface px-6 py-16 text-center md:py-20">
            <h2 className="text-section mx-auto max-w-2xl text-balance">
              Looking to start a project? Feel free to contact me.
            </h2>

            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
              <a
                href={links.email}
                className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
              >
                <Icon name="mail" className="h-4 w-4 text-accent" />
                {site.email}
              </a>
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
              <span className="flex items-center gap-2 text-sm text-ink">
                <Icon name="pin" className="h-4 w-4 text-accent" />
                {site.location}
              </span>
            </div>

            <Link
              href="/contact"
              className="eyebrow mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-paper transition-colors hover:bg-accent-deep"
            >
              Send me a message
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
