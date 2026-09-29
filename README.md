# rdbagwell.github.io

Robert Bagwell's developer portfolio — a single-page static site built with
React 18, Vite, TypeScript and Tailwind CSS, deployed to GitHub Pages at
<https://rdbagwell.github.io>.

## Run it locally

Requires Node.js 20 or newer (CI uses Node 22).

```sh
npm install
npm run dev        # dev server at http://localhost:5173
npm test           # vitest
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ at http://localhost:4173
```

`npm run dev` shows dashed yellow **TODO** badges wherever content is still
missing (email, LinkedIn, headshot…). They never appear in the production build.

## Editing content

All content lives in two files — components contain no copy:

- `src/data/profile.ts` — name, title, pitch, bio, contact links, skills.
  Empty strings (`''`) are hidden on the live site.
- `src/data/projects.ts` — the project cards.

### Adding a project

1. Save a screenshot to `public/projects/<slug>.webp`. Aim for about 960 px wide,
   16:9 or 16:10. Any editor that exports WebP works; <https://squoosh.app>
   converts and resizes in the browser.
2. Add an object to the `projects` array in `src/data/projects.ts`:

   ```ts
   {
     slug: 'my-game',                       // lowercase-with-dashes, unique
     title: 'My Game',
     tagline: 'One line.',
     description: 'Two to four sentences.',
     tech: ['TypeScript', 'Canvas 2D'],
     featured: false,                        // true = large card at the top
     status: 'live',                         // 'live' | 'local' | 'coming-soon'
     links: { demo: 'https://…', code: 'https://github.com/RDBagwell/…' },
     demoLabel: 'Play',                      // optional, default "Live demo"
     image: '/projects/my-game.webp',
     imageWidth: 960,                        // the file's real pixel size
     imageHeight: 540,
     imageAlt: 'What the screenshot shows.',
     note: 'Optional small print.',          // optional
   },
   ```

   Buttons only appear for links that exist. A `live` project must have a
   `demo` link and other statuses must not — the tests enforce this.
3. Run `npm test`, then commit and push to `main`. The site redeploys automatically.

## Deploying

`.github/workflows/deploy.yml` runs the tests, builds with Vite and publishes
`dist/` with the official `actions/deploy-pages` on every push to `main`.
Pull requests run the tests and build but don't deploy.

### One-time GitHub settings

1. Open <https://github.com/RDBagwell/RDBagwell.github.io/settings/pages>
   (repo → **Settings** → **Pages**).
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Go to **Settings → Environments → github-pages** (created on the first
   deploy) and check that **Deployment branches** allows `main`.
4. Merge to `main` (or run the workflow from the **Actions** tab with
   **Run workflow**). The live URL appears in the run summary.
5. Optional: under **Settings → Pages**, tick **Enforce HTTPS** if it isn't already.

## Security notes

- A Content Security Policy is added to `index.html` at build time (see
  `vite.config.ts`) because GitHub Pages can't send custom headers. It is
  `default-src 'self'` with no inline scripts, no `eval` and no third-party
  origins. It is omitted from the dev server, whose hot-reload relies on
  inline styles.
- No third-party scripts, analytics, trackers or web fonts; the site uses the
  system font stack.
- External links always go through `ExternalLink`, which sets
  `target="_blank" rel="noopener noreferrer"`.

## The 3D accent

`src/components/HeroScene.tsx` is a procedurally generated three.js scene (no
models, textures or audio). It's a separate chunk, loaded only once the page
is idle, and only on screens ≥ 768 px wide with WebGL and without
`prefers-reduced-motion`. Otherwise the static SVG in `HeroFallback.tsx` shows.
Rendering pauses when the hero is off-screen or the tab is hidden.
