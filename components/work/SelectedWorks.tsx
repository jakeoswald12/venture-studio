'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { PortfolioCompany } from '@/lib/data/portfolio-directory'
import { WorkArt } from './WorkArt'

/**
 * The homepage's first screen. Selected ventures are listed down the left;
 * the right side shows the artwork, description and disciplines of whichever
 * one is hovered or focused. Each name opens that venture's case study.
 *
 * Below lg the two columns become one list of cards, each with its own image.
 */
export function SelectedWorks({ works }: { works: PortfolioCompany[] }) {
  const [active, setActive] = useState(0)
  const current = works[active]

  return (
    <section
      aria-labelledby="selected-work"
      className="mx-auto max-w-[1600px] pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] pt-[calc(96px+env(safe-area-inset-top))] sm:px-8 lg:min-h-[100svh] lg:pt-[calc(110px+env(safe-area-inset-top))]"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        {/* Left: statement and list */}
        <div className="flex flex-col">
          <h1 className="hero-in max-w-[22ch] text-[clamp(1.5rem,2.3vw,2.1rem)] font-semibold leading-[1.15]">
            West Ventures is a venture studio. Student teams work on real companies, and the studio builds companies of its own.
          </h1>

          <p id="selected-work" className="mb-3 mt-10 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint lg:mt-14">
            Selected work
          </p>

          {/* Desktop list */}
          <ol className="hidden lg:block">
            {works.map((c, i) => (
              <li key={c.slug} className="hero-in" style={{ animationDelay: `${120 + i * 55}ms` }}>
                <Link
                  href={`/portfolio/${c.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={`${c.name}: view case study`}
                  className="group flex items-baseline gap-4 border-t border-line py-[clamp(5px,0.9vh,11px)] last:border-b"
                >
                  <span className={`w-6 font-mono text-[0.68rem] tracking-[0.1em] transition-colors duration-300 ${i === active ? 'text-bronze' : 'text-faint'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-serif text-[clamp(1.5rem,4.3vh,2.9rem)] font-semibold leading-[1.08] tracking-[-0.015em] transition-[color,transform] duration-500 ease-[var(--ease-out-soft)] ${
                      i === active ? 'translate-x-1.5 text-ink' : 'text-faint'
                    }`}
                  >
                    {c.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto self-center text-[1.1rem] text-ink transition-all duration-500 ease-[var(--ease-out-soft)] ${
                      i === active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                    }`}
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: the active venture */}
        <div className="hidden lg:block">
          <div className="sticky top-[calc(88px+env(safe-area-inset-top))]">
            <Link
              href={`/portfolio/${current.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="hero-in relative block h-[min(64svh,720px)] overflow-hidden rounded-[22px] bg-panel"
            >
              {works.map((c, i) => (
                <div key={c.slug} className={`work-plate absolute inset-0 ${i === active ? 'is-active' : ''}`}>
                  <WorkArt company={c} sizes="(min-width: 1600px) 900px, 58vw" priority={i === 0} />
                </div>
              ))}
            </Link>
            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-8" aria-live="polite">
              <div key={current.slug} className="page-enter">
                <p className="font-serif text-[1.35rem] font-semibold leading-tight text-ink">
                  {current.name}
                  {current.descriptor && <span className="font-sans text-[0.95rem] font-light text-grey"> · {current.descriptor}</span>}
                </p>
                {current.blurb && <p className="mt-2 line-clamp-2 max-w-[62ch] text-[0.95rem] leading-[1.55]">{current.blurb}</p>}
                {!!current.disciplines?.length && (
                  <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
                    {current.disciplines.join(' · ')}
                  </p>
                )}
              </div>
              <Link href={`/portfolio/${current.slug}`} className="arrow-nudge link-line whitespace-nowrap pb-0.5 text-[0.95rem] text-ink">
                View case study <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile and tablet: cards */}
        <ol className="grid gap-8 sm:grid-cols-2 lg:hidden">
          {works.map((c, i) => (
            <li key={c.slug} data-reveal-item>
              <Link href={`/portfolio/${c.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-panel">
                  <WorkArt company={c} sizes="(min-width: 640px) 50vw, 100vw" priority={i === 0} />
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono text-[0.68rem] tracking-[0.1em] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-[1.5rem] font-semibold leading-tight text-ink">{c.name}</span>
                </div>
                {c.descriptor && <p className="mt-1 pl-[2.1rem] text-[0.92rem]">{c.descriptor}</p>}
                <p className="arrow-nudge mt-2 pl-[2.1rem] text-[0.9rem] text-ink">
                  View case study <span className="arrow">→</span>
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
