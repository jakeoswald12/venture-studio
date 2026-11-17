import type { Metadata } from 'next'
import Image from 'next/image'
import { ContactForm } from '@/components/site/ContactForm'
import { PageHero, SectionHead } from '@/components/modules/Blocks'
import { Lines } from '@/components/modules/Media'
import { ListScroller, ParallaxGrid } from '@/components/modules/Scroll'
import { WorkList, type WorkRow } from '@/components/modules/WorkList'
import { HIGH_SCHOOLS, NETWORK, UNIVERSITIES, VC_FIRMS, type PartnerEntry } from '@/lib/data/partners'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Venture firms, the broader network, universities and high schools that work with West Ventures.',
}

const host = (href?: string) => (href ? href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '')

const rows = (items: PartnerEntry[], kind: string): WorkRow[] =>
  items.map((p) => ({
    slug: p.name,
    name: p.name,
    description: p.note,
    meta: [kind, host(p.href)].filter(Boolean),
    tags: [],
    external: p.href,
    image: p.image,
  }))

function Strip({ items }: { items: PartnerEntry[] }) {
  const withImage = items.filter((p) => p.image)
  if (!withImage.length) return null
  return (
    <div className="section-sm">
      <ParallaxGrid>
        {withImage.map((p) => (
          <div key={p.name} className="tile">
            <Image src={p.image!} alt="" fill sizes="(min-width: 967px) 30vw, 60vw" style={{ objectPosition: p.objectPosition }} />
            <span>{p.name}</span>
          </div>
        ))}
      </ParallaxGrid>
    </div>
  )
}

export default function PartnersPage() {
  return (
    <main>
      <PageHero
        lines={[
          <>
            Partners <span className="em-rule" aria-hidden="true" /> venture firms,
          </>,
          'organizations and schools',
        ]}
      />

      <SectionHead title="Venture firms" />
      <WorkList rows={rows(VC_FIRMS, 'Venture firm')} compact />

      <Strip items={[...VC_FIRMS, ...NETWORK]} />

      <SectionHead title="Broader network" />
      <WorkList rows={rows(NETWORK, 'Organization')} compact />

      <div className="section">
        <ListScroller label="Universities">
          {UNIVERSITIES.map((u) => (
            <li key={u.name}>
              {u.href ? (
                <a href={u.href} target="_blank" rel="noopener noreferrer">
                  {u.name}
                </a>
              ) : (
                u.name
              )}
            </li>
          ))}
        </ListScroller>
      </div>

      <SectionHead title="High schools" />
      <Strip items={HIGH_SCHOOLS} />
      <div className="pad section-sm">
        <ul className="name-cols">
          {HIGH_SCHOOLS.map((h) => (
            <li key={h.name}>
              {h.name}
              {h.href && (
                <a href={h.href} target="_blank" rel="noopener noreferrer" aria-label={`${h.name} website`}>
                  ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <section id="partner-form" className="grid12 section m-gap" style={{ scrollMarginTop: 120 }}>
        <div className="d-1-5">
          <Lines as="h2" className="t-h2" lines={['Partnership inquiry']} />
          <p className="t-body fade" data-io style={{ margin: '20px 0 0', maxWidth: '36ch' }}>
            For venture firms, organizations, universities and high schools interested in partnering with the studio.
          </p>
        </div>
        <div className="d-7-6">
          <ContactForm variant="partner" />
        </div>
      </section>
    </main>
  )
}
