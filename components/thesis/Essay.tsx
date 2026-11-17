import Image from 'next/image'
import Link from 'next/link'
import { Label, Rule } from '@/components/site/Section'

/**
 * Shared pieces for the essays linked from /thesis: a reading column with
 * wide plates, quotations, and reading lists at the end.
 */

/** The essay's opening: title at display size, then the dek set large in the
 *  right half with the publication line under it. */
export function EssayHeader({ title, dek, date = 'November 2026', back = '/thesis' }: { title: string; dek: React.ReactNode; date?: string; back?: string }) {
  return (
    <>
      <header className="pad page-top">
        <p className="t-label" style={{ margin: '0 0 16px' }}>
          <Link href={back} className="text-link">
            Thesis
          </Link>
        </p>
        <h1 className="serif t-display" data-io style={{ margin: 0 }}>
          <span className="line">
            <span>{title}</span>
          </span>
        </h1>
      </header>
      <div className="grid12" style={{ paddingTop: 'clamp(40px, 6vw, 96px)' }}>
        <div className="d-1-4 t-label fade" data-io>
          West Ventures · {date}
        </div>
        <p className="t-intro d-5-7 fade" data-io style={{ margin: 0, '--d': 1 } as React.CSSProperties}>
          {dek}
        </p>
      </div>
    </>
  )
}

/** The reading column: held to the right-hand columns of the grid. */
export function EssayColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid12" style={{ paddingTop: 'clamp(48px, 6vw, 96px)' }}>
      <article className="essay-col">{children}</article>
    </div>
  )
}

export function EssayShell({
  title,
  dek,
  date = 'November 2026',
  children,
}: {
  title: string
  dek: string
  date?: string
  children: React.ReactNode
}) {
  return (
    <main>
      <EssayHeader title={title} dek={dek} date={date} />
      <EssayColumn>
        <div className="flex flex-col gap-6">{children}</div>
        <Link href="/thesis" className="text-link" style={{ marginTop: 24 }}>
          Read the West Ventures thesis <span aria-hidden="true">→</span>
        </Link>
      </EssayColumn>
    </main>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p data-reveal-item className="text-[1.12rem] leading-[1.78] text-ink/85">
      {children}
    </p>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 data-reveal-item className="mt-8 text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.08]">
      {children}
    </h2>
  )
}

export function Quote({ children, cite }: { children: React.ReactNode; cite: string }) {
  return (
    <figure data-reveal-item className="my-2 border-l-2 border-[var(--g4)] pl-6 sm:pl-8">
      <blockquote className="font-serif text-[clamp(1.25rem,2.2vw,1.55rem)] leading-[1.45] text-ink">{children}</blockquote>
      <figcaption className="mt-3 text-[0.68rem] text-faint">{cite}</figcaption>
    </figure>
  )
}

/** A figure that may run wider than the text column on large screens. */
export function Wide({ children, caption }: { children: React.ReactNode; caption?: React.ReactNode }) {
  return (
    <figure data-reveal-item className="my-4 lg:-mx-[8vw]">
      <div className="overflow-x-auto">{children}</div>
      {caption && <figcaption className="mt-3 text-[0.88rem] leading-[1.5] text-grey">{caption}</figcaption>}
    </figure>
  )
}

export function Plate({ src, w, h, caption, priority }: { src: string; w: number; h: number; caption: React.ReactNode; priority?: boolean }) {
  return (
    <figure data-reveal-item className="my-4 sm:-mx-[6vw] lg:-mx-[12vw]">
      <div className="overflow-hidden rounded-[10px] bg-panel">
        <Image src={src} alt="" width={w} height={h} sizes="(min-width:1024px) 1100px, 100vw" className="h-auto w-full" priority={priority} />
      </div>
      <figcaption className="mt-3 text-[0.88rem] leading-[1.5] text-grey">{caption}</figcaption>
    </figure>
  )
}

export function Stat({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div data-reveal-item className="my-2 flex flex-col gap-2 rounded-[18px] bg-[var(--g1)] p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
      <p className="flex-none font-serif text-[clamp(2.4rem,4vw,3.2rem)] font-light leading-none text-[var(--g6)] tabular-nums">{value}</p>
      <p className="text-[0.98rem] leading-[1.6] text-ink/80">{children}</p>
    </div>
  )
}

const CARNEGIE = [
  {
    name: 'Thomas Scott',
    role: 'Superintendent, Pennsylvania Railroad',
    text: 'Noticed a teenage telegraph operator and in 1853 made him his private secretary and telegrapher.',
  },
  {
    name: 'Andrew Carnegie',
    role: 'Scott’s secretary at 17',
    text: 'Succeeded Scott as superintendent of the Pittsburgh division in 1859, then built Carnegie Steel.',
  },
  {
    name: 'Charles M. Schwab',
    role: 'Stake driver at Carnegie’s Edgar Thomson Works',
    text: 'President of Carnegie Steel at 35, first president of U.S. Steel, then head of Bethlehem Steel.',
  },
]

/** Thomas Scott → Andrew Carnegie → Charles M. Schwab. */
export function CarnegieLine() {
  return (
    <ol className="grid gap-6 sm:grid-cols-3">
      {CARNEGIE.map((c, i) => (
        <li key={c.name} data-reveal-item data-reveal-auto className="relative">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 flex-none rounded-full bg-[var(--g5)]" />
            {i < CARNEGIE.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-[var(--g3)] sm:block" />}
          </div>
          <p className="mt-4 font-serif text-[1.25rem] font-light leading-tight text-ink">{c.name}</p>
          <p className="mt-1 text-[0.66rem] text-[var(--g5)]">{c.role}</p>
          <p className="mt-2 text-[0.95rem] leading-[1.6]">{c.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function Reading({
  reading,
  sources,
}: {
  reading: { author: string; work: string; year: string }[]
  sources: { title: string; href: string; site: string }[]
}) {
  return (
    <>
      <Rule className="mt-12" />
      <div className="grid gap-10 py-10 sm:grid-cols-2">
        <div>
          <Label className="mb-4">Further reading</Label>
          <ul className="flex flex-col gap-3 text-[0.95rem]">
            {reading.map((r) => (
              <li key={r.work}>
                <span className="text-ink">{r.author}</span>, <em>{r.work}</em> ({r.year})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label className="mb-4">Sources</Label>
          <ul className="flex flex-col gap-3 text-[0.95rem]">
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line text-ink">
                  {s.title}
                </a>
                , {s.site}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

/** The link from a thesis section out to its essay. */
export function EssayCard({ href, title, text, image }: { href: string; title: string; text: string; image?: React.ReactNode }) {
  return (
    <Link href={href} className="essay-inline" data-cursor="Read">
      <div className="mask" data-io>
        <div className="mask-in">{image}</div>
      </div>
      <div>
        <p className="t-label" style={{ margin: 0 }}>
          Essay
        </p>
        <p className="serif t-h4" style={{ margin: '2px 0 6px' }}>
          {title}
        </p>
        <p className="t-body" style={{ margin: 0 }}>
          {text}
        </p>
      </div>
    </Link>
  )
}
