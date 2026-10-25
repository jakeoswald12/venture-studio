import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/home/Hero'
import { ContactForm } from '@/components/site/ContactForm'
import { Container, Label, Rule } from '@/components/site/Section'
import { PORTFOLIO_COMPANIES } from '@/lib/data/portfolio-directory'
import { THESIS_SUMMARY } from '@/lib/data/thesis'

const d = (n: number) => ({ '--d': n }) as React.CSSProperties

const STATS = [
  { value: String(PORTFOLIO_COMPANIES.length), label: 'Companies worked with' },
  { value: '~20', label: 'Projects per semester' },
  { value: '35', label: 'Builder Scholars, fall 2026' },
  { value: '2', label: 'Gloo AI Hackathon wins, 2025 and 2026' },
]

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
  const tiles = PORTFOLIO_COMPANIES.filter((c) => c.tile && !/\.(mp4|webm)$/i.test(c.tile))

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

          <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} data-reveal-item data-reveal-auto className="flex flex-col gap-3">
                <dd className="order-1 font-serif text-[clamp(3rem,6.5vw,5.6rem)] font-semibold leading-none text-ink tabular-nums">
                  {s.value}
                </dd>
                <dt className="order-2 max-w-[22ch] text-[0.92rem] leading-[1.45]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 02 Ventures */}
      <section id="ventures" className="scroll-mt-24 pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="mb-5">02 · Ventures</Label>
              <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
                Ventures
              </h2>
              <p data-reveal-item style={d(1)} className="mt-5 max-w-[50ch] text-[1.02rem] leading-[1.65]">
                {PORTFOLIO_COMPANIES.length} companies the studio has worked with, including its joint
                ventures.
              </p>
            </div>
            <Link href="/ventures" className="arrow-nudge link-line text-[0.95rem] text-ink">
              All ventures and services <span className="arrow">→</span>
            </Link>
          </div>
        </Container>
        <div
          className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
          data-reveal-item
        >
          <ul className="marquee-track flex w-max gap-3" style={{ '--marquee-duration': `${tiles.length * 5}s` } as React.CSSProperties}>
            {[...tiles, ...tiles].map((c, i) => (
              <li key={`${c.slug}-${i}`} aria-hidden={i >= tiles.length}>
                <Link
                  href={`/portfolio/${c.slug}`}
                  tabIndex={i >= tiles.length ? -1 : 0}
                  className="group relative block h-[clamp(200px,24vw,300px)] w-[clamp(200px,24vw,300px)] overflow-hidden rounded-[18px] bg-[#1b1a17]"
                >
                  <Image
                    src={c.tile!}
                    alt={i < tiles.length ? c.name : ''}
                    fill
                    sizes="300px"
                    className="object-cover"
                    style={{ objectPosition: `${c.tileFocus ?? 50}% center` }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-[0.95rem] font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 Thesis */}
      <section id="thesis" className="scroll-mt-24 pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="mb-5">03 · Thesis</Label>
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

      {/* 04 Contact */}
      <section id="contact" className="scroll-mt-24">
        <Container>
          <Rule className="mb-12" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <Label className="mb-5">04 · Contact</Label>
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
