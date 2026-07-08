import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteConfig } from '../config/siteConfig'
import { newsletterPosts } from '../lib/content'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import SectionHeading from '../components/ui/SectionHeading'
import MotionReveal from '../components/ui/MotionReveal'
import ArticleCard from '../components/newsletter/ArticleCard'
import SubscribeForm from '../components/newsletter/SubscribeForm'

// The 3D scene is heavy — load it lazily so it never blocks first paint.
const HeroScene = lazy(() => import('../components/three/HeroScene'))

const highlights = [
  {
    title: 'Technical workshops',
    body: 'Hands-on sessions in CTFs, cloud security, threat hunting, and tooling — beginner-friendly, no experience required.',
    icon: 'M9 3v18M15 3v18M3 9h18M3 15h18',
  },
  {
    title: 'Career prep & networking',
    body: 'Resume reviews, mock interviews, and meetups with recruiters and women already working in security.',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  },
  {
    title: 'The national conference',
    body: 'We help members apply for scholarships to the annual WiCyS conference each spring — travel, talks, and thousands of peers.',
    icon: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z',
  },
  {
    title: 'Community & belonging',
    body: 'Study nights, socials, and a support network of women and gender-nonconforming folks who have your back.',
    icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z',
  },
]

export default function Home() {
  const latest = newsletterPosts.slice(0, 3)

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-wicys-radial" />}>
          <HeroScene />
        </Suspense>

        <div className="container-page relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-cream/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-wicys-green-400 animate-float" />
              Official WiCyS Student Chapter · {siteConfig.university}
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-[1.02] text-white sm:text-6xl md:text-7xl">
              Women in <span className="text-gradient">CyberSecurity</span> at Northeastern
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75 sm:text-xl">
              {siteConfig.tagline} We recruit, retain, and advance women and gender-nonconforming
              folks in cybersecurity — together.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/get-involved" size="lg">
                Become a member
              </Button>
              <Button to="/about" variant="secondary" size="lg">
                Learn about us
              </Button>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* --------------------------------------------------------------- STATS */}
      <section className="container-page -mt-6 pb-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <MotionReveal key={stat.label} delay={i * 0.06}>
              <Card className="p-5 text-center">
                <p className="text-2xl font-bold text-gradient sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-snug text-cream/60 sm:text-sm">{stat.label}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- MISSION */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Who we are"
            title={<>Building a more diverse security community</>}
            subtitle={siteConfig.mission}
          />
          <MotionReveal delay={0.1}>
            <Card className="p-8">
              <p className="text-lg leading-relaxed text-cream/80">
                Launched in {siteConfig.foundedYear} through {siteConfig.college}, {siteConfig.shortName}{' '}
                brings together students who are curious about security — whether you're reverse-engineering
                malware or writing your first line of Python.
              </p>
              <p className="mt-4 leading-relaxed text-cream/70">
                We're a community of women, men, allies, and advocates. Everyone who supports our mission is
                welcome here.
              </p>
              <div className="mt-6">
                <Button to="/about" variant="secondary" size="sm">
                  Read our story
                </Button>
              </div>
            </Card>
          </MotionReveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- HIGHLIGHTS */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          align="center"
          eyebrow="What we do"
          title="More than a club"
          subtitle="Skills, mentorship, and a community that grows with you."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <MotionReveal key={h.title} delay={i * 0.07}>
              <Card interactive className="h-full p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-wicys-purple-600/20 text-wicys-green-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={h.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{h.body}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- LATEST NEWSLETTER */}
      {latest.length > 0 && (
        <section className="container-page py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="From the newsletter"
              title="Latest from our desk"
              subtitle="Recent cyber events and how policy is shaping the field."
            />
            <Link
              to="/newsletter"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-wicys-green-300 hover:text-wicys-green-200 sm:inline-flex"
            >
              View all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- SIGN UP */}
      <section className="container-page py-16 sm:py-20">
        <Card className="overflow-hidden">
          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-wicys-green-400/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white">Never miss an issue</h2>
              <p className="mt-3 text-cream/70">
                Get our newsletter with the latest in cybersecurity events, policy, and chapter
                happenings — straight to your inbox.
              </p>
            </div>
            <div className="relative">
              <SubscribeForm />
            </div>
          </div>
        </Card>
      </section>
    </>
  )
}
