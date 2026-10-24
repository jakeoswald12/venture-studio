'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * One observer for the whole site. Any element with `data-reveal-item` fades
 * and rises into place the first time it enters the viewport. A `--d` custom
 * property on the element staggers it (each step is 90ms).
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
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
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
