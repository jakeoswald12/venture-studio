'use client'

import { useEffect, useState } from 'react'
import { getLenis } from './SmoothScroll'

/**
 * Sticky section index for the thesis page. The section currently in the
 * reading zone is marked, with a bronze bar that slides between entries.
 */
export function ThesisIndex({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  const index = Math.max(0, sections.findIndex((s) => s.id === active))

  return (
    <nav aria-label="Sections" className="sticky top-28 hidden lg:block">
      <ol className="relative flex flex-col">
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-[36px] w-px bg-bronze transition-transform duration-700 ease-[var(--ease-out-soft)]"
          style={{ transform: `translateY(${index * 36}px)` }}
        />
        {sections.map((s, i) => (
          <li key={s.id} className="h-[36px]">
            <a
              href={`#${s.id}`}
              onClick={(e) => {
                const lenis = getLenis()
                if (lenis) {
                  e.preventDefault()
                  lenis.scrollTo(`#${s.id}`, { offset: -110, duration: 1.4 })
                  history.replaceState(null, '', `#${s.id}`)
                }
              }}
              className={`flex h-full items-center gap-4 border-l border-line pl-5 text-[0.88rem] transition-colors duration-500 ${
                s.id === active ? 'text-ink' : 'text-faint hover:text-grey'
              }`}
            >
              <span className="font-mono text-[0.66rem] tracking-[0.12em]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
