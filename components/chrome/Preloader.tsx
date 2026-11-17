'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { reducedMotion, setChrome } from './store'

/**
 * The preloader is the live page seen through a window. A portrait card opens
 * from a centre line, a few words rearrange themselves around it, then the
 * card grows to the full viewport.
 *
 * The long version plays on the home page, once every 24 hours. Every other
 * load gets the fast version: the window simply opens.
 */
const WORDS = [
  { text: 'Build', big: true },
  { text: 'the', big: true },
  { text: 'West', big: true },
  { text: 'Venture studio', big: false },
  { text: 'Georgetown, TX', big: false },
  { text: '', big: false, clock: true },
]
/** Places a word can sit, in viewport percent. */
const SLOTS: [number, number][] = [
  [6, 16],
  [68, 13],
  [5, 46],
  [71, 50],
  [8, 76],
  [69, 80],
  [14, 60],
  [78, 30],
]
const DAY = 24 * 60 * 60 * 1000

export function Preloader() {
  const pathname = usePathname()
  const [step, setStep] = useState(0)
  const [fast, setFast] = useState(false)
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5])
  const [time, setTime] = useState('')

  useEffect(() => {
    let last = 0
    try {
      last = Number(localStorage.getItem('preloader-at') ?? 0)
    } catch {}
    const long = pathname === '/' && Date.now() - last > DAY && !reducedMotion()
    const timers: ReturnType<typeof setTimeout>[] = []
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
    setTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))

    if (!long) {
      setFast(true)
      at(60, () => setStep(3))
      at(700, () => setChrome({ loaded: true }))
      at(1400, () => setStep(4))
    } else {
      try {
        localStorage.setItem('preloader-at', String(Date.now()))
      } catch {}
      at(60, () => setStep(1))
      // The words hop between places once a second.
      const hop = setInterval(() => {
        setOrder(() => {
          const slots = SLOTS.map((_, i) => i).sort(() => Math.random() - 0.5)
          return slots.slice(0, WORDS.length)
        })
      }, 1000)
      at(3200, () => {
        clearInterval(hop)
        setStep(3)
      })
      at(4300, () => setChrome({ loaded: true }))
      at(5100, () => setStep(4))
      timers.push(hop as unknown as ReturnType<typeof setTimeout>)
    }
    return () => timers.forEach((t) => clearTimeout(t))
    // Runs once, on first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="window preloader" data-step={step} data-fast={fast || undefined} aria-hidden="true">
      <div className="window-hole" />
      {WORDS.map((w, i) => {
        const [x, y] = SLOTS[order[i]]
        return (
          <span
            key={i}
            className={`pre-word ${w.big ? 'big' : 'small'}`}
            style={{ transform: `translate3d(${x}vw, ${y}vh, 0)` }}
          >
            {w.clock ? time : w.text}
          </span>
        )
      })}
    </div>
  )
}
