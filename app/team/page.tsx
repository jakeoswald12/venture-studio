import type { Metadata } from 'next'
import Image from 'next/image'
import { HoverColumns, PageHero, PersonCard, SectionHead } from '@/components/modules/Blocks'
import { DragRow } from '@/components/modules/Scroll'
import { ADVISORS, BOARD, FELLOWS, LEADERSHIP, PROJECT_ADVISORS } from '@/lib/data/team'

export const metadata: Metadata = {
  title: 'Team',
  description: 'West Ventures leadership, project advisors, board, Student Fellows and firm advisors.',
}

const NameList = ({ people }: { people: { name: string; linkedin?: string }[] }) => (
  <div className="pad">
    <ul className="name-cols">
      {people.map((p) => (
        <li key={p.name}>
          {p.name}
          {p.linkedin && (
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`}>
              LinkedIn
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
)

export default function TeamPage() {
  return (
    <main>
      <PageHero
        lines={[
          <>
            Team <span className="em-rule" aria-hidden="true" /> leadership, advisors,
          </>,
          'board and Student Fellows',
        ]}
      />

      <SectionHead title="Leadership" />
      <HoverColumns
        items={LEADERSHIP.map((p) => ({
          title: p.name,
          top: (
            <>
              <span className="t-label">{p.title}</span>
              {p.photo && (
                <span className="hcol-photo" style={{ marginTop: 16 }}>
                  <Image src={p.photo} alt="" fill sizes="220px" style={{ objectPosition: p.photoPosition ?? 'center' }} />
                </span>
              )}
            </>
          ),
          body: (
            <>
              {(p.summary || p.bio) && <p style={{ margin: '0 0 12px' }}>{p.summary ?? p.bio}</p>}
              {[...(p.roles ?? []), ...(p.past ?? [])].map((r) => (
                <p key={`${r.title}-${r.org}`} className="subtle" style={{ margin: 0, fontSize: 14 }}>
                  {r.title},{' '}
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="bold">
                      {r.org}
                    </a>
                  ) : (
                    r.org
                  )}
                </p>
              ))}
              {p.linkedin && (
                <p style={{ margin: '12px 0 0' }}>
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
                    LinkedIn
                  </a>
                </p>
              )}
            </>
          ),
        }))}
      />

      <SectionHead title="Project Advisors" />
      <DragRow>
        {PROJECT_ADVISORS.map((p) => (
          <PersonCard key={p.name} person={p} />
        ))}
      </DragRow>

      <SectionHead title="Board" />
      <div className="pgrid-people">
        {BOARD.map((p) => (
          <PersonCard key={p.name} person={p} />
        ))}
      </div>

      <SectionHead title="Student Fellows" />
      <DragRow>
        {FELLOWS.map((p) => (
          <PersonCard key={p.name} person={p} />
        ))}
      </DragRow>

      <SectionHead title="Firm Advisors" />
      <NameList people={ADVISORS} />
    </main>
  )
}
