import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ConferenceRecap } from '../../lib/content'
import { formatDate } from '../../lib/content'
import Card from '../ui/Card'

/** A member's conference experience: photo, meta, and their written recap. */
export default function ExperienceCard({ recap }: { recap: ConferenceRecap }) {
  return (
    <Card className="overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[1fr_1.4fr]">
        <div className="relative min-h-[220px] bg-ink-800">
          {recap.coverImage ? (
            <img
              src={recap.coverImage}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-wicys-gradient opacity-30" />
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-wicys-green-300">
            {recap.conference && <span className="font-semibold">{recap.conference}</span>}
            {recap.location && <span className="text-cream/50">· {recap.location}</span>}
            {recap.date && <span className="text-cream/50">· {formatDate(recap.date)}</span>}
          </div>

          <h3 className="mt-2 text-xl font-semibold text-white">{recap.title}</h3>

          <div className="prose-wicys mt-3 text-[0.95rem]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{recap.body}</ReactMarkdown>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-wicys-gradient text-sm font-bold text-white">
              {recap.author.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">{recap.author}</p>
              {recap.role && <p className="text-cream/50">{recap.role}</p>}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
