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
 * keep it short. Only routes that actually exist belong here.
 */
export const footerNav = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

export const footerExternal = [
  { label: "Resume", href: links.resume },
  { label: "LinkedIn", href: links.linkedin },
] as const;

/**
 * Feeds the tools ticker on the home page.
 *
 * `ratio` is each mark's own width over height, so the ticker reserves the
 * right width before the file loads and nothing shifts.
 *
 * `boxed` flags the marks that ship inside a filled rounded square. Set
 * against open marks at the same height they read noticeably heavier, so they
 * are drawn a little smaller to even the row out.
 *
 * `wordmark` flags a logo that already spells the name. Those drop the label
 * beside them rather than saying it twice.
 */
export const tools = [
  { name: "Figma", logo: "/tools/figma.svg", ratio: 38 / 57 },
  { name: "Photoshop", logo: "/tools/photoshop.png", ratio: 1.023, boxed: true },
  { name: "Illustrator", logo: "/tools/illustrator.png", ratio: 1.023, boxed: true },
  { name: "Jira", logo: "/tools/jira.png", ratio: 1.031 },
  { name: "Mural", logo: "/tools/mural.png", ratio: 3.484, wordmark: true },
  { name: "Asana", logo: "/tools/asana.svg", ratio: 1.082 },
] as const;

/** Feeds the greeting ticker. */
export const greetings = ["HI", "BONJOUR"] as const;

/**
 * The hero headline cycles through these. The first one is the fallback shown
 * when motion is reduced, so keep the strongest line first.
 * TODO (Abdul): reword these in your own voice, they set the tone of the site.
 */
/**
 * The hero's switchable statements. Each tab swaps the statement and the
 * handwritten word beneath it. Content is drawn from what Abdul has actually
 * said about himself, not invented to fill five slots.
 */
export const heroTabs = [
  {
    label: "Who I am",
    script: "who i am",
    statement:
      "A product designer who takes dense, complicated things and makes them scannable.",
  },
  {
    label: "What drives me",
    script: "what drives me",
    statement:
      "How people move through a product, where their attention lands, and what makes an experience feel effortless.",
  },
  {
    label: "How I got here",
    script: "how i got here",
    statement:
      "I studied architecture before I designed products. I approach screens the way I approached space.",
  },
  {
    label: "Off the clock",
    script: "off the clock",
    statement:
      "Padel, volleyball and tennis. Video games and anime. And a very big foodie.",
  },
] as const;
