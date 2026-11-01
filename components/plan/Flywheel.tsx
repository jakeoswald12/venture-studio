/**
 * The studio flywheel, drawn in SVG.
 *
 * Four stations on a slowly turning dashed ring: students do work, work brings
 * founders, founders bring companies, companies bring students. Students and
 * founders flow in from either side; joint ventures and startups flow out the
 * bottom. Direction is shown by moving dashes, not arrowheads.
 *
 * Colours come from the site's CSS variables, so it follows light and dark mode.
 */

const CX = 500
const CY = 320
const R = 200

const STATIONS = [
  { x: CX - R, y: CY, label: 'Students' },
  { x: CX, y: CY - R, label: 'Work' },
  { x: CX + R, y: CY, label: 'Founders' },
  { x: CX, y: CY + R, label: 'Companies' },
]

export function Flywheel() {
  return (
    <svg viewBox="0 0 1000 810" role="img" aria-labelledby="flywheel-title flywheel-desc" className="flywheel block h-auto w-full">
      <title id="flywheel-title">West Ventures flywheel</title>
      <desc id="flywheel-desc">
        Students do work for founders. Good work brings more founders, founders bring companies, and companies bring
        more students. New students and founders enter from outside. Joint ventures and startups spin out of the
        companies.
      </desc>

      {/* Inflows */}
      <g className="fw-flow fw-in">
        <line x1="20" y1={CY} x2={CX - R - 74} y2={CY} />
        <line x1="980" y1={CY} x2={CX + R + 74} y2={CY} />
      </g>
      <g className="fw-caption">
        <text x="20" y={CY - 26}>New students</text>
        <text x="20" y={CY + 44} className="fw-sub">High school and college</text>
        <text x="980" y={CY - 26} textAnchor="end">New founders</text>
        <text x="980" y={CY + 44} textAnchor="end" className="fw-sub">Projects at no charge</text>
      </g>

      {/* Spin-offs */}
      <g className="fw-flow fw-out">
        <path d={`M${CX} ${CY + R + 74} C ${CX} ${CY + R + 130}, 330 ${CY + R + 120}, 330 ${CY + R + 170}`} />
        <path d={`M${CX} ${CY + R + 74} C ${CX} ${CY + R + 130}, 670 ${CY + R + 120}, 670 ${CY + R + 170}`} />
      </g>
      {[
        { x: 330, label: 'Joint ventures' },
        { x: 670, label: 'Startups' },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 118} y={CY + R + 172} width="236" height="58" rx="29" className="fw-spin" />
          <text x={s.x} y={CY + R + 209} textAnchor="middle" className="fw-spin-label">
            {s.label}
          </text>
        </g>
      ))}
      <text x={CX} y={CY + R + 278} textAnchor="middle" className="fw-caption fw-sub">
        Owned in part or in full by West Ventures
      </text>

      {/* Ring */}
      <circle cx={CX} cy={CY} r={R} className="fw-track" />
      <g className="fw-ring" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <circle cx={CX} cy={CY} r={R} className="fw-dash" />
      </g>

      {/* Stations */}
      {STATIONS.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="72" className="fw-node" />
          <text x={s.x} y={s.y + 9} textAnchor="middle" className="fw-label">
            {s.label}
          </text>
        </g>
      ))}

      <text x={CX} y={CY + 8} textAnchor="middle" className="fw-center">
        West Ventures
      </text>
    </svg>
  )
}
