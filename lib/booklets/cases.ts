/**
 * Founder case studies for the founders booklet: what a company asked for,
 * what the student team built, and what came of it.
 *
 * Drawn from each project's Slack channel (fall 2026) and the portfolio data.
 * `pending` items show as "To confirm" chips. Images without `src` render as
 * labelled frames until a screenshot exists. Screenshots live in
 * /public/booklets/work/.
 */

export type CaseSlug = 'lifetime' | 'athletes-ocean' | 'heavytech' | 'minneoats' | 'adoption-is'

export interface CaseImage {
  src?: string
  caption: string
}

export interface FounderCase {
  slug: CaseSlug
  company: string
  descriptor: string
  /** Where the company is: size, stage, location. */
  stage: string
  sponsor: string
  term: string
  ask: string
  built: string[]
  results: { value: string; label: string }[]
  images: CaseImage[]
  team: string
  pending?: string[]
}

export const CASES: Record<CaseSlug, FounderCase> = {
  lifetime: {
    slug: 'lifetime',
    company: 'Life Time',
    descriptor: 'Health and fitness clubs',
    stage: 'Public company · National operator',
    sponsor: 'Architecture & Engineering department',
    term: 'Fall 2026',
    ask: 'Catch building-code and permit problems in a new club’s drawing sets before they reach a city reviewer, so projects stop losing weeks to rounds of permit comments.',
    built: [
      'A drawing checker that reviews a set against the building code and the department’s own checklists, and shows its findings side by side with the drawings.',
      'A code tool that writes a summary for the architect up front and anticipates the permit comments a reviewer is likely to make.',
      'A blind test: the tool reviewed a past project without seeing its permit comments, then was scored against them.',
    ],
    results: [
      { value: '$1.2M', label: 'Overhead saved each year, estimated' },
      { value: 'Spinout', label: 'Being commercialized as its own company' },
    ],
    images: [{ src: '/images/builder-scholars/cohorts/fall-2026-cohort/lifetime-fitness.jpg', caption: 'Life Time' }, { caption: 'Screenshot: the drawing checker' }],
    team: 'Six students, led by a college senior. Three are high school Builder Scholars.',
    pending: ['Screenshot', 'Savings figure'],
  },

  'athletes-ocean': {
    slug: 'athletes-ocean',
    company: 'Athletes Ocean',
    descriptor: 'Instruction from champion athletes',
    stage: 'Venture-backed startup · Founded by champion wrestlers',
    sponsor: 'The founders',
    term: 'Fall 2026',
    ask: 'Get found in Google and in AI search. Instructor profiles were thin or empty, and the platform’s best material was locked inside course videos.',
    built: [
      'Search-ready bios for 43 instructors, every fact traced to a source, written to the platform’s new profile format.',
      'Articles drawn from the transcripts of 13 flagship courses, and interviews with athletes.',
      'A shared definition of a lead and the tracking to count it in the company’s analytics.',
    ],
    results: [
      { value: '43', label: 'Instructor bios written and sourced' },
      { value: '13', label: 'Flagship courses turned into articles' },
    ],
    images: [{ src: '/booklets/work/athletes-ocean.jpg', caption: 'Athletes Ocean' }],
    team: 'Five students, led by a college junior. Two are high school Builder Scholars.',
    pending: ['Venture-backed?', 'Results in search'],
  },

  heavytech: {
    slug: 'heavytech',
    company: 'HeavyTech',
    descriptor: 'Electric off-highway machinery',
    stage: 'Pre-launch · Founded by six industry veterans · Fort Wayne, Indiana',
    sponsor: 'The founding team',
    term: 'Fall 2026',
    ask: 'A website, a market study and a social media plan for a hardware company preparing to launch its first machine, a compact track loader.',
    built: [
      'A new website built around the machine itself.',
      'A market study: market size, competitors, customers, distribution and risks, with every figure marked as sourced, derived or estimated.',
      'A 13-week social media plan across four channels, built on one shoot day a month.',
    ],
    results: [
      { value: '3', label: 'Deliverables: website, market study, social plan' },
      { value: '13', label: 'Weeks of content planned' },
    ],
    images: [
      { src: '/booklets/work/heavytech-site.jpg', caption: 'Student work · The new website' },
      { src: '/booklets/work/heavytech-research.jpg', caption: 'Student work · Market study' },
      { src: '/booklets/work/heavytech-social.jpg', caption: 'Student work · Social media plan' },
    ],
    team: 'Four students, led by a college student. One is a high school Builder Scholar.',
  },

  minneoats: {
    slug: 'minneoats',
    company: 'MINNEØATS',
    descriptor: 'Granola and oatmeal',
    stage: 'Woman-owned small business · Minnesota · Founded 2017',
    sponsor: 'The co-founders',
    term: 'Fall 2026',
    ask: 'A new website, a way to reach new customers through creators, and new wholesale and gifting channels.',
    built: [
      'A redesigned website, rendered and revised with the founders.',
      'An influencer program: a list of creators who fit the brand, the outreach message, and the terms (a free box, a discount code and a commission on sales).',
      'Outreach to corporate gifting companies, which opened a wholesale conversation.',
    ],
    results: [
      { value: '3', label: 'New channels opened: web, creators, gifting' },
      { value: '1', label: 'Gifting company in conversation' },
    ],
    images: [{ src: '/booklets/work/minneoats.jpg', caption: 'MINNEØATS' }, { caption: 'Screenshot: the new website' }],
    team: 'Four students, led by a college student. Two are high school Builder Scholars.',
    pending: ['Website screenshot'],
  },

  'adoption-is': {
    slug: 'adoption-is',
    company: 'Adoption Is An Option',
    descriptor: 'Adoption advocacy',
    stage: 'New nonprofit · Launched by a founder and philanthropist',
    sponsor: 'The founder',
    term: 'Spring and summer 2026',
    ask: 'Reach young people with the message that adoption is an option, at the lowest possible cost per person reached.',
    built: [
      'A competition: student teams made TikTok ads, judged only on cost per click and cost per thousand views in TikTok Ads Manager.',
      '54 ads in two rounds. Every winning ad in the second round was built on one made in the first.',
    ],
    results: [
      { value: '13.8M', label: 'Impressions' },
      { value: '1.43M', label: 'Clicks to the website' },
      { value: '10.39%', label: 'Click-through rate' },
      { value: '$0.011', label: 'Cost per website visitor' },
    ],
    images: [{ src: '/images/builder-scholars/cohorts/fall-2026-cohort/adoption-is.png', caption: 'Adoption Is An Option' }],
    team: 'Student teams from across the studio. The winner joined the nonprofit’s founding team.',
  },
}

export const CASE_ORDER: CaseSlug[] = ['lifetime', 'athletes-ocean', 'heavytech', 'minneoats', 'adoption-is']
