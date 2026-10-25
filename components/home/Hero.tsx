'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FILM, FILM_LENGTH, LOOP } from './film'

/** Set to '/film/loop.mp4' once the real loop is in public/film/. */
const LOOP_VIDEO: string | null = null

/**
 * The homepage frame, from the West Ventures homepage artifact.
 *
 * At rest it loops through title plates (placeholders for the footage listed
 * in the film script). "Play film" runs the 2:44 animatic: plates, dates and
 * quotations on the script's timings. When the real cut exists, put
 * public/film/loop.mp4 in place, set LOOP_VIDEO below, and the loop plays
 * that instead.
 */
export function Hero() {
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [plate, setPlate] = useState(0)
  const [shot, setShot] = useState(0)
  const [progress, setProgress] = useState(0)
  const [hasVideo, setHasVideo] = useState(false)
  const t0 = useRef(0)
  const elapsed = useRef(0)
  const raf = useRef(0)
  const pausedRef = useRef(false)
  const heroRef = useRef<HTMLElement>(null)

  // Loop mode: advance a plate every 2.4s.
  useEffect(() => {
    if (playing) return
    const id = setInterval(() => setPlate((p) => (p + 1) % LOOP.length), 2400)
    return () => clearInterval(id)
  }, [playing])

  const close = useCallback(() => {
    cancelAnimationFrame(raf.current)
    setPlaying(false)
    setPaused(false)
    pausedRef.current = false
    setProgress(0)
  }, [])

  const frame = useCallback(
    (now: number) => {
      if (!pausedRef.current) elapsed.current = (now - t0.current) / 1000
      const t = Math.min(elapsed.current, FILM_LENGTH)
      let idx = 0
      for (let k = 0; k < FILM.length; k++) if (FILM[k].at <= t) idx = k
      setShot(idx)
      setProgress(t / FILM_LENGTH)
      if (t >= FILM_LENGTH) {
        close()
        return
      }
      raf.current = requestAnimationFrame(frame)
    },
    [close],
  )

  function play() {
    setPlaying(true)
    setPaused(false)
    pausedRef.current = false
    elapsed.current = 0
    t0.current = performance.now()
    raf.current = requestAnimationFrame(frame)
  }

  function togglePause() {
    const next = !pausedRef.current
    pausedRef.current = next
    setPaused(next)
    if (!next) t0.current = performance.now() - elapsed.current * 1000
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && playing) close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing, close])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const plates = playing ? FILM : LOOP
  const active = playing ? shot : plate
  const current = playing ? FILM[shot] : null

  return (
    <div className="flex h-[100svh] min-h-[560px] flex-col px-[max(10px,env(safe-area-inset-left))] pb-3 pt-[calc(69px+env(safe-area-inset-top))] sm:px-4 sm:pb-4">
      <section
        ref={heroRef}
        aria-label="West Ventures"
        className="relative isolate mx-auto w-full max-w-[1600px] flex-1 overflow-hidden rounded-[22px] bg-[#0d0c0b] sm:rounded-[28px]"
      >
        {/* Plates */}
        <div aria-hidden="true" className={`absolute inset-0 ${hasVideo && !playing ? 'opacity-0' : ''}`}>
          {plates.map((p, i) => (
            <div
              key={`${playing ? 'f' : 'l'}-${i}`}
              className="absolute inset-0 grid place-items-center overflow-hidden transition-opacity duration-[1100ms] ease-[var(--ease-in-out-soft)]"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <div
                className="absolute inset-[-6%]"
                style={{
                  background: `linear-gradient(160deg, ${p.from}, ${p.to})`,
                  animation: i === active ? `hero-drift ${playing ? 8 : 4}s linear forwards` : 'none',
                }}
              />
              <div className="relative px-[4vw] text-center font-serif text-[clamp(4rem,15vw,14rem)] font-semibold leading-[0.9] text-white/[0.06]">
                {p.ghost}
              </div>
            </div>
          ))}
        </div>

        {LOOP_VIDEO && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hasVideo && !playing ? 'opacity-100' : 'opacity-0'}`}
          src={LOOP_VIDEO}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          onLoadedData={() => setHasVideo(true)}
          aria-hidden="true"
        />
        )}

        {/* Film grain on the frame */}
        <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0 z-[1]" />

        {/* Shade */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-[2] bg-gradient-to-b from-black/15 via-black/25 to-black/75 transition-opacity duration-1000 ${playing ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Slate */}
        <p className="absolute left-5 top-4 z-[3] max-w-[calc(100%-40px)] font-mono text-[0.64rem] uppercase tracking-[0.14em] text-[#f7f5f0]/55 sm:left-6 sm:top-5">
          {playing && current
            ? `Shot ${String(shot + 1).padStart(2, '0')} · ${current.slate}`
            : hasVideo
              ? 'Loop'
              : `Placeholder · ${LOOP[plate].slate}`}
        </p>

        {/* Copy */}
        <div
          className={`absolute inset-0 z-[4] flex flex-col justify-end px-[clamp(20px,5vw,80px)] pb-[clamp(36px,10vh,120px)] transition-[transform,opacity] duration-[1100ms] ease-[var(--ease-in-out-soft)] ${
            playing ? 'pointer-events-none translate-y-[14%] opacity-0' : ''
          }`}
        >
          <h1 className="hero-in text-[clamp(3rem,min(9vw,13svh),8.2rem)] leading-[0.95] text-[#f7f5f0]" style={{ animationDelay: '150ms' }}>
            West Ventures
          </h1>
          <p className="hero-in mt-5 max-w-[44ch] text-[clamp(1rem,1.45vw,1.2rem)] leading-[1.55] text-[#f7f5f0]/80" style={{ animationDelay: '300ms' }}>
            A venture studio affiliated with Austin Christian University. Student teams work on real
            companies for course credit. The studio
            also builds companies of its own.
          </p>
          <div className="hero-in mt-7 flex flex-wrap gap-2.5" style={{ animationDelay: '450ms' }}>
            <button
              type="button"
              onClick={play}
              className="inline-flex items-center gap-3 rounded-full bg-[#f7f5f0] px-5 py-3 text-[0.92rem] font-medium text-[#141414] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span aria-hidden="true" className="h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
              Play film · 2:44
            </button>
            <Link
              href="/ventures"
              className="arrow-nudge inline-flex items-center gap-2 rounded-full border border-[#f7f5f0]/60 px-5 py-3 text-[0.92rem] font-medium text-[#f7f5f0] transition-colors duration-300 hover:bg-[#f7f5f0]/10"
            >
              Ventures <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Film overlay */}
        <div
          aria-live="polite"
          className={`absolute inset-0 z-[6] transition-opacity duration-700 ${playing ? 'opacity-100 delay-300' : 'pointer-events-none opacity-0'}`}
        >
          <div
            className={`absolute inset-x-0 top-1/2 -translate-y-1/2 px-[6vw] text-center font-serif text-[clamp(2.2rem,7vw,6rem)] font-semibold leading-none text-[#f7f5f0] [text-shadow:0_2px_30px_rgba(0,0,0,.45)] transition-opacity duration-700 ${
              current?.super ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {current?.super}
            {current?.superNote && (
              <small className="mt-4 block font-mono text-[0.78rem] font-normal uppercase tracking-[0.14em] text-[#d9bc86]">
                {current.superNote}
              </small>
            )}
          </div>
          <div
            className={`absolute bottom-14 left-1/2 w-[min(860px,calc(100%-40px))] -translate-x-1/2 text-center text-[clamp(1rem,1.7vw,1.3rem)] leading-[1.45] text-[#f7f5f0] [text-shadow:0_1px_12px_rgba(0,0,0,.8)] transition-opacity duration-500 ${
              current?.quote ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {current?.quote && <>“{current.quote}”</>}
            {current?.speaker && (
              <cite className="mt-2 block font-mono text-[0.68rem] not-italic uppercase tracking-[0.14em] text-[#d9bc86]">
                {current.speaker}
              </cite>
            )}
          </div>
          <div className="absolute right-4 top-3.5 flex gap-2">
            <button type="button" onClick={togglePause} className="rounded-full border border-[#f7f5f0]/25 bg-black/50 px-4 py-2 text-[0.8rem] font-medium text-[#f7f5f0] backdrop-blur">
              {paused ? 'Play' : 'Pause'}
            </button>
            <button type="button" onClick={close} className="rounded-full border border-[#f7f5f0]/25 bg-black/50 px-4 py-2 text-[0.8rem] font-medium text-[#f7f5f0] backdrop-blur">
              Close
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
            <i className="block h-full bg-[#d9bc86]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </section>
    </div>
  )
}
