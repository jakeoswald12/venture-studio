'use client'

import { useEffect, useRef, useState } from 'react'
import type { PlanYear } from '@/lib/data/plan'

/**
 * Two line charts on the same years, stacked so their x positions line up:
 * money on top (revenue up, overhead down, net through the middle), partner
 * schools below. Hovering or tapping either chart picks a year in both, and
 * the readouts above each chart show that year's numbers.
 */

const PAD_R = 16

/** Width of the element in CSS pixels, so the chart draws at its real size
 *  and its text stays readable on a phone. */
function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(1000)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w] as const
}

const money = (v: number) => {
  const a = Math.abs(v)
  const s = a >= 1e6 ? `$${(a / 1e6).toFixed(1)}M` : `$${Math.round(a / 1e3)}k`
  return v < 0 ? `−${s}` : s
}

interface Series {
  key: string
  label: string
  color: string
  width: number
  dash?: string
  value: (r: PlanYear) => number
  format: (v: number) => string
}

const MONEY: Series[] = [
  { key: 'students', label: 'Revenue from students', color: 'var(--bronze)', width: 3, value: (r) => r.revenueStudents, format: money },
  { key: 'companies', label: 'Revenue from companies', color: '#4f7c9c', width: 3, value: (r) => r.revenueCompanies, format: money },
  { key: 'overhead', label: 'Overhead', color: 'var(--grey)', width: 3, dash: '7 6', value: (r) => -r.overhead, format: money },
  { key: 'net', label: 'Net', color: 'var(--ink)', width: 4.5, value: (r) => r.net, format: money },
]

const PARTNERS: Series[] = [
  { key: 'hs', label: 'High schools', color: 'var(--bronze)', width: 3, value: (r) => r.highSchools, format: (v) => String(v) },
  { key: 'col', label: 'Colleges', color: 'var(--ink)', width: 3, value: (r) => r.colleges, format: (v) => String(v) },
]

function niceStep(range: number, ticks: number) {
  const raw = range / ticks
  const mag = 10 ** Math.floor(Math.log10(raw))
  const n = raw / mag
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag
}

function Chart({
  data,
  series,
  heights,
  active,
  setActive,
  axisFormat,
  label,
}: {
  data: PlanYear[]
  series: Series[]
  /** Height in pixels on wide and narrow screens. */
  heights: [number, number]
  active: number
  setActive: (i: number) => void
  axisFormat: (v: number) => string
  label: string
}) {
  const [ref, W] = useWidth()
  const narrow = W < 640
  const height = narrow ? heights[1] : heights[0]
  const PAD_L = narrow ? 52 : 70
  const font = narrow ? 11 : 13
  const top = 14
  const bottom = height - 30
  const values = data.flatMap((r) => series.map((s) => s.value(r)))
  const lo = Math.min(0, ...values)
  const hi = Math.max(0, ...values)
  const step = niceStep(hi - lo, 5)
  const min = Math.floor(lo / step) * step
  const max = Math.ceil(hi / step) * step
  const x = (i: number) => PAD_L + (i * (W - PAD_L - PAD_R)) / (data.length - 1)
  const y = (v: number) => bottom - ((v - min) / (max - min)) * (bottom - top)

  const ticks: number[] = []
  for (let v = min; v <= max + step / 2; v += step) ticks.push(v)

  function pick(e: React.PointerEvent<SVGRectElement>) {
    const box = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - box.left) / box.width) * (W - PAD_L - PAD_R)
    const i = Math.round((px / (W - PAD_L - PAD_R)) * (data.length - 1))
    setActive(Math.max(0, Math.min(data.length - 1, i)))
  }

  return (
    <div ref={ref}>
    <svg viewBox={`0 0 ${W} ${height}`} width={W} height={height} role="img" aria-label={label} className="plan-chart block h-auto w-full overflow-visible">
      {ticks.map((v) => (
        <g key={v}>
          <line x1={PAD_L} x2={W - PAD_R} y1={y(v)} y2={y(v)} stroke={v === 0 ? 'var(--ink)' : 'var(--line)'} strokeWidth={v === 0 ? 1.5 : 1} />
          <text x={PAD_L - 12} y={y(v) + 5} textAnchor="end" fontSize={font} fill="var(--grey)">
            {axisFormat(v)}
          </text>
        </g>
      ))}
      {data.map((r, i) => (narrow && i !== active && (i % 3 !== 0 || Math.abs(i - active) === 1) ? null :
        <text key={r.year} x={x(i)} y={height - 8} textAnchor="middle" fontSize={font} fill={i === active ? 'var(--ink)' : 'var(--grey)'}>
          {r.year}
        </text>
      ))}

      <line x1={x(active)} x2={x(active)} y1={top} y2={bottom} stroke="var(--faint)" strokeWidth="1" />

      {series.map((s) => (
        <g key={s.key}>
          <polyline
            points={data.map((r, i) => `${x(i)},${y(s.value(r))}`).join(' ')}
            fill="none"
            stroke={s.color}
            strokeWidth={s.width}
            strokeDasharray={s.dash}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={x(active)} cy={y(s.value(data[active]))} r={s.width + 2.5} fill={s.color} stroke="var(--paper)" strokeWidth="2" />
        </g>
      ))}

      <rect
        x={PAD_L}
        y={top}
        width={W - PAD_L - PAD_R}
        height={bottom - top}
        fill="transparent"
        onPointerMove={pick}
        onPointerDown={pick}
        style={{ cursor: 'crosshair', touchAction: 'pan-y' }}
      />
    </svg>
    </div>
  )
}

function Readout({ items }: { items: { label: string; value: string; color?: string; dash?: string }[] }) {
  return (
    <dl className="mb-5 flex flex-wrap gap-x-8 gap-y-3">
      {items.map((it) => (
        <div key={it.label} className="min-w-[8.5rem]">
          <dt className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
            {it.color && (
              <svg width="18" height="6" aria-hidden="true" className="flex-none">
                <line x1="0" x2="18" y1="3" y2="3" stroke={it.color} strokeWidth="3" strokeDasharray={it.dash} />
              </svg>
            )}
            {it.label}
          </dt>
          <dd className="mt-1 font-serif text-[1.45rem] font-semibold leading-none text-ink tabular-nums">{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function PlanCharts({ data }: { data: PlanYear[] }) {
  const [active, setActive] = useState(data.length - 1)
  const r = data[active]

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h3 className="text-[1.5rem] leading-tight">Revenue, overhead and net</h3>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-grey">{r.year}</span>
      </div>
      <Readout items={MONEY.map((s) => ({ label: s.label, value: s.format(s.value(r)), color: s.color, dash: s.dash }))} />
      <Chart
        data={data}
        series={MONEY}
        heights={[340, 260]}
        active={active}
        setActive={setActive}
        axisFormat={(v) => (v === 0 ? '$0' : money(v))}
        label="Projected revenue from students and companies, overhead and net, 2027 to 2036"
      />

      <div className="mb-3 mt-14 flex items-baseline justify-between gap-4">
        <h3 className="text-[1.5rem] leading-tight">Partner schools</h3>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-grey">{r.year}</span>
      </div>
      <Readout
        items={[
          ...PARTNERS.map((s) => ({ label: s.label, value: s.format(s.value(r)), color: s.color })),
          { label: 'Students per term', value: r.students.toLocaleString() },
          { label: 'Projects per term', value: String(r.projects) },
          { label: 'Paid staff', value: String(r.staff) },
        ]}
      />
      <Chart
        data={data}
        series={PARTNERS}
        heights={[230, 190]}
        active={active}
        setActive={setActive}
        axisFormat={(v) => String(v)}
        label="Projected partner high schools and colleges, 2027 to 2036"
      />
    </div>
  )
}
