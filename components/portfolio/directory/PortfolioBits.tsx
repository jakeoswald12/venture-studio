import Image from 'next/image'
import Link from 'next/link'
import type { StudentRole } from '@/lib/data/portfolio-directory'

/** Two-letter monogram standing in for a company logo. Uses the first letters
 *  of the first two words, or the first two characters of a single-word name. */
export function monogram(name: string): string {
  const words = name.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean)
  return (words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? name).slice(0, 2)).toUpperCase()
}

/** A person's initials, for the headshot placeholder. */
export function initials(name: string): string {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const PLATE_SIZES = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-[54px] w-[54px] text-[19px]',
  lg: 'h-[92px] w-[92px] text-[31px]',
} as const

/**
 * The square mark that leads a company anywhere it appears. Renders the logo
 * when one exists, and a monogram plate when it does not — so a company with
 * no brand mark still reads as a deliberate tile rather than a broken image.
 * The bronze corner tick marks a company with a public site.
 */
export function CompanyPlate({
  name,
  size = 'md',
  live = false,
}: {
  name: string
  size?: keyof typeof PLATE_SIZES
  live?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid flex-none place-items-center border border-border bg-muted font-serif font-medium text-navy-accent transition-colors group-hover:border-bronze ${PLATE_SIZES[size]}`}
    >
      {monogram(name)}
      {live && <span className="absolute -right-px -top-px h-[5px] w-[5px] bg-bronze" />}
    </span>
  )
}

const AVATAR_SIZES = {
  xs: 'h-[25px] w-[25px] text-[9.5px]',
  sm: 'h-9 w-9 text-xs',
  lg: 'h-[76px] w-[76px] text-2xl font-serif',
} as const

/**
 * A person. Role drives the treatment so a team reads at a glance: the lead is
 * solid bronze, contributors are quiet, and Builder Scholars carry a dashed
 * bronze ring. `filled` forces the bronze treatment regardless of role — used
 * for the portrait at the top of a student's own page, where the role varies
 * project to project and shouldn't colour the person.
 *
 * A `photo` replaces the initials once headshots exist; until then the initials
 * are the placeholder.
 */
export function PersonAvatar({
  name,
  role,
  size = 'sm',
  photo,
  filled = false,
}: {
  name: string
  role?: StudentRole
  size?: keyof typeof AVATAR_SIZES
  photo?: string
  filled?: boolean
}) {
  const treatment =
    filled || role === 'Student Lead'
      ? 'border-bronze bg-bronze text-paper'
      : role === 'Builder Scholar'
        ? 'border-dashed border-bronze/60 bg-muted text-bronze'
        : 'border-border bg-muted text-muted-foreground'

  if (photo) {
    return (
      <span
        className={`relative flex-none overflow-hidden rounded-full border border-bronze ${AVATAR_SIZES[size]}`}
      >
        <Image src={photo} alt={name} fill sizes="96px" className="object-cover" />
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`grid flex-none place-items-center rounded-full border font-medium ${treatment} ${AVATAR_SIZES[size]}`}
    >
      {initials(name)}
    </span>
  )
}

/** Small all-caps rule heading used to open every section of a profile. */
export function SectionLabel({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <p className="mb-0 border-b border-border pb-[9px] text-[10.5px] font-medium uppercase tracking-[.16em] text-muted-foreground">
      {children}
      {count !== undefined && <span className="ml-2 tabular-nums font-normal">{count}</span>}
    </p>
  )
}

/**
 * An empty slot, shown in bronze italic. Used everywhere content is expected
 * but not yet collected, so a half-filled directory reads as work in progress
 * rather than as a bug.
 */
export function Pending({ children }: { children: React.ReactNode }) {
  return <span className="italic text-bronze">{children}</span>
}

/** Company card used on student profiles and the "also from" rails. */
export function CompanyCard({
  slug,
  name,
  descriptor,
  live,
  caption,
}: {
  slug: string
  name: string
  descriptor?: string
  live: boolean
  caption: React.ReactNode
}) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group flex flex-col gap-[11px] border border-border/60 bg-panel/60 p-4 rounded-[7px] transition-colors hover:border-bronze/60"
    >
      <CompanyPlate name={name} size="sm" live={live} />
      <span>
        <span className="block font-serif text-[15.5px] font-medium leading-tight text-navy-accent">
          {name}
        </span>
        <span className="mt-0.5 block text-[11.5px] text-muted-foreground">
          {descriptor ?? <Pending>Description pending</Pending>}
        </span>
      </span>
      <span className="mt-auto border-t border-border/60 pt-[9px] text-[10.5px] font-medium uppercase tracking-[.1em] text-muted-foreground">
        {caption}
      </span>
    </Link>
  )
}
