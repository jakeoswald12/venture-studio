/**
 * The West Ventures plan: a ten-year projection, 2027–2036.
 *
 * Every number on /master-plan comes from the assumptions in this file, so a
 * change here changes the page. Figures are calendar years. Revenue comes only
 * from students (tuition for the program) and from profit distributions paid
 * by companies the studio owns part or all of. Sales of equity (exits) are left
 * out on purpose.
 */

export const FIRST_YEAR = 2027
export const LAST_YEAR = 2036

/** Price per student per term. Fall, spring and summer are each one term. */
export const PRICE_PER_TERM = 5000

/** Projects per semester. Spring and fall 2027 follow the ramp already planned. */
const PROJECTS: Record<number, { spring: number; fall: number }> = {
  2027: { spring: 20, fall: 25 },
  2028: { spring: 30, fall: 40 },
  2029: { spring: 50, fall: 60 },
  2030: { spring: 72, fall: 88 },
  2031: { spring: 100, fall: 120 },
  2032: { spring: 135, fall: 155 },
  2033: { spring: 175, fall: 195 },
  2034: { spring: 220, fall: 240 },
  2035: { spring: 265, fall: 295 },
  2036: { spring: 315, fall: 345 },
}

/** Average team: two college students (ACU first, then partner colleges) and three high school students. */
export const COLLEGE_PER_TEAM = 2
export const HIGH_SCHOOL_PER_TEAM = 3
export const TEAM_SIZE = COLLEGE_PER_TEAM + HIGH_SCHOOL_PER_TEAM
/** Summer enrollment as a share of the spring before it. */
export const SUMMER_SHARE = 0.25
/** Spring 2027 is already priced under the current program; the new price starts with summer 2027. */
const PRICED_FROM = 'summer-2027'

/** Students a partner high school places per semester: 1 in 2027, rising to 2 by 2031. */
const hsPerSchool = (y: number) => 1 + Math.min(1, (y - FIRST_YEAR) / 4)
/** ACU's own students on teams each fall, and what each other partner college places. */
const acuStudents = (y: number) => 60 + (y - FIRST_YEAR) * 10
const perCollege = (y: number) => 6 + Math.min(6, y - FIRST_YEAR)

/* ─── Joint ventures and startups ─────────────────────────────────────────── */

/** Companies the studio owns part or all of, by year founded. Five exist already. */
const NEW_COMPANIES_PER_YEAR = 6
const EXISTING_COMPANIES = 5
/** Share of companies that reach steady profit. */
export const SURVIVAL = 0.4
/** The studio's yearly share of profit from a surviving company, by its age in years. */
const PROFIT_SHARE_BY_AGE = (age: number) =>
  age < 2 ? 0 : age === 2 ? 50_000 : age === 3 ? 120_000 : age === 4 ? 200_000 : 300_000

/* ─── Team ────────────────────────────────────────────────────────────────── */

/** Salary plus payroll taxes and benefits. */
export const LOADED = 1.25
/** Salaries rise 3% a year. */
const RAISE = 0.03

export interface Hire {
  role: string
  /** Month and year the role is paid by West Ventures. */
  start: string
  startAt: number
  salary: number
  note: string
}

/** Leadership roles, in the order they are paid. Titles match the Team page. */
export const HIRES: Hire[] = [
  { role: 'Managing Partner (Jake Oswald)', start: 'Aug 2027', startAt: 2027 + 7 / 12, salary: 150_000, note: 'Moves off the ACU payroll for the fall 2027 launch.' },
  { role: 'Managing Partner (Lars Ostervold)', start: 'Aug 2027', startAt: 2027 + 7 / 12, salary: 150_000, note: 'Joint ventures and the studio’s own companies.' },
  { role: 'Head of Operations', start: 'Aug 2027', startAt: 2027 + 7 / 12, salary: 140_000, note: 'Runs terms, enrollment, billing and the volunteer project leads.' },
  { role: 'Head of Partnerships', start: 'Aug 2027', startAt: 2027 + 7 / 12, salary: 130_000, note: 'Signs and supports partner high schools and colleges.' },
  { role: 'Head of Growth', start: 'Jul 2028', startAt: 2028.5, salary: 120_000, note: 'Student recruiting, since revenue comes from students.' },
  { role: 'Head of Product', start: 'Jan 2030', startAt: 2030, salary: 130_000, note: 'Software the program runs on, and launch.kids.' },
  { role: 'Head of Design', start: 'Jul 2030', startAt: 2030.5, salary: 120_000, note: 'Design standards and review across projects.' },
]

/** Paid Venture Leads start in 2029: one per 40 projects in a semester, coordinating the volunteer project leads. */
export const PROJECTS_PER_VENTURE_LEAD = 40
const VENTURE_LEAD_SALARY = 110_000
const VENTURE_LEADS_FROM = 2029
/** Student support staff from 2030: one per 400 students in a semester. */
export const STUDENTS_PER_ASSOCIATE = 400
const ASSOCIATE_SALARY = 80_000
const ASSOCIATES_FROM = 2030

/* ─── Other costs ─────────────────────────────────────────────────────────── */

export const COSTS = {
  /** Claude subscription for every student, per term. */
  claudePerStudentTerm: 100,
  /** Card and payment processing, share of student revenue. */
  processing: 0.03,
  /** Recruiting students, share of student revenue. */
  marketing: 0.08,
  /** Software, insurance, legal and accounting: fixed plus per student-term. */
  adminFixed: 60_000,
  adminPerStudentTerm: 15,
  /** Summits, hackathons and travel: fixed plus per student-term. */
  eventsFixed: 75_000,
  eventsPerStudentTerm: 40,
  /** Training, events and gifts for each volunteer project lead, per year. */
  perVolunteer: 1_000,
  /** Gift to ACU's endowment, share of operating profit. */
  acuShare: 0.1,
}

/** Volunteer project leads today, and by fall 2027. Each leads about one project. */
export const VOLUNTEERS_NOW = 15
export const VOLUNTEERS_FALL_2027 = 25

/* ─── The model ───────────────────────────────────────────────────────────── */

export interface PlanYear {
  year: number
  projects: number
  /** Students on teams in the fall semester. */
  students: number
  /** Paid student-terms in the year (spring + summer + fall). */
  studentTerms: number
  highSchools: number
  colleges: number
  volunteers: number
  staff: number
  revenueStudents: number
  revenueCompanies: number
  overhead: number
  net: number
}

function build(): PlanYear[] {
  const out: PlanYear[] = []
  for (let y = FIRST_YEAR; y <= LAST_YEAR; y += 1) {
    const k = y - FIRST_YEAR
    const p = PROJECTS[y]
    const springStudents = p.spring * TEAM_SIZE
    const fallStudents = p.fall * TEAM_SIZE
    const summerStudents = Math.round(springStudents * SUMMER_SHARE)
    const paidSpring = y === FIRST_YEAR && PRICED_FROM === 'summer-2027' ? 0 : springStudents
    const studentTerms = paidSpring + summerStudents + fallStudents
    const revenueStudents = studentTerms * PRICE_PER_TERM

    // Partners, sized to the fall semester.
    const hs = Math.ceil((p.fall * HIGH_SCHOOL_PER_TEAM) / hsPerSchool(y))
    const college = 1 + Math.ceil(Math.max(0, p.fall * COLLEGE_PER_TEAM - acuStudents(y)) / perCollege(y))

    // Companies.
    let revenueCompanies = 0
    for (let founded = FIRST_YEAR - 1; founded <= y; founded += 1) {
      const n = founded < FIRST_YEAR ? EXISTING_COMPANIES : NEW_COMPANIES_PER_YEAR
      revenueCompanies += n * SURVIVAL * PROFIT_SHARE_BY_AGE(y - founded)
    }

    // Staff.
    const inflate = (1 + RAISE) ** k
    let staffCost = 0
    let staff = 0
    for (const h of HIRES) {
      const share = Math.max(0, Math.min(1, y + 1 - h.startAt))
      if (share > 0) staff += 1
      staffCost += share * h.salary * inflate * LOADED
    }
    const peakProjects = Math.max(p.spring, p.fall)
    const leads = y >= VENTURE_LEADS_FROM ? Math.ceil(peakProjects / PROJECTS_PER_VENTURE_LEAD) : 0
    const associates = y >= ASSOCIATES_FROM ? Math.ceil(fallStudents / STUDENTS_PER_ASSOCIATE) : 0
    staff += leads + associates
    staffCost += (leads * VENTURE_LEAD_SALARY + associates * ASSOCIATE_SALARY) * inflate * LOADED

    const volunteers = y === FIRST_YEAR ? VOLUNTEERS_FALL_2027 : peakProjects
    const other =
      studentTerms * (COSTS.claudePerStudentTerm + COSTS.adminPerStudentTerm + COSTS.eventsPerStudentTerm) +
      revenueStudents * (COSTS.processing + COSTS.marketing) +
      COSTS.adminFixed +
      COSTS.eventsFixed +
      volunteers * COSTS.perVolunteer

    const operating = revenueStudents + revenueCompanies - staffCost - other
    const acu = COSTS.acuShare * Math.max(0, operating)
    const overhead = staffCost + other + acu

    out.push({
      year: y,
      projects: p.fall,
      students: fallStudents,
      studentTerms,
      highSchools: hs,
      colleges: college,
      volunteers,
      staff,
      revenueStudents,
      revenueCompanies,
      overhead,
      net: revenueStudents + revenueCompanies - overhead,
    })
  }
  return out
}

export const PLAN: PlanYear[] = build()
