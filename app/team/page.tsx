import type { Metadata } from 'next'
import { LinkedInLink, PersonCard } from '@/components/site/PersonCard'
import { Container, Label, Rule } from '@/components/site/Section'
import { ADVISORS, BOARD, FELLOWS, LEADERSHIP } from '@/lib/data/team'

export const metadata: Metadata = {
  title: 'Team',
  description: 'West Ventures leadership, student fellows, board and advisors.',
}

function Group({
  index,
  first,
  title,
  text,
  children,
}: {
  index: string
  first?: boolean
  title: string
  text: string
  children: React.ReactNode
}) {
  return (
    <section className="pb-20 sm:pb-28">
      {!first && <Rule className="mb-10" />}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <Label className="mb-4">{index}</Label>
          <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
            {title}
          </h2>
          <p data-reveal-item style={{ '--d': 1 } as React.CSSProperties} className="mt-4 max-w-[60ch] text-[1rem] leading-[1.65]">
            {text}
          </p>
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

      <Container className="pt-[calc(124px+env(safe-area-inset-top))] sm:pt-[150px]">
        <Group first index="01" title="Leadership" text="The partners, department heads and venture leads who run the studio and its projects.">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-5 lg:grid-cols-5">
            {LEADERSHIP.map((p) => (
              <div key={p.name} data-reveal-item data-reveal-auto>
                <PersonCard person={p} size="sm" />
              </div>
            ))}
          </div>
        </Group>

        <Group index="02" title="Board" text="The board of directors. Austin Christian University holds a permanent seat.">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-5 lg:grid-cols-5">
            {BOARD.map((p) => (
              <div key={p.name} data-reveal-item data-reveal-auto>
                <PersonCard person={p} size="sm" />
              </div>
            ))}
          </div>
        </Group>

        <Group index="03" title="Student Fellows" text="Students who hold fellowships in the studio and work alongside the leadership team.">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-5 lg:grid-cols-5">
            {FELLOWS.map((p) => (
              <div key={p.name} data-reveal-item data-reveal-auto>
                <PersonCard person={p} size="sm" />
              </div>
            ))}
          </div>
        </Group>

        <Group index="04" title="Advisors" text="Founders, investors and operators who advise the studio and the companies it works with.">
          {/* Columns, not a grid: names run down each column, then to the next. */}
          <ul className="columns-1 gap-x-8 sm:columns-2 lg:columns-4">
            {ADVISORS.map((a) => (
              <li
                key={a.name}
                data-reveal-item
                data-reveal-auto
                className="flex min-h-[56px] break-inside-avoid items-center justify-between gap-3 border-b border-line py-2.5"
              >
                <span className="text-[1rem] text-ink">{a.name}</span>
                {a.linkedin && <LinkedInLink href={a.linkedin} name={a.name} className="h-7 w-7" />}
              </li>
            ))}
          </ul>
        </Group>
      </Container>
    </main>
  )
}
