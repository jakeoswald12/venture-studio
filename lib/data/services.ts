/**
 * What the studio provides to the companies it works with. Literal language.
 * The six disciplines come from the ACU accelerator's own list.
 */

export interface Service {
  title: string
  text: string
}

export const DISCIPLINES: Service[] = [
  { title: 'Research', text: 'Customer interviews, market sizing and problem validation.' },
  { title: 'Strategy', text: 'Business models, pricing and launch plans.' },
  { title: 'AI and software', text: 'Websites, apps, internal tools and AI agents.' },
  { title: 'Branding', text: 'Names, logos, visual identity and messaging.' },
  { title: 'Marketing', text: 'Photo, video, copywriting and paid advertising.' },
  { title: 'Sales', text: 'Lead lists, outreach and customer pipeline.' },
]

export const ENGAGEMENT_MODELS: Service[] = [
  {
    title: 'Project teams',
    text: 'A team of six students works on one defined project for a full semester: a project leader, three college contributors and two high school Builder Scholars. There is no fee. The company keeps all equity and intellectual property.',
  },
  {
    title: 'Project management',
    text: 'A studio project manager sits between the founder and the team. The team meets twice a week, once internally and once with the founder, against a written scope. The studio handles all academic paperwork.',
  },
  {
    title: 'Joint ventures',
    text: 'The studio co-founds about six companies a year with operators who have found an opportunity. The operator brings the opportunity and industry knowledge; the studio brings the team. The studio holds equity.',
  },
  {
    title: 'Talent and network',
    text: 'Introductions to the studio’s investors, partners and advisors, and access to students and Student Fellows as future hires.',
  },
]
