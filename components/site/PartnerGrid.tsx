'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import type { PartnerEntry } from '@/lib/data/partners'
import { TILE_GRID } from './Frame'

/**
 * Square tile in the style of the ventures wall: artwork only at rest, and on
 * hover (or keyboard focus) a scrim drops in with the name at the bottom.
 * Touch screens have no hover, so there the name shows on a light shade.
 */
export function PartnerTile({ p }: { p: PartnerEntry }) {
  const inner = (
    <>
      {p.image ? (
        <Image
          src={p.image}
          alt=""
          fill
          sizes="(min-width:1280px) 14vw, (min-width:1024px) 19vw, (min-width:640px) 32vw, 50vw"
          className="object-cover"
          style={{ objectPosition: p.objectPosition ?? 'center' }}
        />
      ) : p.logo ? (
        <span className="absolute inset-0 bg-[#fbfaf6]">
          <span className="absolute inset-[22%]">
            <Image src={p.logo} alt="" fill sizes="14vw" className="object-contain" />
          </span>
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center bg-panel px-4 text-center font-serif text-[clamp(1rem,1.3vw,1.2rem)] font-semibold leading-tight text-ink/70"
        >
          {p.name}
        </span>
      )}

      <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/65 group-focus-visible:bg-black/65 [@media(hover:none)]:bg-gradient-to-t [@media(hover:none)]:from-black/55 [@media(hover:none)]:to-transparent [@media(hover:none)]:to-50%" />
      <span className="absolute inset-x-0 bottom-0 p-3.5 font-serif text-[15px] font-medium leading-tight text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
        {p.name}
      </span>
    </>
  )
  const cls =
    'group relative block aspect-square overflow-hidden rounded-[7px] bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze'
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name} className={cls}>
      {inner}
    </a>
  ) : (
    <div aria-label={p.name} className={cls}>
      {inner}
    </div>
  )
}


/** Stable hash, so the server and client agree on every value below. */
function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}
const unit = (seed: number, shift: number) => ((seed >>> shift) % 1009) / 1009

/**
 * The ventures-wall entrance for the rows "See all" opens: row by row, but
 * scattered within each row, each tile with its own duration and rise.
 */
function scatterEntrances(names: string[], perRow = 7) {
  const out: { delay: number; duration: number; rise: number }[] = []
  for (let start = 0; start < names.length; start += perRow) {
    const row = names.slice(start, start + perRow).map((n, k) => ({ n, k: start + k }))
    const dealt = [...row].sort((a, b) => hash(a.n) - hash(b.n))
    dealt.forEach(({ n, k }, slot) => {
      const seed = hash(n)
      const position = dealt.length > 1 ? slot / (dealt.length - 1) : 0
      out[k] = {
        delay: +(0.15 + (start / perRow) * 0.2 + position * 0.45 + (unit(seed, 4) - 0.5) * 0.12).toFixed(3),
        duration: +(0.83 + unit(seed, 12) * 0.34).toFixed(3),
        rise: +(16 + unit(seed, 20) * 22).toFixed(1),
      }
    })
  }
  return out
}

/**
 * The first `initial` partners (two rows of seven), then a "See all" toggle
 * that opens the rest. The extra rows open by animating grid rows 0fr → 1fr,
 * and the tiles inside fade up in order.
 */
export function PartnerGrid({ items, initial = 14 }: { items: PartnerEntry[]; initial?: number }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const first = items.slice(0, initial)
  const rest = items.slice(initial)
  const scatter = scatterEntrances(rest.map((p) => p.name))

  return (
    <div>
      <ul className={TILE_GRID}>
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
              <ul className={`${TILE_GRID} pt-2.5`}>
                {rest.map((p, i) => {
                  const e = scatter[i]
                  return (
                  <li
                    key={p.name}
                    className="transition-[opacity,transform]"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? 'none' : `translate3d(0,${e.rise}px,0)`,
                      transitionDuration: `${e.duration}s`,
                      transitionTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
                      transitionDelay: open ? `${e.delay}s` : '0s',
                    }}
                  >
                    <PartnerTile p={p} />
                  </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={id}
            className="mt-7 inline-flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-grey transition-colors duration-300 hover:text-ink"
          >
            <span
              aria-hidden="true"
              className={`relative grid h-4 w-4 place-items-center transition-transform duration-500 ease-[var(--ease-out-soft)] ${open ? 'rotate-45' : ''}`}
            >
              <span className="absolute h-px w-2.5 bg-current" />
              <span className="absolute h-2.5 w-px bg-current" />
            </span>
            {open ? 'See less' : 'See all'}
          </button>
        </>
      )}
    </div>
  )
}
