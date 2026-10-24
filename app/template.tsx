/* A template re-mounts on every navigation (a layout does not), so the
 * entrance animation plays each time a new page opens. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
