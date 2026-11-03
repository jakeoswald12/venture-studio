/**
 * The West Ventures thesis, in plain, literal language for the site.
 *
 * The page (app/thesis/page.tsx) lays these sections out in order, with the
 * flywheel, the projection charts and links to the longer essays in between.
 * The essays carry the sourced history and research.
 */

import { PLAN } from './plan'

export const THESIS_SUMMARY =
  'West Ventures finds young people with exceptional ability, puts them to work for proven founders and operators, and builds companies with them. This page states why the studio exists and how it operates.'

/** Section index, in page order. */
export const SECTIONS = [
  { id: 'philosophy', title: 'Philosophy' },
  { id: 'model', title: 'Model' },
  { id: 'opportunities', title: 'Opportunities' },
  { id: 'projects', title: 'Projects' },
  { id: 'flywheel', title: 'Flywheel' },
  /** Hidden for now: set hidden to false to show the projections, hiring plan and assumptions again. */
  { id: 'projections', title: 'Projections', hidden: true },
  { id: 'requests', title: 'Requests' },
] as const satisfies readonly { id: string; title: string; hidden?: boolean }[]

/** The sections shown on the page and in its index. */
export const VISIBLE_SECTIONS = SECTIONS.filter((s) => !('hidden' in s && s.hidden))

export const PHILOSOPHY = [
  'The principles the West was founded on still work: the rule of law, free markets, free speech, industriousness, honor, and the belief that every person bears the image of God and is meant to create. Most of them grew out of the Christian faith, which taught the West that each person has dignity, that truth can be known, and that work is a calling. What has weakened is the confidence to use them and the habit of building. For two generations the West has spent its inheritance faster than it has added to it, and too few young people are given real work at the age when it would shape them most.',
  'The studio holds that the next generation can reverse this. A relatively small number of builders, leaders and heroes, found early and put to real work, can restore those principles and begin a period of strength, peace, truth and prosperity. West Ventures finds young people with the makings of greatness and puts them to work building companies alongside proven founders and operators, preparing them for the burden of leadership and stewardship, so that they pursue glory, honor and self-sacrifice rather than wealth, accolades or comfort. It is a rebirth of the West’s oldest values, carried by its youngest people.',
]

export const MODEL = {
  intro: [
    'The thesis is not tied to an industry. The studio’s advantage is its model: free work, done by a large group of the country’s most capable young people, for the most experienced founders and operators.',
    'The old words for the arrangement are kings and cupbearers. Kings are proven owners and operators with more opportunities than time. Cupbearers are capable young people who need real work and someone to learn from. The studio’s job is to match them, at scale.',
    'The arrangement works because each side gets what it lacks. Founders get capable help, at no cost, on work they have no time for. Students get real work, someone to learn from and academic credit. And when a project turns up an opportunity worth building, the studio builds it with the operator who found it, as a joint venture. It expects to start about six companies a year this way.',
  ],
}

export const OPPORTUNITIES = {
  ideas:
    'An 18-year-old’s business ideas are usually poor. That is not a lack of intelligence; it is a lack of information. Ask someone who has built three or four companies and they already have ideas for the fourth and fifth, and they can say where the opportunity is and why.',
  fossil:
    'Great business opportunities are discovered, not invented. Like a paleontologist who knows where to dig, the people who find them have spent years in an industry and can see a need before anyone has named it.',
  so: 'So students do not start with their own ideas. They work on problems and opportunities that proven operators have already found, and learn to see them.',
}

const PLAN_2030 = PLAN.find((r) => r.year === 2030) ?? PLAN[PLAN.length - 1]
const n = (v: number) => v.toLocaleString('en-US')

export const FLYWHEEL = {
  text: [
    'The studio recruits the best students from high schools and colleges across the country and matches them with the best founders and operators. Excellent work attracts proven operators. Proven operators identify great opportunities. Great opportunities attract elite students, who produce more excellent work.',
    `Each turn makes the next one easier, and the advantage is how many of both are in one place. The plan grows the network to ${n(PLAN_2030.highSchools + PLAN_2030.colleges)} partner schools by ${PLAN_2030.year}: ${n(PLAN_2030.highSchools)} high schools and ${n(PLAN_2030.colleges)} colleges and universities.`,
  ],
}

export const PROJECTS = [
  'A project is one term of work by one team, for one founder, against a written scope. Terms run in fall, spring and summer. The founder brings a real problem and about an hour a week; the company pays nothing and keeps all equity and intellectual property. Students pay $5,000 a term, give 3 to 10 hours a week and earn academic credit.',
  'An average team is two college students and three high school Builder Scholars, coached by an experienced volunteer project lead. In the first week the founder and the lead write the scope, a week-by-week plan of what will be delivered. The team then meets twice a week, once with the lead and once with the founder, and delivers at the end of the term. Students who deliver are invited to lead a team.',
]

export const REQUESTS = [
  { label: 'Founders and operators', text: 'Bring a problem or an opportunity your company cannot get to.' },
  { label: 'Investors', text: 'Send one or two portfolio companies a term.' },
  { label: 'Universities and high schools', text: 'Send your best students to work on teams.' },
  { label: 'Parents and teachers', text: 'Nominate students with unusual ability.' },
]

