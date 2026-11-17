import type { Metadata } from 'next'
import { Frame } from '@/components/site/Frame'
import { PersonGrid } from '@/components/site/PersonGrid'
import { LEADERSHIP, PROJECT_ADVISORS } from '@/lib/data/team'

/**
 * Leadership and Project Advisors on one grid. Not linked from the nav: it is
 * the page sent to the team itself, so it leaves out the board, Student
 * Fellows and firm advisors.
 */

export const metadata: Metadata = {
  title: 'Meet the Team',
  description: 'West Ventures leadership and project advisors.',
}

const PEOPLE = [...LEADERSHIP, ...PROJECT_ADVISORS]

export default function MeetTheTeamPage() {
  return (
    <main>
      <Frame className="pt-[calc(124px+env(safe-area-inset-top))] pb-20 sm:pt-[150px] sm:pb-28">
        <div className="mb-10">
          <h1 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
            Meet the Team
          </h1>
          <p data-reveal-item className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-grey">
            Leadership and Project Advisors · {PEOPLE.length} people
          </p>
        </div>
        <PersonGrid people={PEOPLE} />
      </Frame>
    </main>
  )
}
