'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * ParallaxGrid: a single row of tiles wider than the screen that slides
 * sideways as the page scrolls, linearly, from entering the viewport until
 * leaving it.
 */
export function ParallaxGrid({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const w = wrap.current
    const t = track.current
    if (!w || !t) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = w.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < 0 || r.top > vh) return
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      const travel = Math.max(0, t.scrollWidth - w.clientWidth)
      t.style.transform = `translate3d(${-p * travel}px, 0, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={wrap} className="pgrid">
      <div ref={track}>{children}</div>
    </div>
  )
}

/**
 * A tall serif list that scrolls past a pinned label. Items you have passed
 * fade out.
 */
export function ListScroller({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ul = list.current
    if (!ul) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const above = e.boundingClientRect.top < window.innerHeight * 0.35
          e.target.classList.toggle('is-past', !e.isIntersecting && above)
        }
      },
      { rootMargin: '-35% 0px 0px 0px' },
    )
    Array.from(ul.children).forEach((li) => io.observe(li))
    return () => io.disconnect()
  }, [])

  return (
    <div className="grid12 scroller">
      <div className="d-1-5 scroller-label">
        <p className="t-intro" style={{ margin: 0 }}>
          {label}
        </p>
        {note && (
          <p className="t-body subtle" style={{ margin: '12px 0 0', maxWidth: '32ch' }}>
            {note}
          </p>
        )}
      </div>
      <ul ref={list} className="scroller-list d-6-6">
        {children}
      </ul>
    </div>
  )
}

/** A row of cards that drags sideways. The cursor reads "Drag". */
export function DragRow({ children }: { children: React.ReactNode }) {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = el.current
    if (!node) return
    let down = false
    let moved = 0
    let startX = 0
    let startLeft = 0
    let v = 0
    let lastX = 0
    let raf = 0

    const glide = () => {
      v *= 0.94
      node.scrollLeft -= v
      if (Math.abs(v) > 0.4) raf = requestAnimationFrame(glide)
    }
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      down = true
      moved = 0
      startX = lastX = e.clientX
      startLeft = node.scrollLeft
      v = 0
      cancelAnimationFrame(raf)
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      moved = Math.max(moved, Math.abs(e.clientX - startX))
      node.scrollLeft = startLeft - (e.clientX - startX)
      v = e.clientX - lastX
      lastX = e.clientX
    }
    const onUp = () => {
      if (!down) return
      down = false
      raf = requestAnimationFrame(glide)
    }
    // A drag should not also count as a click on a link inside the card.
    const onClick = (e: MouseEvent) => {
      if (moved > 6) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    node.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    node.addEventListener('click', onClick, true)
    return () => {
      cancelAnimationFrame(raf)
      node.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      node.removeEventListener('click', onClick, true)
    }
  }, [])

  return (
    <div ref={el} className="drag" data-cursor="Drag" data-lenis-prevent-touch>
      {children}
    </div>
  )
}

/** Accordion rows: a title and a small plus; a row opens on click. */
export function Drawers({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div>
      {items.map((it, i) => (
        <div key={it.title} className={`drawer ${open === i ? 'is-open' : ''}`}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {it.title}
            <span className="plus" aria-hidden="true" />
          </button>
          <div className="drawer-body">
            <div>{it.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
