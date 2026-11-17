# venture-studio (West Ventures, working name)

Next.js site for West Ventures.

This branch (`metalab-reference-redesign`) is an experiment: the same content, rebuilt on the structure, type, colour and motion described in the Metalab design and motion reference. Nothing from that site is reused; fonts are open equivalents and the video loops are generated in code.

| Route | What it is |
| --- | --- |
| `/` | Home: one full-viewport hero that does not scroll. Featured ventures are pills; hovering one previews it, clicking expands the preview into its case study |
| `/ventures` | Every company as a ruled list with filters, then disciplines and the startup submission form |
| `/portfolio/[company]`, `/portfolio/student/[student]` | Case studies and student pages (`/portfolio` redirects to `/ventures`) |
| `/partners` | Venture firms, network, universities, high schools, partnership form |
| `/team` | Leadership, project advisors, board, Student Fellows, firm advisors |
| `/thesis`, `/thesis/*` | Overview, thesis sections and the four essays |
| `/contact` | General contact form (was the bottom of the old home page) |

## How the redesign is organized

- `app/globals.css`: tokens (paired light/dark, one accent), type scale, motion curves, and every module's styles.
- `components/chrome/`: the shared chrome. `Chrome.tsx` owns page transitions (window wipe, preview-expands-into-page) and catches internal link clicks; `Preloader`, `Header`, `Menu`, `Footer`, `Cursor`, `Atmosphere` (the generated background loop), `Toggles` (theme, sound).
- `components/modules/`: the content modules pages are composed from (mask reveals, ruled work list, hoverable columns, vertical stats, ticker, parallax strip, list scroller, draggable row, drawers, next-case-study teaser).
- `lib/site.ts`: featured ventures, menu links and essay list.
- Placeholders to replace: the generated background loops, tinted panels for ventures without artwork, and the generated soundscape behind the sound toggle.

## Run locally

```
npm install
npm run dev        # http://localhost:4848
```

## Deploy

Import the repo in Vercel. Framework preset: Next.js. No environment variables needed.

## Contact form

The forms post to `/api/contact`, which emails each submission through Resend. Set these in Vercel (Project → Settings → Environment Variables):

- `RESEND_API_KEY`
- `CONTACT_TO` (e.g. `partners@west.ventures`)
- `CONTACT_FROM` (a verified sender, e.g. `West Ventures <forms@west.ventures>`)

Until they're set, submitting opens the visitor's email app with the message filled in.

## Notes

- Theme: colors live as CSS variables in `app/globals.css`. Dark is the default. The older token names used by the essay illustrations are mapped onto the new ones.
- Inertial scroll: Lenis (`components/site/SmoothScroll.tsx`). Elements that scroll on their own carry `data-lenis-prevent`.
- Content: `lib/data/ventures.ts`, `lib/data/thesis.ts`, `lib/data/portfolio-directory.ts`, `lib/data/portfolio-sections.ts`.
- Film: the animatic script is kept in `components/home/film.ts`; this branch's home page does not play it.
- The whole site is `noindex` for now (`app/layout.tsx`, `robots`).
