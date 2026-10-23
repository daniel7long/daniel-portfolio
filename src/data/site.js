// Global site content. Edit text here — no need to touch the components.

export const site = {
  name: "Daniel Long",
  // Small line under your name in the top-left corner.
  title: "Front-End Developer",
  // Your own "DL" icon: put the file in /public/images/ with this exact name
  // (or change the path). If the file is missing, a "DL" badge is shown instead.
  logo: "/images/dl-logo.png",
  navLinks: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    // Words in `highlight` are rendered with the blue gradient.
    taglineStart: "Simplicity is the",
    taglineHighlight: "ultimate sophistication.",
    subline:
      "Hi, I'm Daniel, a front-end developer and UX designer who builds intuitive, functional products that solve real user problems.",
    primaryCta: { label: "View my work", href: "#work" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },
  work: {
    eyebrow: "My Work",
    title: "Selected Projects",
    intro:
      "Explore my front-end, full-stack, and AI-powered work, and more projects are on the way!",
  },
  contact: {
    title: "Get in touch",
    email: "hdlong@andrew.cmu.edu",
    addressLines: [
      "Carnegie Mellon University",
      "5000 Forbes Avenue",
      "Pittsburgh, PA 15213",
    ],
    // TODO: replace with your real LinkedIn profile URL
    linkedin: { label: "My LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
  },
};
