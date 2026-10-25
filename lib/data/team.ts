/**
 * The West Ventures team.
 *
 * Photos live in /public/team/. A person without `photo` shows their initials
 * until a headshot is added. A person without `linkedin` shows no LinkedIn
 * link. Bios are leadership only, three sentences at most.
 */

export interface Person {
  name: string
  title: string
  photo?: string
  /** CSS object-position for the photo, e.g. 'center 20%'. */
  photoPosition?: string
  linkedin?: string
  bio?: string
}

export const LEADERSHIP: Person[] = [
  {
    name: 'Jake Oswald',
    title: 'Managing Partner',
    photo: '/team/jake-oswald.png',
    photoPosition: 'center 20%',
    linkedin: 'https://www.linkedin.com/in/jake-oswald/',
    bio: 'Director of the Accelerator Program at Austin Christian University, where students earn course credit working on real companies with experienced founders. He also leads ACU’s enrollment, marketing and entrepreneurship work. He has spoken at Faith Driven Entrepreneur events.',
  },
  {
    name: 'Lars Ostervold',
    title: 'Managing Partner',
    photo: '/team/lars-ostervold.jpg',
    photoPosition: 'center 25%',
    linkedin: 'https://www.linkedin.com/in/larsostervold/',
    bio: 'Chief Technology Officer of Austin Christian University and a member of the accelerator’s leadership team. He is building launch.kids, the studio’s software building tool for students.',
  },
  {
    name: 'Jake Jadlot',
    title: 'Head of Operations',
    bio: 'Works for Celebration Church. He previously worked at the University of Notre Dame’s accelerator and holds an MBA.',
  },
  { name: 'Nate Steele', title: 'Head of Design' },
  { name: 'Ethan Woo', title: 'Head of Product' },
  { name: 'Landen Enns', title: 'Head of Growth' },
  { name: 'Trent Sikute', title: 'Venture Lead' },
  { name: 'Mary Brownlee', title: 'Venture Lead' },
  { name: 'Tommy Denn', title: 'Venture Associate' },
]

export const FELLOWS: Person[] = [
  { name: 'Cole Elzerman', title: 'Fellow' },
  { name: 'Morgan Elder', title: 'Fellow' },
  {
    name: 'Noah Nugent',
    title: 'Fellow',
    photo: '/team/noah-nugent.jpg',
    photoPosition: 'center 8%',
    linkedin: 'https://www.linkedin.com/in/noah-nugent-131119291/',
  },
  { name: 'Jack Swanston', title: 'Fellow' },
  { name: 'Braden Peays', title: 'Fellow' },
  { name: 'Michael Peays', title: 'Fellow' },
  { name: 'Connor Dore', title: 'Fellow' },
  { name: 'Jonah Elliot', title: 'Fellow' },
  { name: 'Broderick Cotter', title: 'Fellow' },
]

export const BOARD: Person[] = [
  { name: 'Ben Peays', title: 'Board Chair' },
  {
    name: 'Connor Champion',
    title: 'Board Member (ACU seat)',
    photo: '/team/connor-champion.jpeg',
    photoPosition: 'center 15%',
    linkedin: 'https://www.linkedin.com/in/connor-champion-563756212/',
  },
  { name: 'Travis Manderfield', title: 'Board Member' },
  { name: 'Max Gangestad', title: 'Board Member' },
  { name: 'Steve Neylon', title: 'Board Member' },
]

/** Advisors: name and LinkedIn only. */
export const ADVISORS: Pick<Person, 'name' | 'linkedin'>[] = [
  { name: 'John Manning' },
  { name: 'Matt Doyle' },
  { name: 'Nick Daniel' },
  { name: 'Grant Demeter', linkedin: 'https://www.linkedin.com/in/grant-demeter/' },
  { name: 'Preston Morter' },
  { name: 'Scott Elequin' },
  { name: 'Jason Malec' },
  { name: 'Tevin Lucas' },
  { name: 'Drew Williams', linkedin: 'https://www.linkedin.com/in/drewwilliams11/' },
  { name: 'Matt Johnson' },
  { name: 'Chris Allen' },
  { name: 'Kay Hiramine' },
  { name: 'Will Severns' },
  { name: 'Chase Maasdorp', linkedin: 'https://www.linkedin.com/in/chase-maasdorp-a84807188/' },
  { name: 'Alec Lewis' },
  { name: 'William Norvell' },
  { name: 'Tom Baldwin' },
  { name: 'Tristan Schaffer' },
  { name: 'Bogdan Negru' },
  { name: 'Zac Tinney' },
  { name: 'Tanner Dobbs' },
  { name: 'David Friedman' },
  { name: 'Chris Coggin' },
  { name: 'Matt Hostetler', linkedin: 'https://www.linkedin.com/in/mhostetler-m3a/' },
  { name: 'Bryce Oldham' },
  { name: 'Dane Kenney' },
  { name: 'Kurian Babykutty' },
  { name: 'Clay Davis' },
  { name: 'Rob Neville' },
  { name: 'Josh Chodniewicz' },
  { name: 'Tim Metzner' },
  { name: 'Heather Trumpfheller', linkedin: 'https://www.linkedin.com/in/heathertrumpfheller/' },
  { name: 'Michael Denton' },
  { name: 'Nick Skytland', linkedin: 'https://www.linkedin.com/in/skytland/' },
  { name: 'Ali Llewellyn', linkedin: 'https://www.linkedin.com/in/adllewellyn/' },
  { name: 'Mike Meiser' },
  { name: 'Marshall Bex' },
  { name: 'Ranjy Thomas' },
  { name: 'Ben Elmore', linkedin: 'https://www.linkedin.com/in/benjaminelmore/' },
  { name: 'Melissa Peak', linkedin: 'https://www.linkedin.com/in/melissajpeak/' },
  { name: 'Brian Woods' },
]
