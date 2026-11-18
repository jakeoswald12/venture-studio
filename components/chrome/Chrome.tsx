'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Media } from '@/components/modules/Media'
import { Cursor } from './Cursor'
import { Footer } from './Footer'
import { Header } from './Header'
import { Menu } from './Menu'
import { Preloader } from './Preloader'
import { cardRect, closeMenu, isDesktop } from './menu'
import { T, getChrome, reducedMotion, setChrome } from './store'

/**
 * The shared chrome around every page, and the three ways one page becomes
 * another:
 *
 *   wipe    an ordinary link. The page closes into a rounded window at the
 *           centre, the new page mounts, and the window opens again.
 *   expand  a home pill or a menu link. The preview you were looking at grows
 *           to the full viewport and becomes the next page.
 *   none    back and forward. The page swaps at once.
 *
 * Internal links are caught here, so pages use plain <Link> or <a>.
 */

interface ExpandRequest {
  href: string
  rect: { left: number; top: number; width: number; height: number }
  src?: string
  name: string
  duration: number
  sizes?: string
  fromMenu?: boolean
}

let expandImpl: ((r: ExpandRequest) => void) | null = null
/** Grow a preview into the next page. Used by the home pills. */
export const expandTo = (r: ExpandRequest) => expandImpl?.(r)

export function Chrome({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const arrive = useRef<(() => void) | null>(null)
  const busy = useRef(false)
  const expander = useRef<HTMLDivElement>(null)
  const [media, setMedia] = useState<{ src?: string; name: string; sizes?: string } | null>(null)

  // The new route has mounted: finish whichever transition was waiting on it.
  useEffect(() => {
    const fn = arrive.current
    arrive.current = null
    fn?.()
  }, [pathname])

  // A measured viewport unit, so full-height scenes stay put under mobile
  // browser chrome.
  useEffect(() => {
    let width = 0
    const set = () => {
      if (window.innerWidth === width) return
      width = window.innerWidth
      document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
    }
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  useEffect(() => {
    const go = (href: string, then: () => void) => {
      let done = false
      const once = () => {
        if (done) return
        done = true
        then()
      }
      arrive.current = once
      router.push(href)
      setTimeout(once, 4000)
    }

    const wipe = (href: string, onArrive?: () => void) => {
      if (busy.current) return
      if (reducedMotion()) {
        onArrive?.()
        router.push(href)
        return
      }
      busy.current = true
      setChrome({ phase: 'closing' })
      setTimeout(() => {
        go(href, () => {
          onArrive?.()
          setChrome({ phase: 'hold' })
          setTimeout(() => {
            setChrome({ phase: 'opening' })
            setTimeout(() => {
              setChrome({ phase: 'idle' })
              busy.current = false
            }, T.wipe)
          }, T.hold)
        })
      }, T.wipe)
    }

    const expand = (r: ExpandRequest) => {
      const el = expander.current
      if (busy.current || !el) return
      if (reducedMotion()) {
        if (r.fromMenu) closeMenu(true)
        router.push(r.href)
        return
      }
      busy.current = true
      setMedia({ src: r.src, name: r.name, sizes: r.sizes })
      const root = document.documentElement
      root.setAttribute('data-expanding', '')
      Object.assign(el.style, {
        transition: 'none',
        left: `${r.rect.left}px`,
        top: `${r.rect.top}px`,
        width: `${r.rect.width}px`,
        height: `${r.rect.height}px`,
        borderRadius: '8px',
      })
      el.classList.remove('is-out')
      el.classList.add('is-on')
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const d = `${r.duration}ms var(--ease-inout)`
          Object.assign(el.style, {
            transition: `left ${d}, top ${d}, width ${d}, height ${d}, border-radius ${d}`,
            left: '0px',
            top: '0px',
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
          })
        }),
      )
      setTimeout(() => {
        go(r.href, () => {
          if (r.fromMenu) closeMenu(true)
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              el.classList.add('is-out')
              root.removeAttribute('data-expanding')
              setTimeout(() => {
                el.classList.remove('is-on', 'is-out')
                setMedia(null)
                busy.current = false
              }, 650)
            }),
          )
        })
      }, r.duration)
    }
    expandImpl = expand

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      if (a.dataset.transition === 'self') return
      const url = new URL(href, window.location.href)
      const same = url.pathname === window.location.pathname
      const { menu } = getChrome()

      if (menu) {
        e.preventDefault()
        if (same) {
          closeMenu()
          return
        }
        if (isDesktop()) {
          expand({
            href,
            rect: cardRect(),
            src: a.dataset.src || undefined,
            name: a.dataset.name ?? a.textContent ?? '',
            duration: T.expandMenu,
            sizes: '(min-width: 967px) 60vw, 100vw',
            fromMenu: true,
          })
        } else {
          wipe(href, () => closeMenu(true))
        }
        return
      }
      if (same) return
      e.preventDefault()
      wipe(href)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && getChrome().menu) closeMenu()
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('keydown', onKey)
    return () => {
      expandImpl = null
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('keydown', onKey)
    }
  }, [router])

  return (
    <>
      <Menu />
      <div id="stage">
        {children}
        <Footer />
      </div>
      <Header />
      <div className="window wipe" aria-hidden="true">
        <div className="window-hole" />
      </div>
      <div ref={expander} className="expander" aria-hidden="true">
        {media && <Media src={media.src} name={media.name} sizes={media.sizes ?? '100vw'} priority />}
      </div>
      <Preloader />
      <Cursor />
    </>
  )
}
