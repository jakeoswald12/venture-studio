'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { SoundToggle } from './SoundToggle'
import { CONTACT_EMAIL, CONTACT_HREF, NAV } from './nav'
import { getLenis } from './SmoothScroll'
import { NEWS } from '@/lib/data/news'

/**
 * Fixed header: wordmark left; theme toggle, sound toggle, Contact and Menu
 * on the right. It gains a frosted background and a hairline once the page
 * scrolls.
 *
 * Menu opens a full-screen sheet at every width: the pages on the left, news
 * on the right, and "Get in touch" (to the Info Packet page) at the bottom.
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

  // Freeze the page behind the open menu; Escape closes it.
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Company and student pages live under /portfolio/ but belong to Ventures.
  const isActive = (href: string) =>
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === '/ventures' && pathname.startsWith('/portfolio/'))

  const pages = [{ href: '/', label: 'Home' }, ...NAV]
  const tab = open ? 0 : -1
  const stagger = (i: number) => ({ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' })
  const rise = `transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] ${
    open ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
  }`

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          open
            ? 'border-b border-transparent'
            : scrolled
              ? 'border-b border-line bg-[var(--header-bg)] backdrop-blur-xl backdrop-saturate-150'
              : 'border-b border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-4 pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] sm:px-8">
          <Link
            href="/"
            aria-label="West Ventures, home"
            className="font-serif text-[1.45rem] font-semibold uppercase italic leading-none tracking-[.03em] text-ink"
          >
            West
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SoundToggle />
            <Link
              href={CONTACT_HREF}
              className="hidden h-10 items-center rounded-full border border-line px-5 text-[0.88rem] font-normal text-ink transition-colors duration-300 hover:border-faint min-[520px]:inline-flex"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="inline-flex h-10 items-center gap-2.5 rounded-full bg-ink pl-5 pr-4 text-[0.88rem] font-medium text-paper transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="w-[3.1em] text-left">{open ? 'Close' : 'Menu'}</span>
              <span aria-hidden="true" className="relative grid h-3 w-3 place-items-center">
                <span
                  className={`absolute h-px w-3 bg-current transition-transform duration-500 ease-[var(--ease-in-out-soft)] ${
                    open ? 'rotate-45' : '-translate-y-[2.5px]'
                  }`}
                />
                <span
                  className={`absolute h-px w-3 bg-current transition-transform duration-500 ease-[var(--ease-in-out-soft)] ${
                    open ? '-rotate-45' : 'translate-y-[2.5px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        data-lenis-prevent
        className={`menu-sheet fixed inset-0 z-40 overflow-y-auto bg-paper ${open ? 'is-open' : ''}`}
      >
        <div className="mx-auto flex min-h-full max-w-[1600px] flex-col pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] pt-[calc(104px+env(safe-area-inset-top))] pb-[calc(28px+env(safe-area-inset-bottom))] sm:px-8">
          <div className="grid flex-1 gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
            <nav aria-label="Pages">
              <p className={`mb-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint ${rise}`} style={stagger(0)}>
                Pages
              </p>
              <ul>
                {pages.map((item, i) => {
                  const active = item.href === '/' ? pathname === '/' : isActive(item.href)
                  return (
                    <li key={item.href} className={rise} style={stagger(i + 1)}>
                      <Link
                        href={item.href}
                        tabIndex={tab}
                        aria-current={active ? 'page' : undefined}
                        className="menu-link group flex items-baseline gap-5 border-b border-line py-[clamp(10px,1.6vh,18px)]"
                      >
                        <span className="w-6 font-mono text-[0.7rem] tracking-[0.1em] text-faint">
                          {String(i).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-serif text-[clamp(2.1rem,6.2vh,4.4rem)] font-semibold leading-[1.02] tracking-[-0.015em] transition-[color,transform] duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-2 group-hover:text-ink ${
                            active ? 'text-ink' : 'text-grey'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-auto -translate-x-2 self-center text-[1.3rem] text-ink opacity-0 transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <section aria-label="News" className="lg:pt-0">
              <p className={`mb-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint ${rise}`} style={stagger(2)}>
                News
              </p>
              <ul>
                {NEWS.map((item, i) => (
                  <li key={item.href} className={rise} style={stagger(i + 3)}>
                    <Link
                      href={item.href}
                      tabIndex={tab}
                      className="group grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-4"
                    >
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">{item.kind}</span>
                      <span className="font-serif text-[1.3rem] font-semibold leading-tight text-grey transition-colors duration-300 group-hover:text-ink">
                        {item.title}
                      </span>
                      <span aria-hidden="true" className="text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className={`mt-14 flex flex-wrap items-end justify-between gap-6 ${rise}`} style={stagger(8)}>
            <div className="text-[0.9rem]">
              <p>West Ventures. Georgetown, Texas.</p>
              <a href={`mailto:${CONTACT_EMAIL}`} tabIndex={tab} className="link-line text-ink">
                {CONTACT_EMAIL}
              </a>
            </div>
            <Link
              href={CONTACT_HREF}
              tabIndex={tab}
              className="arrow-nudge inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-medium text-paper transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in touch <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
