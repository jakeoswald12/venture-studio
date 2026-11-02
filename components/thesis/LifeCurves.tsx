/**
 * What a builder has, by age: an illustrative chart for the Sculptures vs
 * Fossils essay. Energy, time and risk tolerance run high early and fall;
 * wisdom, information, network and capital start low and rise. Neither end
 * has everything, and averaged together they dip lowest in the middle of a
 * career, the valley. Paired, the young and the experienced cover both ends.
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
  // Time falls with work and family, then climbs back after about 65.
  { label: 'Time', f: (a: number) => falling(87, 10, 27, 4.5)(a) + 62 / (1 + Math.exp(-(a - 68) / 3)), opacity: 0.7 },
  { label: 'Risk tolerance', f: falling(77, 8, 31, 5), opacity: 0.45 },
]
const OLD = [
  { label: 'Wisdom', f: rising(6, 94, 58, 7), opacity: 1 },
  { label: 'Network', f: rising(5, 86, 55, 6), opacity: 0.75 },
  // Information climbs fast after 20, peaks around 40, holds to 50, then slowly declines.
  { label: 'Information', f: (a: number) => rising(8, 82, 30, 3.5)(a) - 22 / (1 + Math.exp(-(a - 62) / 7)), opacity: 0.55 },
  // Capital builds roughly in a straight line from 20 to about 65, then levels off.
  {
    label: 'Capital',
    f: (a: number) => {
      const k = 4
      const line = 3 + (65 * (a - 20)) / 45
      const capped = -k * Math.log(Math.exp(-line / k) + Math.exp(-72 / k))
      return k * Math.log(Math.exp(capped / k) + Math.exp(3 / k))
    },
    opacity: 0.38,
  },
]

const AGES = Array.from({ length: (AGE_MAX - AGE_MIN) * 2 + 1 }, (_, i) => AGE_MIN + i / 2)
const path = (f: (a: number) => number) => AGES.map((a, i) => `${i ? 'L' : 'M'}${x(a).toFixed(1)},${y(f(a)).toFixed(1)}`).join('')

// Everything a builder has at each age: the average of all seven curves.
const ALL = [...YOUNG, ...OLD]
const envelope = (a: number) => ALL.reduce((sum, c) => sum + c.f(a), 0) / ALL.length
const valleyAge = AGES.reduce((best, a) => (envelope(a) < envelope(best) ? a : best), 40)

// Labels at the right end: the rising curves, plus Time, which climbs back.
// Nudged apart so neighbours never overlap.
const RIGHT_LABELS = (() => {
  const items = [
    ...OLD.map((c) => ({ label: c.label, y: y(c.f(AGE_MAX)), color: 'var(--ink)', opacity: Math.max(0.6, c.opacity) })),
    ...YOUNG.filter((c) => c.f(AGE_MAX) > 40).map((c) => ({ label: c.label, y: y(c.f(AGE_MAX)), color: 'var(--bronze)', opacity: 1 })),
  ].sort((p, q) => p.y - q.y)
  for (let i = 1; i < items.length; i += 1) items[i].y = Math.max(items[i].y, items[i - 1].y + 17)
  return items
})()

export function LifeCurves() {
  const area = `${path(envelope)}L${x(AGE_MAX)},${y(0)}L${x(AGE_MIN)},${y(0)}Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="life-curves-title life-curves-desc">
      <title id="life-curves-title">What a builder has, by age</title>
      <desc id="life-curves-desc">
        Energy, time and risk tolerance are highest at 15 and fall with age. Wisdom, information, network and capital are
        lowest at 15 and rise with age. Averaged together, they are lowest around age {Math.round(valleyAge)}.
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

      {/* All seven averaged, and the valley in the middle */}
      <path d={area} fill="var(--bronze)" fillOpacity={0.07} />
      <path d={path(envelope)} fill="none" stroke="var(--grey)" strokeWidth={2} strokeDasharray="5 6" />
      <text x={x(valleyAge)} y={y(envelope(valleyAge) + 12)} textAnchor="middle" fontSize={15} fontStyle="italic" fill="var(--grey)" fontFamily="var(--font-serif, Georgia)">
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
        <path key={c.label} d={path(c.f)} fill="none" stroke="var(--ink)" strokeOpacity={c.opacity} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      {RIGHT_LABELS.map((l) => (
        <text key={l.label} x={x(AGE_MAX) + 10} y={l.y + 4} fontSize={13} fill={l.color} fillOpacity={l.opacity} fontFamily="var(--font-serif, Georgia)">
          {l.label}
        </text>
      ))}
    </svg>
  )
}
