/**
 * The about narrative, shared by the home page summary and /about.
 * `short` is the condensed version on the home page. `full` is the long form.
 */

export const about = {
  short: [
    "I'm a product designer who thinks like an architect. After studying architecture, I now design digital products, bringing a structural mindset to interfaces, where every decision serves both form and function.",
    "My background gives me an unusual lens: I approach screens the way I once approached space, considering how people move through a product, where their attention lands, and what makes an experience feel effortless.",
  ],
  full: [
    "I'm a product designer who thinks like an architect. After studying architecture, I now design digital products, bringing a structural mindset to interfaces, where every decision serves both form and function.",
    "My background gives me an unusual lens: I approach screens the way I once approached space, considering how people move through a product, where their attention lands, and what makes an experience feel effortless.",
    "Architecture also gave me the habit of designing systems rather than one-offs. In studio you are never drawing a single room. You are working out a set of rules that has to hold across every room, at every scale, including the ones you have not drawn yet. Design systems ask for the same thinking.",
    "I hold a Bachelor of Architecture from the University of Toronto and a Master of Information in User Experience Design from the same institution, a foundation that lets me balance aesthetics, usability, and intent in everything I build.",
  ],
  /** TODO: replace with a real photo. See public/README.md. */
  portrait: "/about/me.webp",
  portraitAspect: "2448/3264",
  portraitAlt: "Abdul on a lit deck at night, one arm along the railing, looking off to the side",

  /**
   * The second half of the page. Playing, then watching, then eating, which
   * is the order Abdul described them in.
   *
   * `left` and `top` are percentages of the scatter container, `w` a
   * percentage of its width, and `tilt` a rotation in degrees. Real
   * coordinates rather than grid cells, so the set genuinely scatters and can
   * overlap instead of settling into rows. Fixed values, not random, so the
   * server and the browser agree on the layout.
   */
  life: [
    {
      src: "/about/01-volleyball.webp",
      aspect: "1392/1868",
      alt: "Mid-air at the top of a volleyball serve, ball above an indoor court",
      caption: "Playing a volleyball tournament.",
      left: 1,
      top: 8,
      w: 19.7,
      tilt: -4,
    },
    {
      src: "/about/02-padel-tournament.webp",
      aspect: "1340/1174",
      alt: "Following through on a padel shot on an indoor court, looking back over the shoulder",
      caption: "Playing a padel tournament.",
      left: 24,
      top: 0,
      w: 26,
      tilt: 3,
    },
    {
      src: "/about/03-padel.webp",
      aspect: "1254/1254",
      alt: "Setting up a padel shot with the ball in the air, glass-walled court behind",
      caption: "More padel.",
      left: 53,
      top: 6,
      w: 25.5,
      tilt: -2,
    },
    {
      src: "/about/04-padel-district.webp",
      aspect: "738/984",
      alt: "Waiting on the return at an indoor padel court, boards around the court reading The District",
      caption: "Playing pickleball with my brother.",
      left: 82,
      top: 2,
      w: 13,
      tilt: 5,
    },
    {
      src: "/about/05-tennis.webp",
      aspect: "1069/1471",
      alt: "Winding up a tennis backhand on an outdoor court at dusk, treeline behind",
      caption: "Playing tennis with my dad.",
      left: 44,
      top: 58,
      w: 19,
      tilt: 3,
    },
    {
      src: "/about/06-snowboarding.webp",
      aspect: "853/1844",
      alt: "Riding a snowboard down a quiet groomed slope, pines along the treeline",
      caption: "Snowboarding in Blue Mountain.",
      left: 3,
      top: 54,
      w: 13,
      tilt: 4,
    },
    {
      src: "/about/07-egypt.webp",
      aspect: "3000/4000",
      alt: "Wearing an Egypt number 10 shirt beside a giant football sculpture at night",
      caption: "Watching Egypt win their first ever World Cup game.",
      left: 68,
      top: 52,
      w: 19.8,
      tilt: -3,
    },
    {
      src: "/about/08-pizza.webp",
      aspect: "2448/3264",
      alt: "Grinning behind an enormous pizza that fills the whole table",
      caption: "Eating pizza in the Bahamas.",
      left: 20,
      top: 50,
      w: 19.8,
      tilt: -2,
    },
  ],
} as const;
