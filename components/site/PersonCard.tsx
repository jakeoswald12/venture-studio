'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import type { Person } from '@/lib/data/team'

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

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
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.81c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.89h-4v-11Z" />
      </svg>
    </a>
  )
}

/** Portrait, or initials on a plain panel until a headshot exists. */
function Portrait({ person, sizes }: { person: Person; sizes: string }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-panel">
      {person.photo ? (
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes={sizes}
          className="object-cover grayscale-[15%] transition-[transform,filter] duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.035] group-hover:grayscale-0"
          style={{ objectPosition: person.photoPosition ?? 'center' }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-faint"
        >
          {initials(person.name)}
        </span>
      )}
    </div>
  )
}

/**
 * Leadership, fellows and board share this card. When `bio` is set, a toggle
 * opens it below the title; the height animates via grid rows (0fr → 1fr).
 */
export function PersonCard({ person, size = 'lg' }: { person: Person; size?: 'lg' | 'sm' }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const sizes = size === 'lg' ? '(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw' : '(min-width:1024px) 18vw, (min-width:640px) 25vw, 50vw'

  return (
    <article className="group flex flex-col">
      <Portrait person={person} sizes={sizes} />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={`${size === 'lg' ? 'text-[1.3rem]' : 'text-[1.1rem]'} leading-tight`}>{person.name}</h3>
          <p className="mt-1 text-[0.86rem] leading-snug">{person.title}</p>
        </div>
        {person.linkedin && <LinkedInLink href={person.linkedin} name={person.name} />}
      </div>

      {person.bio && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={id}
            className="mt-3 inline-flex w-fit items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-grey transition-colors duration-300 hover:text-ink"
          >
            <span
              aria-hidden="true"
              className={`relative grid h-4 w-4 place-items-center transition-transform duration-500 ease-[var(--ease-out-soft)] ${open ? 'rotate-45' : ''}`}
            >
              <span className="absolute h-px w-2.5 bg-current" />
              <span className="absolute h-2.5 w-px bg-current" />
            </span>
            Bio
          </button>
          <div
            id={id}
            className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-soft)] ${
              open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <p className="pt-3 text-[0.92rem] leading-[1.6] text-ink/80">{person.bio}</p>
            </div>
          </div>
        </>
      )}
    </article>
  )
}
