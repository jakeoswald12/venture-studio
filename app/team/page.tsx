import type { Metadata } from 'next'
import { LinkedInLink, PersonCard } from '@/components/site/PersonCard'
import { Frame, TILE_GRID } from '@/components/site/Frame'
import { Rule } from '@/components/site/Section'
import { ADVISORS, BOARD, FELLOWS, LEADERSHIP, PROJECT_ADVISORS } from '@/lib/data/team'

export const metadata: Metadata = {
  title: 'Team',
  description: 'West Ventures leadership, project advisors, board, Student Fellows and firm advisors.',
}

function Group({
  first,
  title,
  children,
}: {
  first?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="pb-20 sm:pb-28">
      {!first && <Rule className="mb-10" />}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  )
}

export default function TeamPage() {
  return (
    <main>
      <h1 className="sr-only">Team</h1>

      <Frame className="pt-[calc(124px+env(safe-area-inset-top))] sm:pt-[150px]">
        <Group first title="Leadership">
          <div className={TILE_GRID}>
            {LEADERSHIP.map((p) => (
              <div key={p.name} data-reveal-item data-reveal-auto>
                <PersonCard person={p} />
              </div>
            ))}
          </div>
        </Group>

        <Group title="Project Advisors">
          <div className={TILE_GRID}>
            {PROJECT_ADVISORS.map((p) => (
              <div key={p.name} data-reveal-item data-reveal-auto>
                <PersonCard person={p} />
              </div>
            ))}
          </div>
        </Group>

        <Group title="Board">
          <div className={TILE_GRID}>
            {BOARD.map((p) => (
              <div key={p.name} data-reveal-item data-reveal-auto>
                <PersonCard person={p} />
              </div>
            ))}
          </div>
        </Group>

        <Group title="Student Fellows">
          <div className={TILE_GRID}>
            {FELLOWS.map((p) => (
              <div key={p.name} data-reveal-item data-reveal-auto>
                <PersonCard person={p} />
              </div>
            ))}
          </div>
        </Group>

        <Group title="Firm Advisors">
          {/* Columns, not a grid: names run down each column, then to the next. */}
          <ul className="columns-1 gap-x-8 sm:columns-2 lg:columns-5 lg:gap-x-6 xl:columns-7 xl:gap-x-2.5">
            {ADVISORS.map((a) => (
              <li
                key={a.name}
                data-reveal-item
                data-reveal-auto
                className="flex min-h-[56px] break-inside-avoid items-center justify-between gap-3 border-b border-line py-2.5"
              >
                <span className="text-[1rem] text-ink xl:text-[0.92rem]">{a.name}</span>
                {a.linkedin && <LinkedInLink href={a.linkedin} name={a.name} className="h-7 w-7" />}
              </li>
            ))}
          </ul>
        </Group>
      </Frame>
    </main>
  )
}
