import type { Metadata } from 'next'
import { Flywheel } from '@/components/plan/Flywheel'
import { PlanCharts } from '@/components/plan/PlanCharts'
import { Frame } from '@/components/site/Frame'
import { Rule } from '@/components/site/Section'
import {
  COLLEGE_PER_TEAM,
  COSTS,
  HIGH_SCHOOL_PER_TEAM,
  FIRST_YEAR,
  HIRES,
  LAST_YEAR,
  LOADED,
  PLAN,
  PRICE_PER_TERM,
  PROJECTS_PER_VENTURE_LEAD,
  STUDENTS_PER_ASSOCIATE,
  SUMMER_SHARE,
  SURVIVAL,
  TEAM_SIZE,
  VOLUNTEERS_FALL_2027,
  VOLUNTEERS_NOW,
} from '@/lib/data/plan'

export const metadata: Metadata = {
  title: 'Plan',
  description: 'The West Ventures flywheel, a ten-year projection of revenue, overhead and partner schools, and the hiring plan.',
}

/**
 * /master-plan — the plan as a page: the flywheel first, then the ten-year
 * projection and the hiring plan. Every number comes from lib/data/plan.ts.
 *
 * The earlier slide deck is archived at /archive/master-plan-deck.html.
 */

const d = (n: number) => ({ '--d': n }) as React.CSSProperties
const usd = (v: number) => `$${v.toLocaleString('en-US')}`

export default function PlanPage() {
  const last = PLAN[PLAN.length - 1]
  const firstPositive = PLAN.find((r) => r.net > 0)

  return (
    <main>
      <h1 className="sr-only">Plan</h1>

      <Frame className="pt-[calc(96px+env(safe-area-inset-top))] sm:pt-[100px]">
        {/* Flywheel */}
        <section className="pb-20 sm:pb-28">
          <h2 className="sr-only">Flywheel</h2>
          <div data-reveal-item className="mx-auto w-full max-w-[min(1200px,calc((100svh-150px)*1200/880))]">
            <Flywheel />
          </div>
        </section>

        {/* Projections */}
        <section className="pb-20 sm:pb-28">
          <Rule className="mb-10" />
          <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
            Projections, {FIRST_YEAR}–{LAST_YEAR}
          </h2>
          <p data-reveal-item style={d(1)} className="mb-12 mt-4 max-w-[68ch] text-[1rem] leading-[1.65]">
            Revenue comes from two places: students who take part, at {usd(PRICE_PER_TERM)} a term, and the share of profit
            paid by companies the studio owns. Sales of equity are not counted. Overhead is shown below zero. Select a
            year on either chart to see its numbers.
          </p>
          <div data-reveal-item style={d(2)}>
            <PlanCharts data={PLAN} />
          </div>
          <p data-reveal-item className="mt-10 max-w-[68ch] text-[0.95rem] leading-[1.65]">
            On these assumptions net is positive from {firstPositive?.year ?? '—'}. In {last.year} the studio runs{' '}
            {last.projects} projects a term with {last.students.toLocaleString()} students from {last.highSchools} high
            schools and {last.colleges} colleges, with {last.staff} paid staff.
          </p>
        </section>

        {/* Team */}
        <section className="pb-20 sm:pb-28">
          <Rule className="mb-10" />
          <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
            Hiring
          </h2>
          <p data-reveal-item style={d(1)} className="mb-10 mt-4 max-w-[68ch] text-[1rem] leading-[1.65]">
            Both Managing Partners, the Head of Operations and the Head of Partnerships are paid from August{' '}
            {FIRST_YEAR}. Volunteers lead projects: there are {VOLUNTEERS_NOW} volunteer project leads today and about{' '}
            {VOLUNTEERS_FALL_2027} are expected by fall {FIRST_YEAR}, each leading about one project, so the paid team
            stays small. Paid roles follow the leadership team on the Team page.
          </p>
          <div data-reveal-item style={d(2)} className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
              <thead>
                <tr className="border-b border-line font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                  <th className="py-3 pr-6 font-normal">Role</th>
                  <th className="py-3 pr-6 font-normal">Paid from</th>
                  <th className="py-3 pr-6 font-normal">Salary</th>
                  <th className="py-3 font-normal">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {HIRES.map((h) => (
                  <tr key={h.role} className="border-b border-line align-top">
                    <td className="py-3.5 pr-6 text-ink">{h.role}</td>
                    <td className="whitespace-nowrap py-3.5 pr-6">{h.start}</td>
                    <td className="whitespace-nowrap py-3.5 pr-6 tabular-nums">{usd(h.salary)}</td>
                    <td className="py-3.5">{h.note}</td>
                  </tr>
                ))}
                <tr className="border-b border-line align-top">
                  <td className="py-3.5 pr-6 text-ink">Venture Leads</td>
                  <td className="whitespace-nowrap py-3.5 pr-6">2029</td>
                  <td className="whitespace-nowrap py-3.5 pr-6 tabular-nums">$110,000</td>
                  <td className="py-3.5">
                    One for every {PROJECTS_PER_VENTURE_LEAD} projects in a term. Each supports the volunteer project leads
                    on those projects.
                  </td>
                </tr>
                <tr className="border-b border-line align-top">
                  <td className="py-3.5 pr-6 text-ink">Student support</td>
                  <td className="whitespace-nowrap py-3.5 pr-6">2030</td>
                  <td className="whitespace-nowrap py-3.5 pr-6 tabular-nums">$80,000</td>
                  <td className="py-3.5">One for every {STUDENTS_PER_ASSOCIATE} students in a term: enrollment, billing and questions.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.88rem] text-grey">
            Salaries rise 3% a year. Overhead counts each salary at {LOADED}× for payroll taxes and benefits.
          </p>
        </section>

        {/* Assumptions */}
        <section className="pb-8">
          <Rule className="mb-10" />
          <h2 data-reveal-item className="text-[clamp(2rem,4vw,3.2rem)] leading-[1]">
            Assumptions
          </h2>
          <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-3">
            <div data-reveal-item data-reveal-auto>
              <h3 className="font-serif text-[1.2rem] font-semibold text-ink">Students</h3>
              <ul className="mt-3 grid gap-2 text-[0.95rem] leading-[1.55]">
                <li>{usd(PRICE_PER_TERM)} per term for every student. Fall, spring and summer are each a term, so a full year is {usd(PRICE_PER_TERM * 3)}.</li>
                <li>High school and college students pay the same and work on the same teams.</li>
                <li>An average of {TEAM_SIZE} students per project: {COLLEGE_PER_TEAM} college students, from ACU first and then partner colleges, and {HIGH_SCHOOL_PER_TEAM} high school students.</li>
                <li>Summer enrollment is {Math.round(SUMMER_SHARE * 100)}% of the spring before it.</li>
                <li>The new price starts in summer {FIRST_YEAR}. Spring {FIRST_YEAR} runs under the current program.</li>
                <li>Projects per term grow from 25 in fall {FIRST_YEAR} to {last.projects} in fall {LAST_YEAR}.</li>
                <li>No financial aid is modeled.</li>
              </ul>
            </div>
            <div data-reveal-item data-reveal-auto>
              <h3 className="font-serif text-[1.2rem] font-semibold text-ink">Partners and companies</h3>
              <ul className="mt-3 grid gap-2 text-[0.95rem] leading-[1.55]">
                <li>Universities, founders and investors pay nothing.</li>
                <li>Each partner high school places one student a term in {FIRST_YEAR}, rising to two by {FIRST_YEAR + 4}.</li>
                <li>ACU fills college seats first: up to 60 students a term in {FIRST_YEAR}, adding 10 a year. Other partner colleges place 6 each, rising to 12.</li>
                <li>Five companies exist today. The studio starts or co-founds six a year.</li>
                <li>{Math.round(SURVIVAL * 100)}% reach steady profit. From a company’s second year, the studio’s share of its profit rises from $50,000 to $300,000 a year by its fifth.</li>
              </ul>
            </div>
            <div data-reveal-item data-reveal-auto>
              <h3 className="font-serif text-[1.2rem] font-semibold text-ink">Other costs</h3>
              <ul className="mt-3 grid gap-2 text-[0.95rem] leading-[1.55]">
                <li>A Claude subscription for every student: {usd(COSTS.claudePerStudentTerm)} per student per term.</li>
                <li>Recruiting students: {Math.round(COSTS.marketing * 100)}% of student revenue. Payment processing: {Math.round(COSTS.processing * 100)}%.</li>
                <li>Insurance, legal and accounting: {usd(COSTS.adminFixed)} a year plus {usd(COSTS.adminPerStudentTerm)} per student per term.</li>
                <li>Summits, hackathons and travel: {usd(COSTS.eventsFixed)} a year plus {usd(COSTS.eventsPerStudentTerm)} per student per term.</li>
                <li>{usd(COSTS.perVolunteer)} a year per volunteer project lead for training and events.</li>
                <li>Travel for the paid team: {usd(COSTS.teamTravelPerHead)} per person per year.</li>
                <li>Running the firm: {usd(COSTS.firmSoftwareFixed)} a year for CRM, enrollment, billing, website and accounting software, plus {usd(COSTS.firmSoftwarePerHead)} in software seats per person.</li>
                <li>{Math.round(COSTS.acuShare * 100)}% of operating profit goes to ACU’s endowment, counted as overhead.</li>
              </ul>
            </div>
          </div>
        </section>
      </Frame>
    </main>
  )
}
