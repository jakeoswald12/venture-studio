import type { Metadata } from 'next'
import { EssayShell, H2, P, Reading, Stat, Wide } from '@/components/thesis/Essay'
import { ChainReaction, Connections } from '@/components/thesis/Illustrations'

/**
 * /thesis/critical-mass — why a dense network of students, founders, schools
 * and families grows more valuable with every member, until the flywheel turns
 * on its own. Linked from the Flywheel section of /thesis.
 */

const TITLE = 'Critical Mass'
const DESCRIPTION =
  'A network grows more valuable with every member who joins it. On Metcalfe’s law, density, and the point at which the flywheel starts to turn on its own.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/thesis/critical-mass' },
  openGraph: { url: '/thesis/critical-mass', title: TITLE, description: DESCRIPTION, type: 'article' },
}

const READING = [
  { author: 'AnnaLee Saxenian', work: 'Regional Advantage: Culture and Competition in Silicon Valley and Route 128', year: '1994' },
  { author: 'James Davison Hunter', work: 'To Change the World', year: '2010' },
  { author: 'Malcolm Gladwell', work: 'The Tipping Point', year: '2000' },
]

const SOURCES = [
  { title: 'Review of Regional Advantage', href: 'https://www.princeton.edu/~starr/saxerev.html', site: 'Paul Starr, Princeton University' },
  { title: 'Summary of To Change the World', href: 'https://lifeandleadership.com/book-summaries/hunter-to-change-the-world', site: 'Life and Leadership' },
]

export default function CriticalMassPage() {
  return (
    <EssayShell
      title={TITLE}
      dek="Some things only work once there is enough of them in one place. A network of capable students and proven operators is one of them."
    >
      <Wide>
        <ChainReaction />
      </Wide>

      <P>
        In physics, critical mass is the smallest amount of material that can sustain a chain reaction. Below it, each
        reaction fizzles out on its own. Above it, each reaction sets off more than one other, and the process keeps
        itself going. Nothing about the material changes at that point except how much of it is together.
      </P>
      <P>
        Networks of people work the same way. A handful of students and founders is a program. Enough of them, close
        enough together, is a place where good things happen by themselves: introductions nobody planned, projects that
        lead to other projects, opportunities that find the right person because the right person is nearby.
      </P>

      <H2>Metcalfe’s law</H2>
      <P>
        Robert Metcalfe, a co-inventor of Ethernet, observed that the value of a network grows with the square of the
        number of people in it. The reason is simple arithmetic. Every new member can connect to every member already
        there, so the number of possible connections grows much faster than the number of members.
      </P>
      <Wide caption="Doubling the members roughly quadruples the connections.">
        <Connections />
      </Wide>
      <P>
        Five people have ten possible connections. Twenty have 190. A thousand have nearly half a million. Each new
        student or founder who joins does not add one unit of value; they add a connection to everyone already there,
        and they make the network more valuable to every other member.
      </P>
      <Stat value="499,500">possible connections among 1,000 members, compared with 4,950 among 100.</Stat>

      <H2>Who is in the network</H2>
      <P>
        The West Ventures network is not only students and founders. Every participant brings a network of their own.
      </P>
      <P>
        A student brings a high school or a college, teachers and classmates, and parents who have their own work,
        friends and churches. A partner school brings its alumni. A founder brings a company, its customers, its
        investors and its board. An investor brings a portfolio. Every project puts a founder’s problem in front of
        students from several schools at once, and puts those students in front of the founder, his colleagues and
        everyone who sees the work.
      </P>
      <P>
        Each of those overlaps is attention and exposure: for good projects, for capable students, and for the
        companies they build. The more of them there are, the faster good work is noticed, and the faster the flywheel
        turns.
      </P>

      <H2>Density, not size</H2>
      <P>
        Size alone is not the point. What matters is how many of those connections are actually used. AnnaLee Saxenian’s
        study of Silicon Valley and Boston’s Route 128 found that the two regions had similar talent and similar
        technology. Silicon Valley pulled ahead because its people talked to each other: they shared information, moved
        between firms and helped each other start new ones. Route 128’s firms kept to themselves.
      </P>
      <P>
        James Davison Hunter reached a similar conclusion about culture. In <em>To Change the World</em> he argues that
        lasting change comes from networks of capable people working together, and that it is greatest where those
        networks overlap. A dense network, where students, founders, investors, schools and families meet again and
        again, is worth far more than a large, loose one.
      </P>
      <P>
        The aim is not to be the biggest network. It is to be the place where the best students and the most proven
        operators actually meet.
      </P>

      <H2>When the flywheel turns on its own</H2>
      <P>
        Before critical mass, every project has to be found and every student has to be recruited by hand. After it,
        the flywheel starts to feed itself. Excellent work attracts proven operators. Proven operators bring great
        opportunities. Great opportunities attract elite students, who produce more excellent work. Each turn adds
        people, and each person makes the next turn easier.
      </P>
      <P>
        That is the point every network is trying to reach: the moment it has enough momentum that it keeps growing
        without being pushed, and enough pull that the best people come looking for it.
      </P>

      <H2>Everyone gains</H2>
      <P>
        A network like this is not zero-sum. A student who joins makes the network better for every founder. A founder
        who joins makes it better for every student. Partner schools gain opportunities for their students that no
        single school could offer, and the organizations already doing good work in this space gain one more place where
        their people can meet capable young builders.
      </P>
      <P>
        The goal is critical mass: enough of the right people, close enough together, that good work happens by itself.
      </P>

      <Reading reading={READING} sources={SOURCES} />
    </EssayShell>
  )
}
