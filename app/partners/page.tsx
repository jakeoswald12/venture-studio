import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/ContactForm'
import { PartnerGrid } from '@/components/site/PartnerGrid'
import { Frame } from '@/components/site/Frame'
import { Rule } from '@/components/site/Section'
import { HIGH_SCHOOLS, NETWORK, UNIVERSITIES, VC_FIRMS } from '@/lib/data/partners'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Venture firms, the broader network, universities and high schools that work with West Ventures.',
}

function Section({
  title,
  first,
  children,
}: {
  title: string
  first?: boolean
  children: React.ReactNode
}) {
  return (
    <section className="pb-20 sm:pb-28">
      {!first && <Rule className="mb-10" />}
      <div className="mb-10">
        <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

export default function PartnersPage() {
  return (
    <main>
      <h1 className="sr-only">Partners</h1>

      <Frame className="pt-[calc(124px+env(safe-area-inset-top))] sm:pt-[150px]">
        <Section
          first
          title="Venture firms"
        >
          <PartnerGrid items={VC_FIRMS} />
        </Section>

        <Section
          title="Broader network"
        >
          <PartnerGrid items={NETWORK} />
        </Section>

        <Section
          title="Universities"
        >
          <PartnerGrid items={UNIVERSITIES} />
        </Section>

        <Section
          title="High schools"
        >
          <PartnerGrid items={HIGH_SCHOOLS} />
        </Section>

        <section id="partner-form" className="scroll-mt-28">
          <Rule className="mb-10" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
                Partnership inquiry
              </h2>
              <p data-reveal-item style={{ '--d': 1 } as React.CSSProperties} className="mt-4 max-w-[44ch] text-[1rem] leading-[1.65]">
                For venture firms, organizations, universities and high schools interested in
                partnering with the studio.
              </p>
            </div>
            <div data-reveal-item style={{ '--d': 2 } as React.CSSProperties}>
              <ContactForm variant="partner" />
            </div>
          </div>
        </section>
      </Frame>
    </main>
  )
}
