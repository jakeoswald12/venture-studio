/**
 * The studio flywheel, drawn in SVG.
 *
 * Four stations on a slowly turning dashed ring. The words that join them sit
 * just outside the ring, curved along it: great students who produce excellent
 * work, which attracts proven operators, who identify big opportunities, which
 * attract great students.
 *
 * Everything is lower case on purpose. Colours come from the site's CSS
 * variables, so it follows light and dark mode.
 */

const SIZE = 760
const CX = SIZE / 2
const CY = SIZE / 2
const R = 250
const NODE = 106

const STATIONS = [
  { x: CX - R, y: CY, top: 'great', label: 'students' },
  { x: CX, y: CY - R, top: 'excellent', label: 'work' },
  { x: CX + R, y: CY, top: 'proven', label: 'operators' },
  { x: CX, y: CY + R, top: 'big', label: 'opportunities' },
]

const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`
}

/**
 * Arcs for the joining words, concentric with the ring and clear of the
 * station circles. On the top half the path runs clockwise and the text sits
 * on top of it; on the bottom half it runs the other way so the text stays
 * upright, on a slightly larger radius so the letters clear the ring.
 */
const TOP = R + 20
const BOTTOM = R + 44
const LINKS = [
  { id: 'fw-l1', text: 'who produce', d: `M ${pt(TOP, 204)} A ${TOP} ${TOP} 0 0 1 ${pt(TOP, 246)}` },
  { id: 'fw-l2', text: 'which attracts', d: `M ${pt(TOP, 294)} A ${TOP} ${TOP} 0 0 1 ${pt(TOP, 336)}` },
  { id: 'fw-l3', text: 'who identify', d: `M ${pt(BOTTOM, 66)} A ${BOTTOM} ${BOTTOM} 0 0 0 ${pt(BOTTOM, 24)}` },
  { id: 'fw-l4', text: 'which attract', d: `M ${pt(BOTTOM, 156)} A ${BOTTOM} ${BOTTOM} 0 0 0 ${pt(BOTTOM, 114)}` },
]

export function Flywheel() {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-labelledby="flywheel-title flywheel-desc" className="flywheel block h-auto w-full">
      <title id="flywheel-title">West Ventures flywheel</title>
      <desc id="flywheel-desc">
        Great students who produce excellent work, which attracts proven operators, who identify big opportunities,
        which attract great students.
      </desc>

      <defs>
        {LINKS.map((l) => (
          <path key={l.id} id={l.id} d={l.d} fill="none" />
        ))}
      </defs>

      {/* Ring */}
      <circle cx={CX} cy={CY} r={R} className="fw-track" />
      <g className="fw-ring" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <circle cx={CX} cy={CY} r={R} className="fw-dash" />
      </g>

      {/* Joining words, curved outside the ring */}
      {LINKS.map((l) => (
        <text key={l.id} className="fw-link">
          <textPath href={`#${l.id}`} startOffset="50%" textAnchor="middle">
            {l.text}
          </textPath>
        </text>
      ))}

      {/* Stations */}
      {STATIONS.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r={NODE} className="fw-node" />
          <text x={s.x} y={s.y - 6} textAnchor="middle" className="fw-great">
            {s.top}
          </text>
          <text x={s.x} y={s.y + 25} textAnchor="middle" className="fw-label">
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
