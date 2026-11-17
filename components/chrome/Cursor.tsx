'use client'

import { useEffect, useRef } from 'react'

/**
 * The custom cursor: a small dot that opens into a ring over anything
 * clickable, and into a larger ring with a word inside ("Hover", "Drag",
 * "View") over elements that carry data-cursor. Fine pointers only; touch
 * devices keep their own behaviour and the element is not shown.
 */
export function Cursor() {
  const el = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const node = el.current
    if (!node) return
    document.documentElement.classList.add('has-cursor')

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0
    let idle = true

    const tick = () => {
      x += (tx - x) * 0.35
      y += (ty - y) * 0.35
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) raf = requestAnimationFrame(tick)
      else idle = true
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!node.classList.contains('is-on')) {
        x = tx
        y = ty
        node.classList.add('is-on')
      }
      if (idle) {
        idle = false
        raf = requestAnimationFrame(tick)
      }
      const target = e.target as Element | null
      const labelled = target?.closest?.('[data-cursor]') as HTMLElement | null
      if (labelled) {
        if (label.current) label.current.textContent = labelled.dataset.cursor ?? ''
        node.dataset.state = 'label'
      } else if (target?.closest?.('a, button, [role="button"], input, textarea, select, summary, label')) {
        node.dataset.state = 'focus'
      } else {
        node.dataset.state = 'default'
      }
    }
    const onLeave = () => node.classList.remove('is-on')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div ref={el} className="cursor" data-state="default" aria-hidden="true">
      <div className="cursor-dot">
        <span ref={label} className="cursor-label" />
      </div>
    </div>
  )
}
