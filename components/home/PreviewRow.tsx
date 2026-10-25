import Link from 'next/link'
import { Children } from 'react'
import { TILE_GRID } from '@/components/site/Frame'

/**
 * Homepage preview: one full row of tiles in the same seven-wide grid as the
 * ventures and partners pages. Tiles past the first row at each breakpoint
 * are hidden, so the preview is always whole rows: 2×2 on phones, 2×3 on
 * tablets, 5 on small laptops, 7 on desktop.
 */
const VISIBILITY = ['', '', '', '', 'hidden sm:block', 'hidden sm:block lg:hidden xl:block', 'hidden xl:block']

export function PreviewRow({ children }: { children: React.ReactNode }) {
  return (
    <ul className={TILE_GRID}>
      {Children.toArray(children)
        .slice(0, 7)
        .map((child, i) => (
          <li key={i} data-reveal-item data-reveal-auto className={VISIBILITY[i]}>
            {child}
          </li>
        ))}
    </ul>
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
