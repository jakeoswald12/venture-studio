/**
 * The studio flywheel, drawn in SVG.
 *
 * Four stations on a slowly turning dashed ring, joined by the words that
 * connect them: great students produce great work, which attracts great
 * founders, who bring great companies, which attract great students. New
 * students and founders flow in from either side; joint ventures flow out the
 * bottom. Direction is shown by moving dashes, not arrowheads.
 *
 * Colours come from the site's CSS variables, so it follows light and dark mode.
 */

const CX = 500
const CY = 370
const R = 250
const NODE = 96

const STATIONS = [
  { x: CX - R, y: CY, label: 'Students' },
  { x: CX, y: CY - R, label: 'Work' },
  { x: CX + R, y: CY, label: 'Founders' },
  { x: CX, y: CY + R, label: 'Companies' },
]

/** The words on the ring between stations, clockwise from Students. */
const D = R * Math.SQRT1_2 + 46
const LINKS = [
  { x: CX - D, y: CY - D, text: 'produce', anchor: 'end' },
  { x: CX + D, y: CY - D, text: 'which attracts', anchor: 'start' },
  { x: CX + D, y: CY + D + 14, text: 'who bring', anchor: 'start' },
  { x: CX - D, y: CY + D + 14, text: 'which attract', anchor: 'end' },
] as const

export function Flywheel() {
  const bottom = CY + R + NODE
  return (
    <svg viewBox="0 0 1000 880" role="img" aria-labelledby="flywheel-title flywheel-desc" className="flywheel block h-auto w-full">
      <title id="flywheel-title">West Ventures flywheel</title>
      <desc id="flywheel-desc">
        Great students produce great work, which attracts great founders, who bring great companies, which attract
        great students. New students and new founders enter from outside. Joint ventures come out of the companies.
      </desc>

      {/* Inflows */}
      <g className="fw-flow">
        <line x1="10" y1={CY} x2={CX - R - NODE - 6} y2={CY} />
        <line x1="990" y1={CY} x2={CX + R + NODE + 6} y2={CY} />
      </g>
      <g className="fw-caption">
        <text x="10" y={CY - 56}>New</text>
        <text x="10" y={CY - 22}>students</text>
        <text x="990" y={CY - 56} textAnchor="end">New</text>
        <text x="990" y={CY - 22} textAnchor="end">founders</text>
      </g>

      {/* Joint ventures */}
      <g className="fw-flow">
        <line x1={CX} y1={bottom + 6} x2={CX} y2={bottom + 74} />
      </g>
      <rect x={CX - 130} y={bottom + 76} width="260" height="62" rx="31" className="fw-spin" />
      <text x={CX} y={bottom + 115} textAnchor="middle" className="fw-spin-label">
        Joint ventures
      </text>

      {/* Ring */}
      <circle cx={CX} cy={CY} r={R} className="fw-track" />
      <g className="fw-ring" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <circle cx={CX} cy={CY} r={R} className="fw-dash" />
      </g>

      {/* Words between stations */}
      {LINKS.map((l) => (
        <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor} className="fw-link">
          {l.text}
        </text>
      ))}

      {/* Stations */}
      {STATIONS.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r={NODE} className="fw-node" />
          <text x={s.x} y={s.y - 6} textAnchor="middle" className="fw-great">
            Great
          </text>
          <text x={s.x} y={s.y + 26} textAnchor="middle" className="fw-label">
            {s.label.toLowerCase()}
          </text>
        </g>
      ))}
    </svg>
  )
}
