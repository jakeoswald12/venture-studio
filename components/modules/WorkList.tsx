'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export interface WorkRow {
  slug: string
  name: string
  description?: string
  meta: string[]
  /** Filter tags this row matches. */
  tags: string[]
  href?: string
  external?: string
  image?: string
  focus?: number
}

/**
 * The work index: a typographic table, not a thumbnail grid. Each row is the
 * name, a short description and a stacked list in subtle grey. Imagery is held
 * back until hover, when rows with artwork open a strip of it and rows with a
 * case study show a label that slides up over a drawn line.
 */
export function WorkList({
  rows,
  filters,
  cta = 'View case study',
  compact,
}: {
  rows: WorkRow[]
  filters?: string[]
  cta?: string
  /** Short rows, for lists with a name and little else. */
  compact?: boolean
}) {
  const rowClass = compact ? 'row compact' : 'row'
  const [filter, setFilter] = useState<string | null>(null)
  const shown = filter ? rows.filter((r) => r.tags.includes(filter)) : rows

  return (
    <div>
      {filters && (
        <div className="filters">
          <span className="t-label">Filter by:</span>
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`pill ${filter === f ? 'is-selected' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(filter === f ? null : f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}
      <div>
        {shown.map((r) => {
          const inner = (
            <>
              <span className="row-name">{r.name}</span>
              <span className="row-desc">{r.description}</span>
              <span className="row-meta">
                {r.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </span>
              {r.image && (r.href || r.external) && (
                <span className="row-strip">
                  <Image src={r.image} alt="" fill sizes="(min-width: 967px) 66vw, 100vw" style={{ objectPosition: `${r.focus ?? 50}% 50%` }} />
                </span>
              )}
              {(r.href || r.external) && !compact && (
                <span className="row-cta">
                  <span>{r.href ? cta : 'Visit website'}</span>
                </span>
              )}
            </>
          )
          if (r.href)
            return (
              <Link key={r.slug} href={r.href} className={rowClass}>
                {inner}
              </Link>
            )
          if (r.external)
            return (
              <a key={r.slug} href={r.external} target="_blank" rel="noopener noreferrer" className={rowClass}>
                {inner}
              </a>
            )
          return (
            <div key={r.slug} className={rowClass}>
              {inner}
            </div>
          )
        })}
        <hr className="rule" />
      </div>
    </div>
  )
}
