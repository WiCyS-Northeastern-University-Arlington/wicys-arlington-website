import type { EventItem } from '../../lib/content'
import { dateBadge, formatEventDate } from '../../lib/content'
import Card from '../ui/Card'
import Tag from '../ui/Tag'
import Button from '../ui/Button'

interface Props {
  event: EventItem
  /** Upcoming events get the accent badge + RSVP button; past ones read muted. */
  upcoming?: boolean
}

export default function EventCard({ event, upcoming = false }: Props) {
  const badge = dateBadge(event.date)

  return (
    <Card
      interactive={upcoming}
      className={`flex h-full flex-col overflow-hidden sm:flex-row ${
        upcoming ? '' : 'opacity-90'
      }`}
    >
      {/* Cover image, or a gradient wash when none is set */}
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-ink-800 sm:aspect-auto sm:w-48 md:w-56">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-wicys-gradient opacity-30" />
        )}

        {/* Calendar-style date badge */}
        {badge && (
          <div
            className={`absolute left-3 top-3 flex flex-col items-center rounded-xl px-3 py-1.5 text-center backdrop-blur ${
              upcoming
                ? 'bg-wicys-green-400/90 text-ink-950'
                : 'bg-ink-950/70 text-cream'
            }`}
          >
            <span className="text-[0.65rem] font-bold uppercase tracking-wider">
              {badge.month}
            </span>
            <span className="text-xl font-bold leading-none">{badge.day}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-cream/50">
          <time dateTime={event.date}>{formatEventDate(event.date, event.endDate)}</time>
          {event.time && (
            <span className="inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {event.time}
            </span>
          )}
          {event.location && (
            <span className="inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold leading-snug text-white">{event.title}</h3>

        {event.excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-cream/65">{event.excerpt}</p>
        )}

        {event.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {event.tags.slice(0, 3).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}

        {upcoming && event.registrationUrl && (
          <div className="mt-5">
            <Button href={event.registrationUrl} size="sm">
              RSVP / Register
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
