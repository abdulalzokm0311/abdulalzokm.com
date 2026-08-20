import type { Metadata } from "next";

import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Product design case studies by Abdul Alzokm, covering booking flows, roommate matching, scientific tooling and fintech.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <section className="shell py-16 md:py-24">
      <SectionHeading
        eyebrow="Case studies"
        title="What I've designed recently"
        align="center"
      />

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} flip={index % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
