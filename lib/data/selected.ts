import { PORTFOLIO_COMPANIES, findCompany, type PortfolioCompany } from './portfolio-directory'

/**
 * Selected work: the ventures listed on the homepage, in order. These are the
 * only ventures whose case study (/portfolio/<slug>) is linked from the site.
 * Every other venture appears in the index on /ventures as a plain row.
 *
 * Move a slug to reorder; add or remove a slug to change the selection.
 */
export const SELECTED_SLUGS = [
  'lifetime-fitness',
  'the-care-app',
  'heavytech',
  'athletes-ocean',
  'launch-kids',
  'unify',
  'crowdi',
  'venture-forge',
  'waterside-by-ulteum',
] as const

const SELECTED_SET = new Set<string>(SELECTED_SLUGS)

export const isSelected = (slug: string) => SELECTED_SET.has(slug)

export const SELECTED_WORK: PortfolioCompany[] = SELECTED_SLUGS.map((slug) => {
  const company = findCompany(slug)
  if (!company) throw new Error(`Selected venture "${slug}" is not in the portfolio directory.`)
  return company
})

/** Every venture: selected first, in their order, then the rest in directory order. */
export const ALL_WORK: PortfolioCompany[] = [
  ...SELECTED_WORK,
  ...PORTFOLIO_COMPANIES.filter((c) => !SELECTED_SET.has(c.slug)),
]
