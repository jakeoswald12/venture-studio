import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/ContactForm'
import { HoverColumns, PageHero, SectionHead } from '@/components/modules/Blocks'
import { Lines } from '@/components/modules/Media'
import { Ticker } from '@/components/modules/Ticker'
import { WorkList, type WorkRow } from '@/components/modules/WorkList'
import { DISCIPLINES } from '@/lib/data/services'
import { COHORTS, PORTFOLIO_COMPANIES, companyCohorts } from '@/lib/data/portfolio-directory'
import { hasCaseStudy } from '@/lib/site'

/**
 * /ventures — every company the studio has worked with, as a ruled list: name,
 * description, then discipline and term. Artwork shows on hover. Then the
 * studio's disciplines and the startup submission form.
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
  const rows: WorkRow[] = PORTFOLIO_COMPANIES.map((c) => {
    const cohorts = companyCohorts(c)
    const study = hasCaseStudy(c)
    return {
      slug: c.slug,
      name: c.name,
      description: c.blurb ?? c.descriptor,
      meta: [...(c.blurb && c.descriptor ? [c.descriptor] : []), ...(c.disciplines ?? []), ...cohorts],
      tags: [...cohorts, ...(study ? ['Case study'] : [])],
      href: study ? `/portfolio/${c.slug}` : undefined,
      external: study ? undefined : c.url,
      image: c.tile && !/\.(mp4|webm)$/.test(c.tile) ? c.tile : undefined,
      focus: c.tileFocus,
      logo: c.logoWhite,
    }
  })
  const filters = ['Case study', ...COHORTS].filter((f) => rows.some((r) => r.tags.includes(f)))

  return (
    <main>
      <PageHero
        lines={[
          <>
            Ventures <span className="em-rule" aria-hidden="true" /> every company
          </>,
          'the studio has worked with',
        ]}
      />
      <div style={{ paddingTop: 'clamp(64px, 8vw, 120px)' }}>
        <WorkList rows={rows} filters={filters} />
      </div>

      <SectionHead title="Disciplines" />
      <HoverColumns items={DISCIPLINES.map((d) => ({ title: d.title, body: <p style={{ margin: 0 }}>{d.text}</p> }))} />
      <div className="section-sm">
        <Ticker items={DISCIPLINES.map((d) => d.title)} seconds={50} />
      </div>

      <section id="submit" className="grid12 section m-gap" style={{ scrollMarginTop: 120 }}>
        <div className="d-1-5">
          <Lines as="h2" className="t-h2" lines={['Submit a startup']} />
          <p className="t-body fade" data-io style={{ margin: '20px 0 0', maxWidth: '36ch' }}>
            For founders with a company, or an idea, that they want the studio to help build.
          </p>
        </div>
        <div className="d-7-6">
          <ContactForm variant="venture" />
        </div>
      </section>
    </main>
  )
}
