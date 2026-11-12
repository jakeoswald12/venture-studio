import { PlanCharts } from './PlanCharts'
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
  FELLOW_STIPEND_MONTHLY,
  FELLOWS_BY_FALL,
  SUMMER_SHARE,
  SURVIVAL,
  TEAM_SIZE,
  VOLUNTEERS_FALL_2027,
  VOLUNTEERS_NOW,
} from '@/lib/data/plan'

/**
 * The plan's numbers, shown on the Thesis page: the projection charts, the
 * hiring plan and the assumptions behind them. Everything comes from
 * lib/data/plan.ts.
 */

const d = (n: number) => ({ '--d': n }) as React.CSSProperties
const usd = (v: number) => `$${v.toLocaleString('en-US')}`

export function Projections() {
  const last = PLAN[PLAN.length - 1]
  const firstPositive = PLAN.find((r) => r.net > 0)
  return (
    <>
      <div data-reveal-item style={d(2)}>
        <PlanCharts data={PLAN} />
      </div>
      <p data-reveal-item className="max-w-[68ch] text-[0.98rem] leading-[1.65]">
        On these assumptions net is positive from {firstPositive?.year ?? '—'}. In {last.year} the studio runs{' '}
        {last.projects} projects a term with {last.students.toLocaleString()} students from {last.highSchools} high
        schools and {last.colleges} colleges, with {last.staff} paid staff and {last.fellows} Student Fellows.
      </p>
    </>
  )
}

export function Hiring() {
  return (
    <>
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
                  <td className="py-3.5 pr-6 text-ink">Student Fellows</td>
                  <td className="whitespace-nowrap py-3.5 pr-6">Aug 2027</td>
                  <td className="whitespace-nowrap py-3.5 pr-6 tabular-nums">{usd(FELLOW_STIPEND_MONTHLY)} / mo</td>
                  <td className="py-3.5">
                    {Object.entries(FELLOWS_BY_FALL)
                      .map(([y, n]) => `${n} in fall ${y}`)
                      .join(', ')}
                    , then holding at {Object.values(FELLOWS_BY_FALL).at(-1)}. A monthly stipend each, all year.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.88rem] text-grey">
            Salaries rise 3% a year. Overhead counts each salary at {LOADED}× for payroll taxes and benefits. Fellow stipends are counted as paid, with no increase.
          </p>
    </>
  )
}

export function Assumptions() {
  const last = PLAN[PLAN.length - 1]
  return (
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-3">
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
                <li>Partner schools: 70 high schools and 30 colleges and universities in {FIRST_YEAR}, 500 schools by 2030 (350 high schools and 150 colleges), then 70 more high schools and 30 more colleges a year.</li>
                <li>ACU fills college seats first.</li>
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
                <li>{usd(COSTS.perVolunteer)} a year per volunteer project advisor for training and events.</li>
                <li>Travel for the paid team: {usd(COSTS.teamTravelPerHead)} per person per year.</li>
                <li>Running the firm: {usd(COSTS.firmSoftwareFixed)} a year for CRM, enrollment, billing, website and accounting software, plus {usd(COSTS.firmSoftwarePerHead)} in software seats per person.</li>
                <li>{Math.round(COSTS.acuShare * 100)}% of operating profit goes to ACU’s endowment, counted as overhead.</li>
              </ul>
            </div>
          </div>
  )
}
