'use client'

import Image from 'next/image'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Person, Role } from '@/lib/data/team'
import { TILE_GRID } from '@/components/site/Frame'
import { LinkedInLink, PersonCard, initials, tint } from '@/components/site/PersonCard'

/**
 * The team tile grid with expanding cards.
 *
 * A person with `summary`, `roles` or `past` opens on hover (or on tap, Enter
 * or Space): the tile grows in place over several grid cells and the other
 * tiles flow around it. The open card stays anchored on the cell the pointer
 * is in, so it never moves out from under the cursor. People without those
 * fields keep the plain tile.
 *
 * From five columns up the open card covers 4 x 2 cells. Below that it takes
 * the full row at its natural height.
 */

const OPEN_DELAY = 140
const CLOSE_DELAY = 220
const MOVE_MS = 460
const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)'

function expandable(p: Person) {
  return Boolean(p.summary || p.roles?.length || p.past?.length)
}

interface Placement {
  index: number
  col: number
  row: number
  /** True when the card covers a fixed block of cells (wide grids). */
  block: boolean
}

export function PersonGrid({ people }: { people: Person[] }) {
  const grid = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Placement | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const armed = useRef<number | null>(null)
  const before = useRef<Map<Element, DOMRect> | null>(null)
  const lastPointer = useRef<string>('mouse')

  const tiles = () => Array.from(grid.current?.children ?? []) as HTMLElement[]

  /** Remember where every tile is, so the layout change can be animated. */
  const snapshot = () => {
    before.current = new Map(tiles().map((el) => [el, el.getBoundingClientRect()]))
  }

  const place = useCallback((index: number): Placement | null => {
    const g = grid.current
    const el = tiles()[index]
    if (!g || !el) return null
    const cs = getComputedStyle(g)
    const cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length
    const gap = parseFloat(cs.columnGap) || 0
    const gr = g.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const cell = (gr.width - gap * (cols - 1)) / cols
    const block = cols >= 5
    const span = block ? 4 : cols
    let col = Math.round((r.left - gr.left) / (cell + gap)) + 1
    col = Math.max(1, Math.min(col, cols - span + 1))
    // Row = how many distinct tile tops sit above this one.
    const tops = Array.from(new Set(tiles().map((t) => Math.round(t.getBoundingClientRect().top)))).sort((a, b) => a - b)
    const row = tops.filter((t) => t < Math.round(r.top) - 1).length + 1
    return { index, col, row, block }
  }, [])

  const show = useCallback(
    (index: number | null) => {
      const next = index === null ? null : place(index)
      snapshot()
      setOpen(next)
    },
    [place],
  )

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
    armed.current = null
  }

  useEffect(() => clearTimers, [])

  // Animate from the old layout to the new one (FLIP). Tiles slide to their
  // new cells; the card that just opened unfolds from the cell it started in.
  useLayoutEffect(() => {
    const prev = before.current
    before.current = null
    if (!prev || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = tiles()
    els.forEach((el, i) => {
      const a = prev.get(el)
      if (!a) return
      const b = el.getBoundingClientRect()
      el.style.transition = 'none'
      if (open && i === open.index) {
        const t = Math.max(0, a.top - b.top)
        const l = Math.max(0, a.left - b.left)
        const r = Math.max(0, b.right - a.right)
        const bt = Math.max(0, b.bottom - a.bottom)
        el.style.clipPath = `inset(${t}px ${r}px ${bt}px ${l}px round 7px)`
      } else {
        const dx = a.left - b.left
        const dy = a.top - b.top
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return
        el.style.transform = `translate(${dx}px, ${dy}px)`
      }
    })
    // Commit the starting positions, then let them go.
    void grid.current?.offsetWidth
    els.forEach((el) => {
      el.style.transition = `transform ${MOVE_MS}ms ${EASE}, clip-path ${MOVE_MS}ms ${EASE}`
      el.style.transform = ''
      if (el.style.clipPath) el.style.clipPath = 'inset(0px round 7px)'
    })
    const done = setTimeout(() => {
      els.forEach((el) => {
        el.style.transition = ''
        el.style.clipPath = ''
      })
    }, MOVE_MS + 40)
    return () => clearTimeout(done)
  }, [open])

  // A resize changes the column count, so close rather than keep a stale block.
  useEffect(() => {
    if (!open) return
    const onResize = () => setOpen(null)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') show(null)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, show])

  const arm = (i: number) => {
    if (closeTimer.current && open?.index === i) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    if (open?.index === i || armed.current === i) return
    if (openTimer.current) clearTimeout(openTimer.current)
    armed.current = i
    openTimer.current = setTimeout(() => {
      armed.current = null
      openTimer.current = null
      if (closeTimer.current) clearTimeout(closeTimer.current)
      closeTimer.current = null
      show(i)
    }, OPEN_DELAY)
  }

  const disarm = (i: number) => {
    if (armed.current === i && openTimer.current) {
      clearTimeout(openTimer.current)
      openTimer.current = null
      armed.current = null
    }
    if (open?.index === i && !closeTimer.current) {
      closeTimer.current = setTimeout(() => {
        closeTimer.current = null
        show(null)
      }, CLOSE_DELAY)
    }
  }

  return (
    <div ref={grid} className={`${TILE_GRID} [grid-auto-flow:row_dense]`}>
      {people.map((p, i) => {
        const can = expandable(p)
        const isOpen = open?.index === i
        const style: React.CSSProperties | undefined =
          isOpen && open
            ? open.block
              ? { gridColumn: `${open.col} / span 4`, gridRow: `${open.row} / span 2` }
              : { gridColumn: '1 / -1', gridRow: `${open.row}` }
            : undefined
        return (
          <div
            key={p.name}
            style={style}
            className={`relative ${isOpen ? 'z-10' : ''} ${can ? 'cursor-pointer rounded-[7px] outline-none focus-visible:ring-2 focus-visible:ring-bronze' : ''}`}
            tabIndex={can ? 0 : undefined}
            role={can ? 'button' : undefined}
            aria-expanded={can ? isOpen : undefined}
            aria-label={can ? `${p.name}, ${p.title}. Show details` : undefined}
            onPointerDown={(e) => {
              lastPointer.current = e.pointerType
            }}
            onPointerEnter={can ? (e) => e.pointerType === 'mouse' && arm(i) : undefined}
            onPointerMove={can ? (e) => e.pointerType === 'mouse' && arm(i) : undefined}
            onPointerLeave={can ? (e) => e.pointerType === 'mouse' && disarm(i) : undefined}
            onClick={
              can
                ? (e) => {
                    if ((e.target as HTMLElement).closest('a')) return
                    // A mouse already opened it by hovering; a tap toggles.
                    if (lastPointer.current === 'mouse') {
                      if (!isOpen) {
                        clearTimers()
                        show(i)
                      }
                      return
                    }
                    clearTimers()
                    show(isOpen ? null : i)
                  }
                : undefined
            }
            onKeyDown={
              can
                ? (e) => {
                    if (e.target !== e.currentTarget) return
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      clearTimers()
                      show(isOpen ? null : i)
                    }
                  }
                : undefined
            }
          >
            {/* The reveal observer writes its own class on this element, so its className never changes. */}
            <div data-reveal-item data-reveal-auto className="h-full">
              {isOpen ? (
                <div className={open?.block ? 'absolute inset-0' : 'h-full'}>
                  <ExpandedCard person={p} fill={Boolean(open?.block)} />
                </div>
              ) : (
                <PersonCard person={p} />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function OutLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} website`}
      title={href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
      className="ml-1.5 inline-grid h-5 w-5 flex-none translate-y-[4px] place-items-center rounded-full border border-line text-grey transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
    >
      <svg viewBox="0 0 12 12" aria-hidden="true" className="h-2.5 w-2.5 fill-none stroke-current" strokeWidth="1.6">
        <path d="M3 9 9 3M4.2 3H9v4.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

function Roles({ label, roles }: { label: string; roles: Role[] }) {
  return (
    <div className="mt-3.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{label}</p>
      <ul className="mt-1.5 space-y-1.5">
        {roles.map((r) => (
          <li key={`${r.title}-${r.org}`} className="text-[13.5px] leading-snug">
            <span className="text-ink">{r.title}</span>
            <span className="text-grey">, {r.org}</span>
            {r.url && <OutLink href={r.url} label={r.org} />}
            {r.note && <span className="block text-[12.5px] text-grey">{r.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The open card: a smaller portrait, a larger name, and what they do. */
function ExpandedCard({ person, fill }: { person: Person; fill: boolean }) {
  return (
    <article
      data-lenis-prevent
      className={`card-open flex gap-4 rounded-[7px] border border-line bg-panel p-4 text-left shadow-[var(--shadow)] sm:gap-5 sm:p-5 ${
        fill ? 'h-full overflow-y-auto' : 'flex-col sm:flex-row'
      }`}
    >
      <div className={`flex-none ${fill ? 'w-[26%] max-w-[210px]' : 'w-[104px] sm:w-[150px]'}`}>
        <div className="relative aspect-square overflow-hidden rounded-[6px] bg-card">
          {person.photo ? (
            <Image
              src={person.photo}
              alt={person.name}
              fill
              sizes="220px"
              className="object-cover"
              style={{ objectPosition: person.photoPosition ?? 'center' }}
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center font-serif text-[1.8rem] font-medium text-white/25"
              style={{ backgroundColor: tint(person.name) }}
            >
              {initials(person.name)}
            </span>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-[clamp(1.45rem,2.1vw,2rem)] font-medium leading-[1.05] text-ink">
              {person.name}
            </h3>
            <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-bronze">{person.title}</p>
          </div>
          {person.linkedin && <LinkedInLink href={person.linkedin} name={person.name} className="h-7 w-7" />}
        </div>
        {person.summary && <p className="mt-3 text-[13.5px] leading-[1.5] text-ink/85">{person.summary}</p>}
        {person.roles && person.roles.length > 0 && <Roles label="Now" roles={person.roles} />}
        {person.past && person.past.length > 0 && <Roles label="Previously" roles={person.past} />}
      </div>
    </article>
  )
}
