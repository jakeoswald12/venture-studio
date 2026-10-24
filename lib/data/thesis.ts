/**
 * The West Ventures thesis, from the "West Ventures: Our Thesis" document
 * (October 2026), restated in plain, literal language for the site.
 */

export type ThesisBlock =
  | { kind: 'p'; text: string }
  | { kind: 'items'; items: { label: string; text: string; href?: string; linkText?: string }[] }
  | { kind: 'steps'; items: { label: string; text: string }[] }
  | { kind: 'stats'; items: { value: string; label: string }[] }
  | { kind: 'table'; head: string[]; rows: { cells: string[]; href?: string }[] }
  | { kind: 'list'; items: string[] }

export interface ThesisSection {
  id: string
  title: string
  blocks: ThesisBlock[]
}

export const THESIS_SUMMARY =
  'West Ventures finds young people with exceptional ability, trains them on real company work, and builds a small number of companies with them. This page states why the studio exists and how it operates.'

export const THESIS: ThesisSection[] = [
  {
    id: 'premise',
    title: 'Premise',
    blocks: [
      {
        kind: 'p',
        text: 'Periods of rapid progress are usually traced to a small number of people, and to a wider group of teachers, engineers and patrons around them. Those people had unusual ability. They also had the right teacher, funding and real work at the right age.',
      },
      {
        kind: 'p',
        text: 'The studio’s premise: ability is given by God; the conditions around it can be arranged on purpose. West Ventures exists to arrange them.',
      },
    ],
  },
  {
    id: 'evidence',
    title: 'Evidence',
    blocks: [
      {
        kind: 'items',
        items: [
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
            label: 'Apprenticeship',
            text: 'Leonardo da Vinci trained in Andrea del Verrocchio’s workshop in Florence and worked on real commissions as a teenager, alongside Perugino and Lorenzo di Credi. Ghirlandaio, likely from the same workshop, later took Michelangelo as an apprentice at thirteen. Perugino later taught Raphael.',
            href: 'https://eclecticlight.co/2019/03/17/leonardo-the-apprentice-verrocchios-pupils/',
            linkText: 'The Eclectic Light Company',
          },
        ],
      },
      {
        kind: 'p',
        text: 'Conclusion: ability is widely distributed and visible early. Exposure, mentors and real work are not evenly distributed. The gap can be closed deliberately.',
      },
    ],
  },
  {
    id: 'goal',
    title: 'Goal: 1,000 builders',
    blocks: [
      {
        kind: 'p',
        text: 'Find and train 1,000 young people who go on to found or lead companies in their industries, and who would not have done so otherwise. Most of them are between 12 and 18 today.',
      },
      {
        kind: 'stats',
        items: [
          { value: '~4M', label: 'U.S. births per year' },
          { value: '~4,000', label: 'Top 0.1% of a single birth year' },
          { value: '30 yrs', label: 'Period the goal is measured over' },
        ],
      },
      {
        kind: 'p',
        text: 'The number is a measure, not a quota. Without intervention, most of these people will lead good lives in ordinary roles. The studio’s aim is that more of them reach the work they are capable of.',
      },
    ],
  },
  {
    id: 'structure',
    title: 'What the studio is',
    blocks: [
      {
        kind: 'list',
        items: [
          'Not a venture capital fund. No management fees and no carry.',
          'No charges to founders or investors.',
          'Places student teams inside companies, under the founders, on defined projects.',
          'Builds about six companies a year itself, mostly as joint ventures with operators who have found an opportunity.',
          'A for-profit company, separately owned and permanently affiliated with Austin Christian University. The relationship is modeled on Stanford and Y Combinator.',
          'A share of profits goes to ACU’s endowment.',
        ],
      },
    ],
  },
  {
    id: 'operating-model',
    title: 'Operating model',
    blocks: [
      {
        kind: 'steps',
        items: [
          {
            label: 'Scout',
            text: 'Heads of school, teachers and counselors at Christian schools nominate students. The first Builder Scholars cohort had hundreds of nominations for 35 seats. Selection starts with high school seniors and will move to younger students. The Builder’s Quotient assessment is refined with each cohort.',
          },
          {
            label: 'Form',
            text: 'Students develop skill, judgment and faith together, in Builders Guilds on partner campuses and in person at ACU.',
          },
          {
            label: 'Apprentice',
            text: 'Teams of six: one project leader, three college contributors and two high school Builder Scholars. Each team works one semester on a real project for a founder, for course credit. Teams meet twice a week, once internally and once with the founder, against a written scope.',
          },
          {
            label: 'Build',
            text: 'Most will spend their twenties working for and with founders. Many will start companies later, at 25, 35 or 45.',
          },
        ],
      },
      {
        kind: 'p',
        text: 'Current status: scouting is new. ACU teams won the Gloo AI Hackathon in 2025 and 2026.',
      },
    ],
  },
  {
    id: 'terms',
    title: 'Partner terms',
    blocks: [
      {
        kind: 'table',
        head: ['', 'What they get', 'What is asked'],
        rows: [
          {
            cells: [
              'Founders',
              'A team of six for a semester, a project manager between the founder and the students, a weekly schedule, no academic paperwork',
              'A real problem, an honest scope, one hour a week of teaching',
            ],
          },
          {
            cells: [
              'Investors',
              'Progress across their portfolio, early access to a generation of talent, a place on the published roster of founding partner firms',
              'One or two portfolio companies per semester, founders willing to mentor',
            ],
          },
        ],
      },
      {
        kind: 'p',
        text: 'Funding: students and families pay for the programs they take part in. Partner universities pay an annual fee to host a Builders Guild. Companies and investors do not pay. Students earn academic credit, not salaries; a company may pay its students if it chooses.',
      },
    ],
  },
  {
    id: 'faith',
    title: 'Faith and standards',
    blocks: [
      {
        kind: 'p',
        text: 'The work is judged on quality first. Every young person the studio trains is a committed Christian, and this is assessed seriously during selection. The studio holds that a builder’s character affects what gets built: telling the truth, keeping commitments and treating people as bearers of God’s image.',
      },
      { kind: 'p', text: 'Partners do not need to share the faith.' },
    ],
  },
  {
    id: 'tradition',
    title: 'Western tradition',
    blocks: [
      {
        kind: 'p',
        text: 'The university, the scientific method, the patent, the joint-stock company and the rule of law took shape in the Western tradition, alongside the belief that every person bears the image of God and is meant to create. America has been their largest steward.',
      },
      {
        kind: 'p',
        text: 'The studio’s position: these are an inheritance to be added to by building, and used for the benefit of others.',
      },
    ],
  },
  {
    id: 'comparables',
    title: 'Comparable programs',
    blocks: [
      {
        kind: 'table',
        head: ['Program', 'What it does'],
        rows: [
          { cells: ['Thiel Fellowship', 'Two years and a $200,000 grant for builders 22 and under who skip or leave college'], href: 'https://www.profellow.com/?p=11864' },
          { cells: ['Emergent Ventures', 'Fast, low-overhead grants to talented people before anyone has validated them'], href: 'https://www.mercatus.org/podcasts/tyler-cowen-announces-emergent-ventures' },
          { cells: ['Rise', 'Lifelong support for promising young people, founded by Eric and Wendy Schmidt with the Rhodes Trust'], href: 'https://www.risefortheworld.org/faq' },
          { cells: ['Z Fellows', 'One week and $10,000 to work alongside founders of billion-dollar companies'], href: 'https://www.brooklynchamber.com/resource/1-week-10000-your-fast-track-into-silicon-valley/' },
          { cells: ['Praxis', 'Accelerators and community for founders motivated by their faith'], href: 'https://praxis.co/about' },
          { cells: ['8VC Build', 'A studio inside a venture firm that co-founds companies such as Saronic'], href: 'https://www.everythingstartups.com/article/8vc-closes-1-5b-fund-7-largest-fund-to-date' },
        ],
      },
      {
        kind: 'p',
        text: 'Differences: West Ventures starts younger, stays with its builders for years, trains them inside real companies, and makes character and faith a selection criterion.',
      },
    ],
  },
  {
    id: 'horizon',
    title: 'Time horizon',
    blocks: [
      {
        kind: 'p',
        text: 'Two timelines. A company that brings a project in January has finished work by May. The goal of 1,000 builders is measured over 30 years; a fifteen-year-old met this year reaches mid-career at 35 to 45.',
      },
      {
        kind: 'stats',
        items: [
          { value: 'Today', label: 'Software, AI, media, operations' },
          { value: '2–3 yrs', label: 'Energy, manufacturing, defense, life sciences' },
        ],
      },
    ],
  },
  {
    id: 'requests',
    title: 'Requests',
    blocks: [
      {
        kind: 'items',
        items: [
          { label: 'Founders and investors', text: 'Bring the hardest open problems in your company or portfolio.' },
          { label: 'Universities', text: 'Host a Builders Guild on your campus.' },
          { label: 'Parents and teachers', text: 'Nominate students with unusual ability.' },
        ],
      },
    ],
  },
]
