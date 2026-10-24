# venture-studio (West Ventures, working name)

Next.js site for West Ventures.

| Route | What it is |
| --- | --- |
| `/` | Home: film frame, overview, numbers, joint ventures, portfolio strip, documents, contact |
| `/ventures` | Joint ventures (Unify, launch.kids, Builder's Quotient, stealth Life Time project, blkbox.io) |
| `/portfolio` | Duplicate of austinchristianuniversity.org/portfolio, with company and student pages |
| `/thesis` | Thesis and operating principles |
| `/master-plan` | Master plan deck (`public/master-plan-deck.html`) framed in the site |

## Run locally

```
npm install
npm run dev        # http://localhost:4848
```

## Deploy

Import the repo in Vercel. Framework preset: Next.js. No environment variables needed.

## Notes

- Theme: colors live as CSS variables in `app/globals.css` (`:root` and `[data-theme="dark"]`). The portfolio pages copied from the ACU site use ACU token names, which are mapped onto these variables.
- Inertial scroll: Lenis (`components/site/SmoothScroll.tsx`). Elements that scroll on their own carry `data-lenis-prevent`.
- Content: `lib/data/ventures.ts`, `lib/data/thesis.ts`, `lib/data/portfolio-directory.ts`, `lib/data/portfolio-sections.ts`.
- Film: the homepage plays an animatic. To use real footage, add `public/film/loop.mp4` and set `LOOP_VIDEO` in `components/home/Hero.tsx`.
- The whole site is `noindex` for now (`app/layout.tsx`, `robots`).
