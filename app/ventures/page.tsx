import type { Metadata } from 'next'
import { CompanyTile, buildEntrances } from '@/components/portfolio/directory/CompanyTile'
import { ContactForm } from '@/components/site/ContactForm'
import { Frame } from '@/components/site/Frame'
import { Rule } from '@/components/site/Section'
import { DISCIPLINES } from '@/lib/data/services'
import { PORTFOLIO_COMPANIES } from '@/lib/data/portfolio-directory'

/**
 * /ventures — every company the studio has worked with, as a wall of tiles
 * (the tile style of ACU's /portfolio page, 7 / 5 / 3 / 1 columns), then the
 * studio's disciplines and the startup submission form.
 *
 * No search, no filters, no student tab: this page is for browsing. The reading
 * happens on the company page you click into.
 */

const TITLE = 'Ventures'
const DESCRIPTION = 'Every company West Ventures has worked with, the disciplines the studio covers, and a form to submit a startup.'

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
      <main className="relative z-10 min-h-screen pt-[calc(69px+env(safe-area-inset-top))]">
        <h1 className="sr-only">Ventures</h1>
        {/* Same width as the homepage hero frame; the first row starts at the
            bottom edge of the header, as the hero frame does. */}
        <Frame>
          <div className="grid grid-cols-1 gap-2.5 [grid-auto-flow:dense] sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {PORTFOLIO_COMPANIES.map((company, index) => (
              <CompanyTile key={company.slug} company={company} entrance={entrances[index]} />
            ))}
          </div>
        </Frame>

        {/* Disciplines */}
        <Frame className="pt-28 sm:pt-40">
          <Rule className="mb-12" />
          <h2 data-reveal-item className="mb-10 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1]">
            Disciplines
          </h2>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DISCIPLINES.map((s) => (
              <div key={s.title} data-reveal-item data-reveal-auto className="rounded-[22px] bg-panel p-6 sm:p-7">
                <dt className="font-serif text-[1.45rem] font-semibold leading-tight text-ink">{s.title}</dt>
                <dd className="mt-2 text-[0.97rem] leading-[1.55]">{s.text}</dd>
              </div>
            ))}
          </dl>
        </Frame>

        {/* Startup submissions */}
        <Frame className="pt-28 sm:pt-36">
          <section id="submit" className="scroll-mt-28">
            <Rule className="mb-12" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
              <div>
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
        </Frame>
      </main>
    </>
  )
}
