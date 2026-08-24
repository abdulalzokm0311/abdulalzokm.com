/**
 * The about narrative, shared by the home page summary and /about.
 * `short` is the condensed version on the home page. `full` is the long form.
 */

export const about = {
  short: [
    "I'm a product designer who thinks like an architect. After training in architecture, I now design digital products, bringing a structural mindset to interfaces, where every decision serves both form and function.",
    "My background gives me an unusual lens: I approach screens the way I once approached space, considering how people move through a product, where their attention lands, and what makes an experience feel effortless.",
  ],
  full: [
    "I'm a product designer who thinks like an architect. After training in architecture, I now design digital products, bringing a structural mindset to interfaces, where every decision serves both form and function.",
    "My background gives me an unusual lens: I approach screens the way I once approached space, considering how people move through a product, where their attention lands, and what makes an experience feel effortless.",
    "Architecture also gave me the habit of designing systems rather than one-offs. In studio you are never drawing a single room. You are working out a set of rules that has to hold across every room, at every scale, including the ones you have not drawn yet. Design systems ask for the same thinking.",
    "I hold a Bachelor of Architecture from the University of Toronto and a Master of Information in User Experience Design from the same institution, a foundation that lets me balance aesthetics, usability, and intent in everything I build.",
  ],
  /** TODO: replace with a real photo. See public/README.md. */
  portrait: "",
  portraitAlt: "Portrait photograph of Abdul Alzokm",

  /**
   * The second half of the page. Playing, then watching, then eating, which
   * is the order Abdul described them in.
   *
   * `scale` is the share of its column each photo takes, `tilt` its rotation
   * in degrees, and `drop` how far it hangs below its neighbours. Together
   * they scatter the set rather than tiling it. Fixed values, not random, so
   * the server and the browser agree on the layout.
   */
  life: [
    {
      // TODO: drop 01-volleyball into public/about/ and restore this src.
      src: "",
      aspect: "3/4",
      alt: "Mid-air at the top of a volleyball serve, ball above an indoor court",
      caption: "Playing a volleyball tournament.",
      scale: 0.92,
      tilt: -3.5,
      drop: 0,
    },
    {
      src: "/about/02-padel-tournament.png",
      aspect: "1340/1174",
      alt: "Following through on a padel shot on an indoor court, looking back over the shoulder",
      caption: "Playing a padel tournament.",
      scale: 1,
      tilt: 2.5,
      drop: 56,
    },
    {
      src: "/about/03-padel.png",
      aspect: "1254/1254",
      alt: "Setting up a padel shot with the ball in the air, glass-walled court behind",
      caption: "More padel.",
      scale: 0.82,
      tilt: -1.5,
      drop: 20,
    },
    {
      src: "/about/04-padel-district.png",
      aspect: "852/1846",
      alt: "Waiting on the return at an indoor padel court, boards around the court reading The District",
      caption: "Padel at The District.",
      scale: 0.72,
      tilt: 4,
      drop: 72,
    },
    {
      src: "/about/05-tennis.png",
      aspect: "1069/1471",
      alt: "Winding up a tennis backhand on an outdoor court at dusk, treeline behind",
      caption: "Playing tennis with my dad.",
      scale: 0.86,
      tilt: -2.5,
      drop: 8,
    },
    {
      src: "/about/06-snowboarding.png",
      aspect: "853/1844",
      alt: "Riding a snowboard down a quiet groomed slope, pines along the treeline",
      caption: "Snowboarding.",
      scale: 0.74,
      tilt: 3,
      drop: 44,
    },
    {
      // TODO: drop 07-egypt into public/about/ and restore this src.
      src: "",
      aspect: "3/4",
      alt: "Wearing an Egypt number 10 shirt beside a giant football sculpture at night",
      caption: "Watching Egypt win their first ever World Cup game.",
      scale: 0.9,
      tilt: -4,
      drop: 28,
    },
    {
      // TODO: drop 08-pizza into public/about/ and restore this src.
      src: "",
      aspect: "3/4",
      alt: "Grinning behind an enormous pizza that fills the whole table",
      caption: "Eating pizza in the Bahamas.",
      scale: 0.96,
      tilt: 1.5,
      drop: 64,
    },
  ],
} as const;
