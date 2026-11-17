/* Pages enter through the window (see components/chrome/Chrome.tsx), so the
 * template adds nothing of its own. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
