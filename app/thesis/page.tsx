import type { Metadata } from 'next'
import { Container, Label, PageIntro, Rule } from '@/components/site/Section'
import { ThesisIndex } from '@/components/site/ThesisIndex'
import { THESIS, THESIS_SUMMARY, type ThesisBlock } from '@/lib/data/thesis'

export const metadata: Metadata = {
  title: 'Thesis',
  description: THESIS_SUMMARY,
}

const d = (n: number) => ({ '--d': n }) as React.CSSProperties

function Block({ block }: { block: ThesisBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p data-reveal-item className="max-w-[62ch] text-[1.06rem] leading-[1.72]">
          {block.text}
        </p>
      )

    case 'list':
      return (
        <ul className="flex flex-col">
          {block.items.map((item, i) => (
            <li
              key={item}
              data-reveal-item
              style={d(i)}
              className="flex gap-5 border-b border-line py-4 text-[1.02rem] leading-[1.6] text-ink/85 first:border-t"
            >
              <span className="mt-[0.55em] h-1 w-1 flex-none rounded-full bg-bronze" />
              {item}
            </li>
          ))}
        </ul>
      )

    case 'items':
      return (
        <div className="grid gap-3">
          {block.items.map((item, i) => (
            <div key={item.label} data-reveal-item style={d(i)} className="rounded-[22px] bg-panel p-6 sm:p-7">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bronze">{item.label}</p>
              <p className="mt-2 max-w-[62ch] text-[1rem] leading-[1.65] text-ink/80">{item.text}</p>
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-nudge link-line mt-3 inline-block text-[0.85rem] text-grey hover:text-ink"
                >
                  {item.linkText} <span className="arrow">↗</span>
                </a>
              )}
            </div>
          ))}
        </div>
      )

    case 'steps':
      return (
        <ol className="grid gap-3 sm:grid-cols-2">
          {block.items.map((step, i) => (
            <li key={step.label} data-reveal-item style={d(i)} className="flex flex-col gap-3 rounded-[22px] bg-panel p-6 sm:p-7">
              <span className="font-mono text-[0.68rem] tracking-[0.16em] text-faint">
                STEP {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[1.7rem] leading-none">{step.label}</h3>
              <p className="text-[0.98rem] leading-[1.62] text-ink/80">{step.text}</p>
            </li>
          ))}
        </ol>
      )

    case 'stats':
      return (
        <dl className={`grid gap-3 ${block.items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {block.items.map((s, i) => (
            <div key={s.label} data-reveal-item style={d(i)} className="flex flex-col gap-2 rounded-[22px] border border-line p-6">
              <dd className="order-1 font-serif text-[clamp(2.2rem,3.6vw,3rem)] font-semibold leading-none text-ink tabular-nums">
                {s.value}
              </dd>
              <dt className="order-2 text-[0.88rem] leading-[1.45]">{s.label}</dt>
            </div>
          ))}
        </dl>
      )

    case 'table':
      return (
        <>
        {/* Phones: one card per row. */}
        <div className="grid gap-3 sm:hidden">
          {block.rows.map((row) => (
            <div key={row.cells[0]} data-reveal-item className="rounded-[22px] border border-line p-5">
              <p className="font-serif text-[1.25rem] font-semibold text-ink">
                {row.href ? (
                  <a href={row.href} target="_blank" rel="noopener noreferrer" className="link-line">
                    {row.cells[0]}
                  </a>
                ) : (
                  row.cells[0]
                )}
              </p>
              {row.cells.slice(1).map((c, i) => (
                <div key={i} className="mt-3">
                  {block.head[i + 1] && (
                    <p className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-faint">{block.head[i + 1]}</p>
                  )}
                  <p className="mt-1 text-[0.95rem] leading-[1.55] text-ink/75">{c}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div data-reveal-item className="hidden overflow-x-auto rounded-[22px] border border-line sm:block" data-lenis-prevent>
          <table className="w-full min-w-[520px] border-collapse text-left text-[0.95rem]">
            <thead>
              <tr className="border-b border-line bg-panel">
                {block.head.map((h, i) => (
                  <th key={i} className="px-5 py-3.5 font-mono text-[0.68rem] font-normal uppercase tracking-[0.14em] text-faint">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.cells[0]} className="border-b border-line last:border-b-0">
                  {row.cells.map((c, i) => (
                    <td key={i} className={`px-5 py-4 align-top leading-[1.55] ${i === 0 ? 'whitespace-nowrap font-normal text-ink' : 'text-ink/75'}`}>
                      {i === 0 && row.href ? (
                        <a href={row.href} target="_blank" rel="noopener noreferrer" className="link-line">
                          {c}
                        </a>
                      ) : (
                        c
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )
  }
}

export default function ThesisPage() {
  return (
    <main>
      <PageIntro label="Thesis" title="Thesis and operating principles">
        <p>{THESIS_SUMMARY}</p>
      </PageIntro>

      <Container className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
        <aside>
          <ThesisIndex sections={THESIS.map(({ id, title }) => ({ id, title }))} />
        </aside>

        <div className="flex min-w-0 flex-col">
          {THESIS.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <Rule />
              <div className="flex flex-col gap-6 py-12 sm:py-16">
                <Label>
                  <span data-reveal-item className="inline-block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Label>
                <h2 data-reveal-item style={d(1)} className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.04]">
                  {section.title}
                </h2>
                {section.blocks.map((block, k) => (
                  <Block key={k} block={block} />
                ))}
              </div>
            </section>
          ))}

          <Rule />
          <div className="py-12">
            <Label className="mb-4">Sources</Label>
            <ul className="flex flex-col gap-2 text-[0.9rem]">
              <li>
                Bell, Chetty, Jaravel, Petkova and Van Reenen,{' '}
                <a className="link-line text-ink" href="https://www.nber.org/papers/w24062.pdf" target="_blank" rel="noopener noreferrer">
                  Who Becomes an Inventor in America? The Importance of Exposure to Innovation
                </a>
                , NBER
              </li>
              <li>
                Lubinski, Benbow and Kell,{' '}
                <a className="link-line text-ink" href="https://www.psychologicalscience.org/journals/psychological-science/0956797614551371/" target="_blank" rel="noopener noreferrer">
                  Life Paths and Accomplishments of Mathematically Precocious Males and Females Four Decades Later
                </a>
                , <em>Psychological Science</em> (2014)
              </li>
              <li>
                <a className="link-line text-ink" href="https://eclecticlight.co/2019/03/17/leonardo-the-apprentice-verrocchios-pupils/" target="_blank" rel="noopener noreferrer">
                  Leonardo the Apprentice: Verrocchio’s pupils
                </a>
                , The Eclectic Light Company
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </main>
  )
}
