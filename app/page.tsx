import { HomeHero, type HomeVenture } from '@/components/home/HomeHero'
import { PORTFOLIO_COMPANIES, companyCohorts, companyRoster } from '@/lib/data/portfolio-directory'
import { FEATURED } from '@/lib/site'

/**
 * Home: one full-viewport hero and the featured ventures as pills. No scroll
 * and no footer. Everything that used to sit below the old hero now lives on
 * its own page: the overview and thesis on /thesis, ventures on /ventures,
 * partners on /partners and the contact form on /contact.
 */
export default function HomePage() {
  const ventures: HomeVenture[] = FEATURED.map((c) => {
    const cohorts = companyCohorts(c)
    const students = companyRoster(c).length
    const facts = [cohorts.join(', '), students ? `${students} students` : ''].filter(Boolean).join(' · ')
    return {
      slug: c.slug,
      name: c.name,
      label: (c.disciplines ?? []).join(', ') || (c.descriptor ?? ''),
      text: c.blurb ?? facts,
      tile: c.tile,
      inset: c.inset ?? c.tile,
      focus: c.tileFocus,
    }
  })

  return <HomeHero ventures={ventures} all={PORTFOLIO_COMPANIES.map((c) => c.name)} />
}
