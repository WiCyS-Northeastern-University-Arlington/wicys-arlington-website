import yaml from 'js-yaml'

/**
 * Content loader.
 *
 * Newsletter posts and conference recaps are authored as markdown files in the
 * project-root `/content` folder (either by hand or through the Decap CMS admin
 * UI at `/admin`). Vite's `import.meta.glob` bundles them at build time as raw
 * strings; we split off the YAML frontmatter, parse it with `js-yaml`
 * (browser-safe, unlike gray-matter which needs a Node Buffer polyfill), and
 * expose typed, sorted collections to the app.
 */

export interface NewsletterPost {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  coverImage?: string
  featured?: boolean
  /** Raw markdown body (frontmatter stripped). */
  body: string
}

export interface EventItem {
  slug: string
  title: string
  /** Event start date (ISO). */
  date: string
  /** Optional end date for multi-day events (ISO). */
  endDate?: string
  /** Human-readable time, e.g. "5:30–7:00 PM". */
  time?: string
  location?: string
  excerpt: string
  coverImage?: string
  /** Sign-up / RSVP link — shown as a button on upcoming events. */
  registrationUrl?: string
  tags: string[]
  body: string
}

export interface ConferenceRecap {
  slug: string
  title: string
  conference: string
  date: string
  location?: string
  author: string
  role?: string
  coverImage?: string
  gallery: string[]
  excerpt: string
  body: string
}

/** Split raw markdown into { data, body }, parsing YAML frontmatter. */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw)
  if (!match) {
    return { data: {}, body: raw.trim() }
  }
  let data: Record<string, unknown> = {}
  try {
    data = (yaml.load(match[1]) as Record<string, unknown>) ?? {}
  } catch (err) {
    console.error('Failed to parse frontmatter:', err)
  }
  return { data, body: match[2].trim() }
}

/** Derive a URL slug from a file path (…/my-post.md -> my-post). */
function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.mdx?$/, '')
}

function asString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : v == null ? fallback : String(v)
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x)).filter(Boolean)
  if (typeof v === 'string' && v.trim()) return [v.trim()]
  return []
}

// --- Newsletter -----------------------------------------------------------

const newsletterFiles = import.meta.glob('/content/newsletter/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const newsletterPosts: NewsletterPost[] = Object.entries(newsletterFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: asString(data.title, 'Untitled'),
      date: asString(data.date),
      author: asString(data.author, 'WiCyS Northeastern'),
      tags: asStringArray(data.tags),
      excerpt: asString(data.excerpt),
      coverImage: data.coverImage ? asString(data.coverImage) : undefined,
      featured: Boolean(data.featured),
      body,
    }
  })
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))

export function getNewsletterPost(slug: string): NewsletterPost | undefined {
  return newsletterPosts.find((p) => p.slug === slug)
}

/** All unique tags across newsletter posts (for the filter UI). */
export const newsletterTags: string[] = Array.from(
  new Set(newsletterPosts.flatMap((p) => p.tags)),
).sort()

// --- Conferences ----------------------------------------------------------

const conferenceFiles = import.meta.glob('/content/conferences/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const conferenceRecaps: ConferenceRecap[] = Object.entries(conferenceFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: asString(data.title, 'Untitled'),
      conference: asString(data.conference),
      date: asString(data.date),
      location: data.location ? asString(data.location) : undefined,
      author: asString(data.author, 'WiCyS Northeastern member'),
      role: data.role ? asString(data.role) : undefined,
      coverImage: data.coverImage ? asString(data.coverImage) : undefined,
      gallery: asStringArray(data.gallery),
      excerpt: asString(data.excerpt),
      body,
    }
  })
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))

/** Every gallery image across all recaps, plus cover images, de-duplicated. */
export const conferencePhotos: { src: string; caption: string }[] = conferenceRecaps.flatMap(
  (r) => {
    const imgs = [...(r.coverImage ? [r.coverImage] : []), ...r.gallery]
    return imgs.map((src) => ({ src, caption: r.conference || r.title }))
  },
).filter((photo, i, arr) => arr.findIndex((p) => p.src === photo.src) === i)

// --- Events ---------------------------------------------------------------

const eventFiles = import.meta.glob('/content/events/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const allEvents: EventItem[] = Object.entries(eventFiles).map(([path, raw]) => {
  const { data, body } = parseFrontmatter(raw)
  return {
    slug: slugFromPath(path),
    title: asString(data.title, 'Untitled event'),
    date: asString(data.date),
    endDate: data.endDate ? asString(data.endDate) : undefined,
    time: data.time ? asString(data.time) : undefined,
    location: data.location ? asString(data.location) : undefined,
    excerpt: asString(data.excerpt),
    coverImage: data.coverImage ? asString(data.coverImage) : undefined,
    registrationUrl: data.registrationUrl ? asString(data.registrationUrl) : undefined,
    tags: asStringArray(data.tags),
    body,
  }
})

/** Midnight today, so an event happening later today still counts as upcoming. */
function startOfToday(): number {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return +d
}

/** When an event "ends" for the upcoming/past split (multi-day aware). */
function eventEnd(e: EventItem): number {
  return +new Date(e.endDate || e.date)
}

/** Upcoming events, soonest first. */
export const upcomingEvents: EventItem[] = allEvents
  .filter((e) => eventEnd(e) >= startOfToday())
  .sort((a, b) => +new Date(a.date) - +new Date(b.date))

/** Past events, most recent first. */
export const pastEvents: EventItem[] = allEvents
  .filter((e) => eventEnd(e) < startOfToday())
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))

// --- Shared helper --------------------------------------------------------

export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(+d)) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

/** Split an ISO date into { month: "SEP", day: "15" } for calendar-style badges. */
export function dateBadge(iso: string): { month: string; day: string } | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(+d)) return null
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: String(d.getDate()),
  }
}

/** Format an event's date span, e.g. "Sep 15, 2026" or "Sep 15–17, 2026". */
export function formatEventDate(iso: string, endIso?: string): string {
  const start = formatDate(iso)
  if (!endIso) return start
  const s = new Date(iso)
  const e = new Date(endIso)
  if (Number.isNaN(+s) || Number.isNaN(+e)) return start
  // Same month & year → collapse to "Sep 15–17, 2026".
  if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
    const month = s.toLocaleDateString('en-US', { month: 'long' })
    return `${month} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`
  }
  return `${start} – ${formatDate(endIso)}`
}
