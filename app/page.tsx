import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/home/Hero'
import { Container, Label, Rule } from '@/components/site/Section'
import { VentureMark } from '@/components/site/VentureMark'
import { CONTACT_EMAIL } from '@/components/site/nav'
import { PORTFOLIO_COMPANIES } from '@/lib/data/portfolio-directory'
import { VENTURES } from '@/lib/data/ventures'

const d = (n: number) => ({ '--d': n }) as React.CSSProperties

const STATS = [
  { value: String(PORTFOLIO_COMPANIES.length), label: 'Companies that have had a student team' },
  { value: '~20', label: 'Projects per semester at ACU' },
  { value: '35', label: 'Builder Scholars, fall 2026' },
  { value: '2', label: 'Gloo AI Hackathon wins, 2025 and 2026' },
]

const MODEL = [
  {
    title: 'Projects',
    text: 'Founders bring real projects. A team of six students works on each one for a full semester, for course credit. Founders pay nothing.',
  },
  {
    title: 'Students',
    text: 'Austin Christian University students and high school Builder Scholars, recruited from Christian schools across the country.',
  },
  {
    title: 'Joint ventures',
    text: 'The studio co-founds about six companies a year with operators who have found an opportunity, and holds equity in them.',
  },
]

export default function HomePage() {
  const tiles = PORTFOLIO_COMPANIES.filter((c) => c.tile && !/\.(mp4|webm)$/i.test(c.tile))

  return (
    <main>
      <Hero />

      {/* What it is */}
      <section className="py-24 sm:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <Label className="mb-5">01 · Overview</Label>
              <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
                What West Ventures is
              </h2>
              <p data-reveal-item style={d(1)} className="mt-6 max-w-[46ch] text-[1.06rem] leading-[1.7]">
                A for-profit venture studio, separately owned and permanently affiliated with Austin
                Christian University. It has two activities: student project teams and joint ventures.
              </p>
              <Link
                data-reveal-item
                style={d(2)}
                href="/thesis"
                className="arrow-nudge link-line mt-7 inline-block text-[0.95rem] text-ink"
              >
                Thesis <span className="arrow">→</span>
              </Link>
            </div>
            <ol className="grid gap-3">
              {MODEL.map((m, i) => (
                <li
                  key={m.title}
                  data-reveal-item
                  style={d(i + 1)}
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

      {/* Numbers */}
      <section className="pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <Label className="mb-8">02 · Current numbers</Label>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} data-reveal-item style={d(i)} className="flex flex-col gap-3">
                <dd className="order-1 font-serif text-[clamp(3rem,6.5vw,5.6rem)] font-semibold leading-none text-ink tabular-nums">
                  {s.value}
                </dd>
                <dt className="order-2 max-w-[22ch] text-[0.92rem] leading-[1.45]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Joint ventures */}
      <section className="pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="mb-5">03 · Joint ventures</Label>
              <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
                Joint ventures
              </h2>
            </div>
            <Link href="/ventures" className="arrow-nudge link-line text-[0.95rem] text-ink">
              All details <span className="arrow">→</span>
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VENTURES.map((v) => (
              <li key={v.slug} data-reveal-item data-reveal-auto>
                <Link
                  href={`/ventures#${v.slug}`}
                  className="group flex h-full min-h-[230px] flex-col justify-between gap-8 rounded-[22px] border border-line bg-paper p-6 transition-[background-color,border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-transparent hover:bg-panel hover:shadow-[var(--shadow)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <VentureMark mark={v.mark} size="sm" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">{v.status}</span>
                  </div>
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bronze">{v.descriptor}</p>
                    <p className="mt-2 line-clamp-3 text-[0.95rem] leading-[1.55]">{v.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
            <li data-reveal-item data-reveal-auto className="hidden lg:block">
              <div className="flex h-full min-h-[230px] flex-col justify-end rounded-[22px] border border-dashed border-line p-7">
                <p className="text-[0.95rem] leading-[1.55]">
                  About six new joint ventures a year. Operators with an opportunity can contact the studio.
                </p>
              </div>
            </li>
          </ul>
        </Container>
      </section>

      {/* Portfolio */}
      <section className="pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="mb-5">04 · Portfolio</Label>
              <h2 data-reveal-item className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1]">
                Portfolio
              </h2>
              <p data-reveal-item style={d(1)} className="mt-5 max-w-[50ch] text-[1.02rem] leading-[1.65]">
                Companies that have had a student team from the studio.
              </p>
            </div>
            <Link href="/portfolio" className="arrow-nudge link-line text-[0.95rem] text-ink">
              Full portfolio <span className="arrow">→</span>
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
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
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

      {/* Documents */}
      <section className="pb-24 sm:pb-36">
        <Container>
          <Rule className="mb-12" />
          <Label className="mb-8">05 · Documents</Label>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { href: '/thesis', title: 'Thesis', text: 'Why the studio exists, the evidence behind it, the operating model and the terms for founders and investors.' },
              { href: '/master-plan', title: 'Master plan', text: 'Goal, model, target campuses, map, timeline, projections, revenue model and risks.' },
            ].map((doc, i) => (
              <Link
                key={doc.href}
                href={doc.href}
                data-reveal-item
                style={d(i)}
                className="group flex min-h-[260px] flex-col justify-between rounded-[22px] bg-panel p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow)] sm:p-9"
              >
                <h3 className="text-[clamp(2rem,3.6vw,3rem)] leading-none">{doc.title}</h3>
                <div className="flex items-end justify-between gap-6">
                  <p className="max-w-[40ch] text-[0.98rem] leading-[1.6]">{doc.text}</p>
                  <span aria-hidden="true" className="grid h-11 w-11 flex-none place-items-center rounded-full border border-line text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section>
        <Container>
          <div data-reveal-item className="grid gap-8 rounded-[28px] bg-ink p-8 text-paper sm:p-14 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/50">06 · Contact</p>
              <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] text-paper">Contact</h2>
              <p className="mt-5 max-w-[52ch] text-[1.02rem] leading-[1.65] text-paper/70">
                Founders and investors with a project, universities interested in hosting a Builders
                Guild, and teachers nominating a student.
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="arrow-nudge inline-flex w-fit items-center gap-3 rounded-full bg-paper px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {CONTACT_EMAIL} <span className="arrow">→</span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}
