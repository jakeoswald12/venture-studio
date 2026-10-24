import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioCompany } from '@/lib/data/portfolio-directory'
import { monogram } from './PortfolioBits'

/**
 * One company in the /portfolio grid.
 *
 * At rest the tile is only artwork — no name, no metadata. On hover (and on
 * keyboard focus) a scrim drops in and the tile says what the company is: white
 * mark top-left, one plain-language line bottom-left. The grid is meant to be
 * skimmed as a wall of work; the reading happens on the tile you stop at.
 *
 * Until artwork lands, the fallback is a tinted panel carrying the monogram —
 * deliberate, and obvious about where the image goes.
 */

/** Dark grounds drawn from the brand tokens, so the white hover text always
 *  reads. Assigned by slug so a company keeps its tone across renders. */
const TINTS = ['#1F303E', '#16232B', '#2E404B', '#7A4F26', '#976230', '#243845']

/** Stable 32-bit hash of a slug. Used for both the tint and the entrance
 *  jitter, so neither ever differs between the server render and the client —
 *  Math.random() here would mean a hydration mismatch on every tile. */
function hash(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

/** How the 7-wide wall is shaped: two tiles beside the copy, then three, then
 *  full rows. Used only to sequence the entrance — the grid itself is laid out
 *  by CSS, and narrower breakpoints wrap differently, which is fine: the
 *  animation is meant to read top-to-bottom, not to match a row exactly. */
function rowOf(index: number): number {
  if (index < 2) return 0
  if (index < 5) return 1
  return 2 + Math.floor((index - 5) / 7)
}

/** Seconds a row waits before its first tile arrives. */
const ROW_STEP = 0.2
/** How long a single row takes to finish arriving. Wider than ROW_STEP on
 *  purpose: rows overlap, so the wall assembles as one motion rather than as
 *  four separate sweeps. */
const ROW_SPREAD = 0.45
/** Random nudge on top of a tile's slot, so the spacing inside a row is uneven
 *  rather than metronomic. */
const JITTER = 0.06
const BASE_DURATION = 1
/** Tiles don't all travel at the same speed, or the same distance. */
const DURATION_RANGE = 0.34
const RISE_MIN = 16
const RISE_RANGE = 22

export interface TileEntrance {
  delay: number
  duration: number
  rise: number
}

/** A 0–1 value pulled from a different slice of the hash than the last one, so
 *  delay, duration and distance vary independently for the same company. */
function unit(seed: number, shift: number): number {
  return (((seed >>> shift) % 1009) / 1009 + Number.EPSILON) % 1
}

/**
 * Work out how every tile enters, in one pass over the wall.
 *
 * Within a row the tiles are dealt evenly across ROW_SPREAD — so no two arrive
 * together — but the ORDER of that dealing is a shuffle keyed by slug, and each
 * tile then gets its own jitter, duration and travel distance. The result reads
 * scattered rather than swept, while still moving top to bottom overall.
 *
 * Every value derives from the slug rather than Math.random(): the server and
 * the client must compute the same numbers or each tile hydrates mismatched.
 */
export function buildEntrances(slugs: string[]): TileEntrance[] {
  const entrances: TileEntrance[] = new Array(slugs.length)
  const rows = new Map<number, number[]>()

  slugs.forEach((_, index) => {
    const row = rowOf(index)
    const members = rows.get(row) ?? []
    members.push(index)
    rows.set(row, members)
  })

  rows.forEach((members, row) => {
    const dealt = [...members].sort((a, b) => hash(slugs[a]) - hash(slugs[b]))
    dealt.forEach((index, slot) => {
      const seed = hash(slugs[index])
      const position = dealt.length > 1 ? slot / (dealt.length - 1) : 0
      const jitter = (unit(seed, 4) - 0.5) * 2 * JITTER
      entrances[index] = {
        delay: Math.max(0, row * ROW_STEP + position * ROW_SPREAD + jitter),
        duration: BASE_DURATION + (unit(seed, 12) - 0.5) * DURATION_RANGE,
        rise: RISE_MIN + unit(seed, 20) * RISE_RANGE,
      }
    })
  })

  return entrances
}

/**
 * The `sizes` hint for one tile.
 *
 * Tiles are square, the artwork is landscape, and `object-cover` scales an
 * image until its HEIGHT fills the box — so a 3:1 still paints three tiles wide
 * and gets cropped either side. Describing the tile's own width (~14vw at the
 * widest breakpoint) makes the browser fetch a rendition sized for a fraction
 * of what actually gets painted, which is how a sharp source ends up soft.
 * Scale the hint by the source's aspect instead.
 */
function tileSizes(aspect = 1): string {
  const factor = Math.max(1, aspect)
  const round = (n: number) => Math.min(100, Math.ceil(n))
  return [
    `(min-width:1280px) ${round(14 * factor)}vw`,
    `(min-width:1024px) ${round(19 * factor)}vw`,
    `(min-width:640px) ${round(32 * factor)}vw`,
    `${round(92 * factor)}vw`,
  ].join(', ')
}

const VIDEO = /\.(mp4|webm|mov)$/i

export function CompanyTile({
  company,
  entrance,
}: {
  company: PortfolioCompany
  entrance: TileEntrance
}) {
  const { slug, name, tile, tileFocus, tileAspect, logoWhite, descriptor } = company
  const seed = hash(slug)

  return (
    <Link
      href={`/portfolio/${slug}`}
      aria-label={descriptor ? `${name} — ${descriptor}` : name}
      style={
        {
          '--tile-delay': `${entrance.delay.toFixed(3)}s`,
          '--tile-duration': `${entrance.duration.toFixed(3)}s`,
          '--tile-rise': `${entrance.rise.toFixed(1)}px`,
        } as React.CSSProperties
      }
      className="portfolio-tile group relative block aspect-square self-start overflow-hidden rounded-[7px] bg-[#1b1a17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
    >
      {tile ? (
        VIDEO.test(tile) ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={tile}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
        ) : (
          <Image
            src={tile}
            alt=""
            fill
            quality={82}
            sizes={tileSizes(tileAspect)}
            style={{ objectPosition: `${tileFocus ?? 50}% center` }}
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.045]"
          />
        )
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center rounded-[7px] font-serif text-[clamp(1.6rem,3.5vw,2.4rem)] font-medium text-white/25"
          style={{ backgroundColor: TINTS[seed % TINTS.length] }}
        >
          {monogram(name)}
        </span>
      )}

      {/* Scrim + label, revealed together on hover or keyboard focus. */}
      <span className="absolute inset-0 rounded-[7px] bg-black/0 transition-colors duration-500 group-hover:bg-black/65 group-focus-visible:bg-black/65" />
      <span className="absolute inset-0 flex flex-col justify-between p-3.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="block">
          {logoWhite ? (
            <Image
              src={logoWhite}
              alt={name}
              width={112}
              height={28}
              className="h-6 w-auto object-contain object-left"
            />
          ) : (
            <span className="block font-serif text-[15px] font-medium leading-tight text-white">
              {name}
            </span>
          )}
        </span>
        {descriptor && (
          <span className="block max-w-[22ch] text-[13px] leading-[1.35] text-white">
            {descriptor}
          </span>
        )}
      </span>
    </Link>
  )
}
