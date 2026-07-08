import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getNewsletterPost, newsletterPosts, formatDate } from '../lib/content'
import Tag from '../components/ui/Tag'
import Button from '../components/ui/Button'
import ArticleCard from '../components/newsletter/ArticleCard'
import SubscribeForm from '../components/newsletter/SubscribeForm'
import Card from '../components/ui/Card'
import NotFound from './NotFound'

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getNewsletterPost(slug) : undefined

  if (!post) return <NotFound />

  const related = newsletterPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <article className="pt-28 sm:pt-32">
        <div className="container-page max-w-3xl">
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-wicys-green-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            All articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-cream/50">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.author && <span>· {post.author}</span>}
          </div>

          <h1 className="mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>

        {post.coverImage && (
          <div className="container-page mt-10 max-w-4xl">
            <img
              src={post.coverImage}
              alt=""
              className="aspect-[16/8] w-full rounded-2xl border border-white/10 object-cover"
            />
          </div>
        )}

        <div className="container-page mt-10 max-w-3xl">
          <div className="prose-wicys prose-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <Card className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Enjoyed this issue?</h2>
              <p className="mt-1 text-sm text-cream/65">
                Subscribe to get the next one in your inbox.
              </p>
              <div className="mt-4">
                <SubscribeForm compact />
              </div>
            </Card>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-page py-16 sm:py-20">
          <h2 className="text-2xl font-bold text-white">More from the newsletter</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/newsletter" variant="secondary">
              View all articles
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
