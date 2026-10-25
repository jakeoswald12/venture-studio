# venture-studio (West Ventures, working name)

Next.js site for West Ventures.

| Route | What it is |
| --- | --- |
| `/` | Home: hero, overview, ventures preview, thesis preview, general contact form (`/contact` redirects here) |
| `/ventures` | Every company the studio has worked with (tile wall from ACU's /portfolio), then services |
| `/portfolio/[company]`, `/portfolio/student/[student]` | Company case studies and student pages (`/portfolio` redirects to `/ventures`) |
| `/partners` | Venture firms, organizations, universities, high schools, network, partnership form |
| `/team` | Leadership, board, Student Fellows, advisors |
| `/thesis` | Thesis and operating principles |
| `/master-plan` | Master plan deck (`public/master-plan-deck.html`), linked from the footer |

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

- Theme: colors live as CSS variables in `app/globals.css` (`:root` and `[data-theme="dark"]`). The portfolio pages copied from the ACU site use ACU token names, which are mapped onto these variables.
- Inertial scroll: Lenis (`components/site/SmoothScroll.tsx`). Elements that scroll on their own carry `data-lenis-prevent`.
- Content: `lib/data/ventures.ts`, `lib/data/thesis.ts`, `lib/data/portfolio-directory.ts`, `lib/data/portfolio-sections.ts`.
- Film: the homepage plays an animatic. To use real footage, add `public/film/loop.mp4` and set `LOOP_VIDEO` in `components/home/Hero.tsx`.
- The whole site is `noindex` for now (`app/layout.tsx`, `robots`).
