export type Degree = {
  school: string;
  degree: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  focus: string[];
};

export const education: Degree[] = [
  {
    school: "University of Toronto",
    degree: "Master of Information, UX Design",
    start: "2024",
    end: "2026",
    location: "Toronto, ON",
    summary:
      "Two years of research methods, interaction design and information practice, applied across studio projects and usability work.",
    focus: [
      "User research and usability testing",
      "Interaction and interface design",
      "Information architecture",
    ],
  },
  {
    school: "University of Toronto",
    degree: "Bachelor of Architecture",
    start: "2020",
    end: "2024",
    location: "Toronto, ON",
    summary:
      "Four years of studio training in how people move through space, where attention lands, and how a system of parts holds together.",
    focus: [
      "Spatial hierarchy and composition",
      "Systems thinking",
      "Visual and representational craft",
    ],
  },
];
