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
    name: 'Jake Jadlot',
    title: 'Head of Operations',
    bio: 'Works for Celebration Church. He previously worked at the University of Notre Dame’s accelerator and holds an MBA.',
  },
  { name: 'Nate Steele', title: 'Head of Design' },
  { name: 'Ethan Woo', title: 'Head of Product' },
  { name: 'Landen Enns', title: 'Head of Growth' },
  { name: 'Trent Sikute', title: 'Venture Lead' },
  { name: 'Mary Brownlee', title: 'Venture Lead' },
  { name: 'Tommy Denn', title: 'Venture Lead' },
  { name: 'Allie Vaughan', title: 'Venture Lead' },
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
]

export const FELLOWS: Person[] = [
  { name: 'Cole Elzerman', title: 'Student Fellow' },
  { name: 'Morgan Elder', title: 'Student Fellow' },
  {
    name: 'Noah Nugent',
    title: 'Student Fellow',
    photo: '/team/noah-nugent.jpg',
    photoPosition: 'center 8%',
    linkedin: 'https://www.linkedin.com/in/noah-nugent-131119291/',
  },
  { name: 'Jack Swanston', title: 'Student Fellow' },
  { name: 'Braden Peays', title: 'Student Fellow' },
  { name: 'Michael Peays', title: 'Student Fellow' },
  { name: 'Connor Dore', title: 'Student Fellow' },
  { name: 'Jonah Elliot', title: 'Student Fellow' },
  { name: 'Broderick Cotter', title: 'Student Fellow' },
  { name: 'Mackenzie Kendall', title: 'Student Fellow' },
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
  { name: 'Max Gangestad', title: 'Board Member' },
  { name: 'Grant Demeter', title: 'Board Member', linkedin: 'https://www.linkedin.com/in/grant-demeter/' },
  { name: 'John Manning', title: 'Board Member' },
]

/** Advisors: name and LinkedIn only, alphabetical by last name. */
export const ADVISORS: Pick<Person, 'name' | 'linkedin'>[] = [
  { name: 'Chris Allen' },
  { name: 'Kurian Babykutty' },
  { name: 'Tom Baldwin' },
  { name: 'Marshall Bex' },
  { name: 'Josh Chodniewicz' },
  { name: 'Chris Coggin' },
  { name: 'Nick Daniel' },
  { name: 'Clay Davis' },
  { name: 'Michael Denton' },
  { name: 'Tanner Dobbs' },
  { name: 'Matt Doyle' },
  { name: 'Scott Elequin' },
  { name: 'Ben Elmore', linkedin: 'https://www.linkedin.com/in/benjaminelmore/' },
  { name: 'Justin Forman' },
  { name: 'David Friedman' },
  { name: 'Kay Hiramine' },
  { name: 'Matt Hostetler', linkedin: 'https://www.linkedin.com/in/mhostetler-m3a/' },
  { name: 'Matt Johnson' },
  { name: 'Dane Kenney' },
  { name: 'Alec Lewis' },
  { name: 'Ali Llewellyn', linkedin: 'https://www.linkedin.com/in/adllewellyn/' },
  { name: 'Tevin Lucas' },
  { name: 'Chase Maasdorp', linkedin: 'https://www.linkedin.com/in/chase-maasdorp-a84807188/' },
  { name: 'Jason Malec' },
  { name: 'Travis Manderfield' },
  { name: 'Mike Meiser' },
  { name: 'Tim Metzner' },
  { name: 'Preston Morter' },
  { name: 'Bogdan Negru' },
  { name: 'Rob Neville' },
  { name: 'Steve Neylon' },
  { name: 'William Norvell' },
  { name: 'Bryce Oldham' },
  { name: 'Melissa Peak', linkedin: 'https://www.linkedin.com/in/melissajpeak/' },
  { name: 'Dana Roefer' },
  { name: 'Tristan Schaffer' },
  { name: 'Will Severns' },
  { name: 'Nick Skytland', linkedin: 'https://www.linkedin.com/in/skytland/' },
  { name: 'Nick Spiller' },
  { name: 'Ranjy Thomas' },
  { name: 'Zac Tinney' },
  { name: 'Heather Trumpfheller', linkedin: 'https://www.linkedin.com/in/heathertrumpfheller/' },
  { name: 'Drew Williams', linkedin: 'https://www.linkedin.com/in/drewwilliams11/' },
  { name: 'Douglas Williamson' },
  { name: 'Brian Woods' },
  { name: 'Ryan Wuerch' },
]
