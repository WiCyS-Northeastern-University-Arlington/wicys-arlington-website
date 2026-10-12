import { Link } from 'react-router-dom'
import type { ResearchItem } from '../../lib/content'
import Tag from '../ui/Tag'

export default function ResearchCard({ item }: { item: ResearchItem }) {
  return (
    <Link
      to={`/research/${item.slug}`}
      className="glass group block overflow-hidden rounded-2xl text-left transition-[border-color,box-shadow] duration-300 hover:border-wicys-purple-400/40 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-wicys-green-300"
    >
        {item.coverImage && (
          <img src={item.coverImage} alt={item.imageAlt || item.title} loading="lazy" className="aspect-[3/2] w-full bg-white object-contain" />
        )}
        <div className="flex items-start gap-4 p-6 sm:p-7">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {item.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
            {item.status && (
              <span className="text-xs font-medium text-wicys-green-300">· {item.status}</span>
            )}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white transition-colors group-hover:text-wicys-green-200 sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/70">{item.summary}</p>
          {item.researchers.length > 0 && <p className="mt-3 text-sm font-medium text-wicys-green-300">{item.researchers.join(', ')}</p>}
          <p className="mt-3 text-xs text-cream/50">View research details →</p>
        </div>

        <span aria-hidden="true" className="mt-1 text-2xl text-wicys-green-300">→</span>
        </div>
    </Link>
  )
}
