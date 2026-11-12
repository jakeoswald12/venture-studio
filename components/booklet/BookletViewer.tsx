'use client'

/**
 * The flip-through viewer.
 *
 * Wide screens: two-page spreads, with the page turning on its spine. The
 * cover and back cover sit alone, and the book slides to keep them centred.
 * Phones and narrow windows: one page at a time, swiped sideways, each page
 * reflowed to the screen and scrolled vertically.
 *
 * Arrow keys, clicks on a page's outer half, the arrows and the scrubber all
 * turn pages. Links in the contents jump straight to a page.
 */

import Link from 'next/link'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AUDIENCES, type AudienceSlug } from '@/lib/booklets/audiences'
import { BookletPage, SECTION_TITLES, bookletPages, type PageCtx } from './pages'
import { getLenis } from '@/components/site/SmoothScroll'

const PAGE_W = 680
const PAGE_H = 880
const FLIP_MS = 900

type Layout = { kind: 'spread'; u: number } | { kind: 'flow'; u: number }

export function BookletViewer({ slug, pdfHref }: { slug: AudienceSlug; pdfHref: string }) {
  const audience = AUDIENCES[slug]
  const pages = useMemo(() => bookletPages(audience, 'view'), [audience])
  const N = pages.length
  const spreads = Math.floor(N / 2) + 1

  const [layout, setLayout] = useState<Layout | null>(null)
  const [spread, setSpread] = useState(0)
  const [flip, setFlip] = useState<{ dir: 1 | -1; to: number } | null>(null)
  const [mobilePage, setMobilePage] = useState(1)
  const [toc, setToc] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)

  /* Size the book to the window. */
  useLayoutEffect(() => {
    const measure = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w >= 860 && w / h > 1.05) {
        const u = Math.min((w - 150) / (2 * PAGE_W), (h - 150) / PAGE_H)
        setLayout({ kind: 'spread', u })
      } else {
        setLayout({ kind: 'flow', u: Math.min(1.08, w / 430) })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  /* Freeze the site behind the viewer. */
  useEffect(() => {
    const lenis = getLenis()
    lenis?.stop()
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = prev
    }
  }, [])

  const spreadOf = (page: number) => Math.floor(page / 2)
  const pagesOf = (s: number): [number | null, number | null] => [s === 0 ? null : 2 * s, 2 * s + 1 <= N ? 2 * s + 1 : null]

  const goSpread = useCallback(
    (to: number) => {
      to = Math.max(0, Math.min(spreads - 1, to))
      if (to === spread || flip) return
      if (Math.abs(to - spread) === 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setFlip({ dir: to > spread ? 1 : -1, to })
        window.setTimeout(() => {
          setSpread(to)
          setFlip(null)
        }, FLIP_MS)
      } else {
        setSpread(to)
      }
    },
    [spread, spreads, flip],
  )

  const goPage = useCallback(
    (p: number) => {
      p = Math.max(1, Math.min(N, p))
      if (layout?.kind === 'flow') {
        const el = scroller.current
        el?.scrollTo({ left: (p - 1) * el.clientWidth, behavior: Math.abs(p - mobilePage) > 1 ? 'auto' : 'smooth' })
      } else {
        goSpread(spreadOf(p))
      }
    },
    [N, layout, goSpread, mobilePage],
  )

  const next = useCallback(() => (layout?.kind === 'flow' ? goPage(mobilePage + 1) : goSpread(spread + 1)), [layout, goPage, goSpread, mobilePage, spread])
  const prev = useCallback(() => (layout?.kind === 'flow' ? goPage(mobilePage - 1) : goSpread(spread - 1)), [layout, goPage, goSpread, mobilePage, spread])

  /* Keyboard. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('input,textarea,select')) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') (e.preventDefault(), next())
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') (e.preventDefault(), prev())
      else if (e.key === 'Home') goPage(1)
      else if (e.key === 'End') goPage(N)
      else if (e.key === 'Escape') setToc(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goPage, N])

  /* Open at #page-N. */
  useEffect(() => {
    if (!layout) return
    const m = /^#page-(\d+)$/.exec(window.location.hash)
    if (m) goPage(Number(m[1]))
    // Only on first layout.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout?.kind])

  /* Keep the address bar on the current page, so a shared link opens there. */
  const current = layout?.kind === 'flow' ? mobilePage : pagesOf(spread)[1] ?? pagesOf(spread)[0] ?? 1
  useEffect(() => {
    if (!layout) return
    history.replaceState(null, '', current > 1 ? `#page-${current}` : window.location.pathname + window.location.search)
  }, [current, layout])

  /* Contents links, and clicks on a page's outer half to turn it. */
  const onBookClick = (e: React.MouseEvent) => {
    const t = e.target as HTMLElement
    const goto = t.closest<HTMLElement>('[data-goto]')
    if (goto) {
      e.preventDefault()
      goPage(Number(goto.dataset.goto))
      return
    }
    if (layout?.kind !== 'spread' || t.closest('a,button,[role="tab"],input,label')) return
    const book = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - book.left) / book.width
    if (x > 0.62) next()
    else if (x < 0.38) prev()
  }

  /* Swipe tracking on phones. */
  const onScroll = () => {
    const el = scroller.current
    if (!el) return
    setMobilePage(Math.round(el.scrollLeft / el.clientWidth) + 1)
  }

  const sections = pages.filter((p) => SECTION_TITLES[p.id])
  const FRONT: Record<string, string> = { cover: 'Cover', letter: 'Letter', contents: 'Contents', back: 'Back cover' }
  const shown = layout?.kind === 'spread' ? pagesOf(spread).filter((x): x is number => !!x) : [current]
  const range = shown.join('–')
  const lastShown = pages[shown[shown.length - 1] - 1]
  const sectionAt = [...pages].reverse().find((p) => p.number <= lastShown.number && SECTION_TITLES[p.id])
  const label = SECTION_TITLES[lastShown.id] ?? FRONT[lastShown.id] ?? (sectionAt ? SECTION_TITLES[sectionAt.id] : '')

  return (
    <div className="bk fixed inset-0 z-[300] flex flex-col bg-[#0f0e0c] text-[#d9d3c7]" data-lenis-prevent>
      {/* Top bar */}
      <div className="relative z-20 flex h-[58px] shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-baseline gap-4">
          <Link href="/" className="font-serif text-[1.25rem] font-semibold uppercase italic tracking-[.04em] text-[#f4efe6]">
            West
          </Link>
          <span className="hidden truncate font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#8a8378] sm:inline">
            Info Booklet · {audience.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-2 hidden font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8a8378] md:inline">
            {label} · {range} / {N}
          </span>
          <button
            type="button"
            onClick={() => setToc((v) => !v)}
            className="rounded-full border border-[#3a3732] px-3.5 py-1.5 text-[0.8rem] text-[#e9e3d8] transition-colors hover:border-[#7d776e]"
          >
            Contents
          </button>
          <a
            href={pdfHref}
            className="rounded-full bg-[#f4efe6] px-3.5 py-1.5 text-[0.8rem] font-medium text-[#151412] transition-opacity hover:opacity-85"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Stage */}
      {layout?.kind === 'spread' && (
        <div className="relative flex min-h-0 flex-1 items-center justify-center" style={{ perspective: '2600px' }}>
          <Spread
            pages={pages}
            u={layout.u}
            spread={spread}
            flip={flip}
            pagesOf={pagesOf}
            onClick={onBookClick}
          />
          <NavArrow side="left" disabled={spread === 0} onClick={prev} />
          <NavArrow side="right" disabled={spread === spreads - 1} onClick={next} />
        </div>
      )}

      {layout?.kind === 'flow' && (
        <div
          ref={scroller}
          onScroll={onScroll}
          onClick={onBookClick}
          className="bk-flow flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ ['--u' as string]: `${layout.u}px` }}
        >
          {pages.map((p) => (
            <div key={p.number} id={`page-${p.number}`} className="h-full w-full shrink-0 snap-center overflow-y-auto overscroll-y-contain bg-[#f6f3ec]">
              <BookletPage ctx={p} />
            </div>
          ))}
        </div>
      )}

      {/* Scrubber */}
      {layout && (
        <div className="relative z-20 flex h-[46px] shrink-0 items-center gap-3 px-4 sm:px-6">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#8a8378] md:hidden">
            {current} / {N}
          </span>
          <div className="flex h-full flex-1 items-center gap-[3px]">
            {pages.map((p) => {
              const on = layout.kind === 'flow' ? p.number === current : spreadOf(p.number) === spread
              return (
                <button
                  key={p.number}
                  type="button"
                  aria-label={`Page ${p.number}${SECTION_TITLES[p.id] ? `, ${SECTION_TITLES[p.id]}` : ''}`}
                  title={SECTION_TITLES[p.id] ?? (p.id.startsWith('story-') ? 'Student story' : p.id === 'cover' ? 'Cover' : p.id === 'back' ? 'Back cover' : p.id === 'letter' ? 'Letter' : 'Contents')}
                  onClick={() => goPage(p.number)}
                  className="group flex h-full flex-1 items-center"
                >
                  <span
                    className="block h-[3px] w-full rounded-full transition-colors duration-300"
                    style={{ background: on ? '#c9a063' : '#34312c' }}
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Contents drawer */}
      {toc && (
        <div className="absolute inset-0 z-30 flex justify-end bg-black/50 backdrop-blur-[2px]" onClick={() => setToc(false)}>
          <nav
            aria-label="Contents"
            onClick={(e) => e.stopPropagation()}
            className="bk-fade h-full w-full max-w-[380px] overflow-y-auto bg-[#151412] px-7 pb-10 pt-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#8a8378]">Contents</span>
              <button type="button" onClick={() => setToc(false)} className="text-[0.85rem] text-[#a59e93] hover:text-[#f4efe6]">
                Close
              </button>
            </div>
            <ol className="mt-6">
              {[pages[0], ...sections, pages[N - 1]].map((p, i) => (
                <li key={p.number} className="border-t border-[#2b2925]">
                  <button
                    type="button"
                    onClick={() => {
                      setToc(false)
                      goPage(p.number)
                    }}
                    className="flex w-full items-baseline justify-between gap-4 py-3 text-left font-serif text-[1.08rem] text-[#f4efe6] transition-colors hover:text-[#c9a063]"
                  >
                    <span>
                      {i > 0 && i <= sections.length && (
                        <span className="mr-3 italic text-[#c9a063]">{String(i).padStart(2, '0')}</span>
                      )}
                      {SECTION_TITLES[p.id] ?? (p.id === 'cover' ? 'Cover' : 'Back cover')}
                    </span>
                    <span className="text-[0.85rem] italic text-[#7d776e]">{p.number}</span>
                  </button>
                </li>
              ))}
            </ol>
            <a href={pdfHref} className="mt-8 inline-flex rounded-full bg-[#f4efe6] px-4 py-2 text-[0.85rem] font-medium text-[#151412]">
              Download PDF
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}

/* ─── Spread with page turn ──────────────────────────────────────────────── */

function Spread({
  pages,
  u,
  spread,
  flip,
  pagesOf,
  onClick,
}: {
  pages: PageCtx[]
  u: number
  spread: number
  flip: { dir: 1 | -1; to: number } | null
  pagesOf: (s: number) => [number | null, number | null]
  onClick: (e: React.MouseEvent) => void
}) {
  const W = PAGE_W * u
  const H = PAGE_H * u
  const page = (n: number | null) => (n ? pages[n - 1] : null)
  const [curL, curR] = pagesOf(spread)
  const target = flip ? pagesOf(flip.to) : null

  // What sits underneath the turning leaf.
  const baseL = flip ? (flip.dir === 1 ? curL : target![0]) : curL
  const baseR = flip ? (flip.dir === 1 ? target![1] : curR) : curR

  // Slide the book so a lone cover or back cover sits in the middle.
  const showL = flip ? (flip.dir === 1 ? curL : target![0]) : curL
  const showR = flip ? (flip.dir === 1 ? target![1] : curR) : curR
  const finalL = flip ? target![0] : curL
  const finalR = flip ? target![1] : curR
  const shiftFor = (l: number | null, r: number | null) => (!l && r ? -W / 2 : l && !r ? W / 2 : 0)
  const shift = shiftFor(finalL, finalR)
  void showL
  void showR

  return (
    <div
      onClick={onClick}
      className="relative"
      style={{
        width: 2 * W,
        height: H,
        ['--u' as string]: `${u}px`,
        transform: `translateX(${shift}px)`,
        transition: `transform ${FLIP_MS}ms cubic-bezier(.65,0,.35,1)`,
        transformStyle: 'preserve-3d',
        cursor: 'default',
      }}
    >
      {/* Base pages */}
      <Half side="left" ctx={page(baseL)} W={W} H={H} />
      <Half side="right" ctx={page(baseR)} W={W} H={H} />

      {/* Turning leaf */}
      {flip && (
        <div
          className={flip.dir === 1 ? 'bk-leaf-fwd' : 'bk-leaf-back'}
          style={{
            position: 'absolute',
            top: 0,
            left: flip.dir === 1 ? W : 0,
            width: W,
            height: H,
            transformStyle: 'preserve-3d',
            transformOrigin: flip.dir === 1 ? 'left center' : 'right center',
            animation: `${flip.dir === 1 ? 'bk-turn-fwd' : 'bk-turn-back'} ${FLIP_MS}ms cubic-bezier(.45,.05,.25,1) forwards`,
            zIndex: 5,
          }}
        >
          <Face ctx={page(flip.dir === 1 ? curR : curL)} W={W} H={H} side={flip.dir === 1 ? 'right' : 'left'} />
          <Face ctx={page(flip.dir === 1 ? target![0] : target![1])} W={W} H={H} side={flip.dir === 1 ? 'left' : 'right'} back />
        </div>
      )}
      <style>{`
        @keyframes bk-turn-fwd { from { transform: rotateY(0deg) } to { transform: rotateY(-180deg) } }
        @keyframes bk-turn-back { from { transform: rotateY(0deg) } to { transform: rotateY(180deg) } }
        @keyframes bk-shade { 0% { opacity: 0 } 50% { opacity: .55 } 100% { opacity: 0 } }
      `}</style>
    </div>
  )
}

function Half({ side, ctx, W, H }: { side: 'left' | 'right'; ctx: PageCtx | null; W: number; H: number }) {
  if (!ctx) return null
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: side === 'left' ? 0 : W,
        width: W,
        height: H,
        boxShadow: '0 30px 70px -30px rgba(0,0,0,.75), 0 8px 20px -10px rgba(0,0,0,.5)',
      }}
    >
      <BookletPage ctx={ctx} />
      <Gutter side={side} />
    </div>
  )
}

function Face({ ctx, W, H, side, back = false }: { ctx: PageCtx | null; W: number; H: number; side: 'left' | 'right'; back?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: W,
        height: H,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg)' : undefined,
        background: '#f6f3ec',
      }}
    >
      {ctx && <BookletPage ctx={ctx} />}
      <Gutter side={side} />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `linear-gradient(${side === 'right' ? '90deg' : '270deg'}, rgba(0,0,0,.35), rgba(0,0,0,0) 60%)`,
          animation: `bk-shade ${FLIP_MS}ms ease-in-out forwards`,
        }}
      />
    </div>
  )
}

/** Soft shading where the page meets the spine. */
function Gutter({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side === 'left' ? 'right' : 'left']: 0,
        width: '9%',
        pointerEvents: 'none',
        background: `linear-gradient(${side === 'left' ? '270deg' : '90deg'}, rgba(0,0,0,.16), rgba(0,0,0,.04) 40%, rgba(0,0,0,0))`,
      }}
    />
  )
}

function NavArrow({ side, disabled, onClick }: { side: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={side === 'left' ? 'Previous page' : 'Next page'}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#3a3732] text-[#e9e3d8] transition-[opacity,border-color] duration-300 hover:border-[#8a8378] disabled:pointer-events-none disabled:opacity-0 ${side === 'left' ? 'left-4' : 'right-4'}`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {side === 'left' ? <path d="M9 2 4 7l5 5" /> : <path d="M5 2l5 5-5 5" />}
      </svg>
    </button>
  )
}
