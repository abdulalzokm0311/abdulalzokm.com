/**
 * Single source of truth for identity, nav and links.
 * Change it here, it changes everywhere: nav, footer, contact page, metadata.
 */

export const site = {
  name: "Abdul Alzokm",
  role: "Product Designer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdulalzokm.com",
  description:
    "Abdul Alzokm is a Product Designer with an architecture background, blending creativity and strategy to design products people love.",
  email: "abdulalzokm@gmail.com",
  location: "Toronto / Oakville, ON",
  intro:
    "I'm Abdul Alzokm, a Product Designer that blends creativity and strategy to design products people love. Built on 5+ years of design thinking experience.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

export const links = {
  linkedin: "https://www.linkedin.com/in/abdul-alzokm/",
  resume:
    "https://drive.google.com/file/d/12NFKVMsmmlJpeCgSX9fK9QDI6Aqg0r9c/view",
  email: `mailto:${site.email}`,
} as const;

/** External links surfaced next to the nav on desktop and inside the mobile menu. */
export const externalNav = [
  { label: "Resume", href: links.resume },
] as const;

/**
 * The footer carries every page, including the ones kept out of the header to
 * keep it short. These pages are still routed and still indexed.
 */
export const footerNav = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
  { label: "UX Vision", href: "/vision" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerExternal = [
  { label: "Resume", href: links.resume },
  { label: "LinkedIn", href: links.linkedin },
] as const;

/** Feeds the tools ticker on the home page and the experience page. */
export const tools = [
  "Figma",
  "Photoshop",
  "FigJam",
  "Illustrator",
] as const;

/** Feeds the greeting ticker. */
export const greetings = ["HI", "BONJOUR"] as const;

/**
 * The hero headline cycles through these. The first one is the fallback shown
 * when motion is reduced, so keep the strongest line first.
 * TODO (Abdul): reword these in your own voice, they set the tone of the site.
 */
export const headlines = [
  "I am a product designer",
  "I turn complex flows into clear ones",
  "I was previously an architect",
  "I love video games and anime",
  "I play volleyball and tennis",
] as const;
