/**
 * The News column in the menu. For now it lists the studio's essays; add an
 * entry here for anything else worth announcing. Newest first.
 */
export interface NewsItem {
  kind: 'Essay' | 'Announcement'
  title: string
  href: string
}

export const NEWS: NewsItem[] = [
  { kind: 'Essay', title: 'The Course of Empire', href: '/thesis/course-of-empire' },
  { kind: 'Essay', title: 'Kings & Cupbearers', href: '/thesis/kings-and-cupbearers' },
  { kind: 'Essay', title: 'Sculptures vs Fossils', href: '/thesis/sculptures-vs-fossils' },
  { kind: 'Essay', title: 'Critical Mass', href: '/thesis/critical-mass' },
]
