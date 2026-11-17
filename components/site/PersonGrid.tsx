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
 * or Space). The tile grows into a card three cells wide and two tall. The
 * portrait stays exactly where the tile was, at the same size, in the card's
 * top-left corner; the details sit in one column beside it. Near the right
 * edge the card shifts left so it fits, and the portrait slides with it.
 *
 * Every change is one motion: when another card opens, the open one folds
 * back into its portrait at the same time as the new one unfolds, and the
 * other tiles slide to their new places alongside. The folding card is a
 * short-lived copy laid over the grid while the real tile slides home.
 *
 * On a phone (two columns) the card takes the full row at its natural height.
 */

const OPEN_DELAY = 170
const CLOSE_DELAY = 260
const MOVE_MS = 720
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const SPAN = 3

function expandable(p: Person) {
  return Boolean(p.summary || p.roles?.length || p.past?.length)
}

interface Placement {
  index: number
  col: number
  row: number
  /** True when the card covers a fixed 3 x 2 block of cells. */
  block: boolean
  /** One cell's width in px; the portrait keeps this size. */
  cell: number
}

interface Ghost {
  node: HTMLElement
  left: number
  top: number
  width: number
  height: number
  cell: number
}

const reduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export function PersonGrid({ people, showTitle = true }: { people: Person[]; showTitle?: boolean }) {
  const grid = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Placement | null>(null)
  const openRef = useRef<Placement | null>(null)
  const before = useRef<Map<Element, DOMRect> | null>(null)
  const ghost = useRef<Ghost | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastPointer = useRef('mouse')

  const tiles = () => Array.from(grid.current?.querySelectorAll<HTMLElement>(':scope > [data-slot]') ?? [])

  /**
   * Where a card for `index` goes, measured from the layout as it is now
   * (offsets ignore in-flight transforms), so the card opens on the tile the
   * pointer is on even while another card is still open.
   */
  const place = useCallback((index: number): Placement | null => {
    const g = grid.current
    const all = tiles()
    const el = all[index]
    if (!g || !el) return null
    const cs = getComputedStyle(g)
    const cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length
    const gap = parseFloat(cs.columnGap) || 0
    const cell = (g.clientWidth - gap * (cols - 1)) / cols
    const block = cols >= SPAN
    let col = Math.round(el.offsetLeft / (cell + gap)) + 1
    if (block) col = Math.max(1, Math.min(col, cols - SPAN + 1))
    const tops = Array.from(new Set(all.map((t) => t.offsetTop))).sort((a, b) => a - b)
    const row = tops.filter((t) => t < el.offsetTop - 1).length + 1
    return { index, col, row, block, cell }
  }, [])

  /** Switch the open card in one step; the layout effect animates it. */
  const go = useCallback(
    (index: number | null) => {
      const cur = openRef.current
      if ((cur?.index ?? null) === index) return
      const next = index === null ? null : place(index)
      const g = grid.current
      if (!g) return
      before.current = new Map(tiles().map((el) => [el, el.getBoundingClientRect()]))
      // Keep a copy of the card that is closing so it can fold away in place.
      ghost.current = null
      if (cur && !reduced()) {
        const el = tiles()[cur.index]
        const card = el?.querySelector<HTMLElement>('article')
        if (el && card) {
          const gr = g.getBoundingClientRect()
          const r = el.getBoundingClientRect()
          ghost.current = {
            node: card.cloneNode(true) as HTMLElement,
            left: r.left - gr.left,
            top: r.top - gr.top,
            width: r.width,
            height: r.height,
            cell: cur.cell,
          }
        }
      }
      openRef.current = next
      setOpen(next)
    },
    [place],
  )

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
  }
  useEffect(() => clearTimers, [])

  // FLIP: every tile slides from where it was, the new card unfolds from its
  // tile, and the old card's copy folds back toward its portrait, together.
  useLayoutEffect(() => {
    const prev = before.current
    before.current = null
    const g = grid.current
    const els = tiles()
    els.forEach((el, i) => {
      if (!open || i !== open.index) el.style.clipPath = ''
    })
    if (!prev || !g || reduced()) return

    const gh = ghost.current
    ghost.current = null
    let ghostEl: HTMLElement | null = null
    if (gh) {
      ghostEl = gh.node
      ghostEl.removeAttribute('data-lenis-prevent')
      ghostEl.setAttribute('aria-hidden', 'true')
      Object.assign(ghostEl.style, {
        position: 'absolute',
        left: `${gh.left}px`,
        top: `${gh.top}px`,
        width: `${gh.width}px`,
        height: `${gh.height}px`,
        margin: '0',
        zIndex: '5',
        pointerEvents: 'none',
        transition: 'none',
        clipPath: 'inset(0px 0px 0px 0px round 7px)',
        opacity: '1',
      })
      // The real tile carries the portrait home; the copy only shows the details.
      const photo = ghostEl.querySelector<HTMLElement>('[data-photo]')
      if (photo) photo.style.visibility = 'hidden'
      ghostEl.querySelectorAll<HTMLElement>('.card-text').forEach((t) => (t.style.animation = 'none'))
      g.appendChild(ghostEl)
    }

    els.forEach((el, i) => {
      const a = prev.get(el)
      if (!a) return
      const b = el.getBoundingClientRect()
      el.style.transition = 'none'
      if (open && i === open.index) {
        const t = Math.max(0, a.top - b.top)
        const l = Math.max(0, a.left - b.left)
        const r = Math.max(0, b.right - a.right)
        const bt = Math.max(0, b.bottom - Math.min(a.bottom, a.top + a.width))
        el.style.clipPath = `inset(${t}px ${r}px ${bt}px ${l}px round 7px)`
        el.style.transform = ''
        const photo = el.querySelector<HTMLElement>('[data-photo]')
        if (photo && (Math.abs(a.left - b.left) > 0.5 || Math.abs(a.top - b.top) > 0.5)) {
          photo.style.transition = 'none'
          photo.style.transform = `translate(${a.left - b.left}px, ${a.top - b.top}px)`
        }
      } else {
        // A card that just closed starts from its portrait, the card's top-left cell.
        const dx = a.left - b.left
        const dy = a.top - b.top
        el.style.transform = Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 ? '' : `translate(${dx}px, ${dy}px)`
      }
    })

    void g.offsetWidth
    els.forEach((el) => {
      el.style.transition = `transform ${MOVE_MS}ms ${EASE}, clip-path ${MOVE_MS}ms ${EASE}`
      el.style.transform = ''
      if (el.style.clipPath) el.style.clipPath = 'inset(0px 0px 0px 0px round 7px)'
      const photo = el.querySelector<HTMLElement>('[data-photo]')
      if (photo && photo.style.transform) {
        photo.style.transition = `transform ${MOVE_MS}ms ${EASE}`
        photo.style.transform = ''
      }
    })
    if (ghostEl && gh) {
      ghostEl.style.transition = `clip-path ${MOVE_MS}ms ${EASE}, opacity ${Math.round(MOVE_MS * 0.55)}ms ease`
      ghostEl.style.clipPath = `inset(0px ${Math.max(0, gh.width - gh.cell)}px ${Math.max(0, gh.height - gh.cell)}px 0px round 7px)`
      ghostEl.style.opacity = '0'
    }

    const done = setTimeout(() => {
      ghostEl?.remove()
      els.forEach((el) => {
        el.style.transition = ''
        if (!open || el !== els[open.index]) el.style.clipPath = ''
        else el.style.clipPath = ''
      })
    }, MOVE_MS + 40)
    return () => {
      clearTimeout(done)
      ghostEl?.remove()
    }
  }, [open])

  // A resize changes the column count, so close rather than keep a stale block.
  useEffect(() => {
    if (!open) return
    const onResize = () => {
      openRef.current = null
      setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') go(null)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, go])

  const arm = (i: number) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    if (openRef.current?.index === i) return
    if (openTimer.current) clearTimeout(openTimer.current)
    openTimer.current = setTimeout(() => {
      openTimer.current = null
      go(i)
    }, OPEN_DELAY)
  }

  const disarm = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current)
      openTimer.current = null
    }
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null
      go(null)
    }, CLOSE_DELAY)
  }

  return (
    <div ref={grid} className={`${TILE_GRID} relative [grid-auto-flow:row_dense]`}>
      {people.map((p, i) => {
        const can = expandable(p)
        const isOpen = open?.index === i
        const style: React.CSSProperties | undefined =
          isOpen && open
            ? open.block
              ? { gridColumn: `${open.col} / span ${SPAN}`, gridRow: `${open.row} / span 2` }
              : { gridColumn: '1 / -1', gridRow: `${open.row}` }
            : undefined
        return (
          <div
            key={p.name}
            data-slot
            style={style}
            className={`relative ${isOpen ? 'z-10' : ''} ${can ? 'cursor-pointer rounded-[7px] outline-none focus-visible:ring-2 focus-visible:ring-bronze' : ''}`}
            tabIndex={can ? 0 : undefined}
            role={can ? 'button' : undefined}
            aria-expanded={can ? isOpen : undefined}
            aria-label={can ? `${p.name}. Show details` : undefined}
            onPointerDown={(e) => {
              lastPointer.current = e.pointerType
            }}
            onPointerEnter={can ? (e) => e.pointerType === 'mouse' && arm(i) : undefined}
            onPointerLeave={can ? (e) => e.pointerType === 'mouse' && disarm() : undefined}
            onClick={
              can
                ? (e) => {
                    if ((e.target as HTMLElement).closest('a')) return
                    clearTimers()
                    if (lastPointer.current === 'mouse') {
                      if (!isOpen) go(i)
                      return
                    }
                    go(isOpen ? null : i)
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
                      go(isOpen ? null : i)
                    }
                  }
                : undefined
            }
          >
            {/* The reveal observer writes its own class on this element, so its className never changes. */}
            <div data-reveal-item data-reveal-auto className="h-full">
              {isOpen && open ? (
                <div className={open.block ? 'absolute inset-0' : 'h-full'}>
                  <ExpandedCard person={p} block={open.block} cell={open.cell} showTitle={showTitle} />
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
    <div>
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

/**
 * The open card. The portrait sits flush in the top-left corner at exactly
 * the tile's size, so it does not move when the card opens. On wide screens
 * everything else runs in one column beside it; on a phone the name sits
 * beside the portrait and the rest runs underneath.
 */
function ExpandedCard({
  person,
  block,
  cell,
  showTitle,
}: {
  person: Person
  block: boolean
  cell: number
  showTitle: boolean
}) {
  const hasNow = Boolean(person.roles?.length)
  const hasPast = Boolean(person.past?.length)

  const header = (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="font-serif text-[clamp(1.35rem,2.1vw,2rem)] font-medium leading-[1.05] text-ink">{person.name}</h3>
        {showTitle && (
          <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-bronze">{person.title}</p>
        )}
      </div>
      {person.linkedin && <LinkedInLink href={person.linkedin} name={person.name} className="h-7 w-7" />}
    </div>
  )
  const summary = person.summary && <p className="text-[13.5px] leading-[1.5] text-ink/85">{person.summary}</p>
  const roles = (
    <>
      {hasNow && <Roles label="Now" roles={person.roles!} />}
      {hasPast && <Roles label="Previously" roles={person.past!} />}
    </>
  )

  const photo = (
    <div data-photo className="relative overflow-hidden rounded-[7px] bg-card" style={{ width: cell, height: cell }}>
      {person.photo ? (
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="(min-width:1280px) 14vw, (min-width:1024px) 19vw, (min-width:640px) 32vw, 50vw"
          className="object-cover"
          style={{ objectPosition: person.photoPosition ?? 'center' }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-white/25"
          style={{ backgroundColor: tint(person.name) }}
        >
          {initials(person.name)}
        </span>
      )}
    </div>
  )

  if (block) {
    return (
      <article
        data-lenis-prevent
        className="card-open grid h-full items-start overflow-y-auto rounded-[7px] bg-panel text-left shadow-[var(--shadow)]"
        style={{ gridTemplateColumns: `${cell}px minmax(0,1fr)` }}
      >
        {photo}
        <div className="card-text grid min-w-0 content-start gap-4 px-6 py-5">
          {header}
          {summary}
          {roles}
        </div>
      </article>
    )
  }

  return (
    <article
      className="card-open grid overflow-hidden rounded-[7px] bg-panel text-left shadow-[var(--shadow)]"
      style={{ gridTemplateColumns: `${cell}px minmax(0,1fr)` }}
    >
      {photo}
      <div className="card-text min-w-0 px-4 py-3.5">{header}</div>
      <div className="card-text col-span-2 grid content-start gap-4 px-4 pt-4 pb-5">
        {summary}
        {roles}
      </div>
    </article>
  )
}
