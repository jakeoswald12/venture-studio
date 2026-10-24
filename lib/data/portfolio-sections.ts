// ─────────────────────────────────────────────────────────────────────────────
// The long-form content that runs below the tile wall on /portfolio.
//
// This is the /startups deck, unrolled into a scrolling page: the same words,
// the same order, minus the slide chrome. Copy lives here so the page component
// stays layout-only, and so a wording change never means touching JSX.
//
// Emphasis markers match the deck's convention and are rendered by `Emphasis`
// in PortfolioSections.tsx:
//   **like this** → bronze    *like this* / _like this_ → italic
// ─────────────────────────────────────────────────────────────────────────────

export interface FeatureRow {
  label: string
  description: string
}

/** A partner in the ecosystem wall — the flipped grid halfway down the page. */
export interface EcosystemPartner {
  name: string
  href: string
  /** Omit until artwork exists — the tile falls back to a navy name plate. */
  image?: string
  /**
   * Source width ÷ height. Needed because these tiles crop a landscape photo to
   * a square: `object-cover` scales the image until its HEIGHT fills the tile,
   * so the rendered width is (tile width × aspect). Next/image picks a
   * rendition from the `sizes` hint, so `sizes` has to describe that rendered
   * width, not the tile — otherwise a wide source is fetched far too small and
   * blown up. See PortfolioSections.
   */
  aspect?: number
  /**
   * CSS object-position. Everything is centred by default; the two entries that
   * set this have their subject hard against the left edge of the source file,
   * so a centre crop loses it.
   */
  objectPosition?: string
}

/** The disciplines an accelerator team delivers against. Six, not eight:
 *  software and interface design are one craft now, and so are the media and
 *  marketing skills a team uses to put work in front of people. */
export const DISCIPLINES: FeatureRow[] = [
  { label: 'Research', description: 'Customer interviews, market sizing and problem validation.' },
  { label: 'Strategy', description: 'Business models, pricing and launch plans.' },
  { label: 'AI & Software', description: 'Websites, apps, internal tools and AI agents.' },
  { label: 'Branding', description: 'Names, logos, visual identity and messaging.' },
  { label: 'Marketing', description: 'Photo, video, copywriting and paid advertising.' },
  { label: 'Sales', description: 'Lead lists, outreach and customer pipeline.' },
]

/** What a founder is actually getting when a team shows up — the case that the
 *  people, not the hours, are the thing worth having. */
export const STUDENT_QUALITIES: FeatureRow[] = [
  { label: 'Character', description: 'Committed Christians. Faith is considered during selection.' },
  { label: 'Skill', description: 'Selected on demonstrated ability and placed by discipline.' },
  { label: 'Communication', description: 'Present their work to the founder every week.' },
  { label: 'Process', description: 'Meet twice a week against a written project scope.' },
]

/** What a student gets out of it. */
export const STUDENT_BENEFITS: FeatureRow[] = [
  { label: 'Portfolio', description: 'Finished work for real companies to show employers.' },
  { label: 'Network', description: 'Weekly contact with founders, investors and mentors.' },
  { label: 'Team', description: 'Six students working together for a full semester.' },
  { label: 'Credit', description: 'Practicum course credit for each semester on a project.' },
]

/**
 * The ecosystem wall, in display order. The deck groups these into capital,
 * studios, community and philanthropy; the page runs them as one field — the
 * point is the density, not the taxonomy.
 */
export const ECOSYSTEM_PARTNERS: EcosystemPartner[] = [
  {
    name: "Sovereign's Capital",
    href: 'https://sovereignscapital.com',
    image: '/images/builder-scholars/partners/sovereigns-capital-2.png',
    aspect: 1.778,
  },
  {
    name: 'Wave Ventures',
    href: 'https://www.waveventures.com',
    image: '/images/builder-scholars/partners/wave-ventures-2.png',
    aspect: 3.364,
  },
  {
    name: 'Mission 3A',
    href: 'https://www.mission3a.com',
    image: '/images/builder-scholars/partners/mission-3a-2.webp',
    aspect: 1.778,
  },
  {
    name: 'Waterstone Impact Fund',
    href: 'https://waterstoneimpactfund.com',
    image: '/images/builder-scholars/partners/waterstone-2.jpg',
    aspect: 1.784,
  },
  {
    name: '11 Tribes',
    href: 'https://11tribes.vc',
    image: '/images/builder-scholars/partners/11-tribes-2.jpg',
    aspect: 1.5,
  },
  {
    name: 'Eagle Venture Fund',
    href: 'https://www.eagleventurefund.com',
    image: '/images/builder-scholars/partners/eagle-venture-fund.jpg',
    aspect: 2.454,
  },
  {
    name: 'Builders + Backers',
    href: 'https://www.buildersandbackers.com',
    image: '/images/builder-scholars/partners/builders-backers-hero.png',
    aspect: 1.583,
  },
  {
    name: 'Startup Garage',
    href: 'https://www.startupgarage.org',
    image: '/images/builder-scholars/partners/startup-garage-2.webp',
    aspect: 1.5,
  },
  {
    name: 'Praxis',
    href: 'https://www.praxis.co',
    image: '/images/builder-scholars/partners/praxis-2.png',
    aspect: 1.4,
  },
  {
    name: 'Eagle Venture Studio',
    href: 'https://eagleventurestudio.com',
    image: '/images/builder-scholars/partners/eagle-venture-studio.jpg',
    objectPosition: '20% center',
    aspect: 2.186,
  },
  {
    name: 'Missional Labs',
    href: 'https://missionallabs.co',
    image: '/images/builder-scholars/partners/missional-labs-2.webp',
    aspect: 1.499,
  },
  {
    name: 'Faith Driven Entrepreneur',
    href: 'https://faithdrivenentrepreneur.org',
    image: '/images/builder-scholars/partners/faith-driven-entrepreneur-hero.jpg',
    aspect: 1.5,
  },
  {
    name: "Solving the World's Greatest Problems",
    href: 'https://solving.org',
    image: '/images/builder-scholars/partners/swgp-hero.jpg',
    aspect: 1.517,
  },
  {
    name: "The Lion's Den",
    href: 'https://www.thelionsden.us',
    image: '/images/builder-scholars/partners/lions-den-hero.jpg',
    aspect: 1.5,
  },
  {
    name: 'Christian Economic Forum',
    href: 'https://christianeconomicforum.com',
    image: '/images/builder-scholars/partners/christian-economic-forum-hero.jpg',
    aspect: 1.5,
  },
  {
    name: 'C12',
    href: 'https://www.joinc12.com',
    image: '/images/builder-scholars/partners/c12-2.jpg',
    aspect: 1.499,
  },
  {
    name: 'Our Appologies',
    href: 'https://www.ourappologies.com',
    image: '/images/builder-scholars/partners/our-appologies-2.png',
    aspect: 2.5,
  },
  {
    name: 'Keystone Capital',
    href: 'https://keystone-investing.com',
    image: '/images/builder-scholars/partners/keystone-2.webp',
    aspect: 1.778,
  },
  {
    name: 'Stackhouse Ventures',
    href: 'https://stackhouseventures.com',
    image: '/images/builder-scholars/partners/stackhouse-hero.jpg',
    aspect: 1.294,
  },
  {
    name: 'Impact Foundation',
    href: 'https://www.impactfoundation.org',
    image: '/images/builder-scholars/partners/impact-foundation-hero.png',
    aspect: 1.5,
  },
  {
    name: 'National Christian Foundation',
    href: 'https://www.ncfgiving.com',
    image: '/images/builder-scholars/partners/ncf-hero.jpg',
    aspect: 2.667,
  },
  {
    name: 'The Signatry',
    href: 'https://thesignatry.com',
    image: '/images/builder-scholars/partners/the-signatry-2.png',
    objectPosition: '20% center',
    aspect: 2.583,
  },
  {
    name: 'Commissioned',
    href: 'https://www.livingcommissioned.com',
    image: '/images/builder-scholars/partners/commissioned-hero.jpg',
    aspect: 1.5,
  },
  {
    name: 'SeedTree Group',
    href: 'https://www.seedtreegroup.com',
    image: '/images/builder-scholars/partners/seedtree-hero.jpg',
    aspect: 1.5,
  },
  { name: 'Ocean Programs', href: 'https://www.oceanprograms.com' },
  { name: 'Talanton', href: 'https://www.talantonimpact.com' },
]

/** The founder voice carried on the "zero cost" beat in the deck. */
export const FOUNDER_QUOTE = {
  quote:
    'ACU students are showcasing a rigorously intellectual foundation coupled with a moral, Christian fabric — a combo the world desperately needs more of. I wouldn’t hesitate to bring an ACU student on.',
  name: 'John Kronlokken',
  title: 'Founder, Evergreen / Ex-Strategy, Google',
}

/** The partner school shown on the Builder Scholars path. */
export const HIGH_SCHOOL_PLACEHOLDER = {
  name: 'Jupiter Christian School',
  href: 'https://www.jupiterchristian.org',
  image: '/images/builder-scholars/schools/jupiter-christian.jpg',
}

/** Stand-in art for the pitch-competition path until we shoot the real thing. */
export const PITCH_COMPETITION_PLACEHOLDER = {
  image: '/images/misc_photos/panel_on_stage.jpg',
  alt: 'Students presenting on stage at ACU',
}

/** How many high schools ACU sponsors to the Gloo Hackathon each year. */
export const GLOO_SPONSORED_SCHOOLS = 5

/** The "get involved" form — the same HubSpot form /startups submits to. */
export const APPLY_FORM = {
  portalId: '46017179',
  formId: 'fb3719b1-59e2-434f-bb94-1019bf432b36',
  region: 'na1',
}

export const APPLY_BYLINE = {
  name: 'Jake Oswald',
  title: 'Director, ACU Accelerator',
  photo: '/images/headshots/jake-oswald.png',
  linkedin: 'https://www.linkedin.com/in/jake-oswald/',
}

/** The overview film embedded on the opening beat. */
export const OVERVIEW_VIDEO_ID = 'fRzxBW_DL34'

/** The Gloo Hackathon recap reel. */
export const GLOO_VIDEO = { id: '1126287895', hash: '48eefae23b' }

/** The same reel on Vimeo itself, for the 'watch the recap' link. */
export const GLOO_VIDEO_URL = `https://vimeo.com/${GLOO_VIDEO.id}/${GLOO_VIDEO.hash}`

export const BUILDER_SCHOLARS_LINK = 'https://www.austinchristianuniversity.org/builder-scholars'
