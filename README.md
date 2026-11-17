# venture-studio (West Ventures, working name)

Next.js site for West Ventures.

| Route | What it is |
| --- | --- |
| `/` | Home: selected work (list left, artwork right), overview, partners, thesis, all other work, contact link |
| `/ventures` | Index of every company. Selected ventures (`lib/data/selected.ts`) link to a case study; the rest are plain rows. Then disciplines and startup submissions |
| `/info-packet` | Inquiry form. The "I am a…" answer decides which info packet is sent (`/contact` redirects here) |
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

Info packets: set a link per audience (`PACKET_URL_STUDENT`, `PACKET_URL_PARENT`, `PACKET_URL_FOUNDER`, `PACKET_URL_HIGH_SCHOOL`, `PACKET_URL_UNIVERSITY`, `PACKET_URL_PARTNER`, `PACKET_URL_ADVISOR`, `PACKET_URL_STUDENT_FELLOW`) and the visitor's confirmation email includes it. Without a link, the email to the studio says to send that packet by hand. Audiences and packet contents: `lib/contact.ts`.

## Notes

- Theme: colors live as CSS variables in `app/globals.css` (`:root` and `[data-theme="dark"]`). The portfolio pages copied from the ACU site use ACU token names, which are mapped onto these variables.
- Inertial scroll: Lenis (`components/site/SmoothScroll.tsx`). Elements that scroll on their own carry `data-lenis-prevent`.
- Content: `lib/data/ventures.ts`, `lib/data/thesis.ts`, `lib/data/portfolio-directory.ts`, `lib/data/portfolio-sections.ts`.
- Sound: off by default; the header toggle starts a soundscape synthesized in the browser (`lib/sound.ts`, no audio files). Each section has its own chord.
- Menu: `components/site/Header.tsx`. Pages come from `components/site/nav.ts`, the News column from `lib/data/news.ts`.
- Film: `components/home/Hero.tsx` is no longer on the homepage (selected work replaced it); the component is kept. It plays an animatic. To use real footage, add `public/film/loop.mp4` and set `LOOP_VIDEO` in `components/home/Hero.tsx`.
- The whole site is `noindex` for now (`app/layout.tsx`, `robots`).
