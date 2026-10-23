# Daniel Long — Portfolio

A fast, clean React portfolio built with Vite. Four sections: Hero, Work, About, Contact.

## Run locally

```bash
npm install
npm run dev
```

## Where to edit things

| What | File |
| --- | --- |
| Tagline, subline, nav, Work intro, contact info, LinkedIn URL | `src/data/site.js` |
| Project cards (add / remove / reorder) | `src/data/projects.js` |
| About section text, cards, pills | `src/data/about.js` |
| Colors, spacing, fonts | `src/styles.css` (tokens at the top) |
| About photo, floating tech labels | `src/data/about.js` |
| Top-left role line under your name | `src/data/site.js` (`title`) |

### Images to upload (put them in `public/images/`)

| File name | Used for |
| --- | --- |
| `dl-logo.png` | Your "DL" icon in the top-left (shows a "DL" badge until you add it) |
| `profile.jpg` | Profile picture in the About section (square, face centred) |
| `langogo.png`, etc. | Project thumbnails: set `thumbnail: "/images/langogo.png"` in `src/data/projects.js` |

### Project details pages

Each card's **View more** button opens `#/project/<id>` (e.g. `#/project/langogo`).
The page is built from the same object in `src/data/projects.js`: fill in `role`, `status`,
`overview`, `problem`, `built`, `features`, `implementation`, `outcome`, `repo`.
Any field you leave out hides its section.

### Adding a project

Copy any object in `src/data/projects.js`, paste it at the end of the array, and edit it.
Put thumbnail images in `public/images/` and reference them as `"/images/your-image.png"`.
The card grid adjusts automatically.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, choose **Add New → Project**, import the repo. Vite is detected automatically
   (build command `npm run build`, output directory `dist`).
3. Under **Settings → Domains**, add `daniel7long.com` and copy the DNS records Vercel shows
   into the Wix DNS settings.
