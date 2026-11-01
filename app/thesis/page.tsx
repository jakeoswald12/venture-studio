import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Flywheel } from '@/components/plan/Flywheel'
import { Assumptions, Hiring, Projections } from '@/components/plan/PlanDetail'
import { Frame } from '@/components/site/Frame'
import { Label, Rule } from '@/components/site/Section'
import { ThesisIndex } from '@/components/site/ThesisIndex'
import { EssayCard } from '@/components/thesis/Essay'
import { ChainReaction, CupAndCrown, Dawn, Matchmaking, NextIdeas, NobelTree, SculptureFossil } from '@/components/thesis/Illustrations'
import { FIRST_YEAR, LAST_YEAR, PRICE_PER_TERM } from '@/lib/data/plan'
import {
  CARNEGIE,
  COMPARABLES,
  CONTEXT,
  EXAMPLE,
  FAITH,
  FLYWHEEL,
  GOAL,
  MODEL,
  OPPORTUNITIES,
  PROJECT_STEPS,
  PROJECT_TERMS,
  REQUESTS,
  RESEARCH,
  ROLES,
  SECTIONS,
  SOURCES,
  THESIS_SUMMARY,
  TRADITION,
} from '@/lib/data/thesis'

export const metadata: Metadata = {
  title: 'Thesis',
  description: THESIS_SUMMARY,
}

const d = (n: number) => ({ '--d': n }) as React.CSSProperties

/* ─── Building blocks ─────────────────────────────────────────────────────── */

function Section({ id, children }: { id: (typeof SECTIONS)[number]['id']; children: React.ReactNode }) {
  const i = SECTIONS.findIndex((s) => s.id === id)
  return (
    <section id={id} className="scroll-mt-28">
      {i > 0 && <Rule />}
      <div className={`flex flex-col gap-7 ${i === 0 ? 'pb-14 pt-1 sm:pb-20' : 'py-14 sm:py-20'}`}>
        <Label>
          <span data-reveal-item className="inline-block">
            {String(i + 1).padStart(2, '0')}
          </span>
        </Label>
        <h2 data-reveal-item style={d(1)} className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.04]">
          {SECTIONS[i].title}
        </h2>
        {children}
      </div>
    </section>
  )
}

function P({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p data-reveal-item className={`max-w-[64ch] text-[1.06rem] leading-[1.72] ${className}`}>
      {children}
    </p>
  )
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <h3 data-reveal-item className="mt-4 text-[1.45rem] leading-tight">
      {children}
    </h3>
  )
}

function Figure({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure data-reveal-item className="my-2 max-w-[860px]">
      <div className="overflow-x-auto">{children}</div>
      {caption && <figcaption className="mt-3 max-w-[64ch] text-[0.88rem] leading-[1.55] text-grey">{caption}</figcaption>}
    </figure>
  )
}

function Table({ head, rows }: { head: string[]; rows: { cells: string[]; href?: string }[] }) {
  return (
    <>
      {/* Phones: one card per row. */}
      <div className="grid gap-3 sm:hidden">
        {rows.map((row) => (
          <div key={row.cells[0]} data-reveal-item className="rounded-[18px] border border-line p-5">
            <p className="font-serif text-[1.2rem] font-semibold text-ink">
              {row.href ? (
                <a href={row.href} target="_blank" rel="noopener noreferrer" className="link-line">
                  {row.cells[0]}
                </a>
              ) : (
                row.cells[0]
              )}
            </p>
            {row.cells.slice(1).map((c, i) => (
              <div key={i} className="mt-3">
                {head[i + 1] && <p className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-faint">{head[i + 1]}</p>}
                <p className="mt-1 text-[0.95rem] leading-[1.55] text-ink/75">{c}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div data-reveal-item className="hidden overflow-x-auto rounded-[18px] border border-line sm:block">
        <table className="w-full min-w-[520px] border-collapse text-left text-[0.95rem]">
          <thead>
            <tr className="border-b border-line bg-panel">
              {head.map((h, i) => (
                <th key={i} className="px-5 py-3.5 font-mono text-[0.68rem] font-normal uppercase tracking-[0.14em] text-faint">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.cells[0]} className="border-b border-line last:border-b-0">
                {row.cells.map((c, i) => (
                  <td key={i} className={`px-5 py-4 align-top leading-[1.55] ${i === 0 ? 'whitespace-nowrap text-ink' : 'text-ink/75'}`}>
                    {i === 0 && row.href ? (
                      <a href={row.href} target="_blank" rel="noopener noreferrer" className="link-line">
                        {c}
                      </a>
                    ) : (
                      c
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

/** Numbered steps on a gold line. */
function Steps({ items }: { items: { label: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      <span aria-hidden="true" className="absolute left-[11px] top-3 hidden h-px bg-[var(--g3)] lg:block lg:left-3 lg:right-3" />
      {items.map((s, i) => (
        <li key={s.label} data-reveal-item data-reveal-auto className="relative">
          <span className="relative z-[1] grid h-6 w-6 place-items-center rounded-full bg-[var(--g5)] font-mono text-[0.62rem] text-paper">
            {i + 1}
          </span>
          <p className="mt-4 font-serif text-[1.2rem] font-semibold leading-tight text-ink">{s.label}</p>
          <p className="mt-2 text-[0.96rem] leading-[1.6]">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ThesisPage() {
  return (
    <main>
      <h1 className="sr-only">Thesis</h1>

      <Frame className="pt-[calc(108px+env(safe-area-inset-top))] sm:pt-[132px]">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside>
            <ThesisIndex sections={SECTIONS.map(({ id, title }) => ({ id, title }))} />
          </aside>

          <div className="flex min-w-0 flex-col">
            <Section id="context">
              <Figure>
                <Dawn />
              </Figure>
              {CONTEXT.map((t) => (
                <P key={t}>{t}</P>
              ))}
              <Link
                href="/thesis/course-of-empire"
                data-reveal-item
                className="group mt-2 grid max-w-[760px] overflow-hidden rounded-[18px] border border-line transition-colors duration-500 hover:border-[var(--g4)] sm:grid-cols-[240px_minmax(0,1fr)]"
              >
                <div className="relative aspect-[3/2] sm:aspect-auto">
                  <Image src="/thesis/course-of-empire/3-consummation.jpg" alt="" fill sizes="(min-width:640px) 240px, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center gap-2 p-6">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--g5)]">Essay</p>
                  <p className="font-serif text-[1.45rem] font-semibold leading-tight text-ink">The Course of Empire</p>
                  <p className="text-[0.95rem] leading-[1.55]">
                    Thomas Cole’s five paintings, the poems behind them, and why the next generation is the answer.
                  </p>
                  <span className="arrow-nudge mt-1 text-[0.9rem] text-ink">
                    Read the essay <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            </Section>

            <Section id="goal">
              <P>{GOAL.text}</P>
              <dl className="grid gap-3 sm:grid-cols-3">
                {GOAL.stats.map((s) => (
                  <div key={s.label} data-reveal-item data-reveal-auto className="flex flex-col gap-2 rounded-[18px] border border-line p-6">
                    <dd className="order-1 font-serif text-[clamp(2.2rem,3.6vw,3rem)] font-semibold leading-none text-ink tabular-nums">
                      {s.value}
                    </dd>
                    <dt className="order-2 text-[0.88rem] leading-[1.45]">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <P>{GOAL.after}</P>
            </Section>

            <Section id="model">
              {MODEL.intro.map((t) => (
                <P key={t}>{t}</P>
              ))}
              <Figure caption="Thousands of capable students, hundreds of proven operators. The studio matches them on real projects.">
                <Matchmaking />
              </Figure>
              <ul className="flex flex-col">
                {MODEL.facts.map((item, i) => (
                  <li
                    key={item}
                    data-reveal-item
                    style={d(i)}
                    className="flex gap-5 border-b border-line py-4 text-[1.02rem] leading-[1.6] text-ink/85 first:border-t"
                  >
                    <span className="mt-[0.6em] h-1.5 w-1.5 flex-none rounded-full bg-[var(--g5)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <EssayCard
                href="/thesis/kings-and-cupbearers"
                title="Kings & Cupbearers"
                text="Great builders stand on the shoulders of earlier ones. On apprenticeship, earned trust, and why a king’s presence predicts what a young person will build."
                image={<div className="absolute inset-0 grid place-items-center p-4"><CupAndCrown /></div>}
              />
            </Section>

            <Section id="evidence">
              <P>
                The pairing of a master and an apprentice has a record. Great builders and scientists often trained under
                earlier ones, at a young age, on real work.
              </P>
              <Sub>Carnegie’s line</Sub>
              <ol className="grid gap-6 sm:grid-cols-3">
                {CARNEGIE.map((c, i) => (
                  <li key={c.name} data-reveal-item data-reveal-auto className="relative">
                    <div className="flex items-center gap-3">
                      <span className="h-5 w-5 flex-none rounded-full bg-[var(--g5)]" />
                      {i < CARNEGIE.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-[var(--g3)] sm:block" />}
                    </div>
                    <p className="mt-4 font-serif text-[1.25rem] font-semibold leading-tight text-ink">{c.name}</p>
                    <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[var(--g5)]">{c.role}</p>
                    <p className="mt-2 text-[0.95rem] leading-[1.6]">{c.text}</p>
                  </li>
                ))}
              </ol>

              <Sub>Nobel laureates who trained Nobel laureates</Sub>
              <Figure caption="Seven of J. J. Thomson’s students won Nobel Prizes, and so did his son. Rutherford, one of those students, trained several more.">
                <NobelTree />
              </Figure>
              <div data-reveal-item className="flex flex-col gap-2 rounded-[18px] bg-[var(--g1)] p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
                <p className="font-serif text-[clamp(2.4rem,4vw,3.2rem)] font-semibold leading-none text-[var(--g6)] tabular-nums">48 of 92</p>
                <p className="max-w-[52ch] text-[0.98rem] leading-[1.6] text-ink/80">
                  American Nobel laureates in science through 1972 who had worked as students, postdocs or junior
                  collaborators under older laureates (Harriet Zuckerman, <em>Scientific Elite</em>, 1977).
                </p>
              </div>

              <Sub>Research</Sub>
              <div className="grid gap-3">
                {RESEARCH.map((item, i) => (
                  <div key={item.label} data-reveal-item style={d(i)} className="rounded-[18px] bg-panel p-6 sm:p-7">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bronze">{item.label}</p>
                    <p className="mt-2 max-w-[64ch] text-[1rem] leading-[1.65] text-ink/80">{item.text}</p>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="arrow-nudge link-line mt-3 inline-block text-[0.85rem] text-grey hover:text-ink">
                      {item.linkText} <span className="arrow">↗</span>
                    </a>
                  </div>
                ))}
              </div>
              <P>
                Conclusion: ability is widely distributed and visible early. Exposure, mentors and real work are not evenly
                distributed. The gap can be closed deliberately.
              </P>
            </Section>

            <Section id="opportunities">
              <P>{OPPORTUNITIES.ideas}</P>
              <Figure>
                <NextIdeas />
              </Figure>
              <P>{OPPORTUNITIES.fossil}</P>
              <Figure>
                <SculptureFossil />
              </Figure>
              <P>{OPPORTUNITIES.so}</P>
            </Section>

            <Section id="example">
              <P>How a free project becomes a company, from one of the studio’s current ventures.</P>
              <Steps items={EXAMPLE.steps} />
              <p data-reveal-item className="text-[0.9rem] text-grey">
                {EXAMPLE.status}
              </p>
            </Section>

            <Section id="flywheel">
              <div data-reveal-item className="mx-auto w-full max-w-[620px]">
                <Flywheel />
              </div>
              {FLYWHEEL.text.map((t) => (
                <P key={t}>{t}</P>
              ))}
              <div className="grid gap-3 md:grid-cols-2">
                {FLYWHEEL.stories.map((s) => (
                  <div key={s.label} data-reveal-item data-reveal-auto className="rounded-[18px] border border-[var(--g3)] p-6 sm:p-7">
                    <p className="font-serif text-[1.3rem] font-semibold leading-tight text-ink">{s.label}</p>
                    <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[var(--g5)]">{s.ref}</p>
                    <p className="mt-3 text-[0.97rem] leading-[1.62]">{s.text}</p>
                  </div>
                ))}
              </div>
              <EssayCard
                href="/thesis/critical-mass"
                title="Critical Mass"
                text="A network grows more valuable with every member. On Metcalfe’s law, density, and the point at which the flywheel turns on its own."
                image={<div className="absolute inset-0 grid place-items-center p-2"><ChainReaction /></div>}
              />
            </Section>

            <Section id="projects">
              <P>
                A project is one term of work by one team, for one founder, against a written scope. Terms run in fall,
                spring and summer.
              </P>
              <Table head={PROJECT_TERMS.head} rows={PROJECT_TERMS.rows} />

              <Sub>The team</Sub>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {ROLES.map((r, i) => (
                  <li
                    key={r.role}
                    data-reveal-item
                    data-reveal-auto
                    className={`flex flex-col rounded-[18px] p-5 ${i === 0 ? 'bg-[var(--g5)] text-paper' : i === 1 ? 'bg-[var(--g3)]' : 'bg-[var(--g1)]'}`}
                  >
                    <p className={`font-serif text-[1.15rem] font-semibold leading-tight ${i === 0 ? 'text-paper' : 'text-ink'}`}>{r.role}</p>
                    <p className={`mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] ${i === 0 ? 'text-paper/75' : 'text-[var(--g6)]'}`}>
                      {r.who} · {r.hours}
                    </p>
                    <p className={`mt-3 text-[0.9rem] leading-[1.55] ${i === 0 ? 'text-paper/90' : 'text-ink/80'}`}>{r.text}</p>
                  </li>
                ))}
              </ul>
              <p data-reveal-item className="text-[0.9rem] text-grey">
                An average team is five students: two from college and three from high school. Volunteer project leads each
                lead about one project.
              </p>

              <Sub>How a term runs</Sub>
              <Steps items={PROJECT_STEPS} />
            </Section>

            <Section id="projections">
              <P>
                Ten years, {FIRST_YEAR}–{LAST_YEAR}. Revenue comes from two places: students who take part, at $
                {PRICE_PER_TERM.toLocaleString('en-US')} a term, and the share of profit paid by companies the studio owns.
                Sales of equity are not counted. Universities, founders and investors pay nothing. Overhead is shown below
                zero. Select a year on either chart to see its numbers.
              </P>
              <Projections />
              <Sub>Hiring</Sub>
              <Hiring />
              <Sub>Assumptions</Sub>
              <Assumptions />
            </Section>

            <Section id="faith">
              {FAITH.map((t) => (
                <P key={t}>{t}</P>
              ))}
            </Section>

            <Section id="tradition">
              {TRADITION.map((t) => (
                <P key={t}>{t}</P>
              ))}
            </Section>

            <Section id="comparables">
              <Table head={COMPARABLES.head} rows={COMPARABLES.rows} />
              <P>{COMPARABLES.after}</P>
            </Section>

            <Section id="requests">
              <div className="grid gap-3 sm:grid-cols-2">
                {REQUESTS.map((r) => (
                  <div key={r.label} data-reveal-item data-reveal-auto className="rounded-[18px] bg-panel p-6 sm:p-7">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bronze">{r.label}</p>
                    <p className="mt-2 text-[1.02rem] leading-[1.6] text-ink/85">{r.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Rule />
            <div className="py-12">
              <Label className="mb-4">Sources</Label>
              <ul className="flex flex-col gap-2 text-[0.9rem]">
                {SOURCES.map((s) => (
                  <li key={s.href}>
                    {s.before}
                    <a className="link-line text-ink" href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.title}
                    </a>
                    {s.after}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Frame>
    </main>
  )
}
