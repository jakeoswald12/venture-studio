import type { Metadata } from 'next'
import { EssayShell, H2, P, Plate, Quote, Reading } from '@/components/thesis/Essay'

/**
 * /thesis/sculptures-vs-fossils — there is no such thing as a business
 * idea, only an accurate diagnosis of a need that is about to be met. Linked
 * from the Opportunities section of /thesis.
 */

const TITLE = 'Sculptures vs Fossils'
const DESCRIPTION =
  'There is no such thing as a business idea. There is only an accurate diagnosis of a need that is about to be met. On sculptors, fossil hunters, and the kind of visionary worth following.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/thesis/sculptures-vs-fossils' },
  openGraph: { url: '/thesis/sculptures-vs-fossils', title: TITLE, description: DESCRIPTION, type: 'article', images: ['/thesis/art/peale-mastodon.jpg'] },
}

const READING = [
  { author: 'Paul Graham', work: 'How to Get Startup Ideas', year: '2012' },
  { author: 'Steve Blank', work: 'The Four Steps to the Epiphany', year: '2005' },
  { author: 'Clayton Christensen et al.', work: 'Competing Against Luck', year: '2016' },
  { author: 'Charlie Munger', work: 'The Psychology of Human Misjudgment', year: '1995' },
  { author: 'Gino Wickman and Mark C. Winters', work: 'Rocket Fuel', year: '2015' },
]

const SOURCES = [
  { title: 'How to Get Startup Ideas', href: 'http://www.paulgraham.com/ideas.html', site: 'Paul Graham' },
  { title: 'Charles Willson Peale’s Exhumation of the Mastodon', href: 'https://americanart.si.edu/node/61712', site: 'Smithsonian American Art Museum' },
  { title: 'Rocket Fuel', href: 'https://www.eosworldwide.com/rocket-fuel', site: 'EOS Worldwide' },
]

export default function SculpturesVsFossilsPage() {
  return (
    <EssayShell
      title={TITLE}
      dek="There is no such thing as a business idea. There is only an accurate diagnosis of a need that is about to be met, made by someone who knew where to dig."
    >
      <Plate
        src="/thesis/art/peale-mastodon.jpg"
        w={1108}
        h={910}
        priority
        caption={
          <>
            Charles Willson Peale, <em>The Exhumation of the Mastodon</em>, 1806–08. Maryland Center for History and
            Culture.
          </>
        }
      />

      <P>
        In 1801 the painter and naturalist Charles Willson Peale heard that farmers in New York’s Hudson Valley had found
        enormous bones in a marl pit. He went, bought the rights to dig, and built a giant wheel to drain the pit while
        his crew worked. They recovered most of a mastodon skeleton, which Peale assembled and displayed in Philadelphia.
        Years later he painted the dig, and put himself in it, holding up a drawing of a bone.
      </P>
      <P>
        Peale did not invent the mastodon. It had been lying in the ground for thousands of years. Farmers had already
        turned up pieces of it. What Peale brought was the knowledge to recognize what the pieces meant, and the
        conviction to dig where they pointed. That is a better picture of how good companies begin than anything in the
        mythology of the startup.
      </P>

      <H2>The sculptor and the fossil hunter</H2>
      <P>
        Most people imagine a founder as an artist. A sculptor stands before a block of marble and decides what to make.
        The figure exists only in his imagination until he carves it. On this view a business idea is a creative act: the
        more original the vision, the better.
      </P>
      <P>
        Good companies are rarely made that way. They are found. The need a great company meets already exists before
        anyone names it: customers already feel the pain, costs are already too high, a change in technology or law has
        already made a new answer possible. A founder does not create that need. He notices it, usually before others do,
        and digs.
      </P>
      <P>
        Any kid can stick a shovel in the dirt. The odds of hitting anything are small. An experienced paleontologist
        knows which formations are the right age, which hillsides are eroding, and where bones have turned up before.
        Often he has already found a fragment or two, and the fragment tells him a whole skeleton is probably nearby. He
        is not guessing. He is reading the ground.
      </P>

      <H2>Why an 18-year-old’s ideas are poor</H2>
      <P>
        This is why most business ideas from 18-year-olds are poor. It is not a lack of intelligence or imagination. It is
        a lack of information. They have not yet spent years inside an industry, so they do not know where its costs hide,
        which customers are underserved, or what is about to change.
      </P>
      <P>
        Ask someone who has built three or four companies and the picture reverses. They already know what their fourth
        and fifth would be, and they can tell you exactly where the opportunity is and why. They have found the
        fragments.
      </P>
      <P>
        The essayist and investor Paul Graham made the same point: the way to get startup ideas is not to try to think of
        startup ideas, but to look for problems. Problems are found by people close enough to see them.
      </P>

      <H2>A better ear than eye</H2>
      <P>
        If business is diagnosis, the most important instrument is not the eye but the ear. A good doctor listens before
        he prescribes. A good founder listens to customers, operators and suppliers until the shape of the problem is
        clear, and only then builds. Steve Blank, who taught a generation of founders to “get out of the building,” built
        a whole method on this: the answers are with customers, not in the founder’s head.
      </P>
      <P>
        Charlie Munger put the diagnostic principle in one line, usually quoted as:
      </P>
      <Quote cite="Attributed to Charlie Munger">Show me the incentive and I will show you the outcome.</Quote>
      <P>
        Understand what people are rewarded for, what they are punished for and what they are stuck with, and you can
        predict what they will do and what they will need. That is not imagination. It is careful observation of the
        present.
      </P>

      <H2>On visionaries</H2>
      <P>
        In the last two decades a popular operating system for small businesses, EOS, built on Gino Wickman’s{' '}
        <em>Traction</em> and later <em>Rocket Fuel</em>, gave many companies a useful vocabulary: a Visionary who sets
        direction and an Integrator who runs the business. For plenty of companies it has helped.
      </P>
      <P>
        It also gave a great many idea people a title, and with it permission to imagine the future and hand the work to
        someone else. The word “visionary” came to mean someone who has big ideas. Big ideas are cheap. Everyone has them,
        and most of them are wrong.
      </P>
      <P>
        Visionary is the right word only in a narrower sense: someone who sees patterns and trends so clearly that he can
        predict the future by diagnosing the present accurately. The great builders of the past were visionaries in that
        sense. They were rarely dreamers. They were close observers who had done the work long enough to see what others
        missed, and who then did the digging themselves.
      </P>

      <H2>How the studio uses this</H2>
      <P>
        West Ventures does not ask students to invent businesses. It puts them on digs with paleontologists: proven
        owners and operators who already know where the bones are. Every free project is a test hole. Sometimes the
        project turns up a fragment that tells the operator and the studio that something larger is buried nearby, and
        that is how a joint venture begins.
      </P>
      <P>
        One of the studio’s current ventures started this way. A national health club operator took on student teams
        for free projects. In the course of that work, its architecture and engineering leaders described an internal
        data problem that no existing product solved, with potential savings in the tens of millions of dollars a year.
        That was the fragment. The studio formed a company with the operator to build an AI tool for the problem, with
        the operator’s sponsorship and clearance to sell it to others. The operator is the first customer, students are
        doing the early build work, and launch is planned for early 2027. Nobody invented the problem. It had been there
        all along, and the people who had worked beside it for years knew where to dig.
      </P>
      <P>
        Students who spend their formative years beside people who read the ground learn to read it themselves. By the
        time they are thirty, they will have their own fragments, and they will know where to dig.
      </P>

      <Reading reading={READING} sources={SOURCES} />
    </EssayShell>
  )
}
