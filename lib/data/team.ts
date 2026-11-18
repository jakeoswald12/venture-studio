/**
 * The West Ventures team.
 *
 * Photos live in /public/team/. A person without `photo` shows their initials
 * until a headshot is added. A person without `linkedin` shows no LinkedIn
 * link. Bios are leadership only, three sentences at most.
 *
 * A person with `roles` or `past` gets the expanding card on the team page:
 * hovering (or tapping) the tile opens it over the grid and shows what they do
 * outside West Ventures. `summary` is one plain sentence. Each role can carry
 * the organization's website (`url`) and one short fact (`note`).
 */

export interface Role {
  title: string
  org: string
  /** The organization's own website. Shown as an outbound link. */
  url?: string
  /** One short fact that puts the role in perspective. */
  note?: string
}

export interface Person {
  name: string
  title: string
  photo?: string
  /** CSS object-position for the photo, e.g. 'center 20%'. */
  photoPosition?: string
  linkedin?: string
  bio?: string
  /** One sentence on who they are. Shown on the expanded card. */
  summary?: string
  /** What they do now, outside West Ventures. */
  roles?: Role[]
  /** Earlier roles worth showing. */
  past?: Role[]
}

export const LEADERSHIP: Person[] = [
  {
    name: 'Lars Ostervold',
    title: 'Managing Partner',
    photo: '/team/lars-ostervold.jpg',
    photoPosition: 'center 25%',
    linkedin: 'https://www.linkedin.com/in/larsostervold/',
    summary:
      'Chemical engineering Ph.D. and former Dow research scientist who now leads technology at Austin Christian University and founded Launch.',
    past: [
      { title: 'Chief Technology Officer', org: 'Austin Christian University' },
      {
        title: 'Founder',
        org: 'Launch',
        url: 'https://launch.kids',
        note: 'Kids 5 and up build real games and apps by describing them',
      },
      {
        title: 'Research Scientist',
        org: 'Dow',
        url: 'https://www.dow.com',
        note: 'Built a chemical ideation app projected at $40M in net present value',
      },
      { title: 'Ph.D. Researcher, Catalysis', org: 'Penn State University' },
    ],
  },
  {
    name: 'Jake Oswald',
    title: 'Managing Partner',
    photo: '/team/jake-oswald.png',
    photoPosition: 'center 20%',
    linkedin: 'https://www.linkedin.com/in/jake-oswald/',
    summary:
      "Built Austin Christian University's accelerator after leading partnerships and data at Servant and marketing for real estate and building companies.",
    past: [
      {
        title: 'Director of Entrepreneurship',
        org: 'Austin Christian University',
        note: 'Runs an accelerator with 50+ Christian-led startups and companies',
      },
      { title: 'Director of Partnerships', org: 'Servant', url: 'https://servant.io' },
      { title: 'Marketing Intelligence Manager', org: 'Great Lakes Management', url: 'https://www.greatlakesmc.com' },
      { title: 'Marketing Director', org: 'Pritchard Companies', note: 'Pitch decks that raised $10M+' },
    ],
  },
  {
    name: 'Marshall Cunningham',
    title: 'Head of Operations',
    photo: '/team/marshall-cunningham.jpg',
    linkedin: 'https://www.linkedin.com/in/marshallcunningham/',
    summary:
      'People and operations leader who has run operations for a venture firm, a charitable foundation office and a global entrepreneur network.',
    past: [
      {
        title: 'VP of People & Culture',
        org: 'Faith Driven Entrepreneur',
        url: 'https://www.faithdrivenentrepreneur.org/',
      },
      { title: 'Vice President, Head of Platform', org: 'TXV Partners', note: 'Austin private investment firm' },
      { title: 'Director of Operations and Engagement', org: 'National Christian Foundation, Austin' },
    ],
  },
  {
    name: 'Tanner Dobbs',
    title: 'Head of Growth',
    photo: '/team/tanner-dobbs.jpg',
    linkedin: 'https://www.linkedin.com/in/tanner-dobbs-1129149a/',
    summary:
      'Go-to-market leader who started at Bain & Company and spent six years building sales and strategy at Take Command.',
    past: [
      { title: 'Head of Growth (Fractional)', org: 'AcquireROI', url: 'https://acquireroi.com' },
      {
        title: 'VP of Strategy and Business Development',
        org: 'Take Command',
        url: 'https://www.takecommandhealth.com',
        note: 'Health benefits platform; $25M Series B in 2023',
      },
      { title: 'Interim Executive Director', org: 'Redemptive Labs Austin', note: 'Part of the Praxis network' },
      { title: 'Consultant', org: 'Bain & Company', url: 'https://www.bain.com' },
    ],
  },
  {
    name: 'Nate Steele',
    title: 'Head of Design',
    photo: '/team/nate-steele.jpg',
    linkedin: 'https://www.linkedin.com/in/n8-steele/',
    summary:
      'Denver creative director working across brand identity, web, photography and video, with clients including On, Compassion International and RE/MAX.',
    past: [{ title: 'Creative Director', org: 'Studio Finity', url: 'https://studio-finity.com/' },
      {
        title: 'Director of Media',
        org: 'Area 15 Ventures',
        url: 'https://www.area15ventures.com',
        note: 'Colorado private equity firm',
      },
      { title: 'Founder', org: 'Baxo AI', url: 'https://baxo.ai/', note: 'AI performance reviews' }],
  },
  {
    name: 'Taylore Hopkins',
    title: 'Head of Partnerships',
    photo: '/team/taylore-hopkins.jpg',
    linkedin: 'https://www.linkedin.com/in/taylore-hopkins-a91aa5245/',
    summary:
      'Builds college partnerships for the Classic Learning Test after working in admissions at Samford University, where she was a Division I soccer player.',
    past: [
      {
        title: 'Director of College Partnerships',
        org: 'Classic Learning Test',
        url: 'https://www.cltexam.com',
        note: 'College entrance exam rooted in the classical tradition',
      },
      { title: 'Campus Visit Coordinator and Admission Counselor', org: 'Samford University' },
      { title: 'Mentor Coordinator', org: 'Aspire Movement' },
    ],
  },
  {
    name: 'Landen Enns',
    title: 'Head of Investor Relations',
    photo: '/team/landen-enns.jpg',
    linkedin: 'https://www.linkedin.com/in/landenenns/',
    summary:
      'Investor with a background in venture capital and corporate M&A, now managing a fund for faith-driven investors.',
    past: [
      { title: 'Fund Manager', org: "Solving the World's Greatest Problems", url: 'https://solving.org' },
      {
        title: 'Co-Owner',
        org: 'TRIO Flatmount',
        url: 'https://www.trioflatmount.com/',
        note: 'Starlink mounts and accessories',
      },
      {
        title: 'Venture Capital Investor',
        org: 'VMG Partners',
        url: 'https://www.vmgpartners.com/',
        note: 'Consumer and technology investment firm',
      },
      { title: 'Analyst, M&A and Venture Capital', org: 'Cisco Investments' },
    ],
  },
]

/** Project Advisors: experienced people who lead and advise student project teams. */
export const PROJECT_ADVISORS: Person[] = [
  {
    name: 'Stevie Fahle',
    title: 'Project Advisor',
    photo: '/team/stevie-fahle.jpg',
    linkedin: 'https://www.linkedin.com/in/stevie-fahle/',
    summary:
      'Construction and acquisitions project manager who spent ten years leading multifamily and hotel renovations before moving into home services acquisitions.',
    roles: [
      {
        title: 'Acquisitions Project Manager',
        org: 'LaunchPad Home Group',
        url: 'https://launchpadhomegroup.com',
        note: 'Family of home inspection and home services brands',
      },
    ],
    past: [
      { title: 'Senior Project Manager', org: 'HighSide Project Management' },
      { title: 'Project Manager', org: 'Aimco Apartment Homes', note: 'Capital projects across the portfolio' },
    ],
  },
  {
    name: 'Ethan Woo',
    title: 'Project Advisor',
    photo: '/team/ethan-woo.jpg',
    linkedin: 'https://www.linkedin.com/in/ethan-woo/',
    summary:
      'Leads applied AI product development at Servant, where he built its AI agent platform and FaithBase, an AI platform for churches and ministries.',
    roles: [
      {
        title: 'Applied AI Lead',
        org: 'Servant',
        url: 'https://servant.io',
        note: 'Digital consultancy for faith-driven organizations',
      },
    ],
    past: [
      {
        title: 'Product Designer',
        org: 'Servant',
        note: 'Designed the Donate tab in The Chosen app and an FX platform for Pangea.io',
      },
    ],
  },
  {
    name: 'Trent Sikute',
    title: 'Project Advisor',
    photo: '/team/trent-sikute.jpg',
    linkedin: 'https://www.linkedin.com/in/trenton-sikute/',
    summary:
      'Data and assessment lead and former U.S. Air Force contracting officer who co-founded a Christian work exchange platform.',
    roles: [
      { title: 'Director of Assessment', org: 'Austin Christian University' },
      {
        title: 'Co-Founder',
        org: 'Cross Exchange',
        url: 'https://www.crossexchange.org',
        note: 'Christian work exchange platform',
      },
      { title: 'Data Analyst & PM', org: 'MindFul', url: 'https://www.mindfulstrategyco.com' },
    ],
    past: [
      {
        title: 'Contracting Officer',
        org: 'United States Air Force',
        note: 'Oversaw a $12M contract portfolio at Little Rock Air Force Base',
      },
    ],
  },
  {
    name: 'Jake Jadlot',
    title: 'Project Advisor',
    photo: '/team/jake-jadlot.jpg',
    linkedin: 'https://www.linkedin.com/in/jakejadlot/',
    summary:
      "Former Gartner consultant who led the startup coaches at Notre Dame's IDEA Center, overseeing more than 100 student-led ventures.",
    past: [
      { title: 'Senior Consultant', org: 'Gartner', url: 'https://www.gartner.com' },
      {
        title: 'Senior Startup Coach',
        org: 'The IDEA Center, University of Notre Dame',
        url: 'https://ideacenter.nd.edu/',
        note: 'Led 14 coaches across 100+ student ventures',
      },
    ],
  },
  {
    name: 'Mary Brownlee',
    title: 'Project Advisor',
    photo: '/team/mary-brownlee.jpg',
    linkedin: 'https://www.linkedin.com/in/mary-brownlee-033b08208/',
    summary:
      "Community and project manager at Solving the World's Greatest Problems, an initiative for faith-driven investors and entrepreneurs.",
    roles: [{ title: 'Community Manager', org: "Solving the World's Greatest Problems", url: 'https://solving.org' }],
    past: [
      { title: 'Project Manager', org: 'Belmont Innovation Labs' },
      { title: 'Senior Presidential Fellow', org: 'Belmont University' },
    ],
  },
  {
    name: 'Elijah Bervik',
    title: 'Project Advisor',
    photo: '/team/elijah-bervik.jpg',
    linkedin: 'https://www.linkedin.com/in/elijah-bervik-cfa-66281614a/',
    summary:
      'CFA charterholder who analyzes public and private credit for a multi-billion dollar insurance investment portfolio.',
    roles: [
      {
        title: 'Senior Investment Analyst',
        org: 'Federated Insurance',
        url: 'https://www.federatedinsurance.com/',
        note: 'National insurer founded in 1904',
      },
    ],
    past: [
      { title: 'Associate', org: 'Howden Re', url: 'https://www.howdenre.com', note: 'Reinsurance advisory and M&A' },
    ],
  },
  {
    name: 'Max Gangestad',
    title: 'Project Advisor',
    photo: '/team/max-gangestad.jpg',
    linkedin: 'https://www.linkedin.com/in/max-gangestad/',
    summary:
      'Co-founder and operator of an algae-based wastewater treatment company, where he started as its bioprocess engineer in 2015.',
    roles: [
      {
        title: 'COO & Co-Founder',
        org: 'Gross-Wen Technologies',
        url: 'https://algae.com/',
        note: 'Patented algae wastewater treatment; more than $22M raised',
      },
      {
        title: 'Board Member',
        org: 'Midland Co.',
        url: 'https://www.midlandseafood.com',
        note: 'Land-based seafood company',
      },
      { title: 'Board Member', org: 'Obria Medical Clinics of Iowa' },
    ],
  },
  {
    name: 'Travis Manderfield',
    title: 'Project Advisor',
    photo: '/team/travis-manderfield.jpg',
    linkedin: 'https://www.linkedin.com/in/travis-manderfield-b8b799a4/',
    summary:
      'Project manager with a supply chain background in medical devices and aerospace, and two years as an executive pastor.',
    roles: [
      {
        title: 'Project Manager, Territory Sales and Business Development',
        org: 'Safe Step',
        url: 'https://www.notrippin.com',
        note: 'Sidewalk evaluation and repair',
      },
    ],
    past: [
      { title: 'Executive Pastor', org: 'Redemption Church' },
      {
        title: 'Senior Project Management Specialist',
        org: 'Boston Scientific',
        url: 'https://www.bostonscientific.com',
      },
      { title: 'Supply Chain Sourcing Lead', org: 'Collins Aerospace', url: 'https://www.collinsaerospace.com' },
    ],
  },
  {
    name: 'Trey Achterhoff',
    title: 'Project Advisor',
    photo: '/team/trey-achterhoff.jpg',
    linkedin: 'https://www.linkedin.com/in/trey-achterhoff/',
    summary:
      'Mechanical engineer with nine years in medical devices, designing and testing catheters that treat cardiac arrhythmias.',
    roles: [
      {
        title: 'Senior R&D Engineer, Catheter Development',
        org: 'Boston Scientific',
        url: 'https://www.bostonscientific.com',
        note: 'Pulsed field ablation; named on multiple patent applications',
      },
    ],
  },
  {
    name: 'Nick Daniel',
    title: 'Project Advisor',
    photo: '/team/nick-daniel.jpg',
    linkedin: 'https://www.linkedin.com/in/nick-daniel-5a0689368/',
    summary:
      'Film director and founder who builds production teams for documentaries, brand campaigns and social content.',
    roles: [{ title: 'Founder & Director', org: 'Exodus Creative Co', url: 'https://exoduscreativeco.com' }],
    past: [
      { title: 'Director', org: 'Live Free Film Company' },
      { title: 'Chief Executive Officer', org: 'Live Free Clothing Company' },
    ],
  },
  {
    name: 'Anthony Ruffner',
    title: 'Project Advisor',
    photo: '/team/anthony-ruffner.jpg',
    linkedin: 'https://www.linkedin.com/in/anthony-ruffner-161786118/',
    summary:
      'Founder building software for apartment turnovers, drawing on a contracting business he co-owns and a career in software sales.',
    roles: [
      {
        title: 'Founder & CEO',
        org: 'TURN',
        url: 'https://turnapts.com',
        note: 'Make-ready coordination platform for multi-family real estate',
      },
      { title: 'Co-Owner', org: 'Saracini Contracting', note: 'Serves 40+ apartment communities in Greater St. Louis' },
    ],
    past: [
      { title: 'Account Executive, Mid Market and Enterprise', org: 'Dixa', url: 'https://www.dixa.com' },
      { title: 'Territory Account Executive', org: 'Toast', url: 'https://pos.toasttab.com' },
    ],
  },
  {
    name: 'Hyzer Taylor',
    title: 'Project Advisor',
    photo: '/team/hyzer-taylor.jpg',
    linkedin: 'https://www.linkedin.com/in/hyzer-taylor-79587569/',
    summary:
      'AI and go-to-market strategist who spent eight years leading regional markets for Trip.com in New York and Latin America.',
    roles: [
      {
        title: 'AI Growth Strategist',
        org: 'Servant',
        url: 'https://servant.io',
        note: 'Digital consultancy for faith-driven organizations',
      },
    ],
    past: [
      { title: 'Director, Latin America', org: 'Trip.com', url: 'https://www.trip.com' },
      { title: 'Regional Director, East Coast', org: 'Ctrip' },
    ],
  },
  {
    name: 'Alex Ammons',
    title: 'Project Advisor',
    photo: '/team/alex-ammons.jpg',
    linkedin: 'https://www.linkedin.com/in/alex-ammons-54bb872b/',
    summary:
      'Leads the engineers, analysts and solution architects behind the data and AI platform at Gloo, where he has worked for five years.',
    roles: [{ title: 'Director of Data & Analytics', org: 'Gloo', url: 'https://gloo.com' }],
  },
  {
    name: 'Tommy Denn',
    title: 'Project Advisor',
    photo: '/team/tommy-denn.jpg',
    linkedin: 'https://www.linkedin.com/in/tommy-denn-b91149187/',
    summary:
      'Leads AI, automation and data work at a Minnesota real estate firm, where he built the reporting and CRM systems used across its portfolio.',
    roles: [
      {
        title: 'Director, Innovation & Technology',
        org: 'Great Lakes Management',
        url: 'https://www.greatlakesmc.com',
        note: 'Manages more than $1 billion in real estate',
      },
    ],
  },
  {
    name: 'Allie Vaughan',
    title: 'Project Advisor',
    photo: '/team/allie-vaughan.jpg',
    linkedin: 'https://www.linkedin.com/in/allievaughan/',
    summary:
      'Creative producer and product leader in the outdoor industry, producing commercial media for brands including YETI, Yakima and Orvis.',
    roles: [{ title: 'Creative Producer', org: 'Independent', url: 'https://www.allietvaughan.com/' }],
    past: [
      {
        title: 'Director of Product Development',
        org: 'Alaska Gear Company',
        url: 'https://www.alaskagearcompany.com',
      },
      { title: 'Manager, Recommerce', org: 'REI', url: 'https://www.rei.com', note: 'Ran the trade-in program' },
      { title: 'Head of Product', org: 'Luno', url: 'https://lunolife.com/' },
    ],
  },
  {
    name: 'Sam LaCrosse',
    title: 'Project Advisor',
    photo: '/team/sam-lacrosse.jpg',
    linkedin: 'https://www.linkedin.com/in/realsamlax/',
    summary:
      'Sales leader and author of three books who led a team at Oracle before founding a coaching and publishing business.',
    roles: [{ title: 'Account Executive, Data and AI', org: 'IBM', url: 'https://www.ibm.com' }],
    past: [
      { title: 'Founder & CEO', org: 'Value Economics' },
      { title: 'Senior Commercial Cloud Account Executive, Team Lead', org: 'Oracle', url: 'https://www.oracle.com' },
    ],
  },
  {
    name: "Ryan O'Keefe",
    title: 'Project Advisor',
    photo: '/team/ryan-okeefe.jpg',
    linkedin: 'https://www.linkedin.com/in/ryanpatrickokeefe/',
    summary:
      'Enterprise software sales leader in Austin who co-founded the ATX Technology Prayer Breakfast.',
    roles: [
      {
        title: 'Account Executive, Majors',
        org: 'Serval',
        url: 'https://www.serval.com',
        note: 'AI platform for enterprise service management',
      },
    ],
    past: [
      { title: 'Go-to-Market, Austin and San Antonio', org: 'Cyera', url: 'https://www.cyera.com' },
      { title: 'Senior Account Executive, Enterprise', org: 'Docker', url: 'https://www.docker.com' },
      { title: 'Account Executive, Enterprise', org: 'Starburst', url: 'https://www.starburst.io' },
    ],
  },
  {
    name: 'Riley Simpson',
    title: 'Project Advisor',
    photo: '/team/riley-simpson.jpg',
    linkedin: 'https://www.linkedin.com/in/rileywsimpson/',
    summary:
      'Founder of LeapYear, a structured gap year for high school graduates, after serving as chief of staff at education venture fund Learn Capital and Austin leadership network Arena Hall.',
    roles: [
      {
        title: 'Founder',
        org: 'LeapYear',
        url: 'https://startleapyear.com',
        note: 'Nine-month gap year and leadership accelerator',
      },
      { title: 'Fellow, Austin Lab', org: 'Praxis', url: 'https://www.praxis.co' },
    ],
    past: [
      {
        title: 'Chief of Staff, Managing Partners and Investor Relations',
        org: 'Learn Capital',
        url: 'https://www.learncapital.com',
        note: 'Venture capital fund backing education companies',
      },
      { title: 'Chief of Staff', org: 'Arena Hall', note: 'Austin leadership network' },
      {
        title: "Entrepreneur-in-Residence, President's VC",
        org: 'Abilene Christian University',
        url: 'https://www.acu.edu',
      },
      { title: 'CEO', org: 'Right Hand Media', note: 'Started during his own gap year and sold to his university' },
    ],
  },
]

export const FELLOWS: Person[] = [
  { name: 'Braxton Hill', title: 'Student Fellow' },
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
  {
    name: 'Ben Peays',
    title: 'Board Chair',
    photo: '/team/ben-peays.jpg',
    photoPosition: 'center 20%',
    linkedin: 'https://www.linkedin.com/in/benpeays/',
    summary:
      'Has built and led businesses and Christian ministries for two decades and now leads a peer advisory community for Christian CEOs.',
    roles: [{ title: 'Chief Executive Officer', org: 'Convene', note: 'Peer advisory teams and coaching for Christian CEOs' }],
    past: [
      { title: 'Chief Operating Officer', org: '100 Fold', note: 'Helps high-net-worth families give at greater scale' },
      { title: 'Founder', org: 'BlackBox', note: 'AI-native technology firm' },
    ],
  },
  {
    name: 'Connor Champion',
    title: 'Board Member',
    photo: '/team/connor-champion.jpeg',
    photoPosition: 'center 15%',
    linkedin: 'https://www.linkedin.com/in/connor-champion-563756212/',
    summary: 'President of Austin Christian University, after leading Celebration Leadership Institute and coaching college football.',
    roles: [{ title: 'President', org: 'Austin Christian University' }],
    past: [
      { title: 'President', org: 'Celebration Leadership Institute' },
      { title: 'Offensive Assistant', org: 'Arizona State University' },
      { title: 'Offensive Assistant', org: 'University of Houston' },
    ],
  },
  {
    name: 'Steve French',
    title: 'Board Member',
    photo: '/team/steve-french.jpg',
    photoPosition: 'center 15%',
    linkedin: 'https://www.linkedin.com/in/frenchstephen/',
    summary: 'Leads The Signatry after nearly two decades as a CEO in legal technology.',
    roles: [
      {
        title: 'President & CEO',
        org: 'The Signatry',
        url: 'https://thesignatry.com',
        note: 'Has overseen more than $1 billion in non-cash gifts',
      },
    ],
    past: [
      { title: 'President, Middle Tennessee Region', org: 'NCF Heartland' },
      { title: 'Chief Executive Officer', org: 'Quovant' },
    ],
  },
  {
    name: 'Jeff Johns',
    title: 'Board Member',
    photo: '/team/jeff-johns.jpg',
    photoPosition: 'center 25%',
    linkedin: 'https://www.linkedin.com/in/jeffjohns505/',
    summary: 'Leads Impact Foundation after twelve years growing the National Christian Foundation network.',
    roles: [
      { title: 'Chief Executive', org: 'Impact Foundation' },
      { title: 'Board Chair', org: 'Acton Academy Albuquerque' },
    ],
    past: [
      {
        title: 'Senior Vice President',
        org: 'National Christian Foundation',
        note: 'Added 27 foundations as annual giving grew from about $60M to over $1B',
      },
      { title: 'Associate', org: 'Mitchell Madison Group' },
      { title: 'Analyst', org: 'Marakon Associates' },
    ],
  },
  {
    name: 'Jake Thomsen',
    title: 'Board Member',
    photo: '/team/jake-thomsen.jpg',
    photoPosition: 'center 20%',
    linkedin: 'https://www.linkedin.com/in/jakethomsen/',
    summary: 'Leads venture investing at Sovereign\'s Capital, backing founders across the U.S. and Southeast Asia.',
    roles: [
      {
        title: 'Managing Partner',
        org: "Sovereign's Capital",
        note: 'More than 70 companies backed across four venture funds since 2012',
      },
    ],
    past: [
      { title: 'Lead Associate, Strategic Innovation Group', org: 'Booz Allen Hamilton' },
      { title: 'MBA Financial Analyst', org: '8 Rivers Capital' },
    ],
  },
]

/** Firm Advisors: name and LinkedIn only, alphabetical by last name. */
export const ADVISORS: Pick<Person, 'name' | 'linkedin'>[] = [
  { name: 'Corey Alderin' },
  { name: 'Chris Allen' },
  { name: 'Isaac Arnold' },
  { name: 'Kurian Babykutty' },
  { name: 'Tom Baldwin', linkedin: 'https://www.linkedin.com/in/tombbaldwin/' },
  { name: 'Mike Barker' },
  { name: 'Marshall Bex' },
  { name: 'Renji Bijoy' },
  { name: 'Steele Billings' },
  { name: 'Shannon Bland' },
  { name: 'Hank Bowen' },
  { name: 'Trey Bowles' },
  { name: 'Connor Carew' },
  { name: 'Jake Carlson' },
  { name: 'Stephen Carter' },
  { name: 'Joel Chakra' },
  { name: 'Josh Chodniewicz' },
  { name: 'Brad Clark' },
  { name: 'Michael Clifford' },
  { name: 'Chris Coggin' },
  { name: 'John Coleman' },
  { name: 'Clay Davis' },
  { name: 'Alex Demczak' },
  { name: 'Grant Demeter', linkedin: 'https://www.linkedin.com/in/grant-demeter/' },
  { name: 'Michael Denton' },
  { name: 'Duane Donner' },
  { name: 'Matt Doyle' },
  { name: 'Scott Elequin' },
  { name: 'Ben Elmore', linkedin: 'https://www.linkedin.com/in/benjaminelmore/' },
  { name: 'Patrick Farrell' },
  { name: 'Andrew Feng' },
  { name: 'Justin Forman', linkedin: 'https://www.linkedin.com/in/jforman/' },
  { name: 'Luke Frazier' },
  { name: 'David Friedman' },
  { name: 'Morgan Gamble' },
  { name: 'Mart Green' },
  { name: 'Bobby Gruenewald' },
  { name: 'Brett Hagler' },
  { name: 'Matt Harrison' },
  { name: 'Daryl Heald' },
  { name: 'Brad Hill' },
  { name: 'Kay Hiramine', linkedin: 'https://www.linkedin.com/in/kayhiramine/' },
  { name: 'Drew Hiss' },
  { name: 'Rob Hoskins' },
  { name: 'Matt Hostetler', linkedin: 'https://www.linkedin.com/in/mhostetler-m3a/' },
  { name: 'Christy Johnson' },
  { name: 'Matt Johnson' },
  { name: 'Henry Kaestner' },
  { name: 'Dane Kenney' },
  { name: 'John Kronlokken' },
  { name: 'Kyle Kutter' },
  { name: 'Alec Lewis', linkedin: 'https://www.linkedin.com/in/aleclewis177/' },
  { name: 'Ali Llewellyn', linkedin: 'https://www.linkedin.com/in/adllewellyn/' },
  { name: 'Brad Lomenick' },
  { name: 'Evan Loomis' },
  { name: 'Adora Lovestrand' },
  { name: 'Tevin Lucas' },
  { name: 'Michael Lukaszewski', linkedin: 'https://www.linkedin.com/in/michael-lukaszewski/' },
  { name: 'Gabe Lyons' },
  { name: 'Chase Maasdorp', linkedin: 'https://www.linkedin.com/in/chase-maasdorp-a84807188/' },
  { name: 'Kevin Macki' },
  { name: 'Jason Malec', linkedin: 'https://www.linkedin.com/in/jasonmalec/' },
  { name: 'Luke Mangan' },
  { name: 'John Manning' },
  { name: 'Paul Martin' },
  { name: 'Tommy Martin' },
  { name: 'Mark McClain' },
  { name: 'Mike Meiser', linkedin: 'https://www.linkedin.com/in/michaelmeiser/' },
  { name: 'Tim Metzner' },
  { name: 'Preston Morter' },
  { name: 'Wade Myers' },
  { name: 'Kyle Negrete' },
  { name: 'Bogdan Negru' },
  { name: 'Rob Neville' },
  { name: 'Steve Neylon', linkedin: 'https://www.linkedin.com/in/steve-neylon-pe-67a13491/' },
  { name: 'Joe Nicolette' },
  { name: 'William Norvell', linkedin: 'https://www.linkedin.com/in/wnorvell/' },
  { name: 'Ben Nussbaum' },
  { name: 'Bryce Oldham' },
  { name: 'Melissa Peak', linkedin: 'https://www.linkedin.com/in/melissajpeak/' },
  { name: 'Hudson Phillips' },
  { name: 'Mark Phillips' },
  { name: 'James Poulter' },
  { name: 'Tyler Prieb' },
  { name: 'Jason Rachels' },
  { name: 'Anthony Remensnyder' },
  { name: 'Adam Richardson' },
  { name: 'Sean Riley' },
  { name: 'Dana Roefer' },
  { name: 'Luke Roush' },
  { name: 'Vance Roush' },
  { name: 'Tristan Schaeffer' },
  { name: 'Michael Seifert' },
  { name: 'Will Severns', linkedin: 'https://www.linkedin.com/in/will-severns-59a97268/' },
  { name: 'Mike Sharrow' },
  { name: 'Zach Sicher' },
  { name: 'Nick Skytland', linkedin: 'https://www.linkedin.com/in/skytland/' },
  { name: 'Brett Smith' },
  { name: 'Nick Spiller', linkedin: 'https://www.linkedin.com/in/nickspiller/' },
  { name: 'Tim Tebow' },
  { name: 'Debi Tengler' },
  { name: 'Eric Theisen' },
  { name: 'Ranjy Thomas' },
  { name: 'Zac Tinney' },
  { name: 'Clay Vaughan' },
  { name: 'Harrison Vinnett' },
  { name: 'Josh Wade' },
  { name: 'Michael Whittle' },
  { name: 'Addison Williams' },
  { name: 'Drew Williams', linkedin: 'https://www.linkedin.com/in/drewwilliams11/' },
  { name: 'Douglas Williamson' },
  { name: 'Brian Woods' },
  { name: 'Ryan Wuerch' },
]
