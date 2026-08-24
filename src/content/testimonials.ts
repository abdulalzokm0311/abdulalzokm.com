/**
 * Real references only. The section hides itself when this array is empty, so
 * an unfinished references block never ships by accident, and a single genuine
 * quote is worth more than three placeholders.
 */

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Abdul has a strong ability to bring together creativity, UX, business objectives, and customer-centric thinking. He translated a complex, information-heavy microsite into a clear, intuitive, and visually engaging experience, always considering how customers would navigate and interact with the content. He was highly collaborative, receptive to feedback, and a pleasure to work with. I would gladly work with Abdul again and highly recommend him.",
    name: "Akshay Carvalho",
    title: "Marketing Manager, RBC",
  },
  {
    quote:
      "Abdul is a talented and dependable designer who learns quickly, embraces feedback, and consistently goes above and beyond. He played a key role in leading a large-scale site design from concept to completion, collaborating effectively with partners throughout the process. His initiative, reliability, and strong design skills made him a valuable member of the team.",
    name: "Jackie Evershed",
    title: "Senior Product Design Manager, RBC",
  },
  {
    quote:
      "Abdul is a bright and thoughtful designer who is genuinely easy to work with. He stays on top of his work, takes ownership, and is comfortable working independently with stakeholders. What stood out to me most was his critical thinking. He asks the right questions and isn't afraid to suggest a better design solution when he sees an opportunity. It was a great experience working with him, and I'd happily recommend him to any team.",
    name: "Hanna Kukharenka",
    title: "Project Manager, RBC",
  },
];
