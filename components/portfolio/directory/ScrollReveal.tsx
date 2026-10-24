'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Holds its children's entrance animation until they scroll into view.
 *
 * The tile wall at the top of the page animates on load because it IS the first
 * thing on screen. The ecosystem wall is most of a page further down, so running
 * the same animation at load would mean it had long finished by the time anyone
 * arrived. This arms it instead, and fires once.
 *
 * The arming attribute is set from JavaScript rather than rendered on the
 * server: without it the CSS never hides anything, so a reader with no
 * JavaScript sees the finished wall rather than an empty grid.
 */
export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'armed' | 'in'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setState('in')
      return
    }

    setState('armed')
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('in')
          observer.disconnect()
        }
      },
      // Fire a little before the top edge arrives, so the first row has begun
      // moving by the time it is properly in frame.
      { rootMargin: '-10% 0px -15% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-reveal={state === 'idle' ? undefined : state} className={className}>
      {children}
    </div>
  )
}
