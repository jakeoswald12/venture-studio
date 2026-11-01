/**
 * Illustrations for the Thesis page. All are vector, drawn in one brand colour
 * at five steps (--g1 lightest to --g5 bronze, --g6 darkest; see globals.css),
 * so they match each other and follow light and dark mode. A few loop slowly;
 * all stop for visitors who prefer reduced motion.
 */

/* ─── Context: a classical facade with the sun rising behind it ─────────── */

export function Dawn() {
  const cx = 400
  const cy = 178
  const rays = Array.from({ length: 14 }, (_, i) => {
    const a = Math.PI + (i / 13) * Math.PI
    return {
      x1: cx + Math.cos(a) * 112,
      y1: cy + Math.sin(a) * 112,
      x2: cx + Math.cos(a) * (150 + (i % 2) * 26),
      y2: cy + Math.sin(a) * (150 + (i % 2) * 26),
    }
  })
  const cols = Array.from({ length: 6 }, (_, i) => 292 + i * 43)
  return (
    <svg viewBox="0 0 800 300" role="img" aria-label="A classical building with the sun rising behind it" className="illo block h-auto w-full">
      <defs>
        <clipPath id="dawn-sky">
          <rect x="0" y="0" width="800" height="250" />
        </clipPath>
      </defs>
      <g clipPath="url(#dawn-sky)">
        <g className="illo-ray" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          {rays.map((r, i) => (
            <line key={i} {...r} stroke="var(--g3)" strokeWidth="2" strokeLinecap="round" />
          ))}
        </g>
        <g className="illo-sun">
          <circle cx={cx} cy={cy} r="96" fill="var(--g2)" />
          <circle cx={cx} cy={cy} r="70" fill="var(--g3)" />
        </g>
        {/* Facade */}
        <path d="M262 136 L400 92 L538 136 Z" fill="var(--paper)" stroke="var(--g5)" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="262" y="136" width="276" height="12" fill="var(--paper)" stroke="var(--g5)" strokeWidth="2.5" />
        {cols.map((x) => (
          <rect key={x} x={x - 8} y="148" width="16" height="90" fill="var(--paper)" stroke="var(--g5)" strokeWidth="2.5" />
        ))}
        <rect x="250" y="238" width="300" height="12" fill="var(--paper)" stroke="var(--g5)" strokeWidth="2.5" />
      </g>
      <line x1="20" x2="780" y1="250" y2="250" stroke="var(--g5)" strokeWidth="2.5" />
      {[266, 282, 298].map((y, i) => (
        <line key={y} x1={80 + i * 60} x2={720 - i * 60} y1={y} y2={y} stroke="var(--g2)" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/* ─── Model: many students matched to fewer operators ───────────────────── */

export function Matchmaking() {
  const students: [number, number][] = []
  for (let r = 0; r < 9; r += 1) for (let c = 0; c < 10; c += 1) students.push([60 + c * 19, 70 + r * 26])
  const kings: [number, number][] = []
  for (let r = 0; r < 5; r += 1) for (let c = 0; c < 2; c += 1) kings.push([660 + c * 60, 90 + r * 48])
  const pairs = [
    [12, 0], [27, 3], [45, 1], [58, 6], [73, 4], [8, 2], [36, 8], [81, 9], [19, 5], [64, 7], [50, 3], [3, 1],
  ]
  return (
    <svg viewBox="0 0 800 340" role="img" aria-label="Thousands of students matched to hundreds of operators" className="illo block h-auto w-full">
      <text x="60" y="38" className="mono" fontSize="12">Students · thousands</text>
      <text x="740" y="38" textAnchor="end" className="mono" fontSize="12">Operators · hundreds</text>
      {pairs.map(([s, k], i) => {
        const [x1, y1] = students[s]
        const [x2, y2] = kings[k]
        return (
          <path
            key={i}
            d={`M${x1} ${y1} C ${x1 + 220} ${y1}, ${x2 - 220} ${y2}, ${x2} ${y2}`}
            fill="none"
            stroke="var(--g4)"
            strokeWidth="1.6"
            pathLength={1}
            className="illo-link"
            style={{ animationDelay: `${(i * 0.47) % 6}s` }}
          />
        )
      })}
      {students.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={i % 7 === 0 ? 'var(--g4)' : 'var(--g3)'} />
      ))}
      {kings.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="13" fill="var(--g5)" />
      ))}
    </svg>
  )
}

/* ─── Evidence: J. J. Thomson's students, and Rutherford's ──────────────── */

export function NobelTree() {
  const root = { x: 450, y: 46 }
  const first = [
    { name: 'W. L. Bragg', year: '1915' },
    { name: 'C. G. Barkla', year: '1917' },
    { name: 'F. W. Aston', year: '1922' },
    { name: 'E. Rutherford', year: '1908' },
    { name: 'C. T. R. Wilson', year: '1927' },
    { name: 'O. W. Richardson', year: '1928' },
    { name: 'E. V. Appleton', year: '1947' },
    { name: 'G. P. Thomson', year: '1937 · son', son: true },
  ].map((n, i) => ({ ...n, x: 62 + i * 111, y: 168 }))
  const rutherford = first[3]
  const second = [
    { name: 'J. Chadwick', year: '1935' },
    { name: 'P. M. S. Blackett', year: '1948' },
    { name: 'J. Cockcroft, E. Walton', year: '1951' },
  ].map((n, i) => ({ ...n, x: 240 + i * 150, y: 292 }))
  const curve = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    `M${a.x} ${a.y} C ${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y}`
  return (
    <svg viewBox="0 0 900 340" role="img" aria-label="Nobel laureates trained by J. J. Thomson, and by his student Ernest Rutherford" className="illo block h-auto w-full min-w-[680px]">
      {first.map((n) => (
        <path key={n.name} d={curve(root, n)} fill="none" stroke={n.son ? 'var(--g3)' : 'var(--g4)'} strokeWidth="1.6" strokeDasharray={n.son ? '4 5' : undefined} />
      ))}
      {second.map((n) => (
        <path key={n.name} d={curve({ x: rutherford.x, y: rutherford.y + 50 }, n)} fill="none" stroke="var(--g4)" strokeWidth="1.6" />
      ))}
      <circle cx={root.x} cy={root.y} r="12" fill="var(--g5)" />
      <text x={root.x + 22} y={root.y - 2} className="serif" fontSize="17">J. J. Thomson</text>
      <text x={root.x + 22} y={root.y + 17} className="mono" fontSize="11">Nobel 1906</text>
      {first.map((n) => (
        <g key={n.name}>
          <circle cx={n.x} cy={n.y} r="8" fill={n.son ? 'var(--g3)' : 'var(--g5)'} />
          <text x={n.x} y={n.y + 26} textAnchor="middle" className="serif" fontSize="13.5">{n.name}</text>
          <text x={n.x} y={n.y + 42} textAnchor="middle" className="mono" fontSize="10">{n.year}</text>
        </g>
      ))}
      {second.map((n) => (
        <g key={n.name}>
          <circle cx={n.x} cy={n.y} r="7" fill="var(--g4)" />
          <text x={n.x} y={n.y + 24} textAnchor="middle" className="serif" fontSize="13.5">{n.name}</text>
          <text x={n.x} y={n.y + 40} textAnchor="middle" className="mono" fontSize="10">{n.year}</text>
        </g>
      ))}
    </svg>
  )
}

/* ─── Ideas: the first idea versus the fourth and fifth ─────────────────── */

export function NextIdeas() {
  const box = 56
  return (
    <svg viewBox="0 0 800 250" role="img" aria-label="An 18-year-old has one untested idea; a founder who has built three companies has ideas for the fourth and fifth" className="illo block h-auto w-full">
      <text x="20" y="44" className="mono" fontSize="12">Age 18</text>
      <rect x="250" y="20" width={box} height={box} rx="8" fill="none" stroke="var(--g3)" strokeWidth="2" strokeDasharray="5 6" />
      <text x={250 + box / 2} y={20 + box / 2 + 8} textAnchor="middle" className="serif" fontSize="24" style={{ fill: 'var(--g4)' }}>?</text>
      <text x="330" y="54" fontSize="14">First idea, no experience</text>

      <line x1="20" x2="780" y1="118" y2="118" stroke="var(--line)" />

      <text x="20" y="184" className="mono" fontSize="12">After three companies</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={250 + i * 72} y="158" width={box} height={box} rx="8" fill="var(--g5)" />
          <text x={250 + i * 72 + box / 2} y="192" textAnchor="middle" fontSize="15" style={{ fill: 'var(--paper)' }}>{i + 1}</text>
        </g>
      ))}
      {[3, 4].map((i) => (
        <g key={i} className="illo-pulse" style={{ animationDelay: `${(i - 3) * 0.6}s` }}>
          <rect x={250 + i * 72} y="158" width={box} height={box} rx="8" fill="var(--g1)" stroke="var(--g4)" strokeWidth="2" strokeDasharray="5 6" />
          <text x={250 + i * 72 + box / 2} y="192" textAnchor="middle" fontSize="15" style={{ fill: 'var(--g5)' }}>{i + 1}</text>
        </g>
      ))}
      <text x="620" y="182" fontSize="14">Built three.</text>
      <text x="620" y="202" fontSize="14">Knows the next two.</text>
    </svg>
  )
}

/* ─── Ideas: a sculpture is made; a fossil is found ─────────────────────── */

export function SculptureFossil() {
  return (
    <svg viewBox="0 0 800 330" role="img" aria-label="Left, a block of marble with an uncertain figure. Right, a dinosaur skeleton uncovered in layers of rock." className="illo block h-auto w-full">
      <defs>
        <clipPath id="dig-panel">
          <rect x="420" y="40" width="360" height="230" rx="10" />
        </clipPath>
      </defs>

      {/* Sculpture */}
      <rect x="60" y="56" width="260" height="198" rx="6" fill="var(--g1)" stroke="var(--g3)" strokeWidth="2" />
      <path d="M190 90 c-22 0 -30 22 -24 40 c-20 10 -30 40 -26 80 M190 90 c22 0 30 22 24 40 c20 10 30 40 26 80" fill="none" stroke="var(--g3)" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
      {[
        [90, 80, 120, 70], [250, 210, 285, 196], [96, 226, 128, 238], [262, 84, 292, 98], [110, 150, 128, 160],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--g4)" strokeWidth="2" strokeLinecap="round" />
      ))}
      <text x="190" y="294" textAnchor="middle" className="mono" fontSize="12">Sculpture · made from nothing</text>

      {/* Fossil */}
      <g clipPath="url(#dig-panel)">
        {[40, 98, 156, 214].map((y, i) => (
          <rect key={y} x="420" y={y} width="360" height="58" fill={i % 2 ? 'var(--g2)' : 'var(--g1)'} />
        ))}
        <g fill="none" stroke="var(--g6)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* tail, back and neck */}
          <path d="M436 214 C 476 210, 520 192, 556 172 C 590 154, 630 150, 664 152 C 680 153, 690 146, 698 136" />
          {/* vertebrae */}
          {[[470, 210], [500, 202], [528, 189], [584, 158], [612, 152], [640, 151]].map(([x, y]) => (
            <path key={x} d={`M${x} ${y} l -2 -11`} />
          ))}
          {/* skull and jaw */}
          <path d="M694 140 L 704 118 L 732 112 L 766 124 L 770 136 L 736 140 L 700 146 Z" />
          <path d="M702 148 L 736 146 L 768 140 L 764 152 L 730 158 L 706 156 Z" />
          <circle cx="720" cy="124" r="5" />
          {[742, 752, 762].map((x) => (
            <path key={x} d={`M${x} ${138 - (x - 742) / 5} l 0 6`} strokeWidth="2.5" />
          ))}
          {/* ribs */}
          {[594, 610, 626, 642, 656].map((x, i) => (
            <path key={x} d={`M${x} ${156 - (i === 0 ? 0 : 2)} q 4 ${26 - i * 2} -6 ${46 - i * 5}`} />
          ))}
          {/* arm */}
          <path d="M664 172 l 10 12 l 8 -2" strokeWidth="2.5" />
          {/* hips and hind legs */}
          <path d="M548 176 c 10 -6, 26 -6, 34 2" />
          <path d="M566 178 L 590 214 L 572 246 L 600 254" />
          <path d="M552 182 L 566 220 L 548 250 L 574 258" />
        </g>
        <g className="illo-dig">
          <rect x="420" y="40" width="380" height="230" fill="var(--g2)" />
          {[70, 110, 150, 190, 230].map((y, i) => (
            <path key={y} d={`M420 ${y} q 90 ${i % 2 ? 8 : -8} 180 0 t 180 0`} fill="none" stroke="var(--g3)" strokeWidth="2" />
          ))}
          <rect x="420" y="40" width="10" height="230" fill="var(--g4)" />
        </g>
      </g>
      <rect x="420" y="40" width="360" height="230" rx="10" fill="none" stroke="var(--g3)" strokeWidth="2" />
      <text x="600" y="294" textAnchor="middle" className="mono" fontSize="12">Fossil · already there, found</text>
    </svg>
  )
}
