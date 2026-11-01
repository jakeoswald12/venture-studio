import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Frame } from '@/components/site/Frame'
import { Label, Rule } from '@/components/site/Section'

/**
 * /thesis/course-of-empire — an essay on Thomas Cole's The Course of Empire,
 * the poems behind it, and why West Ventures exists. Linked from the Context
 * section of /thesis.
 */

const TITLE = 'The Course of Empire'
const DESCRIPTION =
  'Thomas Cole painted the life of a civilization in five pictures. An essay on the paintings, the poems behind them, and what they ask of the next generation.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/thesis/course-of-empire' },
  openGraph: { url: '/thesis/course-of-empire', title: TITLE, description: DESCRIPTION, type: 'article', images: ['/thesis/course-of-empire/3-consummation.jpg'] },
}

const IMG = '/thesis/course-of-empire/'

const PAINTINGS = [
  {
    file: '1-savage-state.jpg',
    title: 'The Savage State',
    w: 2048,
    h: 1273,
    text: 'Dawn over a wild coast. Hunters in skins chase a deer through the storm-cleared forest. There is courage here, and freedom, but no settled life.',
  },
  {
    file: '2-pastoral-state.jpg',
    title: 'The Arcadian or Pastoral State',
    w: 2048,
    h: 1276,
    text: 'Morning. The land is cleared and farmed, a temple stands on the hill, a shepherd keeps his flock and an old man draws figures in the dirt. A people has formed: hardworking, devout and free.',
  },
  {
    file: '3-consummation.jpg',
    title: 'The Consummation of Empire',
    w: 2048,
    h: 1388,
    text: 'Noon. The same bay is now lined with marble. A conqueror is carried through the city in triumph, the harbor is crowded with ships, and every surface is gilded. It is the height of glory, and the painting is already too full.',
  },
  {
    file: '4-destruction.jpg',
    title: 'Destruction',
    w: 2048,
    h: 1271,
    text: 'Afternoon storm. Invaders sack the city, the bridge collapses and a headless statue strides forward through the smoke. The wealth of the third painting could not defend itself.',
  },
  {
    file: '5-desolation.jpg',
    title: 'Desolation',
    w: 2048,
    h: 1274,
    text: 'Evening. The moon rises over ruins. A single column stands, and a heron nests on top of it. Nature has taken the site back. No people remain.',
  },
]

const READING = [
  { author: 'George Berkeley', work: 'Verses on the Prospect of Planting Arts and Learning in America', year: '1752' },
  { author: 'Lord Byron', work: 'Childe Harold’s Pilgrimage, Canto IV', year: '1818' },
  { author: 'Alexis de Tocqueville', work: 'Democracy in America', year: '1835–40' },
  { author: 'Abraham Lincoln', work: 'Address to the Young Men’s Lyceum of Springfield', year: '1838' },
  { author: 'C. S. Lewis', work: 'The Abolition of Man', year: '1943' },
  { author: 'Sir John Glubb', work: 'The Fate of Empires and Search for Survival', year: '1976' },
  { author: 'Os Guinness', work: 'A Free People’s Suicide', year: '2012' },
  { author: 'Tom Holland', work: 'Dominion: How the Christian Revolution Remade the World', year: '2019' },
]

const SOURCES = [
  { title: 'The Course of Empire (paintings)', href: 'https://en.wikipedia.org/wiki/The_Course_of_Empire_(paintings)', site: 'Wikipedia' },
  { title: 'The Course of Empire series', href: 'https://explorethomascole.org/project/course-of-empire-series-page/', site: 'Thomas Cole National Historic Site' },
  { title: 'Jefferson’s “empire for liberty”', href: 'https://www.monticello.org/site/jefferson/empire-liberty-quotation', site: 'Monticello' },
  { title: 'Freedom requires virtue, which requires faith: the golden triangle of freedom', href: 'https://assets.christianpost.com/news/freedom-requires-virtue-which-requires-faith-the-golden-triangle-of-freedom.html', site: 'The Christian Post' },
  { title: 'Review of Os Guinness, A Free People’s Suicide', href: 'https://firstthings.com/os-guinness-a-free-peoples-suicide/', site: 'First Things' },
]

/* ─── Pieces ──────────────────────────────────────────────────────────────── */

function P({ children }: { children: React.ReactNode }) {
  return (
    <p data-reveal-item className="text-[1.12rem] leading-[1.78] text-ink/85">
      {children}
    </p>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 data-reveal-item className="mt-10 text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.08]">
      {children}
    </h2>
  )
}

function Quote({ children, cite }: { children: React.ReactNode; cite: string }) {
  return (
    <figure data-reveal-item className="my-4 border-l-2 border-[var(--g4)] pl-6 sm:pl-8">
      <blockquote className="font-serif text-[clamp(1.25rem,2.2vw,1.55rem)] leading-[1.45] text-ink">{children}</blockquote>
      <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">{cite}</figcaption>
    </figure>
  )
}

function Plate({ file, w, h, caption, priority }: { file: string; w: number; h: number; caption: React.ReactNode; priority?: boolean }) {
  return (
    <figure data-reveal-item className="my-6 sm:-mx-[6vw] lg:-mx-[12vw]">
      <div className="overflow-hidden rounded-[10px] bg-panel">
        <Image src={IMG + file} alt="" width={w} height={h} sizes="(min-width:1024px) 1100px, 100vw" className="h-auto w-full" priority={priority} />
      </div>
      <figcaption className="mt-3 text-[0.88rem] leading-[1.5] text-grey">{caption}</figcaption>
    </figure>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function CourseOfEmpirePage() {
  return (
    <main>
      <Frame className="pt-[calc(108px+env(safe-area-inset-top))] sm:pt-[132px]">
        <article className="mx-auto max-w-[720px]">
          <Link href="/thesis#context" className="arrow-nudge font-mono text-[0.7rem] uppercase tracking-[0.16em] text-grey hover:text-ink">
            <span className="arrow inline-block rotate-180">→</span> Thesis
          </Link>
          <h1 data-reveal-item className="mt-8 text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.98]">
            The Course of Empire
          </h1>
          <p data-reveal-item style={{ '--d': 1 } as React.CSSProperties} className="mt-6 text-[clamp(1.15rem,1.8vw,1.35rem)] leading-[1.55] text-ink/80">
            In the 1830s Thomas Cole painted the life of a civilization in five pictures. His American audience admired the
            warning and assumed it was meant for someone else. It was meant for them, and for us.
          </p>
          <p data-reveal-item style={{ '--d': 2 } as React.CSSProperties} className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
            West Ventures · November 2026
          </p>

          <Plate
            file="3-consummation.jpg"
            w={2048}
            h={1388}
            priority
            caption={<>Thomas Cole, <em>The Consummation of Empire</em>, 1835–36. New-York Historical Society.</>}
          />

          <div className="flex flex-col gap-6">
            <P>
              Between 1833 and 1836, Thomas Cole, the founder of the Hudson River School, painted five canvases for his
              patron Luman Reed. Together they are called <em>The Course of Empire</em>. They show the same bay, under the
              same distinctive rock, across the whole life of a people: from wilderness, to farming, to imperial splendor,
              to destruction, to ruin. The sun moves across the sky from dawn to moonrise as the series goes on. One day
              stands for a civilization’s entire history.
            </P>
            <P>
              The paintings now hang at the New-York Historical Society. They are worth looking at slowly, in order.
            </P>
          </div>

          <H2>Five paintings</H2>
          {PAINTINGS.map((p, i) => (
            <div key={p.file}>
              <Plate
                file={p.file}
                w={p.w}
                h={p.h}
                caption={
                  <>
                    {i + 1}. <em>{p.title}</em>
                  </>
                }
              />
              <P>{p.text}</P>
            </div>
          ))}

          <div className="mt-6 flex flex-col gap-6">
            <H2>Two poems</H2>
            <P>
              Cole’s title echoes a line every educated American of his day knew. In the 1720s the Anglo-Irish bishop and
              philosopher George Berkeley wrote a poem about planting learning in the New World. It ends with a prophecy:
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
            <P>
              Berkeley saw history as a drama in five acts, with the last and best act to be played in America. It was the
              optimism of a young country, and it lasted. In 1861 Emanuel Leutze painted a vast mural for the U.S. Capitol and
              took its title from Berkeley’s line: pioneers cresting the mountains, a scout pointing to the Pacific, a
              mother holding her child toward the light.
            </P>
          </div>

          <Plate
            file="westward-leutze.jpg"
            w={2200}
            h={1319}
            caption={<>Emanuel Leutze, <em>Westward the Course of Empire Takes Its Way</em>, 1861. The mural hangs in the U.S. Capitol.</>}
          />

          <div className="flex flex-col gap-6">
            <P>
              Cole had read a different poet. When he advertised the series in New York newspapers, he printed lines from
              Lord Byron’s <em>Childe Harold’s Pilgrimage</em>, written among the ruins of Rome:
            </P>
            <Quote cite="Lord Byron, Childe Harold’s Pilgrimage, Canto IV">
              There is the moral of all human tales;
              <br />
              ’Tis but the same rehearsal of the past,
              <br />
              First Freedom, and then Glory — when that fails,
              <br />
              Wealth, vice, corruption, — barbarism at last.
            </Quote>
            <P>
              The two poems are the two halves of the American mind. Berkeley offers a destiny. Byron offers a sequence, and
              the sequence does not stop at glory. Cole painted both: the confident westward course, and the five acts it
              would play out if a people forgot what made it free.
            </P>
            <P>
              Many of Cole’s contemporaries read the series as a warning about other nations, or about their political
              opponents. Some answered that America would never share the fate of Rome. Cole believed
              the danger was closer to home.
            </P>

            <H2>Where we are</H2>
            <P>
              Read Byron’s line as a diagnosis. America won its freedom in the founding generation. It won glory in the
              century and a half that followed: a continent settled, two world wars won, a man on the moon. Then came
              wealth, on a scale no people has ever known. The question Cole asks is what comes after wealth.
            </P>
            <P>
              Our answer is that America and much of the West have passed through wealth and into vice and corruption.
              Comfort has become the goal rather than the reward. Extravagance is admired, vanity is a business model, and
              the institutions meant to form character have often stopped trying. The fourth panel has not arrived. But the
              third painting is crowded, and its people are no longer looking at anything beyond themselves.
            </P>
            <P>
              Others have traced the same arc. In 1976 the British general Sir John Glubb studied eleven empires across three
              thousand years in <em>The Fate of Empires</em>. He found they lasted about 250 years, roughly ten generations,
              and passed through the same stages: pioneers, conquest, commerce, affluence, intellect and decadence. Glubb’s
              point was that decline comes from within. Prosperity changes what a people wants.
            </P>
            <P>Abraham Lincoln said the same thing as a young man of 28, speaking to the Young Men’s Lyceum in Springfield:</P>
            <Quote cite="Abraham Lincoln, Lyceum Address, 1838">
              If destruction be our lot, we must ourselves be its author and finisher. As a nation of freemen, we must live
              through all time, or die by suicide.
            </Quote>
            <P>
              The cycle is a warning, not a law. Cole painted what happens when a people forgets. Nothing in the paintings
              says it cannot remember.
            </P>

            <H2>On the word empire</H2>
            <P>
              The word carries a bad reputation. History books and Hollywood have taught us to picture an emperor, a
              capital that takes from everyone else, and legions that enforce it. That is empire as the centralization of
              power, and it is exactly what Cole’s third painting shows: one man carried in triumph through a city built for
              his glory.
            </P>
            <P>
              The American founders used the word differently. Thomas Jefferson hoped the country would become “an empire
              for liberty” (letter to James Madison, 1809). The American idea of a great nation was the opposite of the
              Roman one: not power gathered into one place, but power divided so that no one could gather it. James Madison
              called the accumulation of all powers in the same hands “the very definition of tyranny” (Federalist 47), and
              designed a system in which “ambition must be made to counteract ambition” (Federalist 51). Federalism, the
              separation of powers, private property, free markets and a free press all do the same work: they distribute
              power, so that there is less of it in any one place to corrupt.
            </P>
            <P>
              That is why the West, for all its failures, remains the world’s best hope for liberty. Most of humanity has
              lived, and much of it still lives, under rulers who answer to no one. The idea that a ruler is under the law,
              that every person has rights no government granted, and that power should be divided and checked spread from
              the West, and it is defended almost nowhere else. Lincoln called the Union “the last best hope of earth.” If
              the West loses its nerve, there is no one waiting to carry these ideas forward.
            </P>

            <H2>Freedom needs a moral people</H2>
            <P>
              Distributed power has a cost. A system that relies on people governing themselves only works if the people
              can govern themselves. The founders said so plainly.
            </P>
            <Quote cite="John Adams, to the officers of the Massachusetts militia, 1798">
              Our Constitution was made only for a moral and religious People. It is wholly inadequate to the government of
              any other.
            </Quote>
            <Quote cite="George Washington, Farewell Address, 1796">
              Of all the dispositions and habits which lead to political prosperity, Religion and morality are indispensable
              supports.
            </Quote>
            <Quote cite="Benjamin Franklin, to the Abbés Chalut and Arnoux, 1787">
              Only a virtuous people are capable of freedom. As nations become corrupt and vicious, they have more need of
              masters.
            </Quote>
            <P>
              Alexis de Tocqueville, visiting in the 1830s while Cole was painting, reached the same conclusion from
              outside: “Despotism may govern without faith, but liberty cannot.” In our own time Os Guinness has called this
              the golden triangle of freedom. Freedom requires virtue. Virtue requires faith. Faith requires freedom. Remove
              one side and the others fall.
            </P>
            <P>
              The faith in question was not generic. The historian Tom Holland, in <em>Dominion</em>, argues that the
              West’s deepest convictions, that every person has dignity, that the weak deserve protection, that the powerful
              are accountable, came out of Christianity, and that the modern West still lives on that inheritance even
              where it no longer believes it. C. S. Lewis warned eighty years ago what happens when that inheritance is not
              taught: “We make men without chests and expect of them virtue and enterprise.”
            </P>
            <P>
              A free country divides power among its people. It has to trust them with it. That trust is only safe if the
              people are honest, self-governing and humble before God. A Christian people, in the founders’ sense, is not a
              decoration on the American system. It is a load-bearing wall.
            </P>

            <H2>The young are the answer</H2>
            <P>
              The founding of the United States is usually pictured as the work of old men in wigs. Many of them were
              young. In 1776 Thomas Jefferson was 33. James Madison was 25. Alexander Hamilton was about 21. James Monroe was
              18 and was wounded at Trenton that winter. The Marquis de Lafayette was a major general in the Continental
              Army at 19. A decade later, Madison and Hamilton, both in their thirties, wrote most of the Federalist Papers.
            </P>
            <P>
              Every renewal in the West’s history has been carried by people young enough not to know it was impossible.
              Ronald Reagan put the stakes simply: freedom is never more than one generation away from extinction. It has to
              be handed on and fought for by each generation in turn.
            </P>
            <P>
              We think the moment is right. A generation that grew up inside the third painting can see its emptiness more
              clearly than anyone. Many young people are tired of comfort as a goal and are looking for something worth
              their lives: real work, real responsibility, and an inheritance to defend. That hunger is an opening, and it
              will not last forever.
            </P>

            <H2>What we are doing about it</H2>
            <P>
              West Ventures exists to find the young people who could lead the next generation into a new era, and to
              equip them. We look for them early, in high schools and colleges across the country. We put them to work for
              proven founders and operators on real problems, because character and craft are formed by real work. We hold
              them to standards of glory, honor, truth and sacrifice, and away from the pursuit of comfort, extravagance and
              vanity. And we build companies with them.
            </P>
            <P>
              Berkeley believed the last act would be the noblest. Byron believed every act ends in ruin. Cole’s answer, and
              ours, is that it depends on the people. The course of empire is not fixed. It is chosen, one generation at a
              time.
            </P>

            <H2>Objections</H2>
            <P>
              <strong className="text-ink">“Empire means conquest.”</strong> Often it has. We use the word for a civilization
              that orders a large part of the world, and we argue that the Western version is worth defending precisely
              because it divides power instead of concentrating it. Where the West has conquered and exploited, it has
              betrayed its own principles, and those principles are what condemned it.
            </P>
            <P>
              <strong className="text-ink">“Cyclical history is fatalism.”</strong> Glubb and Cole describe a pattern, not a
              law. Patterns describe what happens when no one intervenes. The purpose of naming one is to interrupt it.
            </P>
            <P>
              <strong className="text-ink">“Faith belongs in private life.”</strong> The founders kept the church and the state
              separate institutions. They did not believe a free society could survive without religion and morality in its
              people, and they said so. We agree with them.
            </P>
          </div>

          <Rule className="mt-16" />
          <div className="grid gap-10 py-12 sm:grid-cols-2">
            <div>
              <Label className="mb-4">Further reading</Label>
              <ul className="flex flex-col gap-3 text-[0.95rem]">
                {READING.map((r) => (
                  <li key={r.work}>
                    <span className="text-ink">{r.author}</span>, <em>{r.work}</em> ({r.year})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label className="mb-4">Sources</Label>
              <ul className="flex flex-col gap-3 text-[0.95rem]">
                {SOURCES.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line text-ink">
                      {s.title}
                    </a>
                    , {s.site}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/thesis" className="arrow-nudge link-line text-[1rem] text-ink">
            Read the West Ventures thesis <span className="arrow">→</span>
          </Link>
        </article>
      </Frame>
    </main>
  )
}
