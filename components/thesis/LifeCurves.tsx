/**
 * What a builder has, by age: an illustrative chart for the Sculptures vs
 * Fossils essay. Energy, time and risk tolerance run high early and fall;
 * wisdom, information, network and capital start low and rise. Neither end
 * has everything, and the middle of a career is where the best of either is
 * lowest, the valley. Paired, the young and the experienced cover both ends.
 *
 * The curves are shapes, not measurements: smooth logistic curves chosen to
 * show the pattern. The caption says so.
 */

const W = 760
const H = 420
const PAD_L = 44
const PAD_R = 112
const PAD_T = 18
const PAD_B = 40
const AGE_MIN = 15
const AGE_MAX = 80

const x = (age: number) => PAD_L + ((age - AGE_MIN) / (AGE_MAX - AGE_MIN)) * (W - PAD_L - PAD_R)
const y = (pct: number) => PAD_T + (1 - pct / 100) * (H - PAD_T - PAD_B)

/** High early, falling with age. */
const falling = (hi: number, lo: number, mid: number, k: number) => (age: number) =>
  lo + (hi - lo) / (1 + Math.exp((age - mid) / k))
/** Low early, rising with age. */
const rising = (lo: number, hi: number, mid: number, k: number) => (age: number) =>
  lo + (hi - lo) / (1 + Math.exp(-(age - mid) / k))

const YOUNG = [
  { label: 'Energy', f: falling(96, 14, 33, 6), opacity: 1 },
  { label: 'Time', f: falling(87, 10, 27, 4.5), opacity: 0.7 },
  { label: 'Risk tolerance', f: falling(77, 8, 31, 5), opacity: 0.45 },
]
const OLD = [
  { label: 'Wisdom', f: rising(6, 94, 58, 7), opacity: 1 },
  { label: 'Network', f: rising(5, 86, 55, 6), opacity: 0.75 },
  { label: 'Information', f: rising(8, 78, 52, 6), opacity: 0.55 },
  { label: 'Capital', f: rising(3, 70, 61, 5.5), opacity: 0.38 },
]

const AGES = Array.from({ length: (AGE_MAX - AGE_MIN) * 2 + 1 }, (_, i) => AGE_MIN + i / 2)
const path = (f: (a: number) => number) => AGES.map((a, i) => `${i ? 'L' : 'M'}${x(a).toFixed(1)},${y(f(a)).toFixed(1)}`).join('')

// The best of either alone at each age: the top of all seven curves.
const envelope = (a: number) => Math.max(...[...YOUNG, ...OLD].map((c) => c.f(a)))
const valleyAge = AGES.reduce((best, a) => (envelope(a) < envelope(best) ? a : best), 40)

export function LifeCurves() {
  const area = `${path(envelope)}L${x(AGE_MAX)},${y(0)}L${x(AGE_MIN)},${y(0)}Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="life-curves-title life-curves-desc">
      <title id="life-curves-title">What a builder has, by age</title>
      <desc id="life-curves-desc">
        Energy, time and risk tolerance are highest at 15 and fall with age. Wisdom, information, network and capital are
        lowest at 15 and rise with age. Around age {Math.round(valleyAge)} the best of either is lowest.
      </desc>

      {/* Grid and axes */}
      {[0, 25, 50, 75, 100].map((p) => (
        <g key={p}>
          <line x1={x(AGE_MIN)} x2={x(AGE_MAX)} y1={y(p)} y2={y(p)} stroke="var(--line)" />
          <text x={x(AGE_MIN) - 8} y={y(p) + 4} textAnchor="end" fontSize={11} fill="var(--faint)" fontFamily="var(--font-mono, ui-monospace)">
            {p}%
          </text>
        </g>
      ))}
      {[15, 20, 30, 40, 50, 60, 70, 80].map((a) => (
        <text key={a} x={x(a)} y={H - PAD_B + 20} textAnchor="middle" fontSize={11} fill="var(--faint)" fontFamily="var(--font-mono, ui-monospace)">
          {a}
        </text>
      ))}
      <text x={(x(AGE_MIN) + x(AGE_MAX)) / 2} y={H - 4} textAnchor="middle" fontSize={11} fill="var(--grey)" fontFamily="var(--font-mono, ui-monospace)" letterSpacing="0.12em">
        AGE
      </text>

      {/* The best of either alone, and the valley in the middle */}
      <path d={area} fill="var(--bronze)" fillOpacity={0.07} />
      <path d={path(envelope)} fill="none" stroke="var(--grey)" strokeWidth={1.5} strokeDasharray="4 5" />
      <text x={x(valleyAge)} y={y(envelope(valleyAge)) - 44} textAnchor="middle" fontSize={15} fontStyle="italic" fill="var(--grey)" fontFamily="var(--font-serif, Georgia)">
        the valley
      </text>

      {/* Curves */}
      {YOUNG.map((c) => (
        <g key={c.label}>
          <path d={path(c.f)} fill="none" stroke="var(--bronze)" strokeOpacity={c.opacity} strokeWidth={2.5} strokeLinecap="round" />
          <text x={x(AGE_MIN) + 4} y={y(c.f(AGE_MIN)) - 8} fontSize={13} fill="var(--bronze)" fontFamily="var(--font-serif, Georgia)">
            {c.label}
          </text>
        </g>
      ))}
      {OLD.map((c) => (
        <g key={c.label}>
          <path d={path(c.f)} fill="none" stroke="var(--ink)" strokeOpacity={c.opacity} strokeWidth={2.5} strokeLinecap="round" />
          <text x={x(AGE_MAX) + 10} y={y(c.f(AGE_MAX)) + 4} fontSize={13} fill="var(--ink)" fillOpacity={Math.max(0.6, c.opacity)} fontFamily="var(--font-serif, Georgia)">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
