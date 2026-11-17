import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TitleAndText } from '@/components/modules/Blocks'
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

  return (
    <main>
      <header className="pad page-top">
        <p className="t-label" style={{ margin: '0 0 16px' }}>
          <Link href="/ventures" className="text-link">
            Ventures
          </Link>
        </p>
        <h1 className="serif t-display" data-io style={{ margin: 0 }}>
          <span className="line">
            <span>{student.name}</span>
          </span>
        </h1>
      </header>

      <dl className="grid12 cs-meta fade" data-io style={{ '--d': 3 } as React.CSSProperties}>
        <div className="d-1-4">
          <dt>Role</dt>
          <dd>{student.topRole === 'Student Lead' ? 'Leader' : student.topRole}</dd>
        </div>
        {student.yearInSchool && (
          <div style={{ gridColumn: 'span 4' }}>
            <dt>Year in school</dt>
            <dd>{student.yearInSchool}</dd>
          </div>
        )}
        {student.hometown && (
          <div style={{ gridColumn: 'span 4' }}>
            <dt>Hometown</dt>
            <dd>{student.hometown}</dd>
          </div>
        )}
        {(student.email || student.phone || student.linkedin) && (
          <div style={{ gridColumn: 'span 4' }}>
            <dt>Contact</dt>
            <dd style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {student.phone && <span>{student.phone}</span>}
              {student.email && <a href={`mailto:${student.email}`}>{student.email}</a>}
              {student.linkedin && (
                <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
            </dd>
          </div>
        )}
      </dl>

      {student.bio && (
        <TitleAndText label="Bio">
          <p className="t-intro" style={{ margin: 0 }}>
            {student.bio}
          </p>
          {student.interests && student.interests.length > 0 && (
            <p className="t-label" style={{ marginTop: 20 }}>
              Interests: {student.interests.join(', ')}
            </p>
          )}
        </TitleAndText>
      )}

      <div className="section">
        <p className="t-label pad" style={{ margin: '0 0 16px' }}>
          Companies worked on · {student.projects.length}
        </p>
        {student.projects.map((project) => {
          const company = findCompany(project.company)
          if (!company) return null
          return (
            <Link key={`${company.slug}-${project.cohort}`} href={`/portfolio/${company.slug}`} className="row">
              <span className="row-name">{company.name}</span>
              <span className="row-desc">{company.blurb ?? company.descriptor}</span>
              <span className="row-meta" style={{ gridColumn: '9 / span 2' }}>
                <span>{project.cohort}</span>
                <span>{project.role === 'Student Lead' ? 'Leader' : project.role}</span>
              </span>
              <span className="row-cta">
                <span>View case study</span>
              </span>
            </Link>
          )
        })}
        <hr className="rule" />
      </div>
    </main>
  )
}
