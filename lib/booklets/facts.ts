/**
 * Facts the booklets quote, read from the site's own data so the booklets and
 * the site can't disagree. Add a testimonial to a company in
 * lib/data/portfolio-directory.ts and it appears here.
 */

import { FELLOWS, LEADERSHIP, BOARD } from '@/lib/data/team'
import { PLAN, PRICE_PER_TERM } from '@/lib/data/plan'
import { PORTFOLIO_COMPANIES, companyRoster } from '@/lib/data/portfolio-directory'

const delivered = PORTFOLIO_COMPANIES.filter((c) => c.engagements.some((e) => e.status !== 'Upcoming'))

export const FACTS = {
  companiesServed: delivered.length,
  students: new Set(delivered.flatMap((c) => companyRoster(c).map((m) => m.name))).size,
  fellows: FELLOWS.length,
  price: PRICE_PER_TERM,
  partnerGoal: (() => {
    const y = PLAN.find((r) => r.year === 2030) ?? PLAN[PLAN.length - 1]
    return { year: y.year, schools: y.highSchools + y.colleges, highSchools: y.highSchools, colleges: y.colleges }
  })(),
  /** Adoption Is An Option TikTok competition, May–July 2026. */
  tiktok: { ads: 54, spend: 15_580, impressions: 13_761_108, clicks: 1_430_339, ctr: 10.39 },
}

export const LEADERS = LEADERSHIP
export const BOARD_MEMBERS = BOARD

/** Companies with a tile image, for the work mosaic. */
export const WORK_TILES = PORTFOLIO_COMPANIES.filter((c) => c.tile && c.engagements.some((e) => e.status !== 'Upcoming'))
  .slice(0, 9)
  .map((c) => ({ name: c.name, descriptor: c.descriptor ?? '', src: c.tile as string }))

/** Every company name the studio has worked with (not upcoming). */
export const COMPANY_NAMES = delivered.map((c) => c.name)

export const FOUNDER_QUOTES = PORTFOLIO_COMPANIES.flatMap((c) => (c.testimonial ? [{ ...c.testimonial, company: c.name }] : []))

/**
 * Testimonials still to be collected. Each renders as a marked placeholder
 * until `quote` is filled in and `pending` removed.
 */
export const FAMILY_QUOTES: { who: string; quote: string; name: string; title: string; pending?: boolean }[] = [
  { who: 'Parent', quote: 'A line from the parent of a Builder Scholar: what changed in their son or daughter over a term.', name: 'Name', title: 'Parent of a Fall 2026 Builder Scholar', pending: true },
  { who: 'Teacher', quote: 'A line from a teacher or counselor who nominated students: why they nominated them and what came back.', name: 'Name', title: 'Teacher, partner high school', pending: true },
  { who: 'Student', quote: 'A line from a Builder Scholar about the work they did and who they did it for.', name: 'Name', title: 'Builder Scholar, Fall 2026', pending: true },
  { who: 'Student', quote: 'A line from a college team leader about leading a team for a founder.', name: 'Name', title: 'Team leader, Fall 2026', pending: true },
]
