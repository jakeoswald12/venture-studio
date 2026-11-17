'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { closeMenu, openMenu } from './menu'
import { useChrome } from './store'
import { SoundToggle, ThemeToggle } from './Toggles'

/**
 * Three zones on one line: a Menu pill, the wordmark, and on the right the
 * theme toggle, the sound toggle and a round Contact button.
 *
 * At the top of a page the header is transparent and full width. As the page
 * scrolls it contracts into a centred, blurred capsule; the contraction
 * follows scroll position and is smoothed. The header takes the dark scheme
 * while it sits over a scene marked data-hdr="dark" (hero, footer), and the
 * inverse scheme while the menu is open.
 */
export function Header() {
  const { menu } = useChrome()
  const pathname = usePathname()
  const inner = useRef<HTMLDivElement>(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const el = inner.current
    if (!el) return
    let hp = 0
    let target = 0
    let raf = 0
    let running = false

    const measure = () => {
      target = Math.min(1, Math.max(0, window.scrollY / 220))
      let over = false
      document.querySelectorAll<HTMLElement>('[data-hdr="dark"]').forEach((s) => {
        const r = s.getBoundingClientRect()
        if (r.top <= 34 && r.bottom >= 34) over = true
      })
      setDark(over)
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    const tick = () => {
      hp += (target - hp) * 0.14
      if (Math.abs(target - hp) < 0.002) hp = target
      el.style.setProperty('--hp', hp.toFixed(4))
      if (hp !== target) raf = requestAnimationFrame(tick)
      else running = false
    }

    measure()
    const t = setTimeout(measure, 300)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [pathname])

  return (
    <header className={`hdr ${menu ? 'theme-invert' : dark ? 'theme-dark' : ''}`}>
      <div ref={inner} className="hdr-in">
        <div className="hdr-left">
          <button
            type="button"
            className="pill menu-pill"
            aria-expanded={menu}
            aria-controls="site-menu"
            onClick={() => (menu ? closeMenu() : openMenu())}
          >
            <span className="pill-swap">
              <span>Menu</span>
              <span>Close</span>
            </span>
            <span className="x" aria-hidden="true">
              ×
            </span>
          </button>
        </div>
        <Link href="/" className="wordmark" aria-label="West Ventures, home">
          West
        </Link>
        <div className="hdr-right">
          <ThemeToggle />
          <SoundToggle />
          <Link href="/contact" className="icon-btn" aria-label="Contact" title="Contact">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
              <path d="m2 4 6 5 6-5" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
