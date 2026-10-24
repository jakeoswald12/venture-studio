import type { Metadata } from 'next'
import { Container, Label, PageIntro, Rule } from '@/components/site/Section'
import { VentureMark } from '@/components/site/VentureMark'
import { VENTURES } from '@/lib/data/ventures'

export const metadata: Metadata = {
  title: 'Ventures',
  description: 'Joint ventures West Ventures co-founded and holds equity in.',
}

export default function VenturesPage() {
  return (
    <main>
      <PageIntro label="Ventures" title="Joint ventures">
        <p>
          Companies West Ventures co-founded with an operator and holds equity in. The studio provides
          the student team; the operator provides the opportunity and the industry knowledge.
        </p>
      </PageIntro>

      <Container>
        {VENTURES.map((v, i) => (
          <article key={v.slug} id={v.slug} className="scroll-mt-28">
            <Rule />
            <div className="grid gap-10 py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:py-20">
              <div className="flex flex-col items-start gap-6">
                <div
                  data-reveal-item
                  className="flex w-full items-center justify-between gap-4"
                  style={{ '--d': 0 } as React.CSSProperties}
                >
                  <Label>
                    {String(i + 1).padStart(2, '0')} / {String(VENTURES.length).padStart(2, '0')}
                  </Label>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-grey">
                    {v.status}
                  </span>
                </div>
                <div data-reveal-item style={{ '--d': 1 } as React.CSSProperties}>
                  <h2 className="sr-only">{v.name}</h2>
                  <VentureMark mark={v.mark} />
                </div>
                <p
                  data-reveal-item
                  style={{ '--d': 2 } as React.CSSProperties}
                  className="font-mono text-[0.74rem] uppercase tracking-[0.14em] text-bronze"
                >
                  {v.descriptor}
                </p>
                <p
                  data-reveal-item
                  style={{ '--d': 3 } as React.CSSProperties}
                  className="max-w-[48ch] text-[1.05rem] leading-[1.65]"
                >
                  {v.summary}
                </p>
                {v.url && (
                  <a
                    data-reveal-item
                    style={{ '--d': 4 } as React.CSSProperties}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-nudge link-line text-[0.95rem] font-normal text-ink"
                  >
                    {v.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} <span className="arrow">→</span>
                  </a>
                )}
              </div>

              <dl className="grid content-start gap-3">
                {v.facts.map((f, k) => (
                  <div
                    key={f.label}
                    data-reveal-item
                    style={{ '--d': k + 2 } as React.CSSProperties}
                    className="rounded-[22px] bg-panel px-6 py-5 sm:px-7 sm:py-6"
                  >
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
                      {f.label}
                    </dt>
                    <dd className="mt-2 text-[1rem] leading-[1.6] text-ink/80">{f.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
        <Rule />
        <p className="mt-8 max-w-[70ch] text-[0.8rem] leading-[1.6] text-faint">
          blkbox.io is a private fund. Nothing on this site is an offer to sell or a solicitation of an
          offer to buy any security or interest in any fund.
        </p>
      </Container>
    </main>
  )
}
