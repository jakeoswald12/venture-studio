import type { Metadata } from 'next'
import { CarnegieLine, EssayShell, H2, P, Quote, Reading, Stat, Wide } from '@/components/thesis/Essay'
import { CupAndCrown, NobelTree, TrustLadder } from '@/components/thesis/Illustrations'

/**
 * /thesis/kings-and-cupbearers — why the presence of a "king" in a young
 * person's life predicts what they go on to build. Linked from the Model
 * section of /thesis.
 */

const TITLE = 'Kings & Cupbearers'
const DESCRIPTION =
  'Great builders almost always stand on the shoulders of earlier ones. On apprenticeship, earned trust, and why the presence of a king in a young person’s life predicts what they go on to build.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/thesis/kings-and-cupbearers' },
  openGraph: { url: '/thesis/kings-and-cupbearers', title: TITLE, description: DESCRIPTION, type: 'article' },
}

const READING = [
  { author: 'The Book of Nehemiah', work: 'Chapters 1–6', year: 'c. 5th century BC' },
  { author: 'Malcolm Gladwell', work: 'Outliers: The Story of Success', year: '2008' },
  { author: 'James Davison Hunter', work: 'To Change the World', year: '2010' },
  { author: 'Harriet Zuckerman', work: 'Scientific Elite: Nobel Laureates in the United States', year: '1977' },
  { author: 'Andrew Carnegie', work: 'Autobiography of Andrew Carnegie', year: '1920' },
]

const SOURCES = [
  { title: 'Outliers: important quotes', href: 'https://www.supersummary.com/outliers/important-quotes/', site: 'SuperSummary' },
  { title: 'Responsible Conduct of Research: Mentoring (on Zuckerman)', href: 'https://ccnmtl.columbia.edu/projects/rcr/rcr_mentoring/conclusion/index.html', site: 'Columbia University' },
  { title: 'J. J. Thomson', href: 'https://en.wikipedia.org/wiki/J._J._Thomson', site: 'Wikipedia' },
  { title: 'Andrew Carnegie', href: 'https://www.britannica.com/money/Andrew-Carnegie', site: 'Britannica' },
  { title: 'Charles M. Schwab', href: 'https://en.wikipedia.org/wiki/Charles_M._Schwab', site: 'Wikipedia' },
  { title: 'Summary of To Change the World', href: 'https://lifeandleadership.com/book-summaries/hunter-to-change-the-world', site: 'Life and Leadership' },
]

export default function KingsAndCupbearersPage() {
  return (
    <EssayShell
      title={TITLE}
      dek="The West loves the story of the self-made man. It is almost never true. Great builders stand on the shoulders of earlier ones, and the surest sign of what a young person will build is whether a king has taken them on."
    >
      <Wide>
        <CupAndCrown />
      </Wide>

      <H2>The myth of the self-made man</H2>
      <P>
        The Western picture of the entrepreneur is a lone figure. Nobody believes in him, nobody understands him, and he
        succeeds anyway, by talent and stubbornness alone. It is a stirring picture, and it is mostly false.
      </P>
      <P>
        Look closely at almost any great builder and you find someone behind them: a mentor who opened a door, a patron
        who took a risk, an older craftsman who let them work on the real thing before they were ready. Malcolm Gladwell
        made this the subject of <em>Outliers</em>. His conclusion was blunt:
      </P>
      <Quote cite="Malcolm Gladwell, Outliers, 2008">
        People don’t rise from nothing. We do owe something to parentage and patronage.
      </Quote>
      <P>
        The people we call self-made, Gladwell argued, are almost always the beneficiaries of hidden advantages,
        extraordinary opportunities and inherited legacies. The advantage that matters most for a young builder is not
        money. It is a person: someone who has already built something and decides to bring them along.
      </P>

      <H2>Kings and cupbearers</H2>
      <P>
        We use old words for that relationship. A king is a proven owner, operator or investor: someone who has built
        something real and has more opportunities than time. A cupbearer is a capable young person close enough to the
        king to be useful, and to be trusted.
      </P>
      <P>
        In the ancient courts the cupbearer was not a waiter. He tasted the king’s wine before the king drank it, so he
        held the king’s life in his hands every day. The office went to someone the king trusted completely, and that
        trust made the cupbearer one of the most influential people in the palace.
      </P>
      <Quote cite="Nehemiah 1:11 (KJV)">For I was the king’s cupbearer.</Quote>
      <P>
        Nehemiah held that office for Artaxerxes, king of Persia. When news came that Jerusalem’s walls lay in ruins, the
        king noticed the sorrow on his cupbearer’s face and asked what he wanted. Nehemiah asked to be sent to rebuild
        the city. The king gave him leave, letters of safe passage to the governors on the way, a letter for timber from
        the royal forest, and an escort of officers and horsemen.
      </P>
      <Quote cite="Nehemiah 2:8 (KJV)">And the king granted me, according to the good hand of my God upon me.</Quote>
      <P>
        The wall was finished in fifty-two days. Nehemiah was a gifted leader, but he did not build Jerusalem’s wall from
        nothing. He built it with a king’s trust, a king’s letters and a king’s timber, and he had earned all three by
        years of faithful service close to the throne.
      </P>

      <H2>The best predictor</H2>
      <P>
        It is hard to build a kingdom from scratch. It is much more likely when someone inherits something from a king: a
        network, a reputation, resources, a way of seeing the work. That is why the presence of a king in a young
        person’s life is one of the strongest predictors of what they will go on to do. The pattern repeats wherever
        great work is done.
      </P>
      <P>
        Andrew Carnegie, the model American self-made man, was a teenage telegraph operator when Thomas Scott of the
        Pennsylvania Railroad made him his secretary. Carnegie learned the business at Scott’s side and later succeeded
        him. Carnegie in turn found Charles Schwab driving stakes at one of his steel works and made him president of
        Carnegie Steel at 35.
      </P>
      <CarnegieLine />
      <P>
        Science shows the same lineage. Seven of J. J. Thomson’s students at Cambridge won Nobel Prizes, and so did his
        son. One of those students, Ernest Rutherford, trained several more.
      </P>
      <Wide caption="Nobel laureates trained by J. J. Thomson, and by his student Ernest Rutherford.">
        <NobelTree />
      </Wide>
      <Stat value="48 of 92">
        American Nobel laureates in science through 1972 who had worked as students, postdocs or junior collaborators
        under older laureates (Harriet Zuckerman, <em>Scientific Elite</em>, 1977).
      </Stat>
      <P>
        Leonardo da Vinci trained in Verrocchio’s workshop and painted parts of real commissions as a teenager.
        Alexander Hamilton was barely in his twenties when George Washington made him an aide-de-camp, and Washington’s
        trust carried him to the Treasury. Scripture is full of the same pattern: Joshua served Moses from his youth,
        Elisha followed Elijah, Timothy traveled with Paul. Isaac Newton put it best: if he had seen further, it was by
        standing on the shoulders of giants.
      </P>

      <H2>Trust is earned in small things</H2>
      <P>
        Everything a king can give rests on one thing: trust. Kings do not hand their networks, their reputations or
        their resources to people they do not trust, and trust cannot be faked or rushed. It is earned slowly, by being
        faithful with small things until someone is willing to risk larger ones.
      </P>
      <Quote cite="Luke 16:10 (KJV)">He that is faithful in that which is least is faithful also in much.</Quote>
      <Quote cite="Matthew 25:21 (KJV)">
        Thou hast been faithful over a few things, I will make thee ruler over many things.
      </Quote>
      <P>
        The reward of trust compounds. When a king trusts someone, other kings take notice. His endorsement is the most
        valuable thing he can give, because it carries his reputation with it. A young person a respected operator
        vouches for gets meetings, offers and opportunities that no résumé could open. Access, reputation and resources
        follow the endorsement, not the other way around.
      </P>

      <H2>Merit is necessary, not sufficient</H2>
      <P>
        This is not an argument against merit. We believe in it. The studio selects hard, holds a high standard and
        judges work on its quality. But the world is smaller than a meritocracy pretends. A diploma is not enough. A
        great transcript is not enough. Thousands of people have both.
      </P>
      <P>
        What separates the ones who go on to build is that someone who matters has watched them work, trusted them with
        something real, and decided to take them to the next level. Merit gets a young person noticed. A king’s trust
        gets them in.
      </P>

      <H2>Density</H2>
      <P>
        The sociologist James Davison Hunter, in <em>To Change the World</em>, argues that cultures change less through
        lone individuals or mass movements than through networks of capable people, and that change is greatest where
        those networks overlap. He calls the Christian version of this “faithful presence”: excellent people, working
        together in institutions, serving the common good.
      </P>
      <P>
        The pairing of kings and cupbearers is that idea at human scale. One king and one cupbearer can change a company.
        Hundreds of kings and thousands of cupbearers, working together over decades, can change a culture.
      </P>

      <H2>How the studio does it</H2>
      <P>
        West Ventures makes this pattern deliberate. Students start small and earn larger trust by delivering. A high
        school Builder Scholar becomes a contributor, then a team leader, then a Fellow. Fellows get the largest
        opportunities: working directly with proven operators and investors on the joint ventures the studio builds with
        them.
      </P>
      <Wide>
        <TrustLadder />
      </Wide>
      <P>
        Nehemiah did not ask the king for timber on his first day at court. He asked after years of faithful service,
        and the king said yes. That is the whole idea.
      </P>

      <Reading reading={READING} sources={SOURCES} />
    </EssayShell>
  )
}
