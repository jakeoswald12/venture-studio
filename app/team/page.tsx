import type { Metadata } from 'next'
import { PageHero, PersonCard, SectionHead } from '@/components/modules/Blocks'
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
        lines={['Iron sharpens iron.']}
      />

      <SectionHead title="Leadership" />
      <DragRow>
        {LEADERSHIP.map((p) => (
          <PersonCard key={p.name} person={p} />
        ))}
      </DragRow>

      <SectionHead title="Project Advisors" />
      <DragRow>
        {PROJECT_ADVISORS.map((p) => (
          <PersonCard key={p.name} person={p} />
        ))}
      </DragRow>

      <SectionHead title="Board" />
      <DragRow>
        {BOARD.map((p) => (
          <PersonCard key={p.name} person={p} />
        ))}
      </DragRow>

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
