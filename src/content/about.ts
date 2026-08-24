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
   */
  life: [
    {
      // TODO: drop 01-volleyball into public/about/ and restore this src.
      src: "",
      aspect: "3/4",
      alt: "Mid-air at the top of a volleyball serve, ball above an indoor court",
      caption: "Playing a volleyball tournament.",
    },
    {
      src: "/about/02-padel-tournament.png",
      aspect: "1340/1174",
      alt: "Following through on a padel shot on an indoor court, looking back over the shoulder",
      caption: "Playing a padel tournament.",
    },
    {
      src: "/about/03-padel.png",
      aspect: "1254/1254",
      alt: "Setting up a padel shot with the ball in the air, glass-walled court behind",
      caption: "More padel.",
    },
    {
      src: "/about/04-tennis.png",
      aspect: "1069/1471",
      alt: "Winding up a tennis backhand on an outdoor court at dusk, treeline behind",
      caption: "Playing tennis with my dad.",
    },
    {
      // TODO: drop 05-egypt into public/about/ and restore this src.
      src: "",
      aspect: "3/4",
      alt: "Wearing an Egypt number 10 shirt beside a giant football sculpture at night",
      caption: "Watching Egypt win their first ever World Cup game.",
    },
    {
      // TODO: drop 06-pizza into public/about/ and restore this src.
      src: "",
      aspect: "3/4",
      alt: "Grinning behind an enormous pizza that fills the whole table",
      caption: "Eating pizza in the Bahamas.",
    },
  ],
} as const;
