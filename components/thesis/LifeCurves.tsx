/**
 * What a builder has, by age: an illustrative chart for the Sculptures vs
 * Fossils essay. Cultural savvy, energy, time and risk tolerance run high
 * early and fall; wisdom, information, network and capital start low and
 * rise. Two shaded bands mark the groups the essay pairs up: the diggers
 * (about 16 to 24) and the paleontologists (about 40 to 70).
 *
 * The curves are shapes, not measurements: smooth logistic curves chosen to
 * show the pattern. The caption says so.
 */

const W = 760
const H = 420
const PAD_L = 44
const PAD_R = 112
const PAD_T = 48
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
  // Understanding the times and keeping up with the trends: high in youth, gone by about 30.
  { label: 'Cultural savvy', f: falling(98, 9, 29, 2.2), opacity: 0.85 },
  { label: 'Energy', f: falling(96, 14, 33, 6), opacity: 1 },
  // Time falls with work and family, then climbs back after about 65.
  { label: 'Time', f: (a: number) => falling(87, 10, 27, 4.5)(a) + 62 / (1 + Math.exp(-(a - 68) / 3)), opacity: 0.7 },
  { label: 'Risk tolerance', f: falling(77, 8, 31, 5), opacity: 0.45 },
]
const OLD = [
  { label: 'Wisdom', f: rising(6, 93, 43, 8), opacity: 1 },
  // Network grows through the 20s to 40s, then keeps growing, more slowly.
  { label: 'Network', f: (a: number) => rising(5, 72, 34, 6)(a) + rising(0, 14, 62, 10)(a), opacity: 0.75 },
  // Information climbs fast after 20, peaks around 40, holds to 50, then drops off after about 65.
  { label: 'Information', f: (a: number) => rising(8, 82, 30, 3.5)(a) - 40 / (1 + Math.exp(-(a - 68) / 6)), opacity: 0.55 },
  // Capital builds slowly at first, compounds through mid-career, and levels off after about 65.
  { label: 'Capital', f: rising(3, 74, 48, 9), opacity: 0.38 },
]

const AGES = Array.from({ length: (AGE_MAX - AGE_MIN) * 2 + 1 }, (_, i) => AGE_MIN + i / 2)
const path = (f: (a: number) => number) => AGES.map((a, i) => `${i ? 'L' : 'M'}${x(a).toFixed(1)},${y(f(a)).toFixed(1)}`).join('')

// The two groups the essay pairs up, as bands across the chart.
const GROUPS = [
  { name: 'Young builders', from: 16, to: 24, color: 'var(--bronze)', shade: 0.08 },
  { name: 'Seasoned operators', from: 40, to: 70, color: 'var(--ink)', shade: 0.045 },
]

// Labels at the left end, just above each falling curve, nudged apart.
const LEFT_LABELS = (() => {
  const items = YOUNG.map((c) => ({ label: c.label, y: y(c.f(AGE_MIN)) - 8 })).sort((p, q) => p.y - q.y)
  items[0].y = Math.max(items[0].y, PAD_T + 12)
  for (let i = 1; i < items.length; i += 1) items[i].y = Math.max(items[i].y, items[i - 1].y + 17)
  return items
})()

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
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-labelledby="life-curves-title life-curves-desc">
      <title id="life-curves-title">What a builder has, by age</title>
      <desc id="life-curves-desc">
        Cultural savvy, energy, time and risk tolerance are highest at 15 and fall with age; cultural savvy drops sharply around 30. Wisdom, information, network and capital are
        lowest at 15 and rise with age. Shaded bands mark two groups: young builders, about 16 to 24, and seasoned operators, about 40 to 70.
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

      {/* The two groups */}
      {GROUPS.map((g) => (
        <g key={g.name}>
          <rect x={x(g.from)} y={PAD_T - 34} width={x(g.to) - x(g.from)} height={H - PAD_B - PAD_T + 34} rx={6} fill={g.color} fillOpacity={g.shade} />
          <text x={(x(g.from) + x(g.to)) / 2} y={PAD_T - 14} textAnchor="middle" fontSize={15} fontStyle="italic" fill={g.color} fontFamily="var(--font-serif, Georgia)">
            {g.name}
          </text>
        </g>
      ))}

      {/* Curves */}
      {YOUNG.map((c) => (
        <path key={c.label} d={path(c.f)} fill="none" stroke="var(--bronze)" strokeOpacity={c.opacity} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      {LEFT_LABELS.map((l) => (
        <text key={l.label} x={x(AGE_MIN) + 4} y={l.y} fontSize={13} fill="var(--bronze)" fontFamily="var(--font-serif, Georgia)">
          {l.label}
        </text>
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
