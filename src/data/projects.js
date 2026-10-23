// ---------------------------------------------------------------------------
// PROJECTS
// To add a project, copy one object below, paste it at the end of the array,
// and edit the fields. The card grid AND its "View more" details page are
// created automatically.
//
// CARD fields (shown on the home page)
//   id         : unique, URL-friendly name (used in the details-page link)
//   thumbnail  : image in /public/images (e.g. "/images/langogo.png").
//                "" shows a gradient placeholder instead.
//   type       : small label above the title (e.g. "Mobile Application")
//   title      : project name + short descriptor
//   abstract   : 1–2 sentence summary
//   stack      : list of technologies shown as chips
//   liveDemo   : URL of the deployed demo. "" shows "Live demo coming soon".
//
// DETAILS-PAGE fields (all optional — a section is hidden if you leave it out)
//   role           : your role on the project
//   status         : e.g. "Delivered", "In progress", "Prototype"
//   overview       : short paragraph
//   problem        : the problem the project addresses
//   built          : list — what you built
//   features       : list — key features (shown as chips)
//   implementation : list — implementation details
//   outcome        : results / what you learned
//   repo           : GitHub URL
//
// NOTE: the detail text below is a DRAFT based only on each card's abstract.
// Please rewrite it in your own words and check every claim.
// ---------------------------------------------------------------------------

export const projects = [
  {
    id: "langogo",
    thumbnail: "",
    type: "Mobile Application",
    title: "Langogo, Top-Rated Language Learning App",
    abstract:
      "A language learning app focusing on low-anxiety speaking practice with immediate feedback.",
    stack: ["React Native", "Node.js", "Python"],
    liveDemo: "https://your-langogo-demo.vercel.app",

    role: "UX Designer & Front-End Developer",
    overview:
      "Langogo is a language learning app built around low-anxiety speaking practice. Learners speak out loud and get immediate feedback, without the pressure of a live conversation.",
    problem:
      "Many learners avoid speaking practice because they are afraid of making mistakes. The product needed to make speaking feel safe and to respond right away, so learners can keep going.",
    built: [
      "A mobile language learning app centred on speaking practice.",
      "A feedback flow that responds immediately after each attempt.",
      "A low-pressure interface designed to keep learners comfortable.",
    ],
    features: ["Speaking practice", "Immediate feedback", "Low-anxiety design"],
    implementation: [
      "React Native front end for the mobile experience.",
      "Node.js and Python services behind the app.",
    ],
    outcome: "Add results, user feedback or lessons learned here.",
  },
  {
    id: "softutter",
    thumbnail: "",
    type: "AI-Powered Web App",
    title: "SoftUtter, Speech Scaffolding for French Learners",
    abstract:
      "An LLM-driven speech scaffolding tool that helps French learners build up what they want to say, step by step.",
    stack: ["React", "Node.js", "LLM API"],
    liveDemo: "https://your-softutter-demo.vercel.app",

    role: "UX Designer & Front-End Developer",
    overview:
      "SoftUtter is an LLM-driven speech scaffolding tool for French learners. It helps them build up what they want to say, step by step.",
    problem:
      "Learners often know what they want to express but struggle to put it into French in the moment. The tool needed to support them gradually instead of handing over a finished sentence.",
    built: [
      "A web tool that scaffolds speech one step at a time.",
      "An LLM-backed flow that guides learners towards their own sentence.",
    ],
    features: ["Step-by-step scaffolding", "LLM-powered guidance", "French practice"],
    implementation: [
      "React interface with a Node.js backend.",
      "LLM API calls kept on the server side.",
    ],
  },
  {
    id: "iread",
    thumbnail: "",
    type: "Web Application",
    title: "iRead",
    abstract: "Replace this with a one- or two-sentence summary of iRead.",
    stack: ["React", "Node.js"],
    liveDemo: "https://your-iread-demo.vercel.app",

    overview: "Replace this with a short overview of iRead.",
  },
  {
    id: "welearn",
    thumbnail: "",
    type: "Full-Stack Project",
    title: "WeLearn",
    abstract: "Replace this with a one- or two-sentence summary of WeLearn.",
    stack: ["React", "Node.js", "MongoDB"],
    liveDemo: "https://your-welearn-demo.vercel.app",

    overview: "Replace this with a short overview of WeLearn.",
  },
];
