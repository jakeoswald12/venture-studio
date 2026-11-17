'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { PortfolioCompany } from '@/lib/data/portfolio-directory'
import { WorkArt } from './WorkArt'

/**
 * Every venture as one list. Selected ventures show their artwork and link to
 * a case study. The rest are plain rows: name, one-line description and
 * disciplines, with no link.
 *
 * `filters` adds the "Filter by" bar (used on /ventures, not on the homepage).
 */
export function WorkIndex({
  works,
  selected,
  filters = false,
}: {
  works: PortfolioCompany[]
  selected: string[]
  filters?: boolean
}) {
  const selectedSet = useMemo(() => new Set(selected), [selected])
  const disciplines = useMemo(() => {
    const count = new Map<string, number>()
    for (const c of works) for (const d of c.disciplines ?? []) count.set(d, (count.get(d) ?? 0) + 1)
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([d]) => d)
  }, [works])
  const [filter, setFilter] = useState<string | null>(null)

  const shown = filter === null ? works : filter === 'Selected' ? works.filter((c) => selectedSet.has(c.slug)) : works.filter((c) => c.disciplines?.includes(filter))

  const chip = (label: string, value: string | null) => (
    <button
      key={label}
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={`rounded-full border px-4 py-1.5 text-[0.85rem] transition-colors duration-300 ${
        filter === value ? 'border-ink bg-ink text-paper' : 'border-line text-grey hover:border-faint hover:text-ink'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div>
      {filters && (
        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter ventures">
          <span className="mr-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint">Filter by</span>
          {chip('All', null)}
          {chip('Selected', 'Selected')}
          {disciplines.map((d) => chip(d, d))}
        </div>
      )}

      <ul className="border-t border-line">
        {shown.map((c) => {
          const featured = selectedSet.has(c.slug)
          const row = (
            <div className="grid items-start gap-x-8 gap-y-2 py-6 md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_minmax(0,3fr)_9.5rem] md:py-7">
              <h3 className={`text-[1.5rem] leading-tight transition-colors duration-300 ${featured ? 'group-hover:text-bronze' : ''}`}>{c.name}</h3>
              <p className="max-w-[58ch] text-[0.97rem] leading-[1.55]">
                {c.blurb ?? c.descriptor ?? ''}
                {c.blurb && c.descriptor ? <span className="mt-1 block text-[0.85rem] text-faint">{c.descriptor}</span> : null}
              </p>
              <p className="font-mono text-[0.68rem] uppercase leading-[1.9] tracking-[0.14em] text-faint">
                {(c.disciplines ?? []).join(' · ')}
              </p>
              <p className="text-[0.9rem] md:text-right">
                {featured && (
                  <span className="arrow-nudge link-line pb-0.5 text-ink">
                    View case study <span className="arrow">→</span>
                  </span>
                )}
              </p>
              {featured && (
                <div className="relative mt-3 h-[clamp(200px,30vw,440px)] overflow-hidden rounded-[18px] bg-panel md:col-span-4">
                  <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]">
                    <WorkArt company={c} sizes="(min-width: 1600px) 1560px, 96vw" />
                  </div>
                </div>
              )}
            </div>
          )
          return (
            <li key={c.slug} className="border-b border-line">
              {featured ? (
                <Link href={`/portfolio/${c.slug}`} className="group block" aria-label={`${c.name}: view case study`}>
                  {row}
                </Link>
              ) : (
                row
              )}
            </li>
          )
        })}
      </ul>
      {shown.length === 0 && <p className="py-10 text-[0.97rem]">No ventures match this filter.</p>}
    </div>
  )
}
