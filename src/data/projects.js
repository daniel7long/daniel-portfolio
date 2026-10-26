// ---------------------------------------------------------------------------
// PROJECTS
// To add a project, copy one object below, paste it at the end of the array,
// and edit the fields. The card grid AND its "View more" details page are
// created automatically. The order of this array is the order on the site.
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
//   status         : e.g. "Live", "In progress", "Prototype"
//   overview       : short paragraph
//   problem        : the problem the project addresses
//   built          : list — what you built / key features (dash list)
//   features       : list — feature keywords (shown as chips)
//   design         : list — design and UX highlights
//   implementation : list — engineering / implementation highlights
//   outcome        : results / what you learned
//   roadmap        : list — what comes next
//   repo           : GitHub URL
//
// The detail text is based on each project's README. Tech stacks only list
// what is confirmed; add the rest of each stack when you are ready.
// ---------------------------------------------------------------------------

export const projects = [
  {
    id: "langogo",
    thumbnail: "",
    type: "Mobile Application",
    title: "Langogo, Top-Rated Language Learning App",
    abstract:
      "A language learning app focusing on low-anxiety speaking practice with immediate feedback.",
    stack: ["Expo / React Native", "FastAPI", "Azure Speech", "Figma"],
    liveDemo: "https://langogo-v3.vercel.app",

    role: "UX Designer & Front-End Developer",
    status: "Live demo · CMU Online Learning Center",
    overview:
      "Langogo is built around one idea: speaking gets easier when practising feels safe. Learners rehearse real dialogues out loud, get immediate pronunciation feedback and can retry as often as they like, with no audience and no pressure. It supports French, Spanish, German, Japanese, Korean and Mandarin Chinese.",
    problem:
      "Many learners can read and write a language but freeze when they have to speak it. Fear of making mistakes in front of other people is the biggest barrier, so Langogo removes the audience, gives feedback straight away and makes retrying free.",
    built: [
      "A level test and result screen that places each learner.",
      "A lesson map and profile showing the path through levels and progress at a glance.",
      "Speaking dialogues: record your own voice in a guided conversation, then retry until you are happy.",
      "Key words, vocab notes and speaking records to review later.",
      "Unlockable topics, a community leaderboard, sharing and settings.",
    ],
    features: [
      "Speaking dialogues",
      "Pronunciation feedback",
      "Unlimited retries",
      "Level test",
      "Lesson map",
      "Leaderboard",
    ],
    design: [
      "Anxiety-aware interaction design: immediate feedback, unlimited retries and a private practice space are product decisions, not afterthoughts.",
      "A Figma design system with variable collections for Primitives, Tokens (Light and Dark) and Layout, plus a component library with state and type variants.",
      "A distinct green and orange brand carried through the logo and screens.",
      "Redesigned from scratch after user testing showed the first UI felt rough, keeping every existing feature.",
    ],
    implementation: [
      "Design-to-code token pipeline: Figma variables are exported with the Design Tokens plugin to a JSON file that generates the app's theme, so design and code share one source of truth.",
      "One Expo codebase that targets native devices and the web build that is live today.",
      "A FastAPI back end serves lessons for six languages, organised by language and level.",
      "Speech timing data is collected for future research but stays in the back end and is never shown to learners.",
    ],
    roadmap: [
      "Public launch with sign-up via Google account or personal email.",
      "At least 12 lessons (three levels) for every language.",
      "Testing on physical phones with Expo Go.",
    ],
  },
  {
    id: "softutter",
    thumbnail: "",
    type: "AI-Powered Web App",
    title: "SoftUtter, LLM-Driven Speech Scaffolding",
    abstract:
      "An LLM-driven speech scaffolding tool that turns a learner's rough attempt into a target sentence with audio, so they can hear it, repeat it and make it their own.",
    stack: ["LLM API", "Speech audio", "Figma", "Vercel"],
    liveDemo: "https://softutter.vercel.app",

    role: "UX Designer & Front-End Developer",
    status: "Live demo · SoftUtter 2.0",
    overview:
      "Learners often know what they want to say but not how to say it in a new language. SoftUtter takes a rough attempt, spoken or typed, and uses a large language model to scaffold it into a target sentence with audio. The first version was a focused prototype for French learners; SoftUtter 2.0 is a redesigned, much richer web app that supports six languages.",
    problem:
      "Learners get stuck between an idea and the words for it. The tool needed to meet them at that gap and give them a sentence they can hear, repeat and keep.",
    built: [
      "Compose: record your voice (with a timer) or type what you want to say.",
      "Result: the scaffolded sentence with playable audio.",
      "Shadow: repeat after the target audio.",
      "Conversation mode, a phrasebook of saved phrases and a \"My sounds\" tracker.",
      "A language picker for French, Spanish, German, Japanese, Korean and Mandarin Chinese.",
    ],
    features: [
      "Voice or text input",
      "Scaffolded sentences",
      "Audio shadowing",
      "Conversation mode",
      "Phrasebook",
      "Six languages",
    ],
    design: [
      "A soft, friendly brand: a blue-to-teal speech bubble with lips and sound waves, with \"Soft\" in blue and \"Utter\" in teal.",
      "Redesign before rebuild: compose, result, shadow, conversation and phrasebook screens were designed and approved first, then built.",
      "A deliberately small interaction loop: say it, scaffold it, hear it, repeat it.",
    ],
    implementation: [
      "Six languages, including non-Latin scripts (Japanese, Korean and Mandarin Chinese) alongside French, Spanish and German.",
      "Grew from a minimal prototype tool into a multi-screen web application.",
      "Recording, generated target audio and shadowing all sit in one interaction.",
    ],
  },
  {
    id: "iread",
    thumbnail: "",
    type: "Progressive Web App",
    title: "iRead, Reading That Feels Natural",
    abstract:
      "A calm, dyslexia-friendly reading app with syllable help, read-aloud and a personal word bank.",
    stack: ["React", "TypeScript", "PWA", "Figma"],
    liveDemo: "https://iread-rust.vercel.app",

    role: "UX Researcher, Designer & Front-End Developer",
    status: "Live demo · UX case study build",
    overview:
      "iRead is a reading app for people navigating dyslexia. It makes text easier to approach with syllable help, read-aloud and a personal word bank, all inside a deliberately quiet interface. It is the working build of my UX case study, which covered research, wireframes, high-fidelity mock-ups and an interactive prototype before any code was written.",
    problem:
      "Dense, bright pages are hard work for readers with dyslexia, and many young readers use a tablet rather than a phone. The app needed to lower the effort of reading on both screens.",
    built: [
      "Syllable help to support decoding longer words.",
      "Read-aloud so text can be heard on demand.",
      "A personal word bank for the words you want to practise.",
      "A soft, warm off-white palette instead of a stark white page.",
    ],
    features: ["Syllable help", "Read-aloud", "Word bank", "Calm palette", "Mobile + tablet"],
    design: [
      "Research-led: the product grew out of user research, wireframes, hi-fi mock-ups and an interactive prototype.",
      "Mobile and tablet layouts, because many young readers use a tablet rather than a phone.",
      "A full Figma design system (components plus mobile and tablet frames) that the front end is built from.",
    ],
    implementation: [
      "Design-to-code fidelity: the interface was built from exported Figma designs, so spacing, colour and type follow the design system.",
      "Progressive web app metadata lets the site be saved to a phone or tablet home screen.",
      "One codebase for phone and tablet layouts rather than two separate products.",
    ],
    roadmap: ["Complete the remaining tablet-landscape screens."],
  },
  {
    id: "welearn",
    thumbnail: "",
    type: "Learning Management App",
    title: "WeLearn, Mobile-First LMS in English",
    abstract:
      "A mobile-first learning management app where every learner signs up and gets a personal hub.",
    stack: ["Mobile-first web", "Vercel", "Git / GitHub"],
    liveDemo: "https://welearn-lac.vercel.app",

    role: "UX Designer & Front-End Developer",
    status: "Live demo",
    overview:
      "WeLearn is a learning management system designed for phones first. Every learner signs up, logs in and gets their own hub: a personal dashboard that keeps their learning in one place. It is an English rebuild of the WeLearn LMS, whose original edition serves more than 23,000 users.",
    problem:
      "The original interface served a large user base but only in its original language. The goal was to rebuild it as a clean, product-grade English experience without carrying over every screen.",
    built: [
      "Sign up and log in with a personal account.",
      "A personal hub: each learner lands on their own space instead of a generic home page.",
      "Mobile-first layouts designed for small screens first.",
      "A fully English interface, with copy and labels written for English-speaking learners.",
    ],
    features: ["Sign up / log in", "Personal hub", "Mobile-first", "English UI"],
    design: [
      "Clarity over feature parity: screens such as reward listings were open to being simplified or cut so the app stays clean and intuitive.",
      "A teal identity carried through the browser theme colour and the interface.",
      "Rebuilt from screens alone: with no UI source code, the information architecture, component patterns and flows were reconstructed from the existing interface, then redesigned.",
      "A safe-area aware layout for modern phones.",
    ],
    implementation: [
      "Git-to-production workflow: deployed from Git to Vercel, so the live demo updates with a push.",
      "Product-grade scope: the English counterpart of a product with a large existing user base, not a throwaway demo.",
    ],
  },
  {
    id: "ap-master",
    thumbnail: "",
    type: "Mobile-First Web App",
    title: "AP Master, AP Exam Practice",
    abstract:
      "A mobile-first web app that helps students around the world prepare for AP exams with practice, trial courses and a personal study hub.",
    stack: ["Mobile-first web", "Render", "Git / GitHub"],
    liveDemo: "https://ap-master.onrender.com",

    role: "UX Designer & Front-End Developer",
    status: "Live demo",
    overview:
      "AP Master brings structured practice, trial courses and a personal study hub together in one calm, teal-themed experience. It is an English-language web adaptation of an existing mobile product: the information architecture and visual language were carried over, then redesigned and rebuilt for the web.",
    problem:
      "AP students need focused practice and a way to learn from their mistakes. The existing product served one language market, so it needed an English version that works well on phones.",
    built: [
      "Practice: 20 practice sets for every AP subject, including each subject's branches.",
      "Courses: three trial lessons, with a clear next step to contact a consultant for the full programme.",
      "Profile hub: records of past practice, an Errors Bank of questions you got wrong, and custom practice.",
    ],
    features: ["Practice sets", "Trial courses", "Errors Bank", "Custom practice", "Records"],
    design: [
      "A teal visual identity applied consistently, down to the browser theme colour.",
      "Mobile-first and safe-area aware, so content can extend to the screen edges on notched phones.",
      "An English UI for a global audience, adapted from an existing product's screens and Figma styles.",
      "Mistakes become a feature: the Errors Bank turns wrong answers into study material.",
    ],
    implementation: [
      "Static-site deployment on Render, so there is no server to maintain.",
      "A Git-based workflow: code lives on GitHub and is deployed to Render from the repository.",
      "Three clearly separated flows (Practice, Courses and Profile hub) share one visual system.",
    ],
    repo: "https://github.com/daniel7long/ap-master",
  },
  {
    id: "lumina",
    thumbnail: "",
    type: "Full-Stack Platform",
    title: "Lumina, Online Course Learning Platform",
    abstract:
      "A learner app, an admin console and an API working together, with an AI assistant for learners.",
    stack: ["Learner app", "Admin console", "API", "OpenAI API", "Render"],
    liveDemo: "https://lumina-learning-qz52.onrender.com",

    role: "Full-Stack Developer & UX Designer",
    status: "Live demo · English course, Units 1–3",
    overview:
      "Lumina is an online course learning platform designed to grow. Learners work through an English course in a dedicated learner app, administrators use a separate admin console, and an AI assistant supports learners along the way. It is a real multi-part system rather than a single front end.",
    problem:
      "Learners and administrators have very different needs. A single interface would serve neither well, so each needed its own purpose-built product backed by shared services.",
    built: [
      "A learner app for working through the English course, Units 1–3.",
      "A dedicated admin console, separate from the learner experience.",
      "An AI learning assistant powered by the OpenAI API.",
      "One API behind both the learner app and the admin console.",
    ],
    features: ["Learner app", "Admin console", "AI assistant", "Shared API", "Unit-based course"],
    design: [
      "Two products, one system: learners and administrators each get an interface made for them.",
      "A structured learning path: the course is organised into units so learners always know where they are.",
    ],
    implementation: [
      "Built with growth in mind: the learner app, admin console and API are separate parts, so each can change independently as the user base grows.",
      "AI built in: an assistant is part of the learning experience instead of a separate tool.",
      "Hosted on Render. If the demo has been idle, the first request may take a few seconds.",
    ],
  },
];
