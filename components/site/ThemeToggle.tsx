'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/**
 * Light / dark switch. The new theme is revealed as a circle growing out of
 * the button (view transitions), falling back to a colour crossfade.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(currentTheme())

    // Follow the system setting until the visitor picks one.
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null
      try {
        stored = localStorage.getItem('theme')
      } catch {}
      if (stored) return
      const next: Theme = e.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      setTheme(next)
      try {
        localStorage.setItem('theme', next)
      } catch {}
    }

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
    if (!doc.startViewTransition || reduce) {
      apply()
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const root = document.documentElement.style
    root.setProperty('--vt-x', `${x}px`)
    root.setProperty('--vt-y', `${y}px`)
    root.setProperty('--vt-r', `${r}px`)
    doc.startViewTransition(apply)
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group relative grid h-10 w-10 flex-none place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-faint"
    >
      {/* Sun and moon share the button; the inactive one rotates out. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute h-[18px] w-[18px] fill-none stroke-current stroke-[1.5] transition-all duration-700 ease-[var(--ease-out-soft)] [html[data-theme=dark]_&]:rotate-90 [html[data-theme=dark]_&]:scale-50 [html[data-theme=dark]_&]:opacity-0"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          strokeLinecap="round"
          d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute h-[17px] w-[17px] -rotate-90 scale-50 fill-none stroke-current stroke-[1.5] opacity-0 transition-all duration-700 ease-[var(--ease-out-soft)] [html[data-theme=dark]_&]:rotate-0 [html[data-theme=dark]_&]:scale-100 [html[data-theme=dark]_&]:opacity-100"
      >
        <path strokeLinejoin="round" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  )
}
