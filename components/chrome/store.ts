'use client'

import { useSyncExternalStore } from 'react'

/**
 * Shared interface state: menu, page-transition phase and sound. Kept outside
 * React so the header, menu, transition layer and pages can all read and set
 * it. The same values are mirrored onto <html> as data attributes, which is
 * what the stylesheet keys off.
 */
export type Phase = 'idle' | 'closing' | 'hold' | 'opening'

export interface ChromeState {
  menu: boolean
  phase: Phase
  sound: boolean
  loaded: boolean
}

let state: ChromeState = { menu: false, phase: 'idle', sound: false, loaded: false }
const listeners = new Set<() => void>()

export function getChrome() {
  return state
}

export function setChrome(patch: Partial<ChromeState>) {
  state = { ...state, ...patch }
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    root.toggleAttribute('data-menu', state.menu)
    root.toggleAttribute('data-loaded', state.loaded)
    if (state.phase === 'idle') root.removeAttribute('data-phase')
    else root.setAttribute('data-phase', state.phase)
  }
  listeners.forEach((l) => l())
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}
const serverState: ChromeState = { menu: false, phase: 'idle', sound: false, loaded: false }

export function useChrome() {
  return useSyncExternalStore(subscribe, getChrome, () => serverState)
}

/** Durations in ms, from the reference's motion table. */
export const T = {
  wipe: 700,
  hold: 500,
  menu: 1200,
  expandPill: 1500,
  expandMenu: 1200,
} as const

export const reducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
