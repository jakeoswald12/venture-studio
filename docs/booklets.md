# Info booklets

Five audience booklets (parents, students, founders and executives, high schools, universities), behind the partner interest form.

- `/booklet` is the form. `/booklet?for=parents` (or `students`, `founders`, `high-schools`, `universities`) preselects one.
- Submitting the form signs a personal link (`/booklet/<audience>?t=…`, good for 180 days), opens it right away, emails and texts it, and notifies the studio.
- `/api/booklet/pdf?t=…` downloads the pre-built PDF from `booklets/pdf/`, which is outside `/public` so a link is needed.
- The whole site is already noindex. The booklet pages also send `noindex, nofollow`.

## Editing

- Copy that changes by audience: `lib/booklets/audiences.ts` (cover line, letter, page order, FAQ, next steps).
- Shared pages: `components/booklet/pages.tsx`. Numbers and quotes come from `lib/booklets/facts.ts`, which reads the site data. Founder testimonials come from the portfolio directory.
- Testimonials from parents, teachers and students are placeholders in `FAMILY_QUOTES` (`lib/booklets/facts.ts`). Fill in each quote and remove `pending`.
- Items marked "To confirm" in the booklets: the supervision policy and the Living and Learning details.

After editing, rebuild the PDFs:

```
npm run build && BOOKLET_SECRET=local npm start
BOOKLET_SECRET=local python3 scripts/build-booklet-pdfs.py
```

## Environment variables (Vercel)

| Variable | Purpose |
| --- | --- |
| `BOOKLET_SECRET` | Required. Any long random string; signs the links. |
| `SITE_URL` | Optional. e.g. `https://gowest.ventures`, used in emailed and texted links. |
| `RESEND_API_KEY`, `BOOKLET_FROM` | The email to the person (`BOOKLET_FROM` falls back to `CONTACT_FROM`). |
| `CONTACT_TO` | Receives a notice for every request; also the reply-to on the booklet email. |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` or `TWILIO_MESSAGING_SERVICE_SID` | The text. Sent only if the person ticks the consent box. US numbers need an A2P 10DLC registered sender. |
| `HUBSPOT_TOKEN` | Optional. Creates or updates the contact in HubSpot. |

Any channel without its variables is skipped; the booklet still opens.
