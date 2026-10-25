/**
 * Partners page content.
 *
 * Grouping is a first draft built from the ACU site's own lists: the
 * "Capital & investors" group and the competition partners (VC firms), the
 * competition partners and program partners (organizations), the "Partner
 * Schools" list (high schools), and the rest of the ecosystem wall (network).
 * Confirm which are formal partners before publishing.
 */

export interface PartnerEntry {
  name: string
  href?: string
  /** Cover photo, under /public/images/. */
  image?: string
  /** Logo on a light plate, under /public/images/. Used when there is no photo. */
  logo?: string
  objectPosition?: string
  /** One literal line, used for universities. */
  note?: string
}

const P = '/images/builder-scholars/partners/'
const S = '/images/builder-scholars/schools/'

export const VC_FIRMS: PartnerEntry[] = [
  { name: "Sovereign's Capital", href: 'https://sovereignscapital.com', image: `${P}sovereigns-capital-2.png` },
  { name: 'Wave Ventures', href: 'https://www.waveventures.com', image: `${P}wave-ventures-2.png` },
  { name: '11 Tribes', href: 'https://11tribes.vc', image: `${P}11-tribes-2.jpg` },
  { name: 'Eagle Venture Fund', href: 'https://www.eagleventurefund.com', image: `${P}eagle-venture-fund.jpg` },
  { name: 'Waterstone Impact Fund', href: 'https://waterstoneimpactfund.com', image: `${P}waterstone-2.jpg` },
  { name: 'Fireroad', href: 'https://www.fireroad.io' },
  { name: 'Mission 3A', href: 'https://www.mission3a.com', image: `${P}mission-3a-2.webp` },
  { name: 'Keystone Capital', href: 'https://keystone-investing.com', image: `${P}keystone-2.webp` },
  { name: 'Stackhouse Ventures', href: 'https://stackhouseventures.com', image: `${P}stackhouse-hero.jpg` },
  { name: 'Our Appologies', href: 'https://www.ourappologies.com', image: `${P}our-appologies-2.png` },
]

export const ORGANIZATIONS: PartnerEntry[] = [
  { name: 'Gloo', href: 'https://gloo.com', logo: '/images/partners/logo-gloo.png' },
  { name: 'SeedTree Group', href: 'https://www.seedtreegroup.com', image: `${P}seedtree-hero.jpg` },
  { name: 'Faith Driven Entrepreneur', href: 'https://faithdrivenentrepreneur.org', image: `${P}faith-driven-entrepreneur-hero.jpg` },
  { name: 'Praxis', href: 'https://www.praxis.co', image: `${P}praxis-2.png` },
  { name: 'Schools United', href: 'https://schoolsunited.org' },
  { name: 'Classical Conversations', href: 'https://www.classicalconversations.com' },
  { name: 'Classic Learning Test', href: 'https://www.cltexam.com', logo: '/images/partners/CLT Logo PNG Blue.svg' },
  { name: 'Young Life', href: 'https://www.younglife.org' },
  { name: 'Texas Homeschool Coalition', href: 'https://thsc.org' },
  { name: 'Servant', href: 'https://servant.io' },
  { name: 'The Data Group', href: 'https://www.thedatagroup.cloud' },
  { name: 'Celebration Church', href: 'https://www.celebrationchurch.org' },
]

export const UNIVERSITIES: PartnerEntry[] = [
  {
    name: 'Austin Christian University',
    href: 'https://www.austinchristianuniversity.org',
    note: 'Home campus and permanent affiliate. Georgetown, Texas.',
  },
  {
    name: 'Southeastern University',
    href: 'https://www.seu.edu',
    note: 'Credit partner. ACU students dual-enroll toward an SEU BBA while ACU completes accreditation. Lakeland, Florida.',
  },
]

export const HIGH_SCHOOLS: PartnerEntry[] = [
  { name: 'Valley Christian School', href: 'https://www.vcs.net', image: `${S}valley-christian.jpg` },
  { name: 'The Stony Brook School', href: 'https://www.sbs.org', image: `${S}stony-brook.jpg` },
  { name: 'Oaks Christian School', href: 'https://www.oakschristian.org', image: `${S}oaks-christian.jpg` },
  { name: 'Sierra Canyon School', href: 'https://www.sierracanyon.org', image: `${S}sierra-canyon.jpg` },
  { name: 'Santa Fe Christian Schools', href: 'https://sfcs.net', image: `${S}santa-fe-christian.jpg` },
  { name: 'Gilbert Christian Schools', href: 'https://www.gilbertchristianschools.org', image: `${S}gilbert-christian.jpg` },
  { name: 'Greater Atlanta Christian School', href: 'https://www.greateratlantachristian.org', image: `${S}greater-atlanta-christian.jpg` },
  { name: 'Little Rock Christian Academy', href: 'https://www.littlerockchristian.com', image: `${S}little-rock-christian.jpg` },
  { name: 'Jupiter Christian School', href: 'https://www.jupiterchristian.org', image: `${S}jupiter-christian.jpg` },
  { name: 'Southwest Christian High School', href: 'https://www.swchs.org', image: `${S}southwestern-christian.webp` },
  { name: 'Regent School of Austin', href: 'https://www.regentsaustin.org', image: `${S}regent-school.webp` },
  { name: 'Cincinnati Hills Christian Academy', href: 'https://www.chca-oh.org', image: `${S}cincinnati-hills.jpg` },
  { name: 'Linfield Christian School', href: 'https://www.linfield.com', image: `${S}linfield-christian.png` },
  { name: 'Timothy Christian Schools', href: 'https://www.timothychristian.com', image: `${S}timothy-christian.jpg` },
  { name: 'Silverdale Baptist Academy', href: 'https://www.silverdaleba.org', image: `${S}silverdale-baptist.jpg` },
  { name: 'Cuyahoga Valley Christian Academy', href: 'https://www.cvcaroyals.org', image: `${S}cuyahoga-valley-hero.jpg` },
  { name: 'Heritage Christian Academy', href: 'https://www.heritageweb.org', image: `${S}heritage.jpg` },
]

/** Organizations in the ecosystem the studio is connected to, not formally partnered with. */
export const NETWORK: PartnerEntry[] = [
  { name: 'Builders + Backers', href: 'https://www.buildersandbackers.com' },
  { name: 'Startup Garage', href: 'https://www.startupgarage.org' },
  { name: 'Eagle Venture Studio', href: 'https://eagleventurestudio.com' },
  { name: 'Missional Labs', href: 'https://missionallabs.co' },
  { name: "Solving the World's Greatest Problems", href: 'https://solving.org' },
  { name: "The Lion's Den", href: 'https://www.thelionsden.us' },
  { name: 'Christian Economic Forum', href: 'https://christianeconomicforum.com' },
  { name: 'C12', href: 'https://www.joinc12.com' },
  { name: 'Commissioned', href: 'https://www.livingcommissioned.com' },
  { name: 'National Christian Foundation', href: 'https://www.ncfgiving.com' },
  { name: 'Impact Foundation', href: 'https://www.impactfoundation.org' },
  { name: 'The Signatry', href: 'https://thesignatry.com' },
  { name: 'Talanton', href: 'https://www.talantonimpact.com' },
  { name: 'Ocean Programs', href: 'https://www.oceanprograms.com' },
  { name: 'ACSI', href: 'https://www.acsi.org' },
  { name: 'CESA', href: 'https://cesaschools.org' },
]
