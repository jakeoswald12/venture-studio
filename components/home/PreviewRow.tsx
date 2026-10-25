import Image from 'next/image'
import Link from 'next/link'

export interface PreviewItem {
  name: string
  href?: string
  image?: string
  logo?: string
  objectPosition?: string
}

/**
 * A row of square cards in the partners-page style: five and a half across on
 * desktop, where the sixth card is cut by the column edge and fades into the
 * page background, so the row reads as the start of a longer list.
 * The section places its "See all" link (SeeAll) above the row, at the right.
 */
export function PreviewRow({ items }: { items: PreviewItem[] }) {
  return (
    <div>
      <div className="relative overflow-hidden">
        <ul className="flex gap-4 sm:gap-5">
          {items.map((p) => {
            const external = p.href?.startsWith('http')
            const card = (
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
            return (
              <li
                key={p.name}
                data-reveal-item
                data-reveal-auto
                className="w-[calc((100%-2*1rem)/2.5)] flex-none sm:w-[calc((100%-4*1.25rem)/4.5)] lg:w-[calc((100%-5*1.25rem)/5.5)]"
              >
                {p.href ? (
                  external ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="block transition-opacity duration-300 hover:opacity-80">
                      {card}
                    </a>
                  ) : (
                    <Link href={p.href} className="block transition-opacity duration-300 hover:opacity-80">
                      {card}
                    </Link>
                  )
                ) : (
                  <div>{card}</div>
                )}
              </li>
            )
          })}
        </ul>

        {/* The last card is cut in half by the column edge and fades into the
            page background across that half. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-[calc((100%-2*1rem)/5+1rem)] bg-gradient-to-r from-transparent via-paper/85 to-paper sm:w-[calc((100%-4*1.25rem)/9+1.25rem)] lg:w-[calc((100%-5*1.25rem)/11+1.25rem)]"
        />
      </div>
    </div>
  )
}

/** The "See all …" link that sits above a PreviewRow, at the right edge. */
export function SeeAll({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      data-reveal-item
      className="arrow-nudge ml-auto inline-flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-grey transition-colors duration-300 hover:text-ink"
    >
      {label} <span className="arrow">→</span>
    </Link>
  )
}
