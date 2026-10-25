import type { Metadata } from 'next'
import { CompanyTile, buildEntrances } from '@/components/portfolio/directory/CompanyTile'
import { ContactForm } from '@/components/site/ContactForm'
import { Container, Label, Rule } from '@/components/site/Section'
import { DISCIPLINES, ENGAGEMENT_MODELS } from '@/lib/data/services'
import { PORTFOLIO_COMPANIES, PORTFOLIO_STUDENTS } from '@/lib/data/portfolio-directory'

/**
 * /ventures — every company the studio has worked with, as a wall of tiles
 * (the layout of ACU's /portfolio page), then the services the studio provides.
 *
 * The opening copy is a block inside the grid rather than a banner above it, so
 * tiles wrap around it (dense auto-flow backfills the columns beside the text)
 * and the page reads as one field of work. Column counts stay odd — 7 / 5 / 3 /
 * 1 — and two spacers shape the opening: an empty band across the top right,
 * then two tiles, then three, then full seven-wide rows.
 *
 * No search, no filters, no student tab: this page is for browsing. The reading
 * happens on the company page you click into.
 */

const TITLE = 'Ventures'
const DESCRIPTION = 'Every company West Ventures has worked with, and the services the studio provides to them.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/ventures' },
  openGraph: { url: '/ventures', title: TITLE, description: DESCRIPTION, type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function VenturesPage() {
  // One pass over the wall decides how every tile enters — see buildEntrances.
  const entrances = buildEntrances(PORTFOLIO_COMPANIES.map((c) => c.slug))

  return (
    <>
      <main className="relative z-10 min-h-screen pt-[92px] sm:pt-28">
        <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-[50px]">
          <div className="grid grid-cols-1 gap-2.5 [grid-auto-flow:dense] sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {/* The copy is centred as a block inside the columns it occupies —
                left-aligned text, but the group sits in the middle of the space
                rather than hugging its left edge. */}
            <section className="col-span-1 flex flex-col justify-center py-8 sm:col-span-3 lg:row-span-2 xl:col-span-4 xl:col-start-1 xl:row-span-3 xl:row-start-1">
              <div className="mx-auto flex w-full max-w-[38rem] flex-col items-start">
                <h1 className="font-serif text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-.015em] text-navy-accent text-balance">
                  Ventures
                </h1>
                <p className="mt-5 max-w-[36rem] text-[15.5px] leading-[1.68] text-muted-foreground">
                  Every company the studio has worked with. Most brought a project to a student team
                  for a semester. Some are joint ventures the studio co-founded and holds equity in.
                  {' '}{PORTFOLIO_STUDENTS.length} students have worked on these companies. Select a
                  company to see the team and the work.
                </p>
              </div>
            </section>

            {/* Two spacers shape the opening of the wall at the 7-column width.
                Both are placed explicitly rather than left to auto-flow, since
                dense packing would otherwise slide them into the first gap it
                finds. The first holds an empty band across the top right so the
                topmost tile sits well below the headline; the second leaves two
                cells free on the row beneath, and the row after that takes all
                three. Narrower grids have no cells to spare, so both are hidden
                and the wall simply flows. */}
            <span
              aria-hidden="true"
              className="hidden h-32 xl:col-span-3 xl:col-start-5 xl:row-start-1 xl:block"
            />
            <span
              aria-hidden="true"
              className="hidden xl:col-span-1 xl:col-start-5 xl:row-start-2 xl:block"
            />

            {PORTFOLIO_COMPANIES.map((company, index) => (
              <CompanyTile key={company.slug} company={company} entrance={entrances[index]} />
            ))}
          </div>
        </div>

        {/* Services */}
        <Container className="pt-28 sm:pt-40">
          <Rule className="mb-12" />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div>
              <Label className="mb-5">Services</Label>
              <h2 data-reveal-item className="text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1]">
                Services
              </h2>
              <p data-reveal-item style={{ '--d': 1 } as React.CSSProperties} className="mt-6 max-w-[40ch] text-[1.04rem] leading-[1.7]">
                What the studio provides to the companies it works with. Companies and investors do
                not pay for any of it.
              </p>
            </div>
            <div className="flex flex-col gap-14">
              <div>
                <Label className="mb-5">Disciplines</Label>
                <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {DISCIPLINES.map((s) => (
                    <div key={s.title} data-reveal-item data-reveal-auto className="rounded-[22px] bg-panel p-6">
                      <dt className="font-serif text-[1.35rem] font-semibold leading-tight text-ink">{s.title}</dt>
                      <dd className="mt-2 text-[0.95rem] leading-[1.55]">{s.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <Label className="mb-5">How the studio works with companies</Label>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {ENGAGEMENT_MODELS.map((s) => (
                    <div key={s.title} data-reveal-item data-reveal-auto className="rounded-[22px] border border-line p-6 sm:p-7">
                      <dt className="font-serif text-[1.35rem] font-semibold leading-tight text-ink">{s.title}</dt>
                      <dd className="mt-2 text-[0.95rem] leading-[1.6] text-ink/80">{s.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>

        {/* Startup submissions */}
        <Container className="pt-28 sm:pt-36">
          <section id="submit" className="scroll-mt-28">
            <Rule className="mb-12" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
              <div>
                <Label className="mb-5">Submit</Label>
                <h2 data-reveal-item className="text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1]">
                  Submit a startup
                </h2>
                <p data-reveal-item style={{ '--d': 1 } as React.CSSProperties} className="mt-6 max-w-[40ch] text-[1.04rem] leading-[1.7]">
                  For founders with a company, or an idea, that they want the studio to help build.
                </p>
              </div>
              <div data-reveal-item style={{ '--d': 2 } as React.CSSProperties}>
                <ContactForm variant="venture" />
              </div>
            </div>
          </section>
        </Container>
      </main>
    </>
  )
}
