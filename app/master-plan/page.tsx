import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Master plan',
  description: 'The West Ventures master plan: goal, model, target campuses, timeline, projections, revenue model and risks.',
}

/**
 * The master plan is a self-contained slide deck (its own slide engine, map
 * and charts) served from /master-plan-deck.html. This page frames it under
 * the site header. The deck reads the site's theme from this page, so the
 * header toggle switches both.
 */
export default function MasterPlanPage() {
  return (
    <main className="fixed inset-x-0 bottom-0 top-[calc(68px+env(safe-area-inset-top,0px))]">
      <h1 className="sr-only">Master plan</h1>
      <iframe
        src="/master-plan-deck.html"
        title="Master plan deck"
        data-lenis-prevent
        className="block h-full w-full border-0 bg-paper"
      />
    </main>
  )
}
