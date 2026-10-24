/**
 * Joint ventures: companies West Ventures co-founded and holds equity in.
 *
 * The first four come from the ACU /ben briefing page. blkbox.io was added
 * for this site. Copy is kept literal: what the company is, the market, and
 * how it reaches customers.
 */

export interface VentureFact {
  label: string
  text: string
}

export interface Venture {
  slug: string
  name: string
  /** One line under the name. */
  descriptor: string
  /** Two or three sentences. */
  summary: string
  facts: VentureFact[]
  url?: string
  status: string
  /** Which wordmark component to draw. */
  mark: 'unify' | 'launch' | 'bq' | 'stealth' | 'blkbox'
}

export const VENTURES: Venture[] = [
  {
    slug: 'unify',
    name: 'Unify',
    descriptor: 'Custom software for nonprofits',
    summary:
      'Nonprofits pay for many separate subscriptions: a CRM, a donor page, volunteer management, grant tracking, a website and task management. Unify replaces them with one platform built for each organization.',
    facts: [
      {
        label: 'What it is',
        text: 'One connected platform for donors, programs, volunteers, grants, the website and AI agents. About $1,000 to build and $100 a year after that.',
      },
      {
        label: 'Market',
        text: 'About 1.5 million U.S. nonprofits. AI has lowered the cost of custom software to a level nonprofits can pay.',
      },
      {
        label: 'Go-to-market',
        text: 'Ministries and faith-based nonprofits in the studio’s network first, then referrals from one organization to the next.',
      },
    ],
    url: 'https://unify-production.vercel.app/',
    status: 'Building',
    mark: 'unify',
  },
  {
    slug: 'launch-kids',
    name: 'launch.kids',
    descriptor: 'Software building tool for students',
    summary:
      'Students describe the app they want in plain language and launch.kids builds it with them. It is designed for elementary through high school and runs inside limits that schools and parents set. Built by ACU’s CTO.',
    facts: [
      {
        label: 'What it is',
        text: 'A coding tool where students build working software by describing it, with guardrails for school use.',
      },
      {
        label: 'Market',
        text: 'Schools from kindergarten through 12th grade that need a way to teach students to build with AI.',
      },
      {
        label: 'Go-to-market',
        text: 'Christian school networks such as SeedTree, and schools that nominate Builder Scholars.',
      },
    ],
    url: 'https://launch.kids',
    status: 'Building',
    mark: 'launch',
  },
  {
    slug: 'builders-quotient',
    name: 'Builder’s Quotient',
    descriptor: 'Assessment of entrepreneurial ability',
    summary:
      'A 20-minute psychometric assessment. It measures practical intelligence, creative reasoning and a person’s builder profile. IQ measures how a person thinks; BQ measures how a person builds.',
    facts: [
      {
        label: 'What it is',
        text: 'A 20-minute assessment that maps practical intelligence, creative reasoning and builder profile.',
      },
      {
        label: 'Market',
        text: 'Schools, accelerators and hiring teams that need a better signal than grades for who can build.',
      },
      {
        label: 'Go-to-market',
        text: 'Used first for studio team selection and Builder Scholars nominations, then licensed to schools and partners.',
      },
    ],
    url: 'https://bq.austinchristianu.org/',
    status: 'In use',
    mark: 'bq',
  },
  {
    slug: 'stealth',
    name: 'Stealth company',
    descriptor: 'AI diagnostics for large commercial buildings',
    summary:
      'An AI tool that reads the data from every utility unit across Life Time’s buildings and flags inefficiencies and breakdowns as they happen. Life Time has the data but no accurate way to diagnose it. Students are building it with Life Time’s team for a Q1 2027 launch.',
    facts: [
      {
        label: 'What it is',
        text: 'Real-time diagnostics for every utility unit across Life Time’s buildings, flagging inefficiencies and breakdowns.',
      },
      {
        label: 'Market',
        text: 'Estimated $10–50M a year in operating cost savings at Life Time alone. Every large facility operator has the same costs.',
      },
      {
        label: 'Go-to-market',
        text: 'Life Time is the first customer. Its Director of Architecture and Engineering will help sell to grocery chains, warehouses and office buildings.',
      },
    ],
    status: 'Launch Q1 2027',
    mark: 'stealth',
  },
  {
    slug: 'blkbox',
    name: 'blkbox.io',
    descriptor: 'Private AI trading fund',
    summary:
      'A private hedge fund. Its AI models trade highly liquid markets and retrain on their own results in a continuous loop. It trades 24 hours a day, 365 days a year.',
    facts: [
      {
        label: 'What it is',
        text: 'A private fund run by self-training AI models that place, evaluate and adjust their own trades.',
      },
      {
        label: 'Markets',
        text: 'Highly liquid assets: stock options, cryptocurrency and betting markets.',
      },
      {
        label: 'Hours',
        text: 'Continuous. 24 hours a day, 7 days a week, 365 days a year.',
      },
    ],
    url: 'https://blkbox.io',
    status: 'Private',
    mark: 'blkbox',
  },
]
