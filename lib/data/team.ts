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
  { name: 'Landen Enns', title: 'Head of Growth', linkedin: 'https://www.linkedin.com/in/landenenns/' },
  { name: 'Trent Sikute', title: 'Venture Lead' },
  { name: 'Mary Brownlee', title: 'Venture Lead', linkedin: 'https://www.linkedin.com/in/mary-brownlee-033b08208/' },
  { name: 'Tommy Denn', title: 'Venture Lead' },
  { name: 'Allie Vaughan', title: 'Venture Lead' },
]

export const FELLOWS: Person[] = [
  { name: 'Cole Elzerman', title: 'Student Fellow' },
  {
    name: 'Yakira Cardoso',
    title: 'Student Fellow',
    photo: '/team/yakira-cardoso.jpg',
    photoPosition: 'center 20%',
    linkedin: 'https://www.linkedin.com/in/yakira-cardoso-334047381/',
  },
  {
    name: 'Noah Nugent',
    title: 'Student Fellow',
    photo: '/team/noah-nugent.jpg',
    photoPosition: 'center 8%',
    linkedin: 'https://www.linkedin.com/in/noah-nugent-131119291/',
  },
  { name: 'Morgan Elder', title: 'Student Fellow' },
  { name: 'Jack Swanston', title: 'Student Fellow' },
  { name: 'Mackenzie Kendall', title: 'Student Fellow' },
  { name: 'Braden Peays', title: 'Student Fellow' },
  { name: 'Michael Peays', title: 'Student Fellow' },
  { name: 'Katie Salmon', title: 'Student Fellow' },
  { name: 'Connor Dore', title: 'Student Fellow' },
  { name: 'Campbell Hairston', title: 'Student Fellow' },
  { name: 'Jonah Elliot', title: 'Student Fellow' },
  { name: 'Lillia Caldroney', title: 'Student Fellow' },
  { name: 'Broderick Cotter', title: 'Student Fellow' },
  { name: 'Luke Rapaka', title: 'Student Fellow' },
  { name: 'Maebry Magilkey', title: 'Student Fellow' },
  { name: 'Jack Malouff', title: 'Student Fellow' },
  { name: 'Merci Wymore', title: 'Student Fellow' },
  { name: 'Cooper Rich', title: 'Student Fellow' },
  { name: 'Brynn Elzerman', title: 'Student Fellow' },
  { name: 'Austin-David Whitaker', title: 'Student Fellow' },
]

export const BOARD: Person[] = [
  { name: 'Ben Peays', title: 'Board Chair' },
  {
    name: 'Connor Champion',
    title: 'Board Member',
    photo: '/team/connor-champion.jpeg',
    photoPosition: 'center 15%',
    linkedin: 'https://www.linkedin.com/in/connor-champion-563756212/',
  },
  { name: 'John Manning', title: 'Board Member' },
  { name: 'Ryan Wuerch', title: 'Board Member' },
  { name: 'Justin Forman', title: 'Board Member', linkedin: 'https://www.linkedin.com/in/jforman/' },
  { name: 'Mark McClain', title: 'Board Member' },
]

/** Advisors: name and LinkedIn only, alphabetical by last name. */
export const ADVISORS: Pick<Person, 'name' | 'linkedin'>[] = [
  { name: 'Chris Allen' },
  { name: 'Kurian Babykutty' },
  { name: 'Tom Baldwin', linkedin: 'https://www.linkedin.com/in/tombbaldwin/' },
  { name: 'Marshall Bex' },
  { name: 'Steele Billings' },
  { name: 'Connor Carew' },
  { name: 'Josh Chodniewicz' },
  { name: 'Chris Coggin' },
  { name: 'Nick Daniel' },
  { name: 'Clay Davis' },
  { name: 'Grant Demeter', linkedin: 'https://www.linkedin.com/in/grant-demeter/' },
  { name: 'Michael Denton' },
  { name: 'Tanner Dobbs', linkedin: 'https://www.linkedin.com/in/tanner-dobbs-1129149a/' },
  { name: 'Matt Doyle' },
  { name: 'Scott Elequin' },
  { name: 'Ben Elmore', linkedin: 'https://www.linkedin.com/in/benjaminelmore/' },
  { name: 'Patrick Farrell' },
  { name: 'Andrew Feng' },
  { name: 'David Friedman' },
  { name: 'Max Gangestad' },
  { name: 'Kay Hiramine', linkedin: 'https://www.linkedin.com/in/kayhiramine/' },
  { name: 'Matt Hostetler', linkedin: 'https://www.linkedin.com/in/mhostetler-m3a/' },
  { name: 'Matt Johnson' },
  { name: 'Dane Kenney' },
  { name: 'John Kronlokken' },
  { name: 'Alec Lewis', linkedin: 'https://www.linkedin.com/in/aleclewis177/' },
  { name: 'Ali Llewellyn', linkedin: 'https://www.linkedin.com/in/adllewellyn/' },
  { name: 'Tevin Lucas' },
  { name: 'Michael Lukaszewski', linkedin: 'https://www.linkedin.com/in/michael-lukaszewski/' },
  { name: 'Chase Maasdorp', linkedin: 'https://www.linkedin.com/in/chase-maasdorp-a84807188/' },
  { name: 'Jason Malec', linkedin: 'https://www.linkedin.com/in/jasonmalec/' },
  { name: 'Travis Manderfield' },
  { name: 'Mike Meiser', linkedin: 'https://www.linkedin.com/in/michaelmeiser/' },
  { name: 'Tim Metzner' },
  { name: 'Preston Morter' },
  { name: 'Bogdan Negru' },
  { name: 'Rob Neville' },
  { name: 'Steve Neylon', linkedin: 'https://www.linkedin.com/in/steve-neylon-pe-67a13491/' },
  { name: 'William Norvell', linkedin: 'https://www.linkedin.com/in/wnorvell/' },
  { name: 'Bryce Oldham' },
  { name: 'Melissa Peak', linkedin: 'https://www.linkedin.com/in/melissajpeak/' },
  { name: 'Hudson Phillips' },
  { name: 'Sean Riley' },
  { name: 'Dana Roefer' },
  { name: 'Anthony Ruffner' },
  { name: 'Tristan Schaffer' },
  { name: 'Will Severns', linkedin: 'https://www.linkedin.com/in/will-severns-59a97268/' },
  { name: 'Nick Skytland', linkedin: 'https://www.linkedin.com/in/skytland/' },
  { name: 'Nick Spiller', linkedin: 'https://www.linkedin.com/in/nickspiller/' },
  { name: 'Debi Tengler' },
  { name: 'Eric Theisen' },
  { name: 'Ranjy Thomas' },
  { name: 'Zac Tinney' },
  { name: 'Heather Trumpfheller', linkedin: 'https://www.linkedin.com/in/heathertrumpfheller/' },
  { name: 'Drew Williams', linkedin: 'https://www.linkedin.com/in/drewwilliams11/' },
  { name: 'Douglas Williamson' },
  { name: 'Brian Woods' },
]
