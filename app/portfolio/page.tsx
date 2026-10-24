import type { Metadata } from 'next'
import { CompanyTile, buildEntrances } from '@/components/portfolio/directory/CompanyTile'
import { PortfolioSections } from '@/components/portfolio/directory/PortfolioSections'
import { PORTFOLIO_COMPANIES, PORTFOLIO_STUDENTS } from '@/lib/data/portfolio-directory'

/**
 * /portfolio — the accelerator's work as a wall of tiles.
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

const TITLE = 'Portfolio'
const DESCRIPTION = `Every company a West Ventures student team has worked with, and the ${PORTFOLIO_STUDENTS.length} students who did the work.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/portfolio' },
  openGraph: { url: '/portfolio', title: TITLE, description: DESCRIPTION, type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function PortfolioPage() {
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
                  Portfolio
                </h1>
                <p className="mt-5 max-w-[36rem] text-[15.5px] leading-[1.68] text-muted-foreground">
                  Companies that have had a student team from the studio, and the {PORTFOLIO_STUDENTS.length}{' '}
                  students who did the work. A founder brings a project. A team of Austin Christian
                  University students and high school Builder Scholars works on it for a semester, for
                  course credit. Select a company to see the team and the work.
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

          {/* The /startups pitch, unrolled: what the accelerator is, what it
              offers founders and students, the ecosystem behind it, and the
              form. See PortfolioSections. */}
          <PortfolioSections />
        </div>
      </main>
    </>
  )
}
