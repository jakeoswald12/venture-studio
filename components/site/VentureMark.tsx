import type { Venture } from '@/lib/data/ventures'

/**
 * Wordmarks for the joint ventures. Unify, launch.kids and Builder's Quotient
 * follow each company's own mark (as on the ACU /ben page), drawn in the
 * current text colour so they work in both themes.
 */
export function VentureMark({ mark, size = 'lg' }: { mark: Venture['mark']; size?: 'lg' | 'sm' }) {
  const h = size === 'lg' ? 'h-[clamp(40px,4.2vw,58px)]' : 'h-[30px]'
  const text = size === 'lg' ? 'text-[clamp(2rem,3.4vw,3rem)]' : 'text-[1.6rem]'

  switch (mark) {
    case 'unify':
      return (
        <svg
          className={`${h} w-auto text-ink`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3305.6 860.0"
          role="img"
          aria-label="Unify"
        >
          <g fill="currentColor" transform="translate(397.5 445.0) scale(6.8534)">
            <g transform="rotate(45)">
              <rect x="-41" y="-41" width="82" height="20" rx="4.5" />
              <rect x="-41" y="-10" width="82" height="20" rx="4.5" />
              <rect x="-41" y="21" width="82" height="20" rx="4.5" />
            </g>
          </g>
          <path
            fill="currentColor"
            transform="translate(1017.6 710.0)"
            d="M511 0V-530H404V-222C404 -129 356 -79 281 -79C210 -79 183 -129 183 -222V-530H75V-189C75 -73 136 12 253 12C321 12 382 -17 410 -85L411 0ZM632.0 -530V0H740.0V-308C740.0 -401 788.0 -451 865.0 -451C938.0 -451 966.0 -401 966.0 -308V0H1074.0V-341C1074.0 -457 1013.0 -542 893.0 -542C821.0 -542 760.0 -511 732.0 -439L729.0 -530ZM1194.0 -530V0H1302.0V-530ZM1192.0 -608H1304.0V-710H1192.0ZM1475.0 -553V-523H1402.0V-434H1475.0V0H1583.0V-434H1716.0V-523H1583.0V-553C1583.0 -596 1607.0 -622 1640.0 -622H1723.0V-710H1633.0C1524.0 -710 1475.0 -651 1475.0 -553ZM1755.0 -530 1947.0 -16H1980.0L1963.0 28C1953.0 53 1938.0 63 1910.0 63H1847.0V150H1926.0C1992.0 150 2032.0 122 2054.0 62L2266.0 -530H2158.0L2013.0 -114L1864.0 -530Z"
          />
        </svg>
      )
    case 'launch':
      return (
        <span
          aria-label="launch.kids"
          className={`block ${text} font-bold leading-none tracking-[-0.02em] text-ink`}
          style={{ fontFamily: 'var(--font-unbounded), system-ui, sans-serif' }}
        >
          launch<span className="text-[#1e6bff] [html[data-theme=dark]_&]:text-[#6f9dff]">.</span>kids
        </span>
      )
    case 'bq':
      return (
        <span
          className={`block whitespace-nowrap bg-gradient-to-br from-ink via-ink to-grey bg-clip-text pb-[0.08em] ${text} font-bold leading-none tracking-[-0.04em] text-transparent`}
          style={{ fontFamily: 'var(--font-inter-tight), system-ui, sans-serif' }}
        >
          Builder’s Quotient
        </span>
      )
    case 'blkbox':
      return (
        <span
          aria-label="blkbox.io"
          className={`inline-flex items-center gap-[0.35em] ${text} font-medium leading-none tracking-[-0.03em] text-ink`}
          style={{ fontFamily: 'var(--font-plex-mono), ui-monospace, monospace' }}
        >
          <span aria-hidden="true" className="inline-block h-[0.72em] w-[0.72em] rounded-[0.12em] bg-ink" />
          <span>
            blkbox<span className="text-grey">.io</span>
          </span>
        </span>
      )
    case 'stealth':
      return (
        <span className={`block font-serif ${text} font-semibold italic leading-none text-ink`}>
          Stealth
        </span>
      )
  }
}
