'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Person } from '@/lib/data/team'

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** Tints for tiles without a headshot, as on the ventures wall. */
const TINTS = ['#1F303E', '#16232B', '#2E404B', '#7A4F26', '#976230', '#243845']
function tint(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return TINTS[h % TINTS.length]
}

const LI_PATH =
  'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.81c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.89h-4v-11Z'

export function LinkedInLink({ href, name, className = '' }: { href: string; name: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      title="LinkedIn"
      className={`grid h-8 w-8 flex-none place-items-center rounded-full border border-line text-grey transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
        <path d={LI_PATH} />
      </svg>
    </a>
  )
}

/**
 * Leadership, board and Student Fellows share this tile, styled like the
 * ventures wall: the portrait only at rest; on hover (or focus inside the
 * tile) a shade rises from the bottom with the name, title and LinkedIn link.
 * Touch screens have no hover, so there the details always show.
 *
 * When `bio` is set, a "Bio" control in the details opens it in a dialog.
 */
export function PersonCard({ person }: { person: Person; size?: 'lg' | 'sm' }) {
  const [bioOpen, setBioOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (bioOpen && !d.open) d.showModal()
    if (!bioOpen && d.open) d.close()
  }, [bioOpen])

  return (
    <article className="group relative aspect-square overflow-hidden rounded-[7px] bg-panel">
      {person.photo ? (
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="(min-width:1280px) 14vw, (min-width:1024px) 19vw, (min-width:640px) 32vw, 50vw"
          className="object-cover"
          style={{ objectPosition: person.photoPosition ?? 'center' }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-white/25"
          style={{ backgroundColor: tint(person.name) }}
        >
          {initials(person.name)}
        </span>
      )}

      {/* Shade + details, revealed together. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-2 p-3.5 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        <div className="min-w-0">
          <h3 className="font-serif text-[15px] font-medium leading-tight text-white">{person.name}</h3>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white/80">{person.title}</p>
          {person.bio && (
            <button
              type="button"
              onClick={() => setBioOpen(true)}
              className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#d9bc86] transition-colors duration-300 hover:text-white"
            >
              Bio
            </button>
          )}
        </div>
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name} on LinkedIn`}
            title="LinkedIn"
            className="grid h-7 w-7 flex-none place-items-center rounded-full border border-white/40 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#141414]"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3 fill-current">
              <path d={LI_PATH} />
            </svg>
          </a>
        )}
      </div>

      {person.bio && (
        <dialog
          ref={dialog}
          onClose={() => setBioOpen(false)}
          onClick={(e) => {
            if (e.target === e.currentTarget) setBioOpen(false)
          }}
          data-lenis-prevent
          className="m-auto w-[min(520px,calc(100vw-32px))] rounded-[22px] bg-paper p-0 text-ink shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        >
          <div className="p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-[1.5rem] font-semibold leading-tight">{person.name}</p>
                <p className="mt-1 text-[0.92rem] text-grey">{person.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setBioOpen(false)}
                aria-label="Close"
                className="relative grid h-8 w-8 flex-none rotate-45 place-items-center rounded-full border border-line text-grey transition-colors duration-300 hover:border-ink hover:text-ink"
              >
                <span className="absolute h-px w-3 bg-current" />
                <span className="absolute h-3 w-px bg-current" />
              </button>
            </div>
            <p className="mt-5 text-[1rem] leading-[1.65] text-ink/85">{person.bio}</p>
          </div>
        </dialog>
      )}
    </article>
  )
}
