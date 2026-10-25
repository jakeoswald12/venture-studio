'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import type { PartnerEntry } from '@/lib/data/partners'

const GRID = 'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-5 lg:grid-cols-5'

/** Square tile: photo, logo on a light plate, or the name on a plain panel. */
function PartnerTile({ p }: { p: PartnerEntry }) {
  const inner = (
    <>
      <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-panel">
        {p.image ? (
          <Image
            src={p.image}
            alt=""
            fill
            sizes="(min-width:1024px) 18vw, (min-width:640px) 25vw, 50vw"
            className="object-cover"
            style={{ objectPosition: p.objectPosition ?? 'center' }}
          />
        ) : p.logo ? (
          <span className="absolute inset-0 bg-[#fbfaf6]">
            <span className="absolute inset-[22%]">
              <Image src={p.logo} alt="" fill sizes="20vw" className="object-contain" />
            </span>
          </span>
        ) : (
          <span className="absolute inset-0 grid place-items-center px-4 text-center font-serif text-[clamp(1.05rem,1.7vw,1.4rem)] font-semibold leading-tight text-ink/70">
            {p.name}
          </span>
        )}
      </div>
      <p className="mt-3 text-[0.95rem] leading-snug text-ink">{p.name}</p>
    </>
  )
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="block transition-opacity duration-300 hover:opacity-80">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  )
}

/**
 * The first `initial` partners, then a "See all" toggle that opens the rest.
 * The extra rows open by animating grid rows 0fr → 1fr, and the tiles inside
 * fade up in order.
 */
export function PartnerGrid({ items, initial = 10 }: { items: PartnerEntry[]; initial?: number }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const first = items.slice(0, initial)
  const rest = items.slice(initial)

  return (
    <div>
      <ul className={GRID}>
        {first.map((p) => (
          <li key={p.name} data-reveal-item data-reveal-auto>
            <PartnerTile p={p} />
          </li>
        ))}
      </ul>

      {rest.length > 0 && (
        <>
          <div
            id={id}
            className={`grid transition-[grid-template-rows] duration-[900ms] ease-[var(--ease-in-out-soft)] ${
              open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden" inert={!open}>
              <ul className={`${GRID} pt-8`}>
                {rest.map((p, i) => (
                  <li
                    key={p.name}
                    className="transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? 'none' : 'translate3d(0,16px,0)',
                      transitionDelay: open ? `${150 + i * 50}ms` : '0ms',
                    }}
                  >
                    <PartnerTile p={p} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={id}
            className="mt-8 inline-flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-grey transition-colors duration-300 hover:text-ink"
          >
            <span
              aria-hidden="true"
              className={`relative grid h-4 w-4 place-items-center transition-transform duration-500 ease-[var(--ease-out-soft)] ${open ? 'rotate-45' : ''}`}
            >
              <span className="absolute h-px w-2.5 bg-current" />
              <span className="absolute h-2.5 w-px bg-current" />
            </span>
            {open ? 'See less' : `See all ${items.length}`}
          </button>
        </>
      )}
    </div>
  )
}
