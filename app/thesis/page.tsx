import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Assumptions, Hiring, Projections } from '@/components/plan/PlanDetail'
import { HoverColumns, PageHero, SectionHead, TitleAndText } from '@/components/modules/Blocks'
import { Mask } from '@/components/modules/Media'
import { Drawers } from '@/components/modules/Scroll'
import { Ticker } from '@/components/modules/Ticker'
import { EssayCard } from '@/components/thesis/Essay'
import { FIRST_YEAR, LAST_YEAR, PRICE_PER_TERM } from '@/lib/data/plan'
import {
  FLYWHEEL,
  MODEL,
  OPPORTUNITIES,
  PHILOSOPHY,
  PROJECTS,
  REQUESTS,
  SECTIONS,
  VISIBLE_SECTIONS,
  THESIS_SUMMARY,
} from '@/lib/data/thesis'
import { ESSAYS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Thesis',
  description: THESIS_SUMMARY,
}

/** What the studio is, in three parts. This sat on the old home page. */
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

/** One numbered thesis section: number and title on the left, text on the
 *  right. Hidden sections render nothing. */
function Section({ id, children }: { id: (typeof SECTIONS)[number]['id']; children: React.ReactNode }) {
  const i = VISIBLE_SECTIONS.findIndex((s) => s.id === id)
  if (i < 0) return null
  return (
    <TitleAndText id={id} label={String(i + 1).padStart(2, '0')} title={VISIBLE_SECTIONS[i].title}>
      {children}
    </TitleAndText>
  )
}

/** The first paragraph of a section is set large; the rest at lead size. */
function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t, i) => (
        <p
          key={t}
          className={`${i === 0 ? 't-intro' : 't-lead'} fade`}
          data-io
          style={{ margin: i === 0 ? 0 : '24px 0 0', '--d': i } as React.CSSProperties}
        >
          {t}
        </p>
      ))}
    </>
  )
}

const essay = (href: string) => {
  const e = ESSAYS.find((x) => x.href === href)!
  return (
    <EssayCard
      href={e.href}
      title={e.title}
      text={e.text}
      image={<Image src={e.image} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} />}
    />
  )
}

export default function ThesisPage() {
  return (
    <main>
      <PageHero lines={['Thesis']} note={THESIS_SUMMARY} />

      <TitleAndText label="Overview">
        <p className="t-intro fade" data-io style={{ margin: 0 }}>
          West Ventures is a venture studio affiliated with Austin Christian University. It works with companies through
          student teams, and builds companies of its own.
        </p>
      </TitleAndText>
      <div className="section-sm">
        <HoverColumns items={OVERVIEW.map((o) => ({ title: o.title, body: <p style={{ margin: 0 }}>{o.text}</p> }))} />
      </div>

      <Section id="philosophy">
        <Paragraphs items={PHILOSOPHY} />
        {essay('/thesis/course-of-empire')}
      </Section>

      <Section id="model">
        <Paragraphs items={MODEL.intro} />
        {essay('/thesis/kings-and-cupbearers')}
      </Section>

      <Section id="opportunities">
        <Paragraphs items={[OPPORTUNITIES.ideas, OPPORTUNITIES.fossil, OPPORTUNITIES.so]} />
        {essay('/thesis/sculptures-vs-fossils')}
      </Section>

      <Section id="projects">
        <Paragraphs items={PROJECTS} />
      </Section>

      <Section id="flywheel">
        <Paragraphs items={FLYWHEEL.text} />
        {essay('/thesis/critical-mass')}
      </Section>
      <div className="section-sm">
        <Ticker items={['Elite students', 'Excellent work', 'Proven operators', 'Great opportunities']} seconds={45} />
      </div>

      <Section id="projections">
        <p className="t-lead" style={{ margin: 0 }}>
          Ten years, {FIRST_YEAR}–{LAST_YEAR}. Revenue comes from two places: students who take part, at $
          {PRICE_PER_TERM.toLocaleString('en-US')} a term, and the share of profit paid by companies the studio owns.
          Sales of equity are not counted. Universities, founders and investors pay nothing. Overhead is shown below
          zero. Select a year on either chart to see its numbers.
        </p>
        <div style={{ marginTop: 40 }}>
          <Projections />
          <h3 className="t-h4" style={{ margin: '40px 0 16px' }}>
            Hiring
          </h3>
          <Hiring />
          <h3 className="t-h4" style={{ margin: '40px 0 16px' }}>
            Assumptions
          </h3>
          <Assumptions />
        </div>
      </Section>

      <Section id="requests">
        <Drawers
          items={REQUESTS.map((r) => ({
            title: r.label,
            body: <p>{r.text}</p>,
          }))}
        />
      </Section>

      <SectionHead title="Essays" />
      <div className="threeup">
        {ESSAYS.map((e, i) => (
          <Link key={e.href} href={e.href} className="essay-card" data-cursor="Read">
            <Mask d={i}>
              <Image src={e.image} alt="" fill sizes="(min-width: 967px) 25vw, 100vw" />
            </Mask>
            <h3 className="t-h4">{e.title}</h3>
            <p className="t-body" style={{ margin: 0 }}>
              {e.text}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
