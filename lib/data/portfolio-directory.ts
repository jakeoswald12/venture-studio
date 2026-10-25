// ─────────────────────────────────────────────────────────────────────────────
// Accelerator portfolio directory — companies, their engagements, and the
// students who worked on them.
//
// GENERATED from the Fall 26 / Spring 26 accelerator project trackers. Hand
// edits are fine and expected: this file is the single source of truth for
// /portfolio, /portfolio/[company] and /portfolio/student/[student].
//
// Adding a company: append to PORTFOLIO_COMPANIES with a unique slug, then run
// nothing — PORTFOLIO_STUDENTS is derived from the rosters at module load, so
// a student appears on their own profile the moment they appear on a team.
//
// Deliberately absent: GPA. Cumulative GPA is an education record under FERPA
// and this directory is public, so it is not carried in this file at all.
// ─────────────────────────────────────────────────────────────────────────────

export type StudentRole = 'Student Lead' | 'Contributor' | 'Builder Scholar'

/** Display order, and the order the role tiers render in on a company page. */
export const STUDENT_ROLES: StudentRole[] = ['Student Lead', 'Contributor', 'Builder Scholar']

export type Cohort = 'Spring 2027' | 'Fall 2026' | 'Spring 2026' | 'Prior cohorts'

/** Newest first — drives the cohort filter and "also from" rails. */
export const COHORTS: Cohort[] = ['Spring 2027', 'Fall 2026', 'Spring 2026', 'Prior cohorts']

export interface TeamMember {
  name: string
  role: StudentRole
}

/** One semester of work on one company. A company can have several. */
export interface Engagement {
  cohort: Cohort
  /** 'Upcoming' before the semester starts, 'Active' while it runs, 'Shipped'
   *  once it has closed. */
  status: 'Upcoming' | 'Active' | 'Shipped'
  /** ACU staff serving as practicum advisor. */
  advisors: string[]
  /** Founders / executive sponsors on the company side. Omitted where none is
   *  on record — most Fall 26 engagements are still missing theirs. */
  sponsors?: string[]
  team: TeamMember[]
  /** Roster carried over from the deck and not yet confirmed per-project. */
  rosterUnverified?: boolean
}

export interface CompanyTestimonial {
  quote: string
  name: string
  title: string
  /** Path under /public/images/headshots/. */
  photo?: string
}

/**
 * A block in a company's case study — the long-form showcase of the work that
 * runs down the right column of /portfolio/[company].
 *
 * Blocks render in order. An `image` with no `src` renders as a labelled frame
 * so the layout can be built before the artwork exists.
 */
export type ShowcaseBlock =
  | { kind: 'heading'; eyebrow?: string; text: string }
  | { kind: 'copy'; text: string }
  | { kind: 'image'; src?: string; alt: string; caption?: string; ratio?: '16/9' | '4/3' | '1/1' }
  | { kind: 'stats'; items: { value: string; label: string }[] }
  | { kind: 'quote'; text: string; attribution?: string }

export interface PortfolioCompany {
  /** URL-safe identity. STABLE — /portfolio/<slug> links depend on it. */
  slug: string
  name: string
  /** Short category line under the name. Omit and the UI shows a "needed" slot. */
  descriptor?: string
  /** Public site. Omit for companies with nothing to link to. */
  url?: string
  /** 1–3 sentences on what the team shipped. */
  blurb?: string
  disciplines?: string[]
  /**
   * The tile artwork on /portfolio — a still, a looping GIF, or a muted
   * looping video (.mp4 / .webm), under /public/images/portfolio/tiles/.
   * Square source, please: the grid crops to 1:1. Falls back to a tinted
   * monogram panel so a company with no artwork still reads as a real tile.
   */
  tile?: string
  /**
   * Horizontal focal point of `tile`, 0–100, measured left to right. The grid
   * crops landscape artwork to a square, so the default centre crop often cuts
   * the subject; this says which slice to keep. 50 (centre) when omitted.
   */
  tileFocus?: number
  /**
   * `tile`'s source width ÷ height. `object-cover` scales the image until its
   * HEIGHT fills the square, so the painted width is (tile width × aspect) —
   * and the `sizes` hint has to describe THAT, or a wide source gets fetched
   * far too small and blown up. See CompanyTile.
   */
  tileAspect?: number
  /**
   * White-on-transparent PNG logo revealed in the tile's top-left on hover,
   * under /public/images/portfolio/logos/. Always the white mark, whatever the
   * brand's own colors are — the hover scrim is dark. Falls back to the company
   * name set in white.
   */
  logoWhite?: string
  engagements: Engagement[]
  testimonial?: CompanyTestimonial
  /** The case study — photos and copy showing what the team actually shipped. */
  showcase?: ShowcaseBlock[]
}

export interface StudentProject {
  /** PortfolioCompany.slug */
  company: string
  role: StudentRole
  cohort: Cohort
}

export interface PortfolioStudent {
  slug: string
  name: string
  projects: StudentProject[]
  /** Highest tier this student has held across all engagements. */
  topRole: StudentRole
  /** Fields below are collected from the student; none are required. */
  yearInSchool?: string
  hometown?: string
  venture?: string
  bio?: string
  interests?: string[]
  email?: string
  phone?: string
  linkedin?: string
  /** Headshot under /public/images/headshots/. Falls back to initials. */
  photo?: string
}

const ALL_COMPANIES: PortfolioCompany[] = [
  // Added for the West Ventures site. Descriptors and links still needed for most.
  {
    slug: 'energy-outlet',
    name: 'Energy Outlet',
    engagements: [],
  },
  {
    slug: 'stratified-insight',
    name: 'Stratified Insight',
    engagements: [],
  },
  {
    slug: 'build-array',
    name: 'Build Array',
    engagements: [],
  },
  {
    slug: 'noble-joe-coffee',
    name: 'Noble Joe Coffee',
    descriptor: 'Coffee',
    engagements: [],
  },
  {
    slug: 'fundify',
    name: 'Fundify',
    descriptor: 'Startup Funding Platform',
    engagements: [],
  },
  {
    slug: 'importal',
    name: 'Importal',
    engagements: [],
  },
  {
    slug: 'the-golf-house',
    name: 'The Golf House',
    engagements: [],
  },
  {
    slug: 'square-cow-movers',
    name: 'Square Cow Movers',
    descriptor: 'Moving Company',
    engagements: [],
  },
  {
    slug: 'parks-pro',
    name: 'Parks Pro',
    engagements: [],
  },
  {
    slug: 'rad-energy',
    name: 'Rad Energy',
    engagements: [],
  },
  {
    slug: 'mekko-ai',
    name: 'mekko.ai',
    url: 'https://mekko.ai',
    engagements: [],
  },
  // Studio joint ventures (added for the West Ventures site).
  {
    slug: 'unify',
    name: 'Unify',
    descriptor: 'Software for Nonprofits',
    url: 'https://unify-production.vercel.app/',
    blurb:
      'Nonprofits pay for many separate subscriptions: a CRM, a donor page, volunteer management, grant tracking, a website and task management. Unify replaces them with one platform built for each organization.',
    engagements: [],
  },
  {
    slug: 'builders-quotient',
    name: "Builder's Quotient",
    descriptor: 'Entrepreneurial Assessment',
    url: 'https://bq.austinchristianu.org/',
    blurb:
      "A 20-minute psychometric assessment that measures practical intelligence, creative reasoning and a person's builder profile.",
    engagements: [],
  },
  {
    slug: 'blkbox',
    name: 'blkbox.io',
    descriptor: 'Private AI Trading Fund',
    url: 'https://blkbox.io',
    blurb:
      'A private hedge fund. Its AI models trade highly liquid markets (stock options, cryptocurrency and betting markets) and retrain on their own results, 24 hours a day, 365 days a year.',
    engagements: [],
  },
  {
    slug: 'waterside-by-ulteum',
    name: 'Waterside by Ulteum',
    descriptor: 'Lakeside Property',
    tile: '/images/builder-scholars/gull-lake-mn-by-ulteum.webp',
    tileFocus: 50,
    tileAspect: 1.995,
    engagements: [{ cohort: 'Spring 2027', status: 'Upcoming', advisors: [], team: [] }],
  },
  {
    slug: 'bible-memory-project',
    name: 'Bible Memory Project',
    descriptor: 'Scripture Memorization',
    url: 'https://biblememproject.com',
    engagements: [{ cohort: 'Spring 2027', status: 'Upcoming', advisors: [], team: [] }],
  },
  {
    slug: 'youversion',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/youversion-final2.png',
    tileFocus: 40,
    tileAspect: 3.499,
    name: 'YouVersion',
    descriptor: 'Bible App',
    url: 'https://www.youversion.com',
    // Spring 2027 — roster not picked yet.
    engagements: [{ cohort: 'Spring 2027', status: 'Upcoming', advisors: [], team: [] }],
  },
  {
    slug: 'burlebo',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/burlebo.png',
    tileFocus: 20,
    tileAspect: 2.0,
    name: 'Burlebo',
    descriptor: 'Outdoor Apparel Brand',
    url: 'https://www.burlebo.com',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Jack Malouff',
            role: 'Student Lead'
          },
          {
            name: 'Avery Frank',
            role: 'Contributor'
          },
          {
            name: 'Cole Elzerman',
            role: 'Contributor'
          },
          {
            name: 'Mackenzie Kendall',
            role: 'Builder Scholar'
          },
          {
            name: 'Trevor Morrison',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'overflow',
    tile: '/images/builder-scholars/overflow.webp',
    tileFocus: 55,
    tileAspect: 2.334,
    name: 'Overflow',
    descriptor: 'Generosity Platform',
    url: 'https://www.overflow.co/',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Campbell Hairston',
            role: 'Student Lead'
          },
          {
            name: 'Jonah Elliot',
            role: 'Contributor'
          },
          {
            name: 'Emerson Parker',
            role: 'Contributor'
          },
          {
            name: 'Jonathan Cheng',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'regent-bank',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/regent-bank.png',
    tileFocus: 20,
    tileAspect: 3.0,
    name: 'Regent Bank',
    descriptor: 'Community Banking',
    url: 'https://www.regent.bank',
    // Placeholder case study — Latin copy and empty image frames, so the
    // layout can be reviewed before the real photography and writing land.
    showcase: [
      { kind: 'heading', eyebrow: 'The brief', text: 'Lorem ipsum dolor sit amet' },
      {
        kind: 'copy',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        kind: 'image',
        alt: 'Hero shot of the delivered work',
        caption: 'Placeholder — drop the hero image here.',
        ratio: '16/9',
      },
      {
        kind: 'stats',
        items: [
          { value: '00%', label: 'Lorem ipsum dolor' },
          { value: '0.0x', label: 'Consectetur adipiscing' },
          { value: '000', label: 'Sed do eiusmod tempor' },
        ],
      },
      { kind: 'heading', eyebrow: 'The approach', text: 'Excepteur sint occaecat cupidatat' },
      {
        kind: 'copy',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
      },
      {
        kind: 'image',
        alt: 'Detail of the work in progress',
        caption: 'Placeholder — a process shot, a screen, an artefact.',
        ratio: '4/3',
      },
      {
        kind: 'copy',
        text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
      },
      {
        kind: 'quote',
        text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
        attribution: 'Placeholder — a line from the sponsor',
      },
      { kind: 'heading', eyebrow: 'The outcome', text: 'Temporibus autem quibusdam' },
      {
        kind: 'copy',
        text: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
      },
      {
        kind: 'image',
        alt: 'Final delivered work',
        caption: 'Placeholder — the finished thing.',
        ratio: '16/9',
      },
    ],
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Katie Salmon',
            role: 'Student Lead'
          },
          {
            name: 'Maebry Magilke',
            role: 'Contributor'
          },
          {
            name: 'Austin-David Whitaker',
            role: 'Builder Scholar'
          },
          {
            name: 'Lillia Caldroney',
            role: 'Builder Scholar'
          },
          {
            name: 'Asher Friedman',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'venture-forge',
    name: 'Venture Forge',
    descriptor: 'Venture Studio',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Josh Siemens',
            role: 'Student Lead'
          },
          {
            name: 'CJ Larremore',
            role: 'Contributor'
          },
          {
            name: 'Graham MacDonald',
            role: 'Builder Scholar'
          },
          {
            name: 'Seowoong Chang',
            role: 'Builder Scholar'
          },
          {
            name: 'Adam Farris',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'adoption-is',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/adoption-is.png',
    tileFocus: 55,
    tileAspect: 2.0,
    name: 'Adoption.Is',
    descriptor: 'Adoption Advocacy',
    url: 'https://adoption.is',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Yakira Cardoso',
            role: 'Student Lead'
          },
          {
            name: 'Ryleigh Rolston',
            role: 'Contributor'
          },
          {
            name: 'Cooper Rich',
            role: 'Contributor'
          },
          {
            name: 'Paris Chinney',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'best-buddies',
    name: 'Best Buddies',
    descriptor: 'Inclusion Nonprofit',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Preslee Gordon',
            role: 'Student Lead'
          },
          {
            name: 'Asher Kuykendall',
            role: 'Contributor'
          },
          {
            name: 'Aubrey McNeely',
            role: 'Builder Scholar'
          },
          {
            name: 'Gracie Beyer',
            role: 'Builder Scholar'
          },
          {
            name: 'Graham MacDonald',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'commissioned',
    name: 'Commissioned',
    descriptor: 'Faith & Work',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Preslee Gordon',
            role: 'Student Lead'
          },
          {
            name: 'Emma Lansdale',
            role: 'Contributor'
          },
          {
            name: 'Sofia Landa',
            role: 'Builder Scholar'
          },
          {
            name: 'Alexis Guerrero',
            role: 'Builder Scholar'
          },
          {
            name: 'Sage Adcox',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'minneoats',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/minneoats.webp',
    tileFocus: 50,
    tileAspect: 1.25,
    name: 'Minneoats',
    descriptor: 'Consumer Packaged Goods',
    url: 'https://www.minneoats.com',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Lakelin George',
            role: 'Student Lead'
          },
          {
            name: 'Emma Roach',
            role: 'Contributor'
          },
          {
            name: 'Aly Comer',
            role: 'Builder Scholar'
          },
          {
            name: 'Bella Lovell',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'shareyourstory',
    name: 'ShareYourStory',
    descriptor: 'Story Capture Platform',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/share-your-story.webp',
    tileFocus: 30,
    tileAspect: 5.912,
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Trent Sikute'],
        team: [
          {
            name: 'Brynn Elzerman',
            role: 'Student Lead'
          },
          {
            name: 'Jaxon Bebee',
            role: 'Contributor'
          },
          {
            name: 'Noah Adams',
            role: 'Contributor'
          },
          {
            name: 'John Duggal',
            role: 'Builder Scholar'
          },
          {
            name: 'Tristan Forman',
            role: 'Builder Scholar'
          }
        ]
      },
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        sponsors: ['Will Severns'],
        team: [
          {
            name: 'Katie Salmon',
            role: 'Student Lead'
          },
          {
            name: 'Channing Kuykendall',
            role: 'Contributor'
          },
          {
            name: 'Maddox Bloodworth',
            role: 'Contributor'
          }
        ]
      }
    ]
  },
  {
    slug: 'tektones',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/techtones.png',
    tileFocus: 40,
    tileAspect: 1.777,
    name: 'Tektones',
    descriptor: 'Music Technology',
    url: 'https://tektones.com',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Jadlot'],
        team: [
          {
            name: 'Morgan Elder',
            role: 'Student Lead'
          },
          {
            name: 'Rylan Colburn',
            role: 'Contributor'
          },
          {
            name: 'Jack Wallander',
            role: 'Contributor'
          },
          {
            name: 'Adysen Devaney',
            role: 'Contributor'
          },
          {
            name: 'Grace Miller',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'the-care-app',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/care-app.png',
    tileFocus: 45,
    tileAspect: 1.503,
    name: 'The Care App',
    descriptor: 'Care Coordination',
    url: 'https://thecare.app',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Jadlot'],
        team: [
          {
            name: 'Addy Jeffers',
            role: 'Student Lead'
          },
          {
            name: 'Gavin Bebee',
            role: 'Contributor'
          },
          {
            name: 'Connor Dore',
            role: 'Builder Scholar'
          },
          {
            name: 'Iva Garza',
            role: 'Builder Scholar'
          },
          {
            name: 'Merci Wymore',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'athletes-ocean',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/athletes-ocean.jpg',
    tileFocus: 40,
    tileAspect: 1.778,
    name: 'Athletes Ocean',
    descriptor: 'Athlete Platform',
    url: 'https://app.athletesocean.com',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Jadlot'],
        team: [
          {
            name: 'Noah Nugent',
            role: 'Student Lead'
          },
          {
            name: 'Bryson Wuerch',
            role: 'Contributor'
          },
          {
            name: 'Alejandro Rodriguez',
            role: 'Builder Scholar'
          },
          {
            name: 'Oren Jones',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'heavytech',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/heavytech.png',
    tileFocus: 30,
    tileAspect: 2.0,
    name: 'HeavyTech',
    descriptor: 'Heavy Industry AI',
    url: 'https://heavytech.ai',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Jake Jadlot'],
        team: [
          {
            name: 'Weston Chambers',
            role: 'Student Lead'
          },
          {
            name: 'Jack Swanston',
            role: 'Contributor'
          },
          {
            name: 'Nathan Mireles',
            role: 'Contributor'
          },
          {
            name: 'Landyn White',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'launch-kids',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/launchkids.png',
    tileFocus: 45,
    tileAspect: 2.0,
    name: 'launch.kids',
    descriptor: 'Kids\' Vibe Coding',
    url: 'https://launch.kids',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Lars Ostervold'],
        team: [
          {
            name: 'Braden Peays',
            role: 'Student Lead'
          },
          {
            name: 'Gavin Bebee',
            role: 'Contributor'
          },
          {
            name: 'Connor Dore',
            role: 'Builder Scholar'
          },
          {
            name: 'Madilyn Morgan',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'lifetime-fitness',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/lifetime-fitness.jpg',
    tileFocus: 50,
    tileAspect: 1.778,
    name: 'Lifetime Fitness',
    descriptor: 'Health & Fitness Clubs',
    url: 'https://www.lifetime.life',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Lars Ostervold', 'Jake Oswald'],
        team: [
          {
            name: 'Cole Elzerman',
            role: 'Student Lead'
          },
          {
            name: 'Grace Mejia',
            role: 'Contributor'
          },
          {
            name: 'Michael Peays',
            role: 'Builder Scholar'
          },
          {
            name: 'Jake Lovelady',
            role: 'Builder Scholar'
          },
          {
            name: 'Mesa Bredahl',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'velora',
    name: 'Velora',
    descriptor: 'Early-Stage Venture',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Lars Ostervold'],
        team: [
          {
            name: 'Jensen Eichenauer',
            role: 'Student Lead'
          },
          {
            name: 'Joshua Helsel',
            role: 'Contributor'
          },
          {
            name: 'Caleb Kendrick',
            role: 'Contributor'
          },
          {
            name: 'Liam Mardock',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'lecrae-media',
    tile: '/images/builder-scholars/cohorts/fall-2026-cohort/lecrae.png',
    tileFocus: 35,
    tileAspect: 2.0,
    name: 'Lecrae Media',
    descriptor: 'Artist Media',
    url: 'https://lecrae.com',
    engagements: [
      {
        cohort: 'Fall 2026',
        status: 'Active',
        advisors: ['Erik Halley'],
        team: [
          {
            name: 'Braxton Hill',
            role: 'Student Lead'
          },
          {
            name: 'Aleigh Sparkman',
            role: 'Builder Scholar'
          },
          {
            name: 'Andrew Gintz',
            role: 'Builder Scholar'
          },
          {
            name: 'Nicholas Mirabella',
            role: 'Builder Scholar'
          }
        ]
      }
    ]
  },
  {
    slug: 'autofill-mobile',
    name: 'AutoFill Mobile',
    descriptor: 'Mobile Product',
    engagements: [
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        sponsors: ['Chase Maasdorp'],
        team: [
          {
            name: 'Justis Zachary',
            role: 'Student Lead'
          }
        ]
      }
    ]
  },
  {
    slug: 'baxo',
    tile: '/images/builder-scholars/cohorts/spring-2026-cohort/baxo-ai.webp',
    tileFocus: 50,
    tileAspect: 1.5,
    name: 'Baxo',
    descriptor: 'AI Performance Reviews',
    url: 'https://baxo.ai/',
    blurb: 'An AI-powered platform that turns performance reviews into a continuous, data-driven feedback loop — surfacing self, peer, and manager signals into a single growth picture for each team member. Students ran UX/UI quality-assurance cycles, delivered a GTM strategic review, and conducted supporting market research to sharpen Baxo\'s positioning and product polish.',
    disciplines: ['UX/UI', 'Strategy', 'Research'],
    engagements: [
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        sponsors: ['Nate Steele'],
        team: [
          {
            name: 'Josh Siemens',
            role: 'Student Lead'
          },
          {
            name: 'Addy Jeffers',
            role: 'Contributor'
          }
        ]
      }
    ]
  },
  {
    slug: 'evergreen',
    tile: '/images/builder-scholars/cohorts/spring-2026-cohort/evergreen.png',
    tileFocus: 30,
    tileAspect: 1.777,
    name: 'Evergreen',
    descriptor: 'Human-First Job Search',
    url: 'https://evergreencareer.ai/',
    blurb: 'A cutting-edge, human-first job search platform. Students conducted thorough customer discovery and market research to inform a comprehensive go-to-market strategy.',
    disciplines: ['Research', 'Marketing', 'Strategy'],
    engagements: [
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        sponsors: ['John Kronlokken'],
        team: [
          {
            name: 'Noah Nugent',
            role: 'Student Lead'
          },
          {
            name: 'Josh Siemens',
            role: 'Contributor'
          },
          {
            name: 'Jacob Thomas',
            role: 'Contributor'
          }
        ]
      }
    ],
    testimonial: {
      quote: 'I\'ve spent years working in Big Tech in Silicon Valley with the world\'s most premiere talent. The profile of the ACU student is unique. The world has a lot of knowledge, but it needs more wisdom. ACU students are showcasing a rigorously intellectual foundation coupled with a moral, Christian fabric — a combo the world desperately needs more of. I wouldn\'t hesitate to bring an ACU student on.',
      name: 'John Kronlokken',
      title: 'Founder & CEO, Evergreen / Ex-Corporate Strategy, Google'
    }
  },
  {
    slug: 'perm-cap',
    tile: '/images/builder-scholars/cohorts/spring-2026-cohort/perm-cap.png',
    tileFocus: 30,
    tileAspect: 1.777,
    name: 'Perm Cap',
    descriptor: 'Permanent Capital',
    url: 'https://www.permcap.com',
    engagements: [
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        sponsors: ['Connor Carew'],
        team: [
          {
            name: 'Katie Salmon',
            role: 'Student Lead'
          }
        ]
      }
    ]
  },
  {
    slug: 'servesource',
    name: 'ServeSource',
    descriptor: 'Service Marketplace',
    engagements: [
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Acacia Burnett',
            role: 'Student Lead'
          },
          {
            name: 'Charlene Vallejo',
            role: 'Contributor'
          },
          {
            name: 'Mia Lozoria',
            role: 'Contributor'
          },
          {
            name: 'Riley Monk',
            role: 'Contributor'
          }
        ]
      }
    ]
  },
  {
    slug: 'today-matters',
    tile: '/images/builder-scholars/cohorts/spring-2026-cohort/today-matters.png',
    tileFocus: 30,
    tileAspect: 1.777,
    name: 'Today Matters',
    descriptor: 'Time-Intelligence iOS App',
    url: 'https://todaymatters-turbo-landing.vercel.app/',
    blurb: 'A production iOS app that fuses GPS, Apple Health, Screen Time, and Google Calendar to automatically infer how each block of your day was actually spent. A dual-column calendar shows planned vs. actual side-by-side, with an AI coach and a daily faithfulness score turning passive data into a feedback loop for intentional living.',
    disciplines: ['Software Dev', 'UX/UI', 'Research'],
    engagements: [
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        sponsors: ['Paul Kent Graeve "Gravy'],
        team: [
          {
            name: 'Cole Elzerman',
            role: 'Student Lead'
          }
        ]
      }
    ],
    testimonial: {
      quote: 'Cole has been outstanding on our startup — smart, technically capable, coachable, hardworking, and a true team player. His contribution reflects not only strong technical skill, but the character, humility, and mission-minded leadership ACU is developing in its students.',
      name: 'Paul Kent Graeve',
      title: 'Founder & CEO, Today Matters'
    }
  },
  {
    slug: 'tourcaddy',
    tile: '/images/builder-scholars/cohorts/spring-2026-cohort/tour-caddy.png',
    tileFocus: 35,
    tileAspect: 1.777,
    name: 'TourCaddy',
    descriptor: 'Luxury Golf Hardware GTM',
    url: 'https://tourcaddy.co/',
    blurb: 'A luxury, motion-activated electronic golf ball dispenser in a premium bag-shaped form factor. Student teams drove event-based GTM, Meta ad strategy across discovery and conversion, Chinese contract manufacturing research, USB-C electronics diagnostics that fed the V2 roadmap, and SAFE-round investor documentation. Co-developed a voice-to-text lead capture tool that cut on-site contact time by an estimated 60%.',
    disciplines: ['Strategy', 'Marketing', 'Research'],
    engagements: [
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        sponsors: ['Chase Maasdorp'],
        team: [
          {
            name: 'Justis Zachary',
            role: 'Student Lead'
          }
        ]
      }
    ]
  },
  {
    slug: 'turn',
    tile: '/images/builder-scholars/cohorts/spring-2026-cohort/turn-apts.jpeg',
    tileFocus: 30,
    tileAspect: 1.499,
    name: 'Turn',
    descriptor: 'Multifamily Turnover OS',
    url: 'https://www.turnapts.com/',
    blurb: 'A SaaS operating system that automates the apartment unit turnover process — coordinating cleaning, painting, flooring, and inspections between vacancy and move-in. Replaces the whiteboards and texts that mid-size operators rely on, saving an average of 900+ staff hours per property annually.',
    disciplines: ['Software Dev', 'UX/UI', 'Branding'],
    engagements: [
      {
        cohort: 'Spring 2026',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        sponsors: ['Anthony Ruffner', 'John Pottebaum'],
        team: [
          {
            name: 'Brynn Elzerman',
            role: 'Student Lead'
          },
          {
            name: 'Kassidy Montanez',
            role: 'Contributor'
          },
          {
            name: 'Riley Monk',
            role: 'Contributor'
          }
        ]
      }
    ],
    testimonial: {
      quote: 'As an entrepreneur, I wish I had the college experience that ACU is creating. ACU provides students the opportunities they need to become excellent, and the students are delivering on that opportunity. Coming into the engagement, I thought it would be predominantly mentorship. I was wrong. The students delivered tangible value to our organization the whole way through. Movements like this will inspire the next generation of leaders to believe God is in all things, including our work.',
      name: 'Anthony Ruffner',
      title: 'Founder & CEO, Turn'
    }
  },
  {
    slug: 'prism',
    name: 'PRISM',
    descriptor: 'Embeddable AI Tutor',
    url: 'https://www.prism-ops.tech/',
    blurb: 'PRISM (Platform for Responsive, Interactive Smart Media) closes the 1:1 tutoring gap with a voice-driven AI tutor trained in the creator\'s own voice. Delivered as an embeddable widget that drops into existing content for creators, publishers, and course operators. Pivoted from a standalone app to widget-first distribution after structured opportunity analysis.',
    disciplines: ['Software Dev', 'UX/UI', 'Strategy'],
    engagements: [
      {
        cohort: 'Prior cohorts',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Cole Elzerman',
            role: 'Student Lead'
          },
          {
            name: 'Acacia Burnett',
            role: 'Contributor'
          }
        ],
        rosterUnverified: true
      }
    ]
  },
  {
    slug: 'vdna',
    name: 'vDNA',
    descriptor: 'Digital Identity Protocol',
    blurb: 'Constitutional infrastructure for digital identity — capturing a 3D face mesh and voice acoustics on-device, hashing them locally, and anchoring the signature to a blockchain registry. Four pillars (Truth Registry, Rights Ownership, AI Attribution, Rights Exchange) detect when registered likeness appears in AI training data and trigger automatic, proportional smart-contract compensation. Positioned as the SSN of the AI era.',
    disciplines: ['Research', 'Strategy', 'Software Dev'],
    engagements: [
      {
        cohort: 'Prior cohorts',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Sam Self',
            role: 'Student Lead'
          },
          {
            name: 'Weston Chambers',
            role: 'Contributor'
          }
        ],
        rosterUnverified: true
      }
    ]
  },
  {
    slug: 'safesnap',
    name: 'SafeSnap',
    descriptor: 'AI Media Consent Platform',
    blurb: 'An AI-driven media privacy and consent automation platform that builds a FERPA/GDPR-auditable chain of custody linking who consented to what was filmed. Replaces four fragmented tools with one workflow for K-12 districts, event organizers, and enterprise brands. Positioning and pricing shaped by primary survey data from a real school district.',
    disciplines: ['Research', 'Strategy', 'UX/UI'],
    engagements: [
      {
        cohort: 'Prior cohorts',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Sebastian Posada',
            role: 'Student Lead'
          },
          {
            name: 'Rylee Copeland',
            role: 'Contributor'
          }
        ],
        rosterUnverified: true
      }
    ]
  },
  {
    slug: 'up-up',
    name: 'UP & UP',
    descriptor: 'Rooftop Venue Marketplace',
    blurb: 'A curated two-sided marketplace for rooftop event venues across LA, Austin, and Atlanta, pairing a Trust-First Onboarding Suite for property owners with a Curated Discovery Engine for planners. Defined the venture concept, brand direction, and low-fi prototype across listing, search, booking, and a referral flywheel — with a modular path toward future drone-delivery expansion.',
    disciplines: ['Strategy', 'Research', 'UX/UI'],
    engagements: [
      {
        cohort: 'Prior cohorts',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Jaydin Vasquez',
            role: 'Student Lead'
          },
          {
            name: 'Kayla Duffin',
            role: 'Contributor'
          }
        ],
        rosterUnverified: true
      }
    ]
  },
  {
    slug: 'wvr',
    name: 'WVR',
    descriptor: 'Values-Based Giving Platform',
    blurb: 'A two-sided matching platform pairing foundations with verified nonprofits through an intelligent, quantitative performance evaluation engine — closing the gap between a static directory and a high-touch consulting service. In-app communication, verification, and impact tracking give both sides ongoing value instead of a one-time transaction. Students conducted market research, customer discovery, and end-to-end sales cycles with early adopters.',
    disciplines: ['Research', 'Marketing', 'Sales'],
    engagements: [
      {
        cohort: 'Prior cohorts',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Campbell Hairston',
            role: 'Student Lead'
          },
          {
            name: 'Yakira Cardoso',
            role: 'Contributor'
          }
        ],
        rosterUnverified: true
      }
    ],
    testimonial: {
      quote: 'The students have been tremendous contributors to our team. Campbell asks all the right questions and could represent our mission with confidence in any room. Yakira is a self-starter who identifies opportunities and produces real value from day one. I genuinely couldn\'t believe they were only freshmen. Their wisdom and understanding are far beyond their years.',
      name: 'Mario Butler-Johnson',
      title: 'Co-Founder & CEO, World Value Revolution'
    }
  },
  {
    slug: 'clear-roofing',
    name: 'Clear Roofing',
    descriptor: 'In-Market Buyer Targeting',
    blurb: 'A custom GIS mapping platform for roofers and siders, paired with aggregated household data so they can dial in outreach to strictly in-market buyers — replacing scattershot direct mail and door-knocking with targeted, signal-driven prospecting.',
    disciplines: ['Software Dev', 'Research', 'Strategy'],
    engagements: [
      {
        cohort: 'Prior cohorts',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Jensen Eichenauer',
            role: 'Student Lead'
          },
          {
            name: 'Jesse Crisman',
            role: 'Contributor'
          }
        ],
        rosterUnverified: true
      }
    ]
  },
  {
    slug: 'schoolfinder',
    name: 'SchoolFinder',
    descriptor: 'Parent Decision Tool',
    url: 'https://texa-school-finder.vercel.app/',
    blurb: 'Turns the messy, high-stakes school-selection process into a guided decision flow — surfacing the schools that fit each family\'s priorities instead of asking parents to do the research themselves. Profiles, filters, and side-by-side comparisons produce a confident shortlist in minutes.',
    disciplines: ['Software Dev', 'Research', 'Strategy'],
    engagements: [
      {
        cohort: 'Prior cohorts',
        status: 'Shipped',
        advisors: ['Jake Oswald'],
        team: [
          {
            name: 'Israel Williams',
            role: 'Student Lead'
          },
          {
            name: 'Grace King',
            role: 'Contributor'
          }
        ],
        rosterUnverified: true
      }
    ]
  }
]

/**
 * Companies held back from the public directory. The data stays put — take a
 * slug out of this set and the company (and any student who only appears on it)
 * returns to /portfolio, its profile page, and the counts.
 *
 * These are out because their engagement, roster, or artwork isn't ready to show
 * publicly yet, not because the work didn't happen.
 */
const HIDDEN_SLUGS = new Set([
  'best-buddies',
  'vdna',
  'prism',
  'schoolfinder',
  'wvr',
  'safesnap',
  'up-up',
  'clear-roofing',
  'autofill-mobile',
])

/**
 * The order tiles appear on /portfolio, front to back. This is a curated
 * sequence, not an algorithm — move a slug and the wall changes.
 *
 * Anything not listed here falls to the end, in data order, so adding a company
 * never makes it disappear.
 */
const DIRECTORY_ORDER = [
  'youversion',
  'waterside-by-ulteum',
  'lifetime-fitness',
  'overflow',
  'regent-bank',
  'burlebo',
  'the-care-app',
  'athletes-ocean',
  'heavytech',
  'lecrae-media',
  'perm-cap',
  'launch-kids',
  'tektones',
  'adoption-is',
  'venture-forge',
  'commissioned',
  'shareyourstory',
  'minneoats',
  'velora',
  'evergreen',
  'baxo',
  'tourcaddy',
  'today-matters',
  'servesource',
  'turn',
  'bible-memory-project',
]

const ORDER_INDEX = new Map(DIRECTORY_ORDER.map((slug, i) => [slug, i]))

/** The public directory: every company except the ones held back above, in the
 *  curated order. */
export const PORTFOLIO_COMPANIES: PortfolioCompany[] = ALL_COMPANIES.filter(
  (company) => !HIDDEN_SLUGS.has(company.slug),
).sort(
  (a, b) =>
    (ORDER_INDEX.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
    (ORDER_INDEX.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
)

/** Every cohort a company has been engaged in, newest first. */
export function companyCohorts(company: PortfolioCompany): Cohort[] {
  return COHORTS.filter((c) => company.engagements.some((e) => e.cohort === c))
}

/** Flat roster across every engagement — what the directory card and the
 *  student count read from. */
export function companyRoster(company: PortfolioCompany): TeamMember[] {
  return company.engagements.flatMap((e) => e.team)
}

export function companyAdvisors(company: PortfolioCompany): string[] {
  return [...new Set(company.engagements.flatMap((e) => e.advisors))]
}

export function companySponsors(company: PortfolioCompany): string[] {
  return [...new Set(company.engagements.flatMap((e) => e.sponsors ?? []))]
}

/** URL-safe slug for a person's name. Must match the slugs in
 *  PORTFOLIO_STUDENTS, which is what /portfolio/student/<slug> resolves. */
export function studentSlug(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

// Bios, headshots and LinkedIn URLs, keyed by student slug. Empty until the
// roster data comes in; anything added here is merged onto the derived
// student record below, so this is the only place to edit a student profile.
export const STUDENT_PROFILES: Record<string, Partial<PortfolioStudent>> = {}

/** Derived from the company rosters — never hand-maintained. A student exists
 *  because they are on a team, so the two can't drift apart. */
export const PORTFOLIO_STUDENTS: PortfolioStudent[] = (() => {
  const index = new Map<string, PortfolioStudent>()

  for (const company of PORTFOLIO_COMPANIES) {
    for (const engagement of company.engagements) {
      for (const member of engagement.team) {
        const slug = studentSlug(member.name)
        const existing = index.get(slug)
        const project: StudentProject = {
          company: company.slug,
          role: member.role,
          cohort: engagement.cohort,
        }
        if (existing) {
          existing.projects.push(project)
        } else {
          index.set(slug, {
            slug,
            name: member.name,
            projects: [project],
            topRole: member.role,
            ...STUDENT_PROFILES[slug],
          })
        }
      }
    }
  }

  for (const student of index.values()) {
    student.topRole = STUDENT_ROLES[
      Math.min(...student.projects.map((p) => STUDENT_ROLES.indexOf(p.role)))
    ]
    student.projects.sort(
      (a, b) =>
        COHORTS.indexOf(a.cohort) - COHORTS.indexOf(b.cohort) ||
        STUDENT_ROLES.indexOf(a.role) - STUDENT_ROLES.indexOf(b.role),
    )
  }

  // Surname order, so the student index reads like a roster rather than a
  // by-product of the order companies happen to be listed in.
  return [...index.values()].sort((a, b) => {
    const last = (n: string) => n.split(' ').slice(-1)[0]
    return last(a.name).localeCompare(last(b.name)) || a.name.localeCompare(b.name)
  })
})()

const COMPANIES_BY_SLUG = new Map(PORTFOLIO_COMPANIES.map((c) => [c.slug, c]))
const STUDENTS_BY_SLUG = new Map(PORTFOLIO_STUDENTS.map((s) => [s.slug, s]))

export function findCompany(slug: string): PortfolioCompany | undefined {
  return COMPANIES_BY_SLUG.get(slug)
}

export function findStudent(slug: string): PortfolioStudent | undefined {
  return STUDENTS_BY_SLUG.get(slug)
}

/** Every discipline tag in use, for the directory filter. */
export const PORTFOLIO_DISCIPLINES: string[] = [
  ...new Set(PORTFOLIO_COMPANIES.flatMap((c) => c.disciplines ?? [])),
].sort()

/** Everyone who has shared an engagement with this student, most-shared first. */
export function teammatesOf(student: PortfolioStudent): { name: string; shared: number }[] {
  const counts = new Map<string, number>()
  for (const project of student.projects) {
    const company = findCompany(project.company)
    if (!company) continue
    for (const member of companyRoster(company)) {
      if (studentSlug(member.name) === student.slug) continue
      counts.set(member.name, (counts.get(member.name) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([name, shared]) => ({ name, shared }))
    .sort((a, b) => b.shared - a.shared || a.name.localeCompare(b.name))
}
