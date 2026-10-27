# Daniel Long — Front-End Developer Portfolio

[![Live site](https://img.shields.io/badge/Live-daniel7long.com-1F3864?style=for-the-badge)](https://daniel7long.com)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> *Simplicity is the ultimate sophistication.*

The home of my work as a front-end developer and HCI graduate student at **Carnegie Mellon University** (M.S. Human-Computer Interaction, M.A. Applied Linguistics, May 2027). It presents six shipped products, each with a live demo and a full case study covering the problem, the design decisions, the engineering and what comes next.

The site is itself a small product: data-driven, dependency-light, fast, accessible and instrumented. This README covers how it is built and what the projects behind it are.

**Live site: [daniel7long.com](https://daniel7long.com)**

---

## The work at a glance

| # | Project | What it is | Stack |
| --- | --- | --- | --- |
| 01 | **Langogo** — Speak Without the Fear | Low-anxiety speaking practice for six languages (CMU Online Learning Center) | React Native, Expo, Python, FastAPI |
| 02 | **SoftUtter** — LLM-Driven Speech Scaffolding | Turns a rough spoken or typed attempt into a target sentence with audio | React 19, Vite, JSX, Python, SQLite |
| 03 | **Lumina** — Online Course Learning Platform | A new version of CMU's Open Learning Initiative-style platform: learner app, admin console and API | React 19, JSX, Node.js, OpenAI API |
| 04 | **iRead** — Reading That Feels Natural | Dyslexia-friendly reading app: syllable help, read-aloud, word bank | React 19, Vite 7, TypeScript, CSS |
| 05 | **AP Master** — Turn Mistakes into Top Scores | AP exam prep with an Errors Bank that turns wrong answers into study material | TypeScript, React, Vite, Render |
| 06 | **WeLearn** — Your Whole Learning Journey in One Hub | Mobile-first English rebuild of an LMS whose original edition serves 23,000+ users | React 19, TypeScript, Vite, CSS |

Every project has a dedicated details page on the site (`#/project/<id>`) with the sections: Overview, Tech stack, The problem, What I built, Key features, Design & UX highlights, Engineering highlights and What's next.

### What the projects demonstrate

- **Research to production.** iRead began as a full UX case study (research, wireframes, hi-fi mock-ups, an interactive prototype) and was then built as an installable PWA. Langogo was redesigned from scratch after user testing showed the first UI felt rough, keeping every feature.
- **A real design-to-code pipeline.** In Langogo, Figma variables (Primitives, Tokens with Light and Dark modes, Layout) are exported with the Design Tokens plugin to `design_tokens.json`, which generates the app's theme file. A colour or spacing change in Figma flows straight into code.
- **One codebase, many surfaces.** Langogo's Expo / React Native code targets native devices and the live web build. iRead serves phone and tablet layouts from a single codebase.
- **Full-stack and AI-integrated.** SoftUtter and Lumina pair React front ends with Python and Node back ends and LLM features. Langogo scores pronunciation through Azure Speech behind a FastAPI service. Lumina is a multi-part system (learner app, admin console, shared API) built so each part can change independently.
- **Global and multilingual.** Langogo and SoftUtter support French, Spanish, German, Japanese, Korean and Mandarin Chinese, including non-Latin scripts.
- **Product judgment.** WeLearn was reconstructed from screens alone, with no UI source code, and was deliberately simplified rather than copied screen for screen. AP Master carries over an existing product's information architecture and re-designs it for the web.

---

## How this site is built

### Architecture

| Concern | Approach |
| --- | --- |
| Framework | **React 18 + Vite 5**, no UI library, so the bundle stays small and every style is intentional |
| Content | **Data-driven.** All copy lives in `src/data/` (`site.js`, `projects.js`, `about.js`); components only render data. Adding a project is a copy-paste of one object |
| Routing | A tiny **hash router** (`#/project/<id>`) that works on any static host, supports deep links and the back button, and needs no server rewrites |
| Styling | Plain CSS with **design tokens** (colours, spacing, type) at the top of `styles.css`; Inter for UI and Reenie Beanie for the handwritten closing quote |
| Navigation | Fixed navbar with **scroll-spy**: the active section is tracked as you scroll, including the last section at the bottom of the page |
| Project pages | Generated from the same project objects as the cards; any field left out simply hides its section |
| Hosting | **Vercel**, deployed from GitHub on every push to `main`; custom domain `daniel7long.com` with HTTPS |
| Serverless | Two small functions in `api/` for visit analytics, backed by Upstash Redis |

### Engineering details worth noting

**Cold-start mitigation for hosted demos.** Several demo backends run on Render's free tier, which sleeps when idle. `src/warmup.js` pings each unique backend URL in the background when the portfolio loads (`fetch` with `no-cors`, `no-store` and no credentials), with a 10-minute cooldown stored in `localStorage` (wrapped in try/catch so it degrades silently). By the time a visitor opens a live demo, the service has usually woken up.

**Privacy-aware analytics.** A lightweight first-party tracker records visits and the time spent in each section and project page, so I can see what resonates.
- It respects **Do Not Track**, ignores idle time (activity timeout of 60 seconds) and lets me exclude my own browsers with `/?notrack`.
- Data is stored in Upstash Redis through two serverless functions (`api/track.js`, `api/stats.js`), auto-expires after 90 days, and is readable only through a token-protected dashboard (`/stats.html`).
- Setup and settings are documented in [`ANALYTICS.md`](./ANALYTICS.md).

**Accessible by default.** Semantic landmarks and headings, breadcrumb navigation with `aria-current`, labelled icon links (GitHub and LinkedIn) with titles, and keyboard-friendly controls.

**Performance.** Two runtime dependencies (`react`, `react-dom`), static assets, optimised JPEG thumbnails, and no client-side data fetching for content.

### Quality and verification

Changes are checked before they go live:
- **Production build** (`npm run build`) on every change, because the Vite build catches broken imports and bad data shapes.
- **Headless-browser checks** with Playwright (Chromium) against a local static server: the home page and each project route are rendered and screenshotted to confirm layout, thumbnails, links and the detail-page row order.
- **Link and content review:** every live-demo URL, the LinkedIn and GitHub links and the domain are verified after deploy.
- **Real-device pass:** the live site and its custom-domain HTTPS were checked on a phone after the DNS cutover.

### Iterations so far

1. **v1:** hero, work grid, about and contact sections with data-driven project cards.
2. **v2:** project details pages and hash routing; copy rewritten from each project's README.
3. **v3:** project order and titles reworked around outcomes; generated thumbnails; Tech stack moved to the second row of every details page; profile photo; GitHub and LinkedIn icons; handwritten closing quote.
4. **v4:** "Design & UX highlights", "Engineering highlights" and "What's next" sections added to the details pages; role line and breadcrumb simplified.
5. **v5:** demo warm-up to hide cold starts.
6. **Domain:** moved from Wix to Vercel at `daniel7long.com`, with the Wix DNS records re-pointed and HTTPS verified.

---

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build
```

Visitor tracking is disabled on localhost because `/api` only runs on Vercel.

## Where to edit things

| What | File |
| --- | --- |
| Tagline, subline, nav, Work intro, contact info, GitHub and LinkedIn URLs, closing quote | `src/data/site.js` |
| Projects (add, remove, reorder), details pages and demo warm-up URLs | `src/data/projects.js` |
| About text, cards, pills | `src/data/about.js` |
| Colours, spacing, fonts | `src/styles.css` (tokens at the top) |
| Footer icons and quote styling | `src/contact.css` |
| Thumbnail framing on details pages | `src/thumbs.css` |
| Images | `public/images/` (`profile.jpg`, `thumb-<id>.jpg`) |

### Adding a project

Copy any object in `src/data/projects.js`, paste it at the end of the array and edit it. Add a thumbnail to `public/images/` and reference it as `"/images/thumb-<id>.jpg"`. The grid and the details page update automatically. Set `warmup` to a backend URL if the demo sleeps when idle.

## Deploying

1. Push to GitHub. Vercel detects Vite (`npm run build`, output `dist`).
2. Under **Settings → Domains**, add the apex and `www` domains and copy the DNS records Vercel shows into the DNS provider.
3. For analytics, connect **Upstash Redis** in Vercel Storage and set `STATS_TOKEN` (see [`ANALYTICS.md`](./ANALYTICS.md)).

## Repository layout

```
api/            Serverless functions for visit analytics
public/         Static assets, favicon, stats dashboard, images
src/
  components/   Navbar, Hero, Work, ProjectCard, ProjectDetail, About, Contact
  data/         All site content (site.js, projects.js, about.js)
  router.js     Hash router
  tracking.js   Privacy-aware visit tracking
  warmup.js     Demo-backend pre-warming
```

---

## Contact

**Daniel Long** · [daniel7long.com](https://daniel7long.com) · [LinkedIn](https://www.linkedin.com/in/daniel-hao-long) · [GitHub](https://github.com/daniel7long) · hdlong@andrew.cmu.edu

*"People who are crazy enough to think they can change the world are the ones who do."* — Steve Jobs
