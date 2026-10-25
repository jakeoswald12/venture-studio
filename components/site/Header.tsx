'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { NAV } from './nav'
import { getLenis } from './SmoothScroll'

/**
 * Fixed header: wordmark left, pages in the middle-right, theme toggle top
 * right. It gains a frosted background and a hairline once the page scrolls.
 * Below 760px the pages move into a full-screen menu.
 */
export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname])

  // Freeze the page behind the open menu.
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-line bg-[var(--header-bg)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-6 pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] sm:px-8">
          <Link
            href="/"
            aria-label="West Ventures, home"
            className="font-serif text-[1.45rem] font-semibold uppercase italic leading-none tracking-[.03em] text-ink"
          >
            West
          </Link>

          <div className="flex items-center gap-2 sm:gap-7">
            <nav aria-label="Pages" className="hidden items-center gap-7 min-[840px]:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`link-line pb-0.5 text-[0.9rem] font-normal transition-colors duration-300 ${
                    isActive(item.href) ? 'text-ink' : 'text-grey hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-ink min-[840px]:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-in-out-soft)] ${
                  open ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-in-out-soft)] ${
                  open ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="site-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-paper pt-[calc(96px+env(safe-area-inset-top))] transition-[opacity,visibility] duration-500 min-[840px]:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Pages" className="flex flex-col px-[max(16px,env(safe-area-inset-left))]">
          {[{ href: '/', label: 'Home' }, ...NAV].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
              className={`border-b border-line py-4 font-serif text-[2rem] font-semibold leading-tight transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${item.href === '/' ? (pathname === '/' ? 'text-ink' : 'text-grey') : isActive(item.href) ? 'text-ink' : 'text-grey'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
