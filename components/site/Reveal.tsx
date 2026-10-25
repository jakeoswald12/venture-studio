'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * One observer for the whole site. Any element with `data-reveal-item` fades
 * and rises into place the first time it enters the viewport. A `--d` custom
 * property on the element staggers it (each step is 90ms); add
 * `data-reveal-auto` instead for the scattered, row-by-row entrance of the
 * ventures wall.
 *
 * The page is only armed (items hidden) once this runs, so content is visible
 * without JavaScript. Items already on screen when the page opens are shown at
 * once, in their stagger order.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    root.classList.add('reveal-armed')

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting)

        // Items marked data-reveal-auto (cards and tiles) arrive the way the
        // ventures wall does: row by row from the top, but scattered inside
        // each row. Every card in a row gets its own slot in a shuffled order,
        // a small jitter, and its own duration, so the grid assembles as one
        // loose motion rather than a left-to-right sweep.
        const auto = entering
          .filter((e) => (e.target as HTMLElement).dataset.revealAuto !== undefined)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const rows: HTMLElement[][] = []
        let rowTop = -Infinity
        for (const e of auto) {
          if (e.boundingClientRect.top - rowTop > 12) {
            rows.push([])
            rowTop = e.boundingClientRect.top
          }
          rows[rows.length - 1].push(e.target as HTMLElement)
        }
        rows.forEach((row, r) => {
          const dealt = [...row].sort(() => Math.random() - 0.5)
          dealt.forEach((el, slot) => {
            const position = dealt.length > 1 ? slot / (dealt.length - 1) : 0
            const jitter = (Math.random() - 0.5) * 0.12
            const delay = Math.max(0, Math.min(r, 4) * 0.2 + position * 0.45 + jitter)
            el.style.setProperty('--delay', `${delay.toFixed(3)}s`)
            el.style.setProperty('--dur', `${(0.83 + Math.random() * 0.34).toFixed(3)}s`)
          })
        })

        for (const entry of entering) {
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    // Wait a frame so the new route's markup is in the document.
    const id = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal-item]:not(.is-in)').forEach((el) => {
        // Each auto card also rises its own distance (set before it shows).
        if (el.dataset.revealAuto !== undefined) el.style.setProperty('--rise', `${(16 + Math.random() * 22).toFixed(1)}px`)
        io.observe(el)
      })
    })

    return () => {
      cancelAnimationFrame(id)
      io.disconnect()
    }
  }, [pathname])

  return null
}
