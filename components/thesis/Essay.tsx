import Image from 'next/image'
import Link from 'next/link'
import { Frame } from '@/components/site/Frame'
import { Label, Rule } from '@/components/site/Section'
import { CARNEGIE } from '@/lib/data/thesis'

/**
 * Shared pieces for the essays linked from /thesis: a reading column with
 * wide plates, quotations, and reading lists at the end.
 */

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
      <Frame className="pt-[calc(108px+env(safe-area-inset-top))] sm:pt-[132px]">
        <article className="mx-auto max-w-[720px]">
          <Link href="/thesis" className="arrow-nudge font-mono text-[0.7rem] uppercase tracking-[0.16em] text-grey hover:text-ink">
            <span className="arrow inline-block rotate-180">→</span> Thesis
          </Link>
          <h1 data-reveal-item className="mt-8 text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.98]">
            {title}
          </h1>
          <p data-reveal-item style={{ '--d': 1 } as React.CSSProperties} className="mt-6 text-[clamp(1.15rem,1.8vw,1.35rem)] leading-[1.55] text-ink/80">
            {dek}
          </p>
          <p data-reveal-item style={{ '--d': 2 } as React.CSSProperties} className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
            West Ventures · {date}
          </p>
          <div className="mt-10 flex flex-col gap-6">{children}</div>
          <Link href="/thesis" className="arrow-nudge link-line mt-4 inline-block text-[1rem] text-ink">
            Read the West Ventures thesis <span className="arrow">→</span>
          </Link>
        </article>
      </Frame>
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
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">{cite}</figcaption>
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
      <p className="flex-none font-serif text-[clamp(2.4rem,4vw,3.2rem)] font-semibold leading-none text-[var(--g6)] tabular-nums">{value}</p>
      <p className="text-[0.98rem] leading-[1.6] text-ink/80">{children}</p>
    </div>
  )
}

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
          <p className="mt-4 font-serif text-[1.25rem] font-semibold leading-tight text-ink">{c.name}</p>
          <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[var(--g5)]">{c.role}</p>
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

/** The card on /thesis that links out to an essay. */
export function EssayCard({ href, title, text, image }: { href: string; title: string; text: string; image?: React.ReactNode }) {
  return (
    <Link
      href={href}
      data-reveal-item
      className="group mt-2 grid max-w-[760px] overflow-hidden rounded-[18px] border border-line transition-colors duration-500 hover:border-[var(--g4)] sm:grid-cols-[240px_minmax(0,1fr)]"
    >
      <div className="relative aspect-[3/2] bg-[var(--g1)] sm:aspect-auto">{image}</div>
      <div className="flex flex-col justify-center gap-2 p-6">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--g5)]">Essay</p>
        <p className="font-serif text-[1.45rem] font-semibold leading-tight text-ink">{title}</p>
        <p className="text-[0.95rem] leading-[1.55]">{text}</p>
        <span className="arrow-nudge mt-1 text-[0.9rem] text-ink">
          Read the essay <span className="arrow">→</span>
        </span>
      </div>
    </Link>
  )
}
