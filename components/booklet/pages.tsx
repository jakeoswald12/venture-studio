/**
 * The booklet page library. Each page is one 680 × 880-unit sheet (see
 * app/booklet/booklet.css). Booklets pick pages from here in the order set in
 * lib/booklets/audiences.ts.
 *
 * Pages render the same in the viewer and in print; interactive pieces
 * (components/booklet/interactive.tsx) show their full, resting state when
 * printed.
 */

import { AUDIENCES, type Audience, type PageId, type Party } from '@/lib/booklets/audiences'
import { COMPANY_NAMES, FACTS, FAMILY_QUOTES, FOUNDER_QUOTES, WORK_TILES } from '@/lib/booklets/facts'
import { DISCIPLINES } from '@/lib/data/services'
import { HIGH_SCHOOLS, NETWORK, VC_FIRMS } from '@/lib/data/partners'
import { BOARD, LEADERSHIP } from '@/lib/data/team'
import { MODEL, OPPORTUNITIES, THESIS_SUMMARY } from '@/lib/data/thesis'
import { STORIES, type StorySlug } from '@/lib/booklets/stories'
import { Expectations, PriceEstimator, TermStrip } from './interactive'

export const EDITION = 'Edition 2026–27'
export const SITE = 'gowest.ventures'
export const EMAIL = 'partners@west.ventures'

export type Mode = 'view' | 'print'

export interface PageCtx {
  audience: Audience
  id: PageId
  /** 1-based page number. */
  number: number
  /** Section number among the content pages, or 0 for front and back matter. */
  section: number
  mode: Mode
  /** Page number of each page in this booklet, for the contents. */
  pageOf: Partial<Record<PageId, number>>
}

/** Section title for the running head and the contents. Front and back matter have none. */
export const SECTION_TITLES: Partial<Record<PageId, string>> = {
  studio: 'The studio',
  model: 'The model',
  opportunities: 'Opportunities',
  project: 'How a project works',
  team: 'The team',
  expectations: 'Expectations',
  disciplines: 'The work',
  'outcomes-founders': 'Outcomes for founders',
  'outcomes-students': 'Outcomes for students',
  stories: 'Student stories',
  'voices-founders': 'From founders',
  'voices-families': 'From families and teachers',
  pricing: 'Pricing',
  abroad: 'Study abroad',
  supervision: 'Supervision',
  'credit-high-schools': 'Credit',
  'credit-universities': 'Credit and partnership',
  'founder-terms': 'Terms',
  'joint-ventures': 'Joint ventures',
  network: 'The network',
  leadership: 'Leadership',
  faq: 'Questions',
  next: 'Next steps',
}

/* ─── Primitives ──────────────────────────────────────────────────────────── */

function Sheet({
  ctx,
  children,
  dark = false,
  full = false,
  chrome = true,
}: {
  ctx: PageCtx
  children: React.ReactNode
  dark?: boolean
  full?: boolean
  chrome?: boolean
}) {
  return (
    <article className={`bk-page${dark ? ' is-dark' : ''}`} data-page={ctx.number} aria-label={`Page ${ctx.number}`}>
      {chrome && (
        <div className="bk-head" aria-hidden="true">
          <span>West Ventures</span>
          <span>Info Booklet · {ctx.audience.label}</span>
        </div>
      )}
      <div className={`bk-inner${full ? ' is-full' : ''}`}>{children}</div>
      {chrome && (
        <div className="bk-folio" aria-hidden="true">
          {ctx.number}
        </div>
      )}
    </article>
  )
}

function Opener({ ctx, title, lede }: { ctx: PageCtx; title: React.ReactNode; lede?: React.ReactNode }) {
  return (
    <header>
      <p className="bk-kicker">
        {String(ctx.section).padStart(2, '0')} &nbsp;·&nbsp; {SECTION_TITLES[ctx.id]}
      </p>
      <h2 className="bk-title">{title}</h2>
      {lede && <p className="bk-lede">{lede}</p>}
    </header>
  )
}

function Img({ src, alt, h, pos, className = '' }: { src: string; alt: string; h: number; pos?: string; className?: string }) {
  return (
    <div className={`bk-img bk-flow-h ${className}`} style={{ height: `calc(${h} * var(--u))` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={pos ? { objectPosition: pos } : undefined} />
    </div>
  )
}

function Stat({ value, label, size }: { value: React.ReactNode; label: React.ReactNode; size?: 'm' }) {
  return (
    <div>
      <div className={`bk-stat-num${size === 'm' ? ' is-m' : ''}`}>{value}</div>
      <div className="bk-stat-label">{label}</div>
    </div>
  )
}

function Pending({ children }: { children: React.ReactNode }) {
  return <span className="bk-chip">{children}</span>
}

const n = (v: number) => v.toLocaleString('en-US')
const money = (v: number) => `$${n(v)}`

/* ─── Front matter ───────────────────────────────────────────────────────── */

function Cover({ ctx }: { ctx: PageCtx }) {
  const words = ctx.audience.title.replace(/^For /, '')
  return (
    <Sheet ctx={ctx} dark full chrome={false}>
      <div className="bk-img" style={{ position: 'absolute', inset: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/thesis/course-of-empire/westward-leutze.jpg" alt="" style={{ objectPosition: '50% 30%' }} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(21,20,18,.55) 0%, rgba(21,20,18,.05) 26%, rgba(21,20,18,.15) 46%, rgba(21,20,18,.86) 74%, #151412 100%)',
        }}
      />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100%', padding: 'calc(40 * var(--u)) calc(52 * var(--u)) calc(44 * var(--u))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', fontSize: 'calc(26 * var(--u))', color: '#f4efe6' }}
          >
            West
          </span>
          <span className="bk-label" style={{ color: 'rgba(244,239,230,.75)' }}>
            {EDITION}
          </span>
        </div>
        <div className="bk-push" style={{ minHeight: 'calc(330 * var(--u))' }} />
        <p className="bk-kicker">Info Booklet</p>
        <h1 className="bk-title is-xl" style={{ marginTop: 'calc(16 * var(--u))' }}>
          For <em>{words}</em>
        </h1>
        <p className="bk-lede" style={{ color: 'rgba(244,239,230,.78)', maxWidth: 'calc(440 * var(--u))' }}>
          {ctx.audience.coverLine}
        </p>
        <div className="bk-gap" />
        <hr className="bk-rule" style={{ background: 'rgba(244,239,230,.22)' }} />
        <div className="bk-label" style={{ marginTop: 'calc(12 * var(--u))', display: 'flex', justifyContent: 'space-between', gap: '1em', color: 'rgba(244,239,230,.62)' }}>
          <span>West Ventures · Affiliated with Austin Christian University</span>
          <span>{SITE}</span>
        </div>
        <p className="bk-label" style={{ marginTop: 'calc(10 * var(--u))', color: 'rgba(244,239,230,.4)', textTransform: 'none', letterSpacing: '.04em' }}>
          Cover: Emanuel Leutze, Westward the Course of Empire Takes Its Way, 1861 (study).
        </p>
      </div>
    </Sheet>
  )
}

function Letter({ ctx }: { ctx: PageCtx }) {
  const [first, ...rest] = ctx.audience.letter
  return (
    <Sheet ctx={ctx}>
      <p className="bk-kicker">A letter</p>
      <h2 className="bk-title">From the managing partners</h2>
      <div className="bk-gap-l" />
      <div style={{ maxWidth: 'calc(476 * var(--u))' }}>
        <p className="bk-p bk-dropcap">{first}</p>
        {rest.map((t) => (
          <p key={t} className="bk-p">
            {t}
          </p>
        ))}
      </div>
      <div className="bk-push" />
      <div className="bk-cols c2" style={{ maxWidth: 'calc(476 * var(--u))' }}>
        {LEADERSHIP.filter((p) => p.title === 'Managing Partner')
          .sort((a, b) => (a.name.startsWith('Jake') ? -1 : b.name.startsWith('Jake') ? 1 : 0))
          .map((p) => (
            <div key={p.name}>
              <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'calc(24 * var(--u))', color: 'var(--bk-ink)' }}>{p.name}</p>
              <p className="bk-label" style={{ marginTop: 'calc(6 * var(--u))' }}>
                Managing Partner
              </p>
            </div>
          ))}
      </div>
    </Sheet>
  )
}

function Contents({ ctx }: { ctx: PageCtx }) {
  const items = ctx.audience.pages.filter((id) => SECTION_TITLES[id])
  return (
    <Sheet ctx={ctx}>
      <p className="bk-kicker">{ctx.audience.title}</p>
      <h2 className="bk-title">Contents</h2>
      <div className="bk-gap" />
      <ol className="bk-steps" style={{ fontFamily: 'var(--font-serif)' }}>
        {items.map((id, i) => (
          <li key={id} style={{ gridTemplateColumns: 'calc(40 * var(--u)) 1fr auto', alignItems: 'baseline', padding: 'calc(5 * var(--u)) 0' }}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            {ctx.mode === 'view' ? (
              <a href={`#page-${ctx.pageOf[id]}`} data-goto={ctx.pageOf[id]} style={{ fontSize: 'calc(16 * var(--u))', color: 'var(--bk-ink)', textDecoration: 'none' }}>
                {SECTION_TITLES[id]}
              </a>
            ) : (
              <span style={{ fontSize: 'calc(16 * var(--u))', color: 'var(--bk-ink)' }}>{SECTION_TITLES[id]}</span>
            )}
            <span style={{ fontStyle: 'italic', color: 'var(--bk-grey)', fontSize: 'calc(13 * var(--u))' }}>{ctx.pageOf[id]}</span>
          </li>
        ))}
      </ol>
      <div className="bk-push" />
      <p className="bk-small" style={{ maxWidth: 'calc(400 * var(--u))', color: 'var(--bk-grey)' }}>
        This booklet is written for {ctx.audience.label.toLowerCase()}. Four companion booklets cover the program for{' '}
        {Object.values(AUDIENCES)
          .filter((a) => a.slug !== ctx.audience.slug)
          .map((a) => a.label.toLowerCase())
          .join(', ')
          .replace(/, ([^,]*)$/, ' and $1')}
        .
      </p>
    </Sheet>
  )
}

/* ─── The studio and the model ───────────────────────────────────────────── */

function Studio({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="What West Ventures is" lede="A venture studio affiliated with Austin Christian University." />
      <div className="bk-gap" />
      <p className="bk-p" style={{ maxWidth: 'calc(500 * var(--u))' }}>
        {THESIS_SUMMARY.split('. This page')[0]}. It does three things, and each one feeds the others.
      </p>
      <div className="bk-gap" />
      <div className="bk-cols c3">
        {[
          ['Teams', 'Small teams of high school and college students work on real problems for founders and operators, for academic credit. Companies pay nothing.'],
          ['Companies', 'When a project turns up an opportunity worth building, the studio builds it with the operator who found it, as a joint venture.'],
          ['Network', 'Partner high schools and universities send their best students. Founders, operators and investors bring the work.'],
        ].map(([t, d], i) => (
          <div key={t}>
            <p className="bk-label" style={{ color: 'var(--bk-bronze)' }}>
              {['I', 'II', 'III'][i]}
            </p>
            <h3 className="bk-h3" style={{ marginTop: 'calc(8 * var(--u))' }}>
              {t}
            </h3>
            <p className="bk-p bk-small" style={{ marginTop: 'calc(7 * var(--u))' }}>
              {d}
            </p>
          </div>
        ))}
      </div>
      <div className="bk-push" />
      <hr className="bk-rule" />
      <div className="bk-gap" />
      <div className="bk-cols c3">
        <Stat value={FACTS.companiesServed} label="Companies served by student teams so far" />
        <Stat value={FACTS.students} label="Students who have worked on a team" />
        <Stat value={n(FACTS.partnerGoal.schools)} label={`Partner schools planned by ${FACTS.partnerGoal.year}`} />
      </div>
    </Sheet>
  )
}

function Model({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title={<>Kings and <em>cupbearers</em></>} />
      <div className="bk-gap" />
      <Img src="/thesis/art/nehemiah-dore.jpg" alt="Gustave Doré’s engraving of Nehemiah" h={250} pos="50% 22%" />
      <p className="bk-caption">Gustave Doré, Nehemiah views the ruins of Jerusalem’s walls, 1866. Nehemiah was cupbearer to the king.</p>
      <div className="bk-gap" />
      <div className="bk-cols c2" style={{ gap: 'calc(26 * var(--u))' }}>
        <div>
          <p className="bk-p">{MODEL.intro[0]}</p>
          <p className="bk-p">{MODEL.intro[1]}</p>
        </div>
        <div>
          <p className="bk-p">{MODEL.intro[2]}</p>
        </div>
      </div>
    </Sheet>
  )
}

function Opportunities({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title={<>Found, <em>not invented</em></>} />
      <div className="bk-gap" />
      <Img src="/thesis/art/peale-mastodon.jpg" alt="Charles Willson Peale’s painting of the mastodon excavation" h={280} />
      <p className="bk-caption">Charles Willson Peale, The Exhumation of the Mastodon, 1806–08.</p>
      <div className="bk-gap" />
      <div className="bk-cols c2" style={{ gap: 'calc(26 * var(--u))' }}>
        <p className="bk-p">{OPPORTUNITIES.ideas}</p>
        <div>
          <p className="bk-p">{OPPORTUNITIES.fossil}</p>
          <p className="bk-p">{OPPORTUNITIES.so}</p>
        </div>
      </div>
    </Sheet>
  )
}

/* ─── How it works ───────────────────────────────────────────────────────── */

function Project({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="How a project works" lede="One team, one founder, one term, one written scope." />
      <div className="bk-gap" />
      <p className="bk-p" style={{ maxWidth: 'calc(520 * var(--u))' }}>
        A project is one term of work by one team, for one founder or executive. Terms run in fall, spring and summer. The
        founder brings a real problem and about an hour a week. The company pays nothing and keeps all equity and
        intellectual property. Students earn academic credit.
      </p>
      <div className="bk-gap" />
      <TermStrip mode={ctx.mode} />
      <div className="bk-push" />
      <ol className="bk-steps bk-small">
        {[
          ['Before', 'The studio matches the project with a team and a project advisor, and introduces them to the founder.'],
          ['Week one', 'The founder and the project advisor write the scope: a week-by-week plan of what the team will deliver.'],
          ['Every week', 'Two meetings. One internal, with the project advisor, on tasks and blockers. One with the founder, to review the work and adjust the scope.'],
          ['End of term', 'The team delivers and hands over. The project advisor evaluates each student; the founder evaluates the project.'],
          ['After', 'Students who delivered are invited back with more responsibility. An opportunity worth building may become a joint venture.'],
        ].map(([t, d]) => (
          <li key={t}>
            <span className="n">{t}</span>
            <span>{d}</span>
          </li>
        ))}
      </ol>
    </Sheet>
  )
}

function Team({ ctx }: { ctx: PageCtx }) {
  const dot = (filled: boolean, key: number) => (
    <span
      key={key}
      style={{
        width: 'calc(38 * var(--u))',
        height: 'calc(38 * var(--u))',
        borderRadius: '50%',
        display: 'inline-block',
        background: filled ? 'var(--bk-ink)' : 'transparent',
        border: `calc(1.5 * var(--u)) solid ${filled ? 'var(--bk-ink)' : 'var(--bk-bronze)'}`,
      }}
    />
  )
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="The team" lede="About five students, an experienced project advisor and the founder." />
      <div className="bk-gap-l" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(10 * var(--u))', flexWrap: 'wrap' }}>
        {[true, true].map((f, i) => dot(f, i))}
        <span style={{ width: 'calc(14 * var(--u))' }} />
        {[false, false, false].map((f, i) => dot(f, i + 2))}
      </div>
      <div className="bk-cols c2" style={{ marginTop: 'calc(12 * var(--u))' }}>
        <p className="bk-small" style={{ margin: 0 }}>
          <b style={{ fontWeight: 500, color: 'var(--bk-ink)' }}>Two college students</b>, one of whom leads the team.
        </p>
        <p className="bk-small" style={{ margin: 0 }}>
          <b style={{ fontWeight: 500, color: 'var(--bk-ink)' }}>Three high school Builder Scholars</b>, nominated by their schools.
        </p>
      </div>
      <div className="bk-gap" />
      <p className="bk-p" style={{ maxWidth: 'calc(520 * var(--u))' }}>
        Two roles are easy to confuse. The <b style={{ fontWeight: 500, color: 'var(--bk-ink)' }}>team leader</b> is a
        college student who runs the team day to day. The <b style={{ fontWeight: 500, color: 'var(--bk-ink)' }}>project
        advisor</b> is an experienced volunteer professional who coaches the team, keeps the scope honest and evaluates
        the work. Teams mix students from different schools on purpose, and studio staff oversee every team.
      </p>
      <div className="bk-push" />
      <p className="bk-label">Roles, time and credit</p>
      <div style={{ height: 'calc(8 * var(--u))' }} />
      <table className="bk-table bk-small">
        <tbody>
          {[
            ['Team leader', 'College student', '5 to 10 hrs a week', '6 credit hours'],
            ['Contributor', 'College student', '4 to 8 hrs a week', '3 credit hours'],
            ['Builder Scholar', 'High school student', 'About 3 hrs a week', '3 credit hours'],
            ['Project advisor', 'Volunteer professional', 'Two meetings a week', '—'],
            ['Founder', 'The company', 'About 1 hr a week', '—'],
          ].map(([r, w, h, c]) => (
            <tr key={r}>
              <th>{r}</th>
              <td style={{ color: 'var(--bk-grey)' }}>{w}</td>
              <td>{h}</td>
              <td style={{ textAlign: 'right', paddingRight: 0 }}>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Sheet>
  )
}

export const PARTY_LABELS: Record<Party, string> = {
  founder: 'The founder',
  lead: 'The project advisor',
  students: 'Students',
  studio: 'The studio',
  parents: 'Parents',
  school: 'The school',
  university: 'The university',
}

export const PARTY_TERMS: Record<Party, string[]> = {
  founder: [
    'Bring a real problem or opportunity that matters to the business.',
    'Write the scope with the project advisor in week one.',
    'Meet the team once a week and answer questions in between.',
    'Give honest feedback, including when the work falls short.',
    'Evaluate the project at the end of the term.',
  ],
  lead: [
    'Run the weekly internal meeting and coach the team.',
    'Keep the scope current and the founder informed.',
    'Hold students to the standard the founder expects.',
    'Evaluate each student’s work at the end of the term.',
  ],
  students: [
    'Give the hours the role requires, every week.',
    'Attend both weekly meetings, prepared.',
    'Deliver what the scope says, when it says.',
    'Keep the company’s information confidential.',
    'Represent the company and the studio well.',
  ],
  studio: [
    'Recruit and screen students and project advisors.',
    'Match each project with a team that can deliver it.',
    'Handle all academic paperwork and credit.',
    'Oversee every team and step in when a project is off track.',
  ],
  parents: [
    'Know the weekly time commitment and meeting times.',
    'Encourage your student to keep commitments to the team.',
    'Raise any concern with the studio directly.',
  ],
  school: [
    'Name one contact who nominates students.',
    'Nominate two to five capable students each term.',
    'Let students take part alongside their coursework.',
  ],
  university: [
    'Name a faculty or staff liaison.',
    'Agree with the studio on how credit transfers.',
    'Recommend capable students each term.',
  ],
}

function ExpectationsPage({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="What each party commits to" lede="The arrangement works when everyone does their part. This is what each is asked to do." />
      <div className="bk-gap" />
      <Expectations mode={ctx.mode} parties={ctx.audience.parties} labels={PARTY_LABELS} terms={PARTY_TERMS} />
    </Sheet>
  )
}

function Disciplines({ ctx }: { ctx: PageCtx }) {
  const tiles = WORK_TILES.slice(0, 3)
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="The work" lede="Every project falls into one or more of five kinds of work." />
      <div className="bk-gap" />
      <ol className="bk-steps">
        {DISCIPLINES.map((d, i) => (
          <li key={d.title} style={{ padding: 'calc(10 * var(--u)) 0' }}>
            <span className="n">{['I', 'II', 'III', 'IV', 'V'][i]}</span>
            <span>
              <b style={{ fontWeight: 500, color: 'var(--bk-ink)' }}>{d.title}.</b> {d.text}
            </span>
          </li>
        ))}
      </ol>
      <div className="bk-push" />
      <div className="bk-cols c3" style={{ gap: 'calc(10 * var(--u))' }}>
        {tiles.map((t) => (
          <div key={t.name}>
            <Img src={t.src} alt={t.name} h={150} />
            <p className="bk-caption">
              {t.name}
              {t.descriptor ? ` · ${t.descriptor}` : ''}
            </p>
          </div>
        ))}
      </div>
    </Sheet>
  )
}

/* ─── Outcomes ───────────────────────────────────────────────────────────── */

function OutcomesFounders({ ctx }: { ctx: PageCtx }) {
  const t = FACTS.tiktok
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Outcomes for founders" />
      <div className="bk-gap" />
      <div className="bk-cols c2">
        <Stat value={FACTS.companiesServed} label="Companies served by student teams" />
        <Stat value={FACTS.students} label="Students placed on those teams" />
      </div>
      <div className="bk-gap" />
      <div style={{ background: 'var(--bk-panel)', padding: 'calc(22 * var(--u)) calc(24 * var(--u))', borderRadius: 'calc(4 * var(--u))' }}>
        <p className="bk-label" style={{ color: 'var(--bk-bronze)' }}>
          Case · Adoption Is An Option, 2026
        </p>
        <h3 className="bk-h3" style={{ marginTop: 'calc(8 * var(--u))' }}>
          A student ad competition, judged on cost per click
        </h3>
        <p className="bk-p bk-small" style={{ marginTop: 'calc(8 * var(--u))' }}>
          Student teams made TikTok ads for an adoption advocacy organization from May to July 2026. Ads were scored
          only on their performance in TikTok Ads Manager. Every winning ad was built on one made in the first round.
        </p>
        <div className="bk-cols c3" style={{ marginTop: 'calc(16 * var(--u))', gap: 'calc(14 * var(--u))' }}>
          <Stat size="m" value={`${(t.impressions / 1e6).toFixed(1)}M`} label="Impressions" />
          <Stat size="m" value={`${(t.clicks / 1e6).toFixed(2)}M`} label="Clicks to the website" />
          <Stat size="m" value={`${t.ctr}%`} label="Click-through rate" />
          <Stat size="m" value={money(t.spend)} label="Total ad spend" />
          <Stat size="m" value={t.ads} label="Ads produced" />
          <Stat size="m" value="$0.011" label="Cost per website visitor" />
        </div>
      </div>
      <div className="bk-push" />
      <p className="bk-label">Companies served</p>
      <p className="bk-small" style={{ marginTop: 'calc(8 * var(--u))', columns: 3, columnGap: 'calc(18 * var(--u))', color: 'var(--bk-ink)' }}>
        {COMPANY_NAMES.slice(0, 33).map((c) => (
          <span key={c} style={{ display: 'block', breakInside: 'avoid' }}>
            {c}
          </span>
        ))}
      </p>
    </Sheet>
  )
}

function OutcomesStudents({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Outcomes for students" lede="Responsibility is earned one term at a time." />
      <div className="bk-gap" />
      <ol className="bk-steps">
        {[
          ['Builder Scholar', 'A high school student on a team, nominated by their school. Earns college credit.'],
          ['Contributor', 'A college student on a team, doing a defined part of the scope.'],
          ['Team leader', 'Invited after a strong term. Leads the team day to day and answers to the founder.'],
          ['Fellow', 'The studio’s most trusted students. Fellows work directly with proven operators on the studio’s own companies, two or three at a time.'],
        ].map(([t, d], i) => (
          <li key={t}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <b style={{ fontWeight: 500, color: 'var(--bk-ink)' }}>{t}.</b> {d}
            </span>
          </li>
        ))}
      </ol>
      <div className="bk-gap" />
      <div className="bk-cols c3">
        <Stat value={FACTS.students} label="Students who have worked on a team" />
        <Stat value={FACTS.fellows} label="Student Fellows named" />
        <Stat value="2×" label="Gloo AI Hackathon won by ACU student teams, 2025 and 2026" />
      </div>
      <div className="bk-push" />
      <hr className="bk-rule" />
      <div className="bk-gap-s" />
      <p className="bk-p bk-small" style={{ maxWidth: 'calc(520 * var(--u))' }}>
        Every student keeps a record of the work: a public profile listing each company they worked for, their role and
        what the team delivered, alongside academic credit on a transcript and a reference from a project advisor who saw
        the work.
      </p>
    </Sheet>
  )
}

function VoicesFounders({ ctx }: { ctx: PageCtx }) {
  const quotes = [...FOUNDER_QUOTES].sort((a, b) => a.quote.length - b.quote.length).slice(0, 3)
  const [lead, ...rest] = quotes
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="From founders" />
      <div className="bk-gap" />
      {lead && (
        <figure style={{ margin: 0, maxWidth: 'calc(520 * var(--u))' }}>
          <blockquote className="bk-quote">{lead.quote}</blockquote>
          <figcaption className="bk-cite">
            <b>{lead.name}</b>
            {lead.title}
          </figcaption>
        </figure>
      )}
      <div className="bk-push" />
      <hr className="bk-rule" />
      <div className="bk-gap" />
      <div className="bk-cols c2">
        {rest.map((q) => (
          <figure key={q.name} style={{ margin: 0 }}>
            <blockquote className="bk-quote is-s">{q.quote}</blockquote>
            <figcaption className="bk-cite">
              <b>{q.name}</b>
              {q.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </Sheet>
  )
}

function VoicesFamilies({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="From families and teachers" />
      <div className="bk-gap" />
      <div className="bk-cols c2" style={{ gap: 'calc(16 * var(--u))' }}>
        {FAMILY_QUOTES.map((q, i) => (
          <figure key={i} className={q.pending ? 'bk-pending' : undefined} style={{ margin: 0 }}>
            <p className="bk-label" style={{ color: 'var(--bk-bronze)' }}>
              {q.who} {q.pending && <Pending>To be collected</Pending>}
            </p>
            <blockquote className="bk-quote is-s" style={{ marginTop: 'calc(10 * var(--u))', color: q.pending ? 'var(--bk-grey)' : undefined }}>
              {q.quote}
            </blockquote>
            <figcaption className="bk-cite">
              <b>{q.name}</b>
              {q.title}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="bk-push" />
      <p className="bk-small" style={{ color: 'var(--bk-grey)', maxWidth: 'calc(460 * var(--u))' }}>
        Families and teachers who would speak with a prospective family directly can be introduced on request.
      </p>
    </Sheet>
  )
}


/* ─── Student stories ────────────────────────────────────────────────────── */

const storySlugs = (ctx: PageCtx) =>
  ctx.audience.pages.filter((id) => id.startsWith('story-')).map((id) => id.slice(6) as StorySlug)

function Portrait({ slug, h, mono = 44 }: { slug: StorySlug; h: number; mono?: number }) {
  const st = STORIES[slug]
  if (st.photo) return <Img src={st.photo} alt={st.name} h={h} pos={st.photoPosition ?? 'center 20%'} />
  const initials = st.name.split(' ').map((w) => w[0]).join('')
  return (
    <div
      className="bk-img bk-flow-h"
      style={{ height: `calc(${h} * var(--u))`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bk-panel)' }}
    >
      <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: `calc(${mono} * var(--u))`, color: 'var(--bk-faint)' }}>{initials}</span>
    </div>
  )
}

function Stories({ ctx }: { ctx: PageCtx }) {
  const slugs = storySlugs(ctx)
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Student stories" lede="Students don’t need a business idea or a network. They need to show up and do excellent work." />
      <div className="bk-gap" />
      <p className="bk-p" style={{ maxWidth: 'calc(520 * var(--u))' }}>
        Most 18-year-olds have poor business ideas and no network. The studio has both: opportunities found by experienced
        operators, and the founders, executives and investors behind them. A student raises their hand, is placed on a
        real project, and is judged on effort, attitude and the work itself. When they deliver, their network grows and
        opportunities follow. {`Here are ${['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][slugs.length]} of them.`}
      </p>
      <div className="bk-push" />
      <div className="bk-cols c2" style={{ gap: 'calc(14 * var(--u)) calc(24 * var(--u))' }}>
        {slugs.map((slug) => {
          const st = STORIES[slug]
          const page = ctx.pageOf[`story-${slug}`]
          const name =
            ctx.mode === 'view' ? (
              <a href={`#page-${page}`} data-goto={page} style={{ color: 'inherit', textDecoration: 'none' }}>
                {st.name}
              </a>
            ) : (
              st.name
            )
          return (
            <div key={slug} style={{ display: 'grid', gridTemplateColumns: 'calc(52 * var(--u)) 1fr', gap: 'calc(12 * var(--u))', alignItems: 'center', borderTop: '1px solid var(--bk-line)', paddingTop: 'calc(12 * var(--u))' }}>
              <Portrait slug={slug} h={52} mono={17} />
              <span>
                <span className="bk-h3" style={{ display: 'block', fontSize: 'calc(15 * var(--u))' }}>
                  {name} <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--bk-grey)', fontSize: 'calc(12 * var(--u))' }}>· p. {page}</span>
                </span>
                <span className="bk-label" style={{ display: 'block', marginTop: 'calc(4 * var(--u))' }}>{st.meta}</span>
              </span>
            </div>
          )
        })}
      </div>
    </Sheet>
  )
}

function StoryPage({ ctx }: { ctx: PageCtx }) {
  const slug = ctx.id.slice(6) as StorySlug
  const st = STORIES[slug]
  const idx = storySlugs(ctx).indexOf(slug) + 1
  return (
    <Sheet ctx={ctx}>
      <p className="bk-kicker">
        Student story &nbsp;·&nbsp; {String(idx).padStart(2, '0')}
      </p>
      <h2 className="bk-title is-xl" style={{ fontSize: 'calc(54 * var(--u))' }}>{st.name}</h2>
      <p className="bk-label" style={{ marginTop: 'calc(10 * var(--u))' }}>{st.meta}</p>
      {st.pending?.length ? (
        <p style={{ margin: 'calc(10 * var(--u)) 0 0', display: 'flex', flexWrap: 'wrap', gap: 'calc(6 * var(--u))' }}>
          {st.pending.map((x) => (
            <Pending key={x}>To confirm · {x}</Pending>
          ))}
        </p>
      ) : null}
      <div className="bk-gap" />
      <div className="bk-cols c-story">
        <Portrait slug={slug} h={300} mono={64} />
        <div>
          <p className="bk-lede" style={{ marginTop: 0, color: 'var(--bk-ink)', fontSize: 'calc(20 * var(--u))' }}>{st.headline}</p>
          <div className="bk-gap-s" />
          <table className="bk-table bk-small">
            <tbody>
              {st.facts.map(([k, v]) => (
                <tr key={k}>
                  <th style={{ fontWeight: 400, color: 'var(--bk-grey)', width: 'calc(118 * var(--u))', whiteSpace: 'normal' }}>{k}</th>
                  <td style={{ color: 'var(--bk-ink)', paddingRight: 0 }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bk-gap" />
      <div style={{ maxWidth: 'calc(540 * var(--u))' }}>
        {st.body.map((t, i) => (
          <p key={i} className={`bk-p${i === 0 ? ' bk-dropcap' : ''}`}>
            {t}
          </p>
        ))}
      </div>
    </Sheet>
  )
}

/* ─── Students and parents ───────────────────────────────────────────────── */

function Pricing({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Pricing" />
      <div className="bk-gap" />
      <div className="bk-cols c-2-1" style={{ alignItems: 'end' }}>
        <div>
          <div className="bk-stat-num" style={{ fontSize: 'calc(84 * var(--u))' }}>
            {money(FACTS.price)}
          </div>
          <p className="bk-lede" style={{ marginTop: 'calc(10 * var(--u))' }}>
            per student, per term.
          </p>
        </div>
        <p className="bk-small" style={{ margin: 0, color: 'var(--bk-grey)' }}>
          The same price for high school and college students, who work on the same teams. Companies, partner schools and
          universities pay nothing.
        </p>
      </div>
      <div className="bk-gap" />
      <table className="bk-table bk-small">
        <tbody>
          {[
            ['Terms', 'Fall, spring and summer. Each is priced and enrolled separately.'],
            ['A full year', `${money(FACTS.price * 3)} for all three terms.`],
            ['Credit', '3 credit hours a term for contributors and Builder Scholars, 6 for team leaders. Awarded through Austin Christian University.'],
            ['Included', 'Team placement, a project advisor, and academic credit and its paperwork.'],
            ['Scholarships', 'Need-based scholarships are available. Price should not keep a capable student out.'],
            ['Effective', 'Summer 2027 and later. Earlier terms are priced under the current program.'],
          ].map(([k, v]) => (
            <tr key={k}>
              <th style={{ width: 'calc(120 * var(--u))' }}>{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bk-push" />
      <PriceEstimator mode={ctx.mode} price={FACTS.price} />
    </Sheet>
  )
}

function Abroad({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx} dark>
      <Opener ctx={ctx} title={<>A term <em>abroad</em></>} lede="Through Living and Learning International, students can live overseas for a term and stay on a team." />
      <div className="bk-gap" />
      <p className="bk-p" style={{ maxWidth: 'calc(520 * var(--u))' }}>
        Living and Learning International is a faith-based study abroad provider that works with more than forty
        Christian colleges and universities. Students live in residential communities with resident staff, take courses
        whose credit transfers home, and live in the culture. West Ventures students can spend a term in one of its
        locations and keep working with their team remotely, building companies from wherever they are.
      </p>
      <div className="bk-gap-l" />
      {[
        ['Quito', 'Ecuador', '0.18° S · 78.47° W'],
        ['Rome', 'Italy', '41.90° N · 12.50° E'],
        ['London', 'England', '51.51° N · 0.13° W'],
      ].map(([city, country, coord]) => (
        <div key={city} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderTop: '1px solid #34312c', padding: 'calc(14 * var(--u)) 0' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'calc(40 * var(--u))', lineHeight: 1, color: '#f4efe6' }}>
            {city} <em style={{ fontSize: '.5em', color: '#a59e93', fontWeight: 400 }}>{country}</em>
          </span>
          <span className="bk-label" style={{ color: '#7d776e' }}>
            {coord}
          </span>
        </div>
      ))}
      <div className="bk-push" />
      <p className="bk-small" style={{ color: '#a59e93' }}>
        <Pending>To confirm</Pending>&nbsp; Locations, dates and costs are set by Living and Learning and confirmed with each student before a term abroad.
        Living and Learning’s program fees are separate from West Ventures tuition.
      </p>
    </Sheet>
  )
}

function Supervision({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Supervision" lede="Many Builder Scholars are under 18. This is how the studio works with them." />
      <div className="bk-gap-s" />
      <p>
        <Pending>Draft policy · to confirm</Pending>
      </p>
      <ol className="bk-steps">
        {[
          ['Adults', 'Every team has an adult project advisor, screened by the studio, and is overseen by studio staff.'],
          ['Meetings', 'Team meetings are scheduled in advance and held online. Parents may ask for the schedule at any time.'],
          ['Messages', 'Team communication happens in studio-managed team channels that staff can see, not in private messages between adults and minors.'],
          ['Travel', 'No travel is required. Optional in-person events for students under 18 require a parent’s written consent and are chaperoned.'],
          ['Concerns', 'Parents and students can reach the studio directly about anything, at any time, and will get an answer from staff.'],
        ].map(([t, d]) => (
          <li key={t}>
            <span className="n" style={{ fontStyle: 'normal', fontFamily: 'var(--font-mono)', fontSize: 'calc(8 * var(--u))', letterSpacing: '.18em', textTransform: 'uppercase' }}>
              {t}
            </span>
            <span>{d}</span>
          </li>
        ))}
      </ol>
      <div className="bk-push" />
      <p className="bk-small" style={{ color: 'var(--bk-grey)', maxWidth: 'calc(480 * var(--u))' }}>
        The full conduct and safeguarding policy is available to any parent on request.
      </p>
    </Sheet>
  )
}

/* ─── Schools ───────────────────────────────────────────────────────────── */

function CreditHighSchools({ ctx }: { ctx: PageCtx }) {
  const photos = HIGH_SCHOOLS.filter((s) => s.image).slice(0, 3)
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title={<>College credit, <em>no homework</em></>} />
      <div className="bk-gap" />
      <div className="bk-cols c2">
        <div>
          <p className="bk-p">
            Builder Scholars earn 3 college credit hours a term through Austin Christian University for the work they do on their team.
            There are no tests and no assignments created for the course. Students submit evidence of the work they
            already produce for their founder, and their project advisor evaluates it.
          </p>
          <p className="bk-p">The studio never creates work the founder did not ask for.</p>
        </div>
        <div>
          <p className="bk-p">
            Partner schools nominate two to five students a term. The studio interviews each nominee and contacts the
            family. Schools pay nothing; there is no quota and no minimum.
          </p>
          <p className="bk-p">For the fall 2026 cohort, 35 high school seniors were selected from hundreds of nominees nationwide.</p>
        </div>
      </div>
      <div className="bk-push" />
      <div className="bk-cols c3" style={{ gap: 'calc(10 * var(--u))' }}>
        {photos.map((s) => (
          <div key={s.name}>
            <Img src={s.image as string} alt={s.name} h={140} />
            <p className="bk-caption">{s.name}</p>
          </div>
        ))}
      </div>
      <p className="bk-small" style={{ marginTop: 'calc(10 * var(--u))', color: 'var(--bk-grey)' }}>
        Partner schools include {HIGH_SCHOOLS.slice(3, 9).map((s) => s.name).join(', ')} and others.
      </p>
    </Sheet>
  )
}

function CreditUniversities({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Credit and partnership" lede="No fee to the institution. Credit that comes home." />
      <div className="bk-gap" />
      <table className="bk-table">
        <tbody>
          {[
            ['Cost', 'None. There is no partnership or license fee.'],
            ['Credit', '3 credit hours a term for contributors, 6 for team leaders. Awarded through Austin Christian University and transferred as your registrar decides.'],
            ['Students', 'Any major. Selected for ability and character, interviewed and placed by the studio.'],
            ['Teams', 'Mixed across schools, with high school Builder Scholars on every team.'],
            ['Liaison', 'One faculty or staff member who recommends students and receives term reports.'],
            ['Events', 'National studio events are hosted at Austin Christian University.'],
          ].map(([k, v]) => (
            <tr key={k}>
              <th style={{ width: 'calc(96 * var(--u))' }}>{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bk-push" />
      <p className="bk-p" style={{ maxWidth: 'calc(520 * var(--u))' }}>
        The studio is built to sit alongside what a university already offers. Students return to campus with real work
        on their record and a network of founders and operators who have seen what they can do.
      </p>
    </Sheet>
  )
}

/* ─── Founders ───────────────────────────────────────────────────────────── */

function FounderTerms({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Terms" lede="What you give, and what you keep." />
      <div className="bk-gap" />
      <div className="bk-cols c3" style={{ gap: 'calc(14 * var(--u))' }}>
        <Stat value="$0" label="Cost to the company" />
        <Stat value="0%" label="Equity taken" />
        <Stat value="~1 hr" label="Of your time each week" />
      </div>
      <div className="bk-gap" />
      <table className="bk-table">
        <tbody>
          {[
            ['Ownership', 'Your company keeps all equity and intellectual property produced on the project.'],
            ['Length', 'One term: fall, spring or summer. Projects can continue into another term with a new scope.'],
            ['Team', 'About five students and a volunteer project advisor, overseen by studio staff.'],
            ['Scope', 'Written with you in week one and reviewed with you every week.'],
            ['Students', 'Earn academic credit. Paying them is your choice and not expected.'],
            ['Joint ventures', 'Optional and separate. See Joint ventures, later in this booklet.'],
          ].map(([k, v]) => (
            <tr key={k}>
              <th style={{ width: 'calc(118 * var(--u))' }}>{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bk-push" />
      <p className="bk-label">Good projects</p>
      <p className="bk-p bk-small" style={{ marginTop: 'calc(8 * var(--u))', maxWidth: 'calc(520 * var(--u))' }}>
        Real, bounded and important to the business: a market study before a decision, an internal tool or AI agent, a
        brand or website, a campaign, a sales pipeline. The best projects are the ones a founder has wanted done for a
        year and never had the people for.
      </p>
    </Sheet>
  )
}

function JointVentures({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx} dark>
      <Opener ctx={ctx} title="Joint ventures" lede="When a project finds something worth building, the studio builds it with you." />
      <div className="bk-gap" />
      <div className="bk-cols c2">
        <div>
          <p className="bk-label" style={{ color: 'var(--bk-gold)' }}>The operator brings</p>
          <p className="bk-p" style={{ marginTop: 'calc(8 * var(--u))' }}>The opportunity, knowledge of the industry, and often the first customer.</p>
        </div>
        <div>
          <p className="bk-label" style={{ color: 'var(--bk-gold)' }}>The studio brings</p>
          <p className="bk-p" style={{ marginTop: 'calc(8 * var(--u))' }}>The team, Fellows working full time, and the work of building the company. The studio holds equity.</p>
        </div>
      </div>
      <div className="bk-gap" />
      <p className="bk-p">The studio expects to start about six companies a year this way. Current joint ventures include:</p>
      <div className="bk-gap-s" />
      <ol className="bk-steps" style={{ borderColor: '#34312c' }}>
        {[
          ['Unify', 'Software for nonprofits: one connected platform in place of a stack of separate tools.'],
          ['launch.kids', 'A tool that teaches children to build software with AI.'],
          ['Builder’s Quotient', 'An assessment of entrepreneurial ability, used to find students early.'],
          ['Life Time spinout', 'An AI data tool built for Life Time, now being spun out to commercialize, with Life Time as its first customer.'],
        ].map(([t, d]) => (
          <li key={t} style={{ borderColor: '#34312c' }}>
            <span className="n" style={{ color: 'var(--bk-gold)', fontStyle: 'normal', fontFamily: 'var(--font-serif)' }}>
              ◆
            </span>
            <span>
              <b style={{ fontWeight: 500, color: '#f4efe6' }}>{t}.</b> {d}
            </span>
          </li>
        ))}
      </ol>
    </Sheet>
  )
}

/* ─── Network and people ─────────────────────────────────────────────────── */

function Network({ ctx }: { ctx: PageCtx }) {
  const photos = HIGH_SCHOOLS.filter((s) => s.image).slice(0, 6)
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="The network" />
      <div className="bk-gap" />
      <div className="bk-cols c3" style={{ gap: 'calc(8 * var(--u))' }}>
        {photos.map((s) => (
          <div key={s.name}>
            <Img src={s.image as string} alt={s.name} h={92} />
            <p className="bk-caption" style={{ marginTop: 'calc(5 * var(--u))' }}>
              {s.name}
            </p>
          </div>
        ))}
      </div>
      <div className="bk-gap" />
      <div className="bk-cols c3 bk-small" style={{ gap: 'calc(18 * var(--u))', fontSize: 'calc(11 * var(--u))' }}>
        {[
          ['Partner high schools', HIGH_SCHOOLS.map((p) => p.name)],
          ['Venture firms', VC_FIRMS.map((p) => p.name)],
          ['Organizations', NETWORK.map((p) => p.name)],
        ].map(([t, list]) => (
          <div key={t as string}>
            <p className="bk-label">{t as string}</p>
            <p style={{ marginTop: 'calc(8 * var(--u))', color: 'var(--bk-ink)', lineHeight: 1.5 }}>
              {(list as string[]).slice(0, 16).map((x) => (
                <span key={x} style={{ display: 'block' }}>
                  {x}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </Sheet>
  )
}

function Leadership({ ctx }: { ctx: PageCtx }) {
  const mps = LEADERSHIP.filter((p) => p.title === 'Managing Partner')
  const heads = LEADERSHIP.filter((p) => p.title !== 'Managing Partner')
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Leadership" />
      <div className="bk-gap" />
      <div className="bk-cols c2">
        {mps.map((p) => (
          <div key={p.name}>
            {p.photo && <Img src={p.photo} alt={p.name} h={250} pos={p.photoPosition ?? 'center 25%'} />}
            <h3 className="bk-h3" style={{ marginTop: 'calc(12 * var(--u))' }}>
              {p.name}
            </h3>
            <p className="bk-label" style={{ marginTop: 'calc(4 * var(--u))' }}>
              {p.title}
            </p>
          </div>
        ))}
      </div>
      <div className="bk-push" />
      <div className="bk-cols c2 bk-small">
        <div>
          <p className="bk-label">Leadership team</p>
          {heads.map((p) => (
            <p key={p.name} style={{ margin: 'calc(6 * var(--u)) 0 0' }}>
              <span style={{ color: 'var(--bk-ink)' }}>{p.name}</span> · {p.title}
            </p>
          ))}
        </div>
        <div>
          <p className="bk-label">Board</p>
          {BOARD.map((p) => (
            <p key={p.name} style={{ margin: 'calc(6 * var(--u)) 0 0' }}>
              <span style={{ color: 'var(--bk-ink)' }}>{p.name}</span> · {p.title}
            </p>
          ))}
        </div>
      </div>
    </Sheet>
  )
}

function Faq({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx}>
      <Opener ctx={ctx} title="Questions" />
      <div className="bk-gap" />
      <div className="bk-cols c2" style={{ rowGap: 'calc(20 * var(--u))' }}>
        {ctx.audience.faq.map((f) => (
          <div key={f.q}>
            <h3 className="bk-h3" style={{ fontSize: 'calc(15.5 * var(--u))' }}>
              {f.q}
            </h3>
            <p className="bk-p bk-small" style={{ marginTop: 'calc(6 * var(--u))' }}>
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </Sheet>
  )
}

function Next({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx} dark>
      <Opener ctx={ctx} title="Next steps" />
      <div className="bk-gap-l" />
      <ol className="bk-steps">
        {ctx.audience.next.map((s, i) => (
          <li key={s.title} style={{ borderColor: '#34312c', padding: 'calc(18 * var(--u)) 0' }}>
            <span className="n" style={{ color: 'var(--bk-gold)', fontSize: 'calc(22 * var(--u))' }}>
              {i + 1}
            </span>
            <span>
              <h3 className="bk-h3" style={{ fontSize: 'calc(21 * var(--u))' }}>
                {s.title}
              </h3>
              <span style={{ display: 'block', marginTop: 'calc(6 * var(--u))' }}>{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="bk-push" />
      <p className="bk-label" style={{ color: '#7d776e' }}>
        Contact
      </p>
      <p style={{ margin: 'calc(8 * var(--u)) 0 0', fontFamily: 'var(--font-serif)', fontSize: 'calc(26 * var(--u))', color: '#f4efe6' }}>
        {ctx.mode === 'view' ? (
          <a className="bk-link" style={{ color: '#f4efe6' }} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        ) : (
          EMAIL
        )}
      </p>
      <p className="bk-small" style={{ marginTop: 'calc(4 * var(--u))' }}>
        {SITE}
      </p>
    </Sheet>
  )
}

function Back({ ctx }: { ctx: PageCtx }) {
  return (
    <Sheet ctx={ctx} dark full chrome={false}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: 'calc(60 * var(--u))', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', fontSize: 'calc(54 * var(--u))', color: '#f4efe6' }}>
          West
        </span>
        <p className="bk-label" style={{ marginTop: 'calc(18 * var(--u))', color: '#7d776e' }}>
          Ventures
        </p>
        <div style={{ height: 'calc(140 * var(--u))' }} />
        <p className="bk-small" style={{ color: '#a59e93', maxWidth: 'calc(340 * var(--u))' }}>
          A venture studio affiliated with Austin Christian University.
        </p>
        <p className="bk-label" style={{ marginTop: 'calc(14 * var(--u))', color: '#7d776e' }}>
          {SITE} · {EMAIL}
        </p>
        <p className="bk-label" style={{ marginTop: 'calc(40 * var(--u))', color: '#5a554e' }}>
          Info Booklet · {ctx.audience.label} · {EDITION}
        </p>
      </div>
    </Sheet>
  )
}

/* ─── Registry ───────────────────────────────────────────────────────────── */

type FixedPageId = Exclude<PageId, `story-${string}`>

export const PAGES: Record<FixedPageId, (p: { ctx: PageCtx }) => React.ReactElement> = {
  cover: Cover,
  stories: Stories,
  letter: Letter,
  contents: Contents,
  studio: Studio,
  model: Model,
  opportunities: Opportunities,
  project: Project,
  team: Team,
  expectations: ExpectationsPage,
  disciplines: Disciplines,
  'outcomes-founders': OutcomesFounders,
  'outcomes-students': OutcomesStudents,
  'voices-founders': VoicesFounders,
  'voices-families': VoicesFamilies,
  pricing: Pricing,
  abroad: Abroad,
  supervision: Supervision,
  'credit-high-schools': CreditHighSchools,
  'credit-universities': CreditUniversities,
  'founder-terms': FounderTerms,
  'joint-ventures': JointVentures,
  network: Network,
  leadership: Leadership,
  faq: Faq,
  next: Next,
  back: Back,
}

/** Page contexts for a whole booklet, in order. */
export function bookletPages(audience: Audience, mode: Mode): PageCtx[] {
  const pageOf: Partial<Record<PageId, number>> = {}
  audience.pages.forEach((id, i) => (pageOf[id] = i + 1))
  let section = 0
  return audience.pages.map((id, i) => ({
    audience,
    id,
    number: i + 1,
    section: SECTION_TITLES[id] ? ++section : 0,
    mode,
    pageOf,
  }))
}

export function BookletPage({ ctx }: { ctx: PageCtx }) {
  const P = ctx.id.startsWith('story-') ? StoryPage : PAGES[ctx.id as FixedPageId]
  return <P ctx={ctx} />
}
