import type { Metadata } from 'next'
import { EssayShell, H2, P, Plate, Quote, Reading } from '@/components/thesis/Essay'
import { MODEL } from '@/lib/data/thesis'

/**
 * /thesis/the-inheritance — the essay behind the Philosophy section of
 * /thesis: what the West built, the evidence that it is in decline, and why
 * the studio's answer is to build. It ends by handing the reader to the next
 * section (Model) and its essay.
 */

const TITLE = 'The Inheritance'
const DESCRIPTION =
  'The West produced the largest improvement in human life on record. It is now spending that inheritance faster than it adds to it. The evidence, and the case for building again.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/thesis/the-inheritance' },
  openGraph: {
    url: '/thesis/the-inheritance',
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    images: ['/thesis/course-of-empire/3-consummation.jpg'],
  },
}

const IMG = '/thesis/course-of-empire/'

const READING = [
  { author: 'Tom Holland', work: 'Dominion: How the Christian Revolution Remade the World', year: '2019' },
  { author: 'Joseph Henrich', work: 'The WEIRDest People in the World', year: '2020' },
  { author: 'Sir John Glubb', work: 'The Fate of Empires and Search for Survival', year: '1976' },
  { author: 'Aleksandr Solzhenitsyn', work: 'A World Split Apart (Harvard address)', year: '1978' },
  { author: 'C. S. Lewis', work: 'The Abolition of Man', year: '1943' },
  { author: 'Dorothy L. Sayers', work: 'The Greatest Drama Ever Staged', year: '1938' },
  { author: 'John Winthrop', work: 'A Model of Christian Charity', year: '1630' },
  { author: 'David Hackett Fischer', work: 'Washington’s Crossing', year: '2004' },
  { author: 'Os Guinness', work: 'A Free People’s Suicide', year: '2012' },
  { author: 'George Berkeley', work: 'Verses on the Prospect of Planting Arts and Learning in America', year: '1752' },
]

const SOURCES = [
  { title: 'A history of global living conditions', href: 'https://ourworldindata.org/a-history-of-global-living-conditions', site: 'Our World in Data' },
  { title: 'West Africa Squadron', href: 'https://en.wikipedia.org/wiki/West_Africa_Squadron', site: 'Wikipedia' },
  { title: 'U.S. fertility rates drop to record low in 2025 (CDC provisional data)', href: 'https://www.ksl.com/article/51481355/us-fertility-rates-drop-to-record-low-in-2025-as-births-fall', site: 'KSL' },
  { title: 'A record-high share of 40-year-olds in the U.S. have never been married', href: 'https://www.pewresearch.org/short-reads/2023/06/28/a-record-high-share-of-40-year-olds-in-the-us-have-never-been-married/', site: 'Pew Research Center' },
  { title: 'U.S. church membership falls below majority for first time', href: 'https://news.gallup.com/poll/341963/church-membership-falls-below-majority-first-time.aspx', site: 'Gallup' },
  { title: 'Public trust in government: 1958–2025', href: 'https://www.pewresearch.org/politics/2025/12/04/public-trust-in-government-1958-2025/', site: 'Pew Research Center' },
  { title: 'NAEP scores for the class of 2024 show major declines', href: 'https://www.chalkbeat.org/2025/09/09/naep-scores-12th-grade-math-reading-declines/', site: 'Chalkbeat' },
  { title: '2023 Youth Risk Behavior Survey results', href: 'https://www.cdc.gov/yrbs/results/2023-yrbs-results.html', site: 'CDC' },
  { title: 'What is the national debt costing us?', href: 'https://www.pgpf.org/article/what-is-the-national-debt-costing-us/', site: 'Peter G. Peterson Foundation' },
  { title: 'Ferguson’s Law', href: 'https://www.hoover.org/research/fergusons-law', site: 'Hoover Institution' },
  { title: 'California’s high-speed rail faces rising costs, delays', href: 'https://dailybruin.com/2026/10/11/californias-high-speed-rail-faces-rising-costs-delays-ahead-of-2040-debut/', site: 'Daily Bruin' },
  { title: 'WSJ/NORC poll: religion, patriotism and having children diminish in importance', href: 'https://www.ncregister.com/cna/wsj-poll-religion-patriotism-and-having-children-diminish-in-importance-for-americans', site: 'National Catholic Register' },
  { title: 'Gen Z drives sharp decline in American pride (Gallup)', href: 'https://cssh.northeastern.edu/gen-z-drives-sharp-decline-in-american-pride-poll/', site: 'Northeastern University' },
  { title: 'Young Americans and socialism (Cato/YouGov survey, 2025)', href: 'https://www.cato.org/blog/young-americans-socialism-too-much-thats-problem-libertarians-must-fix', site: 'Cato Institute' },
  { title: 'A World Split Apart', href: 'https://www.solzhenitsyncenter.org/a-world-split-apart', site: 'The Aleksandr Solzhenitsyn Center' },
  { title: 'George Washington to Samuel Washington, 18 December 1776', href: 'https://founders.archives.gov/documents/Washington/03-07-02-0299', site: 'Founders Online' },
  { title: 'The Course of Empire series', href: 'https://explorethomascole.org/project/course-of-empire-series-page/', site: 'Thomas Cole National Historic Site' },
]

export default function TheInheritancePage() {
  return (
    <EssayShell
      title={TITLE}
      author="Jake Oswald"
      back="/thesis#philosophy"
      dek="The West produced the largest improvement in human life on record. It is now spending that inheritance faster than it adds to it. This is the evidence, and the reason we build."
      next={{
        section: 'Model',
        anchor: 'model',
        paragraphs: MODEL.intro,
        essay: { href: '/thesis/kings-and-cupbearers', title: 'Kings & Cupbearers' },
      }}
    >
      <P>
        For almost all of human history, the life of an ordinary person was short and poor, and nobody expected
        otherwise. In 1820 about four of every five people on earth lived in what we now call extreme poverty. One in ten
        could read. More than four in ten children died before their fifth birthday, in palaces as well as in huts.
      </P>
      <P>
        Then, in one corner of the world, the lines turned. Today fewer than one person in ten lives in extreme poverty.
        Nearly nine in ten can read. Child mortality has fallen tenfold, and life expectancy has doubled on every
        continent. Nothing like it had happened before, in any civilization, in five thousand years of records.
      </P>
      <P>
        The turn began in a particular place: northwestern Europe and the countries it founded. Historians argue about
        how much credit belongs to coal, to trade, to law and to ideas. They do not argue about where it started, or
        that the rest of the world grew richer by adopting what was worked out there. This essay is about that
        inheritance: where it came from, what is happening to it, and what West Ventures intends to do about it.
      </P>

      <H2>What the West built</H2>
      <P>
        Start with the institutions. The university is an invention of medieval Christendom: Paris and Oxford grew out
        of church schools, and centuries later Harvard, Yale and Princeton were founded to train ministers. The hospital
        as a public institution goes back to Basil of Caesarea, a bishop, around the year 370. The principle that a king
        is under the law was written into Magna Carta in 1215, with the Archbishop of Canterbury at the center of the
        negotiation.
      </P>
      <P>
        Modern science was built largely by people who believed that a rational God had made an orderly world, and that
        it could therefore be understood. Copernicus was a cathedral canon. Kepler trained as a theologian. Newton wrote
        more about theology than about physics. Gregor Mendel, who founded genetics, was a friar. Georges Lemaître, who
        first proposed what became the Big Bang theory, was a priest. The same was true of the arts. Bach signed his
        scores <em>Soli Deo Gloria</em>, to the glory of God alone, and Handel wrote <em>Messiah</em> in twenty-four
        days.
      </P>
      <P>
        The moral inheritance is the hardest to see, because we live inside it. Slavery was practiced by nearly every
        civilization on record, and almost none of them thought it needed defending. The movement to abolish it began
        among Quakers and evangelicals in Britain and America, and they paid for it. Between 1807 and 1860 the Royal
        Navy’s West Africa Squadron seized about 1,600 slave ships and freed about 150,000 Africans.
      </P>
      <P>
        The historian Tom Holland argues in <em>Dominion</em> that the convictions modern people treat as obvious are
        not obvious at all: that every person has equal dignity, that the weak have a claim on the strong, that power
        must answer to something above itself. The ancient world found these ideas strange or offensive. They entered
        history through Christianity. The Harvard anthropologist Joseph Henrich, working from data and not from
        doctrine, reaches a compatible conclusion. He finds that the medieval Church’s reshaping of marriage and family
        is a main reason Western people learned to trust strangers, form voluntary associations and build markets that
        work between people who are not kin.
      </P>
      <P>
        The American founding stands inside this tradition. The Declaration of Independence rests its argument on a
        theological claim, that all men “are endowed by their Creator with certain unalienable Rights,” and it refers to
        God four times. The founders were not all orthodox believers; Jefferson was not. But the logic they used is
        Christian in structure. A right that a government grants, a government can take back. They put human rights out
        of the state’s reach by placing their source above it.
      </P>
      <P>
        None of this erases the West’s crimes: slavery, conquest, the treatment of native peoples. But consider how
        those crimes came to be condemned. Frederick Douglass and Martin Luther King Jr. did not appeal to a morality
        from outside the West. They held the country to its own Declaration and its own Scriptures and demanded that it
        mean them. A civilization that can be indicted by its own principles has something most civilizations have
        lacked.
      </P>

      <H2>Noon</H2>
      <Plate
        src={IMG + '3-consummation.jpg'}
        w={2048}
        h={1388}
        priority
        caption={<>Thomas Cole, <em>The Consummation of Empire</em>, 1835–36. New-York Historical Society.</>}
      />
      <P>
        In the 1830s the American painter Thomas Cole painted the life of a civilization in five canvases. All five show
        the same bay under the same rock: first wilderness, then farmland, then imperial splendor, then destruction,
        then ruin. The third, <em>The Consummation of Empire</em>, is set at noon. The harbor is lined with marble, a
        conqueror is carried through the city in triumph, and every surface is gilded. It shows a people who have
        everything they could want, and no one in the picture is looking at anything beyond himself.
      </P>
      <P>When Cole advertised the series in the New York papers, he printed four lines of Byron with it:</P>
      <Quote cite="Lord Byron, Childe Harold’s Pilgrimage, Canto IV, 1818">
        There is the moral of all human tales;
        <br />
        ’Tis but the same rehearsal of the past,
        <br />
        First Freedom, and then Glory — when that fails,
        <br />
        Wealth, vice, corruption, — barbarism at last.
      </Quote>
      <P>
        Apply the sequence to the United States. Freedom was won by the founding generation. Glory came in the century
        and a half that followed: a continent settled, two world wars won, men on the moon. Then came wealth, on a scale
        no people had ever known. Cole’s question is what follows wealth.
      </P>
      <P>
        The British general Sir John Glubb asked the same question in 1976. He surveyed eleven empires across three
        thousand years and claimed that they lasted about 250 years each, passing through the same ages in the same
        order: pioneers, conquest, commerce, affluence, intellect, decadence. Glubb was a soldier and not a historian,
        and his arithmetic is loose. His central observation is harder to dismiss. Great powers are seldom killed from
        outside. Prosperity changes what a people wants, and it stops doing the things that made it prosperous. The
        United States turned 250 in July of this year.
      </P>

      <H2>The evidence</H2>
      <P>
        Whether the West is in decline is a question of fact, and it can be checked. The measures below were chosen
        because they are hard to argue with. They come from government statistical agencies and long-running surveys,
        and none of them depends on taste.
      </P>
      <P>
        <strong className="text-ink">We have stopped having children.</strong> American women now have about 1.6
        children each, against the 2.1 needed to hold a population steady, and the fertility rate fell to another record
        low in 2025. In most of Europe it is lower. A quarter of American forty-year-olds have never married. In 1980 it
        was six percent.
      </P>
      <P>
        <strong className="text-ink">We have stopped believing and stopped trusting.</strong> In 1999, seventy percent
        of Americans belonged to a church, synagogue or mosque. By 2020 it was forty-seven percent, the first time the
        figure had fallen below half in eighty years of polling. In 1964, seventy-seven percent of Americans trusted the
        federal government to do what is right most of the time. In 2025, seventeen percent did.
      </P>
      <P>
        <strong className="text-ink">We are teaching less.</strong> On the 2024 Nation’s Report Card, American high
        school seniors posted the lowest reading scores in the history of the test, and forty-five percent of them
        scored below the basic level in math.
      </P>
      <P>
        <strong className="text-ink">Our young people are unwell.</strong> In the CDC’s 2023 survey, four in ten high
        school students reported persistent feelings of sadness or hopelessness. Among girls it was more than half. More
        than a million Americans have died of drug overdoses since 1999.
      </P>
      <P>
        <strong className="text-ink">We have slowed down.</strong> The Empire State Building went up in 410 days. The
        Pentagon took sixteen months. California voters approved a high-speed rail line in 2008. Eighteen years later it
        has not carried a passenger, and its estimated cost has passed $120 billion.
      </P>
      <P>
        <strong className="text-ink">We are paying for the present with the future.</strong> The federal debt is roughly
        $40 trillion. This fiscal year the government will spend more than a trillion dollars on interest alone, which
        is more than it spends on national defense. The historian Niall Ferguson has argued that great powers which
        crossed that line, among them Habsburg Spain, Bourbon France, the Ottoman Empire and imperial Britain, did not
        stay great for long.
      </P>
      <P>
        Rome is the comparison everyone reaches for, and the details are closer than the cliché suggests. By the reign
        of Augustus, Rome’s upper classes were having so few children that the emperor passed laws penalizing the
        unmarried and the childless. A century later the satirist Juvenal wrote that a people who had once handed out
        commands and legions now wanted only two things, bread and circuses. Over the two hundred years after Nero, the
        emperors cut the silver in the coinage from more than ninety percent to less than five in order to pay their
        bills. The falling birth rate, the taste for entertainment over public duty and the debased money are all on the
        list above.
      </P>
      <P>
        It is fair to say what this evidence does not show. The West is still rich and still inventive, and it is still
        where most of the world’s migrants want to go. Decline at this stage is not collapse. It is a set of trend
        lines that all point the same way, in a society that has mostly stopped looking at them. In Cole’s terms, the
        fourth painting has not arrived. It is late in the afternoon of the third.
      </P>
      <Plate
        src={IMG + '4-destruction.jpg'}
        w={2048}
        h={1271}
        caption={<>Thomas Cole, <em>Destruction</em>, 1836. The fourth painting in the series.</>}
      />

      <H2>A civilization that dislikes itself</H2>
      <P>
        Statistics measure what a people does. They say less about what it believes. What follows in this section is my
        own reading, and a reader is free to weigh it differently.
      </P>
      <P>
        The mood inside the West has turned against the West. In 1998, seventy percent of Americans told pollsters that
        patriotism was very important to them. In 2023, thirty-eight percent did. Over the same years religion fell from
        sixty-two percent to thirty-nine, having children from fifty-nine to thirty, and community involvement from
        forty-seven to twenty-seven. One value rose, and it was money. The survey changed its method along the way,
        which probably overstates the size of the drop, but other polls show the same direction. In 2025 Gallup found
        that the share of Americans who are extremely or very proud of their country was the lowest since it began
        asking. Among the youngest adults it was about four in ten.
      </P>
      <P>
        Something filled the space. A generation was taught to read its own history chiefly as a record of oppression,
        and to see the rule of law, markets and the family less as achievements than as instruments of power. That
        reading descends from Marx, who taught that history is a struggle between oppressor and oppressed and that
        inherited institutions exist to protect the oppressor. It is now common well beyond the people who would call
        themselves Marxists. In a 2025 survey by the Cato Institute and YouGov, sixty-two percent of Americans under
        thirty held a favorable view of socialism, and thirty-four percent held a favorable view of communism, a system
        that killed tens of millions of its own citizens in the last century.
      </P>
      <P>
        This has happened before. The educated class of late imperial Russia came to despise its own country, its church
        and its inheritance long before 1917, and Dostoevsky described where that contempt would lead more than forty
        years in advance. Aleksandr Solzhenitsyn survived the camps that followed. When he later tried to explain the
        catastrophe, he said he could not improve on what he had heard old people say when he was a child:
      </P>
      <Quote cite="Aleksandr Solzhenitsyn, Templeton Address, 1983">
        Men have forgotten God; that’s why all this has happened.
      </Quote>
      <P>
        Five years earlier he had told a graduating class at Harvard what he saw in his new home: “A decline in courage
        may be the most striking feature that an outside observer notices in the West today.”
      </P>
      <P>
        The philosopher Roger Scruton had a word for the attitude: oikophobia, the repudiation of one’s own home. Its
        strangest feature is that it judges the West by standards that only the West supplied. The beliefs that the
        strong owe something to the weak, that every person counts equally and that a nation should confess its sins
        are Christian ideas. The West’s critics are drawing on the same inheritance as everyone else, and have
        forgotten who left it to them.
      </P>

      <H2>Building for what</H2>
      <P>
        If the inheritance is Christian, the next question is whether it can be kept without the faith. The founders
        did not think so. John Adams wrote in 1798 that the Constitution “was made only for a moral and religious
        People. It is wholly inadequate to the government of any other.”
      </P>
      <P>
        His reasoning was practical. A free country divides power among its citizens and then has to trust them with it.
        A free market rewards whatever people want, so everything depends on what they want. Remove the conviction that
        a person answers to God and owes something to his neighbor, and liberty turns into appetite. Wealth is pursued
        for comfort, comfort is defended with debt, and the state grows to manage people who no longer manage
        themselves. C. S. Lewis described the result in 1943: “We make men without chests and expect of them virtue and
        enterprise.”
      </P>
      <P>
        This is why we do not think the West can be renewed on economic grounds alone. A person can build for money,
        but money stops being a reason at about the point where the builder becomes comfortable. The people who built
        the West built for something else. They believed that the world was made good, that work was a calling, and
        that their lives were not their own. We think they were right. Their reasons worked because they were true, and
        a West that builds for other reasons will lose its way again.
      </P>
      <P>
        The difficulty is that Christianity in the modern West has stopped looking like any of this. For most of two
        thousand years the faith led. It raised the cathedrals, founded the universities, commissioned the art and
        trained many of the best minds of every century. Today it is widely seen as a private comfort, pleasant and
        harmless. Dorothy Sayers saw this coming in 1938:
      </P>
      <Quote cite="Dorothy L. Sayers, The Greatest Drama Ever Staged, 1938">
        We have very efficiently pared the claws of the Lion of Judah, certified Him “meek and mild,” and recommended
        Him as a fitting household pet for pale curates and pious old ladies.
      </Quote>
      <P>
        Many Christians know this and have wanted to change it for a generation. There are conferences, books, funds
        and networks devoted to faith and work, and the desire behind them is real and widely shared. What that desire
        has been waiting for is something built at scale: places where young believers do work of the highest standard,
        in public, in large numbers. That is what we are trying to build.
      </P>

      <H2>The last hour</H2>
      <P>
        In December 1776 the American Revolution was nearly over. Washington had lost New York and been chased across
        New Jersey. His army had shrunk to a few thousand men, and most of their enlistments expired on December 31. On
        the 18th he wrote to his brother Samuel that unless a new army could be recruited quickly, “I think the game is
        pretty near up.”
      </P>
      <P>
        A week later he staked what was left on one throw. On Christmas night he took about 2,400 men across the
        Delaware through floating ice and a storm, marched them nine miles in the dark, and attacked the garrison at
        Trenton in the morning. The password for the night was “Victory or Death.” The attack succeeded, the army
        survived the winter, and the country exists.
      </P>
      <P>
        Look at who was on that march. Washington was 44. Alexander Hamilton, commanding an artillery company, was about
        21. James Monroe, a lieutenant, was 18, and was shot through the shoulder leading a charge on the Hessian guns.
        Earlier that year Jefferson had written the Declaration at 33, and Madison was 25. The founding was largely the
        work of people the modern world would consider too young to be trusted with anything important.
      </P>
      <P>
        We think the West is in a December of its own. The measures above have been falling for two generations, and
        there is a point past which they become very hard to turn. But the young people we work with every term do not
        match the statistics. They grew up in comfort and found it thin. Many of them are tired of being entertained.
        They want real work, real responsibility and something worth giving their lives to, and very few institutions
        are offering it to them.
      </P>

      <H2>Make building admirable again</H2>
      <P>
        A civilization cannot be argued back into believing in itself. The argument has been made well and often, and
        the trend lines have not moved. What moves people, the young above all, is example. They become what they
        admire.
      </P>
      <P>
        The first Americans understood this. In 1630, aboard the <em>Arbella</em>, John Winthrop told the Puritans bound
        for Massachusetts what their colony was for. They would be “as a city upon a hill,” with “the eyes of all
        people” upon them: a demonstration, visible to the world, of what a community living under God could be. He
        also told them how it would be built: “We must delight in each other, make others’ conditions our own, rejoice
        together, mourn together, labor and suffer together.” The early American ideal was a person who built something
        excellent and spent himself on his neighbors. Private comfort was not the point of it.
      </P>
      <P>
        That is the plan. West Ventures is a venture studio, which means that we build companies. We build them with
        the most capable young people we can find, nominated by high schools and colleges across the country, and we
        put those students to work beside founders and operators who have already built great things. The students
        learn to build by building, on real problems, to a professional standard. The best of what they work on becomes
        companies that the studio owns alongside those operators.
      </P>
      <P>
        The purpose is larger than the companies. We want a generation to see people their own age doing difficult,
        excellent and useful work, doing it as Christians, and doing it for reasons that have nothing to do with getting
        comfortable. We want to form young leaders who treat their lives as something to be spent, for the glory of
        Christ and the good of their neighbors. If enough of them build enough that is plainly good, the argument over
        whether the West’s principles still work will settle itself, because anyone will be able to look.
      </P>
      <P>
        A century before Cole, the philosopher George Berkeley also imagined history as a drama in five acts. His poem
        about America gave Cole his title:
      </P>
      <Quote cite="George Berkeley, Verses on the Prospect of Planting Arts and Learning in America">
        Westward the course of empire takes its way;
        <br />
        The first four acts already past,
        <br />
        A fifth shall close the drama with the day:
        <br />
        Time’s noblest offspring is the last.
      </Quote>
      <Plate
        src={IMG + 'westward-leutze.jpg'}
        w={2200}
        h={1319}
        caption={<>Emanuel Leutze, <em>Westward the Course of Empire Takes Its Way</em>, 1861. The mural hangs in the U.S. Capitol and takes its title from Berkeley’s line.</>}
      />
      <P>
        Cole’s fifth canvas is a ruin under the moon. Berkeley’s fifth act is the best of the five. The two men were
        looking at the same country and the same sequence, and they disagreed only about how it ends. That has not been
        decided yet. It will be decided by what the next generation is given to do, and by whether anyone shows them
        that it can be done.
      </P>

      <Reading reading={READING} sources={SOURCES} />
    </EssayShell>
  )
}
