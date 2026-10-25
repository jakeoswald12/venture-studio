import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/ContactForm'
import { PartnerGrid } from '@/components/site/PartnerGrid'
import { Container, Label, Rule } from '@/components/site/Section'
import { HIGH_SCHOOLS, NETWORK, UNIVERSITIES, VC_FIRMS } from '@/lib/data/partners'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Venture firms, the broader network, universities and high schools that work with West Ventures.',
}

function Section({
  index,
  title,
  first,
  text,
  children,
}: {
  index: string
  title: string
  first?: boolean
  text: string
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
        <p data-reveal-item style={{ '--d': 1 } as React.CSSProperties} className="mt-4 max-w-[60ch] text-[1rem] leading-[1.65]">
          {text}
        </p>
      </div>
      {children}
    </section>
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
          text="Firms that bring portfolio companies to the studio, support its events, or invest alongside it."
        >
          <PartnerGrid items={VC_FIRMS} />
        </Section>

        <Section
          index="02"
          title="Broader network"
          text="Organizations the studio partners with on programs, events, distribution and recruiting, and others in the ecosystem it is connected to."
        >
          <PartnerGrid items={NETWORK} />
        </Section>

        <Section
          index="03"
          title="Universities"
          text="Austin Christian University, the studio's home campus, and private Christian universities the studio is pursuing as partner campuses."
        >
          <PartnerGrid items={UNIVERSITIES} />
        </Section>

        <Section
          index="04"
          title="High schools"
          text="Partner schools whose teachers, counselors and principals nominate Builder Scholars. Each school may nominate up to three students per academic year."
        >
          <PartnerGrid items={HIGH_SCHOOLS} />
        </Section>

        <section id="partner-form" className="scroll-mt-28">
          <Rule className="mb-10" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <Label className="mb-4">05</Label>
              <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
                Partnership inquiry
              </h2>
              <p data-reveal-item style={{ '--d': 1 } as React.CSSProperties} className="mt-4 max-w-[44ch] text-[1rem] leading-[1.65]">
                For venture firms, organizations, universities and high schools interested in
                partnering with the studio.
              </p>
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
