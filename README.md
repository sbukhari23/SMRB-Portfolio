# Muneeb's Portfolio

Syed Muneeb Ur Rehman Bukhari's personal portfolio: a scroll-driven "build board" where a camera moves between chapters of a single 2D canvas (Home, design/engineering background, two case studies, freelance, leadership, and contact), plus full case-study pages for each shipped project. Under 900px, or with `prefers-reduced-motion` set, it renders as a plain vertical stack instead of the camera-driven board.

Live site: https://sbukhari23.github.io/SMRB-Portfolio/

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript), statically exported (`output: "export"`) for GitHub Pages
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) + ScrollTrigger for the scroll-driven camera
- [Vitest](https://vitest.dev) for unit tests, [Playwright](https://playwright.dev) for smoke tests

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static export to `out/` |
| `npm start` | Serve the Next.js production server (not used for deploy; GitHub Pages serves `out/` directly) |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests (includes a copy guard: no em dashes, no phone-number-shaped digit runs anywhere in `content/`) |
| `npm run test:e2e` | Playwright smoke tests against the real static export, served under its GitHub Pages basePath (builds, then runs `scripts/preview-export.js`) |

To preview the static export exactly as GitHub Pages will serve it (i.e. with the `/SMRB-Portfolio` basePath), don't just `npx serve out` - that serves everything at the bare root and every basePath-prefixed asset URL 404s. Use `node scripts/preview-export.js` instead, which builds, wraps `out/` one level deeper, and serves that.

## Editing content

All real-world facts (name, dates, employers, numbers, links) live in three typed files under `content/`, kept in sync with `docs/redesign/PROFILE.md` (not in this repo; Muneeb's local planning copy):

- `content/profile.ts` - identity, bio, links, education, skills, experience, numbers
- `content/chapters.ts` - the 11 board chapters (copy, camera position, frame content, sticky notes, actions)
- `content/projects.ts` - the three case studies rendered at `/work/[slug]`

Editing a fact means editing the relevant `content/*.ts` file; the components never hardcode copy. A missing fact is marked `// TODO(muneeb): ...` and rendered as a visible dev-only placeholder chip (`--color-placeholder-chip` in `app/globals.css`) rather than invented - those must not ship visible in production.

## Structure

```
app/                  routes (home, /work/[slug], /styleguide, sitemap, robots, 404, icon)
components/
  board/              the scroll-driven camera, frames, the mobile ChapterStack
  case/               case-study page layout
  chrome/             header, chapter menu, counters
  ui/                 shared primitives (Button, CodeCard, VideoDialog, ...)
content/              typed content (see above)
lib/                  small helpers (withBase, motion tokens, useIsDesktopMotion)
tests/
  copy.test.ts        Vitest unit test (em dash / phone number guard)
  e2e/                Playwright smoke tests
scripts/              local build/preview tooling (not part of the shipped app)
```

`/styleguide` is a hidden, `noindex`'d page mirroring every UI primitive at once, useful when changing a shared component.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`: it runs `npm run build` and publishes `out/` to GitHub Pages. There's no separate build step to run by hand; just merge to `main` and watch the Actions tab.

The `redesign` branch is where this version of the site was built. Before merging it to `main` for the first time, double check:

- every dev-only placeholder chip in `content/*.ts` (Asset Management System's and Peer Support Hub's Faisal-split note, the three projects' "a reflection on this project" blockquotes, EduConnect's proposal-defence date, the resume link) is either filled in or intentionally left as a hidden-in-production TODO
- `npm test` and `npm run test:e2e` both pass
- `npm run build` succeeds with no new warnings

## License

Personal project; not licensed for reuse.
