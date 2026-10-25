'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * One observer for the whole site. Any element with `data-reveal-item` fades
 * and rises into place the first time it enters the viewport. A `--d` custom
 * property on the element staggers it (each step is 90ms); add
 * `data-reveal-auto` instead to stagger by on-screen order.
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

        // Items marked data-reveal-auto (grid cards) get their stagger from
        // the order they enter in: top to bottom, then left to right. A row
        // that scrolls into view always plays left to right, whatever the
        // column count at the current screen width.
        const auto = entering
          .filter((e) => (e.target as HTMLElement).dataset.revealAuto !== undefined)
          .sort(
            (a, b) =>
              Math.round(a.boundingClientRect.top) - Math.round(b.boundingClientRect.top) ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          )
        auto.forEach((e, k) => (e.target as HTMLElement).style.setProperty('--d', String(Math.min(k, 9))))

        for (const entry of entering) {
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    // Wait a frame so the new route's markup is in the document.
    const id = requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal-item]:not(.is-in)').forEach((el) => io.observe(el))
    })

    return () => {
      cancelAnimationFrame(id)
      io.disconnect()
    }
  }, [pathname])

  return null
}
