import Link from 'next/link'
import { Hero } from '@/components/home/Hero'
import { PreviewRow, SeeAll, type PreviewItem } from '@/components/home/PreviewRow'
import { ContactForm } from '@/components/site/ContactForm'
import { Container, Label, Rule } from '@/components/site/Section'
import { findCompany } from '@/lib/data/portfolio-directory'
import { NETWORK, VC_FIRMS } from '@/lib/data/partners'
import { THESIS_SUMMARY } from '@/lib/data/thesis'

const d = (n: number) => ({ '--d': n }) as React.CSSProperties

/** The six ventures and partners featured on the homepage, in order. */
const FEATURED_VENTURES = ['youversion', 'lifetime-fitness', 'burlebo', 'heavytech', 'waterside-by-ulteum', 'the-care-app']
const FEATURED_PARTNERS = [
  "Sovereign's Capital",
  'Capital Factory',
  'Praxis',
  'Faith Driven Entrepreneur',
  'Impact Foundation',
  'Eagle Venture Fund',
]

const ventureItems: PreviewItem[] = FEATURED_VENTURES.map((slug) => {
  const c = findCompany(slug)!
  return { name: c.name, href: `/portfolio/${c.slug}`, image: c.tile, objectPosition: `${c.tileFocus ?? 50}% center` }
})

const partnerItems: PreviewItem[] = FEATURED_PARTNERS.map((name) => {
  const p = [...VC_FIRMS, ...NETWORK].find((x) => x.name === name)!
  return { name: p.name, href: p.href, image: p.image, logo: p.logo, objectPosition: p.objectPosition }
})

const OVERVIEW = [
  {
    title: 'Purpose',
    text: 'Find young people with unusual ability, train them on real company work, and build companies with them. The goal is 1,000 builders who go on to found or lead companies in their industries.',
  },
  {
    title: 'Structure',
    text: 'A for-profit company, separately owned and permanently affiliated with Austin Christian University. A share of profits goes to ACU’s endowment.',
  },
  {
    title: 'Work',
    text: 'Founders bring projects to student teams, who work on them for a semester for course credit. The studio also co-founds companies with operators and holds equity in them. Companies and investors do not pay.',
  },
]

const THESIS_POINTS = [
  {
    id: 'premise',
    title: 'Premise',
    text: 'Ability is given. The conditions around it — teachers, funding and real work at the right age — can be arranged on purpose.',
  },
  {
    id: 'goal',
    title: 'Goal: 1,000 builders',
    text: 'Find and train 1,000 young people who go on to found or lead companies. Most are between 12 and 18 today. Measured over 30 years.',
  },
  {
    id: 'operating-model',
    title: 'Operating model',
    text: 'Scout, form, apprentice, build. Schools nominate students; students develop skill and character; teams of six work on real projects; many start companies later.',
  },
]

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* 01 Overview */}
      <section id="overview" className="scroll-mt-24 py-24 sm:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <Label className="mb-5">01 · Overview</Label>
              <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
                Overview
              </h2>
              <p data-reveal-item style={d(1)} className="mt-6 max-w-[46ch] text-[1.06rem] leading-[1.7]">
                West Ventures is a venture studio affiliated with Austin Christian University. It
                works with companies through student teams, and builds companies of its own.
              </p>
            </div>
            <ol className="grid gap-3">
              {OVERVIEW.map((m) => (
                <li
                  key={m.title}
                  data-reveal-item
                  data-reveal-auto
                  className="grid gap-2 rounded-[22px] bg-panel p-6 sm:grid-cols-[150px_1fr] sm:gap-6 sm:p-7"
                >
                  <span className="font-serif text-[1.45rem] font-semibold leading-tight text-ink">{m.title}</span>
                  <span className="text-[1rem] leading-[1.62] text-ink/80">{m.text}</span>
                </li>
              ))}
            </ol>
          </div>

        </Container>
      </section>

      {/* 02 Ventures */}
      <section id="ventures" className="scroll-mt-24 overflow-x-clip pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <Label className="mb-5">02 · Ventures</Label>
          <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
            Ventures
          </h2>
          <div className="mb-8 mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <p data-reveal-item style={d(1)} className="max-w-[50ch] text-[1.02rem] leading-[1.65]">
              Companies the studio has worked with, including its joint ventures.
            </p>
            <SeeAll href="/ventures" label="See all ventures" />
          </div>
          <PreviewRow items={ventureItems} />
        </Container>
      </section>

      {/* 03 Partners */}
      <section id="partners" className="scroll-mt-24 overflow-x-clip pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <Label className="mb-5">03 · Partners</Label>
          <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
            Partners
          </h2>
          <div className="mb-8 mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <p data-reveal-item style={d(1)} className="max-w-[50ch] text-[1.02rem] leading-[1.65]">
              Venture firms, organizations and schools in the studio’s network.
            </p>
            <SeeAll href="/partners" label="See all partners" />
          </div>
          <PreviewRow items={partnerItems} />
        </Container>
      </section>

      {/* 04 Thesis */}
      <section id="thesis" className="scroll-mt-24 pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="mb-5">04 · Thesis</Label>
              <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
                Thesis
              </h2>
              <p data-reveal-item style={d(1)} className="mt-5 max-w-[58ch] text-[1.02rem] leading-[1.65]">
                {THESIS_SUMMARY}
              </p>
            </div>
            <Link href="/thesis" className="arrow-nudge link-line text-[0.95rem] text-ink">
              Full thesis <span className="arrow">→</span>
            </Link>
          </div>
          <ul className="grid gap-3 md:grid-cols-3">
            {THESIS_POINTS.map((t) => (
              <li key={t.id} data-reveal-item data-reveal-auto>
                <Link
                  href={`/thesis#${t.id}`}
                  className="group flex h-full min-h-[260px] flex-col justify-between gap-8 rounded-[22px] bg-panel p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow)]"
                >
                  <h3 className="text-[1.7rem] leading-tight">{t.title}</h3>
                  <div className="flex items-end justify-between gap-5">
                    <p className="text-[0.97rem] leading-[1.6]">{t.text}</p>
                    <span aria-hidden="true" className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 05 Contact */}
      <section id="contact" className="scroll-mt-24">
        <Container>
          <Rule className="mb-12" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <Label className="mb-5">05 · Contact</Label>
              <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
                Contact
              </h2>
              <p data-reveal-item style={d(1)} className="mt-6 max-w-[44ch] text-[1.02rem] leading-[1.65]">
                For prospective partners, advisors and Student Fellows, and for founders with a
                project.
              </p>
            </div>
            <div data-reveal-item style={d(2)}>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
