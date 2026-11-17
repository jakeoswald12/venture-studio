'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { isSoundOn, playUi, sceneFor, setHidden, setScene, setSound, soundPreference, subscribeSound } from '@/lib/sound'

/**
 * Sound on / off. Off by default. Turning it on starts the soundscape (see
 * lib/sound.ts) and the hover and click ticks on links and buttons.
 *
 * Browsers only start audio from a click, so a visitor who left sound on last
 * time gets it back on their first click anywhere on the page.
 */
export function SoundToggle() {
  const pathname = usePathname()
  const [on, setOn] = useState(false)

  useEffect(() => subscribeSound(setOn), [])

  // Each section of the site has its own chord.
  useEffect(() => setScene(sceneFor(pathname)), [pathname])

  useEffect(() => {
    const interactive = (t: EventTarget | null) =>
      t instanceof Element ? t.closest('a, button, select, [data-sfx]') : null

    let hovered: Element | null = null
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const el = interactive(e.target)
      if (el && el !== hovered) playUi('hover')
      hovered = el
    }
    const onClick = (e: MouseEvent) => {
      if (interactive(e.target)) playUi('click')
    }
    const onVisibility = () => setHidden(document.hidden)

    // Restore last visit's choice on the first click that isn't the toggle itself.
    const restore = (e: MouseEvent) => {
      document.removeEventListener('click', restore, true)
      if (isSoundOn() || !soundPreference()) return
      if (e.target instanceof Element && e.target.closest('[data-sound-toggle]')) return
      void setSound(true)
    }

    document.addEventListener('pointerover', onOver)
    document.addEventListener('click', onClick)
    document.addEventListener('click', restore, true)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('click', onClick)
      document.removeEventListener('click', restore, true)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const label = on ? 'Turn sound off' : 'Turn sound on'

  return (
    <button
      type="button"
      data-sound-toggle
      onClick={() => void setSound(!isSoundOn())}
      aria-label={label}
      aria-pressed={on}
      title={label}
      className="relative grid h-10 w-10 flex-none place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-faint"
    >
      {/* Five bars: flat when off, moving when on. */}
      <span aria-hidden="true" className={`sound-bars ${on ? 'is-on' : ''}`}>
        <i /><i /><i /><i /><i />
      </span>
    </button>
  )
}
