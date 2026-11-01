/**
 * The studio flywheel, drawn in SVG.
 *
 * Four stations on a slowly turning dashed ring. The words that join them sit
 * just outside the ring, curved along it: great students who produce great
 * work, which attracts great founders, who bring great companies, which
 * attract great students. Partner schools feed students in from the left;
 * owners and operators come in from the right; new ventures come out the
 * bottom. Direction is shown by moving dashes, not arrowheads.
 *
 * Everything is lower case on purpose. Colours come from the site's CSS
 * variables, so it follows light and dark mode.
 */

const CX = 600
const CY = 370
const R = 250
const NODE = 96

const STATIONS = [
  { x: CX - R, y: CY, label: 'students' },
  { x: CX, y: CY - R, label: 'work' },
  { x: CX + R, y: CY, label: 'founders' },
  { x: CX, y: CY + R, label: 'companies' },
]

const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`
}

/**
 * Arcs for the joining words, concentric with the ring. On the top half the
 * path runs clockwise and the text sits on top of it; on the bottom half it
 * runs the other way so the text stays upright, on a slightly larger radius
 * so the letters clear the ring.
 */
const TOP = R + 22
const BOTTOM = R + 46
const LINKS = [
  { id: 'fw-l1', text: 'who produce', d: `M ${pt(TOP, 192)} A ${TOP} ${TOP} 0 0 1 ${pt(TOP, 258)}` },
  { id: 'fw-l2', text: 'which attracts', d: `M ${pt(TOP, 282)} A ${TOP} ${TOP} 0 0 1 ${pt(TOP, 348)}` },
  { id: 'fw-l3', text: 'who bring', d: `M ${pt(BOTTOM, 78)} A ${BOTTOM} ${BOTTOM} 0 0 0 ${pt(BOTTOM, 12)}` },
  { id: 'fw-l4', text: 'which attract', d: `M ${pt(BOTTOM, 168)} A ${BOTTOM} ${BOTTOM} 0 0 0 ${pt(BOTTOM, 102)}` },
]

export function Flywheel() {
  const bottom = CY + R + NODE
  return (
    <svg viewBox="0 0 1200 880" role="img" aria-labelledby="flywheel-title flywheel-desc" className="flywheel block h-auto w-full">
      <title id="flywheel-title">West Ventures flywheel</title>
      <desc id="flywheel-desc">
        Great students who produce great work, which attracts great founders, who bring great companies, which attract
        great students. Students come from elite Christian universities and high schools. Founders are proven owners
        and operators. New ventures come out of the companies.
      </desc>

      <defs>
        {LINKS.map((l) => (
          <path key={l.id} id={l.id} d={l.d} fill="none" />
        ))}
      </defs>

      {/* Inflows */}
      <g className="fw-flow">
        <line x1="20" y1={CY} x2={CX - R - NODE - 8} y2={CY} />
        <line x1="1180" y1={CY} x2={CX + R + NODE + 8} y2={CY} />
      </g>
      <g className="fw-caption">
        <text x="20" y={CY - 90}>elite christian</text>
        <text x="20" y={CY - 56}>universities and</text>
        <text x="20" y={CY - 22}>high schools</text>
        <text x="1180" y={CY - 56} textAnchor="end">proven owners</text>
        <text x="1180" y={CY - 22} textAnchor="end">and operators</text>
      </g>

      {/* New ventures */}
      <g className="fw-flow">
        <line x1={CX} y1={bottom + 6} x2={CX} y2={bottom + 74} />
      </g>
      <rect x={CX - 130} y={bottom + 76} width="260" height="62" rx="31" className="fw-spin" />
      <text x={CX} y={bottom + 115} textAnchor="middle" className="fw-spin-label">
        new ventures
      </text>

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
            great
          </text>
          <text x={s.x} y={s.y + 26} textAnchor="middle" className="fw-label">
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
