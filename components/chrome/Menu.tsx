'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Media } from '@/components/modules/Media'
import { ESSAYS, FEATURED, MENU_LINKS } from '@/lib/site'
import { closeMenu } from './menu'
import { useChrome } from './store'

/**
 * The menu is a scene, not a list. The current page becomes a card in the
 * centre; the links sit to its left with the venture pills beneath them, and
 * a stack of cards for the thesis essays sits to its right. Hovering a link
 * slides that page's media into the centre card; clicking expands the card
 * into the page. It renders in the inverse of the page's scheme.
 */
export function Menu() {
  const { menu } = useChrome()
  const pathname = usePathname()
  const [hover, setHover] = useState<string | null>(null)

  const previews = [
    ...MENU_LINKS.map((l) => ({ href: l.href as string, src: l.image as string | undefined, name: l.label as string })),
    ...FEATURED.map((c) => ({ href: `/portfolio/${c.slug}`, src: c.tile, name: c.name })),
    { href: '/ventures', src: undefined, name: 'All ventures' },
  ]
  const over = (href: string) => ({
    onMouseEnter: () => setHover(href),
    onMouseLeave: () => setHover((h) => (h === href ? null : h)),
    onFocus: () => setHover(href),
  })
  const tab = menu ? 0 : -1

  return (
    <>
      <div id="site-menu" className="menu theme-invert" aria-hidden={!menu}>
        <div className="menu-left">
          <nav aria-label="Pages" className="menu-links">
            {MENU_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={tab}
                className="menu-link"
                aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
                data-src={l.image}
                data-name={l.label}
                style={{ '--i': i } as React.CSSProperties}
                {...over(l.href)}
              >
                <span>{l.label}</span>
              </Link>
            ))}
          </nav>
          <div>
            <p className="t-label" style={{ margin: '0 0 12px' }}>
              Ventures
            </p>
            <nav aria-label="Ventures" className="menu-pills">
              {FEATURED.map((c) => (
                <Link
                  key={c.slug}
                  href={`/portfolio/${c.slug}`}
                  tabIndex={tab}
                  className={`pill ${pathname === `/portfolio/${c.slug}` ? 'is-active' : ''}`}
                  data-src={c.tile}
                  data-name={c.name}
                  {...over(`/portfolio/${c.slug}`)}
                >
                  {c.name}
                </Link>
              ))}
              <Link href="/ventures" tabIndex={tab} className="pill" data-name="All ventures" {...over('/ventures')}>
                All ventures
              </Link>
            </nav>
          </div>
        </div>

        <button type="button" className="menu-card-hit m-hide" tabIndex={-1} aria-label="Close menu" onClick={() => closeMenu()} />

        <div className="menu-right">
          <div className="menu-cards">
            {ESSAYS.map((e) => (
              <Link key={e.href} href={e.href} tabIndex={tab} className="note-card" data-src={e.image} data-name={e.title} {...over(e.href)}>
                <span>
                  <span className="t-label" style={{ display: 'block', fontSize: 12 }}>
                    Essay · {e.section}
                  </span>
                  <span className="bold" style={{ fontSize: 14, lineHeight: 1.3, display: 'block' }}>
                    {e.title}
                  </span>
                </span>
                <span className="thumb">
                  <Image src={e.image} alt="" fill sizes="44px" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="menu-preview" aria-hidden="true">
        {menu &&
          [...previews, ...ESSAYS.map((e) => ({ href: e.href as string, src: e.image as string | undefined, name: e.title as string }))].map((p) => (
            <div key={p.href} className={hover === p.href ? 'is-on' : ''}>
              <Media src={p.src} name={p.name} sizes="(min-width: 967px) 60vw, 100vw" />
            </div>
          ))}
      </div>
    </>
  )
}
