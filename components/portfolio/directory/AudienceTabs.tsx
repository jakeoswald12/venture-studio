'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

/**
 * One section, three audiences. The founder / executive / student pitches
 * share a structure — same two-column split, same rhythm — so they sit in one
 * tabbed panel rather than three stacked bands: the reader either scrolls past
 * the whole thing or stops and clicks through it, and because the panels share
 * a grid cell, the structure holds still while the content exchanges.
 *
 * Switching fades the outgoing panel out, swaps, then fades the incoming one
 * in. Every panel stays in the DOM, so nothing is lost to a crawler and the
 * height is set by the tallest — no jump between tabs.
 */

export interface AudienceTab {
  id: string
  label: string
  content: React.ReactNode
}

/** Milliseconds the outgoing panel takes to clear before the swap. */
const FADE_OUT = 210

export function AudienceTabs({
  tabs,
  label,
  className = '',
}: {
  tabs: AudienceTab[]
  /** Names the tablist for screen readers — one page carries more than one. */
  label: string
  className?: string
}) {
  const uid = useId().replace(/:/g, '')
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const select = useCallback(
    (next: number) => {
      if (next === active) return
      if (timer.current) clearTimeout(timer.current)
      setShown(false)
      timer.current = setTimeout(() => {
        setActive(next)
        setShown(true)
      }, FADE_OUT)
    },
    [active],
  )

  // Arrow keys move between tabs, the way a tablist is expected to behave.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    let next = -1
    if (delta) next = (active + delta + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    if (next < 0) return
    event.preventDefault()
    select(next)
    buttons.current[next]?.focus()
  }

  return (
    <div className={`mx-auto w-full max-w-[64rem] ${className}`}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex flex-wrap items-center gap-x-8 gap-y-1 border-b border-border pb-4"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(node) => {
              buttons.current[i] = node
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${tab.id}`}
            aria-controls={`${uid}-panel-${tab.id}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            className={`py-1 text-[11px] font-medium uppercase tracking-[.16em] transition-colors duration-200 ${
              i === active ? 'text-bronze' : 'text-neutral-400 hover:text-navy-accent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid pt-10 md:pt-14">
        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${uid}-panel-${tab.id}`}
            aria-labelledby={`${uid}-tab-${tab.id}`}
            aria-hidden={i !== active}
            inert={i !== active || undefined}
            className={`[grid-area:1/1] transition-opacity duration-200 ease-out motion-reduce:transition-none ${
              i === active && shown ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}
