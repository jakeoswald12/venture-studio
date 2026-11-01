/**
 * The West Ventures thesis, in plain, literal language for the site.
 *
 * The page (app/thesis/page.tsx) lays these sections out in order, with the
 * illustrations, the flywheel and the projection charts in between. Facts with
 * outside sources are listed in SOURCES at the bottom of the page.
 */

export const THESIS_SUMMARY =
  'West Ventures finds young people with exceptional ability, puts them to work for proven founders and operators, and builds companies with them. This page states why the studio exists and how it operates.'

/** Section index, in page order. */
export const SECTIONS = [
  { id: 'context', title: 'Context' },
  { id: 'goal', title: 'Goal' },
  { id: 'model', title: 'Model' },
  { id: 'evidence', title: 'Evidence' },
  { id: 'opportunities', title: 'Opportunities' },
  { id: 'example', title: 'Example' },
  { id: 'flywheel', title: 'Flywheel' },
  { id: 'projects', title: 'Projects' },
  { id: 'projections', title: 'Projections' },
  { id: 'faith', title: 'Faith and standards' },
  { id: 'tradition', title: 'Western tradition' },
  { id: 'comparables', title: 'Comparable programs' },
  { id: 'requests', title: 'Requests' },
] as const

export const CONTEXT = [
  'The principles the West was founded on still work: the rule of law, free markets, free speech, industriousness, honor, and the belief that every person bears the image of God and is meant to create. What has weakened is the confidence to use them and the habit of building. For two generations the West has spent its inheritance faster than it has added to it, and too few young people are given real work at the age when it would shape them most.',
  'The studio holds that the next generation can reverse this. A relatively small number of builders, leaders and heroes, found early and put to real work, can restore those principles and begin a period of strength, peace, truth and prosperity.',
  'The goal of West Ventures is to see this through: to find the next generation of builders and leaders, and activate them.',
]

export const GOAL = {
  text: 'Find and activate 1,000 young people who go on to found or lead companies and institutions, and who would not have done so otherwise. Most of them are between 12 and 18 today.',
  stats: [
    { value: '~4M', label: 'U.S. births per year' },
    { value: '~4,000', label: 'Top 0.1% of a single birth year' },
    { value: '30 yrs', label: 'Period the goal is measured over' },
  ],
  after:
    'The number is a measure, not a quota. Without intervention, most of these people will lead good lives in ordinary roles. The aim is that more of them reach the work they are capable of.',
}

export const MODEL = {
  intro: [
    'The thesis is not tied to an industry. The studio’s advantage is its model: free work, done by a large group of the country’s most capable young people, for the most experienced founders and operators.',
    'The old words for the arrangement are kings and cupbearers. Kings are proven owners and operators with more opportunities than time. Cupbearers are capable young people who need real work and someone to learn from. The studio’s job is to match them, at scale.',
  ],
  facts: [
    'Founders and investors pay nothing. Students pay to take part and earn academic credit.',
    'Student teams work inside companies, under the founders, on defined projects.',
    'The studio builds about six companies a year itself, mostly as joint ventures with operators who have found an opportunity.',
    'Not a venture capital fund. No management fees and no carry.',
    'A for-profit company, separately owned and permanently affiliated with Austin Christian University, modeled on the relationship between Stanford and Y Combinator. A share of profits goes to ACU’s endowment.',
  ],
}

export const CARNEGIE = [
  {
    name: 'Thomas Scott',
    role: 'Superintendent, Pennsylvania Railroad',
    text: 'Noticed a teenage telegraph operator and in 1853 made him his private secretary and telegrapher.',
  },
  {
    name: 'Andrew Carnegie',
    role: 'Scott’s secretary at 17',
    text: 'Succeeded Scott as superintendent of the Pittsburgh division in 1859, then built Carnegie Steel.',
  },
  {
    name: 'Charles M. Schwab',
    role: 'Stake driver at Carnegie’s Edgar Thomson Works',
    text: 'President of Carnegie Steel at 35, first president of U.S. Steel, then head of Bethlehem Steel.',
  },
]

export const RESEARCH = [
  {
    label: 'Exposure',
    text: 'Bell, Chetty and colleagues linked 1.2 million U.S. inventors’ patents to tax and school records. Among children with the same early math scores, the odds of becoming an inventor varied with family and neighborhood. Children who moved young to areas with many inventors were more likely to invent, and in the same fields.',
    href: 'https://www.nber.org/papers/w24062.pdf',
    linkText: 'NBER working paper',
  },
  {
    label: 'Early identification',
    text: 'The Study of Mathematically Precocious Youth identified about 1,650 thirteen-year-olds in the top 1% of reasoning ability and followed them for four decades. The group went on to hold 681 patents and publish 7,572 refereed articles; 2.3% became senior executives at Fortune 500 or similar companies.',
    href: 'https://www.psychologicalscience.org/journals/psychological-science/0956797614551371/',
    linkText: 'Psychological Science, 2014',
  },
  {
    label: 'Workshops',
    text: 'Leonardo da Vinci trained in Andrea del Verrocchio’s workshop in Florence and worked on real commissions as a teenager, alongside Perugino and Lorenzo di Credi. Ghirlandaio later took Michelangelo as an apprentice at thirteen. Perugino later taught Raphael.',
    href: 'https://eclecticlight.co/2019/03/17/leonardo-the-apprentice-verrocchios-pupils/',
    linkText: 'The Eclectic Light Company',
  },
]

export const OPPORTUNITIES = {
  ideas:
    'An 18-year-old’s business ideas are usually poor. That is not a lack of intelligence; it is a lack of information. Ask someone who has built three or four companies and they already have ideas for the fourth and fifth, and they can say where the opportunity is and why.',
  fossil:
    'Good companies are found more than they are invented. A sculptor starts with a block and decides what to make. A paleontologist finds a skeleton that was already there, because years of fieldwork showed where to dig. Market needs work the same way: they exist before anyone names them, and the people who find them have decades of craft knowledge in an industry.',
  so: 'So students do not start with their own ideas. They work on problems and opportunities that proven operators have already found, and learn to see them.',
}

export const EXAMPLE = {
  steps: [
    {
      label: 'Free project',
      text: 'A national health club operator worked with student teams on projects at no charge.',
    },
    {
      label: 'Opportunity',
      text: 'Its architecture and engineering leadership described an internal data problem no existing product solved, with potential savings in the tens of millions of dollars a year.',
    },
    {
      label: 'Joint venture',
      text: 'The studio formed a company to build an AI tool for it, with the operator’s sponsorship and clearance to sell it to others.',
    },
    {
      label: 'First customer',
      text: 'The operator is the first customer. Students are doing the early build work; launch is planned for early 2027.',
    },
  ],
  status: 'Status: in progress. The company is in stealth and has not been sold.',
}

export const FLYWHEEL = {
  text: [
    'The studio finds the best students from thousands of high schools and colleges and matches them with the best operators, of whom there are hundreds. Excellent work attracts proven operators. Proven operators identify great opportunities. Great opportunities attract elite students, who produce more excellent work.',
    'Each turn makes the next one easier. The advantage is how many of both are in one place.',
  ],
  stories: [
    {
      label: 'Nehemiah',
      ref: 'Nehemiah 1–2; 6:15',
      text: 'Nehemiah was cupbearer to King Artaxerxes of Persia. Trusted and close to the king, he asked for leave to rebuild the walls of Jerusalem. The king gave him letters of safe passage and timber from the royal forest. The wall was finished in fifty-two days.',
    },
    {
      label: 'David and Samuel',
      ref: '1 Samuel 16',
      text: 'When Samuel was sent to anoint a king from among Jesse’s sons, Jesse did not call his youngest; David was out keeping the sheep. Samuel was told that God looks on the heart, and David was anointed. Scouting means looking past who is presented to who is actually there.',
    },
  ],
}

export const PROJECT_TERMS = {
  head: ['', 'What they get', 'What is asked'],
  rows: [
    {
      cells: [
        'Founders',
        'A student team for a full term at no charge, a volunteer project lead, a written scope, a weekly schedule and no academic paperwork. The company keeps all equity and intellectual property.',
        'A real problem, an honest scope and about an hour a week',
      ],
    },
    {
      cells: [
        'Students',
        'Real work for a proven founder, academic credit, a team and mentors. Strong students are invited to lead a team the next term.',
        '$5,000 a term (fall, spring or summer) and 3 to 10 hours a week',
      ],
    },
    {
      cells: [
        'Investors',
        'Progress across their portfolio and early access to a generation of talent',
        'One or two portfolio companies a term, and founders willing to teach',
      ],
    },
  ],
}

export const ROLES = [
  { role: 'Founder', who: 'Owner or operator', hours: '~1 hr / week', text: 'Brings the problem and meets the team weekly to review work and adjust the scope.' },
  { role: 'Project lead', who: 'Volunteer, experienced', hours: '1 project', text: 'Runs the team’s internal meeting, keeps the scope and the schedule, and coaches.' },
  { role: 'Team leader', who: 'College student', hours: '5–10 hrs / week', text: 'Runs the work day to day and presents to the founder.' },
  { role: 'Contributor', who: 'College student', hours: '4–8 hrs / week', text: 'Does the core work: research, design, software, media or sales.' },
  { role: 'Builder Scholars ×3', who: 'High school students', hours: '~3 hrs / week', text: 'Work alongside the college students on the same deliverables.' },
]

export const PROJECT_STEPS = [
  { label: 'Scope', text: 'In the first week the founder and project lead write the scope: the overview and a week-by-week plan of what will be delivered.' },
  { label: 'Two meetings a week', text: 'One internal, with the team and project lead, for tasks and blockers. One with the founder, to review the work and re-scope.' },
  { label: 'Delivery', text: 'At the end of the term the team delivers the work. The company keeps it, and all equity and intellectual property.' },
  { label: 'After', text: 'Students who deliver are invited to lead a team. Some projects reveal an opportunity the studio builds into a company with the founder.' },
]

export const FAITH = [
  'The work is judged on quality first. Every young person the studio trains is a committed Christian, and this is assessed seriously during selection. The studio holds that a builder’s character affects what gets built: telling the truth, keeping commitments and treating people as bearers of God’s image.',
  'Partners do not need to share the faith.',
]

export const TRADITION = [
  'The university, the scientific method, the patent, the joint-stock company and the rule of law took shape in the Western tradition, alongside the belief that every person bears the image of God and is meant to create. America has been their largest steward.',
  'The studio’s position: these are an inheritance to be added to by building, and used for the benefit of others.',
]

export const COMPARABLES = {
  head: ['Program', 'What it does'],
  rows: [
    { cells: ['Thiel Fellowship', 'Two years and a $200,000 grant for builders 22 and under who skip or leave college'], href: 'https://www.profellow.com/?p=11864' },
    { cells: ['Emergent Ventures', 'Fast, low-overhead grants to talented people before anyone has validated them'], href: 'https://www.mercatus.org/podcasts/tyler-cowen-announces-emergent-ventures' },
    { cells: ['Rise', 'Lifelong support for promising young people, founded by Eric and Wendy Schmidt with the Rhodes Trust'], href: 'https://www.risefortheworld.org/faq' },
    { cells: ['Z Fellows', 'One week and $10,000 to work alongside founders of billion-dollar companies'], href: 'https://www.brooklynchamber.com/resource/1-week-10000-your-fast-track-into-silicon-valley/' },
    { cells: ['Praxis', 'Accelerators and community for founders motivated by their faith'], href: 'https://praxis.co/about' },
    { cells: ['8VC Build', 'A studio inside a venture firm that co-founds companies such as Saronic'], href: 'https://www.everythingstartups.com/article/8vc-closes-1-5b-fund-7-largest-fund-to-date' },
  ],
  after:
    'Differences: West Ventures starts younger, stays with its builders for years, trains them inside real companies, and makes character and faith a selection criterion.',
}

export const REQUESTS = [
  { label: 'Founders and operators', text: 'Bring a problem or an opportunity your company cannot get to.' },
  { label: 'Investors', text: 'Send one or two portfolio companies a term.' },
  { label: 'Universities and high schools', text: 'Send your best students to work on teams.' },
  { label: 'Parents and teachers', text: 'Nominate students with unusual ability.' },
]

export const SOURCES = [
  {
    before: 'Bell, Chetty, Jaravel, Petkova and Van Reenen, ',
    title: 'Who Becomes an Inventor in America? The Importance of Exposure to Innovation',
    href: 'https://www.nber.org/papers/w24062.pdf',
    after: ', NBER',
  },
  {
    before: 'Lubinski, Benbow and Kell, ',
    title: 'Life Paths and Accomplishments of Mathematically Precocious Males and Females Four Decades Later',
    href: 'https://www.psychologicalscience.org/journals/psychological-science/0956797614551371/',
    after: ', Psychological Science (2014)',
  },
  {
    before: '',
    title: 'Leonardo the Apprentice: Verrocchio’s pupils',
    href: 'https://eclecticlight.co/2019/03/17/leonardo-the-apprentice-verrocchios-pupils/',
    after: ', The Eclectic Light Company',
  },
  {
    before: 'Harriet Zuckerman, Scientific Elite (1977), summarized in ',
    title: 'Responsible Conduct of Research: Mentoring',
    href: 'https://ccnmtl.columbia.edu/projects/rcr/rcr_mentoring/conclusion/index.html',
    after: ', Columbia University',
  },
  { before: '', title: 'J. J. Thomson', href: 'https://en.wikipedia.org/wiki/J._J._Thomson', after: ', Wikipedia' },
  { before: '', title: 'Andrew Carnegie', href: 'https://www.britannica.com/money/Andrew-Carnegie', after: ', Britannica' },
  { before: '', title: 'Charles M. Schwab', href: 'https://en.wikipedia.org/wiki/Charles_M._Schwab', after: ', Wikipedia' },
]
