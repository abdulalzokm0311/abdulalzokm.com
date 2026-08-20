/** Roles and copy carried over from the live Framer site. */

export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
};

export const experience: Role[] = [
  {
    company: "RBC Royal Bank of Canada",
    title: "Product Designer",
    start: "Jan 2026",
    end: "Present",
    location: "Toronto, ON",
    summary:
      "Designed high-traffic public pages across RBC.com for 5M+ monthly visitors, led end-to-end design of a 10-page Partnership Hub, and shipped an award-winning rewards page that grew organic Share of Voice by 12%.",
  },
  {
    company: "Passafund",
    title: "UI/UX Designer",
    start: "Jan 2025",
    end: "Aug 2025",
    summary:
      "Led the design of Passafund's loan application and personality assessment features, improving usability and engagement. Developed a streamlined user flow that reduced completion time and enhanced user retention within the first six months.",
  },
  {
    company: "Cita Marketplace",
    title: "UI/UX Designer",
    start: "May 2024",
    end: "Aug 2024",
    summary:
      "Redesigned the platform to improve navigation and buyer-seller interactions. Introduced intuitive layout changes and refined visual hierarchy, resulting in faster user task completion and increased engagement across key features.",
  },
  {
    company: "Matthew House",
    title: "Designer",
    start: "Sep 2023",
    end: "Mar 2024",
    summary:
      "Developed visual materials and spatial layouts to enhance community spaces for refugee housing. Collaborated with staff to create user-centered designs that improved comfort, accessibility, and overall resident experience.",
  },
];
