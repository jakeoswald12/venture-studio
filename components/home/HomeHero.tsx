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
  inset?: string
  focus?: number
}

/**
 * The home page is one screen that does not scroll: a statement and a venture
 * browser. Hovering a pill dips the background to black and up into that
 * venture, and lays its name, summary, disciplines and an inset picture out in
 * one of three arrangements (layouts 1–3, in turn down the list). Each piece
 * drifts a few pixels into place and leaves the way it came. Clicking expands
 * the inset into the case study. "All ventures" shows the accent gradient and
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
      <div className={`home-dip ${hover !== null ? 'is-on' : ''}`} aria-hidden="true" />

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
          <div key={v.slug} className={`hv hv-${(i % 3) + 1} ${hover === i ? 'is-on' : ''}`} aria-hidden={hover !== i}>
            <p className="hv-cat">{v.label}</p>
            <p className="hv-name serif t-hero">{v.name}</p>
            <p className="hv-sub">{v.text}</p>
            <div
              ref={(el) => {
                thumbs.current[i] = el
              }}
              className="hv-img"
            >
              <Media src={v.inset ?? v.tile} name={v.name} sizes="(min-width: 967px) 32vw, 100vw" />
            </div>
          </div>
        ))}
        <nav aria-label="Ventures" className="home-pills">
          {ventures.map((v, i) => (
            <Link
              key={v.slug}
              href={`/portfolio/${v.slug}`}
              className="home-pill-row"
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
              <span className={`pill ${hover === i ? 'is-active' : ''}`}>{v.name}</span>
            </Link>
          ))}
          <Link
            href="/ventures"
            className="home-pill-row"
            onMouseEnter={() => setHover('all')}
            onMouseLeave={leave('all')}
            onFocus={() => setHover('all')}
            onBlur={leave('all')}
          >
            <span className={`pill ${hover === 'all' ? 'is-active' : ''}`}>All ventures</span>
          </Link>
        </nav>
      </div>
      {active ? <span className="sr-only">{active.name}</span> : null}
    </main>
  )
}
