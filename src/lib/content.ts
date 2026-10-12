import yaml from 'js-yaml'
export interface NewsletterPost {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  coverImage?: string
  featured?: boolean
  body: string
}

export interface EventItem {
  slug: string
  completed: boolean
  title: string
  date: string
  endDate?: string
  time?: string
  location?: string
  excerpt: string
  coverImage?: string
  gallery: string[]
  imageFit?: 'cover' | 'contain'
  registrationLabel?: string
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
export type ResearchType = 'student' | 'faculty'

export interface ResearchItem {
  slug: string
  title: string
  type: ResearchType
  researchers: string[]
  affiliation?: string
  status?: string
  tags: string[]
  summary: string
  coverImage?: string
  imageAlt?: string
  link?: string
  order: number
  body: string
}
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

// Any image dropped into src/assets/moments/ shows up in the gallery automatically.
// The file name becomes the caption: "wicys-2025-group-photo.jpg" → "Wicys 2025 group photo".
const momentFiles = import.meta.glob('/src/assets/moments/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>

const momentPhotos = Object.entries(momentFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const name = slugFromPath(path).replace(/\.\w+$/, '').replace(/[-_]+/g, ' ').trim()
    return { src, caption: name.charAt(0).toUpperCase() + name.slice(1) }
  })

export const conferencePhotos: { src: string; caption: string }[] = [
  ...momentPhotos,
  ...conferenceRecaps.flatMap((r) => {
    const imgs = [...(r.coverImage ? [r.coverImage] : []), ...r.gallery]
    return imgs.map((src) => ({ src, caption: r.conference || r.title }))
  }),
].filter((photo, i, arr) => arr.findIndex((p) => p.src === photo.src) === i)

const eventFiles = import.meta.glob('/content/events/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// Match the folder name to the event Markdown filename to attach photos automatically.
const eventPhotos = import.meta.glob('/src/assets/events/**/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>

const allEvents: EventItem[] = Object.entries(eventFiles).map(([path, raw]) => {
  const { data, body } = parseFrontmatter(raw)
  const slug = slugFromPath(path)
  const folderPhotos = Object.entries(eventPhotos)
    .filter(([photoPath]) => photoPath.startsWith(`/src/assets/events/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)
  return {
    slug,
    completed: data.completed === true,
    title: asString(data.title, 'Untitled event'),
    date: asString(data.date),
    endDate: data.endDate ? asString(data.endDate) : undefined,
    time: data.time ? asString(data.time) : undefined,
    location: data.location ? asString(data.location) : undefined,
    excerpt: asString(data.excerpt),
    coverImage: data.coverImage ? asString(data.coverImage) : undefined,
    gallery: [...asStringArray(data.gallery), ...folderPhotos],
    imageFit: data.imageFit === 'contain' ? 'contain' : 'cover',
    registrationLabel: data.registrationLabel ? asString(data.registrationLabel) : undefined,
    registrationUrl: data.registrationUrl ? asString(data.registrationUrl) : undefined,
    tags: asStringArray(data.tags),
    body,
  }
})

function startOfToday(): number {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return +d
}

function eventEnd(e: EventItem): number {
  return +parseDate(e.endDate || e.date)
}

export const upcomingEvents: EventItem[] = allEvents
  .filter((e) => !e.completed && eventEnd(e) >= startOfToday())
  .sort((a, b) => +new Date(a.date) - +new Date(b.date))

export const pastEvents: EventItem[] = allEvents
  .filter((e) => e.completed || eventEnd(e) < startOfToday())
  .sort((a, b) => (b.date ? +parseDate(b.date) : 0) - (a.date ? +parseDate(a.date) : 0))

const researchFiles = import.meta.glob('/content/research/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const allResearch: ResearchItem[] = Object.entries(researchFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: asString(data.title, 'Untitled research'),
      type: (asString(data.type) === 'faculty' ? 'faculty' : 'student') as ResearchType,
      researchers: asStringArray(data.researchers),
      affiliation: data.affiliation ? asString(data.affiliation) : undefined,
      status: data.status ? asString(data.status) : undefined,
      tags: asStringArray(data.tags),
      summary: asString(data.summary),
      coverImage: data.coverImage ? asString(data.coverImage) : undefined,
      imageAlt: data.imageAlt ? asString(data.imageAlt) : undefined,
      link: data.link ? asString(data.link) : undefined,
      order: Number(data.order ?? 100),
      body,
    }
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

export const studentResearch = allResearch.filter((r) => r.type === 'student')
export const facultyResearch = allResearch.filter((r) => r.type === 'faculty')

// Date-only strings represent a local calendar day, rather than UTC midnight.
function parseDate(iso: string): Date {
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00` : iso)
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = parseDate(iso)
  if (Number.isNaN(+d)) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function dateBadge(iso: string): { month: string; day: string } | null {
  if (!iso) return null
  const d = parseDate(iso)
  if (Number.isNaN(+d)) return null
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: String(d.getDate()),
  }
}

export function formatEventDate(iso: string, endIso?: string): string {
  const start = formatDate(iso)
  if (!endIso) return start
  const s = parseDate(iso)
  const e = parseDate(endIso)
  if (Number.isNaN(+s) || Number.isNaN(+e)) return start
  if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
    const month = s.toLocaleDateString('en-US', { month: 'long' })
    return `${month} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`
  }
  return `${start} – ${formatDate(endIso)}`
}
