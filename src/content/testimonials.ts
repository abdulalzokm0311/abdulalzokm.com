/**
 * TODO (Abdul): every quote below is a placeholder. Replace them with real
 * references from managers, professors or teammates, and delete any you do
 * not fill. The section hides itself if this array is empty, so an unfinished
 * references section never ships by accident.
 */

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "TODO: paste a real reference here. Two or three sentences works best, ideally naming something specific you shipped and how you worked with the people around you.",
    name: "TODO: Name",
    title: "TODO: Role at Company",
  },
  {
    quote:
      "TODO: paste a real reference here. A quote from a manager at RBC or Passafund carries the most weight, since those are the roles a hiring team will ask about.",
    name: "TODO: Name",
    title: "TODO: Role at Company",
  },
  {
    quote:
      "TODO: paste a real reference here. A professor from the Master of Information or a studio critic from architecture is a good third voice, because it speaks to the crossover.",
    name: "TODO: Name",
    title: "TODO: Role at Company",
  },
];
