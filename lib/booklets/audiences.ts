/**
 * The info booklets: one per audience.
 *
 * Each booklet is an ordered list of pages drawn from the shared page library
 * in components/booklet/pages.tsx, plus the copy that differs by audience
 * (cover line, letter, FAQ, next steps). Shared copy lives in ./copy.ts, so a
 * change there changes every booklet that uses the page.
 *
 * The same pages render three ways: the flip-through viewer at
 * /booklet/<slug>, the reflowed phone view, and the print layout that the
 * PDFs are generated from (scripts/build-booklet-pdfs.py).
 */

export const AUDIENCE_SLUGS = ['parents', 'students', 'founders', 'high-schools', 'universities'] as const
export type AudienceSlug = (typeof AUDIENCE_SLUGS)[number]

import { STORY_ORDER, type StorySlug } from './stories'

export type PageId =
  | 'cover'
  | 'stories'
  | `story-${StorySlug}`
  | 'letter'
  | 'contents'
  | 'studio'
  | 'model'
  | 'opportunities'
  | 'project'
  | 'team'
  | 'expectations'
  | 'disciplines'
  | 'outcomes-founders'
  | 'outcomes-students'
  | 'voices-founders'
  | 'voices-families'
  | 'pricing'
  | 'abroad'
  | 'supervision'
  | 'credit-high-schools'
  | 'credit-universities'
  | 'school-cost'
  | 'founder-terms'
  | 'joint-ventures'
  | 'network'
  | 'leadership'
  | 'faq'
  | 'next'
  | 'back'

/** Who appears in the expectations table, in order. */
export type Party = 'founder' | 'lead' | 'students' | 'studio' | 'parents' | 'school' | 'university'

export interface FaqItem {
  q: string
  a: string
}

export interface Audience {
  slug: AudienceSlug
  /** Short name, used in the form and the email. */
  label: string
  /** Cover title: "For Parents". */
  title: string
  /** The form's audience card: "I am a …" */
  formLabel: string
  /** The card's subtitle: why this person is interested. */
  formLine: string
  /** One sentence under the cover title. */
  coverLine: string
  /** The letter's paragraphs, after the salutation. */
  letter: string[]
  pages: PageId[]
  parties: Party[]
  faq: FaqItem[]
  next: { title: string; text: string }[]
  /** Organization field label on the form, or null to hide it. */
  orgLabel: string | null
}

const STORY_PAGES = STORY_ORDER.map((s) => `story-${s}` as const)

const SHARED_LETTER_CLOSE =
  'Everything in these pages is how the studio operates today. Where a detail is still being set, it says so. If something here does not answer your question, reply to the email this booklet came in and one of us will answer it.'

export const AUDIENCES: Record<AudienceSlug, Audience> = {
  parents: {
    slug: 'parents',
    label: 'Parents',
    title: 'For Parents',
    formLabel: 'Parent',
    formLine: 'My son or daughter would be a perfect fit for this program.',
    coverLine: 'What your son or daughter would do, who they would work with, what it costs and how they are supervised.',
    letter: [
      'Thank you for asking about West Ventures. This booklet is written for parents. It explains what a student does here, who they work with, how much time it takes, what it costs, how credit is awarded and how younger students are supervised.',
      'The short version: your son or daughter would join a small team doing real work for an experienced founder or operator, for one term at a time, and earn academic credit for it. The studio’s job is to make sure the work is real, the people are worth learning from, and the student is held to a high standard.',
      SHARED_LETTER_CLOSE,
    ],
    pages: [
      'cover', 'letter', 'contents', 'studio', 'model', 'project', 'team', 'expectations',
      'outcomes-students', 'stories', ...STORY_PAGES, 'voices-families', 'voices-founders', 'pricing', 'abroad', 'supervision',
      'leadership', 'faq', 'next', 'back',
    ],
    parties: ['students', 'parents', 'lead', 'founder', 'studio'],
    faq: [
      { q: 'Is this a job or a class?', a: 'It is a course. Students earn academic credit through Austin Christian University for the work they do on their team. They are not employees of the company they work for, and they are not paid.' },
      { q: 'How much time does it take?', a: 'About 3 hours a week for a high school Builder Scholar, 4 to 8 for a college contributor and 5 to 10 for a team leader. There is no homework and there are no tests beyond the work itself.' },
      { q: 'Does my student have to live in Austin?', a: 'No. Teams work remotely and meet online. Students from partner schools across the country work on the same teams.' },
      { q: 'Who is my student working with?', a: 'A team of about five students, an experienced volunteer project advisor, and the founder or executive who brought the project. Studio staff oversee every team.' },
      { q: 'What if the work is too much alongside school?', a: 'Tell the project advisor early. Scope is set in the first week and can be adjusted. A student who cannot continue can withdraw under the university’s course policies.' },
      { q: 'Is financial aid available?', a: 'Yes. The studio offers need-based scholarships. Price should not keep a capable student out. Ask about scholarships when you apply.' },
    ],
    next: [
      { title: 'Ask your questions', text: 'Reply to the email this booklet came in. A member of the studio will answer.' },
      { title: 'Apply or be nominated', text: 'High school students are nominated by their school or apply directly. College students apply directly. Applications are reviewed each term.' },
      { title: 'Meet the studio', text: 'Families can schedule a call with the studio before a student commits to a term.' },
    ],
    orgLabel: null,
  },

  students: {
    slug: 'students',
    label: 'Students',
    title: 'For Students',
    formLabel: 'Student',
    formLine: 'I’m in high school or college and want to work on a project.',
    coverLine: 'Real work for proven founders, for academic credit. How it works, what is expected and where it leads.',
    letter: [
      'Thank you for asking about West Ventures. This booklet is written for you, the student.',
      'Here is the arrangement. You join a small team and do real work for a founder or operator who has built something. You are expected to deliver, and you are treated as someone who can. You earn academic credit for it. Students who deliver are given more responsibility the next term: first a seat on a team, then a team to lead, then, for a few, a Fellowship working directly on the companies the studio builds.',
      SHARED_LETTER_CLOSE,
    ],
    pages: [
      'cover', 'letter', 'contents', 'studio', 'model', 'opportunities', 'project', 'team', 'expectations',
      'disciplines', 'outcomes-students', 'stories', ...STORY_PAGES, 'voices-founders', 'voices-families', 'pricing', 'abroad',
      'faq', 'next', 'back',
    ],
    parties: ['students', 'lead', 'founder', 'studio'],
    faq: [
      { q: 'Do I need experience?', a: 'No. You need to show that you can learn quickly and do what you say you will do. Teams include students with no prior experience alongside students with a lot.' },
      { q: 'Can I bring my own idea?', a: 'Not usually. Students work on opportunities that experienced operators have already found. Students who want to build their own company learn more, faster, by first working for someone who has done it.' },
      { q: 'What kind of work will I do?', a: 'One of five kinds: market research, software and AI engineering, branding, marketing, or sales. The scope is written in the first week of the term.' },
      { q: 'How is my work graded?', a: 'On the work itself. There are no tests. Your project advisor evaluates what you delivered against the scope.' },
      { q: 'Can I do this from anywhere?', a: 'Yes. Teams work remotely. With Living and Learning International you can spend a term abroad and stay on a team.' },
      { q: 'What happens after a good term?', a: 'Students who deliver are invited back with more responsibility: contributor, then team leader, then Fellow.' },
    ],
    next: [
      { title: 'Apply', text: 'College students apply directly. High school students are nominated by their school or apply directly. Reply to the email this booklet came in to start.' },
      { title: 'Interview', text: 'A short conversation with the studio about what you have done and what you want to learn.' },
      { title: 'Join a team', text: 'Accepted students are placed on a team before the term begins and meet their founder in week one.' },
    ],
    orgLabel: 'School',
  },

  founders: {
    slug: 'founders',
    label: 'Founders and executives',
    title: 'For Founders & Executives',
    formLabel: 'Founder or executive',
    formLine: 'I’m building a company and would love help from a team of elite students.',
    coverLine: 'A team of capable students on a problem your company cannot get to. No cost, no equity, about an hour a week.',
    letter: [
      'Thank you for asking about West Ventures. This booklet is written for founders, owners and executives.',
      'The offer is simple. Bring a problem or an opportunity your company has not had time for. The studio assigns a team of capable students and an experienced project advisor, writes a scope with you in the first week, and delivers against it over a term. It costs you nothing. You keep all equity and intellectual property. We ask for about an hour a week of your time and honest feedback.',
      'When a project turns up an opportunity worth building as its own company, the studio can build it with you as a joint venture. That is optional and separate.',
      SHARED_LETTER_CLOSE,
    ],
    pages: [
      'cover', 'letter', 'contents', 'studio', 'model', 'project', 'team', 'expectations', 'disciplines',
      'founder-terms', 'outcomes-founders', 'voices-founders', 'joint-ventures', 'network', 'leadership',
      'faq', 'next', 'back',
    ],
    parties: ['founder', 'lead', 'students', 'studio'],
    faq: [
      { q: 'What does it cost?', a: 'Nothing. Companies never pay the studio. Students pay tuition for the course; the studio is funded by that and by the companies it owns.' },
      { q: 'Who owns the work?', a: 'You do. Your company keeps all equity and intellectual property produced on a project.' },
      { q: 'How much of my time does it take?', a: 'About an hour a week: a weekly meeting with the team and quick answers in between. More in the first week, when the scope is written.' },
      { q: 'What makes a good project?', a: 'Something real and bounded that matters to the business and has not been done because no one has had time: research, a build, a launch, a campaign, a pipeline.' },
      { q: 'What if the work is not good enough?', a: 'Tell the project advisor. Scope is reviewed every week. Teams that fall short are corrected, and the studio does not send a team it does not think can deliver.' },
      { q: 'Can I pay the students?', a: 'You may, but it is not expected and the studio does not arrange it. Students earn credit for the work.' },
    ],
    next: [
      { title: 'Describe the problem', text: 'Reply to the email this booklet came in with a few sentences on the problem or opportunity.' },
      { title: 'Scoping call', text: 'A 30-minute call with the studio to decide whether it is a fit and what a term could deliver.' },
      { title: 'Meet your team', text: 'The team is assigned before the term begins. Week one is spent writing the scope with you.' },
    ],
    orgLabel: 'Company',
  },

  'high-schools': {
    slug: 'high-schools',
    label: 'High schools',
    title: 'For High Schools',
    formLabel: 'High school faculty',
    formLine: 'We have students who would love this program.',
    coverLine: 'How your strongest students work on real companies for college credit, at no cost to the school.',
    letter: [
      'Thank you for asking about West Ventures. This booklet is written for heads of school, principals, counselors and teachers.',
      'We ask partner schools for one thing: to name their most capable students. Those students, called Builder Scholars, join teams with college students and do real work for experienced founders and operators. They earn college credit for it, with no homework and no tests beyond the work itself. The school pays nothing.',
      SHARED_LETTER_CLOSE,
    ],
    pages: [
      'cover', 'letter', 'contents', 'studio', 'model', 'project', 'team', 'expectations',
      'credit-high-schools', 'school-cost', 'outcomes-students', 'stories', ...STORY_PAGES, 'voices-families', 'voices-founders', 'network',
      'faq', 'next', 'back',
    ],
    parties: ['school', 'students', 'lead', 'founder', 'studio'],
    faq: [
      { q: 'What does it cost the school?', a: 'Nothing. Partner schools are never charged. Families pay tuition for the course, with need-based scholarships available.' },
      { q: 'How many students can we nominate?', a: 'Typically two to five per term. There is no quota. Schools whose students deliver tend to place more of them.' },
      { q: 'Does it interfere with school?', a: 'It should not. Builder Scholars spend about 3 hours a week, mostly in one team meeting and short tasks. There is no homework and there are no tests.' },
      { q: 'What credit do students earn?', a: 'College credit, awarded through Austin Christian University and transferable as each receiving college decides.' },
      { q: 'Who supervises students under 18?', a: 'Every team has an adult project advisor and is overseen by studio staff. Meetings are scheduled and online. See the Supervision section of the parents’ booklet for details.' },
      { q: 'What does the school get?', a: 'A place for its strongest students to do work at the level they are capable of, a record of that work, and recognition as a partner school.' },
    ],
    next: [
      { title: 'Name a contact', text: 'Reply to the email this booklet came in with the name of the person who will nominate students.' },
      { title: 'Nominate students', text: 'Send the names of two to five students. The studio contacts each student and family directly.' },
      { title: 'See the work', text: 'At the end of each term the school receives a summary of what its students delivered.' },
    ],
    orgLabel: 'School',
  },

  universities: {
    slug: 'universities',
    label: 'Universities',
    title: 'For Universities',
    formLabel: 'University faculty',
    formLine: 'We have students who would love this program, and I want to explore a partnership.',
    coverLine: 'How your students join teams on real companies for academic credit, with no fee to the institution.',
    letter: [
      'Thank you for asking about West Ventures. This booklet is written for university presidents, provosts, deans and faculty.',
      'West Ventures is affiliated with Austin Christian University. Its model is apprenticeship at scale: capable students working for experienced founders and operators on real problems, for academic credit. We invite partner universities to send their best students onto those teams. The university pays nothing, and the arrangement is built to add to what you already offer, not to compete with it.',
      SHARED_LETTER_CLOSE,
    ],
    pages: [
      'cover', 'letter', 'contents', 'studio', 'model', 'project', 'team', 'expectations',
      'credit-universities', 'school-cost', 'outcomes-students', 'stories', ...STORY_PAGES, 'outcomes-founders', 'voices-founders', 'joint-ventures',
      'network', 'leadership', 'faq', 'next', 'back',
    ],
    parties: ['university', 'students', 'lead', 'founder', 'studio'],
    faq: [
      { q: 'What does it cost the university?', a: 'Nothing. There is no partnership or license fee. Students pay tuition per term, with need-based scholarships available.' },
      { q: 'How is credit handled?', a: 'Credit is awarded through Austin Christian University. Your institution decides how it transfers. The studio will work with your registrar on a standing agreement.' },
      { q: 'Does this compete with our programs?', a: 'No. It is designed to sit alongside an existing major, entrepreneurship program or career office, and to send students back to you with real work on their record.' },
      { q: 'Which students are a fit?', a: 'Students from any major who can show that they deliver. Teams need researchers, engineers, designers, writers and salespeople.' },
      { q: 'Are the teams only your students?', a: 'No. Teams mix students from several schools. That is by design.' },
      { q: 'Is there a faith requirement?', a: 'The studio is a Christian organization and says so plainly. It selects students first for ability and character.' },
    ],
    next: [
      { title: 'Name a liaison', text: 'Reply to the email this booklet came in with a faculty or staff member who will be the studio’s contact.' },
      { title: 'Agree on credit', text: 'The studio works with your registrar on how credit transfers.' },
      { title: 'Send students', text: 'Your liaison recommends students each term. The studio interviews and places them.' },
    ],
    orgLabel: 'Institution',
  },
}

/** Order of the cards on the interest form. */
export const FORM_ORDER: AudienceSlug[] = ['founders', 'universities', 'high-schools', 'parents', 'students']

export const isAudience = (v: unknown): v is AudienceSlug =>
  typeof v === 'string' && (AUDIENCE_SLUGS as readonly string[]).includes(v)
