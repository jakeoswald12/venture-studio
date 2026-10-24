'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

/**
 * Inertial scrolling for wheel and trackpad. Touch devices keep native
 * scrolling, which already has momentum. Anyone who asks for reduced motion
 * gets the browser's own scrolling.
 *
 * Elements that scroll on their own (the company case-study panes, the deck
 * iframe) carry `data-lenis-prevent` so their wheel events are left alone.
 */

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      anchors: { offset: -88 },
    })

    let frame = 0
    const raf = (time: number) => {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  // A new page starts at the top, immediately.
  useEffect(() => {
    if (window.location.hash) return
    lenis?.scrollTo(0, { immediate: true, force: true })
  }, [pathname])

  return null
}
