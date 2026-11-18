'use client'

import { getLenis } from '@/components/site/SmoothScroll'
import { T, reducedMotion, setChrome } from './store'

/**
 * Opening the menu does not cover the page: the page is clipped down to a
 * portrait card in the centre of the screen, and the menu scene sits behind
 * it. The clip is set in pixels against the stage, so it works at any scroll
 * position.
 */
export const isDesktop = () => window.innerWidth >= 967

/** The centre card's rectangle in the viewport. */
export function cardRect() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return { left: vw * 0.35, top: 80, width: vw * 0.3, height: vh - 160 }
}

let timer: ReturnType<typeof setTimeout> | undefined

function insets(card: boolean) {
  const stage = document.getElementById('stage')!
  const y = window.scrollY
  const below = Math.max(0, stage.offsetHeight - y - window.innerHeight)
  if (!card) return `inset(${y}px 0px ${below}px 0px round 0px)`
  const side = isDesktop() ? window.innerWidth * 0.35 : window.innerWidth / 2
  const v = isDesktop() ? 80 : window.innerHeight / 2
  return `inset(${y + v}px ${side}px ${below + v}px ${side}px round 8px)`
}

export function openMenu() {
  const stage = document.getElementById('stage')
  if (!stage) return
  clearTimeout(timer)
  document.documentElement.removeAttribute('data-menu-closing')
  stage.style.transition = 'none'
  stage.style.clipPath = insets(false)
  void stage.offsetHeight
  stage.style.transition = reducedMotion() ? 'none' : `clip-path ${T.menu}ms var(--ease-inout)`
  stage.style.clipPath = insets(true)
  getLenis()?.stop()
  document.documentElement.style.overflow = 'hidden'
  setChrome({ menu: true })
}

export function closeMenu(instant = false) {
  const stage = document.getElementById('stage')
  if (!stage) return
  clearTimeout(timer)
  const done = () => {
    stage.style.transition = ''
    stage.style.clipPath = ''
    document.documentElement.removeAttribute('data-menu-closing')
  }
  getLenis()?.start()
  document.documentElement.style.overflow = ''
  setChrome({ menu: false })
  if (instant || reducedMotion()) {
    done()
    return
  }
  document.documentElement.setAttribute('data-menu-closing', '')
  stage.style.transition = `clip-path ${T.menu}ms var(--ease-inout)`
  stage.style.clipPath = insets(false)
  timer = setTimeout(done, T.menu + 40)
}
