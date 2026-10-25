import type { Metadata } from 'next'
import Image from 'next/image'
import { ContactForm } from '@/components/site/ContactForm'
import { Container, Label, Rule } from '@/components/site/Section'
import {
  HIGH_SCHOOLS,
  NETWORK,
  ORGANIZATIONS,
  UNIVERSITIES,
  VC_FIRMS,
  type PartnerEntry,
} from '@/lib/data/partners'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Venture firms, organizations, universities and high schools that work with West Ventures, and the wider network.',
}

function Section({
  index,
  title,
  first,
  children,
}: {
  index: string
  title: string
  first?: boolean
  children: React.ReactNode
}) {
  return (
    <section className="pb-20 sm:pb-28">
      {!first && <Rule className="mb-10" />}
      <div className="mb-10">
        <Label className="mb-4">{index}</Label>
        <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

/** Square tile: photo, logo on a light plate, or the name on a plain panel. */
function PartnerTile({ p }: { p: PartnerEntry }) {
  const inner = (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-panel">
        {p.image ? (
          <Image
            src={p.image}
            alt=""
            fill
            sizes="(min-width:1024px) 18vw, (min-width:640px) 25vw, 50vw"
            className="object-cover"
            style={{ objectPosition: p.objectPosition ?? 'center' }}
          />
        ) : p.logo ? (
          <span className="absolute inset-0 bg-[#fbfaf6]">
            <span className="absolute inset-[22%]">
              <Image src={p.logo} alt="" fill sizes="20vw" className="object-contain" />
            </span>
          </span>
        ) : (
          <span className="absolute inset-0 grid place-items-center px-4 text-center font-serif text-[clamp(1.1rem,1.8vw,1.45rem)] font-semibold leading-tight text-ink/70">
            {p.name}
          </span>
        )}
      </div>
      <p className="mt-3 text-[0.95rem] leading-snug text-ink">{p.name}</p>
    </>
  )
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block transition-opacity duration-300 hover:opacity-80">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  )
}

function TileGrid({ items }: { items: PartnerEntry[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-5 lg:grid-cols-5">
      {items.map((p) => (
        <li key={p.name} data-reveal-item data-reveal-auto>
          <PartnerTile p={p} />
        </li>
      ))}
    </ul>
  )
}

export default function PartnersPage() {
  return (
    <main>
      <h1 className="sr-only">Partners</h1>

      <Container className="pt-[calc(124px+env(safe-area-inset-top))] sm:pt-[150px]">
        <Section
          first
          index="01"
          title="Venture firms"
        >
          <TileGrid items={VC_FIRMS} />
        </Section>

        <Section
          index="02"
          title="Organizations"
        >
          <TileGrid items={ORGANIZATIONS} />
        </Section>

        <Section
          index="03"
          title="Universities"
        >
          <ul className="grid gap-3 md:grid-cols-2">
            {UNIVERSITIES.map((u) => (
              <li key={u.name} data-reveal-item data-reveal-auto>
                <a
                  href={u.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-nudge flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-[22px] bg-panel p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow)] sm:p-9"
                >
                  <span className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-tight text-ink">
                    {u.name}
                  </span>
                  <span className="flex items-end justify-between gap-6">
                    <span className="max-w-[46ch] text-[0.98rem] leading-[1.6]">{u.note}</span>
                    <span aria-hidden="true" className="arrow text-ink">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          index="04"
          title="High schools"
        >
          <TileGrid items={HIGH_SCHOOLS} />
        </Section>

        <Section
          index="05"
          title="Network"
        >
          <ul className="columns-1 gap-x-8 sm:columns-2 lg:columns-4">
            {NETWORK.map((n) => (
              <li
                key={n.name}
                data-reveal-item
                data-reveal-auto
                className="break-inside-avoid border-b border-line"
              >
                <a
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-nudge flex min-h-[56px] items-center justify-between gap-3 py-2.5 text-[1rem] text-ink"
                >
                  <span>{n.name}</span>
                  <span aria-hidden="true" className="arrow text-faint">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <section id="partner-form" className="scroll-mt-28">
          <Rule className="mb-10" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <Label className="mb-4">06</Label>
              <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
                Partnership inquiry
              </h2>
            </div>
            <div data-reveal-item style={{ '--d': 2 } as React.CSSProperties}>
              <ContactForm persona="Partner" />
            </div>
          </div>
        </section>
      </Container>
    </main>
  )
}
