'use client'

/**
 * The interactive pieces of the booklet. In the viewer they respond to taps;
 * in print they render their complete resting state.
 */

import { useState } from 'react'
import type { Party } from '@/lib/booklets/audiences'

type Mode = 'view' | 'print'

/* ─── A term, week by week ───────────────────────────────────────────────── */

const WEEKS = 14
function weekInfo(w: number) {
  if (w === 1) return { kind: 'scope', title: 'Week 1 · Scope', text: 'The founder and the project advisor write the scope: what the team will deliver, week by week. The team meets the founder.' }
  if (w === WEEKS) return { kind: 'deliver', title: `Week ${WEEKS} · Delivery`, text: 'The team delivers and hands the work over. Students are evaluated by their project advisor; the founder evaluates the project.' }
  return { kind: 'build', title: `Week ${w} · Build`, text: 'Two meetings: an internal one with the project advisor on tasks and blockers, and one with the founder to review the work.' }
}

export function TermStrip({ mode }: { mode: Mode }) {
  const [week, setWeek] = useState(1)
  const info = weekInfo(week)
  const view = mode === 'view'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="bk-label">A fall or spring term</span>
        {view && <span className="bk-label bk-hide-flow">Select a week</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${WEEKS}, 1fr)`, gap: 'calc(4 * var(--u))', marginTop: 'calc(10 * var(--u))' }}>
        {Array.from({ length: WEEKS }, (_, i) => {
          const w = i + 1
          const k = weekInfo(w).kind
          const active = view && w === week
          const bg = k === 'scope' ? 'var(--bk-bronze)' : k === 'deliver' ? 'var(--bk-ink)' : 'transparent'
          return (
            <button
              key={w}
              type="button"
              disabled={!view}
              onClick={() => setWeek(w)}
              aria-label={`Week ${w}`}
              aria-pressed={active}
              style={{
                cursor: view ? 'pointer' : 'default',
                height: 'calc(44 * var(--u))',
                borderRadius: 'calc(3 * var(--u))',
                border: `1px solid ${k === 'build' ? 'var(--bk-line)' : bg}`,
                background: bg,
                outline: active ? `calc(2 * var(--u)) solid var(--bk-bronze)` : 'none',
                outlineOffset: 'calc(2 * var(--u))',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'calc(4 * var(--u))',
                padding: 0,
                transition: 'outline-color .3s, transform .3s',
                transform: active ? 'translateY(calc(-2 * var(--u)))' : 'none',
              }}
            >
              {k === 'build' ? (
                <>
                  <span style={{ width: 'calc(5 * var(--u))', height: 'calc(5 * var(--u))', borderRadius: '50%', background: 'var(--bk-faint)' }} />
                  <span style={{ width: 'calc(5 * var(--u))', height: 'calc(5 * var(--u))', borderRadius: '50%', background: 'var(--bk-bronze)' }} />
                </>
              ) : null}
            </button>
          )
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${WEEKS}, 1fr)`, gap: 'calc(4 * var(--u))', marginTop: 'calc(5 * var(--u))' }}>
        {Array.from({ length: WEEKS }, (_, i) => (
          <span key={i} className="bk-label" style={{ textAlign: 'center', letterSpacing: 0, fontSize: 'calc(7 * var(--u))' }}>
            {i + 1}
          </span>
        ))}
      </div>
      {view ? (
        <div key={week} className="bk-fade" style={{ marginTop: 'calc(12 * var(--u))', minHeight: 'calc(58 * var(--u))' }}>
          <p className="bk-h3" style={{ fontSize: 'calc(14 * var(--u))' }}>{info.title}</p>
          <p className="bk-small" style={{ margin: 'calc(4 * var(--u)) 0 0' }}>{info.text}</p>
        </div>
      ) : (
        <p className="bk-small" style={{ marginTop: 'calc(10 * var(--u))', color: 'var(--bk-grey)' }}>
          <Legend color="var(--bk-bronze)" /> Scope &nbsp;&nbsp; <Dot c="var(--bk-faint)" /> Internal meeting &nbsp;&nbsp;
          <Dot c="var(--bk-bronze)" /> Founder meeting &nbsp;&nbsp; <Legend color="var(--bk-ink)" /> Delivery
        </p>
      )}
    </div>
  )
}

const Legend = ({ color }: { color: string }) => (
  <span style={{ display: 'inline-block', width: '0.8em', height: '0.8em', background: color, borderRadius: 2, verticalAlign: '-0.05em' }} />
)
const Dot = ({ c }: { c: string }) => (
  <span style={{ display: 'inline-block', width: '0.5em', height: '0.5em', background: c, borderRadius: '50%', verticalAlign: '0.05em' }} />
)

/* ─── Expectations ───────────────────────────────────────────────────────── */

export function Expectations({
  mode,
  parties,
  labels,
  terms,
}: {
  mode: Mode
  parties: Party[]
  labels: Record<Party, string>
  terms: Record<Party, string[]>
}) {
  const [sel, setSel] = useState<Party>(parties[0])

  if (mode === 'print') {
    return (
      <div className="bk-cols c2" style={{ rowGap: 'calc(12 * var(--u))' }}>
        {parties.map((p) => (
          <div key={p}>
            <h3 className="bk-h3" style={{ fontSize: 'calc(15 * var(--u))' }}>{labels[p]}</h3>
            <ul className="bk-small" style={{ margin: 'calc(4 * var(--u)) 0 0', paddingLeft: '1.05em', fontSize: 'calc(11.4 * var(--u))', lineHeight: 1.45 }}>
              {terms[p].map((t) => (
                <li key={t} style={{ marginTop: 'calc(1 * var(--u))' }}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="bk-tabs" role="tablist">
        {parties.map((p) => (
          <button key={p} type="button" role="tab" className="bk-tab" aria-selected={p === sel} onClick={() => setSel(p)}>
            {labels[p]}
          </button>
        ))}
      </div>
      <div key={sel} className="bk-fade" role="tabpanel" style={{ marginTop: 'calc(22 * var(--u))' }}>
        <ol className="bk-steps">
          {terms[sel].map((t, i) => (
            <li key={t}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span style={{ color: 'var(--bk-ink)', fontSize: 'calc(15.5 * var(--u))' }}>{t}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="bk-small bk-hide-flow" style={{ marginTop: 'calc(18 * var(--u))', color: 'var(--bk-grey)' }}>
        Select a party above to see its commitments.
      </p>
    </div>
  )
}

/* ─── Price estimator ────────────────────────────────────────────────────── */

const TERMS = ['Fall', 'Spring', 'Summer'] as const

export function PriceEstimator({ mode, price }: { mode: Mode; price: number }) {
  const [on, setOn] = useState<Record<string, boolean>>({ Fall: true, Spring: true, Summer: false })
  const count = TERMS.filter((t) => on[t]).length
  const fmt = (v: number) => `$${v.toLocaleString('en-US')}`

  if (mode === 'print') {
    return (
      <div className="bk-cols c3" style={{ borderTop: '1px solid var(--bk-line)', paddingTop: 'calc(16 * var(--u))' }}>
        {[1, 2, 3].map((k) => (
          <div key={k}>
            <p className="bk-label">{k === 1 ? 'One term' : k === 2 ? 'Fall and spring' : 'Full year'}</p>
            <p className="bk-stat-num is-m" style={{ marginTop: 'calc(6 * var(--u))' }}>{fmt(price * k)}</p>
            <p className="bk-stat-label">{3 * k} credit hours ({6 * k} as team leader)</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ borderTop: '1px solid var(--bk-line)', paddingTop: 'calc(16 * var(--u))' }}>
      <p className="bk-label">Estimate a year</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: 'calc(16 * var(--u))', marginTop: 'calc(10 * var(--u))' }}>
        <div className="bk-tabs">
          {TERMS.map((t) => (
            <button key={t} type="button" className="bk-btn" aria-pressed={!!on[t]} onClick={() => setOn((s) => ({ ...s, [t]: !s[t] }))}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="bk-stat-num is-m" style={{ margin: 0 }}>{fmt(price * count)}</p>
          <p className="bk-stat-label" style={{ marginTop: 'calc(4 * var(--u))' }}>
            {count === 0 ? 'Select a term' : `${count} term${count > 1 ? 's' : ''} · ${3 * count} credit hours (${6 * count} as team leader), before scholarships`}
          </p>
        </div>
      </div>
    </div>
  )
}
