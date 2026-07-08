import { Link } from 'react-router-dom'
import type { NewsletterPost } from '../../lib/content'
import { formatDate } from '../../lib/content'
import Card from '../ui/Card'
import Tag from '../ui/Tag'

export default function ArticleCard({ post }: { post: NewsletterPost }) {
  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      <Link to={`/newsletter/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-ink-800">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-wicys-gradient opacity-30" />
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-cream/50">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.author && <span>· {post.author}</span>}
          </div>

          <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-wicys-green-300">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-cream/65">
              {post.excerpt}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}

          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-wicys-green-300">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </Link>
    </Card>
  )
}
