'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Atmosphere } from '@/components/chrome/Atmosphere'
import { expandTo } from '@/components/chrome/Chrome'
import { T } from '@/components/chrome/store'
import { Media } from '@/components/modules/Media'

export interface HomeVenture {
  slug: string
  name: string
  label: string
  text: string
  tile?: string
  focus?: number
}

/**
 * The home page is one screen that does not scroll: a statement and a venture
 * browser. Hovering a pill replaces the background, the headline and the
 * description with that venture and wipes a thumbnail in; clicking expands the
 * thumbnail into the case study. "All ventures" shows the accent gradient and
 * the full list of names.
 */
export function HomeHero({ ventures, all }: { ventures: HomeVenture[]; all: string[] }) {
  const [hover, setHover] = useState<number | 'all' | null>(null)
  const [fine, setFine] = useState(false)
  const thumbs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setFine(matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 967)
  }, [])

  const active = typeof hover === 'number' ? ventures[hover] : null
  const leave = (i: number | 'all') => () => setHover((h) => (h === i ? null : h))

  return (
    <main className="home theme-dark" data-hdr="dark">
      <Atmosphere overlay={0.4} />

      {ventures.map((v, i) => (
        <div key={v.slug} className={`home-bg ${hover === i ? 'is-on' : ''}`} aria-hidden="true">
          <Media src={v.tile} name={v.name} sizes="100vw" position={v.focus !== undefined ? `${v.focus}% 50%` : undefined} />
        </div>
      ))}
      <div className={`home-bg all ${hover === 'all' ? 'is-on' : ''}`} aria-hidden="true" style={{ zIndex: 1 }}>
        <div className="home-all">
          <ul>
            {all.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-enter">
        <h1 className={`home-head serif t-hero home-swap ${hover !== null ? 'is-off' : ''}`}>
          West
          <span className="l2" style={{ display: 'block' }}>
            Ventures
          </span>
        </h1>
        <p className={`home-desc home-swap ${hover !== null ? 'is-off' : ''}`}>
          A venture studio affiliated with Austin Christian University. Student teams work on real companies for course
          credit. The studio builds companies of its own.
        </p>

        {ventures.map((v, i) => (
          <div key={v.slug} aria-hidden={hover !== i}>
            <p className={`home-label home-swap ${hover === i ? '' : 'is-off'}`}>{v.label}</p>
            <p className={`home-head serif t-hero home-swap ${hover === i ? '' : 'is-off'}`}>{v.name}</p>
            <p className={`home-blurb home-swap ${hover === i ? '' : 'is-off'}`}>{v.text}</p>
            <div
              ref={(el) => {
                thumbs.current[i] = el
              }}
              className={`home-thumb ${hover === i ? 'is-on' : ''}`}
              data-dir={i % 4}
            >
              <div>
                <Media src={v.tile} name={v.name} sizes="(min-width: 967px) 30vw, 100vw" position={v.focus !== undefined ? `${v.focus}% 50%` : undefined} />
              </div>
            </div>
          </div>
        ))}
        <nav aria-label="Ventures" className="home-pills">
          {ventures.map((v, i) => (
            <Link
              key={v.slug}
              href={`/portfolio/${v.slug}`}
              className={`pill ${hover === i ? 'is-active' : ''}`}
              data-transition={fine ? 'self' : undefined}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={leave(i)}
              onFocus={() => setHover(i)}
              onBlur={leave(i)}
              onClick={(e) => {
                if (!fine || e.metaKey || e.ctrlKey || e.shiftKey) return
                e.preventDefault()
                const el = thumbs.current[i]
                const r = (el ?? e.currentTarget).getBoundingClientRect()
                expandTo({
                  href: `/portfolio/${v.slug}`,
                  rect: { left: r.left, top: r.top, width: r.width, height: r.height },
                  src: v.tile,
                  name: v.name,
                  duration: T.expandPill,
                  sizes: '100vw',
                })
              }}
            >
              {v.name}
            </Link>
          ))}
          <Link
            href="/ventures"
            className={`pill ${hover === 'all' ? 'is-active' : ''}`}
            onMouseEnter={() => setHover('all')}
            onMouseLeave={leave('all')}
            onFocus={() => setHover('all')}
            onBlur={leave('all')}
          >
            All ventures
          </Link>
        </nav>
      </div>
      {active ? <span className="sr-only">{active.name}</span> : null}
    </main>
  )
}
