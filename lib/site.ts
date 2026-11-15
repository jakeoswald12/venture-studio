/**
 * Site structure shared by the header, the menu scene, the home page and the
 * footer: which ventures are featured, the menu links, and the media each one
 * previews with.
 */
import { findCompany, type PortfolioCompany } from '@/lib/data/portfolio-directory'

/** The ventures shown as pills on the home page and in the menu, in order.
 *  These are the ones presented as case studies. */
export const FEATURED_SLUGS = [
  'lifetime-fitness',
  'the-care-app',
  'heavytech',
  'athletes-ocean',
  'launch-kids',
  'unify',
  'venture-forge',
  'waterside-by-ulteum',
] as const

export const FEATURED: PortfolioCompany[] = FEATURED_SLUGS.map((s) => findCompany(s)).filter(
  (c): c is PortfolioCompany => Boolean(c),
)

export const MENU_LINKS = [
  { href: '/partners', label: 'Partners', image: '/images/builder-scholars/partners/faith-driven-entrepreneur-hero.jpg' },
  { href: '/team', label: 'Team', image: '/images/misc_photos/panel_on_stage.jpg' },
  { href: '/thesis', label: 'Thesis', image: '/thesis/course-of-empire/3-consummation.jpg' },
  { href: '/contact', label: 'Contact', image: undefined },
] as const

export const ESSAYS = [
  {
    href: '/thesis/the-inheritance',
    title: 'The Inheritance',
    text: 'What the West built, the evidence that it is being spent, and why the answer is to build again.',
    image: '/thesis/course-of-empire/3-consummation.jpg',
    section: 'Philosophy',
  },
  {
    href: '/thesis/kings-and-cupbearers',
    title: 'Kings & Cupbearers',
    text: 'Great builders stand on the shoulders of earlier ones. On apprenticeship, earned trust, and why a king’s presence predicts what a young person will build.',
    image: '/thesis/art/nehemiah-dore.jpg',
    section: 'Model',
  },
  {
    href: '/thesis/sculptures-vs-fossils',
    title: 'Sculptures vs Fossils',
    text: 'There is no such thing as a business idea, only an accurate diagnosis of a need about to be met. On fossil hunters, and the kind of visionary worth following.',
    image: '/thesis/art/peale-mastodon.jpg',
    section: 'Opportunities',
  },
  {
    href: '/thesis/critical-mass',
    title: 'Critical Mass',
    text: 'A network grows more valuable with every member. On Metcalfe’s law, density, and the point at which the flywheel turns on its own.',
    image: '/thesis/art/trouvelot-milky-way-wide.jpg',
    section: 'Flywheel',
  },
] as const

export const CONTACT_EMAIL = 'partners@west.ventures'

const TINTS = ['#584dff', '#2f6bff', '#7a3cff', '#b8452f', '#1f8a70', '#a9812c']
/** A stable placeholder colour for a venture or person without artwork. */
export function tint(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return TINTS[h % TINTS.length]
}

/** A company has a page worth opening when it is featured, has a written
 *  case study, or has a student team on record. */
export function hasCaseStudy(c: PortfolioCompany) {
  return (
    (FEATURED_SLUGS as readonly string[]).includes(c.slug) ||
    Boolean(c.showcase?.length) ||
    c.engagements.some((e) => e.team.length > 0)
  )
}
