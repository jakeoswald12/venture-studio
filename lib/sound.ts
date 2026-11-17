/**
 * Site sound, synthesized in the browser with the Web Audio API. There are no
 * audio files: the soundscape is built from oscillators and filtered noise, so
 * it is original, weighs nothing and loops without a seam.
 *
 *   bed     a slow three-note pad and a band of filtered noise ("air")
 *   scenes  each section of the site has its own chord; changing page glides
 *           the pad to the new chord
 *   ui      a soft tick on hover and a lower one on click, for links and buttons
 *
 * Sound is off until the visitor turns it on. The choice is remembered.
 */

type Scene = { notes: [number, number, number]; air: number }

/** Frequencies in Hz. Open fifths and ninths: calm, unresolved, not sad. */
const SCENES: Record<string, Scene> = {
  home: { notes: [110, 164.81, 246.94], air: 520 }, // A2 E3 B3
  ventures: { notes: [98, 146.83, 220], air: 640 }, // G2 D3 A3
  partners: { notes: [130.81, 196, 293.66], air: 700 }, // C3 G3 D4
  team: { notes: [123.47, 185, 277.18], air: 600 }, // B2 F#3 C#4
  thesis: { notes: [87.31, 130.81, 196], air: 420 }, // F2 C3 G3
  packet: { notes: [116.54, 174.61, 261.63], air: 760 }, // Bb2 F3 C4
}

export function sceneFor(pathname: string): string {
  if (pathname.startsWith('/ventures') || pathname.startsWith('/portfolio')) return 'ventures'
  if (pathname.startsWith('/partners')) return 'partners'
  if (pathname.startsWith('/team')) return 'team'
  if (pathname.startsWith('/thesis')) return 'thesis'
  if (pathname.startsWith('/info-packet')) return 'packet'
  return 'home'
}

const KEY = 'sound'
const BED_LEVEL = 0.16

let ctx: AudioContext | null = null
let master: GainNode | null = null
let oscs: OscillatorNode[] = []
let airFilter: BiquadFilterNode | null = null
let enabled = false
let scene = 'home'
const listeners = new Set<(on: boolean) => void>()

function build() {
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return false
  ctx = new Ctor()
  master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  // Pad: three voices, each a pair of slightly detuned oscillators, through a
  // low-pass filter that opens and closes slowly.
  const padFilter = ctx.createBiquadFilter()
  padFilter.type = 'lowpass'
  padFilter.frequency.value = 520
  padFilter.Q.value = 0.6
  const padGain = ctx.createGain()
  padGain.gain.value = 0.5
  padFilter.connect(padGain).connect(master)

  const sweep = ctx.createOscillator()
  sweep.frequency.value = 0.035
  const sweepDepth = ctx.createGain()
  sweepDepth.gain.value = 220
  sweep.connect(sweepDepth).connect(padFilter.frequency)
  sweep.start()

  const notes = SCENES[scene].notes
  oscs = []
  notes.forEach((f, i) => {
    for (const detune of [-5, 6]) {
      const o = ctx!.createOscillator()
      o.type = i === 0 ? 'sine' : 'triangle'
      o.frequency.value = f
      o.detune.value = detune
      const g = ctx!.createGain()
      g.gain.value = i === 0 ? 0.34 : 0.17
      // Each voice swells on its own slow cycle, so the chord never sits still.
      const swell = ctx!.createOscillator()
      swell.frequency.value = 0.05 + i * 0.017 + (detune > 0 ? 0.008 : 0)
      const swellDepth = ctx!.createGain()
      swellDepth.gain.value = g.gain.value * 0.45
      swell.connect(swellDepth).connect(g.gain)
      swell.start()
      o.connect(g).connect(padFilter)
      o.start()
      oscs.push(o)
    }
  })

  // Air: two seconds of noise, looped, through a band-pass filter.
  const len = ctx.sampleRate * 2
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    // Brown-ish noise: softer than white.
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
    data[i] = last * 3.5
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  noise.loop = true
  airFilter = ctx.createBiquadFilter()
  airFilter.type = 'bandpass'
  airFilter.frequency.value = SCENES[scene].air
  airFilter.Q.value = 0.7
  const airGain = ctx.createGain()
  airGain.gain.value = 0.22
  const gust = ctx.createOscillator()
  gust.frequency.value = 0.06
  const gustDepth = ctx.createGain()
  gustDepth.gain.value = 0.12
  gust.connect(gustDepth).connect(airGain.gain)
  gust.start()
  noise.connect(airFilter).connect(airGain).connect(master)
  noise.start()
  return true
}

function fade(to: number, seconds: number) {
  if (!ctx || !master) return
  const now = ctx.currentTime
  master.gain.cancelScheduledValues(now)
  master.gain.setValueAtTime(master.gain.value, now)
  master.gain.linearRampToValueAtTime(to, now + seconds)
}

export function isSoundOn() {
  return enabled
}

/** Whether the visitor left sound on last time. Audio still needs a click to start. */
export function soundPreference(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on'
  } catch {
    return false
  }
}

export function subscribeSound(fn: (on: boolean) => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

/** Must be called from a click or key press: browsers only start audio then. */
export async function setSound(on: boolean) {
  if (on) {
    if (!ctx && !build()) return
    await ctx!.resume()
    enabled = true
    fade(BED_LEVEL, 2.4)
  } else {
    enabled = false
    fade(0, 0.8)
    const c = ctx
    setTimeout(() => {
      if (!enabled) c?.suspend()
    }, 900)
  }
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {}
  listeners.forEach((fn) => fn(enabled))
}

/** Glide the pad to another section's chord. */
export function setScene(name: string) {
  scene = SCENES[name] ? name : 'home'
  if (!ctx) return
  const s = SCENES[scene]
  const now = ctx.currentTime
  oscs.forEach((o, i) => {
    o.frequency.cancelScheduledValues(now)
    o.frequency.setTargetAtTime(s.notes[Math.floor(i / 2)], now, 1.1)
  })
  airFilter?.frequency.setTargetAtTime(s.air, now, 1.5)
}

/** Fade the bed out while the tab is hidden. */
export function setHidden(hidden: boolean) {
  if (!enabled) return
  fade(hidden ? 0 : BED_LEVEL, hidden ? 0.4 : 1.2)
}

let lastTick = 0
export function playUi(kind: 'hover' | 'click') {
  if (!enabled || !ctx) return
  const now = ctx.currentTime
  if (kind === 'hover' && now - lastTick < 0.06) return
  lastTick = now
  const root = SCENES[scene].notes[0]
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  // Hover sits three octaves above the chord root, click two: always in key.
  o.frequency.value = root * (kind === 'hover' ? 8 : 4)
  const peak = kind === 'hover' ? 0.022 : 0.05
  const length = kind === 'hover' ? 0.09 : 0.16
  g.gain.setValueAtTime(0, now)
  g.gain.linearRampToValueAtTime(peak, now + 0.006)
  g.gain.exponentialRampToValueAtTime(0.0001, now + length)
  o.connect(g).connect(ctx.destination)
  o.start(now)
  o.stop(now + length + 0.02)
}
