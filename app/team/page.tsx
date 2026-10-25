import type { Metadata } from 'next'
import { LinkedInLink, PersonCard } from '@/components/site/PersonCard'
import { Container, Label, PageIntro, Rule } from '@/components/site/Section'
import { ADVISORS, BOARD, FELLOWS, LEADERSHIP } from '@/lib/data/team'

export const metadata: Metadata = {
  title: 'Team',
  description: 'West Ventures leadership, student fellows, board and advisors.',
}

const d = (n: number) => ({ '--d': n % 8 }) as React.CSSProperties

function Group({
  index,
  title,
  count,
  children,
}: {
  index: string
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <section className="pb-20 sm:pb-28">
      <Rule className="mb-10" />
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <Label className="mb-4">{index}</Label>
          <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
            {title}
          </h2>
        </div>
        <span className="font-mono text-[0.7rem] tracking-[0.14em] text-faint tabular-nums">{count}</span>
      </div>
      {children}
    </section>
  )
}

export default function TeamPage() {
  return (
    <main>
      <PageIntro label="Team" title="Team">
        <p>Leadership, student fellows, board and advisors.</p>
      </PageIntro>

      <Container>
        <Group index="01" title="Leadership" count={LEADERSHIP.length}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {LEADERSHIP.map((p, i) => (
              <div key={p.name} data-reveal-item style={d(i)}>
                <PersonCard person={p} />
              </div>
            ))}
          </div>
        </Group>

        <Group index="02" title="Student Fellows" count={FELLOWS.length}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-5 lg:grid-cols-5">
            {FELLOWS.map((p, i) => (
              <div key={p.name} data-reveal-item style={d(i)}>
                <PersonCard person={p} size="sm" />
              </div>
            ))}
          </div>
        </Group>

        <Group index="03" title="Board" count={BOARD.length}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-5 lg:grid-cols-5">
            {BOARD.map((p, i) => (
              <div key={p.name} data-reveal-item style={d(i)}>
                <PersonCard person={p} size="sm" />
              </div>
            ))}
          </div>
        </Group>

        <Group index="04" title="Advisors" count={ADVISORS.length}>
          <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {ADVISORS.map((a, i) => (
              <li
                key={a.name}
                data-reveal-item
                style={d(i)}
                className="flex min-h-[56px] items-center justify-between gap-3 border-b border-line py-2.5"
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
