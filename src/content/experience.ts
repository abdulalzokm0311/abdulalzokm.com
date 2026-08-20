/**
 * TODO (Abdul): the `summary` and `highlights` lines below are deliberately
 * plain placeholders written from your role titles alone. Replace them with
 * your real resume bullets. Everything else (titles, orgs, dates) is correct.
 */

export type Role = {
  company: string;
  title: string;
  start: string;
  end: string | "Present";
  location?: string;
  summary: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    company: "RBC",
    title: "Product Designer",
    start: "Jan 2026",
    end: "Present",
    location: "Toronto, ON",
    summary:
      "Designing product experiences inside one of Canada's largest banks, working across research, interaction design and design systems.",
    highlights: [
      "TODO: replace with a real highlight from this role.",
      "TODO: replace with a real highlight from this role.",
    ],
  },
  {
    company: "Passafund",
    title: "UI/UX Designer",
    start: "2025",
    end: "2025",
    summary:
      "Designed a personality assessment feature for a peer-to-peer lending startup, helping lenders judge borrower trustworthiness beyond the credit score.",
    highlights: [
      "Defined three assessment goals and mapped them to an end-to-end flow.",
      "TODO: replace with a real highlight from this role.",
    ],
  },
  {
    company: "Cita Marketplace",
    title: "UI/UX Designer",
    start: "2024",
    end: "2024",
    summary:
      "Worked on marketplace interface and experience design, from early exploration through to handoff.",
    highlights: [
      "TODO: replace with a real highlight from this role.",
      "TODO: replace with a real highlight from this role.",
    ],
  },
  {
    company: "Matthew House",
    title: "Designer",
    start: "2023",
    end: "2024",
    summary:
      "Design work supporting a Toronto non-profit, spanning visual and communication design.",
    highlights: [
      "TODO: replace with a real highlight from this role.",
      "TODO: replace with a real highlight from this role.",
    ],
  },
];
