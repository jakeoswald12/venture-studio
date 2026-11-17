import type { Metadata } from 'next'
import { WorkIndex } from '@/components/work/WorkIndex'
import { ContactForm } from '@/components/site/ContactForm'
import { Frame } from '@/components/site/Frame'
import { Rule } from '@/components/site/Section'
import { DISCIPLINES } from '@/lib/data/services'
import { ALL_WORK, SELECTED_SLUGS } from '@/lib/data/selected'

/**
 * /ventures — every company the studio has worked with, as one index. Selected
 * ventures (lib/data/selected.ts) show artwork and link to a case study; the
 * rest are plain rows with a name, a description and disciplines. Then the
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
  return (
    <>
      <main className="relative z-10 min-h-screen pt-[calc(120px+env(safe-area-inset-top))] sm:pt-[150px]">
        <Frame>
          <h1 className="hero-in max-w-[20ch] text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[0.98]">Ventures</h1>
          <p className="hero-in mb-12 mt-6 max-w-[52ch] text-[1.06rem] leading-[1.65]" style={{ animationDelay: '120ms' }}>
            Every company the studio has worked with, including its joint ventures. Selected
            ventures have a case study.
          </p>
          <WorkIndex works={ALL_WORK} selected={[...SELECTED_SLUGS]} filters />
        </Frame>

        {/* Disciplines */}
        <Frame className="pt-28 sm:pt-40">
          <Rule className="mb-12" />
          <h2 data-reveal-item className="mb-10 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1]">
            Disciplines
          </h2>
          <dl className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {DISCIPLINES.map((s) => (
              <div key={s.title} data-reveal-item data-reveal-auto className="rounded-[7px] bg-panel p-6 sm:p-7">
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
