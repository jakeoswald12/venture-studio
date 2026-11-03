/**
 * The West Ventures plan: a ten-year projection, 2027–2036.
 *
 * Every number in the Projections section of /thesis comes from the assumptions in this file, so a
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

/** Partner schools signed by each fall: 60 high schools and 30 colleges and
 * universities (ACU included) in 2027, reaching 300 and 150 by 2030, then
 * growing by 60 high schools and 30 colleges a year. */
const PARTNERS: Record<number, { highSchools: number; colleges: number }> = {
  2027: { highSchools: 60, colleges: 30 },
  2028: { highSchools: 120, colleges: 60 },
  2029: { highSchools: 200, colleges: 100 },
  2030: { highSchools: 300, colleges: 150 },
  2031: { highSchools: 360, colleges: 180 },
  2032: { highSchools: 420, colleges: 210 },
  2033: { highSchools: 480, colleges: 240 },
  2034: { highSchools: 540, colleges: 270 },
  2035: { highSchools: 600, colleges: 300 },
  2036: { highSchools: 660, colleges: 330 },
}

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

/** The whole paid team, all from August 2027. Titles match the Team page. */
export const HIRES: Hire[] = [
  { role: 'Managing Partner (Jake Oswald)', start: 'Aug 2027', startAt: 2027 + 7 / 12, salary: 200_000, note: 'Moves off the ACU payroll for the fall 2027 launch.' },
  { role: 'Managing Partner (Lars Ostervold)', start: 'Aug 2027', startAt: 2027 + 7 / 12, salary: 200_000, note: 'Joint ventures and the studio’s own companies.' },
  { role: 'Head of Operations', start: 'Aug 2027', startAt: 2027 + 7 / 12, salary: 160_000, note: 'Runs terms, enrollment, billing and the volunteer project leads.' },
  { role: 'Head of Partnerships', start: 'Aug 2027', startAt: 2027 + 7 / 12, salary: 160_000, note: 'Signs and supports partner high schools and colleges.' },
]

/* ─── Student Fellows ─────────────────────────────────────────────────────── */

/** Monthly stipend for each Student Fellow. */
export const FELLOW_STIPEND_MONTHLY = 6_000
/** Fellows funded from each fall (new cohorts start in August). The count holds after the last year listed. */
export const FELLOWS_BY_FALL: Record<number, number> = { 2027: 4, 2028: 10, 2029: 20, 2030: 30 }
export const fellowsInFall = (y: number) => {
  let n = 0
  for (const [yr, count] of Object.entries(FELLOWS_BY_FALL)) if (Number(yr) <= y) n = count
  return n
}

/* ─── Other costs ─────────────────────────────────────────────────────────── */

export const COSTS = {
  /** Claude subscription for every student, per term. */
  claudePerStudentTerm: 100,
  /** Card and payment processing, share of student revenue. */
  processing: 0.03,
  /** Recruiting students, share of student revenue. */
  marketing: 0.08,
  /** Insurance, legal and accounting: fixed plus per student-term. */
  adminFixed: 60_000,
  adminPerStudentTerm: 15,
  /** Summits, hackathons and travel: fixed plus per student-term. */
  eventsFixed: 75_000,
  eventsPerStudentTerm: 40,
  /** Training, events and gifts for each volunteer project lead, per year. */
  perVolunteer: 1_000,
  /** Travel for the paid team: partner visits, founder meetings, conferences. Per person per year. */
  teamTravelPerHead: 20_000,
  /** Running the firm: CRM, enrollment and billing, website, accounting software. Fixed per year. */
  firmSoftwareFixed: 36_000,
  /** Software seats for each paid team member (workspace, Slack, Claude, design tools). Per year. */
  firmSoftwarePerHead: 6_000,
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
  /** Student Fellows funded in the fall. */
  fellows: number
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

    // Partner schools.
    const { highSchools: hs, colleges: college } = PARTNERS[y]

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
    let headYears = 0
    for (const h of HIRES) {
      const share = Math.max(0, Math.min(1, y + 1 - h.startAt))
      if (share > 0) staff += 1
      headYears += share
      staffCost += share * h.salary * inflate * LOADED
    }
    const peakProjects = Math.max(p.spring, p.fall)

    // Student Fellows: January–July at last fall's count, August–December at this fall's.
    const fellows = fellowsInFall(y)
    const fellowCost = (7 * fellowsInFall(y - 1) + 5 * fellows) * FELLOW_STIPEND_MONTHLY

    const volunteers = y === FIRST_YEAR ? VOLUNTEERS_FALL_2027 : peakProjects
    const other =
      studentTerms * (COSTS.claudePerStudentTerm + COSTS.adminPerStudentTerm + COSTS.eventsPerStudentTerm) +
      revenueStudents * (COSTS.processing + COSTS.marketing) +
      COSTS.adminFixed +
      COSTS.eventsFixed +
      volunteers * COSTS.perVolunteer +
      headYears * (COSTS.teamTravelPerHead + COSTS.firmSoftwarePerHead) * inflate +
      COSTS.firmSoftwareFixed

    const operating = revenueStudents + revenueCompanies - staffCost - fellowCost - other
    const acu = COSTS.acuShare * Math.max(0, operating)
    const overhead = staffCost + fellowCost + other + acu

    out.push({
      year: y,
      projects: p.fall,
      students: fallStudents,
      studentTerms,
      highSchools: hs,
      colleges: college,
      volunteers,
      staff,
      fellows,
      revenueStudents,
      revenueCompanies,
      overhead,
      net: revenueStudents + revenueCompanies - overhead,
    })
  }
  return out
}

export const PLAN: PlanYear[] = build()
