/**
 * Partners page content.
 *
 * Venture firms and the broader network are in the order Jake set. High
 * schools start from ACU's "Partner Schools" list. Universities are the top
 * targets from the go-to-market list (wave 1, by enrollment), after ACU.
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
  { name: 'Discipulus Ventures', href: 'https://www.discipulusventures.com' },
  { name: 'Capital Factory', href: 'https://www.capitalfactory.com' },
  { name: 'Overmatch', href: 'https://www.overmatch.vc' },
  { name: "Sovereign's Capital", href: 'https://sovereignscapital.com', image: `${P}sovereigns-capital-2.png` },
  { name: 'Live Oak Ventures', href: 'https://liveoak.vc' },
  { name: 'Wave Ventures', href: 'https://www.waveventures.com', image: `${P}wave-ventures-2.png` },
  { name: 'Eagle Venture Fund', href: 'https://www.eagleventurefund.com', image: `${P}eagle-venture-fund.jpg` },
  { name: 'Fireroad', href: 'https://www.fireroad.io' },
  { name: '11 Tribes', href: 'https://11tribes.vc', image: `${P}11-tribes-2.jpg` },
  { name: 'Worldview', href: 'https://worldview.vc' },
  { name: 'Waterstone Impact Fund', href: 'https://waterstoneimpactfund.com', image: `${P}waterstone-2.jpg` },
  { name: 'Mission 3A', href: 'https://www.mission3a.com', image: `${P}mission-3a-2.webp` },
  { name: 'Keystone Capital', href: 'https://keystone-investing.com', image: `${P}keystone-2.webp` },
  { name: 'Stackhouse Ventures', href: 'https://stackhouseventures.com', image: `${P}stackhouse-hero.jpg` },
  { name: 'Our Appologies', href: 'https://www.ourappologies.com', image: `${P}our-appologies-2.png` },
  { name: 'Builders + Backers', href: 'https://www.buildersandbackers.com', image: `${P}builders-backers-hero.png` },
  { name: 'Startup Garage', href: 'https://www.startupgarage.org', image: `${P}startup-garage-2.webp` },
  { name: 'Missional Labs', href: 'https://missionallabs.co', image: `${P}missional-labs-2.webp` },
]

/** Partner organizations and the wider ecosystem, in one list. */
export const NETWORK: PartnerEntry[] = [
  { name: 'Praxis', href: 'https://www.praxis.co', image: `${P}praxis-2.png` },
  { name: 'Faith Driven Entrepreneur', href: 'https://faithdrivenentrepreneur.org', image: `${P}faith-driven-entrepreneur-hero.jpg` },
  { name: 'Gloo', href: 'https://gloo.com', logo: '/images/partners/logo-gloo.png' },
  { name: 'Solving', href: 'https://solving.org', image: `${P}swgp-hero.jpg` },
  { name: 'Venture Forge' },
  { name: 'Christian Economic Forum', href: 'https://christianeconomicforum.com', image: `${P}christian-economic-forum-hero.jpg` },
  { name: 'National Christian Foundation', href: 'https://www.ncfgiving.com', image: `${P}ncf-hero.jpg` },
  { name: 'Impact Foundation', href: 'https://www.impactfoundation.org', image: `${P}impact-foundation-hero.png` },
  { name: 'The Signatry', href: 'https://thesignatry.com', image: `${P}the-signatry-2.png`, objectPosition: '20% center' },
  { name: 'Talanton', href: 'https://www.talantonimpact.com' },
  { name: 'CESA', href: 'https://cesaschools.org' },
  { name: 'ACSI', href: 'https://www.acsi.org' },
  { name: 'SeedTree Group', href: 'https://www.seedtreegroup.com', image: `${P}seedtree-hero.jpg` },
  { name: 'Schools United', href: 'https://schoolsunited.org' },
  { name: 'Classical Conversations', href: 'https://www.classicalconversations.com' },
  { name: 'Classic Learning Test', href: 'https://www.cltexam.com', logo: '/images/partners/CLT Logo PNG Blue.svg' },
  { name: 'C12', href: 'https://www.joinc12.com', image: `${P}c12-2.jpg` },
  { name: 'Commissioned', href: 'https://www.livingcommissioned.com', image: `${P}commissioned-hero.jpg` },
  { name: 'Ocean Programs', href: 'https://www.oceanprograms.com' },
]

/**
 * ACU, then top go-to-market targets (wave 1). The best-known schools come
 * first; the first fourteen show before "See all".
 */
export const UNIVERSITIES: PartnerEntry[] = [
  { name: 'Austin Christian University', href: 'https://www.austinchristianuniversity.org' },
  { name: 'Azusa Pacific University', href: 'https://www.apu.edu' },
  { name: 'Point Loma Nazarene University', href: 'https://www.pointloma.edu' },
  { name: 'George Fox University', href: 'https://www.georgefox.edu' },
  { name: 'Indiana Wesleyan University', href: 'https://www.indwes.edu' },
  { name: 'Colorado Christian University', href: 'https://www.ccu.edu' },
  { name: 'Southeastern University', href: 'https://www.seu.edu' },
  { name: 'Eastern University', href: 'https://www.eastern.edu' },
  { name: 'Concordia University St. Paul', href: 'https://www.csp.edu' },
  { name: 'Saint Leo University', href: 'https://www.saintleo.edu' },
  { name: 'Concordia University Chicago', href: 'https://www.cuchicago.edu' },
  { name: 'University of the Cumberlands', href: 'https://www.ucumberlands.edu' },
  { name: 'Campbellsville University', href: 'https://www.campbellsville.edu' },
  { name: 'Missouri Baptist University', href: 'https://www.mobap.edu' },
  { name: 'William Carey University', href: 'https://www.wmcarey.edu' },
  { name: 'Houston Christian University', href: 'https://hc.edu' },
  { name: 'Bethel University', href: 'https://www.bethel.edu' },
  { name: 'Lee University', href: 'https://www.leeuniversity.edu' },
  { name: 'Anderson University', href: 'https://andersonuniversity.edu' },
  { name: 'Mississippi College', href: 'https://www.mc.edu' },
  { name: 'Concordia University Irvine', href: 'https://www.cui.edu' },
  { name: 'Concordia University Wisconsin', href: 'https://www.cuw.edu' },
  { name: 'Charleston Southern University', href: 'https://www.csuniv.edu' },
  { name: 'Belhaven University', href: 'https://www.belhaven.edu' },
  { name: 'Wingate University', href: 'https://www.wingate.edu' },
  { name: 'Concordia University Nebraska', href: 'https://www.cune.edu' },
  { name: 'Lindsey Wilson University', href: 'https://www.lindsey.edu' },
  { name: 'Pensacola Christian College', href: 'https://www.pcci.edu' },
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
  { name: 'Regent School of Austin', href: 'https://www.regentsaustin.org', image: `${S}regent-school.webp` },
  { name: 'Southwest Christian High School', href: 'https://www.swchs.org', image: `${S}southwestern-christian.webp` },
  { name: 'Cincinnati Hills Christian Academy', href: 'https://www.chca-oh.org', image: `${S}cincinnati-hills.jpg` },
  { name: 'Linfield Christian School', href: 'https://www.linfield.com', image: `${S}linfield-christian.png` },
  { name: 'Timothy Christian Schools', href: 'https://www.timothychristian.com', image: `${S}timothy-christian.jpg` },
  { name: 'Silverdale Baptist Academy', href: 'https://www.silverdaleba.org', image: `${S}silverdale-baptist.jpg` },
  { name: 'Cuyahoga Valley Christian Academy', href: 'https://www.cvcaroyals.org', image: `${S}cuyahoga-valley-hero.jpg` },
  { name: 'Heritage Christian Academy', href: 'https://www.heritageweb.org', image: `${S}heritage.jpg` },
  { name: 'Grand Rapids Christian Schools', href: 'https://www.grcs.org', image: `${S}grand-rapids-christian-schools.jpg` },
  { name: 'Grace Preparatory Academy', href: 'https://graceprep.org', image: `${S}grace-preparatory-academy.jpg` },
  { name: 'McKinney Christian Academy', href: 'https://www.mckinneychristian.org', image: `${S}mckinney-christian-academy.webp` },
  { name: 'Cascade Christian Schools', href: 'https://www.cascadechristian.org', image: `${S}cascade-christian-schools.jpg` },
  { name: 'Bayshore Christian School', href: 'https://www.bayshorechristian.org' },
  { name: 'Founders Classical Academy of Leander' },
  { name: 'Gateway College Preparatory School' },
  { name: 'Prestonwood Christian Academy', href: 'https://www.prestonwoodchristian.org' },
  { name: 'Wheaton Academy', href: 'https://www.wheatonacademy.org' },
  { name: 'Westminster Christian Academy', href: 'https://www.wcastl.org' },
  { name: 'Brentwood Academy', href: 'https://www.brentwoodacademy.com' },
  { name: 'Christ Presbyterian Academy', href: 'https://www.cpalions.org' },
  { name: 'Wesleyan School', href: 'https://www.wesleyanschool.org' },
  { name: 'Whitefield Academy', href: 'https://www.whitefieldacademy.com' },
  { name: 'Trinity Christian Academy', href: 'https://www.trinitychristian.org' },
  { name: 'Liberty Christian School', href: 'https://www.libertychristian.com' },
  { name: 'Lakeland Christian School', href: 'https://www.lakelandchristian.net' },
  { name: 'Hyde Park Schools', href: 'https://www.hydeparkschools.org' },
]
