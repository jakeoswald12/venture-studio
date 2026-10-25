import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CompanyCard, Pending, PersonAvatar, SectionLabel } from '@/components/portfolio/directory/PortfolioBits'
import { PORTFOLIO_STUDENTS, findCompany, findStudent } from '@/lib/data/portfolio-directory'

/**
 * /portfolio/student/[student] — one student's body of work.
 *
 * The mirror of the company page: the gallery is every venture they have
 * shipped on, each card linking back into the directory, so a founder can walk
 * company → student → another company without leaving the portfolio.
 *
 * No standing role under the name: a student can lead one project and
 * contribute to the next, so role belongs on the project card, not the person.
 *
 * GPA is deliberately not rendered here. Cumulative GPA is an education record
 * under FERPA and this page is public; see lib/data/portfolio-directory.ts.
 */

interface PageProps {
  params: Promise<{ student: string }>
}

export function generateStaticParams() {
  return PORTFOLIO_STUDENTS.map((s) => ({ student: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { student: slug } = await params
  const student = findStudent(slug)
  if (!student) return { title: 'Portfolio' }

  const ventures = student.projects
    .map((p) => findCompany(p.company)?.name)
    .filter(Boolean)
    .join(', ')
  const title = `${student.name} · Portfolio`
  const description = `${student.name} — West Ventures. Companies: ${ventures}.`

  return {
    title,
    description,
    alternates: { canonical: `/portfolio/student/${student.slug}` },
    openGraph: { url: `/portfolio/student/${student.slug}`, title, description, type: 'profile' },
  }
}

export default async function StudentProfilePage({ params }: PageProps) {
  const { student: slug } = await params
  const student = findStudent(slug)
  if (!student) notFound()

  const hasContact = Boolean(student.email || student.phone || student.linkedin)

  return (
    <>
      <main className="relative z-10 min-h-screen pt-[92px] sm:pt-28">
        <div className="mx-auto max-w-[1180px] px-5">
          <nav className="flex items-center gap-2 pt-5 text-[12.5px] text-muted-foreground">
            <Link
              href="/ventures"
              className="underline decoration-border underline-offset-[3px] hover:text-bronze"
            >
              Ventures
            </Link>
            <span>/</span>
            <span>{student.name}</span>
          </nav>

          <div className="grid items-start gap-9 pb-[72px] pt-[26px] md:grid-cols-[270px_1fr] md:gap-14">
            <aside className="flex flex-col gap-5">
              <PersonAvatar name={student.name} photo={student.photo} size="lg" filled />
              <h1 className="font-serif text-[clamp(1.7rem,3vw,2.15rem)] font-semibold leading-[1.08] tracking-[-.015em] text-navy-accent text-balance">
                {student.name}
              </h1>

              <dl className="flex flex-col border-t border-border">
                <div className="flex flex-col gap-px border-b border-border/60 py-[11px]">
                  <dt className="text-[10px] font-medium uppercase tracking-[.14em] text-muted-foreground">
                    Contact
                  </dt>
                  <dd className="m-0 flex flex-col gap-0.5 text-[13.5px] text-navy-accent">
                    {hasContact ? (
                      <>
                        {student.phone && <span>{student.phone}</span>}
                        {student.email && (
                          <a href={`mailto:${student.email}`} className="w-fit hover:text-bronze">
                            {student.email}
                          </a>
                        )}
                        {student.linkedin && (
                          <a
                            href={student.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit text-bronze hover:underline"
                          >
                            LinkedIn
                          </a>
                        )}
                      </>
                    ) : (
                      <span className="text-[12.5px]">
                        <Pending>Phone, email and LinkedIn go here</Pending>
                      </span>
                    )}
                  </dd>
                </div>
                <Fact label="Year in school">{student.yearInSchool}</Fact>
                <Fact label="Hometown">{student.hometown}</Fact>
              </dl>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[.14em] text-muted-foreground">
                  Bio
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-navy-accent">
                  {student.bio ?? (
                    <Pending>
                      Short bio and interests — supplied by the student, not yet collected.
                    </Pending>
                  )}
                </p>
                {student.interests && student.interests.length > 0 && (
                  <p className="mt-2 text-[12.5px] text-muted-foreground">
                    Interests: {student.interests.join(', ')}
                  </p>
                )}
              </div>
            </aside>

            <div className="flex min-w-0 flex-col gap-9">
              <section>
                <SectionLabel count={student.projects.length}>Companies worked on</SectionLabel>
                <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(215px,1fr))] gap-3.5">
                  {student.projects.map((project) => {
                    const company = findCompany(project.company)
                    if (!company) return null
                    return (
                      <CompanyCard
                        key={`${company.slug}-${project.cohort}`}
                        slug={company.slug}
                        name={company.name}
                        descriptor={company.descriptor}
                        live={Boolean(company.url)}
                        caption={
                          <>
                            {project.cohort} ·{' '}
                            <b className="font-medium text-bronze">
                              {project.role === 'Student Lead' ? 'Leader' : project.role}
                            </b>
                          </>
                        }
                      />
                    )
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

/** A rail fact, or an explicit empty slot when the roster data hasn't arrived. */
function Fact({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-px border-b border-border/60 py-[11px]">
      <dt className="text-[10px] font-medium uppercase tracking-[.14em] text-muted-foreground">
        {label}
      </dt>
      <dd className="m-0 text-[13.5px] text-navy-accent">
        {children ?? (
          <span className="text-[12.5px]">
            <Pending>Awaiting roster data</Pending>
          </span>
        )}
      </dd>
    </div>
  )
}
