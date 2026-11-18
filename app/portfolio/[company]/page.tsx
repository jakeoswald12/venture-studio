import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NextCaseStudy, TitleAndText, VerticalStats } from '@/components/modules/Blocks'
import { Arrow, Lines, Mask, Media } from '@/components/modules/Media'
import { FEATURED, hasCaseStudy } from '@/lib/site'
import {
  PORTFOLIO_COMPANIES,
  STUDENT_ROLES,
  companyAdvisors,
  companyCohorts,
  companyRoster,
  companySponsors,
  findCompany,
  studentSlug,
  type ShowcaseBlock,
  type StudentRole,
} from '@/lib/data/portfolio-directory'

/**
 * /portfolio/[company] — one venture as a case study.
 *
 * A long, mostly visual scroll: the name at display size, three metadata
 * columns, a tall image, a summary set large in the right half, then the
 * written case study as media and text modules, the team, and a teaser for the
 * next case study.
 */

interface PageProps {
  params: Promise<{ company: string }>
}

/** What each role is called on the page. The data keeps 'Student Lead'; the
 *  page says 'Leader', which is how the teams talk about it. */
const ROLE_LABEL: Record<StudentRole, string> = {
  'Student Lead': 'Leader',
  Contributor: 'Contributor',
  'Builder Scholar': 'Builder Scholar',
}

export function generateStaticParams() {
  return PORTFOLIO_COMPANIES.map((c) => ({ company: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { company: slug } = await params
  const company = findCompany(slug)
  if (!company) return { title: 'Portfolio' }

  const title = `${company.name} · Portfolio`
  const description =
    company.blurb ??
    `${company.name}${company.descriptor ? ` — ${company.descriptor}` : ''}. Built with ${
      companyRoster(company).length
    } students.`

  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${company.slug}` },
    openGraph: { url: `/portfolio/${company.slug}`, title, description, type: 'article' },
  }
}

export default async function CompanyProfilePage({ params }: PageProps) {
  const { company: slug } = await params
  const company = findCompany(slug)
  if (!company) notFound()

  const cohorts = companyCohorts(company)
  const sponsors = companySponsors(company)
  const advisors = companyAdvisors(company)
  const roster = companyRoster(company)
  const status = [...new Set(company.engagements.map((e) => e.status))]
  const position = company.tileFocus !== undefined ? `${company.tileFocus}% 50%` : undefined

  // Featured ventures cycle among themselves; the rest step through every
  // company that has a case study, in directory order.
  const pool = FEATURED.some((c) => c.slug === company.slug) ? FEATURED : PORTFOLIO_COMPANIES.filter(hasCaseStudy)
  const next = pool[(pool.findIndex((c) => c.slug === company.slug) + 1) % pool.length]

  return (
    <main>
      <header className="pad page-top">
        <h1 className="serif t-display" data-io style={{ margin: 0 }}>
          <span className="line">
            <span>{company.name}</span>
          </span>
        </h1>
      </header>

      <dl className="grid12 cs-meta fade" data-io style={{ '--d': 3 } as React.CSSProperties}>
        <div className="d-1-3">
          <dt>Type</dt>
          <dd>{company.descriptor ?? 'Venture'}</dd>
        </div>
        <div style={{ gridColumn: 'span 3' }}>
          <dt>Disciplines</dt>
          <dd>{company.disciplines?.length ? company.disciplines.join(', ') : '—'}</dd>
        </div>
        <div style={{ gridColumn: 'span 3' }}>
          <dt>Delivered</dt>
          <dd>{company.delivered ?? (cohorts.length ? `${cohorts.join(', ')} · ${status.join(', ')}` : '—')}</dd>
        </div>
        <div style={{ gridColumn: 'span 3' }}>
          <dt>Website</dt>
          <dd>
            {company.url ? (
              <a href={company.url} target="_blank" rel="noopener noreferrer" className="text-link">
                {company.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} <Arrow />
              </a>
            ) : (
              'Private'
            )}
          </dd>
        </div>
      </dl>

      <Mask className="cs-hero" d={2}>
        <Media src={company.hero ?? company.tile} name={company.name} sizes="100vw" position={company.hero ? undefined : position} priority />
      </Mask>

      {company.blurb && (
        <TitleAndText label="Summary">
          <p className="t-intro fade" data-io style={{ margin: 0, '--d': 1 } as React.CSSProperties}>
            {company.blurb}
          </p>
        </TitleAndText>
      )}

      {company.showcase?.map((block, i) => <ShowcaseSection key={i} block={block} />)}

      {company.testimonial && (
        <TitleAndText label="Founder">
          <blockquote style={{ margin: 0 }}>
            <p className="serif t-h3 fade" data-io style={{ margin: 0 }}>
              “{company.testimonial.quote}”
            </p>
            <footer className="t-label" style={{ marginTop: 20 }}>
              <span className="bold">{company.testimonial.name}</span> · {company.testimonial.title}
            </footer>
          </blockquote>
        </TitleAndText>
      )}

      {(roster.length > 0 || advisors.length > 0) && (
        <section className="grid12 section m-gap cs-team">
          <div className="d-1-5">
            <Lines as="h2" className="t-h2" lines={['Team']} />
          </div>
          <div className="d-7-6">
            {company.engagements
              .filter((e) => e.team.length || e.advisors.length)
              .map((engagement) => {
                const sorted = [...engagement.team].sort((a, b) => STUDENT_ROLES.indexOf(a.role) - STUDENT_ROLES.indexOf(b.role))
                return (
                  <div key={engagement.cohort} className="cs-team-term">
                    <p className="t-label" style={{ margin: '0 0 8px' }}>
                      {engagement.cohort} · {engagement.status}
                    </p>
                    {engagement.advisors.map((a) => (
                      <Link key={a} href="/team" className="row compact" style={{ paddingInline: 0, gridTemplateColumns: '1fr auto' }}>
                        <span className="serif cs-team-name">{a}</span>
                        <span className="subtle" style={{ fontSize: 14 }}>
                          Project advisor
                        </span>
                      </Link>
                    ))}
                    {sorted.map((member) => (
                      <Link
                        key={member.name}
                        href={`/portfolio/student/${studentSlug(member.name)}`}
                        className={`row compact${member.role === 'Student Lead' ? ' is-lead' : ''}`}
                        style={{ paddingInline: 0, gridTemplateColumns: '1fr auto' }}
                      >
                        <span className={member.role === 'Student Lead' ? 'serif cs-team-name' : 'bold'} style={member.role === 'Student Lead' ? undefined : { fontSize: 17 }}>
                          {member.name}
                        </span>
                        <span className="subtle" style={{ fontSize: 14 }}>
                          {member.role === 'Student Lead' ? 'Team leader' : ROLE_LABEL[member.role]}
                        </span>
                      </Link>
                    ))}
                    <hr className="rule" />
                  </div>
                )
              })}
            {sponsors.length > 0 && (
              <p className="t-body" style={{ margin: 0 }}>
                <span className="subtle">Sponsors: </span>
                {sponsors.join(', ')}
              </p>
            )}
          </div>
        </section>
      )}

      {next && next.slug !== company.slug && (
        <NextCaseStudy href={`/portfolio/${next.slug}`} name={next.name} src={next.tile} focus={next.tileFocus} />
      )}
    </main>
  )
}

const RATIO = { '16/9': '16 / 9', '4/3': '4 / 3', '1/1': '1 / 1' } as const

/** One block of the written case study, as a module from the library. An
 *  image with no `src` renders as a labelled placeholder panel. */
function ShowcaseSection({ block }: { block: ShowcaseBlock }) {
  switch (block.kind) {
    case 'heading':
      return <TitleAndText label={block.eyebrow} title={block.text} />

    case 'copy':
      return (
        <div className="grid12" style={{ paddingTop: 40 }}>
          <p className="t-lead d-7-5 fade" data-io style={{ margin: 0 }}>
            {block.text}
          </p>
        </div>
      )

    case 'image':
      return (
        <figure className="section-sm">
          <Mask className="media-full" style={{ aspectRatio: RATIO[block.ratio ?? '16/9'] }}>
            <Media src={block.src} name={block.alt} sizes="100vw" />
          </Mask>
          {block.caption && <figcaption className="pad">{block.caption}</figcaption>}
        </figure>
      )

    case 'stats':
      return (
        <div className="section">
          <VerticalStats items={block.items} />
        </div>
      )

    case 'pair':
      return (
        <figure className="section-sm">
          <div className="media-pair">
            {block.images.map((im) => (
              <Mask key={im.src}>
                <Media src={im.src} name={im.alt} sizes="(min-width: 967px) 50vw, 100vw" />
              </Mask>
            ))}
          </div>
          {block.caption && <figcaption className="pad">{block.caption}</figcaption>}
        </figure>
      )

    case 'flow':
      return (
        <section className="section">
          {(block.label || block.title) && (
            <div className="pad" style={{ marginBottom: 'clamp(24px, 3vw, 48px)' }}>
              {block.label && (
                <p className="t-label" style={{ margin: '0 0 10px' }}>
                  {block.label}
                </p>
              )}
              {block.title && <h3 className="serif t-h3" style={{ margin: 0 }}>{block.title}</h3>}
            </div>
          )}
          <ol className="cs-flow fade" data-io style={{ '--n': block.steps.length } as React.CSSProperties}>
            {block.steps.map((st, i) => (
              <li key={st.title}>
                <span className="cs-flow-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="cs-flow-title">{st.title}</span>
                {st.text && <span className="cs-flow-text">{st.text}</span>}
              </li>
            ))}
          </ol>
        </section>
      )

    case 'bars':
      return (
        <TitleAndText label={block.label} title={block.title}>
          <div className="cs-bars" data-io>
            {block.items.map((b) => (
              <div key={b.label} className="cs-bar">
                <div className="cs-bar-head">
                  <span>{b.label}</span>
                  <span className="serif cs-bar-value">{b.display}</span>
                </div>
                <div className="cs-bar-track">
                  <span style={{ '--w': `${Math.max(0.6, b.value)}%` } as React.CSSProperties} />
                </div>
              </div>
            ))}
            {block.note && (
              <p className="t-label" style={{ margin: '16px 0 0' }}>
                {block.note}
              </p>
            )}
          </div>
        </TitleAndText>
      )

    case 'links':
      return (
        <TitleAndText label={block.label ?? 'See the work'}>
          {block.items.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="row compact"
              style={{ paddingInline: 0, gridTemplateColumns: '1fr auto' }}
            >
              <span>
                <span className="bold" style={{ fontSize: 18 }}>
                  {l.label}
                </span>
                {l.note && (
                  <span className="subtle" style={{ display: 'block', fontSize: 14, marginTop: 2 }}>
                    {l.note}
                  </span>
                )}
              </span>
              <Arrow />
            </a>
          ))}
          <hr className="rule" />
        </TitleAndText>
      )

    case 'quote':
      return (
        <TitleAndText label="Quote">
          <blockquote style={{ margin: 0 }}>
            <p className="serif t-h3 fade" data-io style={{ margin: 0 }}>
              “{block.text}”
            </p>
            {block.attribution && (
              <footer className="t-label" style={{ marginTop: 20 }}>
                {block.attribution}
              </footer>
            )}
          </blockquote>
        </TitleAndText>
      )
  }
}
