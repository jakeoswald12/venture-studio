import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CompanyPlate, Pending, PersonAvatar } from '@/components/portfolio/directory/PortfolioBits'
import {
  PORTFOLIO_COMPANIES,
  STUDENT_ROLES,
  companyCohorts,
  companyRoster,
  companySponsors,
  findCompany,
  studentSlug,
  type Engagement,
  type PortfolioCompany,
  type ShowcaseBlock,
  type StudentRole,
} from '@/lib/data/portfolio-directory'

/**
 * /portfolio/[company] — one venture as a case study.
 *
 * Two panes that scroll independently on desktop: the left rail is the credits
 * (who it is, who sponsored it, who built it) and stays put while the right
 * pane runs the work itself — photography and copy, top to bottom. Neither pane
 * shows a scrollbar; a rule down the middle would split a spread that is meant
 * to read as one. Below md the panes stack and the page scrolls normally.
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

  return (
    <>
      <main className="relative z-10 pt-[92px] sm:pt-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Link
            href="/ventures"
            className="group inline-flex items-center gap-2 py-4 text-[12.5px] text-muted-foreground transition-colors hover:text-bronze"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3 w-3 flex-none fill-none stroke-current stroke-[1.6] transition-transform group-hover:-translate-x-0.5"
            >
              <path d="M10 2.5 4.5 8l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to ventures
          </Link>

          <div className="grid items-start gap-10 pb-16 md:h-[calc(100vh-9rem)] md:grid-cols-[320px_1fr] md:gap-14 md:pb-0">
            {/* ── Credits ─────────────────────────────────────────────── */}
            <aside className="scrollbar-none flex flex-col gap-8 md:h-full md:overflow-y-auto md:overscroll-contain md:pb-14" data-lenis-prevent="true">
              {/* The mark and the name are the way out to the company's own
                  site — a separate "Visit site" row would say the same thing
                  twice. Companies with no site render as plain text. */}
              <CompanyIdentity company={company} />

              {company.engagements.length > 0 && (
              <>
              <section>
                <RailLabel>Sponsors</RailLabel>
                <div className="mt-1">
                  {sponsors.length ? (
                    sponsors.map((name) => (
                      <div key={name} className="flex items-center gap-3 py-2.5">
                        <PersonAvatar name={name} />
                        <span className="min-w-0">
                          <span className="block text-sm leading-tight text-navy-accent">{name}</span>
                          <span className="mt-px block text-[11px] text-muted-foreground">
                            <Pending>Title pending</Pending>
                          </span>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3 py-2.5">
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 flex-none place-items-center rounded-full border border-dashed border-bronze/60 text-bronze"
                      >
                        +
                      </span>
                      <span className="min-w-0 text-[12.5px] leading-tight">
                        <Pending>Face, name and title go here</Pending>
                      </span>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <RailLabel>Students</RailLabel>
                <div className="mt-1 flex flex-col gap-5">
                  {company.engagements.map((engagement) => (
                    <EngagementRoster
                      key={engagement.cohort}
                      engagement={engagement}
                      showCohort={company.engagements.length > 1}
                    />
                  ))}
                </div>
              </section>
              </>
              )}
            </aside>

            {/* ── The work ────────────────────────────────────────────── */}
            <div className="scrollbar-none min-w-0 md:h-full md:overflow-y-auto md:overscroll-contain md:pb-14" data-lenis-prevent="true">
              {company.blurb && (
                <p className="max-w-[62ch] font-serif text-[clamp(1.05rem,1.7vw,1.24rem)] font-light leading-[1.52] text-navy-accent">
                  {company.blurb}
                </p>
              )}

              {company.showcase?.length ? (
                <div className="flex flex-col gap-7">
                  {company.showcase.map((block, i) => (
                    <ShowcaseSection key={i} block={block} />
                  ))}
                </div>
              ) : (
                !company.blurb && (
                  <p className="max-w-[62ch] font-serif text-[1.05rem] font-light italic leading-[1.52]">
                    <Pending>
                      Case study not written yet — photos and copy about the work go here.
                    </Pending>
                  </p>
                )
              )}

              {company.testimonial && (
                <blockquote className="mt-9 border-l-2 border-bronze py-0.5 pl-5">
                  <p className="max-w-[60ch] font-serif text-[1.05rem] font-light italic leading-[1.56] text-navy-accent">
                    “{company.testimonial.quote}”
                  </p>
                  <footer className="mt-3 text-[12.5px] text-muted-foreground">
                    <b className="font-medium text-navy-accent">{company.testimonial.name}</b> ·{' '}
                    {company.testimonial.title}
                  </footer>
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

/**
 * The mark, the name and the one-line descriptor — the whole block links out to
 * the company's site when there is one, so there's no separate CTA to spend a
 * row on. No site on file: the same block, not a link.
 */
function CompanyIdentity({ company }: { company: PortfolioCompany }) {
  // The descriptor sits OUTSIDE the h1 on purpose: inside it, it inherits the
  // site's heading weight and renders bold.
  const body = (
    <>
      <CompanyPlate name={company.name} size="lg" />
      <h1 className="mt-5 font-serif text-[clamp(1.7rem,3vw,2.15rem)] font-semibold leading-[1.08] tracking-[-.015em] text-navy-accent text-balance transition-colors group-hover:text-bronze">
        {company.name}
      </h1>
      <p className="mt-1.5 font-body text-[13.5px] font-normal text-muted-foreground">
        {company.descriptor ?? <Pending>One-line description needed</Pending>}
      </p>
    </>
  )

  if (!company.url) return <div className="flex flex-col items-start">{body}</div>

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Visit ${company.name}`}
      className="group flex flex-col items-start"
    >
      {body}
    </a>
  )
}

function RailLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-b border-border pb-[7px] text-[10px] font-medium uppercase tracking-[.16em] text-muted-foreground">
      {children}
    </p>
  )
}

/** One semester's students, leads first. The cohort heading only appears when a
 *  company has been engaged more than once — otherwise the cohort is already on
 *  the rail and repeating it is noise. */
function EngagementRoster({
  engagement,
  showCohort,
}: {
  engagement: Engagement
  showCohort: boolean
}) {
  const roster = [...engagement.team].sort(
    (a, b) => STUDENT_ROLES.indexOf(a.role) - STUDENT_ROLES.indexOf(b.role),
  )

  return (
    <section>
      {showCohort && (
        <p className="pb-1 pt-1 text-[11px] font-medium uppercase tracking-[.1em] text-muted-foreground">
          {engagement.cohort} · {engagement.team.length} students
        </p>
      )}
      {engagement.rosterUnverified && (
        <p className="mb-1 text-[12px] text-muted-foreground">
          Roster carried over from the deck — confirm before publishing.
        </p>
      )}
      {roster.map((member) => {
        const slug = studentSlug(member.name)
        return (
          <Link
            key={slug}
            href={`/portfolio/student/${slug}`}
            className="group flex items-center gap-3 py-2.5"
          >
            <PersonAvatar name={member.name} role={member.role} />
            <span className="min-w-0">
              <span className="block text-sm leading-tight text-navy-accent transition-colors group-hover:text-bronze">
                {member.name}
              </span>
              <span className="mt-px block text-[11px] font-medium uppercase tracking-[.05em] text-muted-foreground">
                {ROLE_LABEL[member.role]}
              </span>
            </span>
          </Link>
        )
      })}
    </section>
  )
}

const RATIO_CLASS = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
} as const

/** One block of the case study. An image with no `src` renders as a labelled
 *  frame, so the page can be laid out before the photography exists. */
function ShowcaseSection({ block }: { block: ShowcaseBlock }) {
  switch (block.kind) {
    case 'heading':
      return (
        <header className="mt-3 first:mt-0">
          {block.eyebrow && (
            <p className="text-[10.5px] font-medium uppercase tracking-[.16em] text-bronze">
              {block.eyebrow}
            </p>
          )}
          <h2 className="mt-1.5 font-serif text-[clamp(1.4rem,2.4vw,1.85rem)] font-semibold leading-[1.14] tracking-[-.012em] text-navy-accent text-balance">
            {block.text}
          </h2>
        </header>
      )

    case 'copy':
      return (
        <p className="max-w-[66ch] text-[15.5px] leading-[1.66] text-navy-accent/85">
          {block.text}
        </p>
      )

    case 'image':
      return (
        <figure>
          <div
            className={`relative w-full overflow-hidden rounded-[7px] ${
              RATIO_CLASS[block.ratio ?? '16/9']
            } ${block.src ? '' : 'border border-dashed border-border bg-muted'}`}
          >
            {block.src ? (
              <Image
                src={block.src}
                alt={block.alt}
                fill
                sizes="(min-width:768px) 62vw, 92vw"
                className="object-cover"
              />
            ) : (
              <span className="absolute inset-0 grid place-items-center px-6 text-center text-[12.5px] text-muted-foreground">
                {block.alt}
              </span>
            )}
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-[12px] text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'stats':
      return (
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-8 gap-y-5 border-y border-border py-6">
          {block.items.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dd className="order-1 font-serif text-[clamp(1.8rem,3vw,2.3rem)] font-normal leading-none tabular-nums text-navy-accent">
                {item.value}
              </dd>
              <dt className="order-2 text-[11px] font-medium uppercase tracking-[.12em] text-muted-foreground">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      )

    case 'quote':
      return (
        <blockquote className="border-l-2 border-bronze py-0.5 pl-5">
          <p className="max-w-[58ch] font-serif text-[clamp(1.1rem,1.9vw,1.35rem)] font-light italic leading-[1.5] text-navy-accent">
            “{block.text}”
          </p>
          {block.attribution && (
            <footer className="mt-3 text-[12.5px] text-muted-foreground">
              {block.attribution}
            </footer>
          )}
        </blockquote>
      )
  }
}
