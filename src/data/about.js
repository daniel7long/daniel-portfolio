// About section content. Edit freely.
// Layout: profile photo (left) with floating tech labels, text (right).

export const about = {
  // Your profile picture: put the file in /public/images/ with this exact name
  // (or change the path). If it is missing, a "DL" placeholder is shown.
  photo: "/images/profile.jpg",
  photoAlt: "Portrait of Daniel Long",

  // The three floating labels around the photo (title + one short line).
  tags: [
    { title: "Responsive UI", text: "Designed for every screen" },
    { title: "React + Node.js", text: "Modern web applications" },
    { title: "UX + HCI", text: "Research-driven design" },
  ],

  eyebrow: "A little about me",
  headlineStart: "Designer's eye, developer's",
  headlineHighlight: "precision.",
  paragraphs: [
    "I'm Daniel Long, a graduate student at Carnegie Mellon University studying Human-Computer Interaction and Applied Linguistics. I focus on building clean, responsive interfaces and web applications that are easy to use.",
    "Working across front-end and back-end development lets me take an idea from user research and prototypes all the way to production-ready code, while keeping the user's needs in view at every step.",
  ],
  cards: [
    { title: "Frontend", text: "HTML5, CSS3, JavaScript, React, responsive UI" },
    { title: "Full stack", text: "Node.js, Express, REST APIs, Python" },
    { title: "Design", text: "User research, wireframing, prototyping, usability testing" },
    { title: "Exploring", text: "LLM-powered learning tools, speech and language technology" },
  ],
  pills: ["HCI graduate student", "Front-end developer", "UX designer"],
};
