/**
 * Student stories for the booklets' outcomes section.
 *
 * Each story is one booklet page. `pending` lists details still to confirm;
 * they show as marked chips on the page. Stories with `hold: true` are kept
 * here but not shown. Headshots go in /public/team.
 */

export type StorySlug =
  | 'yakira-cardoso'
  | 'cole-elzerman'
  | 'preslee-gordon'
  | 'connor-dore'
  | 'jonah-elliot'
  | 'braden-peays'
  | 'lillia-caldroney'
  | 'merci-wymore'
  | 'noah-nugent'

export interface Story {
  slug: StorySlug
  name: string
  photo?: string
  photoPosition?: string
  /** Where they are now: role, school, year. */
  meta: string
  headline: string
  body: string[]
  facts: [string, string][]
  /** Shown as "To confirm" chips. */
  pending?: string[]
  hold?: boolean
}

export const STORIES: Record<StorySlug, Story> = {
  'yakira-cardoso': {
    slug: 'yakira-cardoso',
    name: 'Yakira Cardoso',
    photo: '/team/yakira-cardoso.jpg',
    photoPosition: 'center 20%',
    meta: 'Team leader · College student',
    headline: 'An all-night pitch deck, a first-place finish and a seat on a founding team.',
    body: [
      'Yakira joined the student team working with John Knox, a founder and philanthropist who was launching a nonprofit, Adoption Is An Option. When the students were given a chance to meet him, she stayed up all night building a pitch deck so she could bring him her own thinking about the organization he was starting.',
      'He was impressed enough by the students, and by Yakira in particular, that he created a series of opportunities for them. One was a TikTok ad competition he funded, with $25,000 in cash prizes and ads judged only on how they performed. Yakira took first place and $12,000.',
      'He then asked her to join the founding team launching Adoption Is An Option.',
    ],
    facts: [
      ['Project', 'Adoption Is An Option'],
      ['Role', 'Team leader'],
      ['Competition', 'First place, $12,000'],
      ['Now', 'Founding team, Adoption Is An Option'],
    ],
    pending: ['Year in college'],
  },

  'cole-elzerman': {
    slug: 'cole-elzerman',
    name: 'Cole Elzerman',
    meta: 'Team leader · College student',
    headline: 'From waiting tables to leading a company spinning out of Life Time.',
    body: [
      'Two summers ago, Cole was waiting tables. Since joining the studio he has won the Gloo AI Hackathon in Boulder, Colorado, two years in a row, and has worked on and led a series of projects for founders and executives.',
      'One of the projects he leads now is for Life Time. His team built technology that is saving the company about $1.2 million a year in overhead. It is being spun out as its own company to commercialize, and Cole will help lead it.',
    ],
    facts: [
      ['Gloo AI Hackathon', 'First place, 2025 and 2026'],
      ['Current project', 'Life Time'],
      ['Result', 'About $1.2 million a year saved'],
      ['Next', 'Helping lead the spinout'],
    ],
    pending: ['Headshot', 'Year in college'],
  },

  'connor-dore': {
    slug: 'connor-dore',
    name: 'Connor Dore',
    meta: 'Builder Scholar · Senior in high school',
    headline: 'A high school senior with a paid role and a growing network.',
    body: [
      'Connor is a senior in high school and a Builder Scholar. He contributes to two projects, launch.kids and The Care App, and his focus is AI. His skills have grown quickly from one project to the next.',
      'At the 2026 Gloo AI Hackathon he competed on the Unify team, which won an award and a cash prize.',
      'His work on The Care App led the company to offer him a paid role alongside school. Through it he was introduced to the creative director of Porsche, an advisor to the company, to work with him on using AI to build out the platform.',
    ],
    facts: [
      ['Projects', 'launch.kids, The Care App'],
      ['Focus', 'AI'],
      ['Gloo AI Hackathon', 'Award and cash prize, 2026'],
      ['Now', 'Paid role at The Care App'],
    ],
    pending: ['Headshot'],
  },

  'jonah-elliot': {
    slug: 'jonah-elliot',
    name: 'Jonah Elliot',
    meta: 'Freshman in college',
    headline: 'A college freshman working as a fractional CTO.',
    body: [
      'Jonah is a freshman in college. Through relationships made in the studio, he has had several offers to work for companies. One was for $250,000 a year.',
      'He now works as a fractional CTO for a few companies, alongside school, and each pays him $150 an hour or more. He keeps building his skills and his network on studio projects.',
    ],
    facts: [
      ['Year', 'College freshman'],
      ['Largest offer', '$250,000 a year'],
      ['Now', 'Fractional CTO for several companies'],
      ['Rate', '$150 an hour or more'],
    ],
    pending: ['Headshot'],
  },

  'braden-peays': {
    slug: 'braden-peays',
    name: 'Braden Peays',
    meta: 'Freshman in college',
    headline: 'A track win as a freshman, and a company sold within six months.',
    body: [
      'Braden came into the studio as a freshman. At the 2026 Gloo AI Hackathon he won best in agentic engineering for Unify, the company he is building with the studio: one platform for nonprofits in place of a stack of separate tools.',
      'He was approached about an acquisition and sold the company less than six months later.',
    ],
    facts: [
      ['Company', 'Unify'],
      ['Gloo AI Hackathon', 'Best in agentic engineering, 2026'],
      ['Outcome', 'Acquired · terms to come'],
    ],
    pending: ['Headshot', 'Sale and terms'],
  },

  'preslee-gordon': {
    slug: 'preslee-gordon',
    name: 'Preslee Gordon',
    meta: 'Team leader · Upperclassman in college',
    headline: 'Leading two teams, and hired by the founders of one of the organizations she serves.',
    body: [
      'Preslee has moved up through several projects and this fall leads two teams: one for Best Buddies, and one for Commissioned, a network of hundreds of Christian women entrepreneurs who gather each year to learn from one another.',
      'Her Commissioned team helped put on this year’s gathering. Working alongside the network’s co-founders, she led the team well enough that they hired her as a paid, part-time member of their staff.',
      'The event also introduced her to a great many women founders. She is learning to lead a team and deliver real value, and her network has grown faster than it could have any other way.',
    ],
    facts: [
      ['Projects', 'Commissioned, Best Buddies'],
      ['Role', 'Team leader on both'],
      ['Now', 'Part-time role with Commissioned’s co-founders'],
    ],
    pending: ['Headshot', 'Year in college'],
  },

  'lillia-caldroney': {
    slug: 'lillia-caldroney',
    name: 'Lillia Caldroney',
    meta: 'Builder Scholar · High school student',
    headline: 'A high school student’s first term, working for a bank.',
    body: [
      'Lillia is a high school Builder Scholar. Her first project, this fall, is for Regent Bank, on a team led by a college student and coached by an experienced project advisor.',
      'Working for a bank has meant learning how a regulated business makes decisions, meeting with the bank’s team every week, and learning the research, writing and AI tools the team uses to do the work. It has also put her in the same room as the people who run a bank, at an age when few students meet anyone like them.',
    ],
    facts: [
      ['Project', 'Regent Bank'],
      ['Role', 'Builder Scholar'],
      ['First term', 'Fall 2026'],
    ],
    pending: ['Headshot', 'Grade', 'What she has learned and built'],
  },

  'merci-wymore': {
    slug: 'merci-wymore',
    name: 'Merci Wymore',
    meta: 'Builder Scholar · High school student',
    headline: 'One term in, on a team building a care app.',
    body: [
      'Merci is a high school Builder Scholar. She began her first project this fall with The Care App, on a team of college students and other Builder Scholars.',
      'Like every new student, she started with a defined part of the scope, meets with the company each week, and is evaluated on what she delivers. Students who do that well are invited back with more responsibility.',
    ],
    facts: [
      ['Project', 'The Care App'],
      ['Role', 'Builder Scholar'],
      ['First term', 'Fall 2026'],
    ],
    pending: ['Headshot', 'Grade', 'Her story so far'],
  },

  'noah-nugent': {
    slug: 'noah-nugent',
    name: 'Noah Nugent',
    photo: '/team/noah-nugent.jpg',
    photoPosition: 'center 8%',
    meta: 'Team leader · College student',
    headline: 'Two projects, a new field and an invitation to help start a company.',
    body: [
      'Last spring Noah worked on a project for a former Google strategist who was founding a company. This fall he led a project for a former Olympic athlete building a coaching platform, which is growing quickly. Leading that team taught him how search engine optimization used to work and how AI search is changing it.',
      'Through the studio he met a former chief strategy officer of a large insurance company, who chose him to help start a new company. Noah is now working on it, and is paid for the work.',
    ],
    facts: [
      ['Projects', 'Two, one as team leader'],
      ['Focus', 'AI search and SEO'],
      ['Now', 'Paid role on a new company'],
    ],
    hold: true,
  },
}

/** The stories each booklet tells, in order. */
export const STORY_ORDER: StorySlug[] = [
  'yakira-cardoso',
  'cole-elzerman',
  'preslee-gordon',
  'connor-dore',
  'jonah-elliot',
  'braden-peays',
  'lillia-caldroney',
  'merci-wymore',
]
