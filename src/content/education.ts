export type Degree = {
  school: string;
  degree: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
};

export const education: Degree[] = [
  {
    school: "University of Toronto",
    degree: "Master of Information in UX Design",
    start: "2024",
    end: "2026",
    location: "Toronto, ON",
    summary:
      "Advanced UX research methods, interaction design, information architecture, and design leadership, focusing on creating human-centered digital experiences.",
  },
  {
    school: "University of Toronto",
    degree: "Bachelor of Architecture",
    start: "2020",
    end: "2024",
    location: "Toronto, ON",
    summary:
      "Studied architectural design, spatial thinking, and human-centered environments, developing a strong foundation in problem-solving and user experience.",
  },
];
