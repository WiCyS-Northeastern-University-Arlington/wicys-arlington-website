import { useMemo, useState } from 'react'
import { newsletterPosts, newsletterTags } from '../lib/content'
import PageHero from '../components/layout/PageHero'
import ArticleCard from '../components/newsletter/ArticleCard'
import SubscribeForm from '../components/newsletter/SubscribeForm'
import Tag from '../components/ui/Tag'
import Card from '../components/ui/Card'
import MotionReveal from '../components/ui/MotionReveal'

export default function Newsletter() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const posts = useMemo(
    () => (activeTag ? newsletterPosts.filter((p) => p.tags.includes(activeTag)) : newsletterPosts),
    [activeTag],
  )

  return (
    <>
      <PageHero
        eyebrow="Newsletter"
        title={
          <>
            Cyber events &amp; <span className="text-gradient">policy</span>, decoded
          </>
        }
        subtitle="Chapter dispatches on recent security news, breaking events, and how policy is shaping the future of cybersecurity."
      />

      {/* Subscribe band */}
      <section className="container-page pb-6">
        <MotionReveal>
          <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-xl font-semibold text-white">Get it in your inbox</h2>
              <p className="mt-1 text-sm text-cream/65">
                Subscribe for new issues - no spam, unsubscribe anytime.
              </p>
            </div>
            <div className="w-full sm:max-w-md">
              <SubscribeForm compact />
            </div>
          </Card>
        </MotionReveal>
      </section>

      {/* Filters */}
      {newsletterTags.length > 0 && (
        <section className="container-page py-6">
          <div className="flex flex-wrap items-center gap-2">
            <Tag active={activeTag === null} onClick={() => setActiveTag(null)}>
              All
            </Tag>
            {newsletterTags.map((tag) => (
              <Tag key={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
                {tag}
              </Tag>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section className="container-page pb-20">
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg text-white">No articles yet{activeTag ? ` tagged “${activeTag}”` : ''}.</p>
            <p className="mt-2 text-sm text-cream/60">
              New issues are published through our{' '}
              <a href="/admin" className="text-wicys-green-300 underline">
                editor
              </a>
              . Check back soon!
            </p>
          </Card>
        )}
      </section>
    </>
  )
}
