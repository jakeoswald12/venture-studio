'use client'

import { useEffect, useRef, useState } from 'react'

type Theme = 'light' | 'dark'

/** Light and dark switch. Dark is the default; the choice is remembered. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  }, [])

  const next: Theme = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={`Turn on ${next} theme`}
      title={`${next === 'light' ? 'Light' : 'Dark'} theme`}
      onClick={() => {
        document.documentElement.dataset.theme = next
        try {
          localStorage.setItem('theme', next)
        } catch {}
        setTheme(next)
      }}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 2.5a5.5 5.5 0 0 1 0 11Z" fill="currentColor" />
      </svg>
    </button>
  )
}

/**
 * Sound switch. Off by default. On, it plays a quiet generated soundscape
 * (two detuned low tones and filtered noise) until real audio is supplied.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false)
  const audio = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null)

  const toggle = () => {
    const next = !on
    setOn(next)
    if (next && !audio.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new Ctx()
      const gain = ctx.createGain()
      gain.gain.value = 0
      gain.connect(ctx.destination)
      ;[55, 55.4, 82.5, 110.3].forEach((f, i) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = f
        const g = ctx.createGain()
        g.gain.value = i < 2 ? 0.5 : 0.18
        osc.connect(g).connect(gain)
        osc.start()
      })
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 420
      const ng = ctx.createGain()
      ng.gain.value = 0.12
      noise.connect(filter).connect(ng).connect(gain)
      noise.start()
      audio.current = { ctx, gain }
    }
    const a = audio.current
    if (!a) return
    void a.ctx.resume()
    a.gain.gain.cancelScheduledValues(a.ctx.currentTime)
    a.gain.gain.linearRampToValueAtTime(next ? 0.16 : 0, a.ctx.currentTime + 1.2)
  }

  useEffect(() => () => void audio.current?.ctx.close(), [])

  return (
    <button
      type="button"
      className="icon-btn"
      aria-pressed={on}
      aria-label={on ? 'Turn sound off' : 'Turn sound on'}
      title={on ? 'Sound on' : 'Sound off'}
      onClick={toggle}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M2 6.2h2.4L8 3.2v9.6l-3.6-3H2Z" fill={on ? 'currentColor' : 'none'} />
        {on ? <path d="M10.4 5.6a3.4 3.4 0 0 1 0 4.8M12.3 3.8a6 6 0 0 1 0 8.4" /> : <path d="m10.6 6 3.4 4M14 6l-3.4 4" />}
      </svg>
    </button>
  )
}
